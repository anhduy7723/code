import React, { useEffect, useState } from 'react';
import { View, Text, FlatList } from 'react-native';

const PendingConfirmationScreen = () => {
  const [orderedProducts, setOrderedProducts] = useState([]);

  useEffect(() => {
    const fetchOrderedProducts = async () => {
      try {
        const response = await fetch('http://localhost:3000/orders/1'); 
        setOrderedProducts(data);
      } catch (error) {
        console.error('Error fetching data:', error.message);
      }
    };

    fetchOrderedProducts();
  }, []);

  return (
    <View>
      {orderedProducts.length === 0 ? (
        <Text>No products ordered.</Text>
      ) : (
        <>
          <Text>Ordered Products</Text>
          <FlatList
            data={orderedProducts}
            keyExtractor={(item) => (item ? item._id.toString() : '')}
            renderItem={({ item }) => (
              <View>
                <Text>{item ? item.productName : ''}</Text>
                {/* Render other ordered product details */}
              </View>
            )}
          />
        </>
      )}
    </View>
  );
};

export default PendingConfirmationScreen;
