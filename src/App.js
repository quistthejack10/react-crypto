import React, {useState, useEffect} from 'react';
import './App.css';
import Coin from './Coin';
import axios from 'axios';


function App() {

  const [coins, setCoins] = useState([]);
  const [search, setSearch] = useState('');

  useEffect(() => {
    axios.get('https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=10&page=1&sparkline=false')
    .then(res => {
      setCoins(res.data);
      console.log(res.data);
    })
    .catch(error => console.log(error));
  }, []);

  const handleChange = e => {
    setSearch(e.target.value);
  };

  const filteredCoins = coins.filter(coin => 
    coin.name.toLowerCase().includes(search.toLowerCase())
    );
  


  return (
    <div className="coin-app">
      <div className="coin-search">
        <h1 className="coin-text">Search a crypto</h1>
        <form>
          <input
            className="coin-input"
            type="text"
            onChange={handleChange}
            placeholder="search"
          />
        </form>
        </div>
        {filteredCoins.map(coin => {
          return(
            <Coin
            key={coin.id}
            name={coin.name}
            price={coin.price}
            symbol={coin.symbol}
            marketcap={coin.market_cap}
            volume={coin.total_volume}
            priceChange={coin.price_change_percentage_24h}
            />
          )
        })}
    </div>
  );
}

export default App;
