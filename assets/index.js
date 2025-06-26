const API_URL = "https://api.coinlore.net/api/tickers/";
const coinList = document.getElementById("coinList");
const searchInput = document.getElementById("searchInput");
const refreshBtn = document.getElementById("refreshBtn");
const themeToggle = document.getElementById("themeToggle");
const filterRisk = document.getElementById("filterRisk");
const modal = document.getElementById("modal");
const modalBody = document.getElementById("modalBody");
const modalClose = document.getElementById("modalClose");
const JSON_SERVER_URL = "http://localhost:3000/favorites";


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
async function renderCoins(coins) {
    coinList.innerHTML = "";
    const favoriteIds = await getFavoriteIds();
  
    coins.forEach((coin) => {
      const risk = getRiskLevel(coin);
      const isFavorited = favoriteIds.includes(coin.id.toString());
  
      const card = document.createElement("div");
      card.className = `coin-card ${risk}`;
      card.innerHTML = `
        <div class="coin-header">
          <h3>${coin.name} (${coin.symbol})</h3>
          <span class="star ${isFavorited ? "favorited" : ""}" data-id="${coin.id}">&#9733;</span>
        </div>
        <p>Price: $${Number(coin.price_usd).toLocaleString()}</p>
        <p>24h: ${coin.percent_change_24h}%</p>
        <p>7d: ${coin.percent_change_7d}%</p>
        <span class="risk-badge ${risk}">${risk[0].toUpperCase() + risk.slice(1)} Risk</span>
      `;
  
      // Modal on click
      card.addEventListener("click", (e) => {
        if (!e.target.classList.contains("star")) {
          showCoinDetails(coin, risk);
        }
      });
  
      // Favorite toggle
      card.querySelector(".star").addEventListener("click", async (e) => {
        e.stopPropagation(); // prevent modal
        if (isFavorited) {
          await removeFavorite(coin.id);
        } else {
          await addFavorite(coin.id);
        }
        fetchAndRenderCoins();
      });
  
      coinList.appendChild(card);
    });
  }
  

// Show modal with coin details
function showCoinDetails(coin, risk) {
    modalBody.innerHTML = `
      <h2>${coin.name} (${coin.symbol})</h2>
      <p><strong>Rank:</strong> ${coin.rank}</p>
      <p><strong>Price (USD):</strong> $${Number(coin.price_usd).toLocaleString()}</p>
      <p><strong>Price (BTC):</strong> ${coin.price_btc}</p>
      <p><strong>Market Cap:</strong> $${Number(coin.market_cap_usd).toLocaleString()}</p>
      <p><strong>24h Change:</strong> ${coin.percent_change_24h}%</p>
      <p><strong>7d Change:</strong> ${coin.percent_change_7d}%</p>
      <p><strong>Circulating Supply:</strong> ${Number(coin.csupply).toLocaleString()}</p>
      <p><strong>Total Supply:</strong> ${coin.tsupply}</p>
      <p><strong>Max Supply:</strong> ${coin.msupply || 'N/A'}</p>
      <p><strong>Volume (24h):</strong> $${Number(coin.volume24).toLocaleString()}</p>
      <p><strong>Risk Level:</strong> <span class="risk-badge ${risk}">${risk.toUpperCase()}</span></p>
    `;
    modal.classList.remove("hidden");
  }

// Modal close
modalClose.addEventListener("click", () => {
    modal.classList.add("hidden");
  });
  
  window.addEventListener("click", (e) => {
    if (e.target === modal) {
      modal.classList.add("hidden");
    }
  });

// Fetch favorites
async function getFavoriteIds() {
const res = await fetch(JSON_SERVER_URL);
const data = await res.json();
return data.map((item) => item.id.toString());
}

// Add favorites
async function addFavorite(coinId) {
await fetch(JSON_SERVER_URL, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ id: coinId.toString() }),
});
}

// Remove favorites
async function removeFavorite(coinId) {
const res = await fetch(`${JSON_SERVER_URL}?id=${coinId}`);
const data = await res.json();
if (data.length > 0) {
    await fetch(`${JSON_SERVER_URL}/${data[0].id}`, {
    method: "DELETE",
    });
}
}
  
// Search functionality
searchInput.addEventListener("input", (e) => {
    const term = e.target.value.toLowerCase();
    const filtered = allCoins.filter((coin) =>
      coin.name.toLowerCase().includes(term) || coin.symbol.toLowerCase().includes(term)
    );
    renderCoins(filtered);
  });

// Filter by risk & favorites
filterRisk.addEventListener("change", async (e) => {
    const risk = e.target.value;
  
    if (risk === "all") {
      renderCoins(allCoins);
    } else if (risk === "favorites") {
      const favIds = await getFavoriteIds();
      const filtered = allCoins.filter((coin) => favIds.includes(coin.id.toString()));
      renderCoins(filtered);
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
