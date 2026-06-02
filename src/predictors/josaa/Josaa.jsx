import React from 'react';
import GenericPredictor from '../shared/GenericPredictor';
import { JOSAA_CONFIG } from './config';
import './Josaa.css';

const Josaa = ({ year }) => {
  return <GenericPredictor config={JOSAA_CONFIG} year={year} />;
};

export default Josaa;
