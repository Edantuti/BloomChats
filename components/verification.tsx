import { useState } from "react"
import { AuthComponent } from "./login"
import { NavigationProp, RouteProp } from "@react-navigation/native";
import { Dimensions, TextInput, TouchableOpacity } from "react-native";
import { View, Text } from "react-native";
import { useAuthActions } from "@convex-dev/auth/react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useMutation } from "convex/react";
import { api } from "../convex/_generated/api";
import { encodeBase64 } from "tweetnacl-util";
import { generateKeyPair } from "../utils";

const height = Dimensions.get('screen').height
const width = Dimensions.get('screen').width

export const VerificationScreen = ({ navigation, route }: { navigation: NavigationProp<any>, route: RouteProp<any> }) => {
    const [code, setCode] = useState<string>("");
    const { signIn } = useAuthActions();
    const [err,setErr] = useState<string>("");
    
    const setPublicKey = useMutation(api.users.setPublicKey);
    const checkVerificationCode = useMutation(api.users.checkVerificationCode)
    
    async function handleSubmit() {
        const email = route.params?.email
        const password = route.params?.password
        const type = route.params?.type
        if(!(await checkVerificationCode({email:email, code:code, type:type}))){
            setErr('Error: Invalid Code');
            return;
        }
        if (route.params!.type === "signIn") {
            try {
                await signIn("password", { email: email, password: password, flow: "signIn" })
                await AsyncStorage.setItem('email', email);
                navigation.navigate('Chat', { email: email })
            } catch (error) {
                console.error(error);
            }
        } else {
            const userKeys = generateKeyPair();
            try {
                await signIn("password", { email, password, flow: "signUp" })
                await AsyncStorage.setItem('privKey', encodeBase64(userKeys.secretKey));
                await AsyncStorage.setItem('email', email);
                await AsyncStorage.setItem(email, encodeBase64(userKeys.secretKey));
                await setPublicKey({ email: email, publicKey: encodeBase64(userKeys.publicKey) });
                navigation.navigate('Chat', { email: email })
            } catch (error) {
                console.error(error);
            }
        }
    }
    return (
        <AuthComponent>
            <View style={{
                display: 'flex',
                height: height,
                justifyContent: 'center'
            }}>
                <Text style={{
                    paddingVertical: 10,
                    fontWeight: 900,
                    fontSize: 20,
                }}>Verification Code</Text>
                <TextInput style={{
                    backgroundColor: 'rgba(51, 51, 51, 0.7)', // Transparent background
                    color: '#fff', // Text color unaffected by opacity
                    padding: 15,
                    borderRadius: 10,
                    marginBottom: 20,
                    fontWeight: '900',
                }} placeholder="Verification Code" value={code} onChangeText={setCode} keyboardType="number-pad" />
                <TouchableOpacity style={{
                    backgroundColor: '#DD651B',
                    opacity: 0.8,
                    padding: 15,
                    borderRadius: 10,
                    alignItems: 'center',
                    marginBottom: 20,
                }} onPress={handleSubmit}>
                    <Text style={{
                        color: '#fff',
                        fontSize: 16,
                    }}>Verify</Text>
                </TouchableOpacity>
            </View>
        </AuthComponent>
    )
}