'use client'
import { getShelterByIdAction, updatePetStatusAction } from '@/app/action/action';
import PetCard from '@/app/components/PetCard';
import Link from 'next/link'
import React, { useEffect, useState, use } from 'react'

export default function page({ params }) {
    const { id } = use(params)
    const [pets, setPets] = useState([])

    useEffect(() => {
        const fetchPets = async () => {
            const s = await getShelterByIdAction(id);
            setPets(s.pets);
        };
        fetchPets();
    }, [])

    async function handlePetAction(petId, pet, setStatus) {
        if(pet.status === "Available") {
            pet.status = "Adopted";
            setStatus("Adopted")
        } else {
            pet.status = "Available";
            setStatus("Available")
        }
        await updatePetStatusAction(petId, pet);
    }

    return (
        <div className="container">
            <header>
                <h1>🐾 Available Pets</h1>
                <p>Find your perfect companion</p>
                <Link href="/" className="btn">← Back to Shelters</Link>
            </header>

            <div id="petList">
                {pets.map((p, index) => <PetCard key={index} pet={p} handleUpdate={handlePetAction}/>)}
            </div>
        </div>
    )
}
