import { View, Text } from 'react-native'
import React from 'react'
import { Slot } from 'expo-router'
import { Colors } from '@/constants/theme'
import { StatusBar} from "expo-status-bar"



const Rootlayout = () => {
  return (
    <View style={{ backgroundColor: Colors.background, flex:1 }}>
      <Text>Header</Text>
      <Slot />
      <StatusBar style="light"></StatusBar>
    </View>
  )
}

export default Rootlayout