import React from "react";
import LazyLoad from 'react-lazyload';

import DSALink from '../controls/DSALink';
import DSAInfoBox from '../controls/DSAInfoBox';
import FavoriteStar from '../controls/DSAFavoriteStar';

import ChantProperties from './ChantProperties';
import ChantExtensions from "./ChantExtensions";

import {DSAChantClasses} from "../data/DSAChantClasses";

const ChantMetaInfo = ({chantclass}) => {
  const link = DSAChantClasses.link + DSAChantClasses.ChantClasses[chantclass].link;
  let tooltip = chantclass + " im Regelwiki";
  return (
    <DSALink tooltip={tooltip} href={link}>{chantclass}</DSALink>
  );
}

const ChantTitle = ({favorites, name, onUserInput}) => {
  const fav = (favorites.indexOf(name) >= 0);
  const handleFavClick = () => {
    onUserInput(name);
  }

  return <span>
    {name}
    <FavoriteStar fav={fav} onClick={handleFavClick} />
  </span>;
}

export default function Chant(props) {
  const title = <ChantTitle {...props}/>
  return <LazyLoad height={200} once >
      <DSAInfoBox
        title={title}
        text={<ChantMetaInfo chantclass={props.chantclass}/>}
      >
        <ChantProperties properties={props.properties} />
        {props.extensions ? <ChantExtensions extensions={props.extensions} /> : ""}
      </DSAInfoBox>
    </LazyLoad>
}
