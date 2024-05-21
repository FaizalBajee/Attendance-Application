import { StyleSheet, Text, View } from 'react-native'
import React, { useState } from 'react'
import { useEffect } from 'react'
import { useRef } from 'react'
import MapView from 'react-native-maps'
import { Button } from 'react-native-elements'
import * as Location from 'expo-location';
import axios from 'axios'
import AsyncStorage from '@react-native-async-storage/async-storage'

const OutPunch = ({navigation}) => {
    const [eid,setEid] =useState("")
    const [locationLat, setLocationLat] = useState('')
    const [locationLong, setLocationLong] = useState('')
    const mapRef = useRef();

    useEffect(() => {
        
        permissions();
        
        // Fetch data from AsyncStorage
        const fetchData = async () => {
          try {
            const storedData = await AsyncStorage.getItem("employee");
            if (storedData !== null) {
              setEid(storedData);
              console.log(storedData)
            }
          } catch (error) {
            console.error('Error fetching data:', error);
          }
        };
    
        fetchData();
      }, []); 

      const permissions=async()=>{
        const { status } = await Location.requestForegroundPermissionsAsync();
        if (status !== 'granted') {
            alert("Please grant location permissions");
            return;
        }
        const currentLocation = await Location.getCurrentPositionAsync({});
        console.log(currentLocation.coords.latitude + ',' + currentLocation.coords.longitude)
        setLocationLat(currentLocation.coords.latitude);
        setLocationLong(currentLocation.coords.longitude);

        // alert('Latitutude :' + currentLocation.coords.latitude +
        //     '   Longitude :' + currentLocation.coords.longitude)

        if (mapRef) {
            mapRef.current.animateToRegion({
                latitude: currentLocation.coords.latitude,
                longitude: currentLocation.coords.longitude,
                latitudeDelta: 0.1,
                longitudeDelta: 0.1,
            });
        }
      }

    const Loc = async () => {
       

        fetch("http://173.0.0.247:8113/Out", { //http://173.0.0.247:8113/Out
            method: "POST",
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                emp:eid,
                // Lat: locationLat,
                // Long: locationLong
            })
        }).then((Response) => Response.json())
            .then((Response) => console.log(Response))
            .then((error) => console.log(error))

            navigation.navigate("Home")
            alert("Successfully Out Punched")
           
    };

    const initialRegion = {

        latitude: 28.7041,
        longitude: 77.1025,
        latitudeDelta: 20,
        longitudeDelta: 20,

    }

    return (
        <View>
            <MapView style={{ width: '100%', height: '100%' }}
                ref={mapRef}
                showsUserLocation
                initialRegion={initialRegion}
            >

            </MapView>
            <View style={{ position: 'absolute', marginTop: 700, marginLeft: 150, width: 100, }}>
                <Button onPress={Loc} title='Out Punch' style={{ width: 100, height: 50 }}></Button>
            </View>
        </View>
    )
}

export default OutPunch

const styles = StyleSheet.create({})