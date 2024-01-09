import React, { useState } from 'react';
import { View, TextInput, Button, StyleSheet } from 'react-native';

const StockSearch = ({ setStockSymbol }) => {
  const [input, setInput] = useState('');

  const handleSearch = () => {
    setStockSymbol(input.toUpperCase());
  };

  return (
    <View style={styles.container}>
      <TextInput
        style={styles.input}
        value={input}
        onChangeText={(text) => setInput(text)}
        placeholder="Enter stock symbol (e.g., AAPL)"
      />
      <Button title="Search" onPress={handleSearch} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
  },
  input: {
    flex: 1,
    marginRight: 8,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 4,
    padding: 8,
  },
});

export default StockSearch;
