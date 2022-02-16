import React, {Component} from 'react';
import {View, StyleSheet, Text} from 'react-native';
import Spinner from 'react-native-loading-spinner-overlay';
import Animated from 'react-native-reanimated';
import FormGroup from '@components/form/FormGroup';
import {connect} from 'react-redux';
import Styles from '@styles';
import Header from './Header';
import styled from 'styled-components/native';
import {COLORS} from '@constants';
import {Picker} from '@react-native-picker/picker';
import {handleProductObjProperty, filterError} from '@actions/productActions'

class ProductInfo extends Component {
    constructor(props) {
        super(props);
        this.state = {
            spinner: false,
        };
    }

    handleInputField(evt, key) {
        this.props.handleProductObjProperty(evt, key);
    }

    generateSlug () {
        // let productSlug = this.props.product
        //     .name
        //     .toString()
        //     .toLowerCase()
        //     .replace(/\s+/g, '-')           // Replace spaces with -
        //     .replace(/[^\w\-]+/g, '')       // Remove all non-word chars
        //     .replace(/\-\-+/g, '-')         // Replace multiple - with single -
        //     .replace(/^-+/, '')             // Trim - from start of text
        //     .replace(/-+$/, '')
        //     .replace(/[[/\]{}()*+?.!~`@%&_=":;,\\^$|#\s]/g, '');
        //     this.handleInputField(productSlug, 'slug')
    }

    render() {
        const {spinner} = this.state;
        const {product} = this.props;
        const errorDisplay = (keyName) => this.props.filterError(keyName)?
            this.props.filterError(keyName).map((err, errKey)=><Text key={errKey} style={{color: 'red'}}>{err}</Text>) : 
            <Text style={{color: 'red'}}>{''}</Text>;
        return (
            <View style={Styles.container}>
                <Header navigation={this.props.navigation} title="Add New Product" showBack={true} />
                <Spinner visible={spinner} textContent={'Loading...'} />
                <AnimScrollView>
                    <Styles.PageHeader>Product Information</Styles.PageHeader>
                    <FormGroup>
                        <FormGroup.Label style={Styles.formLabel}>Product Name <Text style={{color: 'red'}}>*</Text></FormGroup.Label>
                        <FormGroup.InputGroup style={Styles.inputGroupStyle}>
                            <FormGroup.TextInput onChangeText={(val) => {this.handleInputField(val, 'name'); this.generateSlug()}} value={product.name} />
                        </FormGroup.InputGroup>
                        {errorDisplay('name')}
                    </FormGroup>
                    <FormGroup>
                        <FormGroup.Label style={Styles.formLabel}>Product Page URL<Text style={{color: 'red'}}>*</Text></FormGroup.Label>
                        <FormGroup.InputGroup style={{...Styles.inputGroupStyle, backgroundColor: '#f0f0f0'}}>
                            <FormGroup.TextInput value={product.slug} editable={false} />
                        </FormGroup.InputGroup>
                        {errorDisplay('slug')}
                    </FormGroup>
                    <FormGroup>
                        <FormGroup.Label style={Styles.formLabel}>Product Short Description</FormGroup.Label>
                        <FormGroup.InputGroup style={Styles.inputGroupStyle}>
                            <FormGroup.TextInput style={Style.textAreaStyle} onChangeText={(val) => this.handleInputField(val, 'short_description')} multiline numberOfLines={4} editable value={product.short_description}  />
                        </FormGroup.InputGroup>
                        {errorDisplay('short_description')}
                    </FormGroup>
                    <FormGroup>
                        <FormGroup.Label style={Styles.formLabel}>Product Description<Text style={{color: 'red'}}>*</Text></FormGroup.Label>
                        <FormGroup.InputGroup style={Styles.inputGroupStyle}>
                            <FormGroup.TextInput style={Style.textAreaStyle} onChangeText={(val) => this.handleInputField(val, 'description')} multiline numberOfLines={6} editable value={product.description} />
                        </FormGroup.InputGroup>
                        {errorDisplay('description')}
                    </FormGroup>
                    <FormGroup>
                        <FormGroup.Label style={Styles.formLabel}>Status<Text style={{color: 'red'}}>*</Text></FormGroup.Label>
                        <PickerWrapper>
                            <Picker selectedValue={product.status} onValueChange={(itemValue, itemIndex) => {this.handleInputField(itemValue, 'status');}}>
                                <Picker.Item label="Active" value="active" />
                                <Picker.Item label="Inactive" value="inactive" />
                            </Picker>
                        </PickerWrapper>
                        {errorDisplay('status')}
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

export default connect(mapStateToProps, {handleProductObjProperty, filterError})(ProductInfo);

const AnimScrollView = styled(Animated.ScrollView)`
    flex: 1;
    padding-left: 10px;
    padding-right: 10px;
    padding-top: 10px;
    background-color: ${COLORS.background};
`;

const PickerWrapper = styled.View`
    border: 1px solid ${COLORS.primary};
    background-color: ${COLORS.white};
    border-radius: 4px;
`;

const Style = StyleSheet.create({
    textAreaStyle: {
        paddingVertical: 0,
        textAlignVertical: 'top',
    },
});