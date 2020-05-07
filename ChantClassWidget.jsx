import React from "react";

import {DSAChantClasses} from "../data/DSAChantClasses";
import DSASelect from '../controls/DSASelect';


export default function ChantClassWidget(props) {

  let handleChange = (val) => {
    if(val)
      props.onUserInput(val.map( x => x.value));
    else
      props.onUserInput([]);
  }

  const {classes} = props;
  const options = Object.keys(DSAChantClasses.ChantClasses).map(
    (m) => {return {value: m, label: m};});

  return <DSASelect
      multi={true}
      options={options}
      value={classes}
      label="Kategorie"
      onChange={(v) => handleChange(v)}
    />
}
