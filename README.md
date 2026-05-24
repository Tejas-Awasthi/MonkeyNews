# Monkey News

A modern news reader built with React and Vite. Browse top headlines by category, search articles across sources, and load more stories with infinite scroll — powered by the [News API](https://newsapi.org/).

## Features

- **Category browsing** — Top headlines for Business, Entertainment, General, Health, Science, Sports, and Technology
- **Keyword search** — Search all articles all over the world.
- **Infinite scroll** — Automatically loads the next page as you scroll
- **Responsive UI** — Desktop popover and mobile drawer navigation
- **Loading feedback** — Top progress bar during API requests
- **Empty state** — Toast-style modal when no articles match your query or category

## Prerequisites

- [Node.js](https://nodejs.org/) 18+ (recommended: latest LTS)
- A free API key from [newsapi.org](https://newsapi.org/register)

## Getting Started

### 1. Clone and install

```bash
git clone <your-repo-url>
cd MonkeyNews
npm install
```

### 2. Configure environment variables

Open the `.env` file present in the project root, grab your free API key from [newsapi.org](https://newsapi.org/register): 

```env
VITE_NEWS_API_KEY=your_newsapi_key_here
```

### 3. Run the dev server

```bash
npm run dev
```

Open the URL shown in the terminal (typically `http://localhost:5173`).

How It Works

```
┌─────────────┐     category / reset      ┌──────────────┐
│   Navbar    │ ─────────────────────────►│     App      │
└─────────────┘                           │  (state +    │
                                          │  fetchNews)  │
┌─────────────┐     search query          └──────┬───────┘
│  SearchBar  │ ────────────────────────────────►│
└─────────────┘                                  │
                                                 ▼
                                          News API (REST)
                                                 │
┌─────────────┐     articles[]                 │
│    News     │ ◄────────────────────────────────┘
│ InfiniteScroll
└──────┬──────┘
       ▼
┌─────────────┐
│  NewsItem   │  → external article URL
└─────────────┘
```

- `**App.jsx**` — Holds shared state (articles, category, total count), builds News API URLs, and coordinates fetching between the navbar and news feed.
- `**News.jsx**` — Manages pagination, search, category changes, and infinite scroll.
- `**Navbar.jsx**` — Category picker and home/reset via the logo.
- `**SearchBar.jsx**` — Submits keyword queries to the “everything” endpoint.
- `**NewsItem.jsx**` — Renders a single article card (image, title, description, date, link).
- `**Modal.jsx**` — Auto-dismissing alert when no results are found.

### API endpoints used


| Mode      | Endpoint                | When                                       |
| --------- | ----------------------- | ------------------------------------------ |
| Headlines | `GET /v2/top-headlines` | Category browse and default “General” feed |
| Search    | `GET /v2/everything`    | User enters a search term                  |


Both requests use `page`, `pageSize` (10), and your `apiKey` query parameter.

## Project Structure

```
MonkeyNews/
├── public/              # Static assets
├── src/
│   ├── components/
│   │   ├── Modal.jsx        # “No news found” notification
│   │   ├── Navbar.jsx       # Header + category navigation
│   │   ├── Navbar.css       # Scroll blur styles
│   │   ├── News.jsx         # Feed + infinite scroll
│   │   ├── NewsItem.jsx     # Article card
│   │   └── SearchBar.jsx    # Search input
│   ├── App.jsx              # Root state & API fetching
│   ├── main.jsx             # React entry point
│   └── index.css            # Tailwind imports & global styles
├── index.html
├── vite.config.js
├── eslint.config.js
├── package.json
└── .env                     # VITE_NEWS_API_KEY
```

## News API Notes

- The free developer plan has rate limits and may restrict requests from production domains; localhost works for development.
- `top-headlines` returns articles for the selected category; `everything` searches by keyword across sources.
- If you see zero results, the app shows a **“No News Found!”** modal and stops loading more pages.

## Building for Production

```bash
npm run build
npm run preview
```

Deploy the contents of the `dist/` folder to any static host (Vercel, Netlify, GitHub Pages, etc.). Set `VITE_NEWS_API_KEY` in your host’s environment variables at build time.

## License

This project is licensed under the [MIT License](LICENSE) — see the file for details.