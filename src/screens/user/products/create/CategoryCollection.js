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

class CategoryCollection extends Component {
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
            tagsColor: mainColor,
            tagsText: '#fff',
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
                    <Styles.PageHeader>Category & Collection</Styles.PageHeader>
                    <FormGroup style={styles.formGroupStyle}>
                        <FormGroup.Label style={Styles.formLabel}>Main Category</FormGroup.Label>
                        <PickerWrapper>
                            <Picker selectedValue={this.state.selectedLanguage} onValueChange={(itemValue, itemIndex) => this.setState({selectedLanguage: itemValue})}>
                                <Picker.Item label="Main Category" value="" />
                                <Picker.Item label="Inactive" value="inactive" />
                            </Picker>
                        </PickerWrapper>
                    </FormGroup>
                    <FormGroup style={styles.formGroupStyle}>
                        <FormGroup.Label style={Styles.formLabel}>Categories</FormGroup.Label>
                        <PickerWrapper>
                            <Picker selectedValue={this.state.selectedLanguage} onValueChange={(itemValue, itemIndex) => this.setState({selectedLanguage: itemValue})}>
                                <Picker.Item label="Categories" value="" />
                                <Picker.Item label="Inactive" value="inactive" />
                            </Picker>
                        </PickerWrapper>
                    </FormGroup>
                    <FormGroup style={styles.formGroupStyle}>
                        <FormGroup.Label style={Styles.formLabel}>Tags</FormGroup.Label>
                        <PTagInput
                            updateState={this.updateTagState}
                            tags={this.state.tags}
                            placeholder="Tags..."
                            // label="Press comma & space to add a tag"
                            // labelStyle={{color: '#000'}}
                            // leftElement={<Icon name={'tag-multiple'} type={'material-community'} color={this.state.tagsText} />}
                            // leftElementContainerStyle={{marginLeft: 3}}
                            containerStyle={styles.tagInputContainerStyle}
                            inputContainerStyle={[styles.textInput, {backgroundColor: COLORS.white, margin: 0}]}
                            inputStyle={{color: this.state.tagsText}}
                            onFocus={() => this.setState({tagsColor: '#fff', tagsText: mainColor})}
                            onBlur={() => this.setState({tagsColor: mainColor, tagsText: '#fff'})}
                            autoCorrect={false}
                            tagStyle={styles.tag}
                            tagTextStyle={styles.tagText}
                            keysForTag={', '}
                        />
                    </FormGroup>
                    <FormGroup>
                        <FormGroup.Label style={Styles.formLabel}>Show on Featured Collection</FormGroup.Label>
                        <SwitchWrapper>
                            <SwithText>OFF</SwithText>
                            <CustomeSwitch value={this.state.isSwitchOn} onValueChange={this.onToggleSwitch} />
                            <SwithText>ON</SwithText>
                        </SwitchWrapper>
                    </FormGroup>
                    <FormGroup>
                        <FormGroup.Label style={Styles.formLabel}>Show on New Arrival Collection</FormGroup.Label>
                        <SwitchWrapper>
                            <SwithText>OFF</SwithText>
                            <CustomeSwitch value={this.state.isSwitchOn} onValueChange={this.onToggleSwitch} />
                            <SwithText>ON</SwithText>
                        </SwitchWrapper>
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

export default connect(mapStateToProps)(CategoryCollection);

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

const PTagInput = styled(TagInput)`
    width: 100%;
    border: 1px solid ${COLORS.primary};
    border-radius: 4px;
`;

const SwitchWrapper = styled.View`
    flex: 1;
    flex-direction: row;
`;

const CustomeSwitch = styled(Switch)`
    border: 1px solid red;
`;

const SwithText = styled.Text`
    font-size: 18px;
    color: #000;
`;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: mainColor,
    },
    textInput: {
        borderColor: 'white',
        borderWidth: 1,
        borderRadius: 5,
    },
    tag: {
        backgroundColor: '#fff',
        borderWidth: 1,
        borderColor: COLORS.primary,
        padding: 2,
    },
    tagText: {
        color: COLORS.black,
    },
    formGroupStyle: {
        width: '100%',
        paddingVertical: 0,
        paddingHorizontal: 0,
    },
    tagInputContainerStyle: {
        width: '100%',
        margin: 0,
        paddingHorizontal: 0,
    },
});
