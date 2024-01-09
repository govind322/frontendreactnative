import React, {useEffect} from 'react';
import {View, Text} from 'react-native';

const API_KEY = 'pk_d510c531b8fb4037bd83bb0ca73f59ce';
const BASE_URL = 'https://api.iex.cloud/v1/data/CORE';

export const fetchStockData = async symbol => {
  try {
    const response = await fetch(
      `${BASE_URL}/HISTORICAL_PRICES/${symbol}?token=${API_KEY}`,
    );
    console.log(response);
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    const data = await response.json();
    return data;
  } catch (error) {
    console.log(error);
    console.error('Could not fetch stock data:', error);
  }
};
