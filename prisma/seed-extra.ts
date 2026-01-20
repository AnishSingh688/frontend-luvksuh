import { PrismaClient } from '@prisma/client'
import fs from 'fs'
import path from 'path'

const prisma = new PrismaClient()

async function main() {
    try {
        const seedSqlPath = path.join(__dirname, '../scripts/seed-extra.sql') // Use seed-extra.sql
        const seedSql = fs.readFileSync(seedSqlPath, 'utf-8')

        // Split by semicolons
        const statements = seedSql
            .split(';')
            .map(s => s.trim())
            .filter(s => s.length > 0)

        console.log(`Found ${statements.length} SQL statements to execute.`)

        for (const statement of statements) {
            await prisma.$executeRawUnsafe(statement)
        }

        console.log('✅ Extra data seeded successfully')
    } catch (e) {
        console.error('❌ Error seeding data:', e)
        process.exit(1)
    } finally {
        await prisma.$disconnect()
    }
}

main()
