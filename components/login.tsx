import { useAuthActions } from '@convex-dev/auth/react';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import React, { ReactNode, useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  StatusBar,
  ImageBackground,
} from 'react-native';
import { RootStackParamList } from '../App';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useAction, useConvexAuth, useMutation } from 'convex/react';
import { api } from '../convex/_generated/api';

type loginScreenProp = NativeStackNavigationProp<RootStackParamList, "Login">

const Login = () => {
  const { isLoading, isAuthenticated } = useConvexAuth();

  const navigation = useNavigation<loginScreenProp>();
  if (isAuthenticated) {
    directChat();
  }

  async function directChat() {
    const localEmail = await AsyncStorage.getItem('email');

    if (localEmail) {
      navigation.navigate('Chat', { email: localEmail });
    }
  }
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const createVerificationCode = useAction(api.users.sendEmail);
  const handleLogin = async () => {
    await createVerificationCode({
      email:email,
      type:'signIn'
    })
    navigation.navigate('Verification',{email:email, password:password, type:'signIn'});
  };

  return (
    <AuthComponent>
      {!isLoading ? (<><Text style={styles.title}>Welcome Back!</Text>

        <TextInput
          style={styles.input}
          placeholder="Email"
          placeholderTextColor="#999"
          value={email}
          onChangeText={setEmail}
          keyboardType="email-address"
        />

        <TextInput
          style={styles.input}
          placeholder="Password"
          placeholderTextColor="#999"
          value={password}
          onChangeText={setPassword}
          secureTextEntry
        />

        <TouchableOpacity style={styles.button} onPress={handleLogin}>
          <Text style={styles.buttonText}>Login</Text>
        </TouchableOpacity>

        <TouchableOpacity>
          <Text style={styles.forgotPassword}>Forgot Password?</Text>
        </TouchableOpacity>

        <View style={styles.footer}>
          <Text style={styles.footerText}>Don't have an account?</Text>
          <TouchableOpacity onPress={() => {
            navigation.navigate("Register")
          }}>
            <Text style={styles.signUp}>Sign Up</Text>
          </TouchableOpacity>
        </View></>) : (<Text>Loading</Text>)}
    </AuthComponent>
  );
};

export const AuthComponent = ({ children }: { children: ReactNode }) => {
  return (
    <ImageBackground
      source={require('../assets/images/login_imagef1.jpg')} // Replace with your image path
      style={styles.background}
      resizeMode="cover"
    >
      <View style={styles.overlay}>
        <StatusBar barStyle="light-content" />
        {children}
      </View>
    </ImageBackground>
  )
}

const styles = StyleSheet.create({
  background: {
    flex: 1,
    justifyContent: 'center',
  },
  overlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'flex-start',
    paddingHorizontal: 20,
    paddingTop: 20,
  },
  title: {
    fontSize: 30,
    color: '#fff',
    textAlign: 'center',
    marginBottom: 355,
    fontWeight: '700',
  },
  input: {
    backgroundColor: 'rgba(51, 51, 51, 0.7)', // Transparent background
    color: '#fff', // Text color unaffected by opacity
    padding: 10,
    borderRadius: 10,
    marginBottom: 20,
    fontWeight: '900',
  },
  button: {
    backgroundColor: '#DD651B',
    opacity: 0.8,
    padding: 15,
    borderRadius: 10,
    alignItems: 'center',
    marginBottom: 20,
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
  },
  forgotPassword: {
    color: '#bbb',
    textAlign: 'center',
    marginBottom: 30,
  },
  footer: {
    flexDirection: 'row',
    justifyContent: 'center',
  },
  footerText: {
    color: '#bbb',
  },
  signUp: {
    color: '#DD651B',
    marginLeft: 5,
  },
});

export default Login;
