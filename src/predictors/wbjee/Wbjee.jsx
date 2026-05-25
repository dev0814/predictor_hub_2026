import React from 'react';
import GenericPredictor from '../shared/GenericPredictor';
import { WBJEE_CONFIG } from './config';
import './Wbjee.css';

const Wbjee = () => {
  return <GenericPredictor config={WBJEE_CONFIG} />;
};

export default Wbjee;
