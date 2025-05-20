import { PrismaClient } from "@prisma/client"
import fs from "fs-extra"
import path from "path"

const prisma = new PrismaClient()

async function seed() {
    console.log("Seeding Started.....");

    const shelters = await fs.readJSON(path.join(process.cwd(), 'app/data/shelters.json'))
    const pets = await fs.readJSON(path.join(process.cwd(), 'app/data/pets.json'))

    for (const shelter of shelters)
        await prisma.shelter.create({ data: shelter })
    for (const pet of pets)
        await prisma.pet.create({ data: pet })

    prisma.$disconnect
    console.log('Completed Seeding');

}

seed()