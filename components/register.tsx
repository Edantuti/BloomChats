import { useAuthActions } from '@convex-dev/auth/react';
import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  StatusBar,
  ImageBackground,
} from 'react-native';
import { generateKeyPair } from '../utils';
import { encodeBase64 } from 'tweetnacl-util';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { api } from '../convex/_generated/api';
import { useAction, useMutation } from 'convex/react';
import { NavigationProp, useNavigation } from '@react-navigation/native';
import { RootStackParamList } from '../App';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { AuthComponent } from './login';

type registerScreenProp = NativeStackNavigationProp<RootStackParamList, "Register">
const Register = () => {
  const { signIn } = useAuthActions();
  const navigation = useNavigation<registerScreenProp>()
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState('');
  const createVerificationCode = useAction(api.users.sendEmail);
  const handleRegister = async () => {
    if (password.localeCompare(confirmPassword) !== 0) {
      setError('Error: Password not match');
      return;
    }
    await createVerificationCode({
      email:email,
      type:'signUp'
    })
    navigation.navigate('Verification', {email,password, type:'signUp'})
  };

  return (
    <AuthComponent>
      <Text style={styles.title}>Create an Account</Text>

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

      <TextInput
        style={styles.input}
        placeholder="Confirm Password"
        placeholderTextColor="#999"
        value={confirmPassword}
        onChangeText={setConfirmPassword}
        secureTextEntry
      />

      <TouchableOpacity style={styles.button} onPress={handleRegister}>
        <Text style={styles.buttonText}>Register</Text>
      </TouchableOpacity>

      <View style={styles.footer}>
        <Text style={styles.footerText}>Already have an account?</Text>
        <TouchableOpacity onPress={() => {
          navigation.navigate('Login')
        }}>
          <Text style={styles.signIn}>Sign In</Text>
        </TouchableOpacity>
      </View>
    </AuthComponent>
  );
};

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
    paddingTop: 30,
  },
  title: {
    fontSize: 30,
    color: '#fff',
    textAlign: 'center',
    marginBottom: 270,
    fontWeight: '700',

  },
  input: {
    backgroundColor: 'rgba(51, 51, 51, 0.7)', // Transparent background
    color: '#fff', // Text color unaffected by opacity
    padding: 15,
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
  footer: {
    flexDirection: 'row',
    justifyContent: 'center',
  },
  footerText: {
    color: '#bbb',
  },
  signIn: {
    color: '#DD651B',
    marginLeft: 5,
  },
});

export default Register;
