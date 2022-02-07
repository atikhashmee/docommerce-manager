import React, {Component} from 'react';
import {Text, View, StyleSheet, Dimensions} from 'react-native';
import Spinner from 'react-native-loading-spinner-overlay';
import Animated from 'react-native-reanimated';
import {connect} from 'react-redux';
import FormGroup from '@components/form/FormGroup';
import Styles from '@styles';
import Header from './Header';
import styled from 'styled-components/native';
import {COLORS, icons} from '@constants';
import {Picker} from '@react-native-picker/picker';
import Button from '@components/form/buttons/Button';
import APIKit from '../../../../config/axios'
import DropDownPicker from 'react-native-dropdown-picker';
import {handleProductObjProperty} from '@actions/productActions'

class Branding extends Component {
    constructor(props) {
        super(props);
        this.state = {
            spinner: false,
            origins: [],
            brands: [],
            manufectures: [],
            suppliers: [],

            originOpen: false,
            brandOpen: false,
            manufectureOpen: false,
            supplierOpen: false,
        };
    }

    componentDidMount() {
        APIKit.get('/api/countries')
        .then((response) => {
            let responseData  = response.data
            let origins = []
            if (responseData.length > 0) {
                responseData.forEach(item => {
                    origins.push({label: item.name, value: item.id})
                })
            }
            if (origins.length > 0) {
                this.setState({ origins: origins})
            }
         
        })
        .catch((error) => {
            logError(error);
        });

        APIKit.get('/api/manufectureres')
        .then((response) => {
            let responseData  = response.data
            let manufacturesData = []
            if (responseData.length > 0) {
                responseData.forEach(item => {
                    manufacturesData.push({label: item.manufacturer_name, value: item.id})
                })
            }
            if (manufacturesData.length > 0) {
                this.setState({ manufectures: manufacturesData})
            }
         
        })
        .catch((error) => {
            logError(error);
        });

        APIKit.get('/api/brands')
        .then((response) => {
            let responseData  = response.data
            let brandsData = []
            if (responseData.length > 0) {
                responseData.forEach(item => {
                    brandsData.push({label: item.name, value: item.id})
                })
            }
            if (brandsData.length > 0) {
                this.setState({ brands: brandsData})
            }
         
        })
        .catch((error) => {
            logError(error);
        });


        APIKit.get('/api/suppliers')
        .then((response) => {
            let responseData  = response.data
            let suppliersData = []
            if (responseData.length > 0) {
                responseData.forEach(item => {
                    suppliersData.push({label: item.name, value: item.id})
                })
            }
            if (suppliersData.length > 0) {
                this.setState({ suppliers: suppliersData})
            }
         
        })
        .catch((error) => {
            logError(error);
        });
    }

    setOpen(stateValue, stateItem) {
        this.setState({[stateItem]: stateValue});
    }

    setValue(callback, stateItem) {
        this.props.handleProductObjProperty(callback(), stateItem)
    }

    setItems(callback, stateItem) {
        this.setState(state => ({
            [stateItem]: callback(state[stateItem])
        }));
    }

