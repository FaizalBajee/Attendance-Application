import { StyleSheet, Text, TextInput, View, Image, TouchableOpacity, Pressable, Platform } from 'react-native'
import React, { useState } from 'react'
import { useEffect } from 'react';
import DateTimePicker from '@react-native-community/datetimepicker'
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';

const ApplyLeave = ({navigation}) => {
    const[eid,setEid]=useState('');
    //Select Date
    const [date, setDate] = useState(new Date());
    const [leave, setLeave] = useState('');
    const [showDate, setShowDate] = useState(false);

    useEffect(()=>{
            getEID();
    },[]);
    const getEID = async () => {
        const data = await AsyncStorage.getItem("employee");
       // console.log(data)
        setEid(data);
    }

    const toggleDatePicker = () => {
        setShowDate(!showDate)
    }
    const onChange = ({ type }, selectedDate) => {
        if (type == "set") {
            const currentDate = selectedDate;
            setDate(currentDate);
         //   console.log(currentDate);
            if (Platform.OS == "android") {
                toggleDatePicker();
                const currentDate = selectedDate;
                setLeave(FormData(currentDate));
             //   console.log(FormData(currentDate))
            }

        } else {
            toggleDatePicker();
            console.log('close')
        }
    }

    const FormData = (rawDate) => {
        const date = new Date(rawDate);

        const year = date.getFullYear();
        const month = date.getMonth() + 1;
        const day = date.getDate();

        const month0 = month < 10 ? '0' + month : month;
        const day0 = day < 10 ? '0' + day : day;

        return (year + '-' + month0 + '-' + day0);
    }



    const [Reason, setReason] = useState('')

    const handleSave = () => {
        if (Reason == 'Reason*') {
            alert('Enter Reason')
        }
        fetch("http://173.0.0.247:8113/leave", {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                emp:eid,
               date:leave,
               reason:Reason
            })
        }).then((Response) => Response.json())
            .then(Response => console.log(Response))
            .then(()=>navigation.navigate("Home"))
            .then(()=>alert("Leave Updated"))
            .catch(error => { alert(error) })
    }
    return (
        <View style={{ padding: 16, marginTop: 10 }}>
            <View >
                <Text style={{ backgroundColor: '#999999', height: 30, paddingLeft: 10, fontWeight: 'bold', color: 'white', fontSize: 20, justifyContent: 'center' }}>Leave Info</Text>
            </View>
            <TouchableOpacity onPress={() => { setShowDate(true) }}>
                <Pressable onPress={() => { toggleDatePicker() }}>
                    <View style={{ flexDirection: 'row', marginTop: 20 }}>

                        <TextInput placeholder='Leave Date*'
                            value={leave}
                            editable={false}
                            onChangeText={(d) => { setLeave(d) }}
                            style={{ fontSize: 25, width: 330, borderBottomWidth: 1 }} />
                        <Image source={require('../assets/SundayAt.png')} style={{ width: 45, height: 45 }} />

                    </View>
                </Pressable>

            </TouchableOpacity>
            <TextInput
                editable
                multiline
                numberOfLines={4}
                maxLength={100}
                onChangeText={text => setReason(text)}
                placeholder='Reason*'
                style={{ padding: 10, borderWidth: 1, marginTop: 30, fontSize: 20 }}
            />
            <View style={{ alignItems: 'center' }}>
                <TouchableOpacity onPress={handleSave} style={{ backgroundColor: '#df85ed', width: 365, height: 40, marginTop: 30, borderRadius: 10, justifyContent: 'center', alignItems: 'center' }}>
                    <Text style={{ color: 'white', fontSize: 20, fontWeight: 'bold' }}>Save</Text>
                </TouchableOpacity>
            </View>

            {showDate && (
                <DateTimePicker
                    mode='date'
                    display='calender'
                    value={date}
                    onChange={onChange}
                />
            )}

        </View>
    )
}

export default ApplyLeave

const styles = StyleSheet.create({})