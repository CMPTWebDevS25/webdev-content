'use server'

import { revalidatePath } from 'next/cache'
import { redirect } from 'next/navigation'
import petAdoptRepo from '../repo/petAdoptRepo';

function removeServerActionProperty(data) {
    // this is a helper function to remove the $ACTION_ID_ prefix from the keys
    for (const key in data) {
        if (key.startsWith('$ACTION_ID_')) {
            delete data[key];
            break
        }
    }

    return data
}

export async function getShelterByIdAction(id) {
    return await petAdoptRepo.getShelter(id);
}

export async function updatePetStatusAction(id, updatedPet) {
    await petAdoptRepo.updatePetStatus(id, updatedPet);
}

export async function searchCityAction(city) {
    return await petAdoptRepo.getShelters(city);
}