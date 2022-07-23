import React from "react";
import PropTypes from "prop-types";
const CurrencyConverter = ({
  currency,
  amount,
  currencies,
  handleInput,
  handleCurrency,
}) => {
  return (
    <div className="Converter">
      <input
        type="number"
        value={amount}
        onChange={(e) => handleInput(e.target.value)}
      />
      <select value={currency} onChange={(e) => handleCurrency(e.target.value)}>
        {currencies.map((curr) => {
          return (
            <option key={curr} value={curr}>
              {curr}
            </option>
          );
        })}
      </select>
      {/* <p>
        1{currency} is {amount}USD
      </p> */}
    </div>
  );
};

CurrencyConverter.propTypes = {
  amount: PropTypes.number.isRequired,
  currency: PropTypes.string.isRequired,
  currencies: PropTypes.array,
  handleInput: PropTypes.func,
  handleCurrency: PropTypes.func,
};
export default CurrencyConverter;
