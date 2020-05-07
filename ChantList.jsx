import React from "react";
import Chant from './Chant';

import { DSAGrid, DSAGridRow, DSAGridItem} from '../controls/DSAGrid';
import DSAInfoBox from '../controls/DSAInfoBox';

function ChantListMetaInfo(num_spells) {
  const text = <span> Es wurden <strong>{num_spells + " Liturgien"}</strong> gefunden </span>
  return (
    <DSAInfoBox text={text} />
  );
}

function createChant(chant, id, favoriteChants, onFavoriteChange) {
  const {name, chantclass, properties, chantextensions} = chant;
  return (
    <DSAGridItem xs={12} sm={6} md={4} lg={4} key={id}>
      <Chant
        name={name}
        chantclass={chantclass}
        properties={properties}
        extensions={chantextensions}
        onUserInput={onFavoriteChange}
        favorites={favoriteChants}
      />
    </DSAGridItem>
  );
}

export default function ChantList(props) {
  const {onFavoriteChange, favoriteChants, chants} = props;
  const mappedchants = chants.map((s, id) => {
    return createChant(s, id, favoriteChants, onFavoriteChange);
  })
  return (
    <DSAGrid>
      <DSAGridRow>
        {ChantListMetaInfo(chants.length)}
      </DSAGridRow>
      {mappedchants}
    </DSAGrid>
  );
}
