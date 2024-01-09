import React from 'react';
import { View, Text, Button, StyleSheet, ScrollView } from 'react-native';
import StockDashboard from './components/StockDashboard';
import { useAuth } from './AuthContext';
import { useNavigation } from '@react-navigation/native';
import Dashboard from './components/IPODashboard';

function DashboardPage() {
    const { logout } = useAuth();
    const navigation = useNavigation();

    const handleLogout = () => {
        logout();
        navigation.navigate('Login'); // Navigate to the login screen after logout
    };

    return (
        <ScrollView style={styles.scrollView}>
            <View style={styles.container}>
                <Text style={styles.title}>Dashboard</Text>
                <Text>Welcome to your dashboard!</Text>
                <Button title="Logout" onPress={handleLogout} />
                {/* Dashboard content goes here */}
                <StockDashboard />
                <Dashboard />
                {/* You can add more content here that will be scrollable */}
            </View>
        </ScrollView>
    );
}

const styles = StyleSheet.create({
    scrollView: {
        flex: 1, // Take up the full height
    },
    container: {
        // justifyContent and alignItems removed to allow ScrollView to align children
        padding: 20,
    },
    title: {
        fontSize: 22,
        fontWeight: 'bold',
        marginBottom: 20,
    },
    // Add additional styles if needed
});

export default DashboardPage;
