import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
    const members = await prisma.member.findMany({
        where: {
            photoUrl: {
                startsWith: '/uploads/member/'
            }
        }
    });

    console.log(`Found ${members.length} members with old photo paths.`);

    for (const member of members) {
        const newPath = member.photoUrl?.replace('/uploads/member/', '/assets/uploads/member/');
        if (newPath) {
            await prisma.member.update({
                where: { id: member.id },
                data: { photoUrl: newPath }
            });
            console.log(`Updated member ${member.name}: ${member.photoUrl} -> ${newPath}`);
        }
    }
}

main()
    .catch(e => {
        console.error(e);
        process.exit(1);
    })
    .finally(async () => {
        await prisma.$disconnect();
    });
