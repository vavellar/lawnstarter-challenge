# Lawnstarter Challenge - Star Wars API

REST API for searching Star Wars movies and characters with a query statistics system.

## Table of Contents

- [Overview](#overview)
- [Technologies](#technologies)
- [How to run](#how-to-run)
- [API Endpoints](#api-endpoints)
- [Statistics System](#statistics-system)
- [Testing](#testing)

## Overview

REST API that consumes the [SWAPI](https://swapi.dev) and provides endpoints to search for Star Wars movies and characters. Includes a statistics system that tracks queries and recomputes metrics every 5 minutes using an event-driven architecture.

### Features

- Search movies and characters
- View detailed information with related data
- Query statistics with automatic 5-minute recomputation
- Event-based asynchronous processing

## Technologies

**Backend:** Python 3.10, FastAPI, Uvicorn, Asyncio, Pydantic  
**Frontend:** Vue 3, TypeScript, Vite, Tailwind CSS  
**DevOps:** Docker, Docker Compose

## How to run

### Using Docker Compose

```bash
git clone <repository-url>
cd lawnstarter-challenge
docker-compose up --build
```

Access:
- Frontend: http://localhost:5173
- Backend API: http://localhost:8000
- API Docs: http://localhost:8000/docs

## API Endpoints

### Movies

**GET /api/movies**  
Search movies by term.
```bash
curl "http://localhost:8000/api/movies?search=empire"
```

**GET /api/movies/details/{movie_id}**  
Get movie details with characters.
```bash
curl "http://localhost:8000/api/movies/details/1"
```

### People

**GET /api/people**  
Search characters by term.
```bash
curl "http://localhost:8000/api/people?search=luke"
```

**GET /api/people/details/{person_id}**  
Get character details with movies.
```bash
curl "http://localhost:8000/api/people/details/1"
```

### Statistics

**GET /api/stats**  
Returns query statistics.
```bash
curl "http://localhost:8000/api/stats"
```

### Testing

Make test queries:
```bash
curl "http://localhost:8000/api/movies?search=star"
curl "http://localhost:8000/api/people?search=luke"
curl "http://localhost:8000/api/stats"
```

To test faster recomputation, change `interval_seconds` from 300 to 10 in `app/stats/scheduler.py`.
Testing

### End-to-End Tests with Cypress

Frontend e2e tests are located in `frontend/cypress/e2e/`:

**Run tests interactively:**
```bash
cd frontend
npm run cy:open
```

**Run tests in headless mode:**
```bash
cd frontend
npm run cy:run
```

**Test coverage:**
- `home.cy.ts`
- `movie.cy.ts`
- `people.cy.ts`

## Configuration

**Frontend Environment Variables:**
- `VITE_API_BASE_URL`: Backend API URL (default: http://localhost:8000/api)

## License

Built for the Lawnstarter Challenge.

