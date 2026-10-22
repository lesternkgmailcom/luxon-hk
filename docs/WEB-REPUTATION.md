# Web Reputation & Filter Categorization Runbook

**Why this exists:** corporate web filters categorized `luxon.hk` as
"Personal Blogs", so some company networks block or warn on the site. This is a
categorization problem, not a malware flag — Google Safe Browsing shows no
issues and the site has no bad public reputation.

Filters auto-bucket small domains that (a) sit on shared hosting associated
with personal sites (GitHub Pages / Fastly) and (b) carry no business signals.
The fix has two layers, both reflected below:

1. **Make the site look and behave like a business** (done — see below).
2. **Request recategorization** with each filter vendor (user submits forms).

---

## Done on 2026-10-23

| Item | Detail |
|------|--------|
| Trust pages | `/about`, `/privacy`, `/terms` in EN, zh-HK, zh-CN + footer links |
| Structured data | schema.org `Organization` JSON-LD on every page (name, email, LinkedIn, areaServed) |
| Social meta | `og:*` + `twitter:*` tags site-wide (1200×630 `og-image.png`) |
| robots.txt | `/robots.txt` → sitemap-index.xml |
| HSTS | Cloudflare zone setting `security_header`: `max-age=31536000; includeSubDomains` + `X-Content-Type-Options: nosniff` (live, verified) |
| Apex redirect | `luxon.hk` → 301 → `https://www.luxon.hk/` (GitHub Pages, works through Cloudflare proxy) |

---

## User step 1 — Google Search Console (~5 min)

1. Open <https://search.google.com/search-console> → add property → **Domain** → `luxon.hk`.
2. Google shows a TXT token (`google-site-verification=...`). Create the DNS
   record with the Bitwarden item **"Cloudflare API Token (luxon.hk DNS)"**
   (has DNS write):

   ```bash
   TOKEN=<bitwarden token>; Z=e4c3071b14f7f9d1dc0e823f6eab800b
   curl -X POST -H "Authorization: Bearer $TOKEN" -H "Content-Type: application/json" \
     "https://api.cloudflare.com/client/v4/zones/$Z/dns_records" \
     --data '{"type":"TXT","name":"luxon.hk","content":"\"<google-site-verification token>\"","ttl":3600}'
   ```

3. Back in GSC, click Verify, then submit sitemap: `https://www.luxon.hk/sitemap-index.xml`.

GSC is also the review channel if Google ever flags the site (it currently
does not — check <https://transparencyreport.google.com/safe-browsing/search?url=luxon.hk>).

## User step 2 — Filter recategorization submissions (~15 min total)

**Category to request:** *Business / Corporate sites* (some vendors: "Information Technology" or "Business — Computing/Technology").

**Paste-ready site description:**

> Luxon is a Hong Kong-based technology business that builds AI Workers
> (autonomous AI assistants) and custom AI solutions for small and medium
> enterprises. https://www.luxon.hk is the company's commercial website: it
> presents the products and services (AI Workers, custom dashboards and
> automation), case studies, pricing, a blog, an AI lessons hub, and company
> information (about, privacy policy, terms of use). Contact:
> info@luxon.hk, WhatsApp +852 9738 1028, LinkedIn: Luxon HK. The site hosts
> no user-generated content, no advertising and no personal blog content.

**Vendors** (free forms, CAPTCHA-gated; turnaround days–2 weeks except where noted):

| Vendor | Check current category | Request change |
|--------|------------------------|----------------|
| Fortinet FortiGuard | <https://www.fortiguard.com/webfilter> | Same page → "Submit a site for categorization" (typically ~24 h) |
| Palo Alto Networks | <https://urlfiltering.paloaltonetworks.com/> | Same page → "Request URL Category Change" |
| Broadcom / Symantec (Blue Coat) | <https://sitereview.bluecoat.com/> | Same tool → consider for a different category |
| Zscaler | <https://ip.zscaler.com/?url=www.luxon.hk> | Follow the "categorization change" link on the result page, or Zscaler support portal |
| Cisco Umbrella / Talos | <https://talosintelligence.com/reputation_center/lookup?query=www.luxon.hk> | Cisco/Talos support — dispute categorization |
| Sophos | — | <https://secure2.sophos.com/en-us/support/site-review.aspx> → "Suggest a categorization change" (~5 business days) |
| Mimecast | (vendor used by some HK companies) | If your company uses Mimecast web security, ask their IT to recategorize |

**Fastest fix for one specific company:** their IT helpdesk submits an internal
recategorization/allow request with their own vendor — this takes hours, not
weeks, and usually doesn't even need the public forms.

Re-check each lookup ~1 week after submitting; re-test from the company network.

---

## Remaining hardening — Cloudflare dashboard (~5 min, needs login)

Neither stored API token has **Transform Rules** scope, so these response
headers must be added in the dashboard:
<https://dash.cloudflare.com> → zone **luxon.hk** → **Rules → Transform Rules
→ Response header modify** (note: the UI may place this under "Transform" or
"Response stream transform" depending on the dashboard version).

Create one rule, name `business-security-headers`:

- **If:** Hostname equals `www.luxon.hk` **OR** Hostname equals `luxon.hk`
- **Then (set static headers):**

| Header | Value |
|--------|-------|
| `X-Frame-Options` | `SAMEORIGIN` |
| `Referrer-Policy` | `strict-origin-when-cross-origin` |
| `Content-Security-Policy-Report-Only` | see below |

CSP suggested value (report-only first — it cannot break anything; watch
browser consoles for a week, then promote to `Content-Security-Policy`):

```
default-src 'self'; script-src 'self' 'unsafe-inline' https://www.googletagmanager.com; style-src 'self' 'unsafe-inline' https://fonts.googleapis.com; font-src 'self' data: https://fonts.gstatic.com; img-src 'self' data: https:; connect-src 'self' https://chat.luxon.hk https://*.google-analytics.com https://*.analytics.google.com; object-src 'none'; base-uri 'self'; frame-ancestors 'self'
```

---

## Credentials used

| Credential | Location | Scope |
|------------|----------|-------|
| Cloudflare API Token (luxon.hk DNS) | Bitwarden item | Zone read + **DNS write** (used for records; no zone-settings/transform scope) |
| cloudflare-api-token | macOS Keychain | Zone settings read/write (used for HSTS); no Transform Rules scope |
