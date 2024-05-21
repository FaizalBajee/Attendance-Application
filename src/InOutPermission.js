import { View, Text, FlatList } from 'react-native'
import React from 'react'

const InOutPermission = () => {
  const arr=[
    {
      id:2
    },
    {
      id:9
    }
  ]
  return (
    <View>
      <Text>InOutPermission</Text>
      {/* <FlatList 
      data={arr}
      renderItem={(data)=>
    
                <Text>{data.item.id}</Text>
       
      } 
      /> */}
    </View>
  )
}

export default InOutPermission