# Luxon.hk Website Rebuild Plan

> **Status:** Approved — decisions locked 2026-07-14
> **Date:** 2026-07-14
> **Goal:** Pivot Luxon from "AI assistant installation service" to "AI solutions provider for SMEs" with two product lines
>
> **Locked decisions:**
> - **i18n:** Astro content collections — one file per locale per page (`en/`, `zh-HK/`, `zh-CN/`)
> - **Tailwind:** v4 (CSS-first config via `@theme` — no `tailwind.config.ts`)
> - **Hosting:** Cloudflare Pages (keeps site + chat worker on one account)
> - **Contact form:** Yes — build it (serverless function → email)

---

## Part 1: Strategic Positioning

### New Tagline
**Current:** "AI, Everything." (vague, product-focused)
**Proposed:** **"AI that fits your business."**

### Two Product Lines

| | AI Workers | AI Solutions |
|---|---|---|
| **What** | Deploy autonomous AI agents that handle daily operations — email, calendar, WhatsApp, Slack, document processing | Build custom AI-powered dashboards, automation pipelines, and data tools |
| **For** | SMEs wanting a "digital employee" without hiring | Companies with repetitive data workflows, manual reporting, rate sheet processing |
| **Deliverable** | Live AI agent running 24/7 | Custom web dashboard + automation system |
| **Pricing** | Tiered packages (keep current pricing page) | Project-based (quote on discovery call) |
| **CTA** | "Get your AI Worker" → WhatsApp / pricing | "Book a Discovery Call" → contact form + WhatsApp |
| **Case Study** | Blog posts (keep existing AI Living content) | MFDB-style dashboard showcases |

### Target Audience
- SMEs in Hong Kong and Asia Pacific
- Decision-makers: CEOs, founders, operations managers
- Non-technical — they buy outcomes, not technology
- Pain point: "We know AI can help, but we don't know where to start"

---

## Part 2: Tech Stack Decision

### Recommendation: Astro + Tailwind CSS v4

**Why Astro over Next.js:**
- Luxon is a **marketing/content site**, not a web app. 95% of pages are static content.
- Astro ships **zero JS by default** — faster Lighthouse scores, better SEO, cheaper hosting.
- Content collections make blog/case study management native (no headless CMS needed initially).
- Interactive islands can be loaded where needed (chat widget, contact form, demo embeds).
- i18n via content collections — one source file per locale per page (`en/`, `zh-HK/`, `zh-CN/`).
- The current site has **no dynamic features** that require Next.js server runtime.

**Why Tailwind v4 over current CSS:**
- Utility-first = faster to build, easier to maintain, consistent design tokens.
- Dark mode, responsive, hover states — all built-in.
- **v4 uses CSS-first config** — design tokens defined via the `@theme` directive in your CSS, *not* a `tailwind.config.ts` file. This is a change from the v3 model: install via the Vite plugin (`@tailwindcss/vite`), not PostCSS. Utility class names are defined directly in CSS, so the design system lives alongside the styles it controls.

**Supporting stack:**
| Tool | Purpose |
|---|---|
| Astro | Framework (SSG, content collections, i18n) |
| Tailwind CSS v4 | Styling (CSS-first `@theme` config, installed via `@tailwindcss/vite`) |
| React (islands) | Interactive components: chat widget, mobile menu, form |
| Cloudflare Pages | Hosting (free tier sufficient; keeps site + chat worker on one account) |
| Cloudflare Functions or Workers | Contact form backend (form → email) |
| Sharp (Astro image optimization) | Image optimization |
| `@astrojs/sitemap` | SEO sitemap |
| `@astrojs/react` | React integration for islands |
| Google Analytics 4 | Analytics (keep existing, ID `G-H9BMR3XD45`) |

**Existing infrastructure that stays as-is:**
- The chat backend at `chat.luxon.hk` (Cloudflare Worker, `worker/src/index.js`) **is not rebuilt**. It stays running and the new site's chat widget client (`chat.js`) is wrapped as a React island that talks to the same endpoint.
- The CNAME (`www.luxon.hk`) and domain stay until DNS cut-over.

**Migration path:**
- Build the Astro site alongside the current static site (no downtime).
- Deploy to Cloudflare Pages at a subdomain first (`staging.luxon.hk` or `new.luxon.hk`).
- Cut over DNS when ready. GitHub Pages → Cloudflare Pages.
- **Redirects:** Old `.html` URLs (`/pricing.html`, `/blog/ai-*.html`, `/learn/lesson-1.html`) become clean URLs under Astro. Configure `301` redirects via Cloudflare Pages (`public/_redirects`) or Astro's `redirects` config so existing indexed pages and inbound links don't 404. See §Phase 6.

