# 🚀 Deploying Ahenkan Football Academy PWA

## Pre-Deployment Checklist

- ✅ HTTPS enabled on your domain
- ✅ SSL certificate installed (trusted CA)
- ✅ Build completed successfully
- ✅ All PWA files present
- ✅ Manifest.json is valid
- ✅ Service Worker installed

---

## Deployment Steps

### **Step 1: Set Up HTTPS**

#### **Option A: Using Let's Encrypt (Free)**
```bash
# Install Certbot
sudo apt install certbot python3-certbot-nginx

# Generate certificate
sudo certbot certonly --nginx -d ahenkanfootballacademy.com

# Auto-renew setup
sudo systemctl enable certbot.timer
```

#### **Option B: Using Cloudflare (Free + CDN)**
1. Add domain to Cloudflare
2. Change nameservers at registrar
3. Enable "Full" SSL in Cloudflare
4. Force HTTPS redirection

#### **Option C: Paid SSL Certificate**
1. Purchase from: Namecheap, GoDaddy, etc.
2. Install on web server
3. Configure renewal

---

### **Step 2: Prepare Files for Production**

```bash
# Build the project
npm run build

# Output goes to: dist/

# Files to deploy:
# - dist/index.html
# - dist/assets/ (CSS, JS)
# - dist/[other files]
# - public/sw.js
# - public/manifest.json
```

### **Step 3: Deploy to Web Server**

#### **Using Vercel (Recommended)**
```bash
# Install Vercel CLI
npm install -g vercel

# Deploy
vercel

# Automatic HTTPS, CDN, and auto-scaling included
```

#### **Using Netlify**
```bash
# Install Netlify CLI
npm install -g netlify-cli

# Deploy
netlify deploy --prod --dir=dist

# Automatic HTTPS, CDN included
```

#### **Using GitHub Pages**
```bash
# Update package.json
"homepage": "https://yourusername.github.io/ahenkan-academy"

# Deploy
npm run build
npm run deploy
```

#### **Using Traditional Web Server (Nginx)**
```bash
# Copy files to web server
scp -r dist/* user@server:/var/www/ahenkan/

# Configure Nginx
sudo nano /etc/nginx/sites-available/ahenkan
```

**Nginx Configuration**:
```nginx
server {
    listen 443 ssl http2;
    server_name ahenkanfootballacademy.com;

    # SSL certificate
    ssl_certificate /etc/letsencrypt/live/ahenkanfootballacademy.com/fullchain.pem;
    ssl_certificate_key /etc/letsencrypt/live/ahenkanfootballacademy.com/privkey.pem;

    # Security headers
    add_header Strict-Transport-Security "max-age=31536000; includeSubDomains" always;
    add_header X-Content-Type-Options "nosniff" always;
    add_header X-Frame-Options "SAMEORIGIN" always;

    # Root directory
    root /var/www/ahenkan;
    index index.html;

    # Service Worker (don't cache)
    location = /sw.js {
        add_header Cache-Control "public, max-age=3600";
    }

    # Manifest (don't cache long)
    location = /manifest.json {
        add_header Cache-Control "public, max-age=3600";
        add_header Content-Type "application/manifest+json";
    }

    # Cache static assets
    location ~* \.(js|css|png|jpg|jpeg|gif|ico|svg|woff|woff2|ttf|eot)$ {
        add_header Cache-Control "public, max-age=31536000, immutable";
    }

    # Route all other requests to index.html (SPA)
    location / {
        try_files $uri $uri/ /index.html;
        add_header Cache-Control "public, max-age=3600";
    }
}

# Redirect HTTP to HTTPS
server {
    listen 80;
    server_name ahenkanfootballacademy.com;
    return 301 https://$server_name$request_uri;
}
```

#### **Using Apache**
```apache
<VirtualHost *:443>
    ServerName ahenkanfootballacademy.com
    DocumentRoot /var/www/ahenkan

    # SSL
    SSLEngine on
    SSLCertificateFile /etc/letsencrypt/live/ahenkanfootballacademy.com/fullchain.pem
    SSLCertificateKeyFile /etc/letsencrypt/live/ahenkanfootballacademy.com/privkey.pem

    # Security headers
    Header always set Strict-Transport-Security "max-age=31536000; includeSubDomains"
    Header always set X-Content-Type-Options "nosniff"
    Header always set X-Frame-Options "SAMEORIGIN"

    # Service Worker
    <Files "sw.js">
        Header set Cache-Control "public, max-age=3600"
    </Files>

    # Manifest
    <Files "manifest.json">
        Header set Cache-Control "public, max-age=3600"
        Header set Content-Type "application/manifest+json"
    </Files>

    # Static assets
    <FilesMatch "\\.(js|css|png|jpg|jpeg|gif|ico|svg|woff|woff2|ttf|eot)$">
        Header set Cache-Control "public, max-age=31536000, immutable"
    </FilesMatch>

    # SPA routing
    <IfModule mod_rewrite.c>
        RewriteEngine On
        RewriteBase /
        RewriteRule ^index\.html$ - [L]
        RewriteCond %{REQUEST_FILENAME} !-f
        RewriteCond %{REQUEST_FILENAME} !-d
        RewriteRule . /index.html [L]
    </IfModule>
</VirtualHost>

# Redirect HTTP to HTTPS
<VirtualHost *:80>
    ServerName ahenkanfootballacademy.com
    Redirect / https://ahenkanfootballacademy.com/
</VirtualHost>
```

---

### **Step 4: Verify PWA Setup**

