import React, { useEffect, useMemo, useState } from "react";
import axios from "axios"
import Combobox from "./component/Combobox";

function App() {
  const [fromVal, setFromVal] = useState()
  const [toVal, setToVal] = useState()
  const [countryList, setCountryList] = useState()
  const [fromCurrencyVal, setFromCurrencyVal] = useState();
  const [toCurrencyVal, setToCurrencyVal] = useState();

  const handleCurrencyChange = (name, e) => {
    name === "from" ? setFromVal(countryList?.data?.filter(ele => ele.name.common === e)) : setToVal(countryList?.data?.filter(ele => ele.name.common === e))
  }

  const handleCurrency = (name, e) => {
    const inpValue = e.target.value
    if(name === "from") {
      console.log(inpValue[0] === 0 ? inpValue.substring(1) : inpValue)
      setFromCurrencyVal(inpValue ? inpValue[0] == 0 ? inpValue.substring(1) : inpValue  : 0)
      console.log(fromVal)
      if(toVal) {
        axios.get(`https://v6.exchangerate-api.com/v6/c658ae8c3056b5daaa95de6b/pair/${Object.keys(fromVal[0]?.currencies)}/${Object.keys(toVal[0]?.currencies)}/${e.target.value}`).then(res => setToCurrencyVal(res.data.conversion_result || 0))
      }
    } else {
      setToCurrencyVal(e.target.value)
      if(fromVal) {
        axios.get(`https://v6.exchangerate-api.com/v6/c658ae8c3056b5daaa95de6b/pair/${Object.keys(fromVal[0]?.currencies)}/${Object.keys(toVal[0]?.currencies)}/${e.target.value}`).then(res => setFromCurrencyVal(res.data.conversion_result || 0))
      }
    }
  }

  useEffect(() => {
    axios.get("https://restcountries.com/v3.1/all?fields=name,cca3,currencies,flags").then(repsonse => setCountryList(repsonse))
  }, [])

  useEffect(() => {
    console.log(countryList?.data?.map(ele => Object.keys(ele.currencies)))
    console.log(fromVal)
    // console.log(countryList?.data.filter(ele => ele !== fromVal))
  }, [fromVal])


  return (
    <div className="App">
      <Combobox value={fromVal} handleChange={handleCurrencyChange} countryList={countryList?.data} name="from" currencyVal={fromCurrencyVal} handleCurrency={handleCurrency} ignoreVal={toVal}/>
      <Combobox value={toVal} handleChange={handleCurrencyChange} countryList={countryList?.data} name="to" currencyVal={toCurrencyVal} handleCurrency={handleCurrency} ignoreVal={fromVal}/>
    </div>
  );
}

export default App;
