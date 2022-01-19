import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import ProdutMainStack from './ProductNavigator';
import HomeScreen from '@screens/user/home/HomeScreen';

const Stack = createStackNavigator();

const HomeScreenNavigator = () => {
    return (
        <Stack.Navigator headerMode="none">
            <Stack.Screen name="HomeScreen" component={HomeScreen} />
            <Stack.Screen name="ProductCreateScreen" component={ProdutMainStack} />
        </Stack.Navigator>
    );
};

export default HomeScreenNavigator;
