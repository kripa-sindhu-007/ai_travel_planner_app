import { View, Text, TextInput, StyleSheet, TouchableOpacity, ScrollView, StatusBar, ToastAndroid } from 'react-native';
import React, { useState } from 'react';
import { useRouter } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import { Colors } from "../../../constants/Colors";
import { createUserWithEmailAndPassword,getAuth } from 'firebase/auth';
import { auth } from '../../../configs/firebaseConfig'; // Correct casing here

export default function SignUp() {
  const router = useRouter();

  const [email,setEmail] = useState();
  const [password,setPassword] = useState();
  const [fullName,setFullName] = useState();

  const onCreateAccount=()=>{
    if(!email && !password&& !fullName){
      ToastAndroid.show("Please enter all details",ToastAndroid.BOTTOM);
      return;
    }
    createUserWithEmailAndPassword(auth, email, password)
  .then((userCredential) => {
    // Signed up 
    const user = userCredential.user;
    console.log(user);
    router.replace('/mytrip')
    
    // ...
  })
  .catch((error) => {
    const errorCode = error.code;
    const errorMessage = error.message;
    console.log(errorMessage,errorCode);
    // ..
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
      <TouchableOpacity onPress={() => router.push("/auth/sign-in")}>
        <Ionicons name="arrow-back-circle-outline" size={24} color="black" />
      </TouchableOpacity>
      <Text
        style={{
          fontFamily: "roboto-bold",
          fontSize: 30,
          marginTop: 50,
        }}
      >
        Create New Account
      </Text>

      <Text
        style={{
          fontFamily: "roboto",
          color: Colors.GRAY,
          marginTop: 10,
        }}
      >
        Embark on a new journey with us! Create your account today!!
      </Text>
      {/* Full Name Field */}
      <View
        style={{
          marginTop: 50,
        }}
      >
        <Text
          style={{
            fontFamily: "roboto",
          }}
        >
          Full Name
        </Text>
        <TextInput
          style={{
            padding: 15,
            borderWidth: 1,
            borderRadius: 15,
            borderColor: "#a0a0a0",
            fontFamily: "roboto",
          }}
          placeholder="Enter Full Name"
          placeholderTextColor="#a0a0a0"
          onChangeText={(val) => setFullName(val)} // Keep functional dependency here
        />
      </View>
      {/* Email Field */}
      <View
        style={{
          marginTop: 20,
        }}
      >
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
          keyboardType="email-address"
          onChangeText={(val) => setEmail(val)} // Keep functional dependency here
        />
      </View>
      {/* Password Field */}
      <View
        style={{
          marginTop: 20,
        }}
      >
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
      {/* Create Account Button */}
      <TouchableOpacity
        onPress={onCreateAccount} // Keep functional dependency here
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
          Create Account
        </Text>
      </TouchableOpacity>
      {/* Sign In Button */}
      <TouchableOpacity
        onPress={() => router.replace("/auth/sign-in")} // Keep functional dependency here
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
          Sign In
        </Text>
      </TouchableOpacity>
    </View>
  );};


