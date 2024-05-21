import { StyleSheet, Text, View, TouchableOpacity, TextInput, Pressable, Platform } from 'react-native'
import React, { useState } from 'react'
import { Picker } from '@react-native-picker/picker'
import DateTimePicker from '@react-native-community/datetimepicker';

const OtherLocation = ({navigation}) => {

    const [currentDate, setCurrentDate] = useState(new Date());
    const [date, setDate] = useState("");
    const [show, setShow] = useState(false)

    const onChange = ({ type }, selectedDate) => {
        if (type == "set") {
            const data = selectedDate;
            setCurrentDate(data)
            // console.log(data)
            if (Platform.OS == "android") {
                toggle();
                const data = selectedDate;
                setDate(FormData(data))
                console.log(FormData(data))

            }
        } else {
            console.log("Close")
        }
    }

    const FormData = (rawDate) => {
        const date1 = new Date(rawDate);

        const year = date1.getFullYear();
        const month = date1.getMonth() + 1;
        const day = date1.getDate();

        const month0 = month < 10 ? '0' + month : month;
        const day0 = day < 10 ? '0' + day : day;

        return (year + '-' + month0 + '-' + day0);
    }

    const toggle = () => {
        setShow(!show)
    }


    const [selectedValue, setSelectedValue] = useState('');

    const handleChange = (itemValue, itemIndex) => {
        setSelectedValue(itemValue);
    };

    const handleAttendance =()=>{
        navigation.navigate("OD")
    }

    return (
        <View style={{ padding: 20 }}>
            <View style={{
                backgroundColor: 'white', width: 370, height: 50, justifyContent: 'center', alignItems: 'center', borderRadius: 10, shadowOffset: {
                    width: 0,
                    height: 2,
                },
                shadowOpacity: 0.25,
                shadowRadius: 3.84,
                elevation: 5,
            }}>
                <Text style={{ fontSize: 20, fontWeight: "bold", color: "grey" }}>Select Location </Text>
            </View>
            <View style={{ marginLeft: 10, marginTop: 30, borderBottomWidth: 2, borderRadius: 10, borderColor: "grey" }}>
                <Picker
                    selectedValue={selectedValue}
                    onValueChange={handleChange}
                    style={{ color: 'grey', fontSize: 20 }}
                >
                    <Picker.Item label="--Select Location--" value="--Select Location--" />
                    <Picker.Item label="Tirunalveli" value="Tirunalveli" />
                    <Picker.Item label="Tenkasi" value="Tenkasi" />
                    <Picker.Item label="Tutucorin" value="Tutucorin" />
                    <Picker.Item label="Trivandram" value="Trivandram" />
                    <Picker.Item label="Nagarcoil" value="Nagarcoil" />
                </Picker>
            </View>
            <View style={{
                backgroundColor: 'white', width: 370, height: 50, justifyContent: 'center', marginTop: 30, alignItems: 'center', borderRadius: 10, shadowOffset: {
                    width: 0,
                    height: 2,
                },
                shadowOpacity: 0.25,
                shadowRadius: 3.84,
                elevation: 5,
            }}>
                <Text style={{ fontSize: 20, fontWeight: "bold", color: "grey" }}>Select Date </Text>
            </View>
            <View style={{ marginLeft: 10, marginTop: 30, borderBottomWidth: 2, borderRadius: 10, borderColor: "grey" }}>
                <TouchableOpacity onPress={() => setShow(true)}>
                    <Pressable onPress={toggle}>
                        <TextInput
                            placeholder='Select Date'
                            value={date}
                            onChangeText={(d) => setDate(d)}
                            editable={false}
                            style={{ fontSize: 19, padding: 10 }}
                        />
                    </Pressable>
                </TouchableOpacity>

            </View>
            <View style={{ alignItems: 'center',marginTop:30 }}>
                <TouchableOpacity onPress={handleAttendance} style={{ backgroundColor: '#df85ed', width: 365, height: 40, marginTop: 30, borderRadius: 10, justifyContent: 'center', alignItems: 'center' }}>
                    <Text style={{ color: 'white', fontSize: 20, fontWeight: 'bold' }}>Attendance</Text>
                </TouchableOpacity>
            </View>

            {show && (
                <DateTimePicker
                    mode='date'
                    display='calender'
                    value={currentDate}
                    onChange={onChange}
                />
            )}




        </View>
    )
}

export default OtherLocation

const styles = StyleSheet.create({})