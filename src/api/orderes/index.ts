import { useAuth } from "@/context/AuthProvider"
import { supabase } from "@/lib/superbase"
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query"
import { Order } from "assets/types"

export const useAdminOrders=({archived=false})=>{
    const statuses=archived?["Delivered"]:["New","Cooking","Delivering"]
    return useQuery({
        queryKey:['orders',{archived}],
        queryFn:async()=>{
            const {data,error}=await supabase.from('orders').select("*").in('status',statuses)
            if(error){
                throw new Error(error.message)
            }
            return data;
        }
    })
}

export const useMyOrders = () => {
    const { session } = useAuth();
    const id = session?.user.id;
  
    return useQuery({
      queryKey: ['orders', { userId: id }],
      queryFn: async () => {
        if (!id) return null;
        const { data, error } = await supabase
          .from('orders')
          .select('*')
          .eq('user_id', id)
          .order('created_at', { ascending: false });
        if (error) {
          throw new Error(error.message);
        }
        return data;
      },
    });
  };
  
  export const useOrderDetails=(id:number)=>{
    return useQuery({
        queryKey:['order',id],
        queryFn:async()=>{
            const {data,error}=await supabase.from('orders').select('*, order_items(*, products(*))').eq('id',id).single();
            if(error)throw new Error(error.message);
            return data;
        }
    })
}

export const useInsertOrder = () => {
  const queryClient = useQueryClient();
  const { session } = useAuth();
  const user=session?.user
  return useMutation({
    async mutationFn({ total }: Pick<Order, 'total'>) {
      if (!user) return null;

      const { error, data } = await supabase
        .from('orders')
        .insert({
          total,
          user_id: user.id,
        })
        .select();

        console.log("error",error)
      if (error) {
        throw error;
      }
      return data[0];
    },
    async onSuccess() {
      // @ts-ignore
      await queryClient.invalidateQueries(['orders']);
    },
    onError(error) {
      console.log(error);
    },
  });
};

export const useUpdateOrder = () => {
  const queryClient = useQueryClient();

  return useMutation({
    async mutationFn({ id, status }: Pick<Order, 'id' | 'status'>) {
      const { data, error } = await supabase
        .from('orders')
        .update({ status })
        .eq('id', id)
        .select();

      if (error) {
        throw error;
      }
      return data;
    },
    async onSuccess(_, { id }) {
      // @ts-ignore
      await queryClient.invalidateQueries(['orders']);
      // @ts-ignore
      await queryClient.invalidateQueries(['order', id]);
    },
    onError(error) {
      console.log(error);
    },
  });
};