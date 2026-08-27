# Custom Domain Setup Guide (Vercel + Hostinger)

This guide explains how to connect your domain (bought from Hostinger) to your website hosted on Vercel.

**Current situation:**
- Your website is live at: `https://mksales-frontend.vercel.app`
- You want people to visit: `https://mksales.co.in` (or your domain)

---

## Step 1: Log in to Vercel

1. Go to [vercel.com](https://vercel.com) and sign in
2. You'll see your project dashboard — click on your project (the one with your website)

---

## Step 2: Add Your Domain in Vercel

1. In your project, go to **"Settings"** (top menu)
2. Click **"Domains"** in the left sidebar
3. In the text box, type your domain: **`mksales.co.in`** (or whatever your domain is)
4. Click **"Add"**

---

## Step 3: Vercel Will Show You DNS Records

After you add the domain, Vercel will show you something like this:

| Type | Name | Value |
|------|------|-------|
| CNAME | www | cname.vercel-dns.com |
| A | @ | 76.76.21.21 |

**Write these down or leave this tab open** — you'll need them in the next step.

---

## Step 4: Log in to Hostinger

1. Go to [hostinger.com](https://hostinger.com) and sign in
2. Click **"hPanel"** or **"Go to hPanel"** to open your hosting dashboard

---

## Step 5: Find Your DNS Settings

1. In hPanel, look for **"Domains"** in the sidebar
2. Click on your domain name (e.g., `mksales.co.in`)
3. Look for **"DNS Zone Editor"** or **"DNS / Nameservers"**
4. Click **"DNS Zone Editor"**

---

## Step 6: Add the DNS Records

You'll see a list of existing DNS records. We need to delete or update them.

### Option A: Use A Record (Recommended for beginners)

1. Find any existing **A record** for `@` (or your bare domain) — delete it
2. Click **"Add Record"** or **"Add New Record"**
3. Fill in:
   - **Type:** `A`
   - **Name:** `@` (or leave blank if it says "leave empty for root")
   - **Value:** `76.76.21.21`
   - **TTL:** `3600` (or leave default)
4. Click **Save**

5. Click **"Add Record"** again for the www version:
   - **Type:** `CNAME`
   - **Name:** `www`
   - **Value:** `cname.vercel-dns.com`
   - **TTL:** `3600`
6. Click **Save**

### Option B: Use Nameservers (Advanced)

If your domain currently has Hostinger nameservers (like `ns1.hostinger.com`), you can switch them to Vercel's. But Option A (above) is simpler.

---

## Step 7: Wait for It to Work

DNS changes can take **15 minutes to 48 hours** to start working. Usually it's faster (15-60 minutes).

**How to check if it's working:**
- Open a browser and visit `https://mksales.co.in`
- If you see your website — it worked!
- If you see an error, wait a few hours and try again

---

## Step 8: Update Your Google Analytics (After Domain Change)

Once your custom domain is working, update your GA4 stream:

1. Go to [analytics.google.com](https://analytics.google.com)
2. Click **"Admin"** (gear icon at bottom-left)
3. Under **"Property"**, click **"Data Streams"**
4. Click your stream (the one you created earlier)
5. Under **"Domain"**, you'll see `https://mksales-frontend.vercel.app`
6. Click the edit/pencil icon and change it to `https://mksales.co.in`
7. Click **Save**

---

## Step 9: Redeploy on Vercel (Optional)

Sometimes you need to trigger a fresh deploy for Vercel to pick up the domain:

1. Go back to your Vercel project dashboard
2. Go to **"Deployments"**
3. Find your latest deployment
4. Click the three dots (`...`) → **"Redeploy"**

---

## What If Something Goes Wrong?

| Problem | Likely Fix |
|---------|------------|
| "Domain not configured" in Vercel | Wait 24 hours for DNS to spread. If still there, check you typed the records correctly in Hostinger |
| "This site can't be reached" | You may have typed the wrong IP — double-check `76.76.21.21` |
| The old Hostinger page shows | You might have existing A records pointing to Hostinger. Delete all old A records |
| www redirect doesn't work | In Vercel → Settings → Domains, make sure both `mksales.co.in` and `www.mksales.co.in` are added. Turn on **"Redirect www to apex domain"** |

---

## Where to Get Help

- **Vercel support:** [vercel.com/help](https://vercel.com/help) — search "custom domain"
- **Hostinger support:** Live chat in hPanel (bottom-right corner)
- **Your developer:** If you're stuck, share screenshots of your Hostinger DNS Zone page and Vercel Domains page
