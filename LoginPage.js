import React, { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet, Alert } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { useAuth } from './AuthContext';

function LoginPage() {
    const navigation = useNavigation();
    const { login } = useAuth();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const handleSubmit = async () => {
        const data = {
            email,
            password,
        };

        try {
            const response = await fetch('http://10.0.2.2:3001/login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(data),
            });

            if (response.ok) {
                const result = await response.json();
                console.log('Login successful:', result);
                login(); // Set the isAuthenticated state to true
                navigation.navigate('Dashboard');
                // Redirect user or perform other actions after successful login
            } else {
                console.error('Login failed');
                Alert.alert('Login Failed', 'Invalid Email or Password');
                // Handle login failure
            }
        } catch (error) {
            console.error('Error during login:', error);
            Alert.alert('Login Error', 'An error occurred during login.');
            // Handle errors
        }
    };

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Login</Text>
            <TextInput
                style={styles.input}
                value={email}
                onChangeText={setEmail}
                placeholder="Email"
                keyboardType="email-address"
                autoCapitalize="none"
                required
            />
            <TextInput
                style={styles.input}
                value={password}
                onChangeText={setPassword}
                placeholder="Password"
                secureTextEntry
                required
            />
            <Button title="Login" onPress={handleSubmit} />
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        padding: 20,
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 20,
    },
    input: {
        height: 40,
        borderColor: 'gray',
        borderWidth: 1,
        marginBottom: 20,
        padding: 10,
    },
});

export default LoginPage;