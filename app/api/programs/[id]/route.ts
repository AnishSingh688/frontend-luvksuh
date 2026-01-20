import { NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { prisma } from '@/lib/prisma';
import { authOptions } from '@/app/api/auth/[...nextauth]/route';

// GET single program
export async function GET(request: Request, { params }: { params: Promise<{ id: string }> }) {
    try {
        const { id } = await params;
        const program = await prisma.program.findUnique({
            where: { id },
        });

        if (!program) {
            return NextResponse.json({ error: 'Program not found' }, { status: 404 });
        }

        return NextResponse.json(program);
    } catch (error) {
        return NextResponse.json({ error: 'Failed to fetch program' }, { status: 500 });
    }
}

// UPDATE program
export async function PUT(request: Request, { params }: { params: Promise<{ id: string }> }) {
    try {
        const session = await getServerSession(authOptions);

        if (!session) {
            return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
        }

        const { id } = await params;
        const body = await request.json();
        const { title, category, description } = body;

        const program = await prisma.program.update({
            where: { id },
            data: { title, category, description },
        });

        return NextResponse.json(program);
    } catch (error) {
        return NextResponse.json({ error: 'Failed to update program' }, { status: 500 });
    }
}

// DELETE program
export async function DELETE(request: Request, { params }: { params: Promise<{ id: string }> }) {
    try {
        const session = await getServerSession(authOptions);

        if (!session) {
            return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
        }

        const { id } = await params;
        await prisma.program.delete({
            where: { id },
        });

        return NextResponse.json({ message: 'Program deleted successfully' });
    } catch (error) {
        return NextResponse.json({ error: 'Failed to delete program' }, { status: 500 });
    }
}
