import { View, Text, Image, ToastAndroid } from 'react-native'
import React, { useContext, useEffect, useState } from 'react'
import { CreateTripContext } from '../../context/CreateTripContext';
import { AI_PROMPT } from '../../constants/Options';
import { chatSession } from '../../configs/AiModal';
import { useRouter } from 'expo-router';
import {auth,db} from './../../configs/firebaseConfig'
import { doc, setDoc } from 'firebase/firestore';
export default function GenerateTrip() {
    const { tripData, setTripData } = useContext(CreateTripContext);
    const [loading,setLoading] = useState(false);
    const router = useRouter();
    const user=auth.currentUser;
    useEffect(()=>{
        GenerateAiTrip()
    },[])
    const GenerateAiTrip =async ()=>{
        setLoading(true);
        try {
            const FINAL_PROMPT=AI_PROMPT.replace('{location}',tripData?.locationInfo?.name)
            .replace('{totalDays}',tripData.totalNoOfDays)
            .replace('{totalNight}',tripData.totalNoOfDays-1)
            .replace('{traveler}',tripData.traveler?.title)
            .replace('{budget}',tripData.budget)
            .replace('{totalDays}',tripData.totalNoOfDays)
            .replace('{totalNight}',tripData.totalNoOfDays-1)

            console.log(FINAL_PROMPT);
            const result = await chatSession.sendMessage(FINAL_PROMPT);
            const rawResponseText = result.response.text();
            console.log(rawResponseText);

            let tripResp;
            try {
                tripResp = JSON.parse(rawResponseText);
                // If parsing is successful, proceed to save and navigate
                // setLoading(false) is called in finally
                const docId = (Date.now()).toString();
                await setDoc(doc(db, 'UserTrips', docId), {
                    userEmail: user.email,
                    tripPlan: tripResp, // AI result
                    tripData: JSON.stringify(tripData), // user selected data
                    docId: docId
                });
                router.push('(tabs)/mytrip');
            } catch (e) {
                console.error("Failed to parse AI response:", e);
                console.error("Raw AI response text:", rawResponseText); // Log the problematic text
                ToastAndroid.show("Sorry, we encountered an issue generating your trip. The AI response might have been unclear. Please try adjusting your criteria or try again later.", ToastAndroid.LONG);
                // setLoading(false) is called in finally
                // Optional: Navigate back or allow retry
                // router.back(); // Or to a specific step
            }
        } catch (error) {
            // This catches errors from chatSession.sendMessage or other issues before JSON parsing
            console.error("Error generating trip:", error);
            ToastAndroid.show("Sorry, an unexpected error occurred while generating your trip. Please try again later.", ToastAndroid.LONG);
        } finally {
            setLoading(false);
        }
    }
  return (
    <View style={{
        padding:25,
        paddingTop:75,
        backgroundColor:'#fff',
        height:'100%'
    }}>  
      <Text style={{
        fontFamily:'outfit-bold',
        fontSize:30,
        textAlign:'center'
      }}>Please Wait.....</Text>
       <Text style={{
        fontFamily:'outfit-medium',
        fontSize:18,
        textAlign:'center',
        marginTop:40
      }}>We are working to generate your dream trip</Text>

      <Image source = {require('./../../assets/images/airplane_loading.gif')}
      style={{
        width:"100%",
        objectFit:'contain',
        height:200
      }}/>
      <Text style={{
        fontFamily:'outfit',
        color:'#808080',
        fontSize:18,
        textAlign:'center'
      }}>Do not Go Back</Text>
    </View>
  )
}