'use client'
import React, { useState } from 'react'
import ShelterCard from './ShelterCard'
import { searchCityAction } from '../action/action';

export default function ShelterList({ s }) {
    const [shelters, setShelters] = useState(s);

    async function handleSearchCity(e) {
        const searchedCity = await searchCityAction(e.target.value);
        setShelters(searchedCity);
    }

    return (
        <>
            <div className="search-container">
                <input type="text" id="searchInput" placeholder="Search by city..." onInput={(e) => handleSearchCity(e)}/>
            </div>

            <div id="shelterList">
                {shelters.map((s, index) => <ShelterCard key={index} shelter={s}/>)}
            </div>
        </>
    )
}
