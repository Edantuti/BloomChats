
/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import {
  StyleSheet,
  Text,
} from 'react-native';
import RootLayout from './_layout';
import { SignIn } from './auth_components/SignIn';
// import { NavigationContainer } from '@react-navigation/native';
// import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { ChatComponent } from './auth_components/ChatComponent';
import CallPage from './components/call';
import Home from './components/homepage';
import Login from './components/login';

import Chatbox from './components/chatbox';
import { Id } from './convex/_generated/dataModel';
import GroupComponent from './auth_components/GroupComponent';
import Testing from './auth_components/Testing';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { NavigationContainer } from '@react-navigation/native';
import Register from './components/register';
import ChatScreen from './components/chatScreen';
import { VerificationScreen } from './components/verification';

export type RootStackParamList = {
  CallPage:undefined;
  Login: undefined;
  Chat: { email: string };
  Group: undefined;
  Register: undefined;
  Verification:{email:string, password:string, type:'signUp'|'signIn'},
  GroupChat: { groupId: Id<'groups'>; email: string };
  Test: undefined;
}

const Stack = createNativeStackNavigator<RootStackParamList>();

function App() {

  return (
    <RootLayout>
      <NavigationContainer >
        <Stack.Navigator screenOptions={{
          headerShown: false
        }} initialRouteName='Login'>
          <Stack.Screen name="Login" component={Login} />
          <Stack.Screen name="Register" component={Register} />
          <Stack.Screen name="Chat" component={ChatScreen} />
          <Stack.Screen name="Test" component={Testing} />
          <Stack.Screen name="Verification" component={VerificationScreen} />
          <Stack.Screen name="GroupChat" component={Chatbox}/>
        </Stack.Navigator>
      </NavigationContainer>
    </RootLayout>)
}

const styles = StyleSheet.create({
  sectionContainer: {
    marginTop: 32,
    paddingHorizontal: 24,
  },
  sectionTitle: {
    fontSize: 24,
    fontWeight: '600',
  },
  sectionDescription: {
    marginTop: 8,
    fontSize: 18,
    fontWeight: '400',
  },
  highlight: {
    fontWeight: '700',
  },
});

export default App;
