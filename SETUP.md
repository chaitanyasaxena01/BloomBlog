# BloomBlog Setup Guide

## Migrating from Appwrite to Prisma and Clerk

This guide will help you set up your BloomBlog application with Prisma for database operations and Clerk for authentication.

## Prerequisites

- Node.js and npm installed
- NeonDB account (for PostgreSQL database)
- Clerk account (for authentication)
- TinyMCE account (for rich text editor)

## Setup Steps

### 1. Environment Variables

Update your `.env` file with the following variables:

```
# Clerk Authentication Keys
VITE_CLERK_PUBLISHABLE_KEY=pk_test_your_publishable_key
VITE_CLERK_SECRET_KEY=sk_test_your_secret_key

# Database URL for Prisma (NeonDB connection string)
DATABASE_URL="postgresql://username:password@endpoint.neon.tech/bloomblog?sslmode=require"

# TinyMCE API Key
VITE_TINYMCE_API_KEY=your_tinymce_api_key
```

### 2. Getting Clerk API Keys

1. Sign up for a Clerk account at [https://clerk.dev/](https://clerk.dev/)
2. Create a new application in the Clerk dashboard
3. Navigate to the API Keys section
4. Copy the `Publishable Key` and `Secret Key`
5. Add these keys to your `.env` file as shown above

### 3. Setting up NeonDB

1. Create a NeonDB account at [https://neon.tech/](https://neon.tech/)
2. Create a new project
3. In the project dashboard, create a new database named `bloomblog`
4. Navigate to the Connection Details section
5. Copy the connection string provided by NeonDB
6. Replace the placeholders in the `DATABASE_URL` environment variable with your actual credentials:
   - Replace `username` with your NeonDB username
   - Replace `password` with your NeonDB password
   - Replace `endpoint.neon.tech` with your actual NeonDB endpoint

### 4. Setting up Prisma

1. Install Prisma CLI globally (if not already installed):
   ```bash
   npm install -g prisma
   ```

2. The Prisma schema is already configured in the project. Review the schema at `prisma/schema.prisma`

3. Generate the Prisma client:
   ```bash
   npx prisma generate
   ```

4. Run database migrations to create the tables:
   ```bash
   npx prisma migrate dev --name init
   ```

### 5. Getting TinyMCE API Key

1. Sign up for a TinyMCE account at [https://www.tiny.cloud/](https://www.tiny.cloud/)
2. Create a new API key
3. Add the API key to your `.env` file as shown above

### 6. Installing Dependencies

Install all required dependencies:

```bash
npm install
```

### 7. Running the Application

Start the development server:

```bash
npm run dev
```

The application should now be running at `http://localhost:5173`

## Project Structure

- `src/lib/prisma.js`: Prisma client configuration
- `src/lib/auth.js`: Clerk authentication service
- `prisma/schema.prisma`: Database schema definition

## Additional Resources

- [Prisma Documentation](https://www.prisma.io/docs/)
- [Clerk Documentation](https://clerk.dev/docs)
- [NeonDB Documentation](https://neon.tech/docs/)
- [TinyMCE Documentation](https://www.tiny.cloud/docs/)