import { defaultImage } from "@/constants"
import Colors from "@/constants/Colors"
import { Product, Tables } from "@/types"
import { useRoute } from "@react-navigation/native"
import { Link, useRouter, useSegments } from "expo-router"
import { Image, Pressable, StyleSheet, Text, View } from "react-native"
import RemoteImage from "./RemoteImage"

type ProductListItemProps={
    product:Tables<'products'>
}

const ProductListItem = ({product}:ProductListItemProps) => {
  const segment=useSegments();
  const path=segment[0]==="(admin)"?"/(admin)/menu":"/(user)/menu";

  return (
    <Link href={`${path}/${product.id}`} asChild>
    <Pressable  style={styles.container} >
    <RemoteImage
          path={product.image}
          fallback={defaultImage}
          style={styles.image}
          resizeMode="contain"
        />

    <Text style={styles.title}>{product.name}</Text>
    <Text style={styles.price}>{product.price}</Text>
  </Pressable>
  </Link>
  )
}

export default ProductListItem

const styles = StyleSheet.create({
    container: {
      backgroundColor:'white',
      padding:10,
      borderRadius:20,
      flex:1,
      maxWidth:'50%'
    },
    title: {
      fontSize: 20,
      fontWeight: 'bold',
    },
    price: {
      marginVertical: 5,
      color:Colors.light.tint
    },
    image: {
      width: '100%',
      aspectRatio: 1,
    },
  });
  