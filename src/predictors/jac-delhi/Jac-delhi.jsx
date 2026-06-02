import React from 'react';
import GenericPredictor from '../shared/GenericPredictor';
import { JAC_DELHI_CONFIG } from './config';
import './Jac-delhi.css';

const Jacdelhi = ({ year }) => {
  return <GenericPredictor config={JAC_DELHI_CONFIG} year={year} />;
};

export default Jacdelhi;