---

## Part 3: Site Architecture

### Navigation Structure

```
Home
├── AI Workers        → /ai-workers          (product page)
│   └── Pricing       → /ai-workers/pricing  (current pricing, rebranded)
├── AI Solutions      → /ai-solutions        (product page)
│   ├── Case Studies  → /ai-solutions/cases   (list of showcases)
│   │   ├── MFDB: Ocean Freight Rate Intelligence  → /ai-solutions/cases/ocean-freight-dashboard
│   │   └── [more case studies...]
│   └── Process       → /ai-solutions/process  (how we build)
├── AI Living         → /blog                 (keep existing blog)
├── Learn             → /learn                (keep existing, untouched)
└── Contact           → /contact              (new: contact form + WhatsApp)
```

**Header nav (desktop):**
```
Logo    AI Workers ▾       AI Solutions ▾       AI Living    Learn    [Get Started]
            └── Pricing            └── Case Studies
                                   └── Our Process
```

**Maximum 7 items. Clean. Two product dropdowns. One CTA button.**
- **AI Workers ▾** → Pricing
- **AI Solutions ▾** → Case Studies, Our Process

### Page-by-Page Specification

---

### 3.1 Homepage (`/`)

**Purpose:** First impression. Clear value prop. Two product teasers. Trust signals. Strong CTA.

**Sections:**

1. **Hero**
   - Headline: "AI that fits your business."
   - Sub-headline: "We build AI Workers and custom AI solutions that integrate into your existing workflow. No hype, no disruption — just results."
   - Two CTAs: "Explore AI Workers" (primary) / "See Our Solutions" (secondary)
   - Visual: Animated mockup or abstract gradient (keep current Economist-style aesthetic)

2. **Trust Strip**
   - **Ship the text fallback at launch:** "From Hong Kong to Singapore · Logistics to Professional Services"
   - Do NOT use placeholder logo boxes. Experienced B2B buyers spot placeholder logos instantly and it hurts credibility more than a text strip helps. Add real client logos only when you have named, permissioned clients.

3. **Product Teasers (2 cards side by side)**
   - **AI Workers card:**
     - Icon + title: "AI Workers"
     - One-liner: "Your 24/7 digital employee. Handles email, calendar, WhatsApp, and more."
     - 3 bullet features: "Autonomous task execution", "Connects to your existing tools", "Live in 24 hours"
     - CTA: "Learn more →"
   - **AI Solutions card:**
     - Icon + title: "AI Solutions"
     - One-liner: "Custom dashboards and automation built around your data."
     - 3 bullet features: "Tailored to your workflow", "Interactive dashboards", "Automates the repetitive"
     - CTA: "See case studies →"

4. **How It Works (3 steps)**
   - Step 1: "Tell us your problem" — Discovery call, understand your workflow
   - Step 2: "We build the solution" — AI Workers deployed same-day; custom solutions in 1-4 weeks
   - Step 3: "You see results" — Measurable outcomes from day one
   - Visual: Horizontal timeline with icons

5. **Featured Case Study (teaser)**
   - Pull in the MFDB case study hero image + headline
   - "How we built an AI-powered rate intelligence dashboard for ocean freight"
   - 2-3 key metrics: "8+ carriers automated", "Daily snapshots in seconds", "Natural language queries"
   - CTA: "Read the full case study →"

6. **FAQ** (keep current, reword for two-product positioning)

7. **Final CTA**
   - "Ready to put AI to work?"
   - WhatsApp button + email

---

### 3.2 AI Workers Page (`/ai-workers`)

**Purpose:** Product page for AI Workers. Explain what it is, what it does, who it's for.

**Sections:**

1. **Hero**
   - Headline: "Your 24/7 AI Worker"
   - Sub: "An autonomous AI agent that handles email, scheduling, customer inquiries, and document processing — so your team can focus on what matters."

2. **What Your AI Worker Can Do** (6 feature cards, 2×3 grid)
   - Email Management — reads, categorizes, drafts replies, follows up
   - Calendar & Scheduling — books meetings, sends reminders, manages conflicts
   - WhatsApp & Messaging — responds to customers, captures leads, answers FAQs
   - Document Processing — extracts data from PDFs, contracts, invoices
   - Daily Briefings — summarizes what happened overnight, priorities for today
   - Task Automation — connects to your tools, executes multi-step workflows

