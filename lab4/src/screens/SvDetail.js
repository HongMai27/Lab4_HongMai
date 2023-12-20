import React from 'react';
import { useEffect, useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { Button } from 'react-native-paper';
import { useNavigation } from '@react-navigation/native';
import firestore from '@react-native-firebase/firestore';


const SvDetail = ({ route }) => {
  // Lấy thông tin về dịch vụ từ route.params
  const { service } = route.params;
  const navigation = useNavigation();
 
  const Order = () => {
    alert('Đặt dịch vụ thành công');
      navigation.navigate('Customer');
  };

    
  return (
    <View style={{flex:1,  alignContent:"center", backgroundColor:"pink"}}>
      <Text style ={{fontSize: 32, color:"black"}}>Chi tiết dịch vụ</Text>
      <Text style ={styles.title}>Tên dịch vụ: {service.name}</Text>
      <Text style ={styles.title}>Gía: {service.description}</Text>
      <Text style ={styles.title}>Người tạo: </Text>
      <Text style ={styles.title}>Ngày tạo: </Text>
      <Text style ={styles.title}>Ngày cập nhật: </Text>
      <TouchableOpacity style={styles.addButton} onPress={Order}>
        <Text style={styles.addButtonText}>Đặt</Text>
      </TouchableOpacity>
      <Text></Text>
     
    </View>
  );
};

const styles = StyleSheet.create({
  title: {
    fontSize: 18,
    color: "black",
    textAlign: 'justify',
    marginBottom: 16,
  },
  addButton: {
    position: 'relative',
    width: 200,
    height: 50,
    backgroundColor: 'white',
    borderRadius: 15,
    alignSelf: 'center',
    justifyContent: 'center',
    alignItems: 'center',
    
  },
})

export default SvDetail;
