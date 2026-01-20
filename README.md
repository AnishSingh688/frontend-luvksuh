# Luv Kush Website - Frontend

Next.js frontend application for the Luv Kush Pratisthan website.

## Setup

1. Install dependencies:
```bash
npm install
```

2. Create `.env` file (if not exists) with your configuration:
```env
DATABASE_URL=your_database_url
NEXTAUTH_SECRET=your_nextauth_secret
NEXTAUTH_URL=http://localhost:3000
```

3. Run the development server:
```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

## Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm start` - Start production server
- `npm run lint` - Run ESLint

## Tech Stack

- **Framework**: Next.js 16
- **Database**: PostgreSQL with Prisma ORM
- **Authentication**: NextAuth.js
- **Styling**: Tailwind CSS
- **Language**: TypeScript

## Project Structure

```
frontend/
├── app/              # App router pages
├── components/       # React components
├── lib/              # Utility libraries
├── prisma/           # Database schema
├── public/           # Static assets
└── types/            # TypeScript types
```

## Development

The frontend connects to the backend API for payment processing. Ensure the backend server is running on the configured port (default: 4000).
