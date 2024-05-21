import { FlatList, StyleSheet, Text, View, TouchableOpacity } from 'react-native'
import React from 'react'
import { LinearGradient } from 'expo-linear-gradient'

const Permission = ({navigation}) => {
  const colors = [
    {
      id: 1,
      name: 'Apply Permission',
      color: ['#FC466B', '#3F5EFB']
    },
    // {
    //   id: 2,
    //   name: 'IN/OUT',
    //   color: ['#FC466B', '#3F5EFB']
    // },
    {
      id: 3,
      name: 'Report',
      color: ['#FC466B', '#3F5EFB']
    }
  ]

  const handleNAV=(item)=>{
      if(item.name=='Apply Permission'){
          navigation.navigate('Apply Permission')
      }
      if(item.name=='IN/OUT'){
        navigation.navigate('IN/OUT')
      }
      if(item.name=='Report'){
        navigation.navigate('Permission Report')
      }
  }
  return (
    <View style={{ marginTop: 30, justifyContent: 'center', alignItems: 'center' }}>
      {colors.map((item) =>
        <LinearGradient
          key={item.id}
          colors={item.color}
          start={[0, 0.5]}
          end={[1, 0.5]}
          style={{ width: 360, height: 90, justifyContent: 'center', alignItems: 'center', borderRadius: 20, marginTop: 20 }}
        >
          <TouchableOpacity onPress={()=>handleNAV(item)}>
            <Text style={{ fontSize: 20, color: 'white', fontWeight: 'bold' }}>{item.name}</Text>
          </TouchableOpacity>
        </LinearGradient>
      )}
    </View>
  )
}

export default Permission

const styles = StyleSheet.create({})