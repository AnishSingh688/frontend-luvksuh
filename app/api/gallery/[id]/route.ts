import { NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { prisma } from '@/lib/prisma';
import { authOptions } from '@/app/api/auth/[...nextauth]/route';

// UPDATE gallery item
export async function PUT(
    request: Request,
    { params }: { params: Promise<{ id: string }> }
) {
    try {
        const { id } = await params;
        const session = await getServerSession(authOptions);

        if (!session) {
            return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
        }

        const body = await request.json();
        const { title, description, imageUrl, category, eventDate, order } = body;

        const galleryItem = await prisma.galleryItem.update({
            where: { id },
            data: {
                ...(title && { title }),
                ...(description && { description }),
                ...(imageUrl && { imageUrl }),
                ...(category && { category }),
                ...(eventDate !== undefined && { eventDate }),
                ...(order !== undefined && { order }),
            },
        });

        return NextResponse.json(galleryItem);
    } catch (error) {
        return NextResponse.json({ error: 'Failed to update gallery item' }, { status: 500 });
    }
}

// DELETE gallery item
export async function DELETE(
    request: Request,
    { params }: { params: Promise<{ id: string }> }
) {
    try {
        const { id } = await params;
        const session = await getServerSession(authOptions);

        if (!session) {
            return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
        }

        await prisma.galleryItem.delete({
            where: { id },
        });

        return NextResponse.json({ message: 'Gallery item deleted successfully' });
    } catch (error) {
        return NextResponse.json({ error: 'Failed to delete gallery item' }, { status: 500 });
    }
}
