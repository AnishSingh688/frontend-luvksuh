import { NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { prisma } from '@/lib/prisma';
import { authOptions } from '@/app/api/auth/[...nextauth]/route';

// GET single event
export async function GET(request: Request, { params }: { params: Promise<{ id: string }> }) {
    try {
        const { id } = await params;
        const event = await prisma.event.findUnique({
            where: { id },
        });

        if (!event) {
            return NextResponse.json({ error: 'Event not found' }, { status: 404 });
        }

        return NextResponse.json(event);
    } catch (error) {
        return NextResponse.json({ error: 'Failed to fetch event' }, { status: 500 });
    }
}

// UPDATE event
export async function PUT(request: Request, { params }: { params: Promise<{ id: string }> }) {
    try {
        const session = await getServerSession(authOptions);

        if (!session) {
            return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
        }

        const { id } = await params;
        const body = await request.json();
        const { title, date, location, description } = body;

        const event = await prisma.event.update({
            where: { id },
            data: { title, date, location, description },
        });

        return NextResponse.json(event);
    } catch (error) {
        return NextResponse.json({ error: 'Failed to update event' }, { status: 500 });
    }
}

// DELETE event
export async function DELETE(request: Request, { params }: { params: Promise<{ id: string }> }) {
    try {
        const session = await getServerSession(authOptions);

        if (!session) {
            return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
        }

        const { id } = await params;
        await prisma.event.delete({
            where: { id },
        });

        return NextResponse.json({ message: 'Event deleted successfully' });
    } catch (error) {
        return NextResponse.json({ error: 'Failed to delete event' }, { status: 500 });
    }
}