3. **How It's Different** (comparison table)
   | | DIY AI Tools | ChatGPT / Copilot | Luxon AI Worker |
   |---|---|---|---|
   | Setup | Complex | None needed | We handle everything |
   | Connects to your tools | Limited | Partial | Full integration |
   | Autonomous action | No | No | Yes — acts on your behalf |
   | Security | Your problem | Shared data | Sandboxed, hardened |
   | Support | None | Generic | Dedicated, same-day |

4. **Who Is This For?** (3 personas)
   - "Startup founders" — wear too many hats, need help with daily ops
   - "Operations managers" — drowning in email, scheduling, follow-ups
   - "Professional services" — consultants, lawyers, accountants with repetitive admin

5. **CTA → Pricing page**

---

### 3.3 AI Workers Pricing (`/ai-workers/pricing`)

**Purpose:** Keep current pricing with minor rebranding (remove "OpenClaw" mentions, rebrand to "AI Worker").

**Changes from current:**
- Remove all OpenClaw branding and open-source references
- Rename "Installation Service" → "AI Worker Deployment"
- Keep tiers: Starter (HK$3,500), Business (HK$6,500), Enterprise (HK$12,000+)
- Keep WhatsApp CTA
- Keep FAQ section

**Minimal rebrand only — no structural change.** Copy existing pricing.html content into the Astro build, remove OpenClaw branding, rename tiers. Keep the layout, tiers, and WhatsApp CTA as-is.

---

### 3.4 AI Solutions Page (`/ai-solutions`)

**Purpose:** Product page for custom AI solutions. Explain the offering, link to case studies and process.

**Sections:**

1. **Hero**
   - Headline: "AI Solutions Built for Your Business"
   - Sub: "Custom dashboards, automation pipelines, and data tools — designed around the way your team actually works."

2. **What We Build** (4 solution types)
   - **Rate Intelligence Dashboards** — Automated data extraction, comparison views, trend analysis (MFDB example)
   - **Reporting Automation** — Daily/weekly automated reports from spreadsheets, databases, APIs
   - **Workflow Dashboards** — Centralized views of your operations data, real-time monitoring
   - **Document Processing Pipelines** — Extract structured data from unstructured documents (PDFs, emails, images)

3. **Who This Is For** (industries)
   - Logistics & Freight (primary — MFDB is the showcase)
   - Trading & Procurement
   - Finance & Accounting
   - Any business with repetitive data workflows

4. **Case Study Teasers** (3 cards linking to full case studies)
   - MFDB: Ocean Freight Rate Intelligence (primary, detailed)
   - [Placeholder 2]: Market Data Dashboard (can be created from MFDB snapshot)
   - [Placeholder 3]: Document Extraction Pipeline (can be created from mfdb extractors)

5. **Our Process** (link to /ai-solutions/process)

6. **CTA: "Book a Discovery Call"**

---

### 3.5 AI Solutions — Process Page (`/ai-solutions/process`)

**Purpose:** Reduce perceived risk. Show we have a methodology.

**Sections:**

1. **Hero:** "How We Build Your Solution"

2. **Timeline (5 steps, vertical on mobile, horizontal on desktop):**
   1. **Discovery** (Day 1-2) — We learn your workflow, identify automation opportunities, define success metrics
   2. **Design** (Day 3-5) — Architecture, data flow, UI mockups. You approve before we build.
   3. **Build** (Week 1-3) — Iterative development. Weekly demos so you see progress.
   4. **Test & Deploy** (Week 3-4) — User acceptance testing, deployment, training.
   5. **Support** (Ongoing) — Bug fixes, adjustments, scaling as your needs grow.

3. **What You Get:**
   - Interactive dashboard (web-based, works on any device)
   - Automation pipeline (runs on schedule or trigger)
   - Documentation (so your team can use it independently)
   - Source code ownership (you own what we build)

4. **CTA: "Tell us about your project"**

---

### 3.6 AI Solutions — Case Studies

#### 3.6.1 Case Study: MFDB Ocean Freight Rate Intelligence (`/ai-solutions/cases/ocean-freight-dashboard`)

**This is the flagship case study.** Based on the actual mfdb system — a production system processing 13 carriers across 5 trade lanes.

**Structure (Challenge → Solution → Results):**

