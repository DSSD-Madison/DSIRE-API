import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

async function main() {
  const programs = await prisma.program.findFirst({
    select: {
      name: true,
      program_category: true
    }
  })
  console.log(programs)
}

main()
  .then(async () => {
    await prisma.$disconnect()
  })
  .catch(async (e) => {
    console.error(e)
    await prisma.$disconnect()
    process.exit(1)
  })
