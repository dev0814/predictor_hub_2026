import React from 'react';
import GenericPredictor from '../shared/GenericPredictor';
import { AKTU_CONFIG } from './config';
import './Aktu.css';

const Aktu = ({ year }) => {
  return <GenericPredictor config={AKTU_CONFIG} year={year} />;
};

export default Aktu;