1. **Challenge**
   - Ocean freight rates change weekly across 13 carriers on 5 major trade lanes (Asia→US/Canada, Asia→Latin America, Asia→Europe)
   - Rate sheets arrive in wildly different formats: Excel (.xls and .xlsx), PDF, Word documents, Outlook .msg emails, inline email text, even PNG screenshots
   - Each carrier has a unique spreadsheet layout — some change their format between filings
   - Manual comparison takes 4+ hours per day — copy-pasting into spreadsheets, prone to errors
   - Rate validity windows expire constantly; missed expirations mean negotiating on stale data
   - Decisions delayed by days, costing real money on missed rate movements and GRI increases

2. **Solution: MFDB — End-to-End Automated Rate Intelligence**
   - **AI-powered extraction engine**: 44 carrier-specific extractor modules that read rate sheets in any format (Excel, PDF, Word, email, PNG via vision AI) and extract structured data into normalized databases
   - **Self-healing pipeline**: Automated email polling every 5 minutes, carrier detection (24+ regex patterns), format-mismatch guards, deduplication, and self-healing reconciliation that retries failures and escalates to humans only when needed
   - **Real-time dashboard** (7 panels): Pipeline health monitoring, carrier coverage heatmap, rate comparison tables with week-over-week deltas, contract validity Gantt chart, trend analysis with Plotly visualizations, extraction log with incident investigation, and natural language query interface
   - **Daily market snapshot**: Automated Excel report generated at 6 PM weekdays, auto-emailed with current rates across all trade lanes
   - **Weekly executive report**: AI-reviewed HTML email with rate tables, regional narratives, and director-level commentary — composed and reviewed by AI agents before sending

3. **Key Features (with dashboard mockup screenshots):**
   - **Rate comparison table** with week-over-week delta column (red = increase, green = decrease)
   - **Trade lane tabs**: TPEB US, TPEB Canada, WCSA, ECSA, EUR — each with per-destination columns
   - **Carrier coverage tracking**: 13-carrier heatmap showing DB data, manual config, and gaps
   - **Contract validity timeline**: Gantt chart with active (green), expiring (amber), and lapsed (red) contracts
   - **Trend analysis**: Multi-carrier line charts with carrier-specific colors, container type selector, trade-average overlay
   - **Natural language query**: Type "Shanghai to Los Angeles 40HC" → instant rate comparison with surcharges and validity
   - **Pipeline health**: Inbox status, verification results, snapshot coverage, action buttons for manual triggers
   - **Incident investigation**: Fuzzy log search, automated classification (wrong carrier, extractor failed, etc.), AI-generated fix prompts

4. **Results:**
   - **13 carriers automated** across 5 trade lanes (was 100% manual for all)
   - **44 specialized extractors** handling Excel, PDF, Word, email, and PNG screenshot formats
   - **Daily snapshot generation in seconds** (was 4+ hours of manual spreadsheet work)
   - **Self-healing pipeline**: retries failed extractions, detects silent drops, ensures every email produces exactly one notification
   - **Natural language queries** replace complex multi-step spreadsheet lookups
   - **Weekly executive report** with AI director review — AI composes and audits the report before it reaches management
   - **Rate change detection** catches GRI increases and validity expirations before they impact negotiations
   - **Quantified:** "Reduced rate comparison time from 4+ hours to under 5 minutes"

   > **⚠ Pre-launch verification required.** The quantified metrics above are
   > written as definitive claims. Before launch, confirm each is *measured*
   > (not aspirational). If a number is an estimate, label it as such
   > ("up to", "typically") or back it with a brief method note. B2B buyers in
   > logistics will probe these on discovery calls — inflated metrics lose trust
   > faster than modest ones build it.

5. **Technology Stack (brief, for credibility):**
   - Python extraction engine with 44 per-carrier parsers
   - 5 SQLite databases with normalized relational schemas (18+ tables each)
   - Streamlit dashboard with 7 panels, Plotly visualizations, dark Bloomberg-terminal theme
   - n8n workflow automation (3 scheduled triggers: email polling every 5 min, daily snapshot at 6 PM, reconciliation loop)
   - Vision AI (glm-4.6v) for OCR of PNG screenshot rate tables
   - AI agent system (Claude Code, 3-tier model routing) for development, debugging, and weekly report generation
   - Zoho Mail IMAP integration, branded HTML notifications, self-healing reconciliation

