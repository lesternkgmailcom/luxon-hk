---
version: "alpha"
name: Luxon HK
description: AI Assistant Installation Service — NotebookLM-inspired clean minimal design for a Hong Kong-based AI setup service. Warm, approachable, trustworthy.
colors:
  primary: "#1a1a1a"
  secondary: "#5f6368"
  tertiary: "#C4956A"
  accent: "#1967d2"
  accent-light: "#4285f4"
  success: "#10b981"
  neutral: "#FFF1E5"
  neutral-warm: "#EDE1D4"
  surface: "#ffffff"
  border: "#e8eaed"
  border-light: "#f1f3f4"
  muted: "#80868b"
  gradient-start: "#4285f4"
  gradient-mid: "#9b72cb"
  gradient-end: "#d96570"
  chat-start: "#00D4AA"
  chat-end: "#00B4D8"
  selection: "#c2dbff"
typography:
  heading:
    fontFamily: "'Google Sans Text', 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif"
    fontSize: "clamp(2.5rem, 5vw, 4rem)"
    fontWeight: 700
    lineHeight: 1.15
    letterSpacing: -0.03em
  section-heading:
    fontFamily: "'Google Sans Text', 'Inter', sans-serif"
    fontSize: "2.25rem"
    fontWeight: 500
    lineHeight: 1.2
    letterSpacing: -0.02em
  body:
    fontFamily: "'Google Sans Text', 'Inter', sans-serif"
    fontSize: 1rem
    fontWeight: 400
    lineHeight: 1.65
  body-lg:
    fontFamily: "'Google Sans Text', 'Inter', sans-serif"
    fontSize: 1.125rem
    fontWeight: 400
    lineHeight: 1.7
  subtitle:
    fontFamily: "'Google Sans Text', 'Inter', sans-serif"
    fontSize: 1.0625rem
    fontWeight: 400
    lineHeight: 1.7
  caption:
    fontFamily: "'Google Sans Text', 'Inter', sans-serif"
    fontSize: 0.875rem
    fontWeight: 400
  small:
    fontFamily: "'Google Sans Text', 'Inter', sans-serif"
    fontSize: 0.8125rem
    fontWeight: 400
  label-caps:
    fontFamily: "'Google Sans Text', 'Inter', sans-serif"
    fontSize: 0.8125rem
    fontWeight: 600
    letterSpacing: 0.04em
    textTransform: uppercase
  badge:
    fontFamily: "'Google Sans Text', 'Inter', sans-serif"
    fontSize: 0.8125rem
    fontWeight: 600
    letterSpacing: 0.02em
    borderRadius: 100px
  nav:
    fontFamily: "'Google Sans Text', 'Inter', sans-serif"
    fontSize: 0.9375rem
    fontWeight: 500
  hero-tagline:
    fontFamily: "'Google Sans Text', 'Inter', sans-serif"
    fontSize: 1.575rem
    fontWeight: 500
    letterSpacing: -0.02em
rounded:
  xs: 2px
  sm: 4px
  md: 8px
  lg: 12px
  xl: 16px
  2xl: 20px
  pill: 100px
spacing:
  xs: 4px
  sm: 8px
  md: 16px
  lg: 24px
  xl: 32px
  2xl: 48px
  3xl: 64px
  section-y: 100px
  section-y-mobile: 60px
  container-x: 24px
