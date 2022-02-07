import React, {Component} from 'react';
import {View, StyleSheet} from 'react-native';
import Spinner from 'react-native-loading-spinner-overlay';
import Animated from 'react-native-reanimated';
import {connect} from 'react-redux';
import FormGroup from '@components/form/FormGroup';
import Styles from '@styles';
import Header from './Header';
import styled from 'styled-components/native';
import {COLORS} from '@constants';
import {handleProductObjProperty} from '@actions/productActions'
import APIKit from '../../../../config/axios'
import DropDownPicker from 'react-native-dropdown-picker';

class PricingInventoryStepThree extends Component {
    constructor(props) {
        super(props);
        this.state = {
            spinner: false,
            isSwitchOn: false,
            variants: [],
            warehouses: [],
            warehouseOpen: false,
            warehouseValue: null,
        };
        this.setItems = this.setItems.bind(this);
    }

    componentDidMount() {
        APIKit.get('/api/warehouses')
        .then((response) => {
            let warehosueData  = response.data
            let warehouseList = []
            if (warehosueData.length > 0) {
                warehosueData.forEach(item => {
                    warehouseList.push({label: item.warehouse_id, value: item.id})
                })
            }
            if (warehouseList.length > 0) {
                this.setState({ warehouses: warehouseList})
            }
         
        })
        .catch((error) => {
            logError(error);
        });

        //add dropdownpickeropen attribute on the fly
        if (this.props.product.variants.length > 0) {
            this.props.product.variants = this.props.product.variants.map(item => {
                item.dropdownPickerOpen = false;
                return item;
            })
        }
    }

    componentDidUpdate() {
        //console.log(this.props.product.variants, '-------');
    }

    handleDynamicInputFieldObj(val, key, item_id) {
        let variantsData = [...this.props.product.variants]
        if (variantsData.length > 0) {
            variantsData = variantsData.map(item => {
                if (item.item_id === item_id) {
                    item[key] = val;
                }
                console.log(item, 'asdddd');
                return item;
            })
        }
        this.props.handleProductObjProperty(variantsData, 'variants')
    }

    setItems(callback) {
        this.setState(state => ({items: callback(state.warehouses)}));
    }

