# Curve AI Solutions Web App - Deployment Guide

## Project Overview

This is a modern web application built with:

- React 18 frontend
- Remix framework for server-side rendering
- Prisma for database ORM
- PostgreSQL database
- TailwindCSS for styling
- Docker for containerization

## Prerequisites for Deployment

- Node.js 20+
- Docker and Docker Compose
- PostgreSQL database
- PNPM package manager

## Local Development Setup

1. Clone the repository:

   ```bash
   git clone https://github.com/claybowl/Curve-Ai-Solutions-Web-App.git
   cd Curve-Ai-Solutions-Web-App
   ```

2. Install dependencies:

   ```bash
   pnpm install
   ```

3. Create a .env file based on .env.template:

   ```bash
   cp .env.template .env
   ```

   Then edit the .env file with your configuration values.

4. Start the development services:

   ```bash
   pnpm run docker:init
   ```

5. Initialize the database:

   ```bash
   pnpm run database:sync:dev
   pnpm run database:seed
   ```

6. Start the development server:
   ```bash
   pnpm run dev
   ```

## Production Deployment Options

### 1. Traditional Hosting (VPS/Dedicated Server)

1. Set up a VPS with Ubuntu/Debian
2. Install Node.js 20+, Docker, and PostgreSQL
3. Clone the repository
4. Build the application:
   ```bash
   pnpm run build
   ```
5. Start with PM2 or similar process manager:
   ```bash
   pm2 start npm --name "curve-ai-app" -- start
   ```

### 2. Platform as a Service (PaaS)

#### Deploying to Vercel

1. Connect your GitHub repository to Vercel
2. Set the following:
   - Framework Preset: Remix
   - Build Command: `pnpm run build`
   - Output Directory: `build/`
   - Install Command: `pnpm install`
3. Set up environment variables from your .env file
4. Deploy

#### Deploying to Render

1. Create a new Web Service on Render
2. Connect to your GitHub repository
3. Configure:
   - Build Command: `pnpm install && pnpm run build`
   - Start Command: `pnpm run start`
4. Add your environment variables
5. Deploy

### 3. Docker-based Deployment

This project includes Docker configuration for easy containerized deployment.

1. Build the Docker image:

   ```bash
   docker build -t curve-ai-app .
   ```

2. Run the container:
   ```bash
   docker run -p 8099:8099 --env-file .env curve-ai-app
   ```

## Database Considerations

- For production, use a managed PostgreSQL service (AWS RDS, DigitalOcean Managed Databases, etc.)
- Update your DATABASE_URL in the environment variables
- Run migrations before deployment:
  ```bash
  pnpm run database:sync
  ```

## Environment Variables

Ensure these environment variables are set for production:

- `NODE_ENV=production`
- `BASE_URL` - Your production URL
- `SERVER_AUTHENTICATION_SECRET` - A strong secret key
- `SERVER_DATABASE_URL` - PostgreSQL connection string
- `SERVER_OPENAI_API_KEY` - For AI functionality

## Monitoring and Maintenance

- Set up application monitoring with services like Sentry or New Relic
- Configure regular database backups
- Implement a CI/CD pipeline for automated deployments

## Support

For any deployment issues, please refer to the official documentation or open an issue on GitHub.
