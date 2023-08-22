import { StatusBar } from 'react-native';
import OneSignal from 'react-native-onesignal';
import { NativeBaseProvider } from 'native-base';
import { useFonts, Roboto_400Regular, Roboto_700Bold } from '@expo-google-fonts/roboto';

import { tagUserInfoCreate } from './src/notifications/notificationsTags'

import { Routes } from './src/routes';

import { THEME } from './src/theme';
import { Loading } from './src/components/Loading';

import { CartContextProvider } from './src/contexts/CartContext';

OneSignal.setAppId("0b0a5cca-8c67-4c0f-a0b5-66f4d4e25267");

//apenas para Iphone
OneSignal.promptForPushNotificationsWithUserResponse(response => {
  console.log(response)
})

export default function App() {
  const [fontsLoaded] = useFonts({ Roboto_400Regular, Roboto_700Bold });

  //identifica esse dispositivo pelo email do usuário
  //ou cria tags com as informações do usuário logado que identifica o dispositivo
  tagUserInfoCreate({email: 'glaub.oliveira@hotmail.com', name: 'Glauber'})

  return (
    <NativeBaseProvider theme={THEME}>
      <StatusBar
        barStyle="light-content"
        backgroundColor="transparent"
        translucent
      />
      <CartContextProvider>
        {fontsLoaded ? <Routes /> : <Loading />}
      </CartContextProvider>
    </NativeBaseProvider>
  );
}