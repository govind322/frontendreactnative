import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, ActivityIndicator } from 'react-native';
import { fetchStockData } from '../api/stockAPI';
import StockChart from './StockChart';
import StockSearch from './StockSearch';
import VolumeChart from './VolumeChart';

const StockDashboard = () => {
  const [stockSymbol, setStockSymbol] = useState('AAPL'); // Default stock symbol
  const [stockData, setStockData] = useState(null); // State for storing stock data
  const [loading, setLoading] = useState(false); // State to manage loading status

  useEffect(() => {
    const loadData = async () => {
      setLoading(true); // Start loading
      try {
        const data = await fetchStockData(stockSymbol);
        setStockData(data); // Set stock data
      } catch (error) {
        console.error('Could not fetch stock data:', error);
        setStockData([]); // Set empty data on error
      }
      setLoading(false); // Stop loading
    };

    loadData();
  }, [stockSymbol]); // Effect runs when stockSymbol changes

  return (
    <View style={styles.stockDashboard}>
      <Text style={styles.title}>Stock Market Dashboard</Text>
      <StockSearch setStockSymbol={setStockSymbol} />
      {loading ? (
        <ActivityIndicator style={styles.loadingIndicator} />
      ) : stockData && stockData.length > 0 ? (
        <>
          <StockChart data={stockData} symbol={stockSymbol} />
          <VolumeChart data={stockData} symbol={stockSymbol} />
        </>
      ) : (
        <Text style={styles.noDataText}>No data available for the selected stock symbol.</Text>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  stockDashboard: {
    flex: 1,
    padding: 16,
    backgroundColor: '#fff',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 16,
  },
  loadingIndicator: {
    marginTop: 16,
  },
  noDataText: {
    marginTop: 16,
    fontStyle: 'italic',
    color: '#888',
  },
});

export default StockDashboard;
