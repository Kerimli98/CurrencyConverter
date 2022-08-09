import { useEffect, useState } from "react";
import "./App.css";
import api from "./api";
// import CurrencyConverter from "./CurrencyConverter";
import CurrencyConverter2 from "./CurrencyConverter2";
// VBO6WBLXWgUyTzA8mZ1jQaUfGAawmSs1   --api key
function App() {
  //*********** --first method-- --easy-- **************
  // const [rates, setRates] = useState([]);
  // const [currency1, setCurrency1] = useState("USD");
  // const [currency2, setCurrency2] = useState("USD");
  // const [amount1, setAmount1] = useState(1);
  // const [amount2, setAmount2] = useState(1);

  // useEffect(() => {
  //   const getRates = async () => {
  //     const response = await api.get(
  //       "/live?api_key=4de8ec2fd44c4c6d906239c1c587764f&base=EUR"
  //     );
  //     setRates(response.data.exchange_rates);
  //   };
  //   getRates();
  // }, []);

  // useEffect(() => {
  //   if (!!rates) {
  //     function init() {
  //       handleInput1(1);
  //     }
  //     init();
  //   }
  // }, [rates]);
  // function format(number) {
  //   return number.toFixed(2);
  // }
  // const handleInput1 = (amount1) => {
  //   setAmount1(amount1);
  //   setAmount2(format((amount1 * rates[currency2]) / rates[currency1]));
  // };
  // const handleInput2 = (amount2) => {
  //   setAmount2(amount2);
  //   setAmount1(format((amount2 * rates[currency1]) / rates[currency2]));
  // };

  // const handleCurrency1 = (currency1) => {
  //   setCurrency1(currency1);
  //   setAmount2(format((amount1 * rates[currency2]) / rates[currency1]));
  // };
  // const handleCurrency2 = (currency2) => {
  //   setCurrency2(currency2);
  //   setAmount1(format((amount2 * rates[currency1]) / rates[currency2]));
  // };
  // ___________________________________________________________________________________________________________
  // second method --accurate--
  const [currencyList, setCurrencyList] = useState([]);
  const [fromCurrency, setFromCurrency] = useState();
  const [toCurrency, setToCurrency] = useState();
  const [amount, setAmount] = useState(1);
  const [amountInFromCurrency, setAmountInFromCurrency] = useState(true);
  const [exchangeRate, setExchangeRate] = useState();

  //this one is for getting the currency options list
  useEffect(() => {
    const getRates = async () => {
      const response = await api.get(
        "/live?api_key=4de8ec2fd44c4c6d906239c1c587764f&base=EUR"
      );
      setCurrencyList([
        response.data.base,
        ...Object.keys(response.data.exchange_rates),
      ]);
      let firstcurrency = Object.keys(response.data.exchange_rates)[0];
      setFromCurrency(response.data.base);
      setToCurrency(firstcurrency);
      setExchangeRate(response.data.exchange_rates[firstcurrency]);
    };
    getRates();
  }, []);
  //this one is for updating the amount values according to the change of currencies
  useEffect(() => {
    if (fromCurrency === toCurrency && fromCurrency != null) {
      setExchangeRate(1);
    } else if (fromCurrency != null && toCurrency != null) {
      const getRates2 = async () => {
        const res = await api.get(
          `/live?api_key=4de8ec2fd44c4c6d906239c1c587764f&base=${fromCurrency}&target=${toCurrency}`
        );
        setExchangeRate(res.data.exchange_rates[toCurrency]);
      };
      getRates2();
    }
  }, [fromCurrency, toCurrency]);

  let toAmount, fromAmount;
  if (amountInFromCurrency) {
    fromAmount = amount;
    toAmount = amount * exchangeRate || 0;
  } else {
    toAmount = amount;
    fromAmount = amount / exchangeRate;
  }

  function handleFromAmount(e) {
    setAmount(e.target.value);
    setAmountInFromCurrency(true);
  }
  function handleToAmount(e) {
    setAmount(e.target.value);
    setAmountInFromCurrency(false);
  }
  return (
    <div className="App">
      <h1>Currency Converter</h1>
      {/* first method --easy-way-- */}
      {/* <CurrencyConverter
        handleCurrency={handleCurrency1}
        handleInput={handleInput1}
        currencies={Object.keys(rates)}
        amount={amount1}
        currency={currency1}
      />
      <CurrencyConverter
        handleCurrency={handleCurrency2}
        handleInput={handleInput2}
        currencies={Object.keys(rates)}
        amount={amount2}
        currency={currency2}
      /> */}

      {/* second method --accurate-way-- */}
      <CurrencyConverter2
        amount={fromAmount}
        onCurrencyChange={(e) => setFromCurrency(e.target.value)}
        onAmountChange={handleFromAmount}
        currency={fromCurrency}
        currencyList={currencyList}
      />
      <CurrencyConverter2
        amount={toAmount}
        onCurrencyChange={(e) => setToCurrency(e.target.value)}
        onAmountChange={handleToAmount}
        currency={toCurrency}
        currencyList={currencyList}
      />
    </div>
  );
}

export default App;
