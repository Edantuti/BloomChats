import AsyncStorage from "@react-native-async-storage/async-storage";
import { useMutation, useQuery } from "convex/react";
import { useState } from "react";
import { Button, Text, TextInput, View } from "react-native";
import { api } from "../convex/_generated/api";
import { useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { RootStackParamList } from "../App";

type chatScreenProp = NativeStackNavigationProp<RootStackParamList, "Chat">

export function TestComponent(){
    const navigation = useNavigation<chatScreenProp>();
    const [groupName, setGroupName] = useState<string>("");
    const [toEmail ,setToEmail] = useState<string>("");
    const createGroup = useMutation(api.groups.createGroup);
    const joinGroup = useMutation(api.groups.joinGroup);
    async function handleGroupCreation(){
    const email = await AsyncStorage.getItem('email');
        const value = await createGroup({
            name:groupName,
            description:"",
            isDm:true,
            email:email!
        })
        if(value.error){
            console.log(value.error);
            return;
        }
        const another = await joinGroup({
            email: toEmail!,
            groupId: value!.data!.groupId
        })
        if(another.error){
            console.log(another.error);
            return;
        }
        navigation.navigate('GroupChat', {groupId:value.data!.groupId, email:email!})
    }
    return (
        <View>
            <TextInput onChangeText={setGroupName} placeholder="Group name"/>
            <TextInput onChangeText={setToEmail} placeholder="To email"/>
            <Button onPress={()=>{
                handleGroupCreation();
            }} title="Submit" />
        </View>
    )
}