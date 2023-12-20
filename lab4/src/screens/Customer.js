import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, StyleSheet, Button, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import firestore from '@react-native-firebase/firestore';

const Customer = () => {
  const [services, setServices] = useState([]);
  const navigation = useNavigation();
  const Order = () => {
    alert('Đặt dịch vụ thành công');
      navigation.navigate('Customer');
  };
  
  useEffect(() => {
    // Truy vấn danh sách dịch vụ từ Firestore
    const unsubscribe = firestore()
      .collection('services')
      .onSnapshot((querySnapshot) => {
        const servicesList = [];
        querySnapshot.forEach((documentSnapshot) => {
          servicesList.push({
            id: documentSnapshot.id,
            ...documentSnapshot.data(),
          });
        });
        setServices(servicesList);
      });

    // Hủy đăng ký lắng nghe khi component bị hủy
    return () => unsubscribe();
  }, []);

  
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Danh sách dịch vụ</Text>
      <FlatList
        data={services}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <TouchableOpacity
            style={styles.serviceItem}
            onPress={() => navigation.navigate('SvDetail', { service: item })}
          >
            <Text>{item.name}</Text>
            <Text>{item.description}</Text>
            <Button
            title="Đặt"
            onPress={Order}
            color="green"
            width="80"
          />
          </TouchableOpacity>
        )}
      />
      
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: "pink",
    flex: 1,
    padding: 16,
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    color: "black",
    marginBottom: 16,
  },
  serviceItem: {
    marginBottom: 12,
    padding: 12,
    borderRadius: 15,
    backgroundColor: 'white',
  },
  addButton: {
    position: 'absolute',
    bottom: 16,
    right: 16,
    width: 50,
    height: 50,
    backgroundColor: 'white',
    borderRadius: 25,
    justifyContent: 'center',
    alignItems: 'center',
  },
  addButtonText: {
    color: 'black',
    fontSize: 24,
    fontWeight: 'bold',
  },
});

export default Customer;

