import { NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'

export async function POST(request: Request) {
  try {
    const body = await request.json()
    const { datetime, locationId, maxAttendees, notes, userId } = body

    const session = await prisma.prayerSession.create({
      data: {
        datetime: new Date(datetime),
        locationId,
        createdById: userId,
        maxAttendees,
        notes,
        attendeeIds: [userId], // Creator automatically joins the session
      },
      include: {
        location: true,
        createdBy: true,
        attendees: true,
      },
    })

    return NextResponse.json(session)
  } catch (error) {
    console.error('Error creating prayer session:', error)
    return NextResponse.json(
      { error: 'Error creating prayer session' },
      { status: 500 }
    )
  }
}

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url)
    const locationId = searchParams.get('locationId')
    
    const sessions = await prisma.prayerSession.findMany({
      where: locationId ? { locationId } : undefined,
      include: {
        location: true,
        createdBy: true,
        attendees: true,
      },
      orderBy: {
        datetime: 'asc',
      },
    })

    return NextResponse.json(sessions)
  } catch (error) {
    console.error('Error fetching prayer sessions:', error)
    return NextResponse.json(
      { error: 'Error fetching prayer sessions' },
      { status: 500 }
    )
  }
} 