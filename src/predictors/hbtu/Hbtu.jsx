import React from 'react';
import GenericPredictor from '../shared/GenericPredictor';
import { HBTU_CONFIG } from './config';
import './Hbtu.css';

const Hbtu = () => {
  return <GenericPredictor config={HBTU_CONFIG} />;
};

export default Hbtu;
