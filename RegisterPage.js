import React, { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet, Alert } from 'react-native';
import { useNavigation } from '@react-navigation/native';

function RegisterPage() {
    const navigation = useNavigation();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');

    const handleSubmit = async () => {
        // Add a check to ensure password and confirmPassword match
        // This is frontend validation and should also be verified in the backend
        if (password !== confirmPassword) {
            console.error('Passwords do not match!');
            Alert.alert('Error', 'Passwords do not match!');
            return;
        }

        const data = {
            email,
            password,
            confirmPassword,
        };
        console.log("hello i am here")
        try {
            const response = await fetch('http://10.0.2.2:3001/register', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(data),
            });

            if (response.ok) {
                const result = await response.json();
                console.log('Registration successful:', result);
                navigation.navigate('Login'); // Assuming that the user is redirected to the login page after registration
                // Redirect user or perform other actions after successful registration
            } else {
                Alert.alert('Registration Failed', 'Please check your details and try again.');
                console.error('Registration failed');
                // Handle registration failure
            }
        } catch (error) {
            console.error('Error during registration:', error);
            Alert.alert('Registration Error', 'An error occurred during registration.');
            // Handle errors
        }
    };

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Register</Text>
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
            <TextInput
                style={styles.input}
                value={confirmPassword}
                onChangeText={setConfirmPassword}
                placeholder="Confirm Password"
                secureTextEntry
                required
            />
            <Button title="Register" onPress={handleSubmit} />
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

export default RegisterPage;