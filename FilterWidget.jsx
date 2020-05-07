import React from "react";

import ChantClassWidget from "./ChantClassWidget";

import { DSAGrid, DSAGridItem} from '../controls/DSAGrid';
import FilterFavoriteWidget from "../controls/DSAFilterFavoriteWidget";
import FilterPropertiesWidget from "../controls/DSAFilterPropertiesWidget";

import {DSAChantClasses} from "../data/DSAChantClasses";

import DSASearchField from '../controls/DSASearchField';

const SearchWidget = ({name, onUserInput}) => {
  return <DSASearchField
    value={name}
    label="Suche"
    helperText="Suche nach Liturgien."
    onChange={(v) => onUserInput(v, "names")} />
};



export default function FilterWidget(props) {
    const {chants,
      filter,
      onSearchInput,
      onPropertiesInput,
      onClassInput,
      onFavoriteInput} = props;
    const {properties, chantClasses, favorite, name} = filter;
    const d = "Verbreitung" in properties ? properties["Verbreitung"] : [];

    return <DSAGrid>
        <DSAGridItem lg={3} md={6} sm={12} xs={12}>
          <SearchWidget name={name} chants={chants} onUserInput={onSearchInput}/>
        </DSAGridItem>
        <DSAGridItem lg={3} md={6} sm={12} xs={12}>
          <ChantClassWidget classes={chantClasses} onUserInput={onClassInput} />
        </DSAGridItem>
        <DSAGridItem lg={3} md={6} sm={12} xs={12}>
          <FilterPropertiesWidget
            selected={d}
            properties={DSAChantClasses["Verbreitung"]}
            property="Verbreitung"
            onUserInput={onPropertiesInput}
          />
        </DSAGridItem>
        <DSAGridItem>
          <FilterFavoriteWidget favorite={favorite} onUserInput={onFavoriteInput}/>
        </DSAGridItem>
      </DSAGrid>
};
