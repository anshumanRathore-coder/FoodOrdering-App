import { CartItem, Tables } from "@/types";
import { PizzaSize, Product } from "assets/types";
import { createContext, PropsWithChildren, useContext, useState } from "react"
import {randomUUID} from 'expo-crypto'
import { useRouter } from "expo-router";
import { useInsertOrder } from "@/api/orderes";
import { useInsertOrderItems } from "@/api/order_items";
type cartType={
  items:CartItem[]
  addItem:(product:Tables<'products'>,size:PizzaSize)=>void
  updateQuantity:(id:string,amount:1 | -1)=>void
  totalAmount:number,
  checkout:()=>void
}
export const cartContext=createContext<cartType>({
  items:[],
  addItem:()=>{},
  updateQuantity:()=>{},
  totalAmount:0,
  checkout:()=>{},
});
export const CartProvider = ({children}:PropsWithChildren) => {
  const router=useRouter();
  const [items,setItems]=useState<CartItem[]>([])
  const totalAmount=items.reduce((sum,item)=>sum+=item.product.price*item.quantity,0)
  const {mutate:createOrder}=useInsertOrder()
  const {mutate:insertOrderItems}=useInsertOrderItems();
  const addItem=(product:Product,size:PizzaSize)=>{
    const existingItem=items.find(item=>item.product===product &&item.size===size);
    if(existingItem){
      updateQuantity(existingItem.id,1);
      router.push('/cart')
      return;
    }
    const newItem:CartItem={
      id:randomUUID(),
      product,
      product_id:product.id,
      size,
      quantity:1
    }
    setItems([newItem,...items]);
    router.push('/cart')
  }
  const updateQuantity=(id:String,amount:1 | -1)=>{
    setItems(items.map((item)=>(
      item.id!==id?item:{...item,quantity:item.quantity+amount}
    )).filter((item)=>item.quantity>0))
  }

  const checkout=()=>{
    createOrder({total:totalAmount},{
      onSuccess:(data)=>{
        saveItem(data)
      }
    })
  }

  const saveItem=(newOrder:any)=>{
    // console.log("newOrder",newOrder);
    if(!newOrder)return;
    insertOrderItems({
      items,
      order_id:newOrder.id
    },{
      onSuccess() {
        setItems([]);
        router.back()
      },
    })
  }
  return (
    <cartContext.Provider value={{items,addItem,updateQuantity,totalAmount,checkout}}>
      {children}
    </cartContext.Provider>
  )
}

export default CartProvider

export const useCart=()=>useContext(cartContext);
