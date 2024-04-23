import React, { useEffect, useState } from "react";
import axios from "axios"
import Combobox from "./component/Combobox";
import { Typography } from "antd";

function App() {
  const [fromVal, setFromVal] = useState()
  const [toVal, setToVal] = useState()
  const [countryList, setCountryList] = useState()
  const [fromCurrencyVal, setFromCurrencyVal] = useState();
  const [toCurrencyVal, setToCurrencyVal] = useState();

  // functionality to handle the change of currency origin
  const handleCurrencyChange = (name, e) => {
    const selectedValue = countryList?.data?.find(ele => ele.name.common === e)
    if(name === "from") {
      setFromVal(selectedValue)
      if(fromCurrencyVal && toVal) axios.get(`https://v6.exchangerate-api.com/v6/c658ae8c3056b5daaa95de6b/pair/${Object.keys(selectedValue?.currencies)}/${Object.keys(toVal?.currencies)}/${fromCurrencyVal}`).then(res => setToCurrencyVal(res.data.conversion_result?.toFixed(2) || 0))
    } else {
      setToVal(selectedValue)
      if(fromVal && fromCurrencyVal) axios.get(`https://v6.exchangerate-api.com/v6/c658ae8c3056b5daaa95de6b/pair/${Object.keys(fromVal?.currencies)}/${Object.keys(selectedValue?.currencies)}/${fromCurrencyVal}`).then(res => setToCurrencyVal(res.data.conversion_result?.toFixed(2) || 0))
    }
  }

  // functionality to handle the currency amount
  const handleCurrency = (name, e) => {
    const inpValue = e.target.value
    const regex = new RegExp("^[0-9]*$")
    if (!regex.test(inpValue)) return

    if(name === "from") {
      setFromCurrencyVal(inpValue ? inpValue[0] === "0" ? inpValue.substring(1) : inpValue  : "0")
      console.log(fromVal)
      if(toVal) {
        axios.get(`https://v6.exchangerate-api.com/v6/c658ae8c3056b5daaa95de6b/pair/${Object.keys(fromVal?.currencies)}/${Object.keys(toVal?.currencies)}/${e.target.value}`).then(res => setToCurrencyVal(res.data.conversion_result?.toFixed(2) || 0))
      }
    } else {
      setToCurrencyVal(e.target.value)
      if(fromVal) {
        axios.get(`https://v6.exchangerate-api.com/v6/c658ae8c3056b5daaa95de6b/pair/${Object.keys(fromVal?.currencies)}/${Object.keys(toVal?.currencies)}/${e.target.value}`).then(res => setFromCurrencyVal(res.data.conversion_result?.toFixed(2) || 0))
      }
    }
  }

  // getting the list of countries
  useEffect(() => {
    axios.get("https://restcountries.com/v3.1/all?fields=name,cca3,currencies,flags").then(repsonse => setCountryList(repsonse))
  }, [])

  return (
    <div className="container">
      <Typography.Title level={2}>Currency Converter</Typography.Title>
      <div className="converter-container">
        <Combobox value={fromVal} handleChange={handleCurrencyChange} countryList={countryList?.data} name="from" currencyVal={fromCurrencyVal} handleCurrency={handleCurrency} ignoreVal={toVal}/>
        <img height="50px" width="50px" src="/exchange.png" alt="Exchange icon"/>
        <Combobox value={toVal} handleChange={handleCurrencyChange} countryList={countryList?.data} name="to" currencyVal={toCurrencyVal} handleCurrency={handleCurrency} ignoreVal={fromVal}/>
      </div>
    </div>
  );
}

export default App;
