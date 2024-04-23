import React, { useEffect } from "react";
import { Input, Select } from "antd";

function Combobox(props) {
    const { name, countryList, handleChange, value, ignoreVal, currencyVal, handleCurrency } = props

    useEffect(() => {
      console.log(value && Object.values(value[0]?.currencies)[0].symbol)
    }, [value])

    return (
      <div>
        <Select size="large" onChange={e => handleChange(name, e)} showSearch value={value?.name?.common} placeholder="Select currency">
          {countryList?.filter(val => val !== ignoreVal).map(ele => {
            return (
              <Select.Option key={ele.name.common} value={ele.name.common}>
                <img height="20px" width="20px" src={ele.flags.svg} alt={ele.flags.alt}/>
                {ele.cca3}
              </Select.Option>
            )
          })}
        </Select>
        <Input value={currencyVal} onChange={(e) => handleCurrency(name, e)} placeholder="Enter Amount" prefix={<span>{value && Object.keys(value[0]?.currencies)} : {value && Object.values(value[0]?.currencies)[0].symbol}</span>}/>
      </div>
    )
}

export default Combobox