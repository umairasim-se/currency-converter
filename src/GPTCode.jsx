import React, { useState, useEffect } from "react";
import "./css/main.css";

const API_KEY = "pXF20RyT5tFpwT98qAdUxa2xVSmb4qXx";
const SYMBOLS_URL = "https://api.apilayer.com/fixer/symbols";
const CONVERT_URL = (from, to, amount) =>
  `https://api.apilayer.com/fixer/convert?to=${to}&from=${from}&amount=${amount}`;

const CurrencyConverter = () => {
  const [symbols, setSymbols] = useState({});
  const [baseCurrency, setBaseCurrency] = useState("EUR");
  const [targetCurrency, setTargetCurrency] = useState("USD");
  const [amount, setAmount] = useState(1);
  const [result, setResult] = useState(null);

  useEffect(() => {
    fetch(SYMBOLS_URL, {
      headers: {
        apikey: API_KEY,
      },
    })
      .then((res) => res.json())
      .then((data) => {
        setSymbols(data.symbols);
      });
  }, []);

  useEffect(() => {
    fetch(CONVERT_URL(baseCurrency, targetCurrency, amount), {
      headers: {
        apikey: API_KEY,
      },
    })
      .then((res) => res.json())
      .then((data) => {
        setResult(data.result);
      });
  }, [baseCurrency, targetCurrency, amount]);

  const handleAmountChange = (event) => {
    setAmount(event.target.value);
  };

  return (
    <div className="currency-converter">
      <div className="input-group">
        <input
          type="text"
          value={amount}
          onChange={handleAmountChange}
          className="amount-input"
        />
        <select
          value={baseCurrency}
          onChange={(e) => setBaseCurrency(e.target.value)}
          className="currency-select"
        >
          {Object.keys(symbols).map((symbol) => (
            <option key={symbol} value={symbol}>
              {symbols[symbol]}
            </option>
          ))}
        </select>
      </div>
      <div className="to">to</div>
      <div className="input-group">
        <select
          value={targetCurrency}
          onChange={(e) => setTargetCurrency(e.target.value)}
          className="currency-select"
        >
          {Object.keys(symbols).map((symbol) => (
            <option key={symbol} value={symbol}>
              {symbols[symbol]}
            </option>
          ))}
        </select>
        <input
          type="text"
          value={result || ""}
          readOnly
          className="result-input"
        />
      </div>
    </div>
  );
};

export default CurrencyConverter;
