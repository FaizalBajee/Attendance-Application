import { StyleSheet, Text, TouchableOpacity, View, Pressable, TextInput, Platform } from 'react-native'
import React, { useState } from 'react'
import { useEffect } from 'react';
import DateTimePicker from '@react-native-community/datetimepicker';
import { Picker } from "@react-native-picker/picker";
import moment from "moment"
import AsyncStorage from '@react-native-async-storage/async-storage';

const ApplyPermission = ({ navigation }) => {
  const [eid, setEid] = useState('');
  const [Time, setTime] = useState(new Date());
  const [date, setDate] = useState('');
  const [showTime, setShowTime] = useState(false);
  const [hours, setHours] = useState('');
  const [selectedValue, setSelectedValue] = useState('');

  useEffect(() => {
    getEID();
  }, []);
  
  const getEID = async () => {
    const data = await AsyncStorage.getItem("employee");
    //console.log(data)
    setEid(data);
  }

  const parsedDate = moment(Time).toDate();
  //  console.log(parsedDate)

  const handleChange = (itemValue, itemIndex) => {
    setSelectedValue(itemValue);
  };

  const onchange = ({ type }, selectedTime) => {
    if (type == "set") {
      const currentDate = selectedTime;
      setDate(currentDate.toLocaleTimeString());
      console.log(currentDate.toLocaleTimeString());

      if (Platform.OS === "android") {
        toggleDatePicker1();
        const currentDate = selectedTime;
        setTime(currentDate.toLocaleTimeString());
        console.log(currentDate.toLocaleTimeString());
      }
    } else {
      toggleDatePicker1();
      console.log("close")
    }
  }



  const toggleDatePicker1 = () => {
    setShowTime(!showTime);
  }

  const handlePermission = () => {
    if (date.length == 0) {
      alert('Select Time')
      return
    }
    if (hours.length == 0) {
      alert('Select Hours')
      return
    }
    if (selectedValue.length == 0) {
      alert('Select Reason')
      return
    }

    fetch('http://173.0.0.247:8113/Permission', {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        emp: eid,
        Time: date,
        Hours: hours,
        Reason: selectedValue
      })
    }).then((res) => navigation.navigate("Home"))
      .then(() => alert("Permission Updated"))
      .catch((error) => console.log(error))

        navigation.navigate("Home")
        alert("Permission Updated")

  }

  return (
    <View>
      <View style={{ justifyContent: 'center', alignItems: 'center', marginTop: 20 }}>
        <Text style={{ backgroundColor: 'gray', color: 'white', width: 390, paddingLeft: 10, fontSize: 20 }}>Permission Info</Text>
      </View>

      <TouchableOpacity >
        <Pressable onPress={toggleDatePicker1}>
          <Text style={{ padding: 20, fontSize: 20, fontWeight: 'bold', color: 'grey' }}>Select Time *</Text>
        </Pressable>
      </TouchableOpacity>
      <TouchableOpacity onPress={() => setShowTime(true)}>
        <TextInput
          placeholder='time'
          value={date}
          onChangeText={(d) => setDate(d)}
          editable={false}
          style={{ marginLeft: 49, fontSize: 20, fontWeight: 'bold' }}
        />
      </TouchableOpacity>

      <TouchableOpacity>
        <Text style={{ padding: 20, fontSize: 20, fontWeight: 'bold', color: 'grey' }}>Hour *</Text>
      </TouchableOpacity>

      <View style={{ flexDirection: 'row', padding: 20, marginLeft: 55 }}>
        <TouchableOpacity onPress={() => setHours('HALF AN HOUR')} style={{ backgroundColor: '#f3dcf5', borderColor: '#d4afed', borderWidth: 1, borderRadius: 10, width: 120, height: 35, justifyContent: 'center', alignItems: 'center' }} >
          <Text style={{ color: 'grey', fontWeight: 'bold' }}>HALF AN HOUR</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => setHours('ONE HOUR')} style={{ backgroundColor: '#f3dcf5', borderColor: '#d4afed', marginLeft: 30, borderWidth: 1, borderRadius: 10, width: 120, height: 35, justifyContent: 'center', alignItems: 'center' }}>
          <Text style={{ color: 'grey', fontWeight: 'bold' }}>ONE HOUR</Text>
        </TouchableOpacity>
      </View>
      <View style={{ flexDirection: 'row', marginLeft: 75 }}>
        <TouchableOpacity onPress={() => setHours('ONE AND HALF HOUR')} style={{ backgroundColor: '#f3dcf5', borderColor: '#d4afed', borderWidth: 1, borderRadius: 10, width: 120, height: 35, justifyContent: 'center', alignItems: 'center' }}>
          <Text style={{ color: 'grey', fontWeight: 'bold' }}>ONE AND HALF HOUR</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => setHours('TWO HOUR')} style={{ backgroundColor: '#f3dcf5', borderColor: '#d4afed', marginLeft: 30, borderWidth: 1, borderRadius: 10, width: 120, height: 35, justifyContent: 'center', alignItems: 'center' }} >
          <Text style={{ color: 'grey', fontWeight: 'bold' }}>TWO HOUR</Text>
        </TouchableOpacity>
      </View>

      <TouchableOpacity>
        <Text style={{ padding: 20, fontSize: 20, fontWeight: 'bold', color: 'grey', marginTop: 20 }}>Reason *</Text>
      </TouchableOpacity>

      {showTime && (
        <DateTimePicker
          testID='dateTimePicker'
          value={parsedDate}
          mode='time'
          // is24Hour={true}
          display='default'
          onChange={onchange}
        />
      )}
      <View style={{ marginLeft: 35 }}>
        <Picker
          selectedValue={selectedValue}
          onValueChange={handleChange}
          style={{ color: 'grey' }}
        >
          <Picker.Item label="--Select Reason--" value="--Select Reason--" />
          <Picker.Item label="Bank" value="Bank" />
          <Picker.Item label="Other" value="Other" />
        </Picker>
      </View>
      <View style={{ justifyContent: 'center', alignItems: 'center', marginTop: 20 }}>
        <TouchableOpacity onPress={handlePermission} style={{ backgroundColor: '#f59af5', width: 370, height: 40, justifyContent: 'center', alignItems: 'center', borderRadius: 18 }}>
          <Text style={{ color: 'white', fontSize: 20, fontWeight: 'bold' }}>Save</Text>
        </TouchableOpacity>
      </View>

    </View>
  )
}

export default ApplyPermission

const styles = StyleSheet.create({})