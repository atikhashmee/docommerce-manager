import React, {Component} from 'react';
import {Text, View, StyleSheet, Dimensions} from 'react-native';
import Spinner from 'react-native-loading-spinner-overlay';
import Animated from 'react-native-reanimated';
import {connect} from 'react-redux';
import FormGroup from '@components/form/FormGroup';
import Styles from '@styles';
import Header from './Header';
import Button from '@components/form/buttons/Button';
import styled from 'styled-components/native';
import {COLORS} from '@constants';
import {handleProductObjProperty, cancelOrDiscard, saveToServer} from '@actions/productActions'
import APIKit from '../../../../config/axios'

const Style = StyleSheet.create({
    textAreaStyle: {
        paddingVertical: 0,
        textAlignVertical: 'top',
    },
});

class Seo extends Component {
    constructor(props) {
        super(props);
        this.state = {
            spinner: false,
        };
    }

    handleInputField(evt, key) {
        this.props.handleProductObjProperty(evt, key);
    }

    render() {
        const {spinner} = this.state;
        const {product} = this.props;
        return (
            <View style={Styles.container}>
                <Header navigation={this.props.navigation} title="Add New Product" showBack={true} />
                <Spinner visible={spinner} textContent={'Loading...'} />
                <AnimScrollView style={[Styles.topContainer]}>
                    <Styles.PageHeader>SEO</Styles.PageHeader>
                    <FormGroup>
                        <FormGroup.Label style={Styles.formLabel}>Page Title</FormGroup.Label>
                        <FormGroup.InputGroup style={Styles.inputGroupStyle}>
                            <FormGroup.TextInput onChangeText={(val) => this.handleInputField(val, 'page_title')} value={product.page_title} />
                        </FormGroup.InputGroup>
                    </FormGroup>
                    <FormGroup>
                        <FormGroup.Label style={Styles.formLabel}>Meta Keywords</FormGroup.Label>
                        <FormGroup.InputGroup style={Styles.inputGroupStyle}>
                            <FormGroup.TextInput onChangeText={(val) => this.handleInputField(val, 'meta_keyword')} value={product.meta_keyword} />
                        </FormGroup.InputGroup>
                    </FormGroup>
                    <FormGroup>
                        <FormGroup.Label style={Styles.formLabel}>Meta Description</FormGroup.Label>
                        <FormGroup.InputGroup style={Styles.inputGroupStyle}>
                            <FormGroup.TextInput style={Style.textAreaStyle} onChangeText={(val) => this.handleInputField(val, 'meta_description')} value={product.meta_description} multiline numberOfLines={4} editable />
                        </FormGroup.InputGroup>
                    </FormGroup>

                    <View style={styles.buttonContainer}>
                        <View style={Styles.row}>
                            <View style={Styles.col6}>
                                <Button onPress={() => { this.props.cancelOrDiscard() }} style={styles.button} containerStyle={styles.buttonInner}>
                                    <Button.Text style={styles.btnText}>Discard</Button.Text>
                                </Button>
                            </View>
                            <View style={Styles.col6}>
                                <Button onPress={() => { this.props.saveToServer() }} style={styles.button} containerStyle={styles.buttonInner}>
                                    <Button.Text style={styles.btnText}>Save</Button.Text>
                                </Button>
                            </View>
                        </View>
                    </View>
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

export default connect(mapStateToProps, {handleProductObjProperty, cancelOrDiscard, saveToServer})(Seo);

const AnimScrollView = styled(Animated.ScrollView)`
    flex: 1;
    padding-left: 10px;
    padding-right: 10px;
    padding-top: 10px;
    background-color: ${COLORS.background};
`;

const styles = StyleSheet.create({
    container: {
        ...Styles.topContainer,
        marginHorizontal: 20,
    },
    formContainer: {
        marginTop: 50,
    },
    numberPrefixText: {
        fontSize: 20,
        color: COLORS.gray,
    },
    buttonContainer: {
        flexDirection: 'row',
        marginTop: 10,
        alignItems: 'center',
        justifyContent: 'flex-end',
    },
    button: {
        alignSelf: 'center',
        width: '95%',
    },
    buttonInner: {
        borderRadius: 4,
        paddingVertical: 10,
        paddingHorizontal: 20,
    },
    infoTextContainer: {
        alignItems: 'center',
    },
    inputGroupStyle: {
        borderRadius: 4,
        borderColor: COLORS.primary,
    },
    label: {
        fontFamily: 'Montserrat-Regular',
        fontSize: 18,
    },
    btnText: {
        textTransform: 'capitalize',
        fontFamily: 'Montserrat-Bold',
    },
});
