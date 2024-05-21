import { StyleSheet, Text, View } from 'react-native'
import React, { useEffect } from 'react'
import { ImageBackground } from 'react-native'
import AsyncStorage from '@react-native-async-storage/async-storage'
import { Image } from 'react-native-elements'


const Splash = ({ navigation }) => {

  useEffect(() => {
    setTimeout(() => {
      storage()
    }, 200)
  }, [])

  const storage = async () => {
    const data = await AsyncStorage.getItem("token")
    const data1 = await AsyncStorage.getItem("employee")
    const data2 = await AsyncStorage.getItem("Ename")
  //  console.log(data)
  //  console.log(data1)
  //  console.log(data2)
    if (!data) {
      navigation.navigate('login')
    }
    else {
      navigation.navigate('Home')
    }
  }

  return (
    <View>
      <Image soSurce={require("../assets/splash.png")} style={{ flex: 1, justifyContent: 'center' }} resizeMode='cover'>

      </Image>
    </View>
  )
}

export default Splash

const styles = StyleSheet.create({})