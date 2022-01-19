import React from 'react';
import {TouchableOpacity, View} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import {COLORS} from '@constants';
import ProductInfo from '@screens/user/products/create/ProductInfo';
import CategoryCollection from '@screens/user/products/create/CategoryCollection';

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

const MyTabBar = ({state, descriptors, navigation}) => {
    const focusedOptions = descriptors[state.routes[state.index].key].options;

    if (focusedOptions.tabBarVisible === false) {
        return null;
    }

    const onPressArrow = (direction) => {
        const newIndex = direction === 'left' ? state.index - 1 : state.index + 1;
        if (newIndex < 0 || newIndex > state.routes.length - 1) {
            return;
        }
        const route = state.routes[newIndex];
        navigation.emit({
            type: 'tabPress',
            target: route.key,
            canPreventDefault: true,
        });
        navigation.navigate(route.name);
    };

    return (
        <View style={{flexDirection: 'row', backgroundColor: COLORS.background, paddingVertical: 10, paddingHorizontal: 20, alignItems: 'center'}}>
            <>
                <TouchableOpacity onPress={() => onPressArrow('left')}>
                    <Icon name="arrow-left" color={COLORS.black} size={40} />
                </TouchableOpacity>
                <View style={{flex: 1, flexDirection: 'row', justifyContent: 'center', alignItems: 'center'}}>
                    {state.routes.map((route, index) => {
                        const {options} = descriptors[route.key];

                        const isFocused = state.index === index;

                        const onPress = () => {
                            const event = navigation.emit({
                                type: 'tabPress',
                                target: route.key,
                                canPreventDefault: true,
                            });

                            if (!isFocused && !event.defaultPrevented) {
                                navigation.navigate(route.name);
                            }
                        };

                        const onLongPress = () => {
                            navigation.emit({
                                type: 'tabLongPress',
                                target: route.key,
                            });
                        };

                        return (
                            <TouchableOpacity
                                key={index}
                                accessibilityRole="button"
                                accessibilityState={isFocused ? {selected: true} : {}}
                                accessibilityLabel={options.tabBarAccessibilityLabel}
                                testID={options.tabBarTestID}
                                onPress={onPress}
                                onLongPress={onLongPress}
                                style={{padding: 3, margin: 2}}>
                                <Icon name={isFocused ? 'circle' : 'circle-outline'} color={COLORS.primary} size={20} />
                            </TouchableOpacity>
                        );
                    })}
                </View>
                <TouchableOpacity onPress={() => onPressArrow('right')}>
                    <Icon name="arrow-right" color={COLORS.black} size={40} />
                </TouchableOpacity>
            </>
        </View>
    );
};

const ProductTabNavigator = () => {
    return (
        <Tab.Navigator
            backBehavior={'initialRoute'}
            tabBarOptions={{
                ...bottomTabBarOptions,
                showLabel: false,
                style: {
                    backgroundColor: COLORS.background,
                    elevation: 0, // remove shadow on Android
                    shadowOpacity: 0, // remove shadow on iOS
                },
            }}
            tabBar={(props) => <MyTabBar {...props} />}>
            <Tab.Screen name="ProductInfo" component={ProductInfo} />

            <Tab.Screen name="UpdateProfile" component={CategoryCollection} />

            <Tab.Screen name="UpdateProfile1" component={CategoryCollection} />

            <Tab.Screen name="UpdateProfile2" component={CategoryCollection} />

            <Tab.Screen name="UpdateProfile3" component={CategoryCollection} />
        </Tab.Navigator>
    );
};

export default ProductMainStack;
