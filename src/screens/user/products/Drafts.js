import React, {Component} from 'react';
import {SafeAreaView, ScrollView, Text, View, ToastAndroid, Pressable, StyleSheet} from 'react-native';
import Spinner from 'react-native-loading-spinner-overlay';
import Styles from '@styles';
import Animated from 'react-native-reanimated';
import Header from '@components/inc/Header';
import styled, {css} from 'styled-components';
import {COLORS, icons, SIZES} from '@constants';
import {connect} from 'react-redux';
import { FAB, List, Avatar, Button, Card, Title, Paragraph } from 'react-native-paper';
import APIKit from '../../../config/axios'
class Drafts extends Component {
    constructor(props) {
        super(props);
        this.state = {
            spinner: false,
            refreshing: false,
            products: [],
        };
    }

    toastr() {
        ToastAndroid.show("A pikachu appeared nearby !", ToastAndroid.SHORT);
    }

    componentDidMount() {
        
    }

    
    render() {
        const LeftContent = props => <Avatar.Icon {...props} icon="folder" />
        return (
            <View style={Styles.container}>
                <Header navigation={this.props.navigation} showBack={true} title="Drafts" />
                <Spinner visible={this.state.spinner} textContent={'Loading...'} />
                <AnimScrollView>
                    <Text>Drafts</Text>
                </AnimScrollView>
                <FAB
                    style={styles.fab}
                    large
                    icon="plus"
                    onPress={() => this.props.navigation.navigate('CreateProduct')}
                />
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

export default connect(mapStateToProps)(Drafts);

const AnimScrollView = styled(Animated.ScrollView)`
    flex: 1;
    padding-left: 10px;
    padding-right: 10px;
    padding-top: 10px;
    background-color: ${COLORS.background};
`;

const styles = StyleSheet.create({
    fab: {
      position: 'absolute',
      margin: 16,
      right: 0,
      bottom: 0,
      backgroundColor: COLORS.primary,
    },
})