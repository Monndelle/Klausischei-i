// List of countries for the voting
const countries = [
  "Albania", "Armenia", "Australia", "Austria", "Azerbaijan", "Belarus", "Belgium", "Bulgaria", "Croatia", "Cyprus", "Czech Republic",
  "Denmark", "Estonia", "Finland", "France", "Georgia", "Germany", "Greece", "Iceland", "Ireland", "Israel",
  "Italy", "Latvia", "Lithuania", "Malta", "Moldova", "Netherlands", "North Macedonia", "Norway", "Poland", "Portugal",
  "Romania", "Russia", "San Marino", "Serbia", "Slovakia", "Slovenia", "Spain", "Sweden", "Switzerland", "Ukraine", "United Kingdom"
];

// Initial vote data structure
let pointsGiven = {};
let votingData = {};

// Create the country lists for voting
function createCountryList() {
  const half1 = document.getElementById("countries1");
  const half2 = document.getElementById("countries2");

  countries.forEach((country, index) => {
    const li = document.createElement("li");
    li.textContent = country;
    li.addEventListener("click", () => givePoints(country, index));
    if (index < countries.length / 2) {
      half1.appendChild(li);
    } else {
      half2.appendChild(li);
    }
  });
}

// Points management and ranking update
function givePoints(country, index) {
  if (!pointsGiven[country]) pointsGiven[country] = 0;
  pointsGiven[country]++;

  if (pointsGiven[country] <= 12) {
    updateRanking(country);
  } else {
    pointsGiven[country] = 12;  // Cap at 12 points
  }

  updateDisplay();
}

function updateRanking(country) {
  // Find the country in the ranking and animate it
  let rankingList = document.getElementById("ranking");
  let countryInRanking = Array.from(rankingList.children).find(li => li.textContent.includes(country));

  if (countryInRanking) {
    countryInRanking.classList.add('up');  // Animate the country moving up
  }

  // Sort the countries by points
  const sortedCountries = Object.keys(pointsGiven).sort((a, b) => pointsGiven[b] - pointsGiven[a]);

  // Clear current ranking and repopulate
  rankingList.innerHTML = '';
  sortedCountries.forEach((country) => {
    let li = document.createElement('li');
    li.textContent = `${country} - ${pointsGiven[country]} points`;
    rankingList.appendChild(li);
  });
}

function updateDisplay() {
  // Update the countries and their points
  let pointsDisplay = document.getElementById("points");
  pointsDisplay.innerHTML = '';
  for (let country in pointsGiven) {
    let p = document.createElement('p');
    p.textContent = `${country}: ${pointsGiven[country]} points`;
    pointsDisplay.appendChild(p);
  }
}

// Undo Button functionality
const undoButton = document.getElementById("undo");
undoButton.addEventListener("click", undo);

function undo() {
  const lastCountry = Object.keys(pointsGiven).pop();
  if (lastCountry) {
    pointsGiven[lastCountry]--;
    if (pointsGiven[lastCountry] === 0) {
      delete pointsGiven[lastCountry];
    }
    updateRanking(lastCountry);
    updateDisplay();
    alert(`Undone points for ${lastCountry}.`);
  }
}

// Initialize page setup
window.onload = () => {
  createCountryList();
};
