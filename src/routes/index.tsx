import { useEffect, useState } from 'react';
import { useTheme } from 'native-base';
import { DefaultTheme, NavigationContainer } from '@react-navigation/native';
import OneSignal, { NotificationReceivedEvent, OSNotification } from 'react-native-onesignal';

// import * as Linking from 'expo-linking';

import { AppRoutes } from './app.routes';

import { Notification } from '../components/Notification';

//estrutura de navegação utilizada pelo deep linking
const linking = {
  //array de prefixos, que são os schemas, ver app.json scheme, $npx uri-scheme list para ver a lista de schemes
  prefixes: ['igniteshoesapp://', 'com.glaubermatos.igniteshoes://', 'exp+igniteshoesapp://'],
  config: {
    screens: {
      details: {
        path: 'details/:productId', // qual o endereço e parametro a receber através dessa rota
        parse: {
        //pode utilizar a tipagem do jeito que precisar
        productId: (productId: string) => productId
      }
      }
    }
  }
}

export function Routes() {
  const { colors } = useTheme();
  const [notification, setNotification] = useState<OSNotification>()

  const theme = DefaultTheme;
  theme.colors.background = colors.gray[700];

  //não funciona corretamente, gera o link de maneira diferente do que é necessário para abrir a rota
  // const deepLinkging = Linking.createURL('details', {
  //   queryParams: {
  //     productId: '7'
  //   }
  // })

  // console.log(deepLinkging)

  useEffect(() => {
    const unsubscribe = OneSignal
    .setNotificationWillShowInForegroundHandler((notificationReceivedEvent: NotificationReceivedEvent) => {
      const response = notificationReceivedEvent.getNotification();
      
      setNotification(response)
    })

    return unsubscribe;
  }, [])

  return (
    <NavigationContainer theme={theme} linking={linking}>
      <AppRoutes />

      {
        notification?.title && 
          <Notification 
            data={notification}
            onClose={() => {setNotification(undefined)}} 
          />
      }
    </NavigationContainer>
  );
}