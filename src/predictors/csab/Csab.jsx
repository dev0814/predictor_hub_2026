import React from 'react';
import GenericPredictor from '../shared/GenericPredictor';
import { CSAB_CONFIG } from './config';
import './Csab.css';

const Csab = () => {
  return <GenericPredictor config={CSAB_CONFIG} />;
};

export default Csab;
