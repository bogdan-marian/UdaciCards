import React from 'react'
import { View } from 'react-native'
import { FontAwesome, MaterialIcons, MaterialCommunityIcons } from '@expo/vector-icons'
import { white } from './colors'

export function getDeckMetaInfo(metaInfo) {
  const info = {
    title: {
      displayName: "Deck title",
      getIcon() {
        return (
          <View>
            <MaterialIcons
              name="deck-title"
              color={white}
              size={34} />
          </View>
        )
      }
    }
  }

  return typeof metaInfo === 'undefined'
    ? info
    : info[metaInfo]
}

export function generateUID() {
  return Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15)
}