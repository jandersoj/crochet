# Build frontend
FROM node:20-alpine as frontend-build
WORKDIR /app
COPY frontend/package*.json ./
RUN npm install
COPY frontend/ ./
RUN npm run build

# Build backend
FROM python:3.12-slim
WORKDIR /app

# Install system dependencies and build tools
RUN apt-get update && apt-get install -y \
    gcc \
    python3-dev \
    libpq-dev \
    && rm -rf /var/lib/apt/lists/*

# Install Python dependencies
RUN pip install poetry
COPY backend/pyproject.toml backend/poetry.lock ./
RUN poetry config virtualenvs.create false \
    && poetry install --no-interaction --no-ansi

# Copy backend code
COPY backend/ ./

# Copy frontend build from the frontend-build stage
COPY --from=frontend-build /app/dist ./dist

# Expose the port
EXPOSE ${PORT}

# Start the application using the PORT environment variable
CMD poetry run flask run --host 0.0.0.0 --port ${PORT:-8000}
