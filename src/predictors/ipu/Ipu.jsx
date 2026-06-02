import React from 'react';
import GenericPredictor from '../shared/GenericPredictor';
import { IPU_CONFIG } from './config';

const Ipu = ({ year }) => {
  return <GenericPredictor config={IPU_CONFIG} year={year} />;
};

export default Ipu;
