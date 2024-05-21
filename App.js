import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import HomeScreen from './src/HomeScreen';
import Map from './src/Map';
import Log from './src/Log';
import Leave from './src/Leave';
import LeaveSummary from './src/LeaveSummary';
import ApplyLeave from './src/ApplyLeave';
import Permission from './src/Permission';
import ApplyPermission from './src/ApplyPermission';
import InOutPermission from './src/InOutPermission';
import PermissionReport from './src/PermissionReport';
import OutPunch from './src/OutPunch';
import LoginScreen from './src/LoginScreen';
import Splash from './src/Splash';
import ImagePage from './src/ImagePage';
import OtherLocation from './src/OtherLocation';
import OdAttendance from './src/OdAttendance';

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="splash" component={Splash} options={{ headerShown: false, headerTintColor: 'grey', statusBarColor: '#ce93fa' }} />
        <Stack.Screen name="login" component={LoginScreen} options={{ headerShown: false, headerTintColor: 'grey', statusBarColor: '#ce93fa' }} />
        <Stack.Screen name="Home" component={HomeScreen} options={{ headerShown: false, headerTintColor: 'grey', statusBarColor: '#ce93fa' }} />
        <Stack.Screen name="Map" component={Map} options={{ headerTintColor: 'grey' }} />
        <Stack.Screen name="Attendance Log" component={Log} options={{ headerTintColor: 'grey', statusBarColor: '#ce93fa' }} />
        <Stack.Screen name="Leave" component={Leave} options={{ headerTintColor: 'grey', statusBarColor: '#ce93fa' }} />
        <Stack.Screen name='Apply Leave' component={ApplyLeave} options={{ headerTintColor: 'grey', statusBarColor: '#ce93fa' }} />
        <Stack.Screen name='Leave Summary' component={LeaveSummary} options={{ headerTintColor: 'grey', statusBarColor: '#ce93fa' }} />
        <Stack.Screen name='Permission' component={Permission} options={{ headerTintColor: 'grey', statusBarColor: '#ce93fa' }} />
        <Stack.Screen name='Apply Permission' component={ApplyPermission} options={{ headerTintColor: 'grey', statusBarColor: '#ce93fa' }} />
        <Stack.Screen name='IN/OUT' component={InOutPermission} options={{ headerTintColor: 'grey', statusBarColor: '#ce93fa' }} />
        <Stack.Screen name='Permission Report' component={PermissionReport} options={{ headerTintColor: 'grey', statusBarColor: '#ce93fa' }} />
        <Stack.Screen name='Out Punch' component={OutPunch} options={{ headerTintColor: 'grey', statusBarColor: '#ce93fa' }} />
        <Stack.Screen name='image' component={ImagePage} options={{ headerTintColor: 'grey', statusBarColor: '#ce93fa' }} />
        <Stack.Screen name='other' component={OtherLocation} options={{ headerTintColor: 'grey', statusBarColor: '#ce93fa' }} />
        <Stack.Screen name='OD' component={OdAttendance} options={{ headerTintColor: 'grey', statusBarColor: '#ce93fa' }} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
