import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity, Share } from 'react-native';
import { useRouter } from 'expo-router';
import { auth } from './../../configs/firebaseConfig'; // Adjust path based on your project structure
import { Colors } from "../../constants/Colors";
const Profile = () => {
  const router = useRouter();
  const [user, setUser] = useState(null);

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      if (user) {
        setUser({
          fullName: user.displayName,
          email: user.email,
          photoURL: user.photoURL
        });
      } else {
        setUser(null);
      }
    });

    return unsubscribe;
  }, []);

  const handleSignOut = async () => {
    try {
      console.log('Attempting to sign out...');
      await auth.signOut();
      console.log('Sign-out successful');
      router.replace('/auth/sign-up'); // Use replace to navigate to sign-up screen
    } catch (error) {
      console.error('Error signing out:', error);
    }
  };

  const handleShare = async () => {
    try {
      await Share.share({
        message: 'Check out this amazing app developed by Kripa Sindhu! [App Link]',
      });
    } catch (error) {
      console.error('Error sharing the app:', error);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Profile</Text>
      {user && (
        <View style={styles.userIntroContainer}>
          {user.photoURL ? (
            <Image source={{ uri: user.photoURL }} style={styles.userImage} />
          ) : (
            <Image
              source={require("./../../assets/images/pl.jpg")}
              style={styles.userImage}
            />
          )}
          <Text style={styles.userName}>{user.fullName}</Text>
          <Text style={styles.userEmail}>{user.email}</Text>
        </View>
      )}
      <TouchableOpacity
        style={{
          padding: 20,
          backgroundColor: Colors.WHITE,
          borderRadius: 15,
          marginTop: 20,
          borderWidth: 1,
        }}
        onPress={handleSignOut}
      >
        <Text
          style={{
            fontFamily: "roboto",
            fontSize: 20,
            textAlign: "center",
            color: "black",
          }}
        >
          Sign Out
        </Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={{
          padding: 20,
          backgroundColor: Colors.PRIMARY,
          borderRadius: 15,
          marginTop: 50,
        }}
        onPress={handleShare}
      >
        <Text
          style={{
            fontFamily: "roboto",
            fontSize: 20,
            textAlign: "center",
            color: "white",
          }}
        >
          Share App
        </Text>
      </TouchableOpacity>
      <Text style={styles.footer}>
        Crafted with passion by Kripa Sindhu. ✨ Bringing ideas to life, one
        line of code at a time.
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: "white",
    marginTop: 20,
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
    height: "100%",
    padding: 25,
  },
  title: {
    fontFamily: "outfit-bold",
    fontSize: 35,
    marginBottom: 20,
    marginTop:10,
    textAlign: "center",
    color: "#333",
  },
  userIntroContainer: {
    alignItems: "center",
    marginTop: 30,
    marginBottom: 30,
    padding: 20,
    backgroundColor: "#fff",
    borderRadius: 10,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  userImage: {
    width: 100,
    height: 100,
    borderRadius: 50,
    marginBottom: 10,
    borderColor: "#ddd",
    borderWidth: 2,
  },
  userName: {
    fontFamily: "outfit-bold",
    fontSize: 20,
    marginBottom: 5,
    color: "#333",
  },
  userEmail: {
    fontFamily: "outfit",
    fontSize: 16,
    color: "#666",
  },
  footer: {
    fontFamily: "outfit-medium",
    fontSize: 12,
    textAlign: "center",
    marginTop: 20,
    color: "#888",
  },
});

export default Profile;
