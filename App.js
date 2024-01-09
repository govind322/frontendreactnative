import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import LoginPage from './LoginPage';
import { AuthProvider } from './AuthContext';
import RegisterPage from './RegisterPage';
import DashboardPage from './DashboardPage';
// import ProtectedRoute from './ProtectedRoute';
import { View, Text, Button, StyleSheet } from 'react-native';

const Stack = createNativeStackNavigator();

function App() {
  return (
    <AuthProvider>
      <NavigationContainer>
        <Stack.Navigator>
          <Stack.Screen name="Home" component={HomePage} />
          <Stack.Screen name="Login" component={LoginPage} />
          <Stack.Screen name="Register" component={RegisterPage} />
          <Stack.Screen name="Dashboard" component={DashboardPage} options={{ gestureEnabled: false }} />
        </Stack.Navigator>
      </NavigationContainer>
    </AuthProvider>
  );
}

function HomePage({ navigation }) {
  return (
    <View style={styles.container}>
      <Text style={styles.header}>Welcome to the Stock Market Dashboard</Text>
      <Text>Please login or register to continue.</Text>
      <Button
        title="Login"
        onPress={() => navigation.navigate('Login')}
      />
      <Button
        title="Register"
        onPress={() => navigation.navigate('Register')}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  },
  header: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10,
  },
});

export default App;