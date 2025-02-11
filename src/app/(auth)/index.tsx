import Button from "@/components/Button";
import Colors from "@/constants/Colors";
import { supabase } from "@/lib/superbase";
import { router } from "expo-router";
import { useState } from "react";
import { Text, View,StyleSheet, TextInput, Alert } from "react-native"
const Login=()=>{
     const [email,setEmail]=useState("");
     const [password,setPassword]=useState("");
     const [error,setError]=useState("");
     const [loading,setLoading]=useState(false);
     const validate=()=>{
        setError('');
        if(!email){
            setError("Email is required");
            return false;
        }
        if(!password){
            setError("Password is required");
            return false;
        }
        return true;
     }
     const onSubmit=async()=>{
        if(!validate())return;
        setLoading(true)
        const {error}=await supabase.auth.signInWithPassword({email,password});
        if(error){
            Alert.alert(error.message)
        }
        setLoading(false)
     }
    return(
    <View style={styles.container}>
        <Text style={styles.label}>Email</Text>

        <TextInput style={styles.input} placeholder="Enter your email" onChangeText={setEmail}/>

        <Text style={styles.label}>Password</Text>

        <TextInput style={styles.input} secureTextEntry={true} placeholder="Enter your Password" onChangeText={setPassword}/>

        <Text style={{ color: 'red' }}>{error}</Text>

        <Button onPress={onSubmit} disabled={loading} text={loading?"Sign in...":"Sign in"}/>
        <Text style={styles.textButton} onPress={()=>router.push('/(auth)/sign-up')}>Create an account</Text>
    </View>
    )
 }

 export default Login;

 const styles=StyleSheet.create({
    container:{
        flex:1,
        justifyContent:'center',
        padding:20,
    },
    label:{
        fontSize:20,
    },
    input:{
      backgroundColor: 'white',
      padding: 10,
      borderRadius: 5,
      marginTop: 5,
      marginBottom: 20,
    },
    textButton: {
        alignSelf: 'center',
        fontWeight: 'bold',
        color: Colors.light.tint,
        marginVertical: 10,
      },
 })