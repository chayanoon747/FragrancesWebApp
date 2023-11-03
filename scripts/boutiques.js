const searchInput = document.getElementById('search-input');
const searchButton = document.getElementById('search-button');
const searchResults = document.getElementById('search-results');

const boutiques = [
    { city: 'ROME', address: 'Piazza di Spagna, 27', phone: '+39 06 69922050' },
    { city: 'MILAN', address: 'Via Gesù, 1', phone: '+39 02 76023307' },
    { city: 'PARIS', address: '6, Rue des Francs Bourgeois', phone: '+33 1 42748708' },
    { city: 'TOKYO', address: 'GINZA 6, 10-1, GINZA 6-Chome, Chuo-Ku, Tokyo, 104-0061 Japan',phone: '+81 05 85003455' },
];

function performSearch() {
    const searchTerm = searchInput.value.toUpperCase();
    const results = boutiques.filter(boutique => boutique.city.toUpperCase().includes(searchTerm));

    displayResults(results);
}

function displayResults(results) {
    if (results.length === 0) {
        searchResults.innerHTML = '<p>No results found.</p>';
    } else {
        const resultHTML = results.map(boutique => `
            <div class="boutique">
                <h2>${boutique.city}</h2>
                <p>${boutique.address}</p>
                <p>${boutique.phone}</p>
            </div>
        `).join('');
        searchResults.innerHTML = resultHTML;
    }
}

searchButton.addEventListener('click', performSearch);
