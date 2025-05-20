// Initialize localStorage if not exists
if (!localStorage.getItem("pets")) {
  localStorage.setItem("pets", JSON.stringify(pets));
}

// Function to get pets from localStorage
function getPets() {
  return JSON.parse(localStorage.getItem("pets"));
}

// Function to update pet status
function updatePetStatus(petId, newStatus) {
  const pets = getPets();
  const updatedPets = pets.map((pet) => {
    if (pet.id === petId) {
      return { ...pet, status: newStatus };
    }
    return pet;
  });
  localStorage.setItem("pets", JSON.stringify(updatedPets));
  return updatedPets;
}

// Function to get pets by shelter ID
function getPetsByShelter(shelterId) {
  const pets = getPets();
  return pets.filter((pet) => pet.shelterId === shelterId);
}

// Function to filter shelters by city
function filterSheltersByCity(city) {
  if (!city) return shelters;
  return shelters.filter((shelter) =>
    shelter.city.toLowerCase().includes(city.toLowerCase())
  );
}

// Function to get adoption statistics
function getAdoptionStats(pets) {
  const total = pets.length;
  const adopted = pets.filter((pet) => pet.status === "Adopted").length;
  return { total, adopted };
}

// Function to render shelters
function renderShelters(sheltersToRender) {
  const shelterList = document.getElementById("shelterList");
  if (!shelterList) return;

  shelterList.innerHTML = sheltersToRender
    .map((shelter) => {
      const shelterPets = getPetsByShelter(shelter.id);
      const stats = getAdoptionStats(shelterPets);

      return `
            <div class="shelter-card">
                <h2>${shelter.name}</h2>
                <p><strong>City:</strong> ${shelter.city}</p>
                <p><strong>Pets Available:</strong> ${shelter.petsAvailable}</p>
                <p class="adoption-stats">Adoption Progress: ${stats.adopted}/${stats.total} pets adopted</p>
                <a href="pets.html?shelterId=${shelter.id}" class="btn">View Pets</a>
            </div>
        `;
    })
    .join("");
}

// Function to render pets
function renderPets(petsToRender) {
  const petList = document.getElementById("petList");
  if (!petList) return;

  petList.innerHTML = petsToRender
    .map(
      (pet) => `
        <div class="pet-card">
            <img src="${pet.photo}" alt="${pet.name}">
            <h3>${pet.name}</h3>
            <p><strong>Species:</strong> ${pet.species}</p>
            <p><strong>Age:</strong> ${pet.age} years</p>
            <p><strong>Status:</strong> ${pet.status}</p>
            <button class="btn ${
              pet.status === "Available" ? "adopt" : "return"
            } ${pet.status === "Adopted" ? "toggled" : ""}" 
                    onclick="handlePetAction(${pet.id})">
                ${pet.status === "Available" ? "Adopt" : "Return"}
            </button>
        </div>
    `
    )
    .join("");
}

// Function to handle pet adoption/return
function handlePetAction(petId) {
  const pets = getPets();
  const pet = pets.find((p) => p.id === petId);
  if (!pet) return;

  const newStatus = pet.status === "Available" ? "Adopted" : "Available";
  updatePetStatus(petId, newStatus);

  // Refresh the pet list
  const urlParams = new URLSearchParams(window.location.search);
  const shelterId = parseInt(urlParams.get("shelterId"));
  if (shelterId) {
    const shelterPets = getPetsByShelter(shelterId);
    renderPets(shelterPets);
  }
}

// Initialize the page based on current URL
document.addEventListener("DOMContentLoaded", () => {
  const urlParams = new URLSearchParams(window.location.search);
  const shelterId = urlParams.get("shelterId");

  if (shelterId) {
    // We're on the shelter page
    const shelterPets = getPetsByShelter(parseInt(shelterId));
    renderPets(shelterPets);
  } else {
    // We're on the main page
    renderShelters(shelters);

    // Add search functionality
    const searchInput = document.getElementById("searchInput");
    if (searchInput) {
      searchInput.addEventListener("input", (e) => {
        const filteredShelters = filterSheltersByCity(e.target.value);
        renderShelters(filteredShelters);
      });
    }
  }
});
