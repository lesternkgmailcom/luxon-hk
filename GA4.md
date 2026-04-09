# GA4 Setup — luxon.hk

## Measurement ID
`G-H9BMR3XD45`

## Property
- **Account**: Luxon HK
- **Property**: luxon.hk
- **Timezone**: Asia/Hong_Kong
- **Currency**: HKD
- **Data Stream**: luxon.hk (web)
- **URL**: https://analytics.google.com

## Files Modified
- `index.html` — gtag.js in `<head>` after twitter:card meta
- `pricing.html` — gtag.js in `<head>` after twitter:card meta
- `script.js` — WhatsApp CTA click event tracking

## UTM Template

Base URL: `https://luxon.hk` or `https://luxon.hk/pricing.html`

```
?utm_source=[source]&utm_medium=[medium]&utm_campaign=[campaign]
```

### Standard Sources

| utm_source | utm_medium | Use for |
|-----------|-----------|---------|
| `linkedin` | `social` | LinkedIn posts, comments, profile link |
| `xhs` | `social` | Xiaohongshu (小红书) posts |
| `facebook` | `social` | Facebook posts, groups |
| `whatsapp` | `referral` | WhatsApp shares |
| `google` | `organic` | Google search (auto-tagged, don't add manually) |
| `google` | `cpc` | Google Ads (if used later) |
| `direct` | `none` | Direct traffic (auto-tagged) |
| `newsletter` | `email` | Email campaigns |

### Campaign Names

| utm_campaign | Description |
|-------------|-------------|
| `launch` | General brand awareness |
| `pricing` | Pricing page focused |
| `testimonial` | Testimonial/social proof content |
| `ai_employee` | AI employee feature content |
| `security` | Security/hardening focused |
| `hk_sme` | Hong Kong SME targeted |
| `case_study` | Case study / customer story |

### Ready-to-use URLs

```
# LinkedIn
https://luxon.hk/?utm_source=linkedin&utm_medium=social&utm_campaign=launch
https://luxon.hk/pricing.html?utm_source=linkedin&utm_medium=social&utm_campaign=pricing

# Xiaohongshu
https://luxon.hk/?utm_source=xhs&utm_medium=social&utm_campaign=ai_employee
https://luxon.hk/pricing.html?utm_source=xhs&utm_medium=social&utm_campaign=pricing

# WhatsApp shares
https://luxon.hk/?utm_source=whatsapp&utm_medium=referral&utm_campaign=launch

# Newsletter
https://luxon.hk/?utm_source=newsletter&utm_medium=email&utm_campaign=launch
```

## Events Tracked

| Event | Trigger | Purpose |
|-------|---------|---------|
| `page_view` | All pages (auto) | Traffic tracking |
| `scroll` | 90% scroll depth (enhanced) | Engagement |
| `click` | Outbound links (enhanced) | Where visitors go |
| `cta_click` | WhatsApp button click | Conversion intent |

## Notes
- Enhanced measurement enabled (page views, scrolls, outbound clicks, site search, video engagement)
- GA4 real-time data appears within ~5 minutes
- Historical data only starts from property creation date
