import React, {Component} from 'react';
import {SafeAreaView, ScrollView, Text, View, ToastAndroid, Pressable, StyleSheet} from 'react-native';
import Spinner from 'react-native-loading-spinner-overlay';
import Styles from '@styles';
import Animated from 'react-native-reanimated';
import Header from './Header';
import styled, {css} from 'styled-components';
import {COLORS, icons, SIZES} from '@constants';
import {connect} from 'react-redux';
import APIKit from '../../../config/axios'
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import { DataTable } from 'react-native-paper';

const TopTab = createMaterialTopTabNavigator();

class DetailsViewTabs extends Component {
    constructor(props) {
        super(props);
        
        this.state = {
            spinner: false,
            refreshing: false,
            product: null,
        };

    }

    componentDidMount() {
        const {product} = this.props.route.params
        this.setState({ spinner: true})
        APIKit.get('/api/products/'+product.id)
        .then((response) => {
            this.setState({ spinner: false})
            console.log(response.data, 'ddd');
            this.setState({ product: response.data})
        })
        .catch((error) => {
            this.setState({ spinner: false})
            logError(error);
        });
    }

    render() {
        const {product} = this.state
        return(
            <View style={Styles.container}>
                <Spinner visible={this.state.spinner} textContent={'Loading...'} />
                {product && <>
                    <Header navigation={this.props.navigation} showBack={true} title={product.name} />
                    <TopTab.Navigator>
                        <TopTab.Screen name="info" children={() => <Info product={product} />} />
                        <TopTab.Screen name="pricing" children={() => <Pricing product={product} />} />
                        <TopTab.Screen name="branding" children={() => <Branding product={product} />} />
                    </TopTab.Navigator>
                </>}
            </View>
       )
    }
}


class Info extends Component {
    constructor(props) {
        super(props);
        this.state = {
            spinner: false,
            refreshing: false,
        };
    }

    componentDidMount() {
        
    }

    render() {
        const {product} = this.props
        return (
            <AnimScrollView>
                <View style={[Styles.row, styles.infoRow]}>
                    <View style={[Styles.col6, styles.infoCell]}><InfoHeading>Product Name</InfoHeading></View>
                    <View style={[Styles.col6, styles.infoCellValue]}><Text>{product.name}</Text></View>
                </View>
                <View style={[Styles.row, styles.infoRow]}>
                    <View style={[Styles.col6, styles.infoCell]}><InfoHeading>Main category</InfoHeading></View>
                    <View style={[Styles.col6, styles.infoCellValue]}><Text>{product.category.category_name}</Text></View>
                </View>
                <View style={[Styles.row, styles.infoRow]}>
                    <View style={[Styles.col6, styles.infoCell]}><InfoHeading>Categories</InfoHeading></View>
                    <View style={[Styles.col6, styles.infoCellValue]}><Text>{product.categories.map(item => item.category_name).join(',')}</Text></View>
                </View>
                <View style={[Styles.row, styles.infoRow]}>
                    <View style={[Styles.col6, styles.infoCell]}><InfoHeading>Tags</InfoHeading></View>
                    <View style={[Styles.col6, styles.infoCellValue]}><Text>{product.categories.map(item => item.title).join(':')}</Text></View>
                </View>
                <View style={[Styles.row, styles.infoRow]}>
                    <View style={[Styles.col6, styles.infoCell]}><InfoHeading>Show on Facebook Shop</InfoHeading></View>
                    <View style={[Styles.col6, styles.infoCellValue]}><Text>{product.show_in_facebook === 0 ? "No" : 'Yes'}</Text></View>
                </View>
                <View style={[Styles.row, styles.infoRow]}>
                    <View style={[Styles.col6, styles.infoCell]}><InfoHeading>Show on Featured Collection</InfoHeading></View>
                    <View style={[Styles.col6, styles.infoCellValue]}><Text>{product.feature === 0 ? "No" : 'Yes'}</Text></View>
                </View>
                <View style={[Styles.row, styles.infoRow]}>
                    <View style={[Styles.col6, styles.infoCell]}><InfoHeading>Show on New Arrival Collection</InfoHeading></View>
                    <View style={[Styles.col6, styles.infoCellValue]}><Text>{product.new_arrival === 0 ? "No" : 'Yes'} </Text></View>
                </View>
                <View style={[Styles.row, styles.infoRow]}>
                    <View style={[Styles.col6, styles.infoCell]}><InfoHeading>Available from</InfoHeading></View>
                    <View style={[Styles.col6, styles.infoCellValue]}><Text>{product.created_at}</Text></View>
                </View>
                <View style={[Styles.row, styles.infoRow]}>
                    <View style={[Styles.col6, styles.infoCell]}><InfoHeading>Last Update</InfoHeading></View>
                    <View style={[Styles.col6, styles.infoCellValue]}><Text>{product.updated_at}</Text></View>
                </View>
                <View style={[Styles.row, styles.infoRow]}>
                    <View style={[Styles.col6, styles.infoCell]}><InfoHeading>Status</InfoHeading></View>
                    <View style={[Styles.col6, styles.infoCellValue]}><Text>{product.status}</Text></View>
                </View>
            </AnimScrollView>
        );
    }
}


class Pricing extends Component {
    constructor(props) {
        super(props);
        this.state = {
            spinner: false,
            refreshing: false,
        };
    }

