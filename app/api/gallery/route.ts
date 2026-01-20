import { NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { prisma } from '@/lib/prisma';
import { authOptions } from '@/app/api/auth/[...nextauth]/route';

// GET all gallery items
export async function GET() {
    try {
        const galleryItems = await prisma.galleryItem.findMany({
            orderBy: [
                { order: 'asc' },
                { eventDate: 'desc' },
                { createdAt: 'desc' }
            ],
        });
        return NextResponse.json(galleryItems);
    } catch (error) {
        return NextResponse.json({ error: 'Failed to fetch gallery items' }, { status: 500 });
    }
}

// CREATE new gallery item
export async function POST(request: Request) {
    try {
        const session = await getServerSession(authOptions);

        if (!session) {
            return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
        }

        const body = await request.json();
        const { title, description, imageUrl, category, eventDate, order } = body;

        if (!title || !description || !imageUrl || !category) {
            return NextResponse.json({ error: 'Missing required fields' }, { status: 400 });
        }

        const galleryItem = await prisma.galleryItem.create({
            data: {
                title,
                description,
                imageUrl,
                category,
                eventDate: eventDate || null,
                order: order || 0,
            },
        });

        return NextResponse.json(galleryItem, { status: 201 });
    } catch (error) {
        return NextResponse.json({ error: 'Failed to create gallery item' }, { status: 500 });
    }
}
