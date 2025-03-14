#!/bin/bash
# start.sh
# This script starts both the Spring Boot backend and the Vite frontend concurrently.

# Start the backend (Spring Boot)
echo "Starting Spring Boot backend..."
( cd backend && ./gradlew bootRun ) &
BACKEND_PID=$!

# Start the frontend (Vite)
echo "Starting Vite frontend..."
( cd frontend && npm install && npm run dev ) &
FRONTEND_PID=$!

echo "Backend running with PID: $BACKEND_PID"
echo "Frontend running with PID: $FRONTEND_PID"

# Trap signals to terminate both processes when the script is stopped.
trap "echo 'Stopping servers...'; kill $BACKEND_PID $FRONTEND_PID; exit 0" SIGINT SIGTERM

# Wait for both background processes to exit
wait
