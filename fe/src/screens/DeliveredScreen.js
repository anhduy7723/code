import React, { useEffect, useState } from 'react';
import { View, Text, FlatList } from 'react-native';

const DeliveredScreen = () => {
  const [deliveredOrders, setDeliveredOrders] = useState([]);

  useEffect(() => {
    const fetchDeliveredOrders = async () => {
      try {
        const response = await fetch('http://localhost:3000/orders/2'); // Fetch orders with status 2
        const data = await response.json();
        setDeliveredOrders(data);
      } catch (error) {
        console.error('Error fetching data:', error.message);
      }
    };

    fetchDeliveredOrders();
  }, []);

  return (
    <View>
      {deliveredOrders.length === 0 ? (
        <Text>No delivered orders.</Text>
      ) : (
        <>
          <Text>Delivered Orders</Text>
          <FlatList
            data={deliveredOrders}
            keyExtractor={(item) => (item ? item._id.toString() : '')}
            renderItem={({ item }) => (
              <View>
                <Text>{item ? item.productName : ''}</Text>
                {/* Render other delivered order details */}
              </View>
            )}
          />
        </>
      )}
    </View>
  );
};

export default DeliveredScreen;
