import { supabase } from "@/lib/superbase"
import { Product } from "@/types"
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query"

export const useProductList=()=>{
    return useQuery({
        queryKey:['products'],
        queryFn:async()=>{
            const {data,error}=await supabase.from('products').select("*");
            if(error){
                throw new Error(error.message)
            }
            else{
                return data
            }
        }
    })
}

export const useProduct=(id:number)=>{
    return useQuery({
        queryKey:['product',id],
        queryFn:async()=>{
            const {data,error}=await supabase.from('products').select('*, order_items(*, products(*))').eq('id',id).single()
            if(error){
                throw new Error(error.message)
            }
            else{
                return data
            }
        }
    })
}

export const useInsertProduct=()=>{
    const queryClient=useQueryClient()
    return useMutation({
        async mutationFn(data:Omit<Product,'id'>){
         const {error,data:newProduct}=await supabase.from('products').insert({
            name:data.name,
            price:data.price,
            image:data.image
         })
         if(error){
            throw error
         }
        },
        async onSuccess(){
            // @ts-ignore
            await queryClient.invalidateQueries(['products']);
        }
    })
}

export const useUpdateProduct=()=>{
    const queryClient=useQueryClient();
    return useMutation({
        async mutationFn({id,...update}:Product){
            const {data,error}=await supabase.from('products').update(update).eq('id',id).single();
            if(error){
                throw error;
            }
            return data
        },
        async onSuccess(_,data){
            // @ts-ignore
            await queryClient.invalidateQueries(['products']);
            // @ts-ignore
            await queryClient.invalidateQueries(['product',data.id])
        }
    })
}

export const useDeleteProduct=()=>{
    const queryClient=useQueryClient();
    return useMutation({
        async mutationFn(id:number){
            // @ts-ignore
            const {error}=await supabase.from('products').delete(id).eq('id',id);
            if(error){
                throw error;
            }
        },
        async onSuccess(_,data){
            // @ts-ignore
            await queryClient.invalidateQueries(['products']);
        }
    })
}

