import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, FlatList, TouchableOpacity } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { MaterialCommunityIcons, AntDesign } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native'; // Import navigation hook

const MyOrders = () => {
  const [orders, setOrders] = useState([]);
  const [expandedOrderId, setExpandedOrderId] = useState(null);
  const navigation = useNavigation(); // Hook for navigation

  useEffect(() => {
    const loadOrders = async () => {
      try {
        const storedOrders = await AsyncStorage.getItem('orders');
        const orderHistory = storedOrders ? JSON.parse(storedOrders) : [];
        setOrders(orderHistory);
      } catch (error) {
        console.error(error);
      }
    };

    loadOrders();
  }, []);

  const toggleOrderDetails = (orderId) => {
    setExpandedOrderId(expandedOrderId === orderId ? null : orderId);
  };

  const renderOrderItem = ({ item }) => {
    const isExpanded = expandedOrderId === item.id;

    return (
      <View style={styles.orderItem}>
        <TouchableOpacity style={styles.orderHeader} onPress={() => toggleOrderDetails(item.id)}>
          <View>
            <Text style={styles.orderTitle}>Order #{item.id}</Text>
            <Text style={styles.orderDate}>{item.date}</Text>
          </View>
          <MaterialCommunityIcons
            name={isExpanded ? 'chevron-up' : 'chevron-down'}
            size={24}
            color="#333"
          />
        </TouchableOpacity>

        {isExpanded && (
          <View style={styles.orderDetails}>
            {item.items.map((orderItem) => (
              <View key={orderItem.id} style={styles.orderItemDetails}>
                <Text style={styles.orderProductName}>{orderItem.title}</Text>
                <Text style={styles.orderProductQuantity}>Quantity: {orderItem.quantity}</Text>
                <Text style={styles.orderProductPrice}>Price: ${orderItem.price.toFixed(2)}</Text>
              </View>
            ))}
            <View style={styles.orderTotalContainer}>
              <Text style={styles.orderTotalText}>Total: ${item.total.toFixed(2)}</Text>
            </View>
          </View>
        )}
      </View>
    );
  };

  return (
    <View style={styles.container}>
      {/* Home Button */}
      <TouchableOpacity
        style={styles.homeButton}
        onPress={() => navigation.navigate('HomeScreen')} // Navigate to HomeScreen
      >
        <AntDesign name="home" size={24} color="#fff" />
      </TouchableOpacity>

      <FlatList
        data={orders}
        renderItem={renderOrderItem}
        keyExtractor={(item) => item.id.toString()}
        ListEmptyComponent={<Text style={styles.emptyText}>No orders placed yet.</Text>}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: '#f5f5f5',
  },
  homeButton: {
    position: 'absolute',
    bottom: 20, // Positioning at the bottom
    right: 20, // Positioning on the right
    backgroundColor: '#ff6347',
    padding: 15,
    borderRadius: 50,
    zIndex: 1,
  },
  orderItem: {
    backgroundColor: '#fff',
    padding: 16,
    marginBottom: 16,
    borderRadius: 8,
    elevation: 2,
  },
  orderHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  orderTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 5,
  },
  orderDate: {
    fontSize: 14,
    color: '#888',
    marginBottom: 5,
  },
  orderDetails: {
    marginTop: 10,
  },
  orderItemDetails: {
    marginBottom: 10,
  },
  orderProductName: {
    fontSize: 16,
    fontWeight: '500',
  },
  orderProductQuantity: {
    fontSize: 14,
    color: '#555',
  },
  orderProductPrice: {
    fontSize: 14,
    color: '#555',
  },
  orderTotalContainer: {
    marginTop: 10,
    borderTopWidth: 1,
    borderTopColor: '#eee',
    paddingTop: 10,
  },
  orderTotalText: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  emptyText: {
    fontSize: 18,
    textAlign: 'center',
    marginTop: 20,
    color: '#888',
  },
});

export default MyOrders;
