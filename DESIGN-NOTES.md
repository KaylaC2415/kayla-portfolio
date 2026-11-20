# Exploration 01 — Two worlds, one designer

Local prototype; the original Desktop template is untouched. Open index.html, or serve this directory.

Palette: paper #FAF9F5, ink #22231F, ribbon yellow #F5F64A, sticker pink #FFA6DC, lilac #AA88F4, electric green #D7FC70. Games background #100D1C.
Typography: Space Grotesk for the main typography; DM Sans for supporting text. Both have local system fallbacks.

Layout: left-aligned introduction and staggered, horizontally arranged frames.
```
[ welcome + title ]            [ elevated work ]
                     [ work ]                  [ work ] [ playground ]
[ Kayla Chen      Product [physical switch] Play        piece + navigation ]
```

The supplied references support the graph paper and lime/purple direction. Avoid a generic dark gaming dashboard: keep the same exhibition architecture, change its visual voice. Remove repeated sticker decoration; concentrate the playful moment on one sticker and the switch.

The artwork is shown from the supplied concept boards through SVG viewports. Descriptive project names are provisional presentation captions, not verified project names. Replace with original project assets and final titles in the next round. No changes to original template files.

Controls: wheel, trackpad, touch swipe, previous/next buttons, keyboard arrows on the focused gallery, Home/End, switch via Enter/Space. URL mode supports direct links and back/forward. Respect reduced motion. Playground opens an explicitly unfinished preview, since its visual direction is not decided.

Validation: browser screenshots reviewed at 1440×900 in both modes. Browser assertions at true 390px viewport passed: switch both ways, URL state, footer fit/no overlap, no document overflow, horizontal gallery, playground dialog open/close, index updates. JavaScript syntax check passed. Web Interface Guidelines reviewed: semantic buttons, focus indication, skip link, SVG accessible names, reduced motion, theme color and color scheme. Screenshot previews are in previews/.

## Refined light mode — November 16, 2026

Implemented from Figma file maobGVlg2giMs6x2WK8htZ, frame 2444:3770 (4032×982). Added isolated light.css and 11 exact local Figma assets. The original dark-mode wall remains intact. Round-one HTML and behavior are preserved as round-01.html / round-01.js with the original style.css. The Desktop source template remains untouched.

The fixed footer occupies the 75px bottom band in the desktop reference; the panorama scales uniformly with viewport height. Mobile uses a separate responsive horizontal layout, inferred because no mobile Figma frame was supplied. Project captions follow the provided Figma text, including the repeated Five Mics Central caption on the third/mobile project. Playground remains a preview dialog pending its actual design. The total switch count is stored within the current browser session.

Browser verification: all 11 assets loaded; desktop 1512×982 first and second project placement, ribbon native dimensions, footer position, horizontal scroll, fixed footer, switch both directions, mode URL, switch counter, Playground dialog and three-project index passed. At a true 390×844 viewport, no page overflow or footer control overlap; opening fit and horizontal gallery passed. End-of-gallery and Playground visually inspected in the in-app browser. JavaScript syntax check passed. Reviewed semantic controls, visible keyboard focus, labels, image dimensions, reduced motion, and theme color against current Web Interface Guidelines.

## Refined dark mode — November 16, 2026

Implemented Figma frame 2444:3796 in dark.css and the dark-world markup. Exact local assets: 4 project images and 19 SVGs (including 6 distinct glow exports), used across 25 image callsites. JPEG source images are stored with .jpg extensions. Added Momo Trust Display for the opening, retained Manrope/Plus Jakarta Sans and the existing refined light design. The original Desktop template and round-one archive remain unchanged.

Dark projects: Five Mics Mobile TCG; Eyes Off!; TCG Official Site; Light It Out. Corrected dark piece index to /04 because there are four projects (the source footer reads /03). The existing switch counter still counts mode changes per browser session; its badge remains light-only, as in the supplied designs. Playground still opens the existing pending-design dialog.

Verification: browser checked scaled desktop project coordinates and footer position, all 23 non-empty local assets / 25 loaded callsites, Momo font availability, horizontal navigation, Home/End, /04 ending index, Playground dialog, and switching back to the unchanged /03 light mode. True mobile viewport 390×843: no document overflow, opening fits, footer name/switch/index do not overlap, gallery scrolls horizontally. Used overflow:clip on the dark panorama to prevent browser focus from internally shifting the artwork vertically. Returned browser viewport to its default. Preview saved at previews/refined-dark.png.

## Desktop + authored mobile revision — November 16, 2026

Source: Figma section 2488:4802; frames Light Desktop 2444:3770, Dark Desktop 2444:3796, Light Mobile 2485:4496 and Dark Mobile 2486:4604. Updated desktop panorama widths to 3904/4838, second light project top to 91, ChiLog caption, dark closing and decoration positions, centered heading groups, footer color, and native graphics. Downloaded 51 exact revision assets, including separately exported mobile graphics and switch states; raster JPEGs have proper extensions.

Added fixed header with repositioned Total switch clicked and Visitor Gallery on both modes. Visitor Gallery opens a clearly pending-content dialog with close/back/Escape behavior. Content is intentionally deferred per the request. Counter retains its existing per-browser-session behavior. Mobile now follows the authored 402×874 horizontal panoramas (3055/3675 wide): exact opening, project sizes/positions, playground and closing; name/index above the footer band and physical switch across it. Responsive scaling fits smaller phone widths while preserving the composition. Mobile Light has no ribbon/grid as supplied; mobile Dark retains the grid and authored decorations without desktop glows.

