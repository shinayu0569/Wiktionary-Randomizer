# Wiktionary Randomizer 🔀📚

A tiny, delightful webapp to discover surprising words and entries from Wiktionary — one random page at a time.

> "Words are the raw material of thought."  
> — Have fun exploring them.

---

## What is this?
Wiktionary Randomizer is a web application that shows a random entry from Wiktionary so you can:
- stumble upon unusual vocabulary,
- learn new languages, and
- get inspired by etymologies and archaic forms.

It’s ideal for writers, language learners, crossword fans, or anyone who enjoys learning one new thing at a time.

---

## Highlights ✨
- Fetches and displays a random Wiktionary entry and its content.
- Clean, readable UI built with TypeScript-first code.
- Lightweight and fast — great for quick browsing sessions.
- Designed to be extendable: add filters, favorites, or language-specific browsing.

---

## Tech stack
- TypeScript (primary language) — 97.8% of the codebase
- CSS for styling
- Small amount of miscellaneous tooling and assets

---

## Quick start — run locally
These commands assume the repository has typical npm scripts. Adjust to `yarn` or `pnpm` if you use them.

1. Clone the repo
   - `git clone https://github.com/shinayu0569/Wiktionary-Randomizer.git`
2. Install dependencies
   - `npm install`
3. Start the dev server
   - `npm run dev`
4. Build for production
   - `npm run build`
5. Preview production build (if available)
   - `npm run preview` or `npm start`

Note: If package scripts differ, check `package.json` for the exact commands.

---

## How it works (overview)
1. The app requests a random entry from Wiktionary (via public endpoints or a page-randomizer approach).
2. It parses the relevant content (headword, pronunciation, part of speech, definitions, examples, etymology).
3. The UI renders the structured content, showing language sections and useful metadata.
4. Optional controls let you fetch another random page or filter by language (if implemented).

---

## Possible future features (ideas)
- Language filter: restrict random picks to a particular language (e.g., Japanese, Spanish).
- Save favorites locally or to a user account.
- Word-of-the-day subscription or shareable links.
- Lightweight offline cache to browse recently-seen entries without re-fetching.
- Better parsing for complex Wiktionary pages (examples, templates, pronunciations).

---

## Contributing
Contributions, ideas, and bug reports are very welcome!

- Found a bug? Please open an issue with steps to reproduce and, if possible, a screenshot.
- Want to add a feature? Open an issue to discuss the design first, then submit a pull request.
- Prefer to jump straight into code? Fork the repo, create a branch, and submit a PR with tests/notes.

Guidelines:
- Keep changes small & focused.
- Write clear commit messages and PR descriptions.
- Respect the existing style and TypeScript types.

---

## Development notes / tips
- Check `package.json` for scripts, linters, and formatters.
- If the app parses HTML from Wiktionary, consider:
  - Being resilient to variations in page structure.
  - Avoiding heavy scraping on the client; use server-side proxies if you hit CORS or rate limits.
- Add tests for parsing logic to avoid regressions when Wiktionary markup changes.

---

## Accessibility & privacy
- Aim for readable font sizes, keyboard navigation, and ARIA where appropriate.
- The app only requests public Wiktionary pages. No user tracking is required — keep it privacy-friendly.

---

## License
No license file detected here. If you maintain this repository, consider adding a license (e.g., MIT) so contributors and users know how they may use the project.

---

## Acknowledgements
- Wiktionary contributors — the content is free thanks to the community.
- Inspiration from random-word and discovery apps.

---

## Contact / Maintainer
- GitHub: [shinayu0569](https://github.com/shinayu0569)  
If you'd like help with features or reviews, open an issue or mention me in a PR.

---

Enjoy the exploration! 🎲📖
