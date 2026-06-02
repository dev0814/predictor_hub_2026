import React from 'react';
import GenericPredictor from '../shared/GenericPredictor';
import { PTU_CONFIG } from './config';

const Ptu = ({ year }) => {
  return <GenericPredictor config={PTU_CONFIG} year={year} />;
};

export default Ptu;
