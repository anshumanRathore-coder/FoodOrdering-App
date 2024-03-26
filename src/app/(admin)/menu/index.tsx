import { ActivityIndicator, FlatList, StyleSheet } from 'react-native';

import EditScreenInfo from '@/components/EditScreenInfo';
import { Text, View } from '@/components/Themed';
import { Image } from 'react-native';
import Colors from '@/constants/Colors';
import ProductListItem from '@/components/ProductListItem';
// import products from 'assets/data/products';
import { supabase } from '@/lib/superbase';
import { useProductList } from '@/api/products';
export default function TabOneScreen() {
  const {data:products,error,isLoading}=useProductList();
  if(isLoading){
    return <ActivityIndicator/>
  }
  if(error){
    return <Text>Unable to fetch Data</Text>
  }
  return (
    <FlatList data={products} renderItem={({item})=><ProductListItem product={item}/>}
    numColumns={2}
    contentContainerStyle={{gap:10,padding:10}}
    columnWrapperStyle={{gap:10}}
    />
  );
}
