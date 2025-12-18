# Lawnstarter Challenge - Star Wars API

REST API for searching Star Wars movies and characters with a query statistics system.

## Table of Contents

- [Overview](#overview)
- [Technologies](#technologies)
- [Installation](#installation)
- [API Endpoints](#api-endpoints)
- [Statistics System](#statistics-system)

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

## Installation

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

### Local Development

**Backend:**
```bash
cd backend
python -m venv env
source env/bin/activate
pip install -r requirements.txt
uvicorn app.main:app --reload
```

**Frontend:**
```bash
cd frontend
npm install
npm run dev
```

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

Response includes:
- `generated_at`: Last computation timestamp
- `top_queries`: Top 5 queries with counts and percentages
- `avg_duration_ms`: Average query duration
- `popular_hour_utc`: Most popular hour
- `totals`: Query counts by type

## Statistics System

The system uses an event-driven architecture with asynchronous queue processing:

1. **Query Recording**: When queries are made, events are published to the queue
2. **Worker Processing**: Background worker processes events and stores data
3. **Scheduled Recomputation**: Every 5 minutes, statistics are recalculated
4. **Instant Access**: `/stats` endpoint returns the latest snapshot

### Components

- **Event Queue** (`app/events/queue.py`): Manages asynchronous events
- **Event Types** (`app/events/types.py`): Defines QueryRecordedEvent and RecomputeStatsEvent
- **Stats Worker** (`app/stats/worker.py`): Processes queue events
- **Stats Scheduler** (`app/stats/scheduler.py`): Triggers recomputation every 5 minutes
- **Stats Store** (`app/stats/store.py`): Stores and computes statistics

### Testing

Make test queries:
```bash
curl "http://localhost:8000/api/movies?search=star"
curl "http://localhost:8000/api/people?search=luke"
curl "http://localhost:8000/api/stats"
```

To test faster recomputation, change `interval_seconds` from 300 to 10 in `app/stats/scheduler.py`.

## Configuration

**Frontend Environment Variables:**
- `VITE_API_BASE_URL`: Backend API URL (default: http://localhost:8000/api)

## License

Built for the Lawnstarter Challenge.

