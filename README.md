# PrayerMeet

A web application that helps Muslims connect for prayer sessions at mosques and prayer rooms.

## Features

- Create and join prayer sessions
- View available prayer locations (mosques and prayer rooms)
- See who's attending prayer sessions
- Real-time updates on session attendance

## Prerequisites

- Node.js 18+ installed
- PostgreSQL installed and running
- npm or yarn package manager

## Setup Instructions

1. Clone the repository
2. Install dependencies:
```bash
npm install
```

3. Set up your environment variables:
   - Copy `.env.example` to `.env`
   - Update the `DATABASE_URL` with your PostgreSQL credentials
   - Set up a secure `NEXTAUTH_SECRET`

4. Set up the database:
```bash
# Create and apply migrations
npx prisma migrate dev

# Generate Prisma Client
npx prisma generate
```

5. Run the development server:
```bash
npm run dev
```

The application will be available at [http://localhost:3000](http://localhost:3000)

## Database Setup

1. Install PostgreSQL if you haven't already
2. Create a new database:
```sql
CREATE DATABASE prayermeet;
```

3. Update the `DATABASE_URL` in your `.env` file with your database credentials

## Technologies Used

- Next.js 14
- TypeScript
- Prisma (ORM)
- PostgreSQL
- Tailwind CSS
- NextAuth.js
- shadcn/ui

## Contributing

1. Fork the repository
2. Create your feature branch
3. Commit your changes
4. Push to the branch
5. Create a new Pull Request

## License

This project is licensed under the MIT License.
