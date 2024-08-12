#!/bin/bash

# Step 1: Install dependencies
echo "Installing dependencies..."
npm install

# Step 2: Set up environment variables
echo "Setting up environment variables..."
if [ ! -f ".env.local" ]; then
    touch .env.local
    echo "NEXT_PUBLIC_API_URL=http://localhost:5000" >> .env.local
    echo ".env.local file created with default API URL"
else
    echo ".env.local file already exists"
fi

# Step 3: Run the development server
echo "Starting the development server..."
npm run dev
