# 📲 Push Notifications Setup Guide

**Enable push notifications so users get notified when admin publishes content**

---

## 🎯 Overview

Users can now:
- ✅ Receive push notifications when admin publishes articles
- ✅ See notification even when app is closed
- ✅ Click notification to open the app
- ✅ Enable/disable notifications anytime

Admin can:
- ✅ Automatically send notifications when publishing articles
- ✅ Send custom notifications via Edge Function

---

## 🔧 Setup Steps

### **Step 1: Generate VAPID Keys** ⭐ REQUIRED

VAPID keys are used for Web Push Protocol authentication.

#### **Option A: Using Node.js** (Recommended)
```bash
# Install web-push CLI
npm install -g web-push

# Generate VAPID keys
web-push generate-vapid-keys
```

**Output**:
```
Public Key: BJ...your-public-key...
Private Key: u...your-private-key...
```

#### **Option B: Online Generator**
Use this website (⚠️ less secure, only for testing):
https://web-push-codelab.glitch.me/

---

### **Step 2: Configure Supabase Secrets**

1. Go to **Supabase Dashboard** → Your Project
2. Navigate to **Edge Functions** → **Settings** (or use SQL Editor)
3. Add these secrets:

```
Key: VAPID_PUBLIC_KEY
Value: BJ...your-public-key...

Key: VAPID_PRIVATE_KEY
Value: u...your-private-key...
```

4. Click **Add secret** for each

#### **Why?**
- These keys allow your app to send push notifications
- Keep private key secret (only on backend)
- Public key can be shared

---

### **Step 3: Configure Environment Variables**

Update your `.env` or `.env.local` file:

```env
# Existing
VITE_SUPABASE_URL=https://your-project.supabase.co
VITE_SUPABASE_ANON_KEY=your_anon_key

# Add these
VITE_VAPID_PUBLIC_KEY=BJ...your-public-key...
```

For production, set in deployment platform (Vercel, Netlify, etc.)

---

### **Step 4: Run RLS Setup SQL**

1. Go to **Supabase Dashboard** → **SQL Editor**
2. Create a new query
3. Copy all content from: `supabase/add-notification-rls.sql`
4. Paste and run
5. Should show: "executed successfully"

**What this does**:
- Enables Row Level Security for notifications
- Allows users to manage their subscriptions
- Allows admin to send notifications

---

### **Step 5: Deploy Edge Functions**

Deploy the two new functions to Supabase:

```bash
# Deploy send notifications function
supabase functions deploy send-push-notifications

# Deploy subscription function
supabase functions deploy subscribe-to-notifications
```

Or deploy via Supabase Dashboard:
1. Go to **Edge Functions**
2. Create new function from `supabase/functions/send-push-notifications/`
3. Create new function from `supabase/functions/subscribe-to-notifications/`

**Expected**:
```
✓ send-push-notifications deployed
✓ subscribe-to-notifications deployed
```

---

### **Step 6: Update App Code**

The app already has:
- ✅ Notification utilities (`src/lib/notifications.ts`)
- ✅ Push notification handler in Service Worker (`public/sw.js`)
- ✅ Admin integration to send on publish (`src/pages/Admin.tsx`)
- ✅ Notification toggle component (`src/components/NotificationToggle.tsx`)

**No additional code needed!**

---

### **Step 7: Build & Deploy**

```bash
# Build
npm run build

# Deploy to production
# (Vercel, Netlify, traditional server, etc.)
```

---

## 🎯 How It Works

### **User Flow**

1. **User visits app**
   - Browser asks for notification permission
   - User clicks "Allow" or "Don't Allow"

2. **User enables notifications**
   - Clicks bell icon 🔔 in header
   - Browser generates subscription object
   - Subscription sent to backend
   - Stored in database

3. **Admin publishes article**
   - Clicks "Publish article" button
   - Admin.tsx calls `sendPushNotification()`
   - Edge Function fetches all subscriptions
   - Sends notification to each user
   - Users see notification even if app closed!

4. **User clicks notification**
   - Service Worker handles click
   - Opens app (or focuses if already open)
   - Navigates to article

### **Admin Flow**

1. **Write article**
2. **Click "Publish article"**
3. **✅ Article published AND notification sent automatically**
4. Users receive notification within seconds!

---

## 📊 File Structure

### **New Files**
```
src/
├── lib/
│   └── notifications.ts          ← Client utilities
└── components/
    └── NotificationToggle.tsx    ← Bell icon button

supabase/
├── add-notification-rls.sql      ← Database policies
├── functions/
│   ├── send-push-notifications/  ← Send to all users
│   │   └── index.ts
│   └── subscribe-to-notifications/ ← Store subscription
│       └── index.ts

public/
└── sw.js                         ← Updated with notification handler
```

### **Modified Files**
```
src/pages/Admin.tsx               ← Sends notification on publish
index.html                        ← Already requests permission
```

---

## 🧪 Testing

### **Test 1: Verify Setup**

1. Open browser DevTools (F12)
2. Go to **Application** tab
3. Check **Service Workers**
   - Should show service worker status
4. Check **Manifest** 
   - Should show app metadata

### **Test 2: Request Permission**

1. Reload app
2. Browser might ask for permission
3. Click "Allow" (or check prompt)

### **Test 3: Subscribe to Notifications**

1. Click bell icon 🔔 in header (if visible)
2. Check DevTools Console
   - Should see: `✅ Subscription saved to database`
