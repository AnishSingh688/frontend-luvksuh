import { NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { prisma } from '@/lib/prisma';
import { authOptions } from '@/app/api/auth/[...nextauth]/route';

// GET all events
export async function GET() {
    try {
        const events = await prisma.event.findMany({
            orderBy: { date: 'asc' },
        });
        return NextResponse.json(events);
    } catch (error) {
        return NextResponse.json({ error: 'Failed to fetch events' }, { status: 500 });
    }
}

// CREATE new event
export async function POST(request: Request) {
    try {
        const session = await getServerSession(authOptions);

        if (!session) {
            return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
        }

        const body = await request.json();
        const { title, date, location, description } = body;

        if (!title || !date || !location || !description) {
            return NextResponse.json({ error: 'Missing required fields' }, { status: 400 });
        }

        const event = await prisma.event.create({
            data: { title, date, location, description },
        });

        return NextResponse.json(event, { status: 201 });
    } catch (error) {
        return NextResponse.json({ error: 'Failed to create event' }, { status: 500 });
    }
}
