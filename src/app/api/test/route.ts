import { NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'

export async function GET() {
  console.log('Testing database connection...');
  try {
    // Try to connect to the database
    await prisma.$connect();
    console.log('Database connection successful!');
    
    // Get the database version
    const result = await prisma.$runCommandRaw({
      dbStats: 1
    });
    
    return NextResponse.json({
      status: 'Connected',
      databaseInfo: result,
      env: {
        databaseUrl: process.env.DATABASE_URL?.slice(0, 20) + '...',
        nodeEnv: process.env.NODE_ENV
      }
    })
  } catch (error) {
    console.error('Database connection error:', error);
    return NextResponse.json({
      status: 'Error',
      error: error instanceof Error ? error.message : 'Unknown error',
      env: {
        databaseUrl: process.env.DATABASE_URL?.slice(0, 20) + '...',
        nodeEnv: process.env.NODE_ENV
      }
    }, { status: 500 })
  } finally {
    await prisma.$disconnect();
  }
} 