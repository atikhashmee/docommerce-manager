import React from 'react';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import {COLORS} from '@constants';
import ProductInfo from '@screens/user/products/create/ProductInfo';
import CategoryCollection from '@screens/user/products/create/CategoryCollection';
import EditProfile from '@screens/user/profile/Edit';

import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {createStackNavigator} from '@react-navigation/stack';
import {bottomTabBarOptions} from '@/navigations/navigators/NavigatorOptions';

const Tab = createBottomTabNavigator();
const Stack = createStackNavigator();

const ProductMainStack = () => {
    return (
        <Stack.Navigator headerMode="none">
            <Stack.Screen name="Product" component={ProductTabNavigator} />
        </Stack.Navigator>
    );
};

const ProductTabNavigator = () => {
    return (
        <Tab.Navigator backBehavior={'initialRoute'} tabBarOptions={bottomTabBarOptions}>
            <Tab.Screen
                name="ProductInfo"
                component={ProductInfo}
                options={{
                    tabBarLabel: 'Info',
                    tabBarIcon: ({focused}) => <Icon name="account" color={focused ? COLORS.black : COLORS.white} size={26} />,
                }}
            />

            <Tab.Screen
                name="UpdateProfile"
                component={CategoryCollection}
                options={{
                    tabBarLabel: 'category',
                    tabBarIcon: ({focused}) => <Icon name="square-edit-outline" color={focused ? COLORS.black : COLORS.white} size={26} />,
                }}
            />
        </Tab.Navigator>
    );
};

export default ProductMainStack;
