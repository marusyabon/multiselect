import React from "react";
import Select from "react-select"

export function CustomSelect(options, onChange) {
  const colourStyles = {
    option: (styles, { data }) => ({
        ...styles,
        backgroundColor: data.isSelected ? "#96d1fb" : "#fff",
      })
  };

  return (<Select
    isMulti
    value = { null }
    options = { options }
    onChange = { (val) => onChange(val) }
    styles = { colourStyles }
    className = "select"
  />)
}
