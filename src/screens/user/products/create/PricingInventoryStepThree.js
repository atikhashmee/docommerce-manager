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
import {Picker} from '@react-native-picker/picker';
import TagInput from 'react-native-tags-input';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import {Switch} from 'react-native-paper';

const mainColor = '#3ca897';

class PricingInventoryStepThree extends Component {
    constructor(props) {
        super(props);
        this.state = {
            spinner: false,
            isSwitchOn: false,
        };
    }
    render() {
        const {spinner} = this.state;
        return (
            <View style={Styles.container}>
                <Header navigation={this.props.navigation} title="Add New Product" showBack={true} />
                <Spinner visible={spinner} textContent={'Loading...'} />
                <AnimScrollView>
                    <Styles.PageHeader>Variant Pricing -- 3</Styles.PageHeader>
                    <VariantPricingWrapper>
                        <VariantHeading>XL</VariantHeading>
                        <BlockName>Price</BlockName>
                        <View style={Styles.row}>
                            <View style={Styles.col6}>
                                <FormGroup style={styles.formGroupStyle}>
                                    <FormGroup.Label style={Styles.formLabel}>Previous Price</FormGroup.Label>
                                    <FormGroup.InputGroup style={Styles.inputGroupStyle}>
                                        <FormGroup.TextInput onChangeText={(val) => this.setState({mobile: val})} />
                                    </FormGroup.InputGroup>
                                </FormGroup>
                            </View>
                            <View style={Styles.col6}>
                                <FormGroup style={styles.formGroupStyle}>
                                    <FormGroup.Label style={Styles.formLabel}>Selling Price</FormGroup.Label>
                                    <FormGroup.InputGroup style={Styles.inputGroupStyle}>
                                        <FormGroup.TextInput onChangeText={(val) => this.setState({mobile: val})} />
                                    </FormGroup.InputGroup>
                                </FormGroup>
                            </View>
                            <View style={Styles.col6}>
                                <FormGroup style={styles.formGroupStyle}>
                                    <FormGroup.Label style={Styles.formLabel}>Product Cost</FormGroup.Label>
                                    <FormGroup.InputGroup style={Styles.inputGroupStyle}>
                                        <FormGroup.TextInput onChangeText={(val) => this.setState({mobile: val})} />
                                    </FormGroup.InputGroup>
                                </FormGroup>
                            </View>
                            <View style={Styles.col6}>
                                <FormGroup style={styles.formGroupStyle}>
                                    <FormGroup.Label style={Styles.formLabel}>Profit Amount</FormGroup.Label>
                                    <FormGroup.InputGroup style={Styles.inputGroupStyle}>
                                        <FormGroup.TextInput onChangeText={(val) => this.setState({mobile: val})} />
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
                                        <FormGroup.TextInput onChangeText={(val) => this.setState({mobile: val})} />
                                    </FormGroup.InputGroup>
                                </FormGroup>
                            </View>
                            <View style={Styles.col6}>
                                <FormGroup style={styles.formGroupStyle}>
                                    <FormGroup.Label style={Styles.formLabel}>SKU</FormGroup.Label>
                                    <FormGroup.InputGroup style={Styles.inputGroupStyle}>
                                        <FormGroup.TextInput onChangeText={(val) => this.setState({mobile: val})} />
                                    </FormGroup.InputGroup>
                                </FormGroup>
                            </View>
                            <View style={Styles.col6}>
                                <FormGroup style={styles.formGroupStyle}>
                                    <FormGroup.Label style={Styles.formLabel}>Warehouse</FormGroup.Label>
                                    <FormGroup.InputGroup style={Styles.inputGroupStyle}>
                                        <FormGroup.TextInput onChangeText={(val) => this.setState({mobile: val})} />
                                    </FormGroup.InputGroup>
                                </FormGroup>
                            </View>
                            <View style={Styles.col6}>
                                <FormGroup style={styles.formGroupStyle}>
                                    <FormGroup.Label style={Styles.formLabel}>Barcode</FormGroup.Label>
                                    <FormGroup.InputGroup style={Styles.inputGroupStyle}>
                                        <FormGroup.TextInput onChangeText={(val) => this.setState({mobile: val})} />
                                    </FormGroup.InputGroup>
                                </FormGroup>
                            </View>
                        </View>
                    </VariantPricingWrapper>
                    <VariantPricingWrapper>
                        <VariantHeading>SM</VariantHeading>
                        <BlockName>Price</BlockName>
                        <View style={Styles.row}>
                            <View style={Styles.col6}>
                                <FormGroup style={styles.formGroupStyle}>
                                    <FormGroup.Label style={Styles.formLabel}>Previous Price</FormGroup.Label>
                                    <FormGroup.InputGroup style={Styles.inputGroupStyle}>
                                        <FormGroup.TextInput onChangeText={(val) => this.setState({mobile: val})} />
                                    </FormGroup.InputGroup>
                                </FormGroup>
                            </View>
                            <View style={Styles.col6}>
                                <FormGroup style={styles.formGroupStyle}>
                                    <FormGroup.Label style={Styles.formLabel}>Selling Price</FormGroup.Label>
                                    <FormGroup.InputGroup style={Styles.inputGroupStyle}>
                                        <FormGroup.TextInput onChangeText={(val) => this.setState({mobile: val})} />
                                    </FormGroup.InputGroup>
                                </FormGroup>
                            </View>
                            <View style={Styles.col6}>
                                <FormGroup style={styles.formGroupStyle}>
                                    <FormGroup.Label style={Styles.formLabel}>Product Cost</FormGroup.Label>
                                    <FormGroup.InputGroup style={Styles.inputGroupStyle}>
                                        <FormGroup.TextInput onChangeText={(val) => this.setState({mobile: val})} />
                                    </FormGroup.InputGroup>
                                </FormGroup>
                            </View>
                            <View style={Styles.col6}>
                                <FormGroup style={styles.formGroupStyle}>
                                    <FormGroup.Label style={Styles.formLabel}>Profit Amount</FormGroup.Label>
                                    <FormGroup.InputGroup style={Styles.inputGroupStyle}>
                                        <FormGroup.TextInput onChangeText={(val) => this.setState({mobile: val})} />
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
                                        <FormGroup.TextInput onChangeText={(val) => this.setState({mobile: val})} />
                                    </FormGroup.InputGroup>
                                </FormGroup>
                            </View>
                            <View style={Styles.col6}>
                                <FormGroup style={styles.formGroupStyle}>
                                    <FormGroup.Label style={Styles.formLabel}>SKU</FormGroup.Label>
                                    <FormGroup.InputGroup style={Styles.inputGroupStyle}>
                                        <FormGroup.TextInput onChangeText={(val) => this.setState({mobile: val})} />
                                    </FormGroup.InputGroup>
                                </FormGroup>
                            </View>
                            <View style={Styles.col6}>
                                <FormGroup style={styles.formGroupStyle}>
                                    <FormGroup.Label style={Styles.formLabel}>Warehouse</FormGroup.Label>
                                    <FormGroup.InputGroup style={Styles.inputGroupStyle}>
                                        <FormGroup.TextInput onChangeText={(val) => this.setState({mobile: val})} />
                                    </FormGroup.InputGroup>
                                </FormGroup>
                            </View>
                            <View style={Styles.col6}>
                                <FormGroup style={styles.formGroupStyle}>
                                    <FormGroup.Label style={Styles.formLabel}>Barcode</FormGroup.Label>
                                    <FormGroup.InputGroup style={Styles.inputGroupStyle}>
                                        <FormGroup.TextInput onChangeText={(val) => this.setState({mobile: val})} />
                                    </FormGroup.InputGroup>
                                </FormGroup>
                            </View>
                        </View>
                    </VariantPricingWrapper>
                </AnimScrollView>
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

export default connect(mapStateToProps)(PricingInventoryStepThree);

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
