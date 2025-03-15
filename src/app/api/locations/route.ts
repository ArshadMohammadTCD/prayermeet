import { NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'

export async function POST(request: Request) {
  console.log('POST /api/locations called');
  try {
    const body = await request.json()
    console.log('Request body:', body);
    const { name, address, type } = body

    const location = await prisma.location.create({
      data: {
        name,
        address,
        type,
      },
    })
    console.log('Location created:', location);
    return NextResponse.json(location)
  } catch (error) {
    console.error('Detailed error:', error);
    return NextResponse.json(
      { error: 'Error creating location' },
      { status: 500 }
    )
  }
}

export async function GET() {
  console.log('GET /api/locations called');
  try {
    const locations = await prisma.location.findMany({
      include: {
        sessions: {
          where: {
            datetime: {
              gte: new Date(),
            },
          },
        },
      },
      orderBy: {
        name: 'asc',
      },
    })
    console.log('Locations fetched:', locations);
    return NextResponse.json(locations)
  } catch (error) {
    console.error('Detailed error:', error);
    return NextResponse.json(
      { error: 'Error fetching locations' },
      { status: 500 }
    )
  }
} 