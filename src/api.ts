export function fetchCoins() {
    return fetch("https://api.coinpaprika.com/v1/coins").then(response => response.json());
}

// Coin.tsx 
export async function fetchCoinInfo(coinId : string){
    const response = await fetch(`https://api.coinpaprika.com/v1/coins/${coinId}`);
    const infoData = await response.json();
    return infoData;
}


export async function fetchCoinTickers(coinId : string){
    const priceData = await (await fetch(`https://api.coinpaprika.com/v1/tickers/${coinId}`)).json();
    return priceData;
}


// Chart.tsx
export function fetchCoinHistory(coinId: string){
    const endDate = Math.floor(Date.now() / 1000);   
    const startDate = endDate - 60*60*24*7*2;         
    return fetch(`https://api.coinpaprika.com/v1/coins/${coinId}/ohlcv/historical?start=${startDate}&end=${endDate}`).then(
        response => response.json());
}



//Price.tsx
export async function fetchCoinToday(coinId: string){
    const todayData = await (await fetch(`https://api.coinpaprika.com/v1/coins/${coinId}/ohlcv/today/`)).json();
    return todayData;
}