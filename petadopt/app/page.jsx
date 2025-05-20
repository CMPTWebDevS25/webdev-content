import React from 'react'
import ShelterList from './components/ShelterList'
import petAdoptRepo from './repo/petAdoptRepo'

export default async function page() {
  const shelters = await petAdoptRepo.getShelters();

  return (
    <div className="container">
      <header>
          <h1>🐾 PetAdopt</h1>
          <p>Find your perfect pet at a shelter near you</p>
      </header>
      <ShelterList s={shelters}/>
    </div>
  )
}