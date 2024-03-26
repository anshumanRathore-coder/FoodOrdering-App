import { View, Text } from 'react-native';
import React from 'react';
import Button from '../components/Button';
import { Link, Redirect, Stack, useSegments } from 'expo-router';
import { useAuth } from '@/context/AuthProvider';
import { supabase } from '@/lib/superbase';

const index = () => {
  const {session,isAdmin}=useAuth();
  console.log("isAdmin",isAdmin);
  
  if(!session){
    return <Redirect href={'/(auth)/'}/>
  }
  if(!isAdmin){
    return <Redirect href={'/(user)/'}/>
  }
  return (
    <View style={{ flex: 1, justifyContent: 'center', padding: 10 }}>
      <Stack.Screen options={{title:"Home"}}/>
      <Link href={`/(user)`} asChild>
        <Button  text="User" />
      </Link>
      <Link href={'/(admin)'} asChild>
        <Button  text="Admin" />
      </Link>
      <Button onPress={() => supabase.auth.signOut()} text="Sign out" />
    </View>
  );
};

export default index;