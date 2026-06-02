import React from 'react';
import GenericPredictor from '../shared/GenericPredictor';
import { HBTU_CONFIG } from './config';
import './Hbtu.css';

const Hbtu = ({ year }) => {
  return <GenericPredictor config={HBTU_CONFIG} year={year} />;
};

export default Hbtu;
