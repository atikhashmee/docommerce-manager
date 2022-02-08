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
import APIKit from '../../../../config/axios'

const mainColor = '#3ca897';

class Shipping extends Component {
    constructor(props) {
        super(props);
        this.state = {
            spinner: false,
        };
    }

    handleInputField(evt, key, chargeItem=null) {
        if (chargeItem !== null) {
            let shippingCharges = [...this.props.product.additional_charges_by_shipping];
            shippingCharges = shippingCharges.map(item => {
                if (chargeItem.id === item.id) {
                    item.price_value = evt
                }
                return item;
            })
            this.props.handleProductObjProperty(shippingCharges, 'additional_charges_by_shipping');
        } else {
            this.props.handleProductObjProperty(evt, key);
        }
    }

    componentDidMount() {
        APIKit.get('/api/local-shippings')
        .then((response) => {
            let localShippingData = response.data, 
            localShippings = []
            
            if (localShippingData.length > 0) {
                localShippings = localShippingData.map(item => ({shipping_type: 'local', id: item.id, carrier_name: item.carrier.name, price_value: null}))
                if (localShippings.length > 0) {
                    this.props.handleProductObjProperty(localShippings, 'additional_charges_by_shipping');
                }
            }
        })
        .catch((error) => {
            logError(error);
        });
    }

    componentDidUpdate() {
        //console.log(this.state.localShippings.length);
    }

    render() {
        const {spinner, localShippings} = this.state;
        const {product} = this.props;
        return (
            <View style={Styles.container}>
                <Header navigation={this.props.navigation} title="Add New Product" showBack={true} />
                <Spinner visible={spinner} textContent={'Loading...'} />
                <AnimScrollView style={[Styles.topContainer]}>
                    <Styles.PageHeader>Shipping</Styles.PageHeader>
                    <View style={Styles.row}>
                        <View style={Styles.col6}>
                            <FormGroup style={styles.formGroupStyle}>
                                <FormGroup.Label style={Styles.formLabel}>Weight</FormGroup.Label>
                                <FormGroup.InputGroup style={Styles.inputGroupStyle}>
                                    <FormGroup.TextInput onChangeText={(val) => this.handleInputField(val, 'weight')} value={product.weight} />
                                </FormGroup.InputGroup>
                            </FormGroup>
                        </View>
                        <View style={Styles.col6}>
                            <FormGroup style={styles.formGroupStyle}>
                                <FormGroup.Label style={Styles.formLabel}>Package Length</FormGroup.Label>
                                <FormGroup.InputGroup style={Styles.inputGroupStyle}>
                                    <FormGroup.TextInput onChangeText={(val) => this.handleInputField(val, 'length')} value={product.length} />
                                </FormGroup.InputGroup>
                            </FormGroup>
                        </View>
                        <View style={Styles.col6}>
                            <FormGroup style={styles.formGroupStyle}>
                                <FormGroup.Label style={Styles.formLabel}>Package Width</FormGroup.Label>
                                <FormGroup.InputGroup style={Styles.inputGroupStyle}>
                                    <FormGroup.TextInput onChangeText={(val) => this.handleInputField(val, 'width')} value={product.width} />
                                </FormGroup.InputGroup>
                            </FormGroup>
                        </View>
                        <View style={Styles.col6}>
                            <FormGroup style={styles.formGroupStyle}>
                                <FormGroup.Label style={Styles.formLabel}>Package Height</FormGroup.Label>
                                <FormGroup.InputGroup style={Styles.inputGroupStyle}>
                                    <FormGroup.TextInput onChangeText={(val) => this.handleInputField(val, 'height')} value={product.height} />
                                </FormGroup.InputGroup>
                            </FormGroup>
                        </View>
                    </View>
                    <FormGroup>
                        <FormGroup.Label style={Styles.formLabel}>Local delivery</FormGroup.Label>
                        <SwitchWrapper>
                            <SwithText>No</SwithText>
                            <CustomeSwitch value={product.local_delivery} onValueChange={(evt) => this.handleInputField(evt, 'local_delivery')} />
                            <SwithText>Yes</SwithText>
                        </SwitchWrapper>
                    </FormGroup>
                    {product.local_delivery && (<>
                        <View style={Styles.row}>
                            <View style={Styles.col6}>
                                <FormGroup style={styles.formGroupStyle}>
                                    <FormGroup.Label style={Styles.formLabel}>Min Order Q.</FormGroup.Label>
                                    <FormGroup.InputGroup style={Styles.inputGroupStyle}>
                                        <FormGroup.TextInput onChangeText={(val) => this.handleInputField(val, 'local_min_order_qty')} value={product.local_min_order_qty} />
                                    </FormGroup.InputGroup>
                                </FormGroup>
                            </View>
                            <View style={Styles.col6}>
                                <FormGroup style={styles.formGroupStyle}>
                                    <FormGroup.Label style={Styles.formLabel}>Max Order Q.</FormGroup.Label>
                                    <FormGroup.InputGroup style={Styles.inputGroupStyle}>
                                        <FormGroup.TextInput onChangeText={(val) => this.handleInputField(val, 'local_max_order_qty')} value={product.local_max_order_qty} />
                                    </FormGroup.InputGroup>
                                </FormGroup>
                            </View>
                            <View style={Styles.col6}>
                                <FormGroup>
                                    <FormGroup.Label style={Styles.formLabel}>Delivery Quantity.</FormGroup.Label>
                                    <FormGroup.InputGroup style={Styles.inputGroupStyle}>
                                        <FormGroup.TextInput onChangeText={(val) => this.handleInputField(val, 'local_delivery_qty')} value={product.local_delivery_qty} />
                                    </FormGroup.InputGroup>
                                </FormGroup>
                            </View>
                        </View>
                        <Styles.PageHeader>Additional Shipping Charge</Styles.PageHeader>
                        <View style={Styles.row}>
                            {product.additional_charges_by_shipping.length > 0 && product.additional_charges_by_shipping.map((item, itemk) => (
                            <View style={Styles.col6} key={itemk}>
                                <FormGroup>
                                    <FormGroup.Label style={Styles.formLabel}>{item.carrier_name}</FormGroup.Label>
                                    <FormGroup.InputGroup style={Styles.inputGroupStyle}>
                                        <FormGroup.TextInput onChangeText={(val) => this.handleInputField(val, 'additional_charges_by_shipping', item)} value={item.price_value} />
                                    </FormGroup.InputGroup>
                                </FormGroup>
                            </View>))}
                        </View>
                    </>)}
                    
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


export default connect(mapStateToProps, {handleProductObjProperty})(Shipping);

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
    formGroupStyle: {
        width: '95%',
    },
});
