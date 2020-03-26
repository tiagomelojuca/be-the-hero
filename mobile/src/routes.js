import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

const AppStack = createStackNavigator();

import incidents from './pages/incidents';
import detail from './pages/detail';

export default function Routes() {
    return(
        <NavigationContainer>
            <AppStack.Navigator screenOptions={{ headerShown: false }}>
                <AppStack.Screen name="Incidents" component={incidents}/>
                <AppStack.Screen name="Detail" component={detail}/>
            </AppStack.Navigator>
        </NavigationContainer>
    );
}