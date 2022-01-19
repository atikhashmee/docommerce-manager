import React, {Component} from 'react';
import {Text, View} from 'react-native';
import Spinner from 'react-native-loading-spinner-overlay';
import Animated from 'react-native-reanimated';
import FormGroup from '@components/form/FormGroup';
import {connect} from 'react-redux';
import Styles from '@styles';
import Header from './Header';
import styled, {css} from 'styled-components/native';
import {COLORS} from '@constants';

class ProductInfo extends Component {
    constructor(props) {
        super(props);
        this.state = {
            spinner: false,
        };
    }

    render() {
        const {spinner} = this.state;
        return (
            <View style={Styles.container}>
                <Header navigation={this.props.navigation} title="Add New Product" />
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
                            <FormGroup.TextInput onChangeText={(val) => this.setState({mobile: val})} />
                        </FormGroup.InputGroup>
                    </FormGroup>
                    <FormGroup>
                        <FormGroup.Label style={Styles.formLabel}>Product Description</FormGroup.Label>
                        <FormGroup.InputGroup style={Styles.inputGroupStyle}>
                            <FormGroup.TextInput onChangeText={(val) => this.setState({mobile: val})} />
                        </FormGroup.InputGroup>
                    </FormGroup>
                    <FormGroup>
                        <FormGroup.Label style={Styles.formLabel}>Status</FormGroup.Label>
                        <FormGroup.InputGroup style={Styles.inputGroupStyle}>
                            <FormGroup.TextInput onChangeText={(val) => this.setState({mobile: val})} />
                        </FormGroup.InputGroup>
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
