import { FlatList, StyleSheet, Text, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import AsyncStorage from '@react-native-async-storage/async-storage';

const LeaveSummary = () => {
    const [data, setData] = useState('');
    useEffect(() => { 
        fetchData()
       })

    const fetchData = async () => {
        try {
            const response = await fetch('http://173.0.0.247:8113/Lsummary');
            const data = await response.json();
    
            const emp = await AsyncStorage.getItem("employee");//asyn
            
            const filteredData = data.filter((data) => data.EID === emp);
            setData(filteredData)

            
        } catch (error) {
            console.error(error);
        }
    }

    return (
        <View style={{ padding: 10, marginTop: 10 }}>
            <View style={{ flexDirection: 'row', backgroundColor: '#df85ed', height: 35, borderRadius: 5 }}>
                <Text style={{ color: 'black', fontSize: 20, width: 160, paddingLeft: 15 }}>Date</Text>
                {/* <Text style={{ color: 'black', fontSize: 20, width: 150 }}>Days</Text> */}
                <Text style={{ color: 'black', fontSize: 20, width: 150,marginLeft:140 }}>status</Text>
            </View>
            <FlatList
                data={data}
                key={data.id}
                renderItem={(data) => {
                    return (
                        <View style={{ flexDirection: 'row', justifyContent: 'space-between' ,padding:6}}>
                            <Text style={{ fontSize: 20,padding:7 ,color:"grey",fontWeight:"bold" }}>{data.item.Ldate}</Text>
                            <Text style={{ fontSize: 20,padding:7 ,color:"grey",fontWeight:"bold" }}>{data.item.status}</Text>
                        </View>
                    )
                }}
            />
        </View>
    )
}

export default LeaveSummary

const styles = StyleSheet.create({})