6. **CTA:** "Want something like this for your business? Book a discovery call."

**Showcase approach for this case study:**
- Use **high-fidelity mockup screenshots** from `docs/mockups/dashboard_redesign.html` (redesign version — polished, professional)
- Also show the **dark Bloomberg-terminal theme** from the live dashboard (`docs/mockups/dashboard_themes.html` Terminal variant) — it looks impressive and enterprise-grade
- Embed a **scrolling image carousel** of 5-6 dashboard views: Rate Tables, Coverage Heatmap, Validity Timeline, Trend Charts, NL Query, Pipeline Health
- Add **annotated callout overlays** pointing to key features
- Keep the Economist-style storytelling from current blog posts
- Consider an **animated pipeline flow diagram** showing: Email → Detection → Extraction → Database → Dashboard/Snapshot/Report

---

#### 3.6.2 Case Study: Automated Market Reporting (`/ai-solutions/cases/market-snapshot`)

**Derived from mfdb snapshot + weekly executive email system.** Same product, different angle.

**Angle:** "From manual spreadsheet compilation to automated, AI-reviewed market intelligence — delivered to your inbox every morning"

- **Challenge:** Regional management needs daily and weekly market rate summaries, but manually compiling rates from 13 carriers across 5 trade lanes takes hours. Different data sources (auto-extracted from DB + manually entered from carriers without extractors) must be combined into a single coherent report. Writing the executive narrative requires domain expertise and management-level tone.
- **Solution:** Two-tier automated reporting system:
  1. **Daily Market Snapshot**: Automated pipeline that pulls rates from SQLite databases + manual carrier config, validates coverage (11 carriers for TPEB, 10 for WCSA, etc.), generates formatted Excel with 5 stacked trade sections, and auto-emails at 6 PM weekdays.
  2. **Weekly Executive Email**: AI agent composes HTML email with rate tables, per-trade WoW rate development analysis, regional narratives sourced from carrier emails, and standing text. A second AI agent role-plays as "Regional Procurement Director" and reviews for content consistency, data accuracy, and management-appropriate tone before sending.
- **Key features:** Validity logic using `today + 7 days` (forward-looking, not backward), per-carrier query patterns for complex routing (CMA Yantian fallback, COSCO gateway routing filter, MSC origin group expansion), backfill from direct DB queries when snapshot drops a carrier, AI director review with 3-axis audit (content/data/tone) and SHIP-IT/FIX-THEN-SHIP/HOLD verdict
- **Results:** "Daily snapshot in 30 seconds instead of 2+ hours. Weekly executive report composed and reviewed by AI — zero human drafting time."

**Showcase:** Side-by-side before/after — raw spreadsheet with manual highlighting vs. formatted Excel + branded HTML email. Flow diagram: DB → Snapshot Builder → Excel → Email.

---

#### 3.6.3 Case Study: Intelligent Document Extraction (`/ai-solutions/cases/document-extraction`)

**Derived from mfdb's 44 carrier-specific extractors + multi-format ingestion pipeline.**

**Angle:** "Extract structured data from any document format — even screenshots — with zero manual entry"

- **Challenge:** Carrier rate sheets arrive in 6+ formats: Excel (.xls and .xlsx), PDF, Word (.docx), Outlook .msg, RFC822 email with inline text, and even PNG screenshots of rate tables embedded in email bodies. Each of 13 carriers uses a different layout — some change it between filings. A single misread cell can mean quoting the wrong rate to a customer.
- **Solution:** Multi-format extraction engine with:
  1. **Intelligent email routing**: 24+ subject regex patterns, 14 trade patterns, 13 sender domain patterns, plus content-based validation as safety net. Auto-renames files to standardized `CARRIER_TRADE_DATE.ext` format.
  2. **44 carrier-specific extractors**: Each tailored to one carrier's format for one trade lane. Handles merged cells, multi-sheet workbooks, dynamic sheet names (substring matching, not hardcoded), semicolon-separated LOCODEs, ordinal-day validity formats, mojibake text repair, gateway routing filters, and more.
  3. **Vision AI for screenshots**: Uses multimodal AI (glm-4.6v) to OCR PNG rate table screenshots from carriers that embed images instead of attaching files.
  4. **Self-healing pipeline**: Format-mismatch guards (rejects PDF dispatched to XLS-only extractor), import-level error containment (one crashing file never blocks the batch), seen-recovery for crashed IMAP polls, deduplication via SHA-256 hashing.
  5. **Post-extraction verification**: Validates contract coverage, rate counts, validity windows. Documents 20+ hard-won failure patterns in an extraction rules knowledge base.
