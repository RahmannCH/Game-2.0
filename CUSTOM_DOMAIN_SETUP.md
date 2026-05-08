# Custom Domain Setup Guide

## Quick Start

Your Tycoon 2.0 game is ready to be deployed to a custom domain. Follow these steps:

---

## Step 1: Prepare Your Domain

You can use one of these domain registrars:
- **Vercel Domains** (managed directly in Vercel)
- **Namecheap**
- **GoDaddy**
- **Route53** (AWS)
- **Cloudflare**
- Any other registrar

---

## Step 2: Add Domain to Vercel

### Via Vercel Dashboard (Recommended)
1. Go to: https://vercel.com/dashboard
2. Select your project: `Game-2.0`
3. Click **Settings** → **Domains**
4. Click **Add Domain**
5. Enter your domain (e.g., `tycoon-game.com`)
6. Click **Add**

### Via Vercel CLI
```bash
# Install Vercel CLI if needed
npm i -g vercel

# Login to your Vercel account
vercel login

# Add domain to your project
vercel domains add tycoon-game.com --project=prj_bPFMbgT3HHCHBSp6DjI4FWGoKtn8
```

---

## Step 3: Configure DNS

### If Using Vercel Nameservers (Recommended)
Vercel will provide nameserver records. In your domain registrar:
1. Go to DNS/Nameserver settings
2. Replace existing nameservers with Vercel's:
   - `ns1.vercel-dns.com`
   - `ns2.vercel-dns.com`
   - `ns3.vercel-dns.com`
   - `ns4.vercel-dns.com`
3. Save and wait 24-48 hours for propagation

### If Using Custom Nameservers
If your domain registrar doesn't support nameserver changes, use A records:

1. In your domain registrar's DNS settings, add:
   - **Type:** A
   - **Name:** @ (root domain) or subdomain
   - **Value:** `76.76.19.165` (Vercel IP)
   - **TTL:** 3600 (or auto)

2. For www subdomain, add:
   - **Type:** CNAME
   - **Name:** www
   - **Value:** `cname.vercel-dns.com`
   - **TTL:** 3600

---

## Step 4: Verify Domain Connection

### Check Domain Status
```bash
# Using Vercel CLI
vercel domains list --project=prj_bPFMbgT3HHCHBSp6DjI4FWGoKtn8

# Check DNS propagation
dig tycoon-game.com
nslookup tycoon-game.com
```

### Wait for DNS Propagation
DNS changes can take 2-48 hours to propagate globally. You can check status at:
- https://www.whatsmydns.net/
- https://dnschecker.org/

---

## Step 5: Test Your Domain

Once DNS is configured:
1. Open your domain in a browser: `https://tycoon-game.com`
2. Verify the game loads correctly
3. Check browser console (F12) for any errors
4. Test game functionality (click buttons, interact)

---

## Common DNS Configurations

### Namecheap
1. Log in to Namecheap
2. Go to **Domain List** → Select your domain
3. Click **Manage**
4. Go to **Nameservers** tab
5. Select **Custom DNS**
6. Enter Vercel nameservers

### GoDaddy
1. Log in to GoDaddy
2. Click **My Products** → Select domain
3. Click **Manage DNS**
4. Change nameservers to Vercel's
5. Or manually add A records

### Cloudflare (Advanced)
1. Add site to Cloudflare
2. Update nameservers at your registrar
3. In Cloudflare DNS:
   - Add A record: `@` → `76.76.19.165`
   - Add CNAME: `www` → `cname.vercel-dns.com`

---

## HTTPS & SSL Certificate

✅ **Automatic:** Vercel automatically provisions Let's Encrypt SSL certificates for all domains at no extra cost.

Your domain will be:
- Accessible via HTTPS automatically
- Redirected from HTTP → HTTPS
- Protected with a valid SSL certificate

---

## SSL Certificate Status

Check certificate status in Vercel Dashboard:
1. **Settings** → **Domains**
2. Click your domain
3. View certificate details

Certificates auto-renew 30 days before expiration.

---

## Troubleshooting

### Domain not resolving
```bash
# Check current DNS records
nslookup tycoon-game.com
dig tycoon-game.com

# Results should show Vercel IPs
# Expected: 76.76.19.165 (or Vercel nameserver IPs)
```

**Solution:** Wait 24-48 hours, check DNS propagation site

### CNAME/A record conflicts
**Problem:** Some registrars don't allow A records at root domain with CNAME elsewhere

**Solutions:**
1. Use Vercel's nameserver approach (recommended)
2. Use Apex domain redirect if supported
3. Use ALIAS or ANAME record (if registrar supports)

### Game not loading after domain setup
1. Check browser console (F12 → Console tab)
2. Check Network tab for failed requests
3. Verify domain is properly configured in Vercel
4. Clear browser cache: Ctrl+Shift+Del (or Cmd+Shift+Del on Mac)

### SSL Certificate not issuing
- Wait 24 hours for automatic issuance
- Check Vercel dashboard for certificate status
- Verify domain DNS is properly configured
- Contact Vercel support if issue persists

---

## Advanced: Multiple Domains

To host on multiple domains (e.g., www and non-www):

```bash
vercel domains add tycoon-game.com
vercel domains add www.tycoon-game.com
```

Configure DNS for both domains pointing to same Vercel project.

---

## Advanced: Subdomain Setup

Host game on a subdomain (e.g., `play.yourdomain.com`):

1. Add to Vercel:
   ```bash
   vercel domains add play.yourdomain.com
   ```

2. In your registrar's DNS:
   - **Type:** CNAME
   - **Name:** play
   - **Value:** `cname.vercel-dns.com`

---

## Next Steps

After domain setup:
1. Share your game URL: `https://tycoon-game.com`
2. Monitor analytics in Vercel Dashboard
3. Set up Google Analytics or Vercel Analytics for game metrics
4. Consider adding authentication if planning features (accounts, leaderboards)
5. Plan backend infrastructure if adding data storage

---

## Support

- **Vercel Docs:** https://vercel.com/docs/concepts/get-started/domains
- **DNS Issues:** https://mxtoolbox.com/
- **Domain Transfer:** https://vercel.com/docs/concepts/projects/domains/transferring-a-domain
