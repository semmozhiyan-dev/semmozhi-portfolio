/*******************************************************************************************
 * TESTIMONIALS BACKEND — Google Apps Script (bound to a Google Sheet)
 * ----------------------------------------------------------------------------------------
 * SETUP (about 3 minutes, one time):
 *
 *  1. Create a new Google Sheet  ->  https://sheets.new
 *     (this sheet becomes the database + your moderation queue)
 *
 *  2. Extensions -> Apps Script  ->  paste this entire file -> Save
 *
 *  3. Deploy -> New deployment -> Web app
 *        Execute as:      Me
 *        Who has access:  Anyone
 *     -> Deploy  ->  copy the Web app URL (ends in /exec)
 *
 *  4. Open the deployed URL in a browser. You should see a JSON response.
 *     The 'Testimonials' tab and its columns are created automatically on the first call.
 *
 *  5. Paste that URL into App.jsx  ->  TESTIMONIALS_API  (or set VITE_TESTIMONIALS_API)
 *
 *  EDITING LATER (IMPORTANT):
 *  Saving the code does NOT update the running deployment. The live version
 *  only changes when you create a new version:
 *     Deploy  ->  Manage deployments  ->  pencil icon  ->  Version: New version  ->  Deploy
 *  This keeps the same /exec URL, so the website needs no change.
 *  Symptom of a stale deployment: the endpoint replies
 *  "Script function not found: doGet" even though doGet exists in the editor.
 *
 *  FIRST RUN:
 *  Open the deployed /exec URL in a browser once, signed in as the sheet owner.
 *  Google requires that one authorisation pass before the endpoint serves JSON.
 *
 * MODERATION:
 *  Every submission lands in the sheet with Published = "no".
 *  Type "yes" in the Published cell of a row to make it appear on the website.
 *  Set PUBLISH_AUTOMATICALLY = true below to skip manual approval entirely.
 *
 *  SPAM PROTECTION:
 *  Hidden honeypot field, minimum time-on-form, a short global brake and
 *  duplicate detection for resubmitted text.
 *******************************************************************************************/

const SHEET_NAME = 'Testimonials';
const HEADERS = ['Name', 'Role', 'Company', 'Rating', 'Feedback', 'Submitted At', 'Published'];

/** Set to true to publish every submission immediately (no manual approval). */
const PUBLISH_AUTOMATICALLY = false;

/** Minimum seconds a human needs to spend on the form. */
const MIN_FORM_SECONDS = 3;

/**
 * Global brake between submissions, in seconds.
 * Kept short on purpose: a long global lock would reject a second legitimate
 * reviewer (two people submitting within the same minute). Duplicate
 * detection below handles resubmission instead.
 */
const COOLDOWN_SECONDS = 10;

const MAX_NAME = 80;
const MAX_ROLE = 80;
const MAX_COMPANY = 80;
const MAX_FEEDBACK = 2000;
const MIN_FEEDBACK = 15;

/* ------------------------------------------------------------------ helpers --- */

function json_(payload) {
  return ContentService
    .createTextOutput(JSON.stringify(payload))
    .setMimeType(ContentService.MimeType.JSON);
}

function sheet_() {
  var ss = SpreadsheetApp.getActiveSpreadsheet();
  if (!ss) {
    throw new Error('This script must be bound to a Google Sheet (Extensions -> Apps Script from inside the sheet).');
  }

  var sheet = ss.getSheetByName(SHEET_NAME);
  if (!sheet) {
    sheet = ss.insertSheet(SHEET_NAME);
  }

  if (sheet.getLastRow() === 0) {
    sheet.appendRow(HEADERS);
    sheet.getRange(1, 1, 1, HEADERS.length).setFontWeight('bold');
    sheet.setFrozenRows(1);
    sheet.setColumnWidth(1, 180);
    sheet.setColumnWidth(4, 80);
    sheet.setColumnWidth(5, 420);
    sheet.setColumnWidth(6, 150);
    sheet.setColumnWidth(7, 100);
  }

  return sheet;
}

function clean_(value, maxLength) {
  if (value === null || value === undefined) return '';
  return String(value).replace(/\s+/g, ' ').trim().slice(0, maxLength);
}

/**
 * True when the same person has already sent the same words.
 * Stops refresh-and-resubmit loops without blocking distinct reviewers.
 */
function duplicate_(sheet, name, feedback) {
  var lastRow = sheet.getLastRow();
  if (lastRow < 2) return false;

  var startRow = Math.max(2, lastRow - 200);
  var rows = sheet.getRange(startRow, 1, lastRow - startRow + 1, HEADERS.length).getValues();
  var targetName = clean_(name, MAX_NAME).toLowerCase();
  var targetFeedback = clean_(feedback, MAX_FEEDBACK).toLowerCase();

  return rows.some(function (row) {
    return clean_(row[0], MAX_NAME).toLowerCase() === targetName &&
      clean_(row[4], MAX_FEEDBACK).toLowerCase() === targetFeedback;
  });
}

