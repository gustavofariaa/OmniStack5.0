import React from 'react'
import { NavigationContainer } from '@react-navigation/native'
import { createStackNavigator } from '@react-navigation/stack'

const Stack = createStackNavigator()

import Login from './pages/Login'
import Timeline from './pages/Timeline'

export default () => {
    return (
        <NavigationContainer>
            <Stack.Navigator screenOptions={{ headerShown: false }}>
                <Stack.Screen name='Login' component={Login} />
                <Stack.Screen name='Timeline' component={Timeline} />
            </Stack.Navigator>
        </NavigationContainer>
    )
}