    render() {
        const {spinner, warehouses, warehouseOpen, warehouseValue} = this.state;
        const {product} = this.props;
        
        return (
            <View style={Styles.container}>
                <Header navigation={this.props.navigation} title="Add New Product" showBack={true} />
                <Spinner visible={spinner} textContent={'Loading...'} />
                <AnimScrollView>
                    <Styles.PageHeader>Variant Pricing</Styles.PageHeader>
                    {product.variants.length > 0 && product.variants.map((item, itemKey) =>  (<VariantPricingWrapper key={itemKey}>
                            <VariantHeading> {item.name}</VariantHeading>
                            <BlockName>Price</BlockName>
                            <View style={Styles.row}>
                                <View style={Styles.col6}>
                                    <FormGroup style={styles.formGroupStyle}>
                                        <FormGroup.Label style={Styles.formLabel}>Previous Price</FormGroup.Label>
                                        <FormGroup.InputGroup style={Styles.inputGroupStyle}>
                                            <FormGroup.TextInput onChangeText={(val) => this.handleDynamicInputFieldObj(val, 'old_price', item.item_id)} value={item.old_price} />
                                        </FormGroup.InputGroup>
                                    </FormGroup>
                                </View>
                                <View style={Styles.col6}>
                                    <FormGroup style={styles.formGroupStyle}>
                                        <FormGroup.Label style={Styles.formLabel}>Selling Price</FormGroup.Label>
                                        <FormGroup.InputGroup style={Styles.inputGroupStyle}>
                                            <FormGroup.TextInput onChangeText={(val) => this.handleDynamicInputFieldObj(val, 'price', item.item_id)}  value={item.price} />
                                        </FormGroup.InputGroup>
                                    </FormGroup>
                                </View>
                                <View style={Styles.col6}>
                                    <FormGroup style={styles.formGroupStyle}>
                                        <FormGroup.Label style={Styles.formLabel}>Product Cost</FormGroup.Label>
                                        <FormGroup.InputGroup style={Styles.inputGroupStyle}>
                                            <FormGroup.TextInput onChangeText={(val) => this.handleDynamicInputFieldObj(val, 'product_cost', item.item_id)}  value={item.product_cost} />
                                        </FormGroup.InputGroup>
                                    </FormGroup>
                                </View>
                                <View style={Styles.col6}>
                                    <FormGroup style={styles.formGroupStyle}>
                                        <FormGroup.Label style={Styles.formLabel}>Profit Amount</FormGroup.Label>
                                        <FormGroup.InputGroup style={Styles.inputGroupStyle}>
                                            <FormGroup.TextInput onChangeText={(val) => this.handleDynamicInputFieldObj(val, 'profit_amount', item.item_id)} value={item.profit_amount} />
                                        </FormGroup.InputGroup>
                                    </FormGroup>
                                </View>
                            </View>
                            <BlockName>Inventory</BlockName>
                            <View style={Styles.row}>
                                <View style={Styles.col6}>
                                    <FormGroup style={styles.formGroupStyle}>
                                        <FormGroup.Label style={Styles.formLabel}>Initial Stock Quantity</FormGroup.Label>
                                        <FormGroup.InputGroup style={Styles.inputGroupStyle}>
                                            <FormGroup.TextInput onChangeText={(val) => this.handleDynamicInputFieldObj(val, 'quantity', item.item_id)}  value={item.quantity}  />
                                        </FormGroup.InputGroup>
                                    </FormGroup>
                                </View>
                                <View style={Styles.col6}>
                                    <FormGroup style={styles.formGroupStyle}>
                                        <FormGroup.Label style={Styles.formLabel}>SKU</FormGroup.Label>
                                        <FormGroup.InputGroup style={Styles.inputGroupStyle}>
                                            <FormGroup.TextInput onChangeText={(val) => this.handleDynamicInputFieldObj(val, 'sku', item.item_id)} value={item.sku} />
                                        </FormGroup.InputGroup>
                                    </FormGroup>
                                </View>
                                <View style={Styles.col6}>
                                    <FormGroup style={styles.formGroupStyle}>
                                        <FormGroup.Label style={Styles.formLabel}>Warehouse</FormGroup.Label>
                                        {/* <FormGroup.InputGroup style={Styles.inputGroupStyle}>
                                            <FormGroup.TextInput onChangeText={(val) => this.handleDynamicInputFieldObj(val, 'warehouse_id', item.item_id)} value={item.warehouse_id}  />
                                        </FormGroup.InputGroup> */}
                                        <DropDownPicker
                                            open={item.dropdownPickerOpen}
                                            value={item.warehouse_id}
                                            items={warehouses}
                                            setOpen={(val) => {this.handleDynamicInputFieldObj(val, 'dropdownPickerOpen', item.item_id)}}
                                            setValue={ (callback) => {this.handleDynamicInputFieldObj(callback(item.warehouse_id), 'warehouse_id', item.item_id)}}
                                            setItems={this.setItems}
                                            searchable={true}
                                            placeholder="Select an item"
                                            listMode="SCROLLVIEW" 
                                            zIndex={4000}
                                            zIndexInverse={4000}
                                        />
                                    </FormGroup>
                                </View>
                                <View style={Styles.col6}>
                                    <FormGroup style={styles.formGroupStyle}>
                                        <FormGroup.Label style={Styles.formLabel}>Barcode</FormGroup.Label>
                                        <FormGroup.InputGroup style={Styles.inputGroupStyle}>
                                            <FormGroup.TextInput onChangeText={(val) => this.handleDynamicInputFieldObj(val, 'barcode', item.item_id)} value={item.barcode} />
                                        </FormGroup.InputGroup>
                                    </FormGroup>
                                </View>
                            </View>
                        </VariantPricingWrapper>))}
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

export default connect(mapStateToProps, {handleProductObjProperty})(PricingInventoryStepThree);

const AnimScrollView = styled(Animated.ScrollView)`
    flex: 1;
    padding-left: 10px;
    padding-right: 10px;
    padding-top: 10px;
    background-color: ${COLORS.background};
`;

const VariantHeading = styled.Text`
    height: 30px;
    border-left-width: 2px;
    border-left-color: ${COLORS.primary};
    background-color: ${COLORS.white};
    text-align: center;
    text-align-vertical: center;
`;

const VariantPricingWrapper = styled.View`
    border: 1px solid ${COLORS.background};
    margin-top: 3px;
    margin-bottom: 20px;
`;

const BlockName = styled.Text`
    color: ${COLORS.black};
    margin-top: 3px;
    margin-bottom: 3px;
    padding-left: 3px;
`;

const styles = StyleSheet.create({
    formGroupStyle: {
        width: '95%',
        paddingVertical: 0,
    },
});