function parseBody_(e) {
  var contents = (e && e.postData && e.postData.contents) || '';
  var type = (e && e.postData && e.postData.type) || '';

  if (type.indexOf('application/x-www-form-urlencoded') >= 0) {
    var parsed = {};
    contents.split('&').forEach(function (pair) {
      if (!pair) return;
      var parts = pair.split('=');
      parsed[decodeURIComponent(parts[0])] = decodeURIComponent((parts[1] || '').replace(/\+/g, ' '));
    });
    return parsed;
  }

  try {
    return JSON.parse(contents || '{}');
  } catch (err) {
    return {};
  }
}

/* --------------------------------------------------------------------- read --- */

/** Rows flagged as published, newest first. */
function readPublished_() {
  var sheet = sheet_();
  var lastRow = sheet.getLastRow();
  if (lastRow < 2) return [];

  var values = sheet.getRange(2, 1, lastRow - 1, HEADERS.length).getValues();
  var out = [];

  values.forEach(function (row, index) {
    var name = clean_(row[0], MAX_NAME);
    var feedback = clean_(row[4], MAX_FEEDBACK);
    var published = clean_(row[6], 20).toLowerCase();

    if (!name || !feedback) return;
    if (published !== 'yes' && published !== 'true' && published !== '1') return;

    out.push({
      id: 'row-' + (index + 2),
      name: name,
      role: clean_(row[1], MAX_ROLE),
      company: clean_(row[2], MAX_COMPANY),
      rating: Math.min(5, Math.max(1, Number(row[3]) || 5)),
      feedback: feedback,
      date: clean_(row[5], 40).slice(0, 10)
    });
  });

  out.reverse();
  return out;
}

/* -------------------------------------------------------------------- write --- */

function doGet(e) {
  try {
    return json_({ ok: true, testimonials: readPublished_() });
  } catch (err) {
    return json_({ ok: false, error: String(err && err.message ? err.message : err) });
  }
}

function doPost(e) {
  var lock = LockService.getScriptLock();
  if (!lock.tryLock(15000)) {
    return json_({ ok: false, error: 'The service is busy. Please try again in a moment.' });
  }

  try {
    var data = parseBody_(e);

    /* Honeypot — bots fill hidden fields, humans never see it. Report success, store nothing. */
    if (clean_(data.website, 200)) {
      return json_({ ok: true, message: 'Thanks — your feedback was received.' });
    }

    /* Timing check — a human cannot complete the form this fast. */
    var elapsed = Number(data.elapsed || 0);
    if (!isNaN(elapsed) && elapsed > 0 && elapsed < MIN_FORM_SECONDS * 1000) {
      return json_({ ok: false, error: 'That was submitted a little too quickly. Please try again.' });
    }

    var name = clean_(data.name, MAX_NAME);
    var role = clean_(data.role, MAX_ROLE);
    var company = clean_(data.company, MAX_COMPANY);
    var feedback = clean_(data.feedback, MAX_FEEDBACK);
    var rating = Math.min(5, Math.max(1, Math.round(Number(data.rating) || 5)));

    if (!name) {
      return json_({ ok: false, error: 'Your name is required.' });
    }
    if (!feedback || feedback.length < MIN_FEEDBACK) {
      return json_({ ok: false, error: 'Please write at least a sentence or two of feedback.' });
    }

    /* Cooldown — blunts naive submit loops. */
    var props = PropertiesService.getScriptProperties();
    var last = Number(props.getProperty('lastSubmissionAt') || 0);
    var now = Date.now();
    if (now - last < COOLDOWN_SECONDS * 1000) {
      return json_({ ok: false, error: 'Please wait a moment before submitting again.' });
    }

    var sheet = sheet_();

    /* Same person, same words — already on file. */
    if (duplicate_(sheet, name, feedback)) {
      return json_({ ok: false, error: 'This feedback has already been submitted.' });
    }

    sheet.appendRow([
      name,
      role,
      company,
      rating,
      feedback,
      new Date().toISOString(),
      PUBLISH_AUTOMATICALLY ? 'yes' : 'no'
    ]);

    props.setProperty('lastSubmissionAt', String(now));

    return json_({
      ok: true,
      message: PUBLISH_AUTOMATICALLY
        ? 'Received — your feedback is now live.'
        : 'Received — your feedback is awaiting approval.'
    });
  } catch (err) {
    return json_({ ok: false, error: String(err && err.message ? err.message : err) });
  } finally {
    lock.releaseLock();
  }
}

/**
 * Pre-flight handler. Apps Script only routes GET and POST, but responding here
 * keeps the endpoint friendly to tooling that probes with OPTIONS.
 */
function doOptions(e) {
  return json_({ ok: true });
}