- **Scale:** 44 extractor modules, 13 carriers, 5 trade lanes, 10 container types, 6+ input formats, SHA-256 deduplication
- **Results:** "Process 100+ rate sheets per week across 6 formats with zero manual entry. Error containment ensures one bad file never blocks the rest."

**Showcase:** Before/after comparison — raw rate sheet PDF/Excel/PNG → structured database table. Flow diagram: Email → Detection → Format Routing → Carrier Extractor → SQLite → Verification → Notification.

---

#### 3.6.4 Future Case Studies (framework for later)

These can be added as new client projects come in:

- **[Client] AI Inventory Dashboard** — real-time stock monitoring
- **[Client] Customer Inquiry Automation** — AI Worker handling incoming requests
- **[Client] Financial Report Automation** — automated monthly reporting

---

### 3.7 Blog — AI Living (`/blog`)

**Content: keep as-is. Layout: must be ported to Astro + Tailwind.**

Keep all existing content and the Economist-style chat storytelling format. However, migrating these pages into the Astro build is **not free** — it's a styling port:

- Blog pages currently depend on `blog/styles.css` (5.7KB bespoke classes). These styles must be re-expressed in Tailwind utilities or the legacy CSS shipped alongside Tailwind (pragmatic fallback if time-boxed).
- Blog hero images (resized to 800px in recent commits) carry over as assets.

**Decision: ship legacy CSS for blog section.** The blog styles are stable and a full Tailwind port would consume disproportionate time for no user-visible benefit. The new design system wraps the blog; blog-internal layout stays on its existing CSS until a future cleanup pass.

**Future blog content direction (not now):**
- "How we built an ocean freight dashboard" (technical deep-dive, links to case study)
- "AI Workers vs Chatbots: what's the difference?"
- "5 ways AI can save your operations team 10 hours/week"

---

### 3.8 Learn (`/learn`)

**Content: keep as-is. Layout: must be ported carefully — lesson-1 has custom JS.**

Keep all existing lessons. Lessons 2–8 are standard prose pages — port to the new layout with legacy CSS fallback (same decision as blog). **Lesson-1 requires special handling**:

- It uses `chat-story.js` (vanilla IIFE, IntersectionObserver) + `chat-story.css` (BEM naming, purple user bubbles, green AI bubbles, chapter headline boxes).
- **Integration approach:** Ship `chat-story.js` as a raw `<script>` in the Astro page (Astro allows this) — it does not need to be a React island. Port `chat-story.css` to Tailwind or ship as-is alongside.
- The chat-storytelling format must render identically post-migration. Test visually before launch.

**Future:** "How to Build an AI Agent Harness" — next chapter you mentioned.

---

### 3.9 Contact Page (`/contact`) — NEW

**Purpose:** Dedicated contact point for AI Solutions inquiries (project-based pricing).

**Sections:**
- Simple contact form: Name, Email, Company, "Tell us about your project" (textarea)
- WhatsApp CTA alongside (for those who prefer messaging)
- Email: info@luxon.hk

**Backend:** Form submission via serverless function (Vercel API route or Cloudflare Worker) → email via Resend/Nodemailer.

---

## Part 4: Design System

### Visual Direction

**Keep the current Economist-inspired aesthetic** — it's distinctive and professional. Evolve it, don't replace it.