components:
  header:
    height: 64px
    heightMobile: 56px
    backgroundColor: "{colors.surface}"
    borderBottom: "1px solid {colors.border}"
    logoHeight: 32px
    logoFullHeight: 39px
    navGap: 32px
  button-primary:
    backgroundColor: "{colors.primary}"
    textColor: "#ffffff"
    fontSize: 1.125rem
    fontWeight: 600
    padding: "12px 32px"
    borderRadius: 16px
    hoverBackgroundColor: "#333333"
  button-large:
    backgroundColor: "{colors.primary}"
    textColor: "#ffffff"
    fontSize: 1.125rem
    fontWeight: 600
    padding: "14px 36px"
    borderRadius: 16px
  button-secondary:
    backgroundColor: transparent
    textColor: "{colors.primary}"
    fontSize: 1rem
    fontWeight: 600
    padding: "12px 32px"
    borderRadius: 16px
    border: "1.5px solid #dadce0"
    hoverBackgroundColor: "{colors.neutral-warm}"
  button-outline:
    backgroundColor: transparent
    textColor: "{colors.primary}"
    fontSize: 1rem
    fontWeight: 600
    padding: "12px 32px"
    borderRadius: 16px
    border: "1.5px solid #dadce0"
    hoverBackgroundColor: "{colors.neutral-warm}"
  card:
    backgroundColor: "{colors.surface}"
    border: "1px solid {colors.border}"
    borderRadius: 12px
    padding: 32px
    hoverShadow: "0 4px 20px rgba(0, 0, 0, 0.06)"
    hoverTransform: "translateY(-2px)"
  card-large:
    backgroundColor: "{colors.surface}"
    border: "1px solid {colors.border}"
    borderRadius: 16px
    padding: 36px
  pricing-card:
    backgroundColor: "{colors.surface}"
    border: "1px solid {colors.border}"
    borderRadius: 20px
    padding: "36px 28px"
  pricing-card-featured:
    backgroundColor: "{colors.surface}"
    border: "1px solid {colors.primary}"
    borderRadius: 20px
    padding: "36px 28px"
    boxShadow: "0 4px 24px rgba(0, 0, 0, 0.08)"
  hero-badge:
    backgroundColor: "#e8f0fe"
    textColor: "{colors.accent}"
    padding: "6px 16px"
    borderRadius: 100px
  feature-icon:
    width: 56px
    height: 56px
    borderRadius: 16px
    backgroundGradient: "linear-gradient(135deg, {colors.gradient-start}, {colors.gradient-mid}, {colors.gradient-end})"
    iconColor: "#ffffff"
    iconSize: 30px
  usecase-icon:
    width: 44px
    height: 44px
    borderRadius: 12px
    backgroundColor: "{colors.neutral-warm}"
    iconColor: "{colors.primary}"
    iconSize: 22px
  testimonial:
    backgroundColor: "{colors.neutral}"
    borderRadius: 12px
    padding: 28px
  security-box:
    backgroundColor: "{colors.surface}"
    border: "1.5px solid rgba(16, 185, 129, 0.3)"
    borderRadius: 20px
    padding: "40px 32px"
  step-card:
    backgroundColor: "{colors.surface}"
    border: "1px solid {colors.border}"
    borderRadius: 16px
    padding: "24px 16px"
  step-number:
    width: 36px
    height: 36px
    borderRadius: 50%
    backgroundColor: "{colors.primary}"
    textColor: "#ffffff"
  lesson-card:
    backgroundColor: "{colors.surface}"
    border: "1px solid {colors.border}"
    borderRadius: 16px
    padding: "32px 28px"
  lesson-step-number:
    width: 36px
    height: 36px
    borderRadius: 50%
    backgroundColor: "{colors.neutral-warm}"
    textColor: "{colors.secondary}"
  chat-toggle:
    width: 56px
    height: 56px
    borderRadius: 50%
    backgroundGradient: "linear-gradient(135deg, {colors.chat-start}, {colors.chat-end})"
    boxShadow: "0 4px 20px rgba(0, 212, 170, 0.35)"
  chat-bubble-bot:
    backgroundColor: "#F0E4D7"
    textColor: "#111827"
    borderRadius: 14px
    borderBottomLeftRadius: 4px
  chat-bubble-user:
    backgroundGradient: "linear-gradient(135deg, {colors.chat-start}, {colors.chat-end})"
    textColor: "#ffffff"
    borderRadius: 14px
    borderBottomRightRadius: 4px
  faq-item:
    borderBottom: "1px solid {colors.border}"
    borderTop: "1px solid {colors.border}"
  timeline-line:
    width: 2px
    backgroundColor: "#dadce0"
  timeline-dot:
    width: 12px
    height: 12px
    borderRadius: 50%
    backgroundColor: "{colors.primary}"
  footer:
    backgroundColor: "{colors.surface}"
    borderTop: "1px solid {colors.border}"
    padding: "48px 0"
  mobile-menu:
    backgroundColor: "{colors.surface}"
    width: 300px
    maxWidth: "85vw"
    boxShadow: "-4px 0 24px rgba(0, 0, 0, 0.1)"
  container-narrow:
    maxWidth: 780px
    padding: "0 24px"
  container-wide:
    maxWidth: 1100px
    padding: "0 24px"
  container-pricing:
    maxWidth: 960px
---

## Overview

