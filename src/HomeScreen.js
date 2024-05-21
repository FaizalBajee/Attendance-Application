import { StyleSheet, Text, TextInput, onPress, Touchable, TouchableOpacity, View, Image } from 'react-native'
import React, { useEffect, useState } from 'react'
import { ScrollView } from 'react-native'
import { FontAwesome5, Entypo } from '@expo/vector-icons';
import AsyncStorage from '@react-native-async-storage/async-storage';

const HomeScreen = ({ navigation }) => {

    const [name, setName] = useState('')
    const [showPlan, setShowPlan] = useState(false)
    const [Plan, setPlan] = useState('');
    const [eid, setEid] = useState("")


    useEffect(() => {
        getName();
        getEID();
    }, []);
  // Fetch data from AsyncStorage
    const getName = async () => {
        try {
            const storedData = await AsyncStorage.getItem("Ename");
            if (storedData !== null) {
                setName(storedData);
                // console.log(storedData)
            }
        } catch (error) {
            console.error('Error fetching data:', error);
        }
    };
    // Fetch data from AsyncStorage
    const getEID = async () => {
        try {
            const storedData = await AsyncStorage.getItem("employee");
            if (storedData !== null) {
                setEid(storedData);
                // console.log(storedData)
            }
        } catch (error) {
            console.error('Error fetching data:', error);
        }
    };

    const handleAttendence = () => {
        navigation.navigate('Map');
    }
    const handleLog = () => {
        navigation.navigate('Attendance Log');
    }
    const handleLeave = () => {
        navigation.navigate('Leave');
    }
    const handlePermission = () => {
        navigation.navigate('Permission');
    }
    const hanldeOutPunch = () => {
        navigation.navigate('Out Punch');
    }
    const handlePlan = () => {
        setShowPlan(true);
    }

    const handlePlanOK = () => {

        fetch("http://173.0.0.247:8113/Plan", {
            method: "POST",
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                emp: eid,
                plan: Plan
            })
        }).then((Response) => Response.json())
            .catch((error) => console.log(error))
        setShowPlan(false)
    }

    const handleOtherLocation =()=>{
        navigation.navigate("other")
    }

    const LOGOUT = async () => {
        try {
            await AsyncStorage.clear();
            console.log('Item with key deleted successfully.');
        } catch (error) {
            console.error('Error deleting item:', error);
        }
    }

    return (

        <View style={{ backgroundColor: '#f5f5f2', flex: 1 }}>
            <ScrollView showsVerticalScrollIndicator={false}>
                <Text style={{ fontSize: 26, fontWeight: "bold", color: "grey", padding: 10, marginLeft: 10, marginTop: 30 }}>Hello, {name} </Text>
                <View style={{ padding: 10, alignItems: 'center' }}>
                    {/* 1.Att 2.Log */}
                    <View style={{ flexDirection: 'row', marginTop: 20 }} >
                        <TouchableOpacity onPress={handleAttendence} style={{
                            backgroundColor: 'white', width: 170, height: 170, justifyContent: 'center', alignItems: 'center', borderRadius: 20, shadowOffset: {
                                width: 0,
                                height: 2,
                            },
                            shadowOpacity: 0.25,
                            shadowRadius: 3.84,
                            elevation: 5,
                        }}>
                            <Image source={require('../assets/Attendance.png')} style={{ width: 90, height: 90, alignItems: 'center' }} />
                            <Text style={{ padding: 10, fontSize: 18, color: '#7a7a79', fontWeight: 'bold' }}>Attendance</Text>
                        </TouchableOpacity>

                        <TouchableOpacity onPress={handleLog} style={{
                            backgroundColor: 'white', width: 170, height: 170, marginLeft: 20, justifyContent: 'center', alignItems: 'center', borderRadius: 20, shadowOffset: {
                                width: 0,
                                height: 2,
                            },
                            shadowOpacity: 0.25,
                            shadowRadius: 3.84,
                            elevation: 5,
                        }}>
                            <Image source={require('../assets/log.png')} style={{ width: 90, height: 90, alignItems: 'center' }} />
                            <Text style={{ padding: 10, fontSize: 18, color: '#7a7a79', fontWeight: 'bold' }}>Log </Text>
                        </TouchableOpacity>
                    </View>
                    {/* //1.permssion 2.Leave */}
                    <View style={{ flexDirection: 'row', marginTop: 40 }}>
                        <TouchableOpacity onPress={handlePermission} style={{
                            backgroundColor: 'white', width: 170, height: 170, justifyContent: 'center', alignItems: 'center', borderRadius: 20, shadowOffset: {
                                width: 0,
                                height: 2,
                            },
                            shadowOpacity: 0.25,
                            shadowRadius: 3.84,
                            elevation: 5,
                        }}>
                            <Image source={require('../assets/Permission.png')} style={{ width: 90, height: 90, alignItems: 'center' }} />
                            <Text style={{ padding: 10, fontSize: 18, color: '#7a7a79', fontWeight: 'bold' }}>Permission</Text>
                        </TouchableOpacity>

                        <TouchableOpacity onPress={handleLeave} style={{
                            backgroundColor: 'white', width: 170, height: 170, borderRadius: 20, justifyContent: 'center', alignItems: 'center', marginLeft: 20, shadowOffset: {
                                width: 0,
                                height: 2,
                            },
                            shadowOpacity: 0.25,
                            shadowRadius: 3.84,
                            elevation: 5,
                        }}>
                            <Image source={require('../assets/Leave.png')} style={{ width: 90, height: 90, alignItems: 'center' }} />
                            <Text style={{ padding: 10, fontSize: 18, color: '#7a7a79', fontWeight: 'bold' }}>Leave</Text>
                        </TouchableOpacity>
                    </View>
                    {/* //1.out punch 2.Plan */}
                    <View style={{ flexDirection: 'row', marginTop: 40 }}>
                        <TouchableOpacity onPress={hanldeOutPunch} style={{
                            backgroundColor: 'white', width: 170, height: 170, justifyContent: 'center', alignItems: 'center', borderRadius: 20, shadowOffset: {
                                width: 0,
                                height: 2,
                            },
                            shadowOpacity: 0.25,
                            shadowRadius: 3.84,
                            elevation: 5,
                        }}>
                            <Image source={require('../assets/out.png')} style={{ width: 80, height: 80, alignItems: 'center' }} />
                            <Text style={{ padding: 10, fontSize: 18, color: '#7a7a79', fontWeight: 'bold' }}>Out Punch</Text>
                        </TouchableOpacity>

                        <TouchableOpacity style={{
                            backgroundColor: 'white', width: 170, height: 170, borderRadius: 20, justifyContent: 'center', alignItems: 'center', marginLeft: 20, shadowOffset: {
                                width: 0,
                                height: 2,
                            },
                            shadowOpacity: 0.25,
                            shadowRadius: 3.84,
                            elevation: 5,
                        }} onPress={handlePlan}>
                            <Image source={require('../assets/Plan.png')} style={{ width: 100, height: 100, alignItems: 'center' }} />
                            <Text style={{ padding: 10, fontSize: 18, color: '#7a7a79', fontWeight: 'bold' }}>Plan</Text>
                        </TouchableOpacity>
                    </View>
                    {/* //1.Approve 2.other location */}
                    {/* <View style={{ flexDirection: 'row', marginTop: 40 }}>
                        <TouchableOpacity style={{
                            backgroundColor: 'white', width: 170, height: 170, justifyContent: 'center', alignItems: 'center', borderRadius: 20, shadowOffset: {
                                width: 0,
                                height: 2,
                            },
                            shadowOpacity: 0.25,
                            shadowRadius: 3.84,
                            elevation: 5,
                        }}>
                            <Image source={require('../assets/Approve.png')} style={{ width: 100, height: 100, alignItems: 'center' }} />
                            <Text style={{ padding: 10, fontSize: 18, color: '#7a7a79', fontWeight: 'bold' }}>Approve</Text>
                        </TouchableOpacity>

                        <TouchableOpacity onPress={handleOtherLocation} style={{
                            backgroundColor: 'white', width: 170, height: 170, borderRadius: 20, justifyContent: 'center', alignItems: 'center', marginLeft: 20, shadowOffset: {
                                width: 0,
                                height: 2,
                            },
                            shadowOpacity: 0.25,
                            shadowRadius: 3.84,
                            elevation: 5,
                        }}>
                            <Image source={require('../assets/Location.png')} style={{ width: 100, height: 100, alignItems: 'center' }} />
                            <Text style={{ padding: 10, fontSize: 18, color: '#7a7a79', fontWeight: 'bold' }}>Other Location</Text>
                        </TouchableOpacity>
                    </View> */}
                    {/* //1.on duty 2.Sunday at */}
                    {/* <View style={{ flexDirection: 'row', marginTop: 20 }}>
                        <TouchableOpacity style={{
                            backgroundColor: 'white', width: 170, height: 170, borderRadius: 20, justifyContent: 'center', alignItems: 'center', shadowOffset: {
                                width: 0,
                                height: 2,
                            },
                            shadowOpacity: 0.25,
                            shadowRadius: 3.84,
                            elevation: 5,
                        }}>
                            <Image source={require('../assets/OnDuty.png')} style={{ width: 90, height: 90, alignItems: 'center' }} />
                            <Text style={{ padding: 10, fontSize: 18, color: '#7a7a79', fontWeight: 'bold' }}>ON Duty</Text>
                        </TouchableOpacity>

                        <TouchableOpacity style={{
                            backgroundColor: 'white', width: 170, height: 170, borderRadius: 20, justifyContent: 'center', alignItems: 'center', marginLeft: 20, shadowOffset: {
                                width: 0,
                                height: 2,
                            },
                            shadowOpacity: 0.25,
                            shadowRadius: 3.84,
                            elevation: 5,
                        }}>
                            <Image source={require('../assets/SundayAt.png')} style={{ width: 90, height: 90, alignItems: 'center' }} />
                            <Text style={{ padding: 10, fontSize: 18, color: '#7a7a79', fontWeight: 'bold' }}>Sunday At</Text>
                        </TouchableOpacity>
                    </View> */}
                </View>
            </ScrollView>

            {showPlan && (
                <View style={{
                    backgroundColor: 'white', width: 240, height: 170, alignItems: 'center', borderRadius: 20, borderColor: 'grey', position: 'absolute', marginTop: 250, marginLeft: 80, shadwOffset: {
                        width: 0,
                        height: 2,
                    },
                    shadowOpacity: 0.25,
                    shadowRadius: 3.84,
                    elevation: 5,
                }}>
                    <Text style={{ fontSize: 20 }}>Plan</Text>
                    <TextInput style={{ borderBottomWidth: 1, width: 130, marginTop: 20 }} placeholder='Enter the Plan' onChangeText={(plan) => { setPlan(plan) }}></TextInput>
                    <View style={{ flexDirection: 'row' }}>
                        <TouchableOpacity onPress={handlePlanOK} style={{ marginTop: 40, backgroundColor: 'yellow', borderRadius: 10, width: 50, height: 30, justifyContent: 'center', alignItems: 'center' }}>
                            <Text style={{ color: 'grey' }}>ok</Text>
                        </TouchableOpacity>
                        <TouchableOpacity onPress={() => setShowPlan(false)} style={{ marginTop: 40, marginLeft: 20, backgroundColor: 'yellow', borderRadius: 10, width: 50, height: 30, justifyContent: 'center', alignItems: 'center' }}>
                            <Text style={{ color: 'grey' }}>Cancel</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            )}
            <TouchableOpacity style={styles.button} onPress={LOGOUT}>
                <Text style={styles.buttonText}>Logout</Text>
            </TouchableOpacity>

        </View>
    )
}

export default HomeScreen

const styles = StyleSheet.create({
    button: {
        backgroundColor: '#ff0000', 
        padding: 15,
        borderRadius: 8, 
    },
    buttonText: {
        color: '#fff', 
        fontSize: 16,
        fontWeight: 'bold',
        textAlign: 'center',
    },
});