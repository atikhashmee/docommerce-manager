import React, {Component} from 'react';
import {Image, StyleSheet, View, Text, TouchableOpacity} from 'react-native';
import {connect} from 'react-redux';
import Styles from '@styles';
import {COLORS, images, icons} from '@constants';
import {Spinner} from '@components';
import Button from '@components/form/buttons/Button';
import FormGroup from '@components/form/FormGroup';
import Footer from '@components/inc/Footer';
import {login} from '@actions/userAction';
import styled from 'styled-components/native';
const ManagerAppText = styled.Text`
    font-family: montserrat-regular;
    text-align: right;
`;

class SignIn extends Component {
    constructor(props) {
        super(props);
        this.state = {
            spinner: false,
            email: '',
            password: '',
            secureTextEntry: true,
            passwordVisibled: false,
        };
    }

    componentDidUpdate() {
        //console.log(this.state);
    }

    updateSecureTextEntry = () => {
        this.setState({secureTextEntry: !this.state.secureTextEntry});
    };

    onPressSubmit = () => {
        this.setState({spinner: true});
        this.props
            // .login({email: this.state.email, password: this.state.password})
            .login({email: "iffatalrokib639@gmail.com", password: "12345678"})
            .then((response) => {
                //
            })
            .catch(() => this.setState({spinner: false}));
    };
    render() {
        return (
            <>
                <Spinner visible={this.state.spinner} />
                <View style={styles.container}>
                    <View style={{marginTop: 20, paddingHorizontal: 40}}>
                        <Image source={images.logo} style={Styles.logo} resizeMode="stretch" />
                        <ManagerAppText>Manager App</ManagerAppText>
                    </View>
                    <View>
                        <View style={styles.formContainer}>
                            <FormGroup>
                                <FormGroup.Label style={styles.label}>Email</FormGroup.Label>
                                <FormGroup.InputGroup style={styles.inputGroupStyle}>
                                    <FormGroup.TextInput placeholder="John@example.com" onChangeText={(val) => this.setState({email: val})} />
                                </FormGroup.InputGroup>
                            </FormGroup>
                            <FormGroup>
                                <FormGroup.Label style={styles.label}>Password</FormGroup.Label>
                                <FormGroup.InputGroup style={styles.inputGroupStyle}>
                                    <FormGroup.TextInput onChangeText={(val) => this.setState({password: val})} secureTextEntry={this.state.secureTextEntry ? true : false} />
                                    <TouchableOpacity onPress={this.updateSecureTextEntry}>
                                        {!this.state.secureTextEntry && <Text>{icons.eye}</Text>}
                                        {this.state.secureTextEntry && <Text>{icons.eye_slash}</Text>}
                                    </TouchableOpacity>
                                </FormGroup.InputGroup>
                            </FormGroup>
                        </View>
                        <View style={styles.buttonContainer}>
                            <Button onPress={this.onPressSubmit} style={styles.button} containerStyle={styles.buttonInner}>
                                <Button.Text style={styles.btnText}>Login {icons.Lock}</Button.Text>
                            </Button>
                        </View>
                    </View>
                    {/*<View style={styles.infoTextContainer}>*/}
                    {/*    <Text>You should receive an SMS for verification.</Text>*/}
                    {/*    <Text>Message and data rates may apply</Text>*/}
                    {/*</View>*/}
                </View>
            </>
        );
    }
}

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
        alignSelf: 'flex-end',
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

export default connect(null, {login})(SignIn);
