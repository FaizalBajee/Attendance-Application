//1F:3E:E5:DE:22:D1:30:70:56:2F:B6:16:C4:19:D8:0F:15:89:B8:9D
//key=AIzaSyDz0nzJw8htRciATkvWWOLd-y-WNnbSfMI
import { StyleSheet, Text, View, Button, TouchableOpacity, TextInput, Image } from 'react-native';
import React from 'react';
import { useEffect, useRef, useState } from 'react';
import MapView from 'react-native-maps';
import * as Location from 'expo-location';
import * as ImagePicker from 'expo-image-picker';
import axios from "axios";
import AsyncStorage from '@react-native-async-storage/async-storage';

const Map = ({ navigation }) => {

  const [eid, setEid] = useState("");

  const [imageURI, setImageURI] = useState('');
  const [filename, setFilename] = useState('');
  const [image, setImage] = useState('');
  const mapRef = useRef();
  //State
  const [locationLat, setLocationLat] = useState('');
  const [locationLong, setLocationLong] = useState('');

  useEffect(() => {
    getPermissions();
    getEID();
  }, []);

  const getEID = async () => {
    const data = await AsyncStorage.getItem("employee");
    // console.log(data)
    setEid(data);
  }

  const getPermissions = async () => {
    const { status } = await Location.requestForegroundPermissionsAsync();
    if (status !== 'granted') {
      alert("Please grant location permissions");
      return;
    }
    const currentLocation = await Location.getCurrentPositionAsync({});
    setLocationLat(currentLocation.coords.latitude);
    setLocationLong(currentLocation.coords.longitude);

    if (mapRef) {
      mapRef.current.animateToRegion({
        latitude: currentLocation.coords.latitude,
        longitude: currentLocation.coords.longitude,
        latitudeDelta: 0.1,
        longitudeDelta: 0.1,
      });
    }
  };

  const initialRegion = {

    latitude: 28.7041,
    longitude: 77.1025,
    latitudeDelta: 20,
    longitudeDelta: 20,

  }

  const handleCamera = async () => {
    try {
      await ImagePicker.requestCameraPermissionsAsync();
      const result = await ImagePicker.launchCameraAsync({
        cameraType: ImagePicker.CameraType.front,
        allowsEditing: false,
        aspect: [1, 1],
        quality: 1
      });
      if (!result.canceled) {
        setImageURI(result.assets[0].uri);
        setFilename(result.assets[0].fileName);
        console.log(result.assets[0].fileName);
        setImage(result)
        console.log(result)
      }
    }
    catch (error) {
      console.log(error);
    }
  }

  const handleCheckIn = () => {
    try {
      if (imageURI.length == 0) {
        alert('Take a Picture')
      } else {
        const formData = new FormData;
        formData.append('image', {
          uri: imageURI,
          type: "image/jpeg",
          name: filename
        })
        formData.append('Lat', locationLat)
        formData.append('Long', locationLong)
        formData.append('emp',eid)
        formData.append('img',filename)
        axios.post(
          "http://173.0.0.247:8113/upload",//http://173.0.0.247:8113/upload
          formData,
          {
            headers: { "Content-Type": "multipart/form-data" }
          }
        );
        navigation.navigate('Home')
        alert('Attendance Punched')
      }
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <View>
      <View style={{ backgroundColor: '#e196ff', flexDirection: 'row', height: 40 }}>
        <Text style={{ fontSize: 20, fontWeight: 'bold', width: 220, marginTop: 5, color: 'white' }}>Lat:{locationLat}</Text>
        <Text style={{ fontSize: 20, fontWeight: 'bold', width: 220, marginTop: 5, color: 'white' }}>Long:{locationLong}</Text>
      </View>

      {imageURI && (
        <View style={{ justifyContent: 'center', alignItems: 'center', backgroundColor: '#d2d4d4' }}>
          <Image
            source={{ uri: imageURI }}
            style={{ width: 200, height: 400 }}
            resizeMode='contain'
          />
        </View>
      )}

      <MapView style={{ width: '100%', height: '100%' }}
        ref={mapRef}
        showsUserLocation
        initialRegion={initialRegion}
      >

      </MapView>


      <View style={{ width: '50%', alignItems: 'center', justifyContent: 'center', marginTop: 600, marginLeft: 100, borderRadius: 30, position: 'absolute' }}>
        <TouchableOpacity onPress={handleCamera}>
          <Image source={require('../assets/camera.png')} style={{ width: 90, height: 90 }} />
        </TouchableOpacity>
        <TouchableOpacity style={{ backgroundColor: '#d1c8db', height: 40, width: 120, justifyContent: 'center', alignItems: 'center', borderRadius: 20 }}>
          <Text onPress={handleCheckIn} style={{ fontSize: 20, fontWeight: 'bold', color: '#ec84fa' }}>Check In</Text>
        </TouchableOpacity>
      </View>
    </View>
  )
}

export default Map