    componentDidMount() {
        
    }

    render() {
        const {product} = this.props
        return (
                <AnimScrollView>
                    {/* <DataTable>
                        <DataTable.Header>
                            <DataTable.Title sortDirection='descending'> Dessert </DataTable.Title>
                            <DataTable.Title numeric>Calories</DataTable.Title>
                            <DataTable.Title numeric>Fat (g)</DataTable.Title>
                        </DataTable.Header>
                    </DataTable> */}
                    <View style={[Styles.row, styles.infoRow]}>
                        <View style={[Styles.col6, styles.infoCell]}><InfoHeading>Previous Price</InfoHeading></View>
                        <View style={[Styles.col6, styles.infoCellValue]}><Text>{product.old_price}</Text></View>
                    </View>
                    <View style={[Styles.row, styles.infoRow]}>
                        <View style={[Styles.col6, styles.infoCell]}><InfoHeading>Selling Price</InfoHeading></View>
                        <View style={[Styles.col6, styles.infoCellValue]}><Text>{product.price}</Text></View>
                    </View>
                    <View style={[Styles.row, styles.infoRow]}>
                        <View style={[Styles.col6, styles.infoCell]}><InfoHeading>Product Cost</InfoHeading></View>
                        <View style={[Styles.col6, styles.infoCellValue]}><Text>{product.product_cost}</Text></View>
                    </View>
                    <View style={[Styles.row, styles.infoRow]}>
                        <View style={[Styles.col6, styles.infoCell]}><InfoHeading>Initial Stock Quantity</InfoHeading></View>
                        <View style={[Styles.col6, styles.infoCellValue]}><Text>{product.stocks.length ? product.stocks[0].quantity : ''}</Text></View>
                    </View>
                    <View style={[Styles.row, styles.infoRow]}>
                        <View style={[Styles.col6, styles.infoCell]}><InfoHeading>SKU</InfoHeading></View>
                        <View style={[Styles.col6, styles.infoCellValue]}><Text>{product.stocks.length ? product.stocks[0].sku : ''}</Text></View>
                    </View>
                    <View style={[Styles.row, styles.infoRow]}>
                        <View style={[Styles.col6, styles.infoCell]}><InfoHeading>Warehouse</InfoHeading></View>
                        <View style={[Styles.col6, styles.infoCellValue]}><Text>{product.stocks.length ? '-' : ''}</Text></View>
                    </View>
                    <View style={[Styles.row, styles.infoRow]}>
                        <View style={[Styles.col6, styles.infoCell]}><InfoHeading>Barcode</InfoHeading></View>
                        <View style={[Styles.col6, styles.infoCellValue]}><Text>{product.barcode}</Text></View>
                    </View>
                </AnimScrollView>
        );
    }
}

class Branding extends Component {
    constructor(props) {
        super(props);
        this.state = {
            spinner: false,
            refreshing: false,
        };
    }

    componentDidMount() {
        
    }

    render() {
        const {product} = this.props
        return (
                <AnimScrollView>
                    <View style={[Styles.row, styles.infoRow]}>
                        <View style={[Styles.col6, styles.infoCell]}><InfoHeading>Origin</InfoHeading></View>
                        <View style={[Styles.col6, styles.infoCellValue]}><Text>{product.country ? product.country.name : ''}</Text></View>
                    </View>
                    <View style={[Styles.row, styles.infoRow]}>
                        <View style={[Styles.col6, styles.infoCell]}><InfoHeading>Brand</InfoHeading></View>
                        <View style={[Styles.col6, styles.infoCellValue]}><Text>{product.brand ? product.brand.name : ''}</Text></View>
                    </View>
                    <View style={[Styles.row, styles.infoRow]}>
                        <View style={[Styles.col6, styles.infoCell]}><InfoHeading>Manufacturer</InfoHeading></View>
                        <View style={[Styles.col6, styles.infoCellValue]}><Text>{product.manufacturer ? product.manufacturer.manufacturer_name : ''}</Text></View>
                    </View>
                    <View style={[Styles.row, styles.infoRow]}>
                        <View style={[Styles.col6, styles.infoCell]}><InfoHeading>Supplier</InfoHeading></View>
                        <View style={[Styles.col6, styles.infoCellValue]}><Text>{product.admin ? product.admin.name : '' }</Text></View>
                    </View>
                </AnimScrollView>
        );
    }
}



const mapStateToProps = (state) => {
    return {
        token: state.userReducer && state.userReducer.token,
        authUser: state.userReducer && state.userReducer.authUser,
    };
};

export default connect(mapStateToProps)(DetailsViewTabs);

const AnimScrollView = styled(Animated.ScrollView)`
    flex: 1;
    padding-left: 10px;
    padding-right: 10px;
    padding-top: 10px;
    background-color: ${COLORS.background};
`;

const InfoHeading = styled(Text) `
    color: ${COLORS.white}
`

const styles = StyleSheet.create({
    infoCell: {
        backgroundColor: COLORS.primary,
        color: COLORS.white,
        paddingHorizontal: 10,
        paddingVertical: 10,
    },
    infoCellValue: {
        backgroundColor: COLORS.white,
        paddingHorizontal: 10,
        paddingVertical: 10,
    },
    infoRow: {
        paddingHorizontal: 0,
        marginVertical: 0,
        borderColor: COLORS.ash,
        borderWidth: 1,
    }
})