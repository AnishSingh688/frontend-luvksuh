import { PrismaClient } from '@prisma/client';
import { hashPassword } from '../lib/auth';

const prisma = new PrismaClient();

async function main() {
    console.log('Starting database seed...');

    // Create admin user
    const hashedPassword = await hashPassword('admin123');
    const admin = await prisma.admin.upsert({
        where: { email: 'admin@luvkushpratisthan.org' },
        update: {},
        create: {
            email: 'admin@luvkushpratisthan.org',
            password: hashedPassword,
            name: 'Admin User',
        },
    });
    console.log('Created admin user:', admin.email);

    // Create sample programs
    const programs = await Promise.all([
        prisma.program.create({
            data: {
                title: 'Scholarships',
                category: 'Education',
                description: 'Support for meritorious and needy students across grades and colleges.',
            },
        }),
        prisma.program.create({
            data: {
                title: 'Health Camps',
                category: 'Health',
                description: 'Preventive screenings, maternal care awareness, and nutrition guidance.',
            },
        }),
        prisma.program.create({
            data: {
                title: 'Skills & Jobs',
                category: 'Livelihood',
                description: 'Vocational training, micro-entrepreneurship, and placement help.',
            },
        }),
    ]);
    console.log(`Created ${programs.length} programs`);

    // Create sample events
    const events = await Promise.all([
        prisma.event.create({
            data: {
                title: 'Education Scholarship Drive',
                date: 'Sep 28, 2025',
                location: 'Biratnagar',
                description: 'Application counseling, document help, and merit awards announcements.',
            },
        }),
        prisma.event.create({
            data: {
                title: 'Community Health Camp',
                date: 'Oct 11, 2025',
                location: 'Biratnagar',
                description: 'General check-ups, maternal health, and nutrition awareness.',
            },
        }),
        prisma.event.create({
            data: {
                title: 'Cultural Festival & Sports',
                date: 'Nov 15, 2025',
                location: 'Biratnagar',
                description: 'Celebrating heritage with music, art, and youth sports events.',
            },
        }),
    ]);
    console.log(`Created ${events.length} events`);

    console.log('Seed completed successfully!');
}

main()
    .catch((e) => {
        console.error(e);
        process.exit(1);
    })
    .finally(async () => {
        await prisma.$disconnect();
    });
