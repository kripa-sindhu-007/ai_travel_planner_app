import { View, Text, TextInput, StyleSheet, TouchableOpacity, SafeAreaView, ToastAndroid, AsyncStorage } from 'react-native'; // Import AsyncStorage
import React, { useEffect, useState } from 'react';
import { useNavigation, useRouter } from 'expo-router';
import Ionicons from '@expo/vector-icons/Ionicons';
import { Colors } from "../../../constants/Colors";
import { signInWithEmailAndPassword,getAuth } from 'firebase/auth';
import { auth } from './../../../configs/firebaseConfig'
export default function SignIn() {
  const navigation = useNavigation();
  const router = useRouter();
  const [email,setEmail] = useState();
  const [password,setPassword] = useState();
  useEffect(() => {
    navigation.setOptions({
      headerShown: false
    });
  }, []);

  const onSignIn=()=>{
    if(!email && !password){
      ToastAndroid.show("Please enter Email and Password",ToastAndroid.LONG);
      return;
    }
    signInWithEmailAndPassword(auth, email, password)
  .then((userCredential) => {
    // Signed in 
    const user = userCredential.user;
    router.replace('/mytrip');
    console.log(user);

    // ...
  })
  .catch((error) => {
    const errorCode = error.code;
    const errorMessage = error.message;
    console.log(errorMessage,errorCode);
    if(errorCode=='auth/invalid-credential'){
      ToastAndroid.show("Invalid Credentials",ToastAndroid.LONG)
    }
  });

  }

 return (
   <View
     style={{
       padding: 25,
       paddingTop: 60,
       backgroundColor: "#FFFFFF",
       height: "100%",
     }}
   >
     <TouchableOpacity onPress={() => router.back()}>
       <Ionicons name="arrow-back-circle-outline" size={24} color="black" />
     </TouchableOpacity>

     <Text
       style={{
         fontFamily: "roboto-bold",
         fontSize: 30,
         marginTop: 50,
       }}
     >
       Let's Sign You In
     </Text>

     <Text
       style={{
         fontFamily: "roboto",
         color: Colors.GRAY,
         marginTop: 10,
       }}
     >
       Welcome back, trailblazer!
     </Text>
     <Text
       style={{
         fontFamily: "roboto",
         color: "#6e6e6e",
         marginBottom: 50,
       }}
     >
       Your next adventure is just a sign-in away!
     </Text>

     {/* Email Field */}
     <View style={{ marginTop: 20 }}>
       <Text
         style={{
           fontFamily: "roboto",
         }}
       >
         Email
       </Text>
       <TextInput
         style={{
           padding: 15,
           borderWidth: 1,
           borderRadius: 15,
           borderColor: "#a0a0a0",
           fontFamily: "roboto",
         }}
         placeholder="Enter Email"
         placeholderTextColor="#a0a0a0"
         onChangeText={(val) => setEmail(val)} // Keep functional dependency here
       />
     </View>

     {/* Password Field */}
     <View style={{ marginTop: 20 }}>
       <Text
         style={{
           fontFamily: "roboto",
         }}
       >
         Password
       </Text>
       <TextInput
         secureTextEntry={true}
         style={{
           padding: 15,
           borderWidth: 1,
           borderRadius: 15,
           borderColor: "#a0a0a0",
           fontFamily: "roboto",
         }}
         placeholder="Enter Password"
         placeholderTextColor="#a0a0a0"
         onChangeText={(val) => setPassword(val)} // Keep functional dependency here
       />
     </View>

     {/* Sign In Button */}
     <TouchableOpacity
       onPress={onSignIn} // Keep functional dependency here
       style={{
         padding: 20,
         backgroundColor: Colors.PRIMARY,
         borderRadius: 15,
         marginTop: 50,
       }}
     >
       <Text
         style={{
           color: "#FFFFFF",
           textAlign: "center",
         }}
       >
         Sign In
       </Text>
     </TouchableOpacity>

     {/* Create Account Button */}
     <TouchableOpacity
       onPress={() => router.replace("auth/sign-up")} // Keep functional dependency here
       style={{
         padding: 20,
         backgroundColor: Colors.WHITE,
         borderRadius: 15,
         marginTop: 20,
         borderWidth: 1,
         borderColor: "#a0a0a0",
       }}
     >
       <Text
         style={{
           color: Colors.PRIMARY,
           textAlign: "center",
         }}
       >
         Create Account
       </Text>
     </TouchableOpacity>
   </View>
 );};
