import { View, Text, TextInput, FlatList, TouchableOpacity, ToastAndroid, ActivityIndicator } from "react-native";
import React, { useContext, useEffect, useState } from "react";
import { useNavigation, useRouter } from "expo-router";
import { CreateTripContext } from "./../../context/CreateTripContext";

const MAPTILER_API_KEY = "uCBXEjePDis0WAcvUmjc";

export default function SearchPlace() {
  const navigation = useNavigation();
  const { tripData, setTripData } = useContext(CreateTripContext);
  const router = useRouter();
  const [searchQuery, setSearchQuery] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    navigation.setOptions({
      headerShown: true,
      headerTransparent: true,
      headerTitle: "Search",
    });
  }, []);

  useEffect(() => {
    console.log(tripData);
  }, [tripData]);

  const searchPlaces = async (query) => {
    if (query.length > 2) {
      setIsLoading(true);
      try {
        const response = await fetch(
          `https://api.maptiler.com/geocoding/${encodeURIComponent(query)}.json?key=${MAPTILER_API_KEY}`
        );
        const text = await response.text(); // Get the raw response text
        // console.log("Raw API response:", text); // Keep for debugging if needed

        if (!response.ok) {
          console.error("API request failed:", response.status, text);
          ToastAndroid.show(`Error fetching places: ${response.status}`, ToastAndroid.LONG);
          setSearchResults([]); // Clear previous results
          return;
        }
        
        try {
          const data = JSON.parse(text); // Try to parse the JSON
          setSearchResults(data.features || []); // Ensure searchResults is an array
        } catch (parseError) {
          console.error("JSON parse error:", parseError);
          console.log("Response that caused the error:", text);
          ToastAndroid.show("Error reading place data. Please try again.", ToastAndroid.LONG);
          setSearchResults([]); // Clear results on parse error
        }
      } catch (error) {
        console.error("Error searching places:", error);
        ToastAndroid.show("Network error or failed to search for places. Please check your connection and try again.", ToastAndroid.LONG);
        setSearchResults([]); // Clear results on network or other errors
      } finally {
        setIsLoading(false);
      }
    } else {
      setSearchResults([]);
      setIsLoading(false); // Also set loading to false if query is too short
    }
  };
  const handlePlaceSelect = (place) => {
    setTripData({
      locationInfo: {
        name: place.place_name,
        coordinates: {
          lat: place.center[1],
          lng: place.center[0],
        },
        // Note: MapTiler doesn't provide photo references or URLs directly
        // You may need to use a different API or service for images
        photoRef: null,
        url: null,
      },
    });
    router.push('/create-trip/select-traveler');
  };

  return (
    <View
      style={{
        padding: 25,
        paddingTop: 75,
        backgroundColor: "#fff",
        height: "100%",
      }}
    >
      <TextInput
        placeholder="Search Place"
        value={searchQuery}
        onChangeText={(text) => {
          setSearchQuery(text);
          searchPlaces(text);
        }}
        style={{
          borderWidth: 1,
          borderRadius: 5,
          marginTop: 25,
          padding: 10,
        }}
      />
      {isLoading && <ActivityIndicator size="small" color="#0000ff" style={{ marginTop: 10 }} />}
      <FlatList
        data={searchResults}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <TouchableOpacity
            onPress={() => handlePlaceSelect(item)}
            style={{ padding: 10, borderBottomWidth: 1, borderBottomColor: '#ccc' }}
          >
            <Text>{item.place_name}</Text>
          </TouchableOpacity>
        )}
      />
    </View>
  );
}