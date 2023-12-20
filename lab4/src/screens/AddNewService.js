import React, { useState } from 'react';
import { View, TextInput, Button, StyleSheet } from 'react-native';
import firestore from '@react-native-firebase/firestore';
import { Text } from 'react-native-paper';
import { TouchableOpacity} from 'react-native';

const AddNewService = ({ navigation }) => {
  const [serviceName, setServiceName] = useState('');
  const [serviceDescription, setServiceDescription] = useState('');

  const addNewService = async () => {
    try {
      // Thêm dịch vụ mới vào Firestore
      await firestore().collection('services').add({
        name: serviceName,
        description: serviceDescription,
        // Thêm các trường khác tùy thuộc vào yêu cầu của bạn
      });

      console.log('Dịch vụ đã được thêm thành công vào Firestore');
      // Hiển thị thông báo thành công
      alert('Dịch vụ đã được thêm thành công vào Firestore');

      // Sau khi thêm thành công, chuyển đến màn hình "Admin"
      navigation.navigate('Admin');
    } catch (error) {
      console.error('Lỗi khi thêm dịch vụ vào Firestore:', error);

      // Hiển thị thông báo lỗi
      alert('Lỗi khi thêm dịch vụ vào Firestore');
    }
  };

  return (
    <View style={styles.container}>
      <Text style ={{alignSelf: "center", fontSize: 30}}>THÊM MỚI DỊCH VỤ</Text>
      <TextInput
        style={styles.input}
        placeholder="Tên dịch vụ"
        value={serviceName}
        onChangeText={(text) => setServiceName(text)}
      />
      <TextInput
        style={styles.input}
        placeholder="Mô tả dịch vụ"
        value={serviceDescription}
        onChangeText={(text) => setServiceDescription(text)}
      />
      <TouchableOpacity style={styles.button} onPress={addNewService}>
            <Text style={{ color: 'black', fontSize: 22 }}>Thêm</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    justifyContent: 'center',
    backgroundColor: 'pink',
  },
  input: {
    height: 40,
    borderColor: 'gray',
    borderRadius: 15,
    backgroundColor: "white",
    borderWidth: 1,
    marginBottom: 12,
    paddingHorizontal: 8,
  },
  button: {
    backgroundColor: 'white',
    borderRadius: 10,
    paddingVertical: 10,
    alignItems: 'center',
    width: 100,
    height: 50,
    alignSelf: "center",
  },
});

export default AddNewService;
