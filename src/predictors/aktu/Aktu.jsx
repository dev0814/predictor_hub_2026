import React from 'react';
import GenericPredictor from '../shared/GenericPredictor';
import { AKTU_CONFIG } from './config';
import './Aktu.css';

const Aktu = () => {
  return <GenericPredictor config={AKTU_CONFIG} />;
};

export default Aktu;
