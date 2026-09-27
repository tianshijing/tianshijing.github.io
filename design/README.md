# Minimal black, white and red redesign

The site uses OpenEnvision's observed white (#ffffff), near black (#050505), and red (#df1f26) palette. Darker red (#c51a20) is used for small text links. Existing academic content, actual avatar, research descriptions, publications, project links and news were retained.

The shared implementation lives in `assets/css/minimal-design.css`. All six HTML pages load it after their existing styles. Navigation and the home hero are semantic HTML. `assets/js/custom-enhancements.js` now contains only menu and news interactions, replacing decorative animation code. The research page loads the jQuery color plugin after jQuery.

## Visual concept and review

`minimal-concept.png` is an internal concept generated using the built-in Image Gen tool, not an approved user deliverable or factual source. The full generated page is 1024 × 1536. It is not used as website UI. `home-desktop.png` and `home-mobile.png` are actual Codex in-app browser screenshots at 1280 × 900 and 390 × 844.

The concept, final desktop screenshot, and a browser screenshot at the concept's native 1024 × 1536 viewport were inspected with `view_image`. The final interface follows the concept's visual system. It intentionally does not reproduce the generated placeholder portrait, abbreviated biography, invented news, or incorrect copyright date. The actual content makes the page longer than the concept. The existing Blogs | Slides navigation stays one link, and existing arrow icons remain in the two hero buttons. The original profile asset is a swan image; its original colors are preserved, as requested in the follow-up. The initial preview screenshots predate this color adjustment.

| Comparison | Implementation and verification |
| --- | --- |
| Palette | Pure white, black and restrained red; no visible CSS gradients found across the six pages. |
| Typography | Large left-aligned name, small gray subtitle and research terms; refined letter spacing after browser inspection. |
| Layout | Open sections, rectangular profile image and buttons; removed glass, floating cards, glows and backgrounds. |
| Spacing | Shared gutters, fine gray section rules; corrected inherited banner offsets and excessive padding. |
| Content | First-screen copy matches the brief: name, PhD Student · NTU, four research interests, Explore / Research, four social links. No fabricated factual claims were introduced. |
| Chronology | Existing experience and news appear as dated rows; original descriptions and disclosures preserved. |
| Responsive behavior | Desktop navigation becomes a keyboard-accessible menu; research terms and long content reflow without horizontal overflow. |
| Footer | Flat black background, white name and gray links; removed decorative floating elements. |

## Checks

- All six pages checked in the in-app browser at widths 320, 768 and 1280: no horizontal overflow, no missing rendered images, no visible CSS gradients.
- Additional visual checks at 390 × 844, 1280 × 900 and 1024 × 1536.
- Mobile menu open/close and Escape, news keyboard expansion, Show more, and project Details verified.
- Existing local href/src targets resolve; no duplicate HTML IDs.
- `node --check assets/js/custom-enhancements.js` passes.
- Research page rechecked in a fresh browser tab after the dependency-order repair: no console errors.
- No unresolved material layout problems were found in the inspected states. External destinations were preserved, not exhaustively audited.

## Image Gen prompt

Use case: ui-mockup. Create a polished restrained personal academic website concept, complete multi-section desktop page, 1440px wide. User wants extreme aesthetic refinement, not flashy, only pure white #fff, near black #050505, gray text and sparing red #df1f26 inspired by OpenEnvision. No gradients, glows, background illustrations, pills or floating cards. Header: Juanxi Tian on left, Home Research Publications Blogs | Slides Projects Service Links on right. Main hero left aligned name Juanxi Tian in bold large sans-serif 88px, a small red period; subtitle PhD Student · NTU; underneath four plain small research terms Efficient AI / Generative AI / Foundation Models / World Models. Buttons Explore (red rectangular) and Research (white black border). Small social text Google Scholar GitHub X LinkedIn. Hero airy 540px tall. Below a fine gray horizontal rule, About Me section: rectangular grayscale portrait placeholder on left, text right with name Juanxi Tian 田隽熙; PhD Student NTU; paragraph 'I am currently pursuing my PhD at Nanyang Technological University (NTU), where I work with Wanhua Li and Jianfei Yang.' Then 'I am also the Founder of OpenEnvision.' Follow with Experience, simple aligned rows with dates in left column and research position in right: Sept 2026 / Received Tencent Qingyun Internship Offer; May 2026 / PhD Student at NTU. Follow Latest News with dated rows, thin rules, small disclosure chevrons. Footer black with white name Juanxi Tian and Research / Connect link columns. Preserve these sections and meaningful text; use clean native HTML implementable typography no image based interface. Tight understated header, generous white space, elegant Swiss editorial layout, 1120px centered content width. Render readable complete page with every section, no cropped footer, no invented metrics or marketing copy. This is an internal visual concept; existing real biography will replace abbreviated paragraph and real portrait replaces placeholder in implementation.
