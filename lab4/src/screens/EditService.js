import React, { useState, useEffect } from 'react';
import { View, TextInput, TouchableOpacity, StyleSheet } from 'react-native';
import firestore from '@react-native-firebase/firestore';
import { Text } from 'react-native-paper';

const EditService = ({ route, navigation }) => {
  const { service } = route.params;

  const [serviceName, setServiceName] = useState('');
  const [serviceDescription, setServiceDescription] = useState('');

  useEffect(() => {
    // Load thông tin dịch vụ từ Firestore khi màn hình được tạo
    const fetchServiceDetails = async () => {
      try {
        const serviceRef = firestore().collection('services').doc(service.id);
        const serviceDoc = await serviceRef.get();

        // Lấy dữ liệu dịch vụ từ Firestore và cập nhật state
        const serviceData = serviceDoc.data();
        setServiceName(serviceData.name);
        setServiceDescription(serviceData.description);
      } catch (error) {
        console.error('Lỗi khi tải thông tin dịch vụ từ Firestore:', error);
      }
    };

    fetchServiceDetails();
  }, [service]);

  const editService = async () => {
    try {
      // Sửa thông tin dịch vụ trong Firestore
      await firestore().collection('services').doc(service.id).update({
        name: serviceName,
        description: serviceDescription,
        // Cập nhật các trường khác tùy thuộc vào yêu cầu của bạn
      });

      console.log('Dịch vụ đã được chỉnh sửa thành công trong Firestore');
      // Hiển thị thông báo thành công
      alert('Dịch vụ đã được chỉnh sửa thành công trong Firestore');

      // Sau khi chỉnh sửa thành công, chuyển đến màn hình "Admin"
      navigation.navigate('Admin');
    } catch (error) {
      console.error('Lỗi khi chỉnh sửa dịch vụ trong Firestore:', error);

      // Hiển thị thông báo lỗi
      alert('Lỗi khi chỉnh sửa dịch vụ trong Firestore');
    }
  };

  return (
    <View style={styles.container}>
      <Text style={{ alignSelf: 'center', fontSize: 30 }}>CHỈNH SỬA DỊCH VỤ</Text>
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
      <TouchableOpacity style={styles.button} onPress={editService}>
        <Text style={{ color: 'black', fontSize: 18 }}>Lưu</Text>
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
    backgroundColor: 'white',
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

export default EditService;
