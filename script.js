// script.js - MedFinder with Simulated Location & Realistic Medicine Data

const locationBtn = document.getElementById('location-btn');
const searchBtn = document.getElementById('search-btn');
const medicineSearch = document.getElementById('medicine-search');
const userLocationDiv = document.getElementById('user-location');
const loadingDiv = document.getElementById('loading');
const resultsDiv = document.getElementById('results');

let userLocation = null;
let nearbyPharmacies = [];

// Initialize
document.addEventListener('DOMContentLoaded', () => {
  locationBtn.addEventListener('click', handleLocationRequest);
  searchBtn.addEventListener('click', handleSearch);
});

function handleLocationRequest() {
  showLoading(true);

  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(
      (position) => {
        userLocation = {
          lat: position.coords.latitude,
          lng: position.coords.longitude,
        };

        userLocationDiv.innerHTML = `
          <i class="fas fa-map-marker-alt"></i> 
          Using your current location: ${userLocation.lat.toFixed(4)}, ${userLocation.lng.toFixed(4)}
          <br><span class="text-xs text-gray-500">Demo mode — (simulated location & pharmacy data)</span>
        `;
        userLocationDiv.classList.remove('hidden');

        findNearbyPharmacies();
      },
      (error) => {
        showLoading(false);
        alert("Unable to retrieve your location. Please enable location services.");
      }
    );
  } else {
    showLoading(false);
    alert("Geolocation is not supported by this browser.");
  }
}

function handleSearch() {
  if (!userLocation) {
    alert("Please enable location first.");
    return;
  }

  showLoading(true);

  setTimeout(() => {
    const searchTerm = medicineSearch.value.trim().toLowerCase();
    findNearbyPharmacies(searchTerm);
  }, 1000);
}

function showLoading(show) {
  loadingDiv.style.display = show ? 'flex' : 'none';
}

function findNearbyPharmacies(searchTerm = '') {
  setTimeout(() => {
    nearbyPharmacies = generateNearbyPharmacies(userLocation);
    displayPharmacies(searchTerm);
    showLoading(false);
  }, 1500);
}

function generateNearbyPharmacies(userLoc) {
  const pharmacyChains = [
    "Apollo Pharmacy", "MedPlus", "Wellness Forever",
    "Fortis Pharmacy", "Trust Pharmacy", "Health & Glow"
  ];

  const areaNames = [
    "Main Road", "Near City Mall", "Opposite Hospital",
    "Market Complex", "Near Bus Stand"
  ];

  return Array.from({ length: 5 + Math.floor(Math.random() * 3) }, (_, i) => {
    const distanceKm = 0.5 + (Math.random() * 4);
    const angle = Math.random() * Math.PI * 2;
    const lat = userLoc.lat + (distanceKm / 111.32 * Math.cos(angle));
    const lng = userLoc.lng + (distanceKm / (111.32 * Math.cos(lat)) * Math.sin(angle));

    return {
      id: `pharma-${i}`,
      name: pharmacyChains[i % pharmacyChains.length],
      address: `${areaNames[i % areaNames.length]}, Area ${i + 1}`,
      distance: distanceKm.toFixed(1),
      medicines: generateRealisticMedicines()
    };
  }).sort((a, b) => a.distance - b.distance);
}

// Sample 1000+ medicine names (trimmed here for demo; full can be loaded from external file if needed)
const MEDICINE_DATABASE = [
  { name: "Dolo 650", generic: "Paracetamol", form: "Tablet", dosage: "650mg" },
  { name: "Crocin", generic: "Paracetamol", form: "Tablet", dosage: "500mg" },
  { name: "Combiflam", generic: "Ibuprofen + Paracetamol", form: "Tablet", dosage: "400mg/325mg" },
  { name: "Pan-D", generic: "Pantoprazole + Domperidone", form: "Capsule", dosage: "40mg/10mg" },
  { name: "Amoxicillin", generic: "Amoxicillin", form: "Capsule", dosage: "500mg" },
  { name: "Cetrizine", generic: "Cetirizine", form: "Tablet", dosage: "10mg" },
  { name: "Azithral", generic: "Azithromycin", form: "Tablet", dosage: "500mg" },
  { name: "Zincovit", generic: "Multivitamin", form: "Tablet", dosage: "Standard" },
  { name: "Augmentin", generic: "Amoxicillin + Clavulanic Acid", form: "Tablet", dosage: "625mg" },
  { name: "Rantac", generic: "Ranitidine", form: "Tablet", dosage: "150mg" },
  // Add more...
];

function generateRealisticMedicines() {
  const medPool = [...MEDICINE_DATABASE];
  const numMeds = 5 + Math.floor(Math.random() * 5);
  const selected = new Set();
  const meds = [];

  while (selected.size < numMeds) {
    const med = medPool[Math.floor(Math.random() * medPool.length)];
    if (!selected.has(med.name)) {
      selected.add(med.name);
      meds.push({
        name: med.name,
        generic: med.generic,
        form: med.form,
        dosage: med.dosage,
        stock: Math.floor(Math.random() * 15),
        price: `₹${15 + Math.floor(Math.random() * 50)}`
      });
    }
  }

  return meds;
}

function displayPharmacies(searchTerm = '') {
  resultsDiv.innerHTML = '';

  nearbyPharmacies.forEach(pharmacy => {
    const uniqueMeds = new Map();

    pharmacy.medicines.forEach(med => {
      const key = med.name.toLowerCase();
      if (!uniqueMeds.has(key)) {
        uniqueMeds.set(key, med);
      }
    });

    const matchingMeds = searchTerm
      ? [...uniqueMeds.values()].filter(med => med.name.toLowerCase().includes(searchTerm))
      : [...uniqueMeds.values()];

    if (matchingMeds.length > 0) {
      const card = document.createElement('div');
      card.className = 'pharmacy-card bg-white rounded-lg shadow p-4 mb-6';

      card.innerHTML = `
        <h3 class="text-lg font-semibold">${pharmacy.name}</h3>
        <p class="text-gray-600 text-sm">
          <i class="fas fa-map-marker-alt mr-1"></i>
          ${pharmacy.address}
        </p>
        <p class="text-gray-500 text-xs mt-1">
          <i class="fas fa-route mr-1"></i>
          About ${pharmacy.distance} km away
        </p>
        <div class="medicines-list mt-3">
          ${matchingMeds.map(med => `
            <div class="medicine py-2 border-b border-gray-100">
              <div class="flex justify-between">
                <div>
                  <p class="font-medium">${med.name}</p>
                  <p class="text-xs text-gray-500">${med.generic} • ${med.dosage} • ${med.form}</p>
                </div>
                <span class="stock-status ${getStockClass(med.stock)}">
                  ${med.stock > 0 ? `${med.stock} left • ${med.price}` : 'Out of stock'}
                </span>
              </div>
            </div>
          `).join('')}
        </div>
      `;

      resultsDiv.appendChild(card);
    }
  });

  if (resultsDiv.innerHTML === '') {
    resultsDiv.innerHTML = `
      <div class="text-center py-8 text-gray-500">
        <i class="fas fa-exclamation-circle text-2xl mb-2"></i>
        <p>No matching medicines found nearby.</p>
      </div>
    `;
  }
}

function getStockClass(stock) {
  if (stock === 0) return 'out-of-stock';
  if (stock <= 5) return 'low-stock';
  return 'in-stock';
}
