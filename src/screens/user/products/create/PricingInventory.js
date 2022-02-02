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
import TagInput from 'react-native-tags-input';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import {Switch} from 'react-native-paper';

const mainColor = '#3ca897';

class PricingInventory extends Component {
    constructor(props) {
        super(props);
        this.state = {
            spinner: false,
            emails: '',
            text: '',
            tags: {
                tag: '',
                tagsArray: [],
            },
            isSwitchOn: false,
        };
    }

    updateTagState = (state) => {
        this.setState({
            tags: state,
        });
    };

    onToggleSwitch = () => this.setState({isSwitchOn: !this.state.isSwitchOn});

    render() {
        const {spinner} = this.state;
        return (
            <View style={Styles.container}>
                <Header navigation={this.props.navigation} title="Add New Product" showBack={true} />
                <Spinner visible={spinner} textContent={'Loading...'} />
                <AnimScrollView>
                    <Styles.PageHeader>Pricing & Inventory</Styles.PageHeader>
                    <FormGroup>
                        <FormGroup.Label style={Styles.formLabel}>This products has multiple options, like different sizes or color</FormGroup.Label>
                        <SwitchWrapper>
                            <SwithText>No</SwithText>
                            <CustomeSwitch value={this.state.isSwitchOn} onValueChange={this.onToggleSwitch} />
                            <SwithText>Yes</SwithText>
                        </SwitchWrapper>
                    </FormGroup>
                    {!this.state.isSwitchOn && (
                        <VariantPricingWrapper>
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
                    )}

                    {this.state.isSwitchOn && (
                        <VariantPricingWrapper>
                            <View style={Styles.row}>
                                <View style={Styles.col12}>
                                    <FormGroup style={styles.formGroupStyle}>
                                        <FormGroup.Label style={Styles.formLabel}>Categories</FormGroup.Label>
                                        <PickerWrapper>
                                            <Picker
                                                selectedValue={this.state.selectedLanguage}
                                                onValueChange={(itemValue, itemIndex) => this.setState({selectedLanguage: itemValue})}>
                                                <Picker.Item label="Select Options" value="" />
                                                <Picker.Item label="Size" value="size" />
                                                <Picker.Item label="Color" value="color" />
                                            </Picker>
                                        </PickerWrapper>
                                    </FormGroup>
                                </View>
                                <View style={Styles.col12}>
                                    <FormGroup style={styles.formGroupStyle}>
                                        <FormGroup.Label style={Styles.formLabel}>Value</FormGroup.Label>
                                        <FormGroup.InputGroup style={Styles.inputGroupStyle}>
                                            <FormGroup.TextInput onChangeText={(val) => this.setState({mobile: val})} />
                                        </FormGroup.InputGroup>
                                    </FormGroup>
                                </View>
                            </View>
                            <View style={{...Styles.row, justifyContent: 'flex-end', marginRight: 15, marginTop: 3}}>
                                <Button onPress={this.onPressSubmit} style={styles.button} containerStyle={styles.buttonInner}>
                                    <Button.Text style={styles.btnText}>Add More {icons.plus}</Button.Text>
                                </Button>
                            </View>
                        </VariantPricingWrapper>
                    )}
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

export default connect(mapStateToProps)(PricingInventory);

const AnimScrollView = styled(Animated.ScrollView)`
    flex: 1;
    padding-left: 10px;
    padding-right: 10px;
    padding-top: 10px;
    padding-bottom: 10px;
    background-color: ${COLORS.background};
`;

const SwitchWrapper = styled.View`
    flex: 1;
    flex-direction: row;
    min-height: 30px;
`;

const CustomeSwitch = styled(Switch)`
    border: 1px solid red;
`;

const SwithText = styled.Text`
    font-size: 18px;
`;

const VariantPricingWrapper = styled.View`
    margin-top: 3px;
    margin-bottom: 20px;
`;

const BlockName = styled.Text`
    color: ${COLORS.black};
    margin-top: 3px;
    margin-bottom: 3px;
    padding-left: 3px;
`;
const PickerWrapper = styled.View`
    border: 1px solid ${COLORS.primary};
    background-color: ${COLORS.white};
`;

const styles = StyleSheet.create({
    formGroupStyle: {
        width: '95%',
        paddingVertical: 0,
    },
    buttonInner: {
        borderRadius: 4,
        paddingVertical: 10,
        paddingHorizontal: 20,
    },
    btnText: {
        textTransform: 'capitalize',
        fontFamily: 'Montserrat-Bold',
    },
});
