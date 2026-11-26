import fs from 'node:fs/promises'
import path from 'node:path'
import { createServer } from 'vite'
import { renderToString } from 'react-dom/server'
import { routes, jsonLdFor } from './seo.js'

const escapeAttribute = (value) => String(value).replace(/&/g, '&amp;').replace(/"/g, '&quot;').replace(/</g, '&lt;').replace(/>/g, '&gt;')

const replaceOnce = (html, pattern, replacement) => {
  if (!pattern.test(html)) throw new Error(`Template placeholder not found: ${pattern}`)
  return html.replace(pattern, replacement)
}

const applyRouteHead = (template, route) => {
  let html = template
  html = replaceOnce(html, /<title>[\s\S]*?<\/title>/, `<title>${escapeAttribute(route.title)}</title>`)
  html = replaceOnce(html, /<meta name="description" content="[^"]*">/, `<meta name="description" content="${escapeAttribute(route.description)}">`)
  html = replaceOnce(html, /<link rel="canonical" href="[^"]*">/, `<link rel="canonical" href="${escapeAttribute(route.canonical)}">`)
  html = replaceOnce(html, /<meta property="og:title" content="[^"]*">/, `<meta property="og:title" content="${escapeAttribute(route.ogTitle)}">`)
  html = replaceOnce(html, /<meta property="og:description" content="[^"]*">/, `<meta property="og:description" content="${escapeAttribute(route.ogDescription)}">`)
  html = replaceOnce(html, /<meta property="og:url" content="[^"]*">/, `<meta property="og:url" content="${escapeAttribute(route.canonical)}">`)
  html = replaceOnce(html, /<meta property="og:type" content="[^"]*">/, `<meta property="og:type" content="${escapeAttribute(route.ogType)}">`)
  html = replaceOnce(html, /<meta property="og:image" content="[^"]*">/, '<meta property="og:image" content="https://portfolio.vendore.tech/og-image.webp">')
  html = replaceOnce(html, /<meta property="og:image:secure_url" content="[^"]*">/, '<meta property="og:image:secure_url" content="https://portfolio.vendore.tech/og-image.webp">')
  html = replaceOnce(html, /<meta property="og:image:type" content="[^"]*">/, '<meta property="og:image:type" content="image/webp">')
  html = replaceOnce(html, /<meta property="og:image:alt" content="[^"]*">/, '<meta property="og:image:alt" content="Semmozhiyan NS — Site Reliability Engineer and Founder &amp; CEO of EKSISAI">')
  html = replaceOnce(html, /<meta name="twitter:title" content="[^"]*">/, `<meta name="twitter:title" content="${escapeAttribute(route.ogTitle)}">`)
  html = replaceOnce(html, /<meta name="twitter:description" content="[^"]*">/, `<meta name="twitter:description" content="${escapeAttribute(route.ogDescription)}">`)
  html = replaceOnce(html, /<meta name="twitter:image" content="[^"]*">/, '<meta name="twitter:image" content="https://portfolio.vendore.tech/og-image.webp">')
  html = replaceOnce(html, /<meta name="twitter:image:alt" content="[^"]*">/, '<meta name="twitter:image:alt" content="Semmozhiyan NS — Site Reliability Engineer and Founder &amp; CEO of EKSISAI">')
  return replaceOnce(html, /<script id="primary-json-ld" type="application\/ld\+json">[\s\S]*?<\/script>/, `<script id="primary-json-ld" type="application/ld+json">${JSON.stringify(jsonLdFor(route), null, 2)}</script>`)
}

const template = await fs.readFile(path.join(process.cwd(), 'dist/index.html'), 'utf8')
const vite = await createServer({ server: { middlewareMode: true }, appType: 'custom', logLevel: 'warn' })

try {
  const { React, StaticRouter, App } = await vite.ssrLoadModule('/ssr-entry.js')

  for (const route of routes) {
    const appHtml = renderToString(
      React.createElement(
        StaticRouter,
        { location: route.path },
        React.createElement(App, { onOpenResume: () => {} }),
      ),
    )
    const html = replaceOnce(
      applyRouteHead(template, route),
      /<div id="root"><\/div>/,
      `<div id="root">${appHtml}</div>`,
    )
    const output = path.join(process.cwd(), 'dist', route.file)
    await fs.mkdir(path.dirname(output), { recursive: true })
    await fs.writeFile(output, html)
    process.stdout.write(`prerendered ${route.path} -> dist/${route.file}\n`)
  }
} finally {
  await vite.close()
}
