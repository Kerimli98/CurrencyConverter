import React from "react";

const CurrencyConverter2 = ({
  currencyList,
  currency,
  onCurrencyChange,
  onAmountChange,
  amount,
}) => {
  return (
    <div className="Converter">
      <input type="number" value={amount} onChange={onAmountChange} />
      <select value={currency} onChange={onCurrencyChange}>
        {currencyList.map((curr) => (
          <option id={curr}>{curr}</option>
        ))}
      </select>
    </div>
  );
};

export default CurrencyConverter2;
