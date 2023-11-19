import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import { createStackNavigator } from '@react-navigation/stack';
import { HeaderButtons } from 'react-navigation-header-buttons';
import { Ionicons } from '@expo/vector-icons';

import PendingConfirmationScreen from './src/screens/PendingConfirmationScreen';
import AwaitingDeliveryScreen from './src/screens/AwaitingDeliveryScreen';
import DeliveredScreen from './src/screens/DeliveredScreen';
import CancelledScreen from './src/screens/CancelledScreen';

const Tab = createMaterialTopTabNavigator();
const Stack = createStackNavigator();

const App = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen
          name="Home"
          component={TabNavigator}
          options={{
            headerTitle: 'Đơn hàng',
            headerLeft: () => (
              <Ionicons
                name="arrow-back"
                size={24}
                color="black"
                onPress={() => {
                  // Handle go back
                }}
                style={{ marginLeft: 10 }}
              />
            ),
            headerTitleAlign: 'center', // Center the title
            headerRight: () => (
              <HeaderButtons>
                <Ionicons
                  name="search"
                  size={24}
                  color="black"
                  onPress={() => {
                    // Handle search
                  }}
                  style={{ marginRight: 10 }}
                />
                <Ionicons
                  name="chatbubble-ellipses"
                  size={24}
                  color="black"
                  onPress={() => {
                    // Handle chat
                  }}
                  style={{ marginRight: 10 }}
                />
              </HeaderButtons>
            ),
          }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

const TabNavigator = () => {
  return (
    <Tab.Navigator
      tabBarOptions={{
        style: { elevation: 0 }, 
        indicatorStyle: { backgroundColor: 'blue' }, 
      }}>
      <Tab.Screen name="Chờ xác nhận" component={PendingConfirmationScreen} />
      <Tab.Screen name="Chờ lấy hàng" component={AwaitingDeliveryScreen} />
      <Tab.Screen name="Đã giao" component={DeliveredScreen} />
      <Tab.Screen name="Đã huỷ" component={CancelledScreen} />
    </Tab.Navigator>
  );
};

export default App;