    render() {
        const {spinner, originOpen, origins, brandOpen, brands, manufectures, manufectureOpen, supplierOpen, suppliers} = this.state;
        const {product} = this.props;
        return (
            <View style={Styles.container}>
                <Header navigation={this.props.navigation} title="Add New Product" showBack={true} />
                <Spinner visible={spinner} textContent={'Loading...'} />
                <AnimScrollView style={[Styles.topContainer]}>
                    <Styles.PageHeader>Branding</Styles.PageHeader>
                    <FormGroup style={styles.FormGroupStyle}>
                        <FormGroup.Label style={Styles.formLabel}>Origin</FormGroup.Label>
                        <PickerWrapper>
                            <DropDownPicker
                                open={originOpen}
                                value={product.country_id}
                                items={origins}
                                setOpen={(openV) => {this.setOpen(openV, 'originOpen')}}
                                setValue={(callb) => this.setValue(callb, 'country_id')}
                                setItems={(callbb) => this.setItems(callbb, 'origins')}
                                searchable={true}
                                placeholder="Select an item"
                                listMode="SCROLLVIEW" 
                                zIndex={6000}
                                zIndexInverse={1000}
                            />
                        </PickerWrapper>
                        
                    </FormGroup>
                    <FormGroup style={styles.FormGroupStyle}>
                        <FormGroup.Label style={Styles.formLabel}>Brand</FormGroup.Label>
                        <PickerWrapper>
                            <DropDownPicker
                                open={brandOpen}
                                value={product.brand_id}
                                items={brands}
                                setOpen={(openV) => {this.setOpen(openV, 'brandOpen')}}
                                setValue={(callb) => this.setValue(callb, 'brand_id')}
                                setItems={(callbb) => this.setItems(callbb, 'brands')}
                                searchable={true}
                                placeholder="Select an item"
                                listMode="SCROLLVIEW" 
                                zIndex={5000}
                                zIndexInverse={2000}
                               
                            />
                        </PickerWrapper>
                        <View style={styles.buttonContainer}>
                            <View style={Styles.row}>
                                <View style={Styles.col8} />
                                <View style={Styles.col4}>
                                    <Button onPress={this.onPressSubmit} style={styles.button} containerStyle={styles.buttonInner}>
                                        <Button.Text style={styles.btnText}>Add New {icons.plus}</Button.Text>
                                    </Button>
                                </View>
                            </View>
                        </View>
                    </FormGroup>
                    <FormGroup style={styles.FormGroupStyle}>
                        <FormGroup.Label style={Styles.formLabel}>Manufacturer</FormGroup.Label>
                        <PickerWrapper>
                            <DropDownPicker
                                open={manufectureOpen}
                                value={product.manufacturer_id}
                                items={manufectures}
                                setOpen={(openV) => {this.setOpen(openV, 'manufectureOpen')}}
                                setValue={(callb) => this.setValue(callb, 'manufacturer_id')}
                                setItems={(callbb) => this.setItems(callbb, 'manufectures')}
                                searchable={true}
                                placeholder="Select an item"
                                listMode="SCROLLVIEW" 
                                zIndex={4000}
                                zIndexInverse={3000}
                            />
                        </PickerWrapper>
                        
                        <View style={styles.buttonContainer}>
                            <View style={Styles.row}>
                                <View style={Styles.col8} />
                                <View style={Styles.col4}>
                                    <Button onPress={this.onPressSubmit} style={styles.button} containerStyle={styles.buttonInner}>
                                        <Button.Text style={styles.btnText}>Add New {icons.plus}</Button.Text>
                                    </Button>
                                </View>
                            </View>
                        </View>
                    </FormGroup>
                    <FormGroup style={styles.FormGroupStyle}>
                        <FormGroup.Label style={Styles.formLabel}>Supplier</FormGroup.Label>
                        <PickerWrapper>
                            <DropDownPicker
                                open={supplierOpen}
                                value={product.admin_id}
                                items={suppliers}
                                setOpen={(openV) => {this.setOpen(openV, 'supplierOpen')}}
                                setValue={(callb) => this.setValue(callb, 'admin_id')}
                                setItems={(callbb) => this.setItems(callbb, 'suppliers')}
                                searchable={true}
                                placeholder="Select an item"
                                listMode="SCROLLVIEW" 
                                zIndex={3000}
                                zIndexInverse={4000}
                            />
                        </PickerWrapper>
                         
                        <View style={styles.buttonContainer}>
                            <View style={Styles.row}>
                                <View style={Styles.col8} />
                                <View style={Styles.col4}>
                                    <Button onPress={this.onPressSubmit} style={styles.button} containerStyle={styles.buttonInner}>
                                        <Button.Text style={styles.btnText}>Add New {icons.plus}</Button.Text>
                                    </Button>
                                </View>
                            </View>
                        </View>
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

export default connect(mapStateToProps, {handleProductObjProperty})(Branding);

const AnimScrollView = styled(Animated.ScrollView)`
    flex: 1;
    padding-left: 10px;
    padding-right: 10px;
    padding-top: 10px;
    background-color: ${COLORS.background};
`;

const PickerWrapper = styled.View`
    margin-bottom: 5px;
    position: relative;
    z-index: 9999;
`;

const styles = StyleSheet.create({
    buttonInner: {
        borderRadius: 4,
        paddingVertical: 10,
        paddingHorizontal: 20,
    },
    btnText: {
        textTransform: 'capitalize',
        fontFamily: 'Montserrat-Bold',
    },
    FormGroupStyle: {
        paddingVertical: 0,
    },
});