3. Check DevTools → Application → Cookies/Storage
   - Should show: `pushSubscribed: true`

### **Test 4: Publish and Receive**

1. Go to Admin → Blogs
2. Create test article with title "Test Notification"
3. Click "Publish article"
4. You should receive notification!

**If notification doesn't appear**:
- Check browser console for errors (F12)
- Verify VAPID keys are set in Supabase
- Verify Service Worker is registered
- Try hard refresh (Ctrl+Shift+R)

---

## 🔐 Security Considerations

### **VAPID Keys**
- ✅ Private key: Never exposed to client
- ✅ Public key: Safely shared with client
- ✅ Stored as Supabase secrets

### **Subscriptions**
- ✅ Endpoint URLs are encrypted
- ✅ Only admin can send notifications
- ✅ Users can unsubscribe anytime
- ✅ RLS prevents data access

### **Permissions**
- ✅ User controls: Browser permission
- ✅ User controls: Enable/disable bell icon
- ✅ User controls: Unsubscribe anytime

---

## 🐛 Troubleshooting

### **"Notification permission not requested"**
- Solution: Hard refresh (Ctrl+Shift+R)
- Solution: Clear cookies and try again
- Solution: Check browser privacy settings

### **"Bell icon not showing"**
- Check: Is Service Worker registered?
- Check: Is browser support enabled?
- Check: Is `VITE_VAPID_PUBLIC_KEY` configured?

### **"Notifications not received"**
- Check: User subscribed? (bell icon should be gold)
- Check: VAPID keys in Supabase?
- Check: Edge Functions deployed?
- Check: No errors in console (F12)?

### **"Subscription failed"**
- Verify: VITE_VAPID_PUBLIC_KEY is set
- Verify: Edge Functions deployed
- Verify: HTTPS enabled (not HTTP)
- Check: Console for error messages

### **"Edge Functions won't deploy"**
```bash
# Try again with auth
supabase functions deploy send-push-notifications --project-ref your-ref

# Or check logs
supabase functions list
```

---

## 📱 Platform Support

| Platform | Support | Notes |
|----------|---------|-------|
| **Chrome** | ✅ Full | Best support |
| **Firefox** | ✅ Full | Full support |
| **Edge** | ✅ Full | Windows & Mac |
| **Safari** | ⚠️ Limited | iOS PWA only |
| **iPhone** | ✅ Full | But limited by iOS |
| **Android** | ✅ Full | Full push support |

---

## 🎨 Customization

### **Change Notification Icon**
In `src/pages/Admin.tsx`, line with `sendPushNotification`:
```typescript
icon: payload.img || "/icon-192x192.png",  // ← Change default icon
```

### **Change Notification Title**
```typescript
title: `${payload.title} - Ahenkan Academy`,  // ← Add prefix
```

### **Add More Notification Types**
In `src/pages/Admin.tsx`:
```typescript
// After publishing fixtures
if (!editingId) {
  await sendPushNotification({
    title: `New Fixture: ${payload.opp}`,
    body: `${payload.squad} vs ${payload.opp}`,
    type: "fixture",
  });
}
```

---

## 📊 Monitoring

### **Check Subscriptions**
In Supabase, go to SQL Editor:
```sql
SELECT COUNT(*) as total_subscriptions 
FROM public.subscriptions;

-- See recent subscriptions
SELECT user_email, created_at 
FROM public.subscriptions 
ORDER BY created_at DESC 
LIMIT 10;
```

### **Check Notification Logs**
In Supabase, go to **Edge Functions** → **Logs**:
- See which notifications were sent
- See any errors or failures
- Monitor performance

---

## ✅ Checklist

- [ ] Generated VAPID keys
- [ ] Set Supabase secrets
- [ ] Updated .env with VITE_VAPID_PUBLIC_KEY
- [ ] Ran add-notification-rls.sql
- [ ] Deployed send-push-notifications function
- [ ] Deployed subscribe-to-notifications function
- [ ] Built app (npm run build)
- [ ] Deployed to production
- [ ] Tested on browser
- [ ] Tested on mobile device
- [ ] Tested notification on publish

---

## 🚀 Next Steps

### **Optional Enhancements**
1. Add notification preferences (by category)
2. Send notifications for fixtures, results, videos
3. Track notification open rates
4. Add rich media notifications (images)
5. Custom notification scheduling

### **Advanced Features**
1. Segmented notifications (by squad level)
2. Notification history
3. Digest emails combining notifications
4. SMS fallback for failures
5. Analytics dashboard

---

## 📞 Support

### **Common Commands**
```bash
# List deployed functions
supabase functions list

# View function logs
supabase functions delete send-push-notifications

# Deploy specific function
supabase functions deploy send-push-notifications --project-ref yourref
```

### **Debug Mode**
Open browser DevTools (F12) and check:
1. **Console** tab - For errors
2. **Application** tab - For Service Worker status
3. **Network** tab - For API calls

---

## 📚 Resources

- [MDN Web Push API](https://developer.mozilla.org/en-US/docs/Web/API/Push_API)
- [Web Push Protocol](https://datatracker.ietf.org/doc/html/draft-thomson-webpush-http2)
- [Supabase Edge Functions](https://supabase.com/docs/guides/functions)
- [VAPID Key Generation](https://web.dev/push-notifications-web-push-protocol/)

---

**🎉 Your notification system is ready!**

Users will now receive push notifications whenever you publish new content.

*Created: 2026-08-17*
