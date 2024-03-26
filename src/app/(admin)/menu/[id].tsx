import { defaultImage } from '@/constants';
import products from 'assets/data/products';
import { Link, Stack, useLocalSearchParams } from 'expo-router'
import React, { useState } from 'react'
import { Image, Pressable, StyleSheet, Text, View } from 'react-native'
import { sizesOption } from '@/constants';
import Colors from '@/constants/Colors';
import Button from '@/components/Button';
import { useCart } from '@/context/CartProvider';
import { PizzaSize } from 'assets/types';
import { useProduct } from '@/api/products';
import { FontAwesome } from '@expo/vector-icons';
import RemoteImage from '@/components/RemoteImage';
const Eachproduct = () => {
  const [selectedSize,setSelectedSize]=useState<PizzaSize>('M');
  const {id:idString} =useLocalSearchParams();
  const {data:product,isLoading,error}=useProduct(parseInt(typeof idString==='string'?idString:idString[0]));
  // let product=products.find((p)=>p.id.toString()===id)
  if(!product){
    return <Text>product not found</Text>
  }
  return (
    <View style={styles.container}>
        <Stack.Screen
        options={{
          title: 'Menu',
          headerRight: () => (
            <Link href={`/(admin)/menu/create?id=${idString}`} asChild>
              <Pressable>
                {({ pressed }) => (
                  <FontAwesome
                    name="pencil"
                    size={25}
                    color={Colors.light.tint}
                    style={{ marginRight: 15, opacity: pressed ? 0.5 : 1 }}
                  />
                )}
              </Pressable>
            </Link>
          ),
        }}
      />
       <Stack.Screen options={{title:product.name}}/>
       
       <RemoteImage
          path={product.image}
          fallback={defaultImage}
          style={styles.image}
          resizeMode="contain"
        />

       <Text style={{fontSize:20,fontWeight:"bold",marginTop:20}}>{product.name}</Text>
       <Text style={{fontSize:18,color:Colors.light.tint,marginTop:2}}>${product.price}</Text>

    </View>
  )
}

export default Eachproduct

const styles=StyleSheet.create({
  container:{
    padding:20,
    backgroundColor:'white',
    display:'flex',
    height:"100%"
  },
  image: {
    width: '100%',
    aspectRatio: 1,
  },
})


