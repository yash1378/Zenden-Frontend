# Task Management App

This is a simple Task Management application built with Next.js and TypeScript. The app allows users to manage their tasks securely, with JWT-based authentication.

## Features

- User registration and login
- JWT-based authentication
- Create, update, delete, and view tasks
- Task management per user

## Prerequisites

Before you begin, ensure you have met the following requirements:

- Node.js installed (version 14.x or higher)
- npm installed
- MongoDB running (locally or on a cloud service like MongoDB Atlas)

## Getting Started
Sure! Here’s the revised structure in the `README.md` with the sections separated:

### 1. Clone the Repository

Clone this repository to your local machine:

```bash
git clone https://github.com/your-username/task-management-app.git
cd task-management-app
```

### 2. Project Structure

After cloning the repository, your project structure should look like this:

```bash
task-management-app/
│
├── components/           # React components used across the application
├── pages/                # Next.js pages (routes)
├── public/               # Static assets
├── styles/               # Global and modular CSS/SCSS files
├── types/                # TypeScript type definitions (if applicable)
├── .env.local            # Environment variables
├── next.config.js        # Next.js configuration file
├── tsconfig.json         # TypeScript configuration file
├── setup.sh              # Setup script
└── README.md             # Project documentation
```

### 3. Run the Setup Script

To install the necessary libraries and start the Next.js development server, follow these steps:

1. **Make the script executable**:

   ```bash
   chmod +x setup.sh
   ```

2. **Run the script**:

   ```bash
   ./setup.sh
   ```