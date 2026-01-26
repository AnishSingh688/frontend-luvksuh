import { NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { prisma } from '@/lib/prisma';
import { authOptions } from '@/app/api/auth/[...nextauth]/route';
import path from 'path';
import fs from 'fs/promises';

// GET all members
export async function GET() {
    try {
        const members = await prisma.member.findMany({
            orderBy: { order: 'asc' },
        });
        return NextResponse.json(members);
    } catch (error) {
        return NextResponse.json({ error: 'Failed to fetch members' }, { status: 500 });
    }
}

// CREATE new member
export async function POST(request: Request) {
    try {
        const session = await getServerSession(authOptions);

        if (!session) {
            return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
        }

        const formData = await request.formData();
        const name = formData.get('name') as string;
        const designation = formData.get('designation') as string;
        const bio = formData.get('bio') as string;
        const order = formData.get('order') as string;
        const photo = formData.get('photo') as File | null;

        if (!name || !designation) {
            return NextResponse.json({ error: 'Name and Designation are required' }, { status: 400 });
        }

        let photoUrl = null;
        if (photo && photo.size > 0) {
            // Security: Validate file type
            const allowedTypes = ['image/jpeg', 'image/png', 'image/webp'];
            if (!allowedTypes.includes(photo.type)) {
                return NextResponse.json({ error: 'Invalid file type. Only JPEG, PNG and WEBP are allowed.' }, { status: 400 });
            }

            // Security: Limit file size (e.g., 5MB)
            const MAX_SIZE = 5 * 1024 * 1024;
            if (photo.size > MAX_SIZE) {
                return NextResponse.json({ error: 'File too large. Max size is 5MB.' }, { status: 400 });
            }

            // Save file to public/uploads/member
            const bytes = await photo.arrayBuffer();
            const buffer = Buffer.from(bytes);
            const filename = `${Date.now()}-${photo.name.replace(/\s+/g, '-')}`;

            // Ensure directory exists (redundant check but safe)
            const uploadDir = path.join(process.cwd(), 'public', 'assets', 'uploads', 'member');
            await fs.mkdir(uploadDir, { recursive: true });

            const filePath = path.join(uploadDir, filename);
            await fs.writeFile(filePath, buffer);

            photoUrl = `/assets/uploads/member/${filename}`;
        }

        const member = await prisma.member.create({
            data: {
                name,
                designation,
                photoUrl,
                bio,
                order: order ? parseInt(order) : 0,
                showOnHome: formData.get('showOnHome') === 'true',
                contributionAmount: formData.get('contributionAmount') ? parseFloat(formData.get('contributionAmount') as string) : 0
            },
        });

        return NextResponse.json(member, { status: 201 });
    } catch (error) {
        console.error("Error creating member:", error);
        return NextResponse.json({
            error: 'Failed to create member',
            details: error instanceof Error ? error.message : String(error)
        }, { status: 500 });
    }
}
