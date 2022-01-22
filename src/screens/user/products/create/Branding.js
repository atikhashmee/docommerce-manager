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
import Button from '@components/form/buttons/Button';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import {Switch} from 'react-native-paper';

const mainColor = '#3ca897';

class Branding extends Component {
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
                    <Styles.PageHeader>Branding</Styles.PageHeader>
                    <FormGroup>
                        <FormGroup.Label style={Styles.formLabel}>Origin</FormGroup.Label>
                        <PickerWrapper>
                            <Picker selectedValue={this.state.selectedLanguage} onValueChange={(itemValue, itemIndex) => this.setState({selectedLanguage: itemValue})}>
                                <Picker.Item label="Select Origin" value="" />
                                <Picker.Item label="Inactive" value="inactive" />
                            </Picker>
                        </PickerWrapper>
                    </FormGroup>
                    <FormGroup>
                        <FormGroup.Label style={Styles.formLabel}>Brand</FormGroup.Label>
                        <PickerWrapper>
                            <Picker selectedValue={this.state.selectedLanguage} onValueChange={(itemValue, itemIndex) => this.setState({selectedLanguage: itemValue})}>
                                <Picker.Item label="Select Brand" value="" />
                                <Picker.Item label="Inactive" value="inactive" />
                            </Picker>
                        </PickerWrapper>
                        <View style={styles.buttonContainer}>
                            <View style={Styles.row}>
                                <View style={Styles.col6}></View>
                                <View style={Styles.col6}>
                                    <Button onPress={this.onPressSubmit} style={styles.button} containerStyle={styles.buttonInner}>
                                        <Button.Text style={styles.btnText}>Add New</Button.Text>
                                    </Button>
                                </View>
                            </View>
                        </View>
                    </FormGroup>
                    <FormGroup>
                        <FormGroup.Label style={Styles.formLabel}>Manufacturer</FormGroup.Label>
                        <PickerWrapper>
                            <Picker selectedValue={this.state.selectedLanguage} onValueChange={(itemValue, itemIndex) => this.setState({selectedLanguage: itemValue})}>
                                <Picker.Item label="Select Manufacturer" value="" />
                                <Picker.Item label="Inactive" value="inactive" />
                            </Picker>
                        </PickerWrapper>
                        <View style={styles.buttonContainer}>
                            <View style={Styles.row}>
                                <View style={Styles.col6}></View>
                                <View style={Styles.col6}>
                                    <Button onPress={this.onPressSubmit} style={styles.button} containerStyle={styles.buttonInner}>
                                        <Button.Text style={styles.btnText}>Add New</Button.Text>
                                    </Button>
                                </View>
                            </View>
                        </View>
                    </FormGroup>
                    <FormGroup>
                        <FormGroup.Label style={Styles.formLabel}>Supplier</FormGroup.Label>
                        <PickerWrapper>
                            <Picker selectedValue={this.state.selectedLanguage} onValueChange={(itemValue, itemIndex) => this.setState({selectedLanguage: itemValue})}>
                                <Picker.Item label="Select Supplier" value="" />
                                <Picker.Item label="Inactive" value="inactive" />
                            </Picker>
                        </PickerWrapper>
                        <View style={styles.buttonContainer}>
                            <View style={Styles.row}>
                                <View style={Styles.col6}></View>
                                <View style={Styles.col6}>
                                    <Button onPress={this.onPressSubmit} style={styles.button} containerStyle={styles.buttonInner}>
                                        <Button.Text style={styles.btnText}>Add New</Button.Text>
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
    };
};

export default connect(mapStateToProps)(Branding);

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
