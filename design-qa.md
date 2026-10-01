# IntraNest Extension Visual QA

## Reference and implementation

- Selected direction: [IntraNest popup concept](</Users/shimhyuck/.codex/generated_images/01a0f4cc-17c0-79b1-8f37-0510a7da436f/exec-150da8de-5827-434b-bf46-42e6ebcdb8c1.png>)
- Implemented screen: `popup.html`, rendered at `http://127.0.0.1:4184/popup.html?preview=1` in the Codex in-app browser.
- Shared visual tokens are in `assets/tokens.css` and are also used by the web project.

## Comparison notes

- Kept the bright mineral background, dark navy wordmark, ultramarine status and actions, numbered link rows, and restrained separators.
- Moved the connection rule before the status indicator and separated **Add link** from the bottom **Settings** control to follow the selected composition.
- Restored the blue, green, and coral link tiles. At runtime the extension uses each saved link's Chrome favicon and shows a neutral link mark if a favicon is unavailable.
- Kept the row title and host on one line to follow the product brief; long values truncate instead of changing the popup width.

## Findings

- P0: none.
- P1: none.
- P2: the first preview showed all fallback tiles in one pale color and placed the connection rule and footer actions differently from the reference. The tile colors and layout were adjusted and re-rendered.

## Accessibility and behavior

- Link rows are buttons with accessible names, favicon images are decorative, connection and form status use accessible text, and keyboard focus has a visible outline.
- The popup remains compact at the Chrome extension width. Settings open separately so link actions stay quick and uncluttered.
- The preview uses example link hosts, so their generic fallback marks differ from real saved links that have available favicons.
