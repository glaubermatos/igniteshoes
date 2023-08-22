import OneSignal from 'react-native-onesignal'

//pode reaproveitar essa função no momento da autenticação e já criar a tag para o email do usuário
//pode criar várias tags ao mesmo tempo, como por exemplo as informações do usuário logado, deixando as notificações dinâmicas
export function tagUserInfoCreate(user: {email: string, name: string}) {
    // OneSignal.sendTag('user_email', email)
    OneSignal.sendTags({
        'user_email': user.email,
        'name': user.name
    })
}