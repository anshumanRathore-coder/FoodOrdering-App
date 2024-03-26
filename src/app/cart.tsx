import Button from '@/components/Button';
import CartListItem from '@/components/CardListItems';
import { useCart } from '@/context/CartProvider'
import { StatusBar } from 'expo-status-bar'
import { FlatList, Platform, Text, View } from 'react-native'
const cart = () => {
  const {items,totalAmount,checkout}=useCart();
  return (
    <View style={{padding:10}}>
    <FlatList data={items} renderItem={({item})=><CartListItem cartItem={item}  /> }contentContainerStyle={{gap:10,padding:10}}/>
    <Text style={{fontWeight:"bold",fontSize:30}}>Total:$ {totalAmount.toFixed(2)}</Text>
    <Button onPress={checkout} text='Checkout'/>
    </View>
  )
}

export default cart
