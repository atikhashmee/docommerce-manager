import React, {Component} from 'react';
import {View, StyleSheet} from 'react-native';
import Spinner from 'react-native-loading-spinner-overlay';
import Animated from 'react-native-reanimated';
import FormGroup from '@components/form/FormGroup';
import {connect} from 'react-redux';
import Styles from '@styles';
import Header from './Header';
import styled from 'styled-components/native';
import {COLORS} from '@constants';
import {Picker} from '@react-native-picker/picker';

const Style = StyleSheet.create({
    textAreaStyle: {
        paddingVertical: 0,
        textAlignVertical: 'top',
    },
});

class ProductInfo extends Component {
    constructor(props) {
        super(props);
        this.state = {
            spinner: false,
            selectedLanguage: '',
        };
    }

    render() {
        const {spinner} = this.state;
        return (
            <View style={Styles.container}>
                <Header navigation={this.props.navigation} title="Add New Product" showBack={true} />
                <Spinner visible={spinner} textContent={'Loading...'} />
                <AnimScrollView>
                    <Styles.PageHeader>Product Information</Styles.PageHeader>
                    <FormGroup>
                        <FormGroup.Label style={Styles.formLabel}>Product Name</FormGroup.Label>
                        <FormGroup.InputGroup style={Styles.inputGroupStyle}>
                            <FormGroup.TextInput onChangeText={(val) => this.setState({mobile: val})} />
                        </FormGroup.InputGroup>
                    </FormGroup>
                    <FormGroup>
                        <FormGroup.Label style={Styles.formLabel}>Product Page URL</FormGroup.Label>
                        <FormGroup.InputGroup style={Styles.inputGroupStyle}>
                            <FormGroup.TextInput onChangeText={(val) => this.setState({mobile: val})} />
                        </FormGroup.InputGroup>
                    </FormGroup>
                    <FormGroup>
                        <FormGroup.Label style={Styles.formLabel}>Product Short Description</FormGroup.Label>
                        <FormGroup.InputGroup style={Styles.inputGroupStyle}>
                            <FormGroup.TextInput style={Style.textAreaStyle} onChangeText={(val) => this.setState({mobile: val})} multiline numberOfLines={4} editable />
                        </FormGroup.InputGroup>
                    </FormGroup>
                    <FormGroup>
                        <FormGroup.Label style={Styles.formLabel}>Product Description</FormGroup.Label>
                        <FormGroup.InputGroup style={Styles.inputGroupStyle}>
                            <FormGroup.TextInput style={Style.textAreaStyle} onChangeText={(val) => this.setState({mobile: val})} multiline numberOfLines={6} editable />
                        </FormGroup.InputGroup>
                    </FormGroup>
                    <FormGroup>
                        <FormGroup.Label style={Styles.formLabel}>Status</FormGroup.Label>
                        <PickerWrapper>
                            <Picker selectedValue={this.state.selectedLanguage} onValueChange={(itemValue, itemIndex) => this.setState({selectedLanguage: itemValue})}>
                                <Picker.Item label="Active" value="active" />
                                <Picker.Item label="Inactive" value="inactive" />
                            </Picker>
                        </PickerWrapper>
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
    };
};

export default connect(mapStateToProps)(ProductInfo);

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
