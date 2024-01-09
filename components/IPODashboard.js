import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, ActivityIndicator, ScrollView } from 'react-native';

const Dashboard = () => {
    const [upcomingIPOs, setUpcomingIPOs] = useState([]);
    const [currencyRates, setCurrencyRates] = useState([]);
    const [loadingIPOs, setLoadingIPOs] = useState(true);
    const [loadingCurrencies, setLoadingCurrencies] = useState(true);
    const API_KEY = 'pk_d510c531b8fb4037bd83bb0ca73f59ce';

    useEffect(() => {
        const fetchUpcomingIPOs = async () => {
            setLoadingIPOs(true);
            try {
                const response = await fetch(`https://api.iex.cloud/v1/data/CORE/UPCOMING_IPOS/market?token=${API_KEY}`);
                if (!response.ok) {
                    throw new Error(`HTTP error! status: ${response.status}`);
                }
                const data = await response.json();
                setUpcomingIPOs(data); // Use the parsed data
            } catch (error) {
                console.error('Error fetching upcoming IPOs:', error);
            }
            setLoadingIPOs(false);
        };

        const fetchCurrencyRates = async () => {
            setLoadingCurrencies(true);
            try {
                const response = await fetch(`https://api.iex.cloud/v1/fx/latest?symbols=USDCAD,GBPUSD,USDJPY&token=${API_KEY}`);
                if (!response.ok) {
                    throw new Error(`HTTP error! status: ${response.status}`);
                }
                const data = await response.json();
                setCurrencyRates(data); // Use the parsed data
            } catch (error) {
                console.error('Error fetching currency rates:', error);
            }
            setLoadingCurrencies(false);
        };

        fetchUpcomingIPOs();
        fetchCurrencyRates();
    }, [API_KEY]);

    const formatDate = (dateString) => {
        if (!dateString) return 'TBA'; // To Be Announced
        const options = { year: 'numeric', month: 'long', day: 'numeric' };
        return new Date(dateString).toLocaleDateString(undefined, options);
    };

    const formatCurrency = (value) => {
        return new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(value);
    };


    return (
        <View style={styles.dashboard}>
            <Text style={styles.header}>Financial Dashboard</Text>

            <View style={styles.section}>
                <Text style={styles.sectionTitle}>Upcoming IPOs</Text>
                {loadingIPOs ? (
                    <ActivityIndicator size="large" />
                ) : (
                    <ScrollView style={styles.list}>
                        {upcomingIPOs.map((ipo, index) => (
                            <View style={styles.listItem} key={index}>
                                <Text style={styles.listItemTitle}>{ipo.companyName || 'N/A'}</Text>
                                <Text>Expected Date: {formatDate(ipo.expectedDate)}</Text>
                            </View>
                        ))}
                    </ScrollView>
                )}
            </View>

            <View style={styles.section}>
                <Text style={styles.sectionTitle}>Latest Currency Rates</Text>
                {loadingCurrencies ? (
                    <ActivityIndicator size="large" />
                ) : (
                    <ScrollView style={styles.list}>
                        {currencyRates.map((rate, index) => (
                            <View style={styles.listItem} key={index}>
                                <Text style={styles.listItemTitle}>{rate.symbol}:</Text>
                                <Text>{rate.rate ? formatCurrency(rate.rate) : 'N/A'}</Text>
                            </View>
                        ))}
                    </ScrollView>
                )}
            </View>
        </View>
    );
};


const styles = StyleSheet.create({
    dashboard: {
        flex: 1,
        padding: 20,
        backgroundColor: '#fff', // Assuming a white background
    },
    header: {
        fontSize: 24,
        fontWeight: 'bold',
        textAlign: 'center',
        marginBottom: 30,
        color: '#333', // Dark text for the header
    },
    section: {
        marginBottom: 20,
    },
    sectionTitle: {
        fontSize: 18,
        fontWeight: 'bold',
        marginBottom: 10,
        color: '#333', // Dark text for section titles
    },
    list: {
        borderWidth: 1,
        borderColor: '#e0e0e0',
        borderRadius: 8,
        backgroundColor: '#f9f9f9',
        paddingBottom: 10, // Add padding at the bottom of the list
    },
    listItem: {
        paddingVertical: 15,
        paddingHorizontal: 10,
        borderBottomWidth: 1,
        borderBottomColor: '#eee',
        flexDirection: 'row', // Arrange title and subtitle in a row
        justifyContent: 'space-between', // Space between title and subtitle
        alignItems: 'center', // Center items vertically
    },
    listItemTitle: {
        fontWeight: '600',
        color: '#444', // Slightly darker text for list item titles
    },
    // If you have a subtitle style, you can add it here
    listItemSubtitle: {
        color: '#666', // Lighter text for subtitles
    },
    // Add styles for the last item to remove the bottom border
    lastListItem: {
        borderBottomWidth: 0,
    },
    // Style for the ActivityIndicator (loading indicator)
    loadingIndicator: {
        marginTop: 20, // Provide some spacing from the title
    },
})

export default Dashboard;