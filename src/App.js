import { useState } from 'react';
import './App.css';
import happy from "./images/happy.jpg"

function App() {
  const [purchase, setPurchase] = useState("")
  const [stocks, setStocks] = useState("")
  const [current, setCurrent] = useState("")
  const [msg, setMsg] = useState("")
  const [changepercent, setChangePercent] = useState(0)

  const shadowgreen =  "rgb(148, 255, 148)"
  const shadowred =  "rgb(255, 148, 148)"
  const shadowblue =  "rgb(148, 148, 255)"

  function calcpnl(event) {
    event.preventDefault();
    let pnl = (current - purchase)*stocks;
    let change = (current - purchase)*100/purchase;
    setChangePercent(change);
    pnl > 0 ? setMsg(`Yay!!! Your stocks shot up by ${change}%⬆ and you made a profit of ₹${pnl} 🥳`) :
    pnl < 0 ? setMsg(`Oops!!! Your stocks fell down by ${change}%⬇ and you made a loss of ₹${Math.abs(pnl)} 😔`) : setMsg("Didn't lose or gain 😐")
  }

  return (
    <div className="App">
      <header
        style={
          changepercent > 50 ? {backgroundColor: "rgb(0, 128, 0)"} : 
          changepercent < -50 ? {backgroundColor: "rgb(128, 0, 0)"} : {backgroundColor: "rgb(0, 0, 128)"}
      }
      >
        <h1>Check P&L on your stock</h1>
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100" preserveAspectRatio="none">
          <polygon fill="white" points="0,100 100,0 100,100"/>
        </svg>
      </header>

      <div className="container">
        <div 
          className="card"
          style={
            changepercent > 50 ? {backgroundColor: "palegreen", boxShadow: `2px 2px 40px ${shadowgreen}`} : 
            changepercent < -50 ? {backgroundColor: "#fb9898", boxShadow: `2px 2px 40px ${shadowred}`} : 
            {backgroundColor: "#9afdfd", boxShadow: `2px 2px 40px ${shadowblue}`}
          }
        >
          <form onSubmit={calcpnl}>
            <span>Purchase Price : </span>
            <input
              type="number"
              placeholder="price of stock then"
              onChange={(event) => setPurchase(event.target.value)}
              value={purchase}
              min="0.001"
              step="any"
              required
            />
            <br/>
            <span>Stock Quantity : </span>
            <input
              type="number"
              placeholder="no of stocks bought"
              onChange={(event) => setStocks(event.target.value)}
              value={stocks}
              min="0.001"
              step="any"
              required
            />
            <br/>
            <span>Current Price : </span>
            <input
              type="number"
              placeholder="curr price of stock"
              onChange={(event) => setCurrent(event.target.value)}
              value={current}
              min="0.001"
              step="any"
              required
            />
            <br/>
            <button type="submit">Check</button>
          </form>
          { msg !== "" && 
            <div className="output">
              <p>{msg}</p>
            </div>
          }
        </div>
      </div> 
    </div>
  );
}

export default App;
