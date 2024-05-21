import { StyleSheet, Text, View, Image ,TouchableOpacity } from 'react-native'
import React, { useEffect, useState } from 'react'

const ImagePage = ({ route }) => {
    const { DATA } = route.params;
    const [data, setData] = useState(DATA.Image)
    const [date,setDate] = useState(DATA.date)
    const [inTime,setInTime] =useState(DATA.InTime)
    const [outTime,setOutTime] =useState(DATA.OutTime)
    

    return (
        <View style={{padding:10}}>
            <View style={{ flexDirection: 'row', marginTop: 40 ,marginLeft:10}}>
                <TouchableOpacity style={{
                    backgroundColor: 'white', width: 370, height: 100,justifyContent:"center",alignItems:"center", borderRadius: 20, shadowOffset: {
                        width: 0,
                        height: 2,
                    },
                    shadowOpacity: 0.25,
                    shadowRadius: 3.84,
                    elevation: 5,
                }}>
                    <Text style={{ padding: 20, fontSize: 28, color: '#7a7a79', fontWeight: 'bold' }}>Date: {date}</Text>

                </TouchableOpacity>
            </View>
            <View style={{ justifyContent: "center", alignItems: "center" }}>
                <Image source={{ uri: "http://173.0.0.247:8113/Images/" + data }} style={styles.image} />
            </View>
        </View>
    )
}

export default ImagePage

const styles = StyleSheet.create({
    image: {
        borderRadius: 10,
        marginTop: 50,
        width: 500,
        height: 450,
        resizeMode: 'contain', 
    },
});