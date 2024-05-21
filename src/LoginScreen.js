import React, { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet, TouchableOpacity } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';
import { FontAwesome5 } from '@expo/vector-icons';

const LoginScreen = ({ navigation }) => {
    const [user, setUsername] = useState('');
    const [pass, setPassword] = useState('');

    const handleLogin = () => { 
        axios.post('http://173.0.0.247:8113/login', { user, pass })
            .then((res) => { 
                if (res.data.status === "success") {
                    try {
                        AsyncStorage.setItem('token', res.data.name)
                        const emp = res.data.EID
                        AsyncStorage.setItem('employee', emp.toString())
                        const Ename = res.data.user;
                        AsyncStorage.setItem('Ename', Ename.toString())
                        navigation.navigate('Home')
                    }
                    catch {
                            alert("User Not Found")
                    }

                }
            })
            .catch((err) =>
                console.log(err),
                alert("server error"))
    };

    return (
        <View style={styles.container}>
            <FontAwesome5 name='user-alt' style={{ fontSize: 70, marginTop: 0, color: 'grey' }} />
            <Text style={styles.title}>Login</Text>
            <TextInput
                style={styles.input}
                placeholder="Username"
                onChangeText={text => setUsername(text)}
                value={user}
            />
            <TextInput
                style={styles.input}
                placeholder="Password"
                onChangeText={text => setPassword(text)}
                value={pass}
                secureTextEntry={true}
            />
            <TouchableOpacity style={styles.button} onPress={handleLogin}>
                <Text style={styles.buttonText}>Login</Text>
            </TouchableOpacity>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        //  flex: 1,
        marginTop: 150,
        justifyContent: 'center',
        alignItems: 'center',
        paddingHorizontal: 20,
    },
    title: {
        fontSize: 49,
        fontWeight: "bold",
        color: "#967bb6",
        textAlign: "center",
        padding: 30,
        marginBottom: '44'
    },
    input: {
        width: 400,
        textAlign: "center",
        marginBottom: 7,
        height: 55,
        borderWidth: 1,
        borderColor: "#967bb6",
        borderRadius: 15,
        fontSize: 20,
        backgroundColor: '#f8f6f9'
    },
    button: {
        width: "80%",
        backgroundColor: "#E0C6FF",
        borderRadius: 15,
        height: 50,
        alignItems: "center",
        justifyContent: "center",
        marginTop: 40,
        marginBottom: 10,
        marginLeft: 6
    },
    buttonText: {
        color: 'white',
        fontSize: 16,
    },
    error: {
        color: 'red',
        marginBottom: 10,
    },
});

export default LoginScreen;