```bash
# Test HTTPS
curl -I https://ahenkanfootballacademy.com

# Check manifest
curl https://ahenkanfootballacademy.com/manifest.json

# Check service worker
curl https://ahenkanfootballacademy.com/sw.js

# Check headers
curl -I https://ahenkanfootballacademy.com
```

Expected headers:
```
HTTP/2 200
Content-Type: text/html
Strict-Transport-Security: max-age=31536000; includeSubDomains
X-Content-Type-Options: nosniff
X-Frame-Options: SAMEORIGIN
```

---

### **Step 5: Test PWA in Production**

#### **Desktop Browser**
1. Open Chrome/Edge
2. Visit `https://ahenkanfootballacademy.com`
3. Click ⋮ menu → "Install app"
4. Verify installation works

#### **Android Phone**
1. Open Chrome
2. Visit `https://ahenkanfootballacademy.com`
3. Tap ⋮ menu → "Install app"
4. Check home screen for app

#### **iPhone**
1. Open Safari
2. Visit `https://ahenkanfootballacademy.com`
3. Tap Share → "Add to Home Screen"
4. Check home screen for app

#### **Offline Testing**
1. Install app
2. Open DevTools (F12) → Network tab
3. Check "Offline" checkbox
4. App should still work
5. Reload page → should still load

#### **Lighthouse Audit**
1. Open DevTools
2. Go to Lighthouse tab
3. Run PWA audit
4. Check score and recommendations

---

## Environment Setup

### **Required Environment Variables**

In your `.env` or deployment platform:

```env
# Supabase
VITE_SUPABASE_URL=https://your-project.supabase.co
VITE_SUPABASE_ANON_KEY=your_anon_key_here

# Optional
VITE_API_URL=https://your-project.supabase.co/functions/v1
```

### **Supabase Setup**

1. **Create project** at supabase.com
2. **Set environment variables** in Supabase dashboard
3. **Deploy functions**:
   ```bash
   supabase functions deploy improve-with-ai
   ```
4. **Set function secrets**:
   - Go to Edge Functions → Settings
   - Add `GROQ_API_KEY` = your_key
   - Add `SUPABASE_URL` = your_url
   - Add `SUPABASE_ANON_KEY` = your_key

---

## Post-Deployment Tasks

### **1. Enable Push Notifications**
```bash
# Generate VAPID keys (run locally)
npx web-push generate-vapid-keys

# Save public and private keys to Supabase
# Private key in function secrets
# Public key in client code
```

### **2. Set Up Analytics**
```javascript
// Track PWA installations
window.addEventListener('appinstalled', () => {
  analytics.logEvent('app_installed', {
    platform: 'pwa',
    timestamp: new Date()
  });
});

// Track usage
window.addEventListener('load', () => {
  if (window.matchMedia('(display-mode: standalone)').matches) {
    analytics.logEvent('app_launched', {
      mode: 'installed'
    });
  }
});
```

### **3. Monitor Performance**
```bash
# Check Lighthouse scores
curl -X POST https://www.googleapis.com/pagespeedonline/v5/runPagespeed \
  -d url=https://ahenkanfootballacademy.com

# Monitor service worker
# Chrome DevTools → Application → Service Workers
```

### **4. Set Up Monitoring**
- Use Sentry for error tracking
- Use Firebase/Mixpanel for analytics
- Set up uptime monitoring

---

## Troubleshooting Deployment

### **"HTTPS not working"**
```bash
# Check SSL certificate
openssl s_client -connect ahenkanfootballacademy.com:443

# Verify certificate chain
openssl s_client -showcerts -connect ahenkanfootballacademy.com:443
```

### **"Service Worker not registering"**
```bash
# Check HTTPS is enabled
# Check manifest.json exists
# Check browser console for errors
# Verify MIME types are correct
```

### **"App won't install"**
```bash
# Check manifest.json syntax
# Verify icons are accessible
# Check CORS headers
# Clear browser cache and try again
```

### **"Build too large"**
```bash
# Optimize bundle
npm install -g bundle-analyzer
webpack-bundle-analyzer dist

# Use code splitting
# Lazy load routes
# Compress images
```

---

## Maintenance

### **Regular Tasks**
- ✅ Monitor error logs (Sentry)
- ✅ Check PWA scores (Lighthouse)
- ✅ Update dependencies monthly
- ✅ Renew SSL certificate (auto if Let's Encrypt)
- ✅ Monitor uptime and performance

### **Updates**
```bash
# Build new version
npm run build

# Deploy new version
vercel deploy --prod  # or your deployment command

# Service Worker auto-updates clients
# No need to manually invalidate cache
```

### **Rollback**
```bash
# If deployment fails, rollback immediately
vercel rollback  # or git revert + redeploy
```

---

## Success Indicators ✅

After successful deployment:

- ✅ HTTPS certificate is valid
- ✅ PWA installs on Android (Chrome menu)
- ✅ PWA installs on iOS (Share menu)
- ✅ PWA installs on Desktop (browser menu)
- ✅ App works offline
- ✅ Service Worker is registered
- ✅ Cache is populated
- ✅ Lighthouse PWA score ≥ 90

---

## Quick Reference

### **Vercel Deploy** (Fastest)
```bash
npm run build && vercel --prod
```

### **Netlify Deploy**
```bash
npm run build && netlify deploy --prod --dir=dist
```

### **Traditional Server**
```bash
npm run build && scp -r dist/* server:/var/www/app/
```

---

**Your PWA is now live and installable on all devices! 🎉**

For issues, check:
1. `PWA_INSTALLATION_GUIDE.md` - User guide
2. `PWA_TECHNICAL_DOCS.md` - Technical details
3. Browser console - Error messages
4. DevTools Application tab - Service Worker status

*Deployment guide created: 2026-08-17*
