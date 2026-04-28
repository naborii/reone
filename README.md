# Reone

ONE PIECE CARD GAME learning hub MVP.

This project is a static web app for exploring basic One Piece card game concepts, including card information, deck guides, a deck builder, packs, marketplace pages, tutorials, and simple play flows.

## Pages

- `index.html` - Main landing hub
- `tutorial.html` - Beginner tutorial page
- `deck.html` - Deck guide page
- `deckbuilder.html` - Local deck builder
- `card.html` - Card information page
- `packs.html` - Pack opening page
- `market.html` - Marketplace/reference page
- `play.html` - Play flow prototype

## Project Structure

```txt
.
├── data/
│   ├── cards.js
│   └── decks.js
├── js/
│   ├── deck-builder.js
│   ├── detail-pages.js
│   ├── main.js
│   ├── packs.js
│   └── shared-data.js
├── styles/
│   └── main.css
├── *.html
└── image/font assets
```

## Run Locally

Because this is a static site, you can open `index.html` directly in a browser.

For a local server:

```bash
python3 -m http.server 8000
```

Then open:

```txt
http://localhost:8000
```

## Data

Card and deck data live in `data/cards.js` and `data/decks.js`.

Current card image URLs are defined in the card data. If real card images are added later, confirm image usage rights before committing files or linking external sources.

## Collaboration Workflow

Use a branch for each change:

```bash
git switch -c feature/short-description
```

After editing:

```bash
git add .
git commit -m "Describe the change"
git push -u origin feature/short-description
```

Then open a pull request into `main`.
