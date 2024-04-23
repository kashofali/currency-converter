import React from "react";
import { Input, Select } from "antd";

function Combobox(props) {
    const { name, countryList, handleChange, value, currencyVal, handleCurrency } = props

    return (
      <div className="combobox">
        <Select size="large" onChange={e => handleChange(name, e)} showSearch value={value?.name?.common} placeholder="Select currency" title={value?.name?.common}>
          {countryList?.map(ele => {
            return (
              <Select.Option className="combobox-dropdown" key={ele.name.common} value={ele.name.common} title={ele.name.common}>
                <img height="20px" width="20px" src={ele.flags.svg} alt={ele.flags.alt}/>
                <span>{ele.cca3}</span>
              </Select.Option>
            )
          })}
        </Select>
        <Input className="amount-input" style={{"paddingLeft": value ? "0" : "14px" }} disabled={!value} value={currencyVal} onChange={(e) => handleCurrency(name, e)} placeholder="Enter Amount" size="large" prefix={value && <span className="currency-name">{value && Object.keys(value?.currencies)} {value && Object.values(value?.currencies)[0].symbol}</span>}/>
      </div>
    )
}

export default Combobox