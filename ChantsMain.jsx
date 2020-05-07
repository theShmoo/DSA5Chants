import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';

import ChantBook from './ChantBook';

import {DSAChants} from "../data/DSAChants";

const styles = {
  root: {
    flexGrow: 1,
  }
};

function sortChants(chants) {
  return chants.sort((a,b) => {
    if(a.name < b.name) return -1;
    if(a.name > b.name) return 1;
    return 0;
  });
}

function ChantsMain(props) {
  return <main className={props.classes.root}>
        <ChantBook chants={sortChants(DSAChants)}/>
    </main>
}

ChantsMain.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(ChantsMain);
