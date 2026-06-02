import React from 'react';
import GenericPredictor from '../shared/GenericPredictor';
import { MPDTE_CONFIG } from './config';

const Mpdte = ({ year }) => {
  return <GenericPredictor config={MPDTE_CONFIG} year={year} />;
};

export default Mpdte;
