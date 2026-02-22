# TripMind

AI-powered travel planning web app. Get personalized country recommendations, budget analysis, spot discovery, and food suggestions based on your preferences.

## Tech Stack

- Next.js 16
- React 19
- Tailwind CSS 4
- TypeScript

## Getting Started

### Prerequisites

- Node.js 18+
- npm or yarn

### Install

```bash
npm install
```

### Environment

Create `.env.local` in the project root:

```
GEMINI_API_KEY=your_gemini_api_key
GROQ_API_KEY=your_groq_api_key
UNSPLASH_ACCESS_KEY=your_unsplash_access_key
```

At least one of `GEMINI_API_KEY` or `GROQ_API_KEY` is required for AI features. `UNSPLASH_ACCESS_KEY` is used for destination images.

### Run

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

### Build

```bash
npm run build
npm start
```

## Features

- **Trip Architect** – Country recommendations by budget, continent, and language skills
- **Gastro Guide** – Travel budget and expense breakdown
- **Spot Finder** – Discover places by interest (adventure, history, nature, etc.)
- **Food Finder** – Culinary recommendations by country and taste
- **Profile** – Save preferences (home location, budget, food, languages) for reuse

## Project Structure

```
app/
  api/           API routes (trip-architect, food-discovery, spot-discovery, generate-plan, places)
  components/    UI components
  context/       Language, Theme, Profile contexts
  profile/       User profile page
  trip-architect/
  food-finder/
  spot-finder/
  gastro-guide/
  trip-planner/
```

## License

MIT - Hummet Azim
