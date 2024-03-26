import { defaultImage } from '@/constants';
import products from 'assets/data/products';
import { Stack, useLocalSearchParams } from 'expo-router'
import React, { useState } from 'react'
import { Image, Pressable, StyleSheet, Text, View } from 'react-native'
import { sizesOption } from '@/constants';
import Colors from '@/constants/Colors';
import Button from '@/components/Button';
import { useCart } from '@/context/CartProvider';
import { PizzaSize } from 'assets/types';
import { useProduct } from '@/api/products';
import RemoteImage from '@/components/RemoteImage';
const Eachproduct = () => {
  const [selectedSize,setSelectedSize]=useState<PizzaSize>('M');
  const {id:idString} =useLocalSearchParams();
  const {data:product,isLoading,error}=useProduct(parseInt(typeof idString==='string'?idString:idString[0]));
  const {addItem}=useCart()
  // let product=products.find((p)=>p.id.toString()===id)
  if(!product){
    return <Text>product not found</Text>
  }
  const addTocart=()=>{
    // console.log(addItem)
    // console.warn("Add to cart")
    addItem(product,selectedSize)
  }
  return (
    <View style={styles.container}>
       <Stack.Screen options={{title:product.name}}/>
       
       <RemoteImage
          path={product.image}
          fallback={defaultImage}
          style={styles.image}
          resizeMode="contain"
        />

       <Text style={{fontSize:20,fontWeight:"bold"}}>Select Size</Text>
       <View style={{display:'flex',flexDirection:"row",justifyContent:"space-between",alignItems:"center",marginVertical:20}}>

          {sizesOption.map((size,index)=>(
            <Pressable key={index} onPress={()=>setSelectedSize(size)}>
            <Text  style={{fontSize:15,backgroundColor:`${selectedSize===size?'gainsboro':'white'}`, color:`${selectedSize===size?'black':'gainsboro'}`, paddingVertical:10,paddingHorizontal:15,borderRadius:9999, borderCurve:"circular",fontWeight:'600'}} key={index}>{size}</Text>
          </Pressable>
          ))}

       </View>
       <View style={{marginTop:'auto'}}>
       <Text style={{fontWeight:"500",fontSize:16}}>Price:${product.price}</Text>

       <Button onPress={addTocart} text='Add to cart'/>
       </View>
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


