import React, { useState, useEffect } from "react";

const API_KEY = "pXF20RyT5tFpwT98qAdUxa2xVSmb4qXx";
const API_URL = (from, to, amount) =>
  `https://api.apilayer.com/fixer/convert?to=${to}&from=${from}&amount=${amount}`;

const CurrencyConverter = () => {
  const [baseCurrency, setBaseCurrency] = useState("EUR");
  const [targetCurrency, setTargetCurrency] = useState("USD");
  const [amount, setAmount] = useState(1);
  const [result, setResult] = useState(null);

  useEffect(() => {
    fetch(API_URL(baseCurrency, targetCurrency, amount), {
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
    <div>
      <input type="text" value={amount} onChange={handleAmountChange} />
      <select
        value={baseCurrency}
        onChange={(e) => setBaseCurrency(e.target.value)}
      >
        <option value="EUR">EUR</option>
        <option value="USD">USD</option>
        <option value="GBP">GBP</option>
        <option value="JPY">JPY</option>
      </select>
      <span>to</span>
      <select
        value={targetCurrency}
        onChange={(e) => setTargetCurrency(e.target.value)}
      >
        <option value="EUR">EUR</option>
        <option value="USD">USD</option>
        <option value="GBP">GBP</option>
        <option value="JPY">JPY</option>
      </select>
      <input type="text" value={result || ""} readOnly />
    </div>
  );
};

export default CurrencyConverter;
