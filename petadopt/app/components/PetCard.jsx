'use client'
import React, { useState } from 'react'

export default function PetCard({ pet, handleUpdate }) {
    const [status, setStatus] = useState(pet.status);

    return (
        <div className="pet-card">
            <img src={pet.photo} alt={pet.name}/>
            <h3>{pet.name}</h3>
            <p><strong>Species:</strong> {pet.species}</p>
            <p><strong>Age:</strong> {pet.age} years</p>
            <p><strong>Status:</strong> {pet.status}</p>
            <button className={`btn ${status === 'Available' ? 'adopt' : 'return'} ${status === 'Adopted' ? 'toggled' : ''}`}
                    onClick={() => handleUpdate(pet.id, pet, setStatus)}>
                {status === 'Available' ? 'Adopt' : 'Return'}
            </button>
        </div>
    )
}
