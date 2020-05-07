import React from "react";

import ChantList from "./ChantList";
import FilterWidget from "./FilterWidget";
import FilterState from "./FilterState";

import { DSAGrid, DSAGridRow } from '../controls/DSAGrid';
import DSAInfoBox from '../controls/DSAInfoBox';

export default class ChantBook extends React.Component {

  state = {
    filter: new FilterState()
  };

  handleFavoriteChange = (name) => {
    this.setState(function(prevState) {
      var newFilter = prevState.filter;
      var newFavoriteChants = newFilter.favoriteChants;
      var i = newFavoriteChants.indexOf(name);
      if (i === -1)
        newFavoriteChants.push(name);
      else
        newFavoriteChants.splice(i, 1);
      newFilter.favoriteChants = newFavoriteChants;
      return {
        filter: newFilter
      };
    });
  }

  handleFavoriteInput = ()  => {
    this.setState(function(prevState) {
      let newFilter = prevState.filter;
      newFilter.favorite = !prevState.filter.favorite;
      return {
        filter: newFilter
      };
    });
  }

  handleSearchInput = (searchTerm) => {
    this.setState(function(prevState) {
      let newFilter = prevState.filter;
      newFilter.name = searchTerm;
      return {
        filter: newFilter
      };
    });
  }

  handlePropertiesInput = (propFilter) => {
    this.setState(function(prevState) {
      let newFilter = prevState.filter;
      let newProperties = newFilter.properties;
      for (let k in propFilter) {
        newProperties[k] = propFilter[k];
      }
      newFilter.properties = newProperties;
      return {
        filter: newFilter
      };
    });
  }

  handleClassInput = (usedClasses) => {
    this.setState(function(prevState) {
      let newFilter = prevState.filter;
      newFilter.chantClasses = usedClasses;
      return {
        filter: newFilter
      };
    });
  }

  render() {
    const chants = this.props.chants.filter(
      (chant) => { return !this.state.filter.filterChant(chant); }
    );
    return (
      <DSAGrid>
        <DSAGridRow>
          <DSAInfoBox
            title="Liturgien"
            text="Suche und Finde Liturgien aller Art">
            <FilterWidget
              filter={this.state.filter}
              chants={chants}
              onSearchInput={this.handleSearchInput}
              onClassInput={this.handleClassInput}
              onPropertiesInput={this.handlePropertiesInput}
              onFavoriteInput={this.handleFavoriteInput}
            />
          </DSAInfoBox>
        </DSAGridRow>
        <DSAGridRow>
          <ChantList
            chants={chants}
            favoriteChants={this.state.filter.favoriteChants}
            onFavoriteChange={this.handleFavoriteChange}/>
        </DSAGridRow>
      </DSAGrid>
    );
  }
}
