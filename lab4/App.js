import React,{useEffect} from "react"
import { StyleSheet,Text,View } from "react-native" 
import firestore from "@react-native-firebase/firestore"
import auth from "@react-native-firebase/auth"
import { MyContextControllerProvider } from "./src/context"
import Router from "./src/screens/Router"
import { NavigationContainer } from '@react-navigation/native'
import { initializeApp } from '@react-native-firebase/app';
import RouterServices from "./src/screens/RouterServices"


const initial = () => {
  const USERS = firestore().collection("USERS");
  const admin = {
    name: "HongMai",
    phone: "113",
    address: "Binh Duong",
    email: "maicute@gmail.com",
    password: "123456",
    role: "admin",
  };
  const userr = {
    name: "Mai",
    phone: "114",
    address: "Binh Duong",
    email: "mai@gmail.com",
    password: "123456",
    role: "user",
  };
  
  USERS.doc(admin.email).get().then((u) => {
    if (!u.exists) {
      auth()
        .createUserWithEmailAndPassword(admin.email, admin.password)
        .then(() =>
          USERS.doc(admin.email)
            .set(admin)
              .then(() => console.log("Add new user admin!"))
          )
          .catch((error) => console.error("Error creating user:", error));
      }
    });
    USERS.doc(userr.email).get().then((u) => {
      if (!u.exists) {
        auth()
          .createUserWithEmailAndPassword(userr.email, userr.password)
          .then(() =>
            USERS.doc(userr.email)
              .set(userr)
                .then(() => console.log("Add new user!"))
            )
            .catch((error) => console.error("Error creating user:", error));
        }
      });
  };


export default App = ()=>{
  useEffect(()=>{
    initial()
  },[])
  return(
    <MyContextControllerProvider>
      <NavigationContainer>
        <Router/>
         
      </NavigationContainer>
    </MyContextControllerProvider>
  )
}
const styles = StyleSheet.create(
  {
    container:{
      flex:1
    }
  }
)