NotebookLM-inspired clean minimal design. Warm peach-cream background (#FFF1E5) instead of sterile white — approachable and human. The site communicates "AI that works for you" without being cold or overly technical.

Typography uses Google Sans Text (primary) with Inter as fallback — clean, modern, slightly friendly. Tight letter-spacing on headlines (-0.03em) for a polished editorial feel. Generous line-height (1.65–1.75) for readability.

## Colors

The palette is rooted in warm neutrals with intentional accent spots:

- **Primary (#1a1a1a):** Deep ink — headlines, body text, timeline dots. The workhorse.
- **Secondary (#5f6368):** Sophisticated slate — descriptions, captions, metadata. Never harsh.
- **Tertiary (#C4956A):** Warm copper/gold — section headings, CTA titles. The brand personality color. Distinctive without being loud.
- **Accent (#1967d2):** Google blue — badges, lesson badges, tips. Used sparingly for information.
- **Neutral (#FFF1E5):** Warm peach cream — page background. Softer than pure white, gives the whole site a warm, inviting feel.
- **Neutral-warm (#EDE1D4):** Light tan — button hover states, icon backgrounds, lesson step numbers. Secondary warm tone.
- **Success (#10b981):** Emerald green — security features, checkmarks, status indicators. Trust signal.
- **Surface (#ffffff):** Pure white — cards, modals, pricing cards, header. Content containers.
- **Border (#e8eaed):** Light gray — card borders, dividers, FAQ separators. Subtle structure.
- **Gradient (blue→purple→pink):** Feature icons, hero tagline. Playful accent that breaks the warmth without clashing.

## Typography

Two-font system: Google Sans Text for everything, Inter as fallback. No decorative fonts — the warmth comes from color and spacing, not typeface choice.

Headlines are tight (letter-spacing: -0.03em), body is comfortable (line-height: 1.65). The hierarchy is clear: weight and size do the work, not color variations.

Font sizes use clamp() for responsive scaling. The hero headline ranges from 2.5rem to 4rem. Section headings sit at 2.25rem (500 weight — lighter than hero for hierarchy).

## Layout & Spacing

Content-focused layout with narrow max-widths:
- **Narrow container:** 780px — lesson content, FAQ, blog text
- **Wide container:** 1100px — feature cards, use cases, blog grid
- **Pricing container:** 960px — 3-column pricing grid

Sections breathe with 100px vertical padding (60px on mobile). Cards use 24–32px gap grids. The overall feel is spacious but not wasteful — every section earns its space.

## Shapes

Rounded but not pill-crazy. Buttons use 16px radius (soft rectangle). Cards use 12–16px. Badges and pills use 100px (full round). The mix creates visual variety while feeling cohesive.

## Components

**Buttons:** Two tiers — primary (black, 16px radius) and secondary/outline (transparent with border). Both use 600 weight text. Primary has a subtle scale-down on active (0.98). Large variant adds padding.

**Cards:** White surface with 1px border and subtle hover effects (shadow + 2px translate up). Consistent 12–16px border radius. Never heavy shadows — just enough to feel interactive.

**Feature cards:** Split layout (text left, illustration right) on desktop. Stacked on mobile. Icon boxes use the brand gradient.

**Testimonials:** Quote marks as decorative pseudo-elements (#dadce0). Highlight quote at top, grid below. Testimonial cards use the warm neutral background.

**FAQ:** Accordion style with border separators. Chevron icon rotates on open. Clean, minimal interaction.

**Chat widget:** Fixed bottom-right. Teal gradient toggle button. Panel with warm header (#F5EBE0). Bot bubbles are warm tan, user bubbles are teal gradient. Feels like a natural extension of the brand.

**Security section:** Green-bordered card on warm background. Uses green accent (#10b981) for trust messaging.

**Timeline:** Vertical line with filled dots. Used in "Why Hire" section. Clean, simple progression indicator.

**Steps:** Horizontal card row with arrows between them. Stacks vertically on mobile with rotated arrows.

## Do's and Don'ts

**Do:**
- Use the warm neutral (#FFF1E5) as the page background — it's intentional
- Keep the copper/gold (#C4956A) for section headings — it's the brand personality
- Use the gradient sparingly — feature icons and hero tagline only
- Maintain generous spacing between sections (100px)
- Use the subtle hover effects (shadow + translate) on all interactive cards
- Keep borders at 1px #e8eaed — visible but not heavy

**Don't:**
- Don't use pure white (#ffffff) as the page background — that's surface/card color only
- Don't introduce new accent colors without updating this file
- Don't use heavy drop shadows — keep them at 0.04–0.08 opacity
- Don't make buttons pill-shaped — always use 16px radius (soft rectangle)
- Don't use decorative fonts — Google Sans Text and Inter only
- Don't crowd sections — the whitespace is part of the design
