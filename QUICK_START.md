# Quick Start - Production Deployment

## 🚀 Deploy to Production in 5 Minutes

### Option 1: Deploy via Vercel Dashboard (Easiest)
1. Go to https://vercel.com/dashboard
2. Select project: `Game-2.0` (Org: RahmannCH)
3. Go to **Deployments** tab
4. Latest deployment from `production-deployment` branch will auto-deploy
5. Done! Your game is live

### Option 2: Deploy via Git
```bash
# Merge main into production-deployment
git checkout production-deployment
git pull origin main
git push origin production-deployment

# Vercel automatically deploys on push
```

### Option 3: Deploy via Vercel CLI
```bash
# Install Vercel CLI
npm i -g vercel

# Deploy to production
vercel --prod
```

---

## 🌐 Set Up Custom Domain (10 Minutes)

### Quick Path:
1. **Go to:** https://vercel.com/dashboard → Settings → Domains
2. **Click:** Add Domain
3. **Enter:** Your domain (e.g., `tycoon-game.com`)
4. **Configure DNS** using your registrar (Namecheap, GoDaddy, etc.):
   - Use Vercel nameservers, OR
   - Add A record: `76.76.19.165`
5. **Wait** 24-48 hours for DNS propagation
6. **Verify:** Domain resolves to https://tycoon-game.com ✓

**Full Guide:** See `CUSTOM_DOMAIN_SETUP.md`

---

## ✅ Pre-Deployment Checklist

Before pushing to production, verify:
- [ ] Game tested in Chrome, Firefox, Safari
- [ ] Game responsive on mobile
- [ ] No console errors (F12 → Console)
- [ ] All audio files play
- [ ] Shop and Market modals work
- [ ] No sensitive data in code

**Full Checklist:** See `PRODUCTION_CHECKLIST.md`

---

## 📊 Monitor Deployment

### Check Status
```bash
vercel --prod
```

### View Logs
```bash
vercel logs --prod
```

### Check Domain
- Visit: https://yourdomain.com
- Open DevTools (F12)
- Check Network tab for any 404 errors
- Verify game loads within 3 seconds

---

## 🔄 Update Production

### Push New Changes
```bash
git add .
git commit -m "Fix: improve game balance"
git push origin main

# Then merge to production-deployment
git checkout production-deployment
git pull origin main
git push origin production-deployment
```

### Rollback Bad Deployment
```bash
# Option 1: Via Dashboard
# Deployments tab → Select previous good version → Promote

# Option 2: Via CLI
vercel rollback --prod

# Option 3: Via Git
git revert HEAD
git push origin production-deployment
```

---

## 🎮 Test Your Game

After deployment, test:
1. **Load Time:** Should load in < 3 seconds
2. **Navigation:** All buttons work (Shop, Farm, Market)
3. **Modals:** Shop and Market open/close correctly
4. **Game Logic:** Coins update, crops grow
5. **Audio:** Sound effects play without errors
6. **Mobile:** Responsive on phone/tablet
7. **Security:** HTTPS enabled (green lock icon)

---

## 📁 Key Files

| File | Purpose |
|------|---------|
| `vercel.json` | Production config (caching, headers, regions) |
| `DEPLOYMENT.md` | Comprehensive deployment guide |
| `CUSTOM_DOMAIN_SETUP.md` | Step-by-step domain configuration |
| `PRODUCTION_CHECKLIST.md` | Pre/post deployment verification |
| `.env.production` | Production environment variables |
| `index.html` | Updated with SEO and metadata |

---

## 🆘 Troubleshooting

### Game not loading?
```bash
# Check build
vercel logs --prod

# Check domain DNS
dig yourdomain.com
nslookup yourdomain.com

# Clear cache and retry
```

### Assets not loading?
- Check Network tab in DevTools (F12)
- Look for 404 errors
- Verify file paths in code

### Domain not working?
- Wait 24-48 hours for DNS propagation
- Check status: https://whatsmydns.net/
- Verify DNS in Vercel dashboard

### Performance slow?
- Check Network tab for large files
- Consider optimizing images/audio
- Enable gzip compression (automatic on Vercel)

---

## 📞 Support

- **Vercel Docs:** https://vercel.com/docs
- **Repository:** https://github.com/RahmannCH/Game-2.0
- **Project ID:** `prj_bPFMbgT3HHCHBSp6DjI4FWGoKtn8`

---

## 🎯 Next Steps

1. ✅ Review this guide
2. ✅ Run production checklist
3. ✅ Deploy to production
4. ✅ Set up custom domain
5. ✅ Test game thoroughly
6. ✅ Monitor performance
7. ✅ Share with users!

---

**Happy deploying! 🎉**
