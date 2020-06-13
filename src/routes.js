import React from 'react'
import { NavigationContainer } from '@react-navigation/native'
import { createStackNavigator } from '@react-navigation/stack'

import ListTask from './pages/ListTasks'
import NewTask from './pages/NewTask'

const AppStack = createStackNavigator()

export default function Routes() {
    return (
        <NavigationContainer>
            <AppStack.Navigator
                headerMode="none"
            >
                <AppStack.Screen name="ListTasks" component={ListTask}/>
                <AppStack.Screen name="NewTask" component={NewTask}/>
            </AppStack.Navigator>
        </NavigationContainer>
    )
}