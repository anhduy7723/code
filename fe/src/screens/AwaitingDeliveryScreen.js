import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, ActivityIndicator } from 'react-native';

const AwaitingDeliveryScreen = ({ route }) => {
  const [notOrderedProducts, setNotOrderedProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchNotOrderedProducts = async () => {
      try {
        const response = await fetch('http://localhost:3000/orders/0');
        if (!response.ok) {
          throw new Error('Failed to fetch data');
        }
        const data = await response.json();
        setNotOrderedProducts(data);
      } catch (error) {
        console.error('Error fetching data:', error.message);
        setError('Failed to fetch data. Please try again.');
      } finally {
        setLoading(false);
      }
    };

    fetchNotOrderedProducts();
  }, []);

  if (loading) {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <ActivityIndicator size="large" color="blue" />
      </View>
    );
  }

  if (error) {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <Text>{error}</Text>
      </View>
    );
  }

  return (
    <View>
      {notOrderedProducts.length === 0 ? (
        <Text>No products not ordered.</Text>
      ) : (
        <FlatList
          data={notOrderedProducts}
          keyExtractor={(item) => (item ? item._id.toString() : '')}
          renderItem={({ item }) => (
            <View>
              <Text>{item ? item.productName : ''}</Text>
              {/* Render other product details */}
            </View>
          )}
        />
      )}
    </View>
  );
};

export default AwaitingDeliveryScreen;