Verification: 66 passing browser assertions across four reference-sized iframe layouts, including Figma positions, loaded artwork, fixed header/footer, mobile SVG source selection, no unintended page overflow, Visitor Gallery open/close, scrolling/index, and Light/Dark switching. Results saved in tests/revision-results.txt; repeatable browser harness in tests/revision.html. Original template and round-one archive unchanged.

## Playground title/arrow motion — November 16, 2026

Source: Figma component set 2490:4812, variants 2490:4811/2490:4877. Static context provides pink and lime title rows and corresponding arrow assets; motion context returns no keyframe nodes, so the 450ms easing is an implementation choice based on the requested vertical flip/right slide. Reused the existing semantic Playground button and dialog handler, with two aria-hidden text rows behind one accessible button label. Clipped title track moves up 65px; arrows translate 134px to align right, crossfading to the exact lime SVG. Reverse on hover/focus exit; keyboard focus matches hover. Mobile uses a 57px title step and scaled native arrow graphic with right alignment. Reduced-motion mode removes transitions and arrow travel.

Desktop and mobile each pass 11 browser checks: accessible action, starting state, asset loading, completed title transform, lime state, arrow alignment/travel, no title clipping, reverse transforms, and preserved dialog click behavior. Original light Playground and gallery switch interactions unchanged. Browser QA harness: tests/playground-motion.html.

## Review polish — November 16, 2026

Dark closing heading: left aligned, reduced to 85% (42.5/47.6px desktop; 34px mobile). Decorations retain their 80% size, now explicitly layered below all dark projects (z-index 0 versus 1). Light Playground caption moved down 3px; inset shadow reduced to half of its previous opacity; frame hover/focus uses centered 1.1 scaling and no brightness filter. Dark title rows now abut with gap 0 inside a dedicated clipped window; travel equals row height (57px desktop / 49px mobile), preserving the existing button bounds and arrow position.

Verified computed heading alignment/type, decoration stacking, light frame scale/origin/brightness, caption top offset, and title gap. Existing animation browser checks pass, including complete roll/reverse, arrow alignment, title clipping, and dialog action.

## Event Content Workspace case study — November 17, 2026

Added event-content-workspace.html, shared case-study.css/js and source content in case-content/event-content-workspace.json. Migrated all original main-content text and original chapter/media order from kaylachendesign.framer.website/event-content-workspace. Eight chapters, 12 image placements, three local MP4 demonstrations; all original assets downloaded successfully, no placeholders. The source’s wording, including its Reflection heading spelling and repeated Broad Event Management label, remains unchanged. Light palette, vertical reading layout, native media controls, full-size image links, accessible chapter navigation, and responsive desktop/mobile layouts.

The Product gallery’s Event Content Workspace image is now a native anchor. Its existing 3% hover and shadow effect is preserved. Before navigation, the current gallery position/mode is stored against its history entry and a return token. Explicit Back to gallery links restore that entry, and native browser Back restores it too. Direct case-study visits fall back to the Event Content Workspace position in Product gallery.

Validation: original text blocks retained; all 12 image placements decode; three videos load metadata (14.861s, 12.082s, 51.5s) and keyboard playback starts. Desktop and 390px mobile article checks pass with no horizontal overflow. Desktop native Back and explicit return each restore 869.5px exactly; mobile explicit return restores 924.5px exactly. JavaScript syntax checks pass. Test harnesses: tests/event-case.html and tests/case-return.html. Original Desktop template is untouched.

## Shared Playground - November 17, 2026

Source: Figma desktop 2497:4892 (6482x982) and mobile 2507:5252 (1732x874 authored first three projects; 402px viewport). Added playground.html/css/js with exact downloaded room textures, nine original artwork covers, category SVGs and header arrows. Desktop uses authored positions, framing/mat colors, caption sizes and Libertinus Serif Display category titles. Mobile preserves its first-three authored positions/sizes and extends the same horizontal rhythm through all nine desktop projects (5005px panorama). Three mobile cover exports are byte-identical to desktop covers and reuse the same local files.

Both gallery entries are native links to the same Playground, with from/return parameters preserving origin mode and gallery position through existing history-entry storage. Pointerdown/click preparation also supports modified clicks and new-tab context menus. Previous dark title/arrow hover animation and light frame feedback are preserved. Visitor Gallery remains a pending-content dialog.

Category links jump within the horizontal exhibition and update URL/hash/active label. Touch swipe, wheel/trackpad and keyboard arrows/Home/End supported. Work images open an accessible full-size viewer. Three supplied game covers are original GIFs; the exhibition freezes their native frame on canvas to avoid unattended looping, while the viewer offers explicit Play/Pause. Reduced motion respected.

Validation: 65 passing browser checks across 1512x982 desktop and 402x874 mobile, including nine artwork assets, exact first-frame positions, native SVG loading, no page overflow, mobile scrollable categories, final-category navigation, image viewer, GIF play/pause, Visitor Gallery, and both modes' round trips on desktop/mobile. All four origin-mode/position restoration combinations passed. Results in tests/shared-playground-results.txt; previews in previews/playground-desktop.png and playground-mobile.png. Original Desktop template and Event Content Workspace case study remain intact.
