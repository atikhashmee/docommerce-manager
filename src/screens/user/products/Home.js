import React, {Component} from 'react';
import {SafeAreaView, ScrollView, Text, View, ToastAndroid, Pressable, StyleSheet} from 'react-native';
import Styles from '@styles';
import {connect} from 'react-redux';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import ProductList from './ProductList'
import Drafts from './Drafts'
import Ionicons from 'react-native-vector-icons/Ionicons';

const Tab = createBottomTabNavigator();

class Home extends Component {
    constructor(props) {
        super(props);
        this.state = {
            spinner: false,
            refreshing: false,
        };
    }
    render() {
        return (
            <View style={Styles.container}>
                <Tab.Navigator  screenOptions={({ route }) => ({
                    tabBarIcon: ({ focused, color, size }) => {
                        let iconName;
                        if (route.name === 'Lists') {
                            iconName = focused ? 'list' : 'list-outline';
                        } else if (route.name === 'Drafts') {
                            iconName = focused ? 'layers' : 'layers-outline';
                        }
                        return <Ionicons name={iconName} size={size} color={color} />;
                    },
                    tabBarActiveTintColor: 'tomato',
                    tabBarInactiveTintColor: 'gray',
                    })}>
                    <Tab.Screen name="Lists" component={ProductList} />
                    <Tab.Screen name="Drafts" component={Drafts} />
                </Tab.Navigator>
            </View>
        );
    }
}



const mapStateToProps = (state) => {
    return {
        token: state.userReducer && state.userReducer.token,
        authUser: state.userReducer && state.userReducer.authUser,
    };
};

export default connect(mapStateToProps)(Home);
