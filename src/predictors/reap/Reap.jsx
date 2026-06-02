import React from 'react';
import GenericPredictor from '../shared/GenericPredictor';
import { REAP_CONFIG } from './config';

const Reap = ({ year }) => {
  return <GenericPredictor config={REAP_CONFIG} year={year} />;
};

export default Reap;
