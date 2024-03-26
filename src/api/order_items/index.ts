import { supabase } from "@/lib/superbase"
import { CartItem } from "@/types";
import { useMutation } from "@tanstack/react-query"

export const useInsertOrderItems = () => {
    return useMutation({
      async mutationFn({
        items,
        order_id,
      }: {
        items: CartItem[];
        order_id: number;
      }) {
        // console.log('order-id',order_id)
        const { error } = await supabase.from('order_items').insert(
          items.map((item) => ({
            size: item.size,
            quantity: item.quantity,
            order_id: order_id,
            product_id: item.product_id,
          }))
        );
  
        if (error) {
          throw error;
        }
      },
      onError(error) {
        console.log(error);
      },
    });
  };