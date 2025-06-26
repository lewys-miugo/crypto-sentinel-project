const API_URL = "https://api.coinlore.net/api/tickers/";
const coinList = document.getElementById("coinList");
const refreshBtn = document.getElementById("refreshBtn");
const themeToggle = document.getElementById("themeToggle");
const filterRisk = document.getElementById("filterRisk");
const modal = document.getElementById("modal");
const modalBody = document.getElementById("modalBody");
const modalClose = document.getElementById("modalClose");

let allCoins = [];

// Fetch coins and render
async function fetchAndRenderCoins() {
  try {
    const response = await fetch(API_URL);
    const data = await response.json();
    allCoins = data.data;
    renderCoins(allCoins);
  } catch (error) {
    coinList.innerHTML = "<p>Error fetching data. Please try again later.</p>";
    console.error("Fetch error:", error);
  }
}

// Get risk level based on 24h & 7d % change
function getRiskLevel(coin) {
  const change24 = parseFloat(coin.percent_change_24h);
  const change7d = parseFloat(coin.percent_change_7d);

  if (Math.abs(change24) < 1 && Math.abs(change7d) < 2) {
    return "stable";
  } else if (Math.abs(change24) < 5 && Math.abs(change7d) < 8) {
    return "moderate";
  } else {
    return "high";
  }
}

// Render all coins
function renderCoins(coins) {
  coinList.innerHTML = "";

  coins.forEach((coin) => {
    const risk = getRiskLevel(coin);

    const card = document.createElement("div");
    card.className = `coin-card ${risk}`;
    card.innerHTML = `
      <h3>${coin.name} (${coin.symbol})</h3>
      <p>Price: $${Number(coin.price_usd).toLocaleString()}</p>
      <p>24h: ${coin.percent_change_24h}%</p>
      <p>7d: ${coin.percent_change_7d}%</p>
      <span class="risk-badge ${risk}">${risk[0].toUpperCase() + risk.slice(1)} Risk</span>
    `;

    
    coinList.appendChild(card);
  });
}

// Show modal with coin details

// Modal close


// Search functionality



// Filter by risk
filterRisk.addEventListener("change", (e) => {
    const risk = e.target.value;
  
    if (risk === "all") {
      renderCoins(allCoins);
    } else {
      const filtered = allCoins.filter((coin) => getRiskLevel(coin) === risk);
      renderCoins(filtered);
    }
  });
// Toggle theme
themeToggle.addEventListener("click", () => {
    document.body.classList.toggle("dark");
    document.body.classList.toggle("light");
  });
// Refresh data
refreshBtn.addEventListener("click", () => {
  fetchAndRenderCoins();
});

// Initial load
fetchAndRenderCoins();
