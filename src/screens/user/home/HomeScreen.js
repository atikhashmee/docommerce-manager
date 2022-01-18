import React, {Component} from 'react';
import {Text, View} from 'react-native';
import Spinner from 'react-native-loading-spinner-overlay';
import Styles from '@styles';
import Header from '@components/inc/Header';
import styled, {css} from 'styled-components';
import {COLORS, images, icons} from '@constants';

class HomeScreen extends Component {
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
                <Header navigation={this.props.navigation} />
                <Spinner visible={this.state.spinner} textContent={'Loading...'} />
                <WrappingView>
                    <TopView>
                        <Text>Hello world</Text>
                    </TopView>
                    <MiddleView>
                        <View style={Styles.row}>
                            <View style={Styles.col4}>
                                <CounterBox>
                                    <IconHolder>{icons.users}</IconHolder>
                                    <CounterNumber>15412</CounterNumber>
                                    <CounterText>Total Users</CounterText>
                                </CounterBox>
                            </View>
                            <View style={Styles.col4}>
                                <CounterBox>
                                    <IconHolder>{icons.globe}</IconHolder>
                                    <CounterNumber>15412</CounterNumber>
                                    <CounterText>Total Orders</CounterText>
                                </CounterBox>
                            </View>
                            <View style={Styles.col4}>
                                <CounterBox>
                                    <IconHolder>{icons.money}</IconHolder>
                                    <CounterNumber>15412</CounterNumber>
                                    <CounterText>Total Sales</CounterText>
                                </CounterBox>
                            </View>
                        </View>
                    </MiddleView>
                    <BottomView>
                        <View style={Styles.row}>
                            <View style={Styles.col6}>
                                <CounterBox>
                                    <IconHolder>{icons.users}</IconHolder>
                                    <CounterNumber>15412</CounterNumber>
                                    <CounterText>Total Users</CounterText>
                                </CounterBox>
                            </View>
                            <View style={Styles.col6}>
                                <CounterBox>
                                    <IconHolder>{icons.globe}</IconHolder>
                                    <CounterNumber>15412</CounterNumber>
                                    <CounterText>Total Orders</CounterText>
                                </CounterBox>
                            </View>
                        </View>
                    </BottomView>
                </WrappingView>
            </View>
        );
    }
}

const WrappingView = styled.View`
    width: 100%;
`;
const TopView = styled.View`
    height: 30%;
`;
const MiddleView = styled.View`
    height: 20%;
    border: 2px solid ${COLORS.background};
    background-color: ${COLORS.background};
    border-top-right-radius: 35px;
    border-top-left-radius: 35px;
    padding: 20px;
`;
const BottomView = styled.View`
    height: 50%;
    border: 1px solid ${COLORS.primary};
`;
const counterCss = css`
    text-align: center;
    font-size: 16px;
    font-family: montserrat-regular;
    color: ${COLORS.nero};
`;
const CounterBox = styled.View`
    text-align: center;
    align-items: center;
`;
const CounterNumber = styled.Text`
    ${counterCss}
`;
const CounterText = styled.Text`
    ${counterCss}
`;
const IconHolder = styled.Text`
    font-size: 20px;
`;

export default HomeScreen;
