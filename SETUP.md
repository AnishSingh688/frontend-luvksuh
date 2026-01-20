# Installation and Setup Guide

## Prerequisites
1. Node.js (v18 or higher)
2. PostgreSQL database

## Database Setup

### 1. Update Environment Variables

Edit the `.env` file with your PostgreSQL credentials:

```env
DB_HOST="localhost"
DB_PORT="5432"
DB_USER="postgres"
DB_PASSWORD="YOUR_ACTUAL_PASSWORD"
DB_NAME="luvkush_db"
```

### 2. Create Database (if needed)

Open PostgreSQL and create the database:
```sql
CREATE DATABASE luvkush_db;
```

### 3. Run Prisma Migrations

```bash
# Generate Prisma client
npx prisma generate

# Push schema to database
npx prisma db push
```

### 4. Seed the Database

```bash
npx tsx scripts/seed.ts
```

This will create:
- Admin user (email: admin@luvkushpratisthan.org, password: admin123)
- 3 sample programs
- 3 sample events

## Running the Application

```bash
npm run dev
```

Visit:
- Public site: http://localhost:3000
- Admin login: http://localhost:3000/admin/login

## Admin Credentials

- **Email:** admin@luvkushpratisthan.org
- **Password:** admin123

⚠️ **Important:** Change these credentials in production!

## Features

✅ Public website with programs and events
✅ Admin dashboard at `/admin/dashboard`
✅ Manage programs (Create, Read, Update, Delete)
✅ Manage events (Create, Read, Update, Delete)
✅ Secure authentication with NextAuth.js
✅ PostgreSQL database with Prisma ORM
