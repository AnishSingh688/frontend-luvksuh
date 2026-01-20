import { NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { prisma } from '@/lib/prisma';
import { authOptions } from '@/app/api/auth/[...nextauth]/route';

// GET all programs
export async function GET() {
    try {
        const programs = await prisma.program.findMany({
            orderBy: { createdAt: 'desc' },
        });
        return NextResponse.json(programs);
    } catch (error) {
        return NextResponse.json({ error: 'Failed to fetch programs' }, { status: 500 });
    }
}

// CREATE new program
export async function POST(request: Request) {
    try {
        const session = await getServerSession(authOptions);

        if (!session) {
            return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
        }

        const body = await request.json();
        const { title, category, description } = body;

        if (!title || !category || !description) {
            return NextResponse.json({ error: 'Missing required fields' }, { status: 400 });
        }

        const program = await prisma.program.create({
            data: { title, category, description },
        });

        return NextResponse.json(program, { status: 201 });
    } catch (error) {
        return NextResponse.json({ error: 'Failed to create program' }, { status: 500 });
    }
}
