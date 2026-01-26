import { NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { prisma } from '@/lib/prisma';
import { authOptions } from '@/app/api/auth/[...nextauth]/route';
import path from 'path';
import fs from 'fs/promises';

// UPDATE member
export async function PUT(
    request: Request,
    { params }: { params: Promise<{ id: string }> }
) {
    try {
        const session = await getServerSession(authOptions);
        if (!session) {
            return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
        }

        const { id } = await params;
        const formData = await request.formData();
        const name = formData.get('name') as string;
        const designation = formData.get('designation') as string;
        const bio = formData.get('bio') as string;
        const order = formData.get('order') as string;
        const photo = formData.get('photo') as File | null;

        let photoUrl = undefined;
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

            const bytes = await photo.arrayBuffer();
            const buffer = Buffer.from(bytes);
            const filename = `${Date.now()}-${photo.name.replace(/\s+/g, '-')}`;

            const uploadDir = path.join(process.cwd(), 'public', 'assets', 'uploads', 'member');
            await fs.mkdir(uploadDir, { recursive: true });

            const filePath = path.join(uploadDir, filename);
            await fs.writeFile(filePath, buffer);

            photoUrl = `/assets/uploads/member/${filename}`;
        }

        const member = await prisma.member.update({
            where: { id },
            data: {
                name,
                designation,
                bio,
                order: order ? parseInt(order) : undefined,
                showOnHome: formData.get('showOnHome') === 'true',
                contributionAmount: formData.get('contributionAmount') ? parseFloat(formData.get('contributionAmount') as string) : undefined,
                ...(photoUrl && { photoUrl }),
            },
        });

        return NextResponse.json(member);
    } catch (error) {
        console.error("Error updating member:", error);
        return NextResponse.json({
            error: 'Failed to update member',
            details: error instanceof Error ? error.message : String(error)
        }, { status: 500 });
    }
}

// DELETE member
export async function DELETE(
    request: Request,
    { params }: { params: Promise<{ id: string }> }
) {
    try {
        const session = await getServerSession(authOptions);
        if (!session) {
            return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
        }

        const { id } = await params;
        await prisma.member.delete({
            where: { id },
        });

        return NextResponse.json({ message: 'Member deleted successfully' });
    } catch (error) {
        return NextResponse.json({ error: 'Failed to delete member' }, { status: 500 });
    }
}
