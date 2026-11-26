# 🚀 GitHub Setup and Commit Guide

## Step 1: Create GitHub Repository

### Option A: Using GitHub Website (Recommended)
1. Go to [github.com](https://github.com)
2. Sign in to your account (or create one if needed)
3. Click the "+" icon in top-right corner
4. Select "New repository"
5. Repository name: `portfolio`
6. Description: `Personal portfolio website with SpaceX-inspired design`
7. Make it **Public** (required for free GitHub Pages)
8. ✅ Check "Add a README file"
9. Click "Create repository"

## Step 2: Upload Your Files

### Method 1: Web Upload (Easiest)
1. In your new repository, click "uploading an existing file"
2. Drag and drop ALL these files:
   ```
   📁 Your Files to Upload:
   ├── index.html
   ├── about.html
   ├── projects.html
   ├── contact.html
   ├── thank-you.html
   ├── css/
   │   └── style.css
   ├── js/
   │   └── script.js
   ├── package.json
   ├── vercel.json
   ├── .gitignore
   └── DEPLOYMENT-GUIDE.md
   ```
3. Write commit message: `🚀 Initial portfolio upload with SpaceX-inspired design`
4. Click "Commit changes"

### Method 2: Git Commands (Advanced)
```bash
# Navigate to your project folder
cd "d:\new\New folder"

# Initialize git repository
git init

# Add all files
git add .

# Commit files
git commit -m "🚀 Initial portfolio upload with SpaceX-inspired design"

# Add remote repository (replace YOUR_USERNAME)
git remote add origin https://github.com/semmozhi-ctrl/portfolio.git

# Push to GitHub
git push -u origin main
```

## Step 3: Verify Upload
1. Refresh your GitHub repository page
2. You should see all your files listed
3. Click on any file to preview it

## Step 4: Enable GitHub Pages (Optional)
1. In your repository, click "Settings"
2. Scroll to "Pages" in the sidebar
3. Source: "Deploy from a branch"
4. Branch: "main"
5. Folder: "/ (root)"
6. Click "Save"
7. Your site will be at: `https://semmozhi-ctrl.github.io/portfolio`

## 📋 Files Ready for GitHub

✅ **index.html** - Homepage with space background
✅ **about.html** - About page with skills section
✅ **projects.html** - Projects showcase page
✅ **contact.html** - Contact form with Formspree
✅ **thank-you.html** - Form submission confirmation
✅ **css/style.css** - SpaceX-inspired styling
✅ **js/script.js** - Interactive functionality
✅ **package.json** - Project configuration
✅ **vercel.json** - Vercel deployment settings
✅ **.gitignore** - Git ignore file
✅ **README.md** - Project documentation
✅ **DEPLOYMENT-GUIDE.md** - Deployment instructions

## 🎯 Repository Structure
```
portfolio/
├── 📄 index.html          # Homepage
├── 📄 about.html           # About page
├── 📄 projects.html        # Projects page
├── 📄 contact.html         # Contact page
├── 📄 thank-you.html       # Thank you page
├── 📁 css/
│   └── 📄 style.css        # Main stylesheet
├── 📁 js/
│   └── 📄 script.js        # JavaScript functionality
├── 📄 package.json         # Project config
├── 📄 vercel.json          # Vercel settings
├── 📄 .gitignore           # Git ignore
├── 📄 README.md            # Documentation
└── 📄 DEPLOYMENT-GUIDE.md  # Deploy guide
```

## 🌐 Expected URLs
- **GitHub Repository:** `https://github.com/semmozhi-ctrl/portfolio`
- **GitHub Pages:** `https://semmozhi-ctrl.github.io/portfolio`
- **Vercel (next step):** `https://portfolio.vendore.tech`

## ✅ Success Checklist
- [ ] GitHub repository created
- [ ] All files uploaded successfully
- [ ] Repository is public
- [ ] Files are organized in correct folders
- [ ] README.md displays properly
- [ ] Ready for Vercel deployment

## 🚀 Next Steps
1. **Complete GitHub upload** ✅
2. **Deploy to Vercel** (next)
3. **Get live URL**
4. **Share your portfolio**

---

**Your GitHub repository will be:**
`https://github.com/semmozhi-ctrl/portfolio`

This will serve as your code backup and source for Vercel deployment! 🎉
