import React from 'react';
import { View, Text } from 'react-native';
import { LineChart } from 'react-native-chart-kit';

const VolumeChart = ({ data, symbol }) => {
  // Map the historical price data to the chartData object
  const chartData = {
    labels: data?.map((point) => point.date), // Use the date for labels
    datasets: [
      {
        data: data?.map((point) => point.volume), // Use the trading volume for data points
        color: (opacity = 1) => `rgba(53, 162, 235, ${opacity})`,
        strokeWidth: 2,
      },
    ],
  };

  const chartConfig = {
    backgroundGradientFrom: '#ffffff',
    backgroundGradientTo: '#ffffff',
    color: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
    strokeWidth: 2, // optional, default is 3
    barPercentage: 0.5,
    useShadowColorFromDataset: false, // optional
  };

  return (
    <View style={{ marginVertical: 16 }}>
      <Text style={{ fontSize: 18, fontWeight: 'bold', marginBottom: 8 }}>{`${symbol} Trading Volume`}</Text>
      <LineChart
        data={chartData}
        width={300} // Adjust width as needed
        height={200} // Adjust height as needed
        chartConfig={chartConfig}
      />
    </View>
  );
};

export default VolumeChart;
