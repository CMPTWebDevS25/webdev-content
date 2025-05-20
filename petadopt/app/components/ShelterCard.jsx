import Link from 'next/link'
import React from 'react'

export default function ShelterCard({ shelter }) {

  function getAdopted(shelter) {
    let total = 0
    for (const pet of shelter.pets) {
      if(pet.status === "Adopted") {
        total+=1;
      }
    }
    return total;
  }

  return (
    <div className="shelter-card">
        <h2>{shelter.name}</h2>
        <p><strong>City:</strong> {shelter.city}</p>
        <p><strong>Pets Available:</strong> {shelter.petsAvailable}</p>
        <p className="adoption-stats">Adoption Progress: {getAdopted(shelter)}/{shelter.pets.length} pets adopted</p>
        <Link href={"/shelter/" + shelter.id} className="btn">View Pets</Link>
    </div>
  )
}
