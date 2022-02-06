import React, {Component} from 'react';
import {Text, View, StyleSheet, Dimensions, Pressable} from 'react-native';
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
import APIKit from '../../../../config/axios'
import {Switch, List} from 'react-native-paper';
import {handleProductObjProperty} from '@actions/productActions'
import DropDownPicker from 'react-native-dropdown-picker';
import TagInput from 'react-native-tags-input';

const mainColor = '#3ca897';

class PricingInventory extends Component {
    constructor(props) {
        super(props);
        this.state = {
            spinner: false,
            warehouses: [],
            
            warehouseOpen: false,
            warehouseValue: null,
            warehouseLoading: false,

            variantOptions: [],
            selectedVariantOption:null,

            tags: {
                tag: '',
                tagsArray: [],
            }, 
            tagsColor: mainColor,
            tagsText: '#fff',
        };

        this.setwarehouseOpen = this.setwarehouseOpen.bind(this);
        this.setwarehouseValue = this.setwarehouseValue.bind(this);
        this.setItems = this.setItems.bind(this);
    }

    componentDidMount() {
        APIKit.get('/api/warehouses')
        .then((response) => {
            let warehosueData  = response.data
            let warehouseList = []
            if (warehosueData.length > 0) {
                warehosueData.forEach(item => {
                    warehouseList.push({label: item.warehouse_id, value: item.id})
                })
            }
            if (warehouseList.length > 0) {
                this.setState({ warehouses: warehouseList})
            }
         
        })
        .catch((error) => {
            logError(error);
        });
    }

    handleInputField(evt, key) {
        this.props.handleProductObjProperty(evt, key);
    }

    setwarehouseOpen(warehouseOpen) {
        this.setState({warehouseOpen});
    }

    setwarehouseValue(callback) {
        this.setState(state => ({warehouseValue: callback(state.warehouseValue)}),
        () => { this.props.handleProductObjProperty(this.state.warehouseValue, 'warehouse_id')}
        );
    }

    setItems(callback) {
        this.setState(state => ({items: callback(state.warehouses)}));
    }

    updateTagState = (state) => {
        this.setState({tags: state});
    };

    cartesian(...a) {
        return a.reduce((a, b) => a.flatMap(d => b.map(e => [d, e].flat())));
    }

    addVariantOptions() {
        let var_options = [...this.state.variantOptions];
        if (this.state.selectedVariantOption !==null && this.state.tags.tagsArray.length > 0 && var_options.length < 4) {
            //check for duplicate entry
            let optionExist = var_options.some(item => item.option == this.state.selectedVariantOption)
            if (optionExist) {
                var_options = var_options.map(item => {
                    if (item.option == this.state.selectedVariantOption) {
                        let newValue = this.state.tags.tagsArray
                        let oldValue = item.value
                        let unique = [...new Set(newValue.concat(oldValue))];
                        item.value = [...unique.sort()]
                    }
                    return item;
                })
            } else {
                var_options.push({option: this.state.selectedVariantOption, value: [...this.state.tags.tagsArray]})
            }
        }

        this.setState({variantOptions: var_options}, () => this.makeVariant());
        this.props.handleProductObjProperty(var_options, 'variant_options')
        this.setState({tags: {
            tag: '',
            tagsArray: [],
        }, selectedVariantOption: null});
    }

    makeVariant() {
        let variants;
        let product_variants = [];
        let options = this.props.product.variant_options;
        if (options.length === 1) {
            variants = this.cartesian(options[0].value);
        } else if (options.length === 2) {
            variants = this.cartesian(options[0].value, options[1].value);
        } else {
            variants = this.cartesian(options[0].value, options[1].value, options[2].value);
        }
        variants.forEach(function (value, index, array) {
            product_variants.push({
                warehouse_id: '',
                name: value instanceof Array ? value.join('/') : value,
                opt1_value: value instanceof Array ? value[0] : value,
                opt2_value: options.length === 2 ? value[1] : '',
                opt3_value: options.length === 3 ? value[2] : '',
                price: '',
                old_price: '',
                product_cost: '',
                quantity: '',
                sku: '',
                barcode: '',
                profit_amount: '',
            });
        });
        this.props.handleProductObjProperty(product_variants, 'variants')
    }
    
