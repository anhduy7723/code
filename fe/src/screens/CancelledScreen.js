import React, { useEffect, useState } from 'react';
import { View, Text, FlatList } from 'react-native';

const CancelledScreen = () => {
  const [cancelledOrders, setCancelledOrders] = useState([]);

  useEffect(() => {
    const fetchCancelledOrders = async () => {
      try {
        const response = await fetch('http://localhost:3000/orders/3'); // Fetch orders with status 3
        const data = await response.json();
        setCancelledOrders(data);
      } catch (error) {
        console.error('Error fetching data:', error.message);
      }
    };

    fetchCancelledOrders();
  }, []);

  return (
    <View>
      {cancelledOrders.length === 0 ? (
        <Text>No cancelled orders.</Text>
      ) : (
        <>
          <Text>Cancelled Orders</Text>
          <FlatList
            data={cancelledOrders}
            keyExtractor={(item) => (item ? item._id.toString() : '')}
            renderItem={({ item }) => (
              <View>
                <Text>{item ? item.productName : ''}</Text>
                {/* Render other cancelled order details */}
              </View>
            )}
          />
        </>
      )}
    </View>
  );
};

export default CancelledScreen;
