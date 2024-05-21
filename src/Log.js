import { Keyboard, StyleSheet, Text, TextInput, TouchableOpacity, View, Pressable, Platform, FlatList } from 'react-native'
import React, { useEffect, useState } from 'react'
import DateTimePicker from '@react-native-community/datetimepicker';
import AsyncStorage from '@react-native-async-storage/async-storage';

const Log = ({ navigation }) => {

    //code for FROM date selection
    const [date1, setDate1] = useState(new Date());
    const [fromDate, setFromDate] = useState('');
    const [showPickerFROM, setShowPickerFROM] = useState(false);
    const [log, setLog] = useState([])

    const [eid, setEid] = useState('');

    useEffect(() => {
        fetchData();
    }, [])


    fetchData = async () => {
        try {
            const response = await fetch('http://173.0.0.247:8113/log');
            const data = await response.json();

            const emp = await AsyncStorage.getItem("employee");//asyn

            const filteredData = data.filter((data) => data.EID === emp);

            setLog(filteredData)
        } catch (error) {
            console.error(error);
        }
    }

   // onpress for image
    const handleImage =(data)=>{
        navigation.navigate("image",{DATA:data.item})
    }


    const toggleDatePicker1 = () => {
        setShowPickerFROM(!showPickerFROM);
    }
    const onChange1 = ({ type }, selectedDate) => {
        if (type == "set") {
            const currentDate = selectedDate;
            setDate1(currentDate);
            console.log(currentDate);

            if (Platform.OS === "android") {
                toggleDatePicker1();
                const currentDate = selectedDate;
                setFromDate(FormData(currentDate));
                console.log(FormData(currentDate));
            }
        } else {
            toggleDatePicker1();
            console.log("close")
        }
    }
    //Format Date Function
    const FormData = (rawDate) => {
        const date1 = new Date(rawDate);

        const year = date1.getFullYear();
        const month = date1.getMonth() + 1;
        const day = date1.getDate();

        const month0 = month < 10 ? '0' + month : month;
        const day0 = day < 10 ? '0' + day : day;

        return (year + '-' + month0 + '-' + day0);
    }
    //code for TO date selection
    const [date2, setDate2] = useState(new Date())
    const [toDate, setToDate] = useState('');
    const [showPickerTO, setShowPickerTO] = useState(false);

    const toggleDatePicker2 = () => {
        setShowPickerTO(!showPickerTO);
    }
    const onChange2 = ({ type }, selectedDate) => {
        if (type == "set") {
            const currentDate = selectedDate;
            setDate2(currentDate);
            console.log(currentDate)
            if (Platform.OS === "android") {
                toggleDatePicker2();
                const currentDate = selectedDate;
                setToDate(FormData(currentDate));
                console.log(FormData(currentDate));
            }
        } else {
            toggleDatePicker2();
            console.log("Close")
        }
    }
    //
    const handleShow = () => {
        if (fromDate.length == 0) {
            alert('Select Date')
        }
        if (toDate.length == 0) {
            alert('Select Date')
        }
    }
    return (
        <View style={{ padding: 10, marginTop: 15 }}>
            <View >
                <Text style={{ backgroundColor: '#999999', height: 30, paddingLeft: 10, fontWeight: 'bold', color: 'white', fontSize: 18, justifyContent: 'center' }}>Log Info</Text>
            </View>
            {/* <View style={{ flexDirection: 'row', marginTop: 30 }}>
                <TouchableOpacity onPress={() => { setShowPickerFROM(true) }} style={{ height: '100', width: 140 }}>

                    <Pressable
                        onPress={toggleDatePicker1}
                    >
                        <TextInput placeholder='From'
                            value={fromDate}
                            onChangeText={(d) => { setFromDate(d) }}
                            editable={false}
                            onPress={() => { setShowPickerFROM(true) }}
                            style={{ borderBottomWidth: 1, width: 140, fontSize: 20 }} />
                    </Pressable>

                </TouchableOpacity>
                <TouchableOpacity onPress={() => { setShowPickerTO(true), toggleDatePicker2() }}>

                    <TextInput placeholder='To'
                        value={toDate}
                        onChangeText={(d1) => { setToDate(d1) }}
                        editable={false}
                        style={{ borderBottomWidth: 1, width: 140, marginLeft: 20, fontSize: 20 }} />


                </TouchableOpacity>
                <TouchableOpacity onPress={handleShow} style={{ width: 70, height: 40, backgroundColor: '#ddb9fa', marginLeft: 20, borderRadius: 10, alignItems: 'center', justifyContent: 'center' }}>
                    <Text style={{ color: 'white', fontWeight: 'bold', fontSize: 18 }}>Show</Text>
                </TouchableOpacity>
            </View> */}
            <View style={{ flexDirection: 'row', backgroundColor: '#e3a6f5', padding: 8, marginTop: 30 }}>
                <Text style={{ width: 170, fontWeight: 'bold' }}>Date</Text>
                <Text style={{ width: 120, fontWeight: 'bold' }}>Check In</Text>
                <Text style={{ width: 120, fontWeight: 'bold' }}>Check Out</Text>
            </View>


            {showPickerFROM && (
                <DateTimePicker
                    mode='date'
                    display='calender'
                    value={date1}
                    onChange={onChange1}
                />
            )}

            {showPickerTO && (
                <DateTimePicker
                    mode='date'
                    display='calender'
                    value={date2}
                    onChange={onChange2}
                />
            )}

            <View>
                <FlatList
                    data={log}
                    renderItem={(data) => (
                        <TouchableOpacity onPress={()=>handleImage(data)}>
                            <View style={{ padding: 20, borderBottomWidth: 1, borderBottomColor: '#ccc', flexDirection: "row", justifyContent: "space-between" }}>
                                <Text style={{ fontSize: 19, color: "grey", fontWeight: "bold" }}>{data.item.date}</Text>
                                <Text style={{ fontSize: 19, color: "grey", fontWeight: "bold" }}>{data.item.InTime}</Text>
                                <Text style={{ fontSize: 19, color: "grey", fontWeight: "bold" }}>{data.item.OutTime}</Text>
                                {/* <Text style={{ fontSize: 19, color: "grey", fontWeight: "bold" }}>{data.item}</Text> */}

                            </View>
                        </TouchableOpacity>
                    )}
                    keyExtractor={(item, index) => index.toString()}
                />
            </View>


        </View>

    )
}

export default Log

const styles = StyleSheet.create({})