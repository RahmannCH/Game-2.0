# Production Deployment Guide - Tycoon 2.0

## Overview
Tycoon 2.0 is a Phaser 3 farm simulator deployed to Vercel with automatic deployments from the `production-deployment` branch.

**Project Details:**
- **Vercel Project ID:** `prj_bPFMbgT3HHCHBSp6DjI4FWGoKtn8`
- **Organization ID:** `team_InC6kjXiDL3BA2BWkCyyJyIb`
- **Repository:** `RahmannCH/Game-2.0`
- **Production Branch:** `production-deployment`
- **Development Branch:** `main`

---

## Deployment Configuration

### vercel.json Settings
The project includes optimized production settings:

- **Build Command:** Static site (no build step needed)
- **Caching Strategy:** 
  - Assets (JS, CSS, images): 1 year cache (immutable)
  - HTML: Short-lived cache with stale-while-revalidate
  - Default: 1 hour cache
- **Security Headers:** 
  - X-Content-Type-Options: nosniff
  - X-Frame-Options: SAMEORIGIN
  - X-XSS-Protection enabled
- **Region:** Mumbai (bom1) - adjust as needed

---

## Custom Domain Setup

### Option 1: Add Domain via Vercel UI
1. Go to Vercel Dashboard → Project Settings → Domains
2. Click "Add Domain"
3. Enter your custom domain (e.g., `tycoon-game.com`)
4. Follow DNS configuration instructions from your domain registrar
5. DNS records typically needed:
   - A record pointing to Vercel
   - CNAME record (if subdomain)

### Option 2: Using Vercel CLI
```bash
vercel domains add your-domain.com
```

### Option 3: Environment Variable Setup
For programmatic domain management, set in `vercel.json`:
```json
{
  "domains": ["tycoon-game.com", "www.tycoon-game.com"]
}
```

---

## Deployment Workflow

### 1. Development → Production
```bash
# Make changes on main branch
git checkout main
git add .
git commit -m "Feature: add new crop type"
git push origin main

# Create Pull Request to production-deployment
# Once reviewed and merged, Vercel automatically deploys
```

### 2. Direct Production Deployment
```bash
# Direct push to production-deployment (requires approval)
git checkout production-deployment
git pull origin main
git push origin production-deployment
```

### 3. Revert Deployment
```bash
# Vercel automatically keeps previous deployment snapshots
# Use Vercel Dashboard to rollback to any previous deployment
```

---

## Performance Optimization

### Asset Optimization (Already Configured)
- **Static Assets:** Cached for 1 year with immutable flag
- **HTML:** Uses `stale-while-revalidate` for instant stale content while fetching updates
- **Compression:** Vercel automatically gzips/brotli compresses files

### Recommended Optimizations

#### 1. Image Optimization
```bash
# Replace player_spritesheet.png with optimized version
# Recommended formats: WebP for modern browsers, PNG fallback
```

#### 2. Audio Files
Currently serving uncompressed WAV files (large). Consider:
- Convert to MP3/OGG for 50-70% size reduction
- Implement lazy loading for background audio

#### 3. Phaser Library CDN
Currently using Phaser from CDN. Verify latest version:
```html
<!-- Current: 3.60.0 -->
<script src="https://cdn.jsdelivr.net/npm/phaser@3.60.0/dist/phaser.min.js"></script>
```

---

## Monitoring & Troubleshooting

### Check Deployment Status
```bash
vercel --prod
```

### View Logs
```bash
vercel logs
```

### Common Issues

**Issue: Domain not resolving**
- Solution: Verify DNS propagation (can take 24-48 hours)
- Check: `dig tycoon-game.com` to confirm DNS setup

**Issue: Game not loading**
- Check browser console for script errors
- Verify all JavaScript files are accessible
- Check Network tab for 404 errors

**Issue: High load times**
- Monitor asset sizes in DevTools Network tab
- Consider compressing audio files
- Enable gzip compression (automatic on Vercel)

---

## Security Checklist

- [x] Security headers configured
- [x] No sensitive data in client code
- [x] CDN caching configured
- [ ] Add HTTPS only redirect (automatic on Vercel)
- [ ] Consider adding rate limiting for future backend services
- [ ] Test game on various browsers and devices

---

## Environment Variables

Currently no environment variables needed for production. If adding backend services in future:

```bash
vercel env pull  # Download current env vars
vercel env add VARIABLE_NAME  # Add new environment variable
```

---

## Contact & Support

- **Repository:** https://github.com/RahmannCH/Game-2.0
- **Vercel Project:** https://vercel.com/dashboard/prj_bPFMbgT3HHCHBSp6DjI4FWGoKtn8
- **Branch:** `production-deployment`

---

## Next Steps

1. Configure your custom domain
2. Test game in production environment
3. Monitor performance metrics in Vercel Analytics
4. Set up automated backups if needed
5. Plan for future scaling (backend APIs, database, etc.)
