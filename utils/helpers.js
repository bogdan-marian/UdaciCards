import React from 'react'
import { View, AsyncStorage } from 'react-native'
import { FontAwesome, MaterialIcons, MaterialCommunityIcons } from '@expo/vector-icons'
import { white } from './colors'
import { Notifications, Permissions } from 'expo'

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

export function createNotification() {
  return {
    title: 'Time to study',
    body: "Don't forget to study today!",
    ios: {
      sound: true
    },
    android: {
      sound: true,
      priority: 'high',
      sticky: false,
      vibrate: true
    }
  }
}

export function setLocalNotification() {
  console.log("setLocalNotification")
  AsyncStorage.getItem(NOTIFICATION_KEY)
    .then(JSON.parse)
    .then((data) => {
      if (data === null) {
        console.log("no data time to set notification")
        Permissions.askAsync(Permissions.NOTIFICATIONS)
          .then((pStatus) => {
            if (pStatus.status === 'granted') {
              Notifications.cancelAllScheduledNotificationsAsync()

              let tomorrow = new Date()
              tomorrow.setDate(tomorrow.getDate() + 1)
              tomorrow.setHours(20)
              tomorrow.setMinutes(0)
              Notifications.scheduleLocalNotificationAsync(
                createNotification(),
                {
                  time: tomorrow,
                  repeat: 'day'
                }
              )
              AsyncStorage.setItem(NOTIFICATION_KEY, JSON.stringify(true))
                .then(() => { console.log("finished setLocalNotification  for " + JSON.stringify(tomorrow)) })
            } else {
              console.log("nothing to do User decided for no notifications" + JSON.stringify(pStatus))
            }
          })
      }
    })


}

export function clearLocalNotification() {
  console.log('cleared previous notification')
  return AsyncStorage.removeItem(NOTIFICATION_KEY)
    .then(Notifications.cancelAllScheduledNotificationsAsync())
}

