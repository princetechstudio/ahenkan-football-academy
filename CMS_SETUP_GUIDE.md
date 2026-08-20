# CMS Setup & Connection Guide

## ✅ Current Status
- Website colors: **Purple & Gold** (matching logo)
- CMS styled with **Purple & Gold** theme
- Supabase configured and connected
- All pages ready to fetch data
- CMS ready to manage content

---

## 📋 Quick Start

### 1. Create Admin User in Supabase

Go to: **https://supabase.com → Your Project (fhukpyegqthatoixvqgl) → Authentication → Users**

Click **"Create new user"** and:
- Enter an **email** (e.g., admin@ahenkan.com)
- Enter a **password** (strong password)
- Click **Create**

### 2. Access the CMS

Visit: **http://localhost:3000/#/admin**

Sign in with your email and password.

---

## 🔄 How the CMS Connects to the Website

### Website Pages → CMS Data Flow:

```
Home Page
  ├─ Blogs Hook → Supabase "blogs" table
  └─ Fallback → Built-in content if offline

Blogs Page
  └─ Blogs Hook → Supabase "blogs" table

Fixtures Page
  ├─ Fixtures Hook → Supabase "fixtures" table
  └─ Results Hook → Supabase "results" table

Media Page
  └─ Media Hook → Supabase "media" table

Training, Staff, About, Contact Pages
  └─ Use built-in content (static pages)
```

### CMS Operations:

| Action | What Happens | Website Impact |
|--------|-------------|-----------------|
| **Create Blog Post** | Saved to Supabase "blogs" | Appears on Blogs & Home immediately |
| **Edit Blog Post** | Updates Supabase | Website auto-updates |
| **Delete Blog Post** | Removed from Supabase | Disappears from website |
| **Upload Image** | Saved to Supabase Storage | Available on Media page |
| **Add Fixture** | Saved to Supabase "fixtures" | Shows on Fixtures page |
| **Add Result** | Saved to Supabase "results" | Shows on Fixtures page |

---

## 🧪 Testing Checklist

### ✅ Test CMS Connection
- [ ] Sign in to CMS at http://localhost:3000/#/admin
- [ ] Navigate between Dashboard, Pages, Media, Fixtures, etc.
- [ ] All clicks and buttons work

### ✅ Test Blog Creation
1. Go to CMS → **Pages & Blog** → **New Post**
2. Fill in:
   - Title: "Welcome to Ahenkan Academy"
   - Category: "Academy News"
   - Content: "This is a test post"
   - Click **Publish**
3. Go to website http://localhost:3000/#/blogs
4. Verify post appears

### ✅ Test Media Upload
1. Go to CMS → **Media Library**
2. Upload an image
3. Go to website http://localhost:3000/#/media
4. Verify image appears

### ✅ Test Fixtures
1. Go to CMS → **Fixtures** → Create fixture with:
   - Squad: U-17
   - Opponent: Local Team
   - Date: Future date
2. Go to website http://localhost:3000/#/fixtures
3. Verify fixture appears

---

## 🗄️ Database Schema

The following tables are created in Supabase:

### `blogs`
```sql
id (UUID) | title | cat | date | excerpt | content | img | featured | created_at
```

### `fixtures`
```sql
id (UUID) | squad | comp | opp | venue | date | created_at
```

### `results`
```sql
id (UUID) | squad | comp | opp | venue | score | res (W/D/L) | date | created_at
```

### `media`
```sql
id (UUID) | kind (image/video) | title | caption | url | created_at
```

### Storage Bucket
- `media/` - Public bucket for images and videos

---

## 🔐 Row-Level Security (RLS)

- **Public Read**: Anyone can read blogs, fixtures, results, media
- **Admin Write**: Only authenticated users can create/edit/delete
- **Storage**: Only authenticated users can upload files

---

## 🛠️ Troubleshooting

### CMS Login Not Working
- [ ] Check Supabase user exists in **Authentication → Users**
- [ ] Verify email and password are correct
- [ ] Check .env has `VITE_SUPABASE_URL` and `VITE_SUPABASE_ANON_KEY`

### Website Not Showing CMS Content
- [ ] Check browser console for errors (F12)
- [ ] Verify Supabase tables have data
- [ ] Hard refresh website (Ctrl+Shift+R)
- [ ] Check network tab to see if API requests succeed

### Images Not Uploading
- [ ] Ensure Supabase Storage bucket "media" exists and is public
- [ ] Check file size (keep under 10MB)
- [ ] Verify CORS settings in Supabase

### Crashes or Errors
- [ ] Check browser Console (F12)
- [ ] Check Terminal for build errors
- [ ] Restart dev server: Stop and run `npm run dev`

---

## 📱 Mobile Access

The CMS is **fully responsive** and works on:
- Desktop (Chrome, Safari, Firefox, Edge)
- Tablet (iPad, Android tablets)
- Mobile (iOS, Android)

Access via: **http://localhost:3000/#/admin** (or your network IP)

---

## 🎨 Color Scheme

- **Primary**: Purple (#7d4a99)
- **Accent**: Gold (#f2b70a)
- **Background**: Deep Purple (#2a0e52)
- **Text**: White on dark, Dark on light

---

## 📞 Support

For issues:
1. Check browser Console (F12)
2. Check Terminal for errors
3. Verify Supabase project is active
4. Ensure dev server is running: `npm run dev`

---

Generated: 2026-08-16
