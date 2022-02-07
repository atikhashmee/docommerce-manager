import React, {Component} from 'react';
import {Text, View, StyleSheet, Dimensions} from 'react-native';
import Spinner from 'react-native-loading-spinner-overlay';
import Animated from 'react-native-reanimated';
import {connect} from 'react-redux';
import FormGroup from '@components/form/FormGroup';
import Styles from '@styles';
import Header from './Header';
import styled from 'styled-components/native';
import {COLORS} from '@constants';
import {Switch} from 'react-native-paper';
import {handleProductObjProperty} from '@actions/productActions'

const mainColor = '#3ca897';

class ProductSettings extends Component {
    constructor(props) {
        super(props);
        this.state = {
            spinner: false,
            isSwitchOn: false,
        };
    }

    render() {
        const {spinner} = this.state;
        const {product} = this.props;
        return (
            <View style={Styles.container}>
                <Header navigation={this.props.navigation} title="Add New Product" showBack={true} />
                <Spinner visible={spinner} textContent={'Loading...'} />
                <AnimScrollView style={[Styles.topContainer]}>
                    <Styles.PageHeader>Settings</Styles.PageHeader>
                    <FormGroup>
                        <FormGroup.Label style={Styles.formLabel}>Tax Applicable</FormGroup.Label>
                        <SwitchWrapper>
                            <SwithText>ON</SwithText>
                            <CustomeSwitch value={product.tax} onValueChange={(evt) => {this.props.handleProductObjProperty(evt, 'tax')}} />
                            <SwithText>OFF</SwithText>
                        </SwitchWrapper>
                    </FormGroup>
                    <FormGroup>
                        <FormGroup.Label style={Styles.formLabel}>Show product when out of stock</FormGroup.Label>
                        <SwitchWrapper>
                            <SwithText>ON</SwithText>
                            <CustomeSwitch value={product.show_product_when_of_stock} onValueChange={(evt) => {this.props.handleProductObjProperty(evt, 'show_product_when_of_stock')}} />
                            <SwithText>OFF</SwithText>
                        </SwitchWrapper>
                    </FormGroup>
                    <FormGroup>
                        <FormGroup.Label style={Styles.formLabel}>Check stock during add to cart</FormGroup.Label>
                        <SwitchWrapper>
                            <SwithText>ON</SwithText>
                            <CustomeSwitch value={product.check_stock_during_add_to_cart} onValueChange={(evt) => {this.props.handleProductObjProperty(evt, 'check_stock_during_add_to_cart')}} />
                            <SwithText>OFF</SwithText>
                        </SwitchWrapper>
                    </FormGroup>
                </AnimScrollView>
            </View>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        token: state.userReducer && state.userReducer.token,
        authUser: state.userReducer && state.userReducer.authUser,
        product: state.productReducer && state.productReducer.product,
    };
};

export default connect(mapStateToProps, {handleProductObjProperty})(ProductSettings);

const AnimScrollView = styled(Animated.ScrollView)`
    flex: 1;
    padding-left: 10px;
    padding-right: 10px;
    padding-top: 10px;
    background-color: ${COLORS.background};
`;

const SwitchWrapper = styled.View`
    flex: 1;
    flex-direction: row;
`;

const CustomeSwitch = styled(Switch)`
    border: 1px solid red;
`;

const SwithText = styled.Text`
    font-size: 18px;
`;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: mainColor,
    },
});
