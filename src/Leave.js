import { StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import { LinearGradient } from 'expo-linear-gradient';
import AsyncStorage from '@react-native-async-storage/async-storage';


const Leave = ({ navigation }) => {

    const colors = [
        {
            id: 1,
            name: 'Apply Leave',
            color: ['#FC466B', '#3F5EFB']
        },
        {
            id: 2,
            name: 'Summary',
            color: ['#FC466B', '#3F5EFB']
        }
    ]
    const handleNAV = (item) => {
        if (item.name == 'Apply Leave') {
            navigation.navigate('Apply Leave')
        }
        if (item.name == 'Summary') {
            navigation.navigate('Leave Summary')
        }
    }


    return (
        <View style={{ marginTop: 10, justifyContent: 'center', alignItems: 'center' }}>

            {colors.map((item) =>
                <LinearGradient
                    key={item.id}
                    colors={item.color}
                    start={[0, 0.5]}
                    end={[1, 0.5]}
                    style={{ width: 360, height: 90, justifyContent: 'center', alignItems: 'center', borderRadius: 20, marginTop: 20 }}
                >
                    <TouchableOpacity onPress={() => handleNAV(item)}>
                        <Text style={{ fontSize: 20, color: 'white', fontWeight: 'bold' }}>{item.name}</Text>
                    </TouchableOpacity>
                </LinearGradient>
            )}
        </View>
    )
}

export default Leave

const styles = StyleSheet.create({})