#  CryptoSentinel – Real-Time Crypto Risk Monitor

CryptoSentinel is a **single-page web application (SPA)** that helps users **monitor and evaluate the risk level** of top cryptocurrencies in real time. It provides a clean, interactive dashboard that classifies coins into **Stable**, **Moderately Volatile**, or **High Risk** categories based on live price change data from the [CoinLore API](https://www.coinlore.com/).

---

## Features

-  **Live Crypto Dashboard**: Displays the top 50 cryptocurrencies with live data (price, % change, market cap, etc.).
-  **Risk Classification**: Classifies each coin as Stable, Moderate, or High Risk based on 24h and 7d percentage changes.
-  **Search Functionality**: Quickly find a cryptocurrency by name or symbol.
-  **Favorite Functionality**: One can favorite and remove from favorite his favorites coins.
-  **Filter by Risk Level & Favorites**: Filter the coin list based on risk classification.
-  **Dark/Light Theme Toggle**: Switch between light and dark UI modes.
-  **Coin Detail Modal**: Click a coin card to view more in-depth statistics.
-  **Manual Data Refresh**: Fetches fresh live data at any time.

---

## Technologies Used

- **HTML5** – Markup structure
- **CSS3** – Styling and theming (light/dark mode)
- **JavaScript (ES6+)** – Logic, DOM manipulation, API interaction
- **CoinLore API** – Real-time cryptocurrency data (no API key required)

---

## 🧠 Risk Classification Logic

Each coin is evaluated and labeled based on its recent price volatility:

| Risk Level        | Conditions |
|------------------|------------|
| **Stable**        | 24h change < ±1% and 7d change < ±2% |
| **Moderate**      | 24h change < ±5% and 7d change < ±8% |
| **High Risk**     | Anything exceeding the above thresholds |

Visual badges and border colors indicate risk at a glance.

---
![Image showing a preview of the UI](./assets/images/Screenshot%20from%202025-06-26%2007-40-48.png)

## Getting Started

### Prerequisites

- A modern browser (Chrome, Firefox, Edge, etc.)
- Internet connection (to fetch live API data)

### To Run Locally

1. Clone this repository:
   ```bash
   git clone git@github.com:lewys-miugo/crypto-sentinel-project.git
   ```

2. Open the folder
    ```
    cd crypto-sentinel-project
    ```

3. start json-server
    ```
    json-server --watch db.json 
    ```

4. Launch index.html in the browser

## Author
Lewis Wambugu
Email: lewiswambugu01@gmail.com

## License
This project is open-source and available under the [MIT License](https://opensource.org/license/mit).

## Live Demo
Coming soon: