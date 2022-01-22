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

class Shipping extends Component {
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
                <AnimScrollView style={[Styles.topContainer]}>
                    <Styles.PageHeader>Shipping</Styles.PageHeader>
                    <View style={Styles.row}>
                        <View style={Styles.col6}>
                            <FormGroup>
                                <FormGroup.Label style={Styles.formLabel}>Weight</FormGroup.Label>
                                <FormGroup.InputGroup style={Styles.inputGroupStyle}>
                                    <FormGroup.TextInput onChangeText={(val) => this.setState({mobile: val})} />
                                </FormGroup.InputGroup>
                            </FormGroup>
                        </View>
                        <View style={Styles.col6}>
                            <FormGroup>
                                <FormGroup.Label style={Styles.formLabel}>Package Length</FormGroup.Label>
                                <FormGroup.InputGroup style={Styles.inputGroupStyle}>
                                    <FormGroup.TextInput onChangeText={(val) => this.setState({mobile: val})} />
                                </FormGroup.InputGroup>
                            </FormGroup>
                        </View>
                        <View style={Styles.col6}>
                            <FormGroup>
                                <FormGroup.Label style={Styles.formLabel}>Package Width</FormGroup.Label>
                                <FormGroup.InputGroup style={Styles.inputGroupStyle}>
                                    <FormGroup.TextInput onChangeText={(val) => this.setState({mobile: val})} />
                                </FormGroup.InputGroup>
                            </FormGroup>
                        </View>
                        <View style={Styles.col6}>
                            <FormGroup>
                                <FormGroup.Label style={Styles.formLabel}>Package Height</FormGroup.Label>
                                <FormGroup.InputGroup style={Styles.inputGroupStyle}>
                                    <FormGroup.TextInput onChangeText={(val) => this.setState({mobile: val})} />
                                </FormGroup.InputGroup>
                            </FormGroup>
                        </View>
                    </View>
                    <FormGroup>
                        <FormGroup.Label style={Styles.formLabel}>Show on New Arrival Collection</FormGroup.Label>
                        <Switch value={this.state.isSwitchOn} onValueChange={this.onToggleSwitch} />
                    </FormGroup>
                    <View style={Styles.row}>
                        <View style={Styles.col6}>
                            <FormGroup>
                                <FormGroup.Label style={Styles.formLabel}>Min Order Q.</FormGroup.Label>
                                <FormGroup.InputGroup style={Styles.inputGroupStyle}>
                                    <FormGroup.TextInput onChangeText={(val) => this.setState({mobile: val})} />
                                </FormGroup.InputGroup>
                            </FormGroup>
                        </View>
                        <View style={Styles.col6}>
                            <FormGroup>
                                <FormGroup.Label style={Styles.formLabel}>Max Order Q.</FormGroup.Label>
                                <FormGroup.InputGroup style={Styles.inputGroupStyle}>
                                    <FormGroup.TextInput onChangeText={(val) => this.setState({mobile: val})} />
                                </FormGroup.InputGroup>
                            </FormGroup>
                        </View>
                        <View style={Styles.col6}>
                            <FormGroup>
                                <FormGroup.Label style={Styles.formLabel}>Delivery Quantity.</FormGroup.Label>
                                <FormGroup.InputGroup style={Styles.inputGroupStyle}>
                                    <FormGroup.TextInput onChangeText={(val) => this.setState({mobile: val})} />
                                </FormGroup.InputGroup>
                            </FormGroup>
                        </View>
                    </View>
                    <Styles.PageHeader>Additional Shipping Charge</Styles.PageHeader>
                    <View style={Styles.row}>
                        <View style={Styles.col12}>
                            <FormGroup>
                                <FormGroup.Label style={Styles.formLabel}>Inside Dhaka</FormGroup.Label>
                                <FormGroup.InputGroup style={Styles.inputGroupStyle}>
                                    <FormGroup.TextInput onChangeText={(val) => this.setState({mobile: val})} />
                                </FormGroup.InputGroup>
                            </FormGroup>
                        </View>
                        <View style={Styles.col12}>
                            <FormGroup>
                                <FormGroup.Label style={Styles.formLabel}>Outside Dhaka</FormGroup.Label>
                                <FormGroup.InputGroup style={Styles.inputGroupStyle}>
                                    <FormGroup.TextInput onChangeText={(val) => this.setState({mobile: val})} />
                                </FormGroup.InputGroup>
                            </FormGroup>
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
    };
};

export default connect(mapStateToProps)(Shipping);

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
`;

const PTagInput = styled(TagInput)`
    border: 1px solid red;
`;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: mainColor,
    },
    textInput: {
        height: 40,
        borderColor: 'white',
        borderWidth: 1,
        marginTop: 8,
        borderRadius: 5,
        padding: 3,
    },
    tag: {
        backgroundColor: '#fff',
    },
    tagText: {
        color: mainColor,
    },
});
