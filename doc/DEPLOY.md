# Deployment Guide

## Prerequisites

- GitHub account
- Vercel account (free)
- Hostinger account with domain mksales.co.in

---

## Step 1: Prepare Code for GitHub

### Initialize Git (if not done)

```bash
cd mksales-frontend
git init
git add .
git commit -m "Initial commit - Headless WP frontend"
```

### Push to GitHub

1. Create a new repository on GitHub (github.com → New Repository)
   - Name: `mksales-frontend`
   - Visibility: Public or Private
   
2. Push your code:

```bash
git remote add origin https://github.com/YOUR_USERNAME/mksales-frontend.git
git branch -M master
git push -u origin master
```

---

## Step 2: Deploy on Vercel

1. Go to [vercel.com](https://vercel.com) and sign up
2. Click "Add New..." → "Project"
3. Import your GitHub repository (`mksales-frontend`)
4. Settings will auto-detect Next.js - keep defaults
5. Click "Deploy"

Vercel will give you a URL like: `https://mksales-frontend.vercel.app`

---

## Step 3: Connect Custom Domain

### In Vercel:

1. Go to your project → Settings → Domains
2. Add domain: `mksales.co.in`
3. Vercel will show DNS nameservers (copy these)

### In Hostinger:

1. Go to Hostinger → DNS Management
2. Replace existing nameservers with Vercel's nameservers
3. Save

### Wait for Propagation:
- DNS changes can take 5 minutes to 24 hours
- Once propagation completes, visit `mksales.co.in` to test

---

## Step 4: Update WordPress (Important)

After deployment, update WordPress to allow your Vercel URL:

1. Go to WordPress Admin
2. Install plugin: "WPGraphQL CORS" or configure CORS
3. Update allowed origins in plugin settings to include your Vercel URL

---

## Troubleshooting

### Issue: Products not loading
- Check GraphQL endpoint URL in code matches your WordPress URL

### Issue: Images not loading
- WordPress media URLs must be accessible publicly

### Issue: Domain not working
- Verify DNS nameservers are correct in Hostinger
- Check Vercel domain status in dashboard

---

## Development vs Production

| Environment | URL | How to Access |
|-------------|-----|---------------|
| Development | localhost:3000 | `npm run dev` |
| Production | mksales.co.in | After deployment |

---

## Updating the Site

1. Make changes in local code
2. Commit to git: `git add . && git commit -m "Update description"`
3. Push to GitHub: `git push`
4. Vercel auto-deploys - changes live in ~2 minutes

---

## File Locations

- **Code**: `mksales-frontend/`
- **Documentation**: `mksales-frontend/doc/`
- **Backend**: WordPress at mksales.co.in (separate hosting)