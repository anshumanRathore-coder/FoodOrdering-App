import { useAuth } from "@/context/AuthProvider";
import { Redirect, Stack } from "expo-router";
export default function authLayout(){
    const {session}=useAuth();
    if(session){
        return<Redirect href={'/'}/>
    }
    return(
    <Stack>
        <Stack.Screen name="index" options={{title:"Login"}}/>
        <Stack.Screen name="sign-up" options={{title:"Signup"}}/>
    </Stack>
    )
}