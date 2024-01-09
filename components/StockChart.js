import React from 'react';
import { LineChart } from 'react-native-chart-kit';
import { Dimensions } from 'react-native';
import { View, Text } from 'react-native';

const StockChart = ({ data, symbol }) => {
    // Map the historical price data to the chartData object
    const chartData = {
        labels: data?.map((point) => point.priceDate), // Use the priceDate for labels
        datasets: [
            {
                data: data?.map((point) => point.close), // Use the closing price for data points
                color: (opacity = 1) => `rgba(75,192,192, ${opacity})`,
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
            <Text style={{ fontSize: 18, fontWeight: 'bold', marginBottom: 8 }}>{`${symbol} Closing Price`}</Text>
            <LineChart
                data={chartData}
                width={Dimensions.get('window').width - 16}
                height={220}
                chartConfig={chartConfig}
            />
        </View>
    );
};

export default StockChart;
