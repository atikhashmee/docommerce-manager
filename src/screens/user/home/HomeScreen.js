import React, {Component} from 'react';
import {SafeAreaView, ScrollView, Text, View} from 'react-native';
import Spinner from 'react-native-loading-spinner-overlay';
import Styles from '@styles';
import Header from '@components/inc/Header';
import styled, {css} from 'styled-components';
import {COLORS, icons, SIZES} from '@constants';

class HomeScreen extends Component {
    constructor(props) {
        super(props);
        this.state = {
            spinner: false,
            refreshing: false,
        };
    }

    menuNavigation() {
        this.props.navigation.navigate('ProductCreateScreen');
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
                        <SafeAreaView>
                            <ScrollView showsHorizontalScrollIndicator={false} contentContainerStyle={[Styles.row, {justifyContent: 'space-between'}]}>
                                <SmallBox>
                                    <A onPress={() => this.menuNavigation()}>
                                        <MenuText>Add Product</MenuText>
                                    </A>
                                </SmallBox>
                                <LargeBox>
                                    <A onPress={() => this.menuNavigation()}>
                                        <MenuText>Add Category</MenuText>
                                    </A>
                                </LargeBox>
                                <LargeBox second>
                                    <A onPress={() => this.menuNavigation()}>
                                        <MenuText>Add Menu</MenuText>
                                    </A>
                                </LargeBox>
                                <SmallBox>
                                    <A onPress={() => this.menuNavigation()}>
                                        <MenuText>Settings</MenuText>
                                    </A>
                                </SmallBox>
                                <SmallBox>
                                    <A onPress={() => this.menuNavigation()}>
                                        <MenuText>Add Products</MenuText>
                                    </A>
                                </SmallBox>
                                <LargeBox>
                                    <A onPress={() => this.menuNavigation()}>
                                        <MenuText>Add Products</MenuText>
                                    </A>
                                </LargeBox>
                            </ScrollView>
                        </SafeAreaView>
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
    padding: 20px;
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

const menuBoxCss = css`
    background-color: ${COLORS.primary};
    flex-basis: 49%;
    margin-bottom: 10px;
    justify-content: center;
    align-items: center;
`;

const SmallBox = styled.View`
    ${menuBoxCss}
    height: 100px;
`;
const LargeBox = styled.View`
    ${menuBoxCss}
    height: 150px;
    ${({second}) =>
        second &&
        `
      margin-top: -50px;
    `}
`;
const MenuText = styled.Text`
    text-align: center;
    margin: auto;
    color: ${COLORS.white};
    font-size: ${SIZES.base * 2.5}px;
    font-family: montserrat-regular;
`;
const A = styled.Pressable`
    width: 100%;
    height: 100%;
`;

export default HomeScreen;