| Element | Current | Evolution |
|---|---|---|
| **Colors** | Green (#4A7C59 + #1a9a5c), purple (#6B5CE7), white bg | Keep green + purple as accent colors. Note: two greens currently in use — `#4A7C59` (primary brand) and `#1a9a5c` (chat bubble accent). Define both explicitly as `primary` and `accent`. Add a neutral dark (#1A1A1A) for text hierarchy. Add subtle warm tones for CTA buttons. |
| **Typography** | Google Sans Text + Inter | Keep Inter as body, Google Sans Text for headings. Add a monospace (JetBrains Mono) for code/technical elements on case study pages. |
| **Layout** | Centered container, max-width sections | Keep centered layout. Add grid-based feature cards for product pages. |
| **Animations** | Fade-in on scroll, chat bubbles | Keep IntersectionObserver fade-ins. Add smooth scroll, subtle hover states on cards. |
| **Cards** | Rounded corners, subtle shadows | Keep. Standardize border-radius (12px), shadow (subtle), padding. |

### Design Tokens (Tailwind v4 CSS-first config)

Tailwind v4 defines tokens via the `@theme` directive in CSS — **no `tailwind.config.ts`**. The following lives in `src/styles/global.css` (or equivalent):

```css
@import "tailwindcss";

@theme {
  /* Colors — available as utilities like bg-luxon-green, text-luxon-dark */
  --color-luxon-green:   #4A7C59;  /* primary brand accent */
  --color-luxon-green-accent: #1a9a5c;  /* chat bubble accent (recent commits) */
  --color-luxon-purple:  #6B5CE7;  /* secondary accent */
  --color-luxon-dark:    #1A1A1A;  /* headings */
  --color-luxon-text:    #374151;  /* body text */
  --color-luxon-muted:   #6B7280;  /* secondary text */
  --color-luxon-bg:      #FAF9F6;  /* page background — warm white */
  --color-luxon-card:    #FFFFFF;  /* card background */
  --color-luxon-border:  #E8E5E0;  /* borders */

  /* Typography — available as font-heading, font-body, font-mono */
  --font-heading: 'Google Sans Text', sans-serif;
  --font-body: 'Inter', sans-serif;
  --font-mono: 'JetBrains Mono', monospace;

  /* Radius */
  --radius-card: 12px;
  --radius-section: 16px;
}
```

Spacing uses Tailwind's default 4px grid.

### Component Library (needed for build)

| Component | Used On |
|---|---|
| Header (sticky, with CTA) | All pages |
| Mobile menu (slide-in) | All pages |
| Footer | All pages |
| Hero section (variant: product, case study, generic) | Multiple pages |
| Feature card (icon + title + description) | Product pages |
| Pricing card | AI Workers pricing |
| Comparison table | AI Workers, AI Solutions |
| Timeline / process steps | Process page |
| Case study card (image + headline + teaser) | AI Solutions, Homepage |
| CTA block (full-width, with button) | Multiple pages |
| FAQ accordion | Homepage, Pricing |
| Chat widget (floating) | All pages |
| Contact form | Contact page |
| Language selector (EN / 繁 / 简) | All pages |

---

## Part 5: Build Phases

> **Timeline note (revised).** Original estimate was 4 weeks. Accounting for
> the i18n content effort (3 locales × ~6 new pages = 18 pages of translated
> copy, unnamed in original plan), blog/learn styling port, and the redirect
> setup, realistic timeline is **6 weeks**. Phase 1 launch can descope to
> homepage + AI Workers if needed.

### Phase 1: Foundation (Week 1)
- [ ] Initialize Astro project (`npm create astro@latest`)
- [ ] Install Tailwind v4 via `@tailwindcss/vite` (NOT PostCSS, NOT v3)
- [ ] Configure design tokens via `@theme` directive in `src/styles/global.css` (see Part 4 — no `tailwind.config.ts`)
- [ ] Set up content collections for i18n: `src/content/` with `en/`, `zh-HK/`, `zh-CN/` subdirectories. Define collection schema in `src/content/config.ts`.
- [ ] Build shared layout: Header (sticky, with dropdowns per §3 nav), Footer, Mobile menu (slide-in)
- [ ] Migrate chat widget client (`chat.js`) as a React island — wraps existing client, talks to `chat.luxon.hk` worker (unchanged)
- [ ] Set up Cloudflare Pages deployment (`wrangler pages` or CF dashboard Git integration)
- [ ] Configure analytics (GA4, ID `G-H9BMR3XD45`)
- [ ] Set up sitemap generation (`@astrojs/sitemap`)
- [ ] **Verify: `astro build` succeeds, `dist/` generated, dev server renders a blank layoutted page**

### Phase 2: Homepage (Week 1-2)
- [ ] Build homepage sections: Hero, Trust Strip (text fallback only — no placeholder logos), Product Teasers, How It Works, Featured Case Study, FAQ, CTA
- [ ] Migrate and reword existing FAQ content
- [ ] Responsive testing (mobile, tablet, desktop)
- [ ] Lighthouse audit (target: 95+ performance)

### Phase 3: AI Workers Pages (Week 2)
- [ ] Build AI Workers product page
- [ ] Migrate current pricing.html content to `/ai-workers/pricing` (minimal rebrand, no structural change)
- [ ] Rebrand: remove OpenClaw mentions, rename to "AI Worker"
- [ ] Update comparison table

### Phase 4: AI Solutions Pages (Week 3-4)
- [ ] Build AI Solutions product page
- [ ] Build Process page
- [ ] Build Case Study listing page
- [ ] Build MFDB Ocean Freight case study (flagship)
- [ ] Build Market Snapshot case study
- [ ] Build Document Extraction case study
- [ ] **Pre-launch: verify all quantified metrics** (see §3.6.1 caveat) — measured vs estimated
- [ ] Create dashboard mockup screenshots. **Source file is in the mfdb repo** (`~/code/mfdb/docs/mockups/dashboard_redesign.html`) — not in this repo. Confirm it exists, sanitize data, commit images into Astro project.
- [ ] Add annotated callout overlays to screenshots

### Phase 5: Migration & Cleanup (Week 4-5)
- [ ] Migrate blog pages — **ship legacy CSS alongside Tailwind** (see §3.7 decision). Port HTML structure into Astro layout, keep `blog/styles.css` as a scoped stylesheet.
- [ ] Migrate learn pages (2-8) — same legacy CSS approach.
- [ ] Migrate learn lesson-1 carefully — keep `chat-story.js` as raw `<script>`, ship `chat-story.css` as-is. **Visual diff test: chat bubbles must render identically post-migration.**
- [ ] Build Contact page with form (serverless function → email via Cloudflare Functions)
- [ ] Add 404 page
- [ ] **Full i18n pass** — translate ALL new pages (homepage, AI Workers, AI Solutions, Process, 3 case studies, Contact) into zh-HK and zh-CN. This is ~16 pages of new translated copy — **budget accordingly, name the translator.**

### Phase 6: Launch (Week 6)
- [ ] Deploy to staging subdomain on Cloudflare Pages
- [ ] **Configure 301 redirects** for old `.html` URLs:
  - `/pricing.html` → `/ai-workers/pricing`
  - `/blog/ai-*.html` → `/blog/ai-*`
  - `/learn/lesson-N.html` → `/learn/lesson-N`
  - Use `public/_redirects` (Cloudflare Pages format) or Astro `redirects` config
- [ ] Cross-browser testing (Chrome, Safari, Firefox)
- [ ] Mobile testing (iOS Safari, Android Chrome)
- [ ] Accessibility audit (keyboard nav, screen reader basics)
- [ ] Final content review
- [ ] DNS cut-over: luxon.hk → Cloudflare Pages
- [ ] Monitor analytics for 1 week post-launch

---

## Part 6: What NOT to Do

1. **Don't overcomplicate the build.** Astro + Tailwind. No CMS. No headless. No database. Markdown files for content. Ship fast.
2. **Don't redesign the blog or learn section.** Port the existing HTML into Astro layouts with legacy CSS shipped alongside Tailwind (see §3.7, §3.8). Keep the chat-storytelling format intact.
3. **Don't build a client portal or login system.** This is a marketing site. Dashboards are products you build for clients, not web apps on luxon.hk.
4. **Don't add more than 3 case studies at launch.** MFDB (primary) + 2 derived case studies from the same system is enough. Add more as you get real clients.
5. **Don't over-engineer i18n.** Content collections with locale folders (`en/`, `zh-HK/`, `zh-CN/`) — locked decision. Don't introduce a translation management system.
6. **Don't change the domain.** Keep luxon.hk. Keep the CNAME. Keep GitHub Pages until the new site is live, then switch to Cloudflare Pages.

---

## Part 7: Open Questions

> Q1–Q3 resolved 2026-07-14 (hosting → Cloudflare Pages, contact form → build it, dashboard demo → static screenshots). Remaining:

1. **Case study naming:** Should case studies use client names (if permission given) or generic industry labels? Suggestion: start generic ("Ocean Freight Rate Intelligence"), add client names later with permission.
2. **Blog rebranding:** Keep "AI Living" or rename to something more B2B-aligned? Suggestion: keep "AI Living" — it's established, and the blog's role is education/SEO, not direct sales.
3. **MFDB screenshots:** The dashboard mockup uses placeholder data. For the live site, should we use sanitized real data or keep mockup data? Suggestion: use mockup data that looks realistic to avoid exposing any client data. **Source file lives in the mfdb repo, not this one** — confirm availability and sanitize before Phase 4.
4. **Who translates?** Phase 5 requires ~16 pages of new copy translated into zh-HK and zh-CN. Name the translator (you, a contractor, or AI-assisted + human review) before Phase 5 starts.
