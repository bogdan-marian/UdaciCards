import React from 'react'
import { View , AsyncStorage} from 'react-native'
import { FontAwesome, MaterialIcons, MaterialCommunityIcons } from '@expo/vector-icons'
import { white } from './colors'
import {Notifications, Permissions} from 'expo'

export const NOTIFICATION_KEY = 'UdaciCards:notifications'

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

export function createNotification(){
  return {
    title:'Time to study',
    body: "Don't forget to study today!",
    ios:{
      sound:true
    },
    android:{
      sound:true,
      priority:'high',
      sticky:false,
      vibrate:true
    }
  }
}

export function setLocalNotification(){
  AsyncStorage.getItem(NOTIFICATION_KEY)
    .then(JSON.parse)
    .then((data) => {
      if (data === null){
        Permissions.askAsync(Permissions.NOTIFICATIONS)
          .then((status) => {
            if (status === 'granted'){
              Notifications.cancelAllScheduledNotificationsAsync()
              let today = new Date()
              today.setHours(20)
              today.setMinutes(0)
              Notifications.scheduleLocalNotificationAsync(
                createNotification(),
                {
                  time:today,
                  repeat:'day'
                }
              )
              AsyncStorage.setItem(NOTIFICATION_KEY,JSON.stringify(ture))
            }
          })
      }
    })
}

export function clearLocalNotification(){
  return AsyncStorage.removeItem(NOTIFICATION_KEY)
   .then(Notifications.cancelAllScheduledNotificationsAsync())
}