    removeVariantOption(option) {
        let variant_options = [...this.props.product.variant_options]
        let removedOption = variant_options.filter(item => item.option != option) 
        this.props.handleProductObjProperty(removedOption, 'variant_options')
    }

    render() {
        const {spinner, warehouses, warehouseOpen, warehouseValue} = this.state;
        const {product} = this.props;
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
                            <CustomeSwitch value={product.has_variant} onValueChange={(evt) => {
                               this.props.handleProductObjProperty(evt, 'has_variant')
                            }} />
                            <SwithText>Yes</SwithText>
                        </SwitchWrapper>
                    </FormGroup>
                    {!product.has_variant && (
                        <VariantPricingWrapper>
                            <BlockName>Price</BlockName>
                            <View style={Styles.row}>
                                <View style={Styles.col6}>
                                    <FormGroup style={styles.formGroupStyle}>
                                        <FormGroup.Label style={Styles.formLabel}>Previous Price {product.old_price}</FormGroup.Label>
                                        <FormGroup.InputGroup style={Styles.inputGroupStyle}>
                                            <FormGroup.TextInput  keyboardType="number-pad" onChangeText={(val) => this.handleInputField(val, 'old_price')} />
                                        </FormGroup.InputGroup>
                                    </FormGroup>
                                </View>
                                <View style={Styles.col6}>
                                    <FormGroup style={styles.formGroupStyle}>
                                        <FormGroup.Label style={Styles.formLabel}>Selling Price</FormGroup.Label>
                                        <FormGroup.InputGroup style={Styles.inputGroupStyle}>
                                            <FormGroup.TextInput  keyboardType="number-pad" onChangeText={(val) => this.handleInputField(val, 'price')} />
                                        </FormGroup.InputGroup>
                                    </FormGroup>
                                </View>
                                <View style={Styles.col6}>
                                    <FormGroup style={styles.formGroupStyle}>
                                        <FormGroup.Label style={Styles.formLabel}>Product Cost</FormGroup.Label>
                                        <FormGroup.InputGroup style={Styles.inputGroupStyle}>
                                            <FormGroup.TextInput  keyboardType="number-pad" onChangeText={(val) => this.handleInputField(val, 'cost')} />
                                        </FormGroup.InputGroup>
                                    </FormGroup>
                                </View>
                                <View style={Styles.col6}>
                                    <FormGroup style={styles.formGroupStyle}>
                                        <FormGroup.Label style={Styles.formLabel}>Profit Amount</FormGroup.Label>
                                        <FormGroup.InputGroup style={Styles.inputGroupStyle}>
                                            <FormGroup.TextInput  keyboardType="number-pad" onChangeText={(val) => this.handleInputField(val, 'profit_amount')} />
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
                                            <FormGroup.TextInput  keyboardType="number-pad" onChangeText={(val) => this.handleInputField(val, 'initial_stock_qty')} />
                                        </FormGroup.InputGroup>
                                    </FormGroup>
                                </View>
                                <View style={Styles.col6}>
                                    <FormGroup style={styles.formGroupStyle}>
                                        <FormGroup.Label style={Styles.formLabel}>SKU</FormGroup.Label>
                                        <FormGroup.InputGroup style={Styles.inputGroupStyle}>
                                            <FormGroup.TextInput onChangeText={(val) => this.handleInputField(val, 'sku')} />
                                        </FormGroup.InputGroup>
                                    </FormGroup>
                                </View>
                                <View style={Styles.col6}>
                                <FormGroup style={styles.formGroupStyle}>
                                    <FormGroup.Label style={Styles.formLabel}>Warehouse</FormGroup.Label>
                                    <DropDownPicker
                                        open={warehouseOpen}
                                        value={warehouseValue}
                                        items={warehouses}
                                        setOpen={this.setwarehouseOpen}
                                        setValue={this.setwarehouseValue}
                                        setItems={this.setItems}
                                        searchable={true}
                                        placeholder="Select an item"
                                        listMode="SCROLLVIEW" 
                                    />
                                </FormGroup>
                                </View>
                                <View style={Styles.col6}>
                                    <FormGroup style={styles.formGroupStyle}>
                                        <FormGroup.Label style={Styles.formLabel}>Barcode</FormGroup.Label>
                                        <FormGroup.InputGroup style={Styles.inputGroupStyle}>
                                            <FormGroup.TextInput onChangeText={(val) => this.handleInputField(val, 'barcode')} />
                                        </FormGroup.InputGroup>
                                    </FormGroup>
                                </View>
                            </View>
                        </VariantPricingWrapper>
                    )}

                    {product.has_variant && (
                        <VariantPricingWrapper>
                            <View style={Styles.row}>
                                <View style={Styles.col12}>
                                    <FormGroup style={styles.formGroupStyle}>
                                        <FormGroup.Label style={Styles.formLabel}>Categories</FormGroup.Label>
                                        <PickerWrapper>
                                            <Picker
                                                selectedValue={this.state.selectedVariantOption}
                                                onValueChange={(itemValue, itemIndex) => this.setState({selectedVariantOption: itemValue})}>
                                                <Picker.Item label="Select Options" value="" />
                                                <Picker.Item label="Size" value="size" />
                                                <Picker.Item label="Color" value="color" />
                                                <Picker.Item label="Material" value="material" />
                                                <Picker.Item label="Style" value="style" />
                                                <Picker.Item label="Title" value="title" />
                                            </Picker>
                                        </PickerWrapper>
                                    </FormGroup>
                                </View>
                                <View style={Styles.col12}>
                                    <FormGroup style={styles.formGroupStyle}>
                                        <FormGroup.Label style={Styles.formLabel}>Value</FormGroup.Label>
                                        <PTagInput
                                            updateState={this.updateTagState}
                                            tags={this.state.tags}
                                            placeholder="value..."
                                            // label="Press comma & space to add a tag"
                                            // labelStyle={{color: '#000'}}
                                            // leftElement={<Icon name={'tag-multiple'} type={'material-community'} color={this.state.tagsText} />}
                                            // leftElementContainerStyle={{marginLeft: 3}}
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
                                    </FormGroup>
                                </View>
                            </View>
                            {!(product.variant_options.length >= 3) && <View style={{...Styles.row, justifyContent: 'flex-end', marginRight: 15, marginTop: 3}}>
                                <Button onPress={() => this.addVariantOptions()} style={styles.button} containerStyle={styles.buttonInner}>
                                    <Button.Text style={styles.btnText}>Add More {icons.plus}</Button.Text>
                                </Button>
                            </View>}
                            <View style={Styles.row}>
                                <View style={Styles.col12}>
                                <List.Section>
                                    <List.Subheader>Options Added</List.Subheader>
                                    {product.variant_options.length > 0 && product.variant_options.map((item, optionKey) => ( <List.Item style={{paddingVertical: 0, marginBottom: 10, backgroundColor: COLORS.white}} key={optionKey} title={<View>
                                        <ListItemHeader>{item.option}</ListItemHeader>
                                        <SwitchWrapper>{item.value.length > 0 && item.value.map((sItem, skey) => (<ListItemSubItems key={skey}>{sItem}</ListItemSubItems>))}</SwitchWrapper>
                                    </View>} right={() => <Pressable onPress={()=> this.removeVariantOption(item.option)}><List.Icon  color={COLORS.red} icon="delete" /></Pressable> } />))}
                                    {product.variant_options.length == 0 && (<Styles.PageHeader>No Items Added</Styles.PageHeader>)}
                                </List.Section>
                                </View>
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
        product: state.productReducer && state.productReducer.product,
    };
};

export default connect(mapStateToProps, {handleProductObjProperty})(PricingInventory);

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
const ListItemHeader = styled(BlockName)`
    font-weight: bold;
`;
const ListItemSubItems = styled(BlockName)`
    border: 1px solid #d3d3d3;
    padding: 5px;
    margin-right: 3px;
`;
const PickerWrapper = styled.View`
    border: 1px solid ${COLORS.primary};
    background-color: ${COLORS.white};
`;
const PTagInput = styled(TagInput)`
    width: 100%;
    border: 1px solid ${COLORS.primary};
    border-radius: 4px;
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
