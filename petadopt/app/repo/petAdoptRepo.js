import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

class PetAdoptRepo {
    constructor() {}

    async getShelter(id) {
        return await prisma.shelter.findUnique({
            where: {
                id: parseInt(id)
            },
            include: {
                pets: true
            }
        })
    }

    async getShelters(city) {
        if(!city) {
            return await prisma.shelter.findMany({include: {pets: true}});
        }
        return await prisma.shelter.findMany({
            where: {
              city: {
                contains: city,
              },
            },
            include: {pets: true}
          })
    }

    async addPet(newPet) {
        return await prisma.pet.create({
            data: {newPet}
        });
    }

    async updatePetStatus(id, updatedPet) {
        const { status } = updatedPet;
        return await prisma.pet.update({
            where: {
                id: parseInt(id)
            }, data: {
                ...updatedPet,
                status: status
            }
        })
    }

    async deletePet(id) {
        return await prisma.pet.delete({where: {id: parseInt(id)}})
    }
}

export default new PetAdoptRepo();