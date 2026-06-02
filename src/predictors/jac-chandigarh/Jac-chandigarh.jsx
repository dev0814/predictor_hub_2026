import React from 'react';
import GenericPredictor from '../shared/GenericPredictor';
import { JAC_CHANDIGARH_CONFIG } from './config';

const JacChandigarh = ({ year }) => {
  return <GenericPredictor config={JAC_CHANDIGARH_CONFIG} year={year} />;
};

export default JacChandigarh;
