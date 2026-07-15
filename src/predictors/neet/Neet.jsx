
import React from 'react';
import GenericPredictor from '../shared/GenericPredictor';
import { NEET_CONFIG } from './config';

const Neet = ({ year }) => {
  return <GenericPredictor config={NEET_CONFIG} year={year} />;
};

export default Neet;
