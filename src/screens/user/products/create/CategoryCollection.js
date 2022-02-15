import React, { Component } from 'react';
import { Text, View, StyleSheet, Dimensions } from 'react-native';
import Spinner from 'react-native-loading-spinner-overlay';
import Animated from 'react-native-reanimated';
import { connect } from 'react-redux';
import FormGroup from '@components/form/FormGroup';
import Styles from '@styles';
import Header from './Header';
import styled from 'styled-components/native';
import { COLORS } from '@constants';
import TagInput from 'react-native-tags-input';
import { Switch } from 'react-native-paper';
import APIKit from '../../../../config/axios'
import DropDownPicker from 'react-native-dropdown-picker';
import {handleProductObjProperty} from '@actions/productActions'

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
            categories: [],
            mainCategoryOpen: false,
            mainCategoryValue: null,
            categoryOpen: false,
            categoryValue: [],
            categoryLoading: false,
        };
        this.setMainCategoryOpen = this.setMainCategoryOpen.bind(this);
        this.setMainCategoryValue = this.setMainCategoryValue.bind(this);
        this.setCategoryOpen = this.setCategoryOpen.bind(this);
        this.setCategoryValue = this.setCategoryValue.bind(this);
        this.setItems = this.setItems.bind(this);
    }

    componentDidMount() {
        APIKit.get('/api/categories')
            .then((response) => {
                this.categoryTreeView(response.data);
            })
            .catch((error) => {
                logError(error);
            });
    }

    categoryTreeView(categories) {
        const allCategories = []
        if (categories.length > 0) {
            categories.forEach(parent => {
                allCategories.push({label: parent.category_name, value: parent.id})
                if (parent.nested.length > 0) {
                    parent.nested.forEach(secondChild => {
                        allCategories.push({label: secondChild.category_name, value: secondChild.id, parent: secondChild.parent_id})
                        if (secondChild.nested.length > 0) {
                            secondChild.nested.forEach(thirdChild => {
                                allCategories.push({label: thirdChild.category_name, value: thirdChild.id, parent: thirdChild.parent_id})
                            })
                        }
                    })
                }
            })
        }
        if (allCategories.length > 0) {
            this.setState({ categories: allCategories, categoryLoading: true })

        }
    }

    updateTagState = (state) => {
        this.setState({
            tags: state,
        },  () => { this.props.handleProductObjProperty(this.state.tags.tagsArray, 'tags')});
    };

    setMainCategoryOpen(mainCategoryOpen) {
        this.setState({mainCategoryOpen});
    }
    setCategoryOpen(categoryOpen) {
        this.setState({categoryOpen});
    }

    setMainCategoryValue(callback) {
        this.setState(state => ({mainCategoryValue: callback(state.mainCategoryValue)}), 
        () => { this.props.handleProductObjProperty(this.state.mainCategoryValue, 'category_id')});
    }
    setCategoryValue(callback) {
        this.setState(state => ({categoryValue: callback(state.categoryValue)}),
        () => { this.props.handleProductObjProperty(this.state.categoryValue, 'other_categories')}
        );
    }

    setItems(callback) {
        this.setState(state => ({items: callback(state.categories)}));
    }

    render() {
        const { spinner, mainCategoryOpen, categoryLoading, mainCategoryValue, categoryOpen, categoryValue, categories } = this.state;
        const {  product } = this.props;
        return (
            <View style={Styles.container}>
                <Header navigation={this.props.navigation} title="Add New Product" showBack={true} />
                <Spinner visible={spinner} textContent={'Loading...'} />
                <AnimScrollView style={[Styles.topContainer]}>
                    <Styles.PageHeader>Category & Collection</Styles.PageHeader>
                    <FormGroup style={styles.formGroupStyle}>
                        <FormGroup.Label style={Styles.formLabel}>Main Category</FormGroup.Label>
                        <DropDownPicker
                            loading={categoryLoading}
                            open={mainCategoryOpen}
                            value={product.category_id}
                            items={categories}
                            setOpen={this.setMainCategoryOpen}
                            setValue={this.setMainCategoryValue}
                            setItems={this.setItems}
                            searchable={true}
                            placeholder="Select an item"
                            zIndex={3000}
                            zIndexInverse={1000}
                            listMode="SCROLLVIEW" 
                        />
                    </FormGroup>
                    <FormGroup style={styles.formGroupStyle}>
                        <FormGroup.Label style={Styles.formLabel}>Categories</FormGroup.Label>
                        <DropDownPicker
                            loading={categoryLoading}
                            open={categoryOpen}
                            value={product.other_categories}
                            multiple={true}
                            items={categories}
                            setOpen={this.setCategoryOpen}
                            setValue={this.setCategoryValue}
                            setItems={this.setItems}
                            searchable={true}
                            placeholder="Select an item"
                            zIndex={2000}
                            zIndexInverse={2000}
                            listMode="SCROLLVIEW" 
                        />
                        
                    </FormGroup>
                    <FormGroup style={styles.formGroupStyle}>
                        <FormGroup.Label style={Styles.formLabel}>Tags</FormGroup.Label>
                        <PTagInput
                            updateState={this.updateTagState}
                            tags={this.state.tags}
                            placeholder="Tags..."
                            containerStyle={styles.tagInputContainerStyle}
                            inputContainerStyle={[styles.textInput, { backgroundColor: COLORS.white, margin: 0 }]}
                            inputStyle={{ color: this.state.tagsText }}
                            onFocus={() => this.setState({ tagsColor: '#fff', tagsText: mainColor })}
                            onBlur={() => this.setState({ tagsColor: mainColor, tagsText: '#fff' })}
                            autoCorrect={false}
                            tagStyle={styles.tag}
                            tagTextStyle={styles.tagText}
                            keysForTag={', '}
                        />
                        <Text style={{fontSize: 10, marginLeft: 3}}>Press comma & space to add a tag</Text>
                    </FormGroup>
                    <FormGroup>
                        <FormGroup.Label style={Styles.formLabel}>Show on Featured Collection</FormGroup.Label>
                        <SwitchWrapper>
                            <SwithText>OFF</SwithText>
                            <CustomeSwitch value={product.feature} onValueChange={(evt) => {
                               this.props.handleProductObjProperty(evt, 'feature')
                            }} />
                            <SwithText>ON</SwithText>
                        </SwitchWrapper>
                    </FormGroup>
                    <FormGroup>
                        <FormGroup.Label style={Styles.formLabel}>Show on New Arrival Collection</FormGroup.Label>
                        <SwitchWrapper>
                            <SwithText>OFF</SwithText>
                            <CustomeSwitch value={product.new_arrival} onValueChange={(evt) => {
                               this.props.handleProductObjProperty(evt, 'new_arrival')
                            }} />
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
        product: state.productReducer && state.productReducer.product,
    };
};

export default connect(mapStateToProps, {handleProductObjProperty})(CategoryCollection);

const AnimScrollView = styled(Animated.ScrollView)`
    flex: 1;
    padding-left: 10px;
    padding-right: 10px;
    padding-top: 10px;
    background-color: ${COLORS.background};
`;

const PTagInput = styled(TagInput)`
    width: 100%;
    border: 1px solid ${COLORS.primary};
    border-radius: 4px;
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
