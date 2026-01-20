import { PrismaClient } from '@prisma/client'
import { hashPassword } from '../lib/auth'

const prisma = new PrismaClient()

async function main() {
    const email = 'admin@luvkushpratisthan.org'
    const newPassword = 'admin123'

    console.log(`Resetting password for ${email}...`)

    const hashedPassword = await hashPassword(newPassword)
    console.log(`Generated new hash: ${hashedPassword}`)

    try {
        const updatedAdmin = await prisma.admin.update({
            where: { email },
            data: { password: hashedPassword },
        })
        console.log(`✅ Password updated successfully for user: ${updatedAdmin.name}`)
    } catch (error) {
        console.error(`❌ Failed to update password:`, error)
    } finally {
        await prisma.$disconnect()
    }
}

main()
