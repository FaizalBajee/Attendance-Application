import { FlatList, StyleSheet, Text, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import AsyncStorage from '@react-native-async-storage/async-storage';

const PermissionReport = () => {

  const [data,setData] = useState([]);

  useEffect(()=>{
    fetchData()
      
  },[])

 const fetchData = async () => {
    try {
        const response = await fetch('http://173.0.0.247:8113/Psummary');
        const data = await response.json();

        const emp = await AsyncStorage.getItem("employee");  // 00167
        
        const filteredData = data.filter((data) => data.EID === emp);

        setData(filteredData)
    } catch (error) {
        console.error(error);
    }
}


  return (
    <View style={{padding:10}}>
      <View style={{ flexDirection: 'row', backgroundColor: '#e3a6f5', padding: 8, marginTop: 30 }}>
        <Text style={{ width: 150, fontWeight: 'bold' }}>Date</Text>
        <Text style={{ width: 160, fontWeight: 'bold' }}>Hours</Text>
        <Text style={{ width: 120, fontWeight: 'bold' }}>Status</Text>
      </View>
            <View>
                <FlatList
                    data={data}
                    renderItem={( data ) => (
                        <View style={{ padding: 10, borderBottomWidth: 1, borderBottomColor: '#ccc' ,flexDirection:"row",justifyContent:"space-between"}}>
                            <Text style={{fontSize:15,color:"grey",fontWeight:"bold"}}>{data.item.DATE}</Text>
                            <Text style={{fontSize:15,color:"grey",fontWeight:"bold"}}>{data.item.Hours}</Text>
                            <Text style={{fontSize:15,color:"grey",fontWeight:"bold"}}>{data.item.Status}</Text>
                        </View>
                    )}
                    keyExtractor={(item,index) => index}
                />
            </View>
    </View>
  )
}

export default PermissionReport

const styles = StyleSheet.create({})