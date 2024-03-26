// import { useOrderDetails } from '@/api/orders';
// import { useUpdateOrderSubscription } from '@/api/orders/subscriptions';
import { useOrderDetails, useUpdateOrder } from '@/api/orderes';
import { useUpdateOrderSubscription } from '@/api/orderes/subscription';
import OrderItemListItem from '@/components/OrderItemListItem';
import OrderListItem from '@/components/OrderListItem';
import Colors from '@/constants/Colors';
import { OrderStatus } from '@/types';
import { OrderStatusList } from 'assets/types';
import { Stack, useLocalSearchParams } from 'expo-router';
import { ActivityIndicator, FlatList, Pressable, Text, View } from 'react-native';

export default function OrderDetailsScreen() {
  const { id:idStr} = useLocalSearchParams();
  const id = parseFloat(typeof idStr === 'string' ? idStr : idStr[0]);
  const {isLoading,data:order,error}=useOrderDetails(id);
  const {mutate:updateOrder}=useUpdateOrder();
  useUpdateOrderSubscription(id);
  const handleUpdate=(status:OrderStatus)=>{
    updateOrder({id,status})
  }
  if (isLoading) {
    return <ActivityIndicator />;
  }
  if (error) {
    return <Text>Failed to fetch</Text>;
  }

  return (
    <View style={{ padding: 10, gap: 20, flex: 1 }}>
      <Stack.Screen options={{ title: `Order #${id}` }} />

      <FlatList
        data={order?.order_items}
        // @ts-ignore
        renderItem={({ item }) => <OrderItemListItem item={item} />}
        contentContainerStyle={{ gap: 10 }}
        // ListHeaderComponent={(item) => <OrderListItem order={item} />}
      />

<Text style={{ fontWeight: 'bold' }}>Status</Text>
  <View style={{ flexDirection: 'row', gap: 5 }}>
    {OrderStatusList.map((status) => (
      <Pressable
        key={status}
        onPress={()=>handleUpdate(status)}
        style={{
          borderColor: Colors.light.tint,
          borderWidth: 1,
          padding: 10,
          borderRadius: 5,
          marginVertical: 10,
          backgroundColor:
            order?.status === status
              ? Colors.light.tint
              : 'transparent',
        }}
      >
        <Text
          style={{
            color:
              order?.status === status ? 'white' : Colors.light.tint,
          }}
        >
          {status}
        </Text>
      </Pressable>
    ))}
  </View>
    </View>
  );
}