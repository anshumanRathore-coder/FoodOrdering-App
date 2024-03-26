import { ActivityIndicator, FlatList, StyleSheet } from 'react-native';

import EditScreenInfo from '@/components/EditScreenInfo';
import { Text, View } from '@/components/Themed';
import { Image } from 'react-native';
import Colors from '@/constants/Colors';
import ProductListItem from '@/components/ProductListItem';
import OrderListItem from '@/components/OrderListItem';
import { Stack } from 'expo-router';
import { useAdminOrders } from '@/api/orderes';
export default function TabOneScreen() {
  const {isLoading,data:orders,error}=useAdminOrders({archived:true});
  if(isLoading){
    return <ActivityIndicator/>  
  }
  if(error){
    return <Text>Unable to Fetch order</Text>
  }
  return (
    <View>
    <Stack.Screen options={{title:"Archive"}}/>
    <FlatList data={orders} renderItem={({item})=><OrderListItem order={item}/>}
    contentContainerStyle={{gap:10,padding:10}}
    // columnWrapperStyle={{gap:10}}
    />
    </View>
  );
}
