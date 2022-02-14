import React, {Component} from 'react';
import {SafeAreaView, ScrollView, Text, View, ToastAndroid, Pressable, StyleSheet, Image} from 'react-native';
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
import Carousel from 'react-native-snap-carousel';

const TopTab = createMaterialTopTabNavigator();

class DetailsViewTabs extends Component {
    constructor(props) {
        super(props);
        
        this.state = {
            spinner: false,
            refreshing: false,
            product: null,
            carouselItems: [
                {
                    title:"Item 1",
                    text: "Text 1",
                    image: 'https://i.imgur.com/5tj6S7Ol.jpg',
                },
                {
                    title:"Item 2",
                    text: "Text 2",
                    image: 'https://images.pexels.com/photos/10479049/pexels-photo-10479049.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260',
                },
                {
                    title:"Item 3",
                    text: "Text 3",
                    image: 'https://images.pexels.com/photos/9632404/pexels-photo-9632404.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260',
                },
                {
                    title:"Item 4",
                    text: "Text 4",
                    image: 'https://images.pexels.com/photos/10343486/pexels-photo-10343486.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260',
                },
                {
                    title:"Item 5",
                    text: "Text 5",
                    image: 'https://images.pexels.com/photos/10277568/pexels-photo-10277568.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500',
                },
            ]
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

    _renderItem = ({item, index}) => {
        return (
            <Image
            source={{ uri: item.image }}
            style={{width: '100%'}}
          />
        );
    }

    render() {
        const {product} = this.state
        return(
            <View style={Styles.container}>
                <Spinner visible={this.state.spinner} textContent={'Loading...'} />
                {product && <>
                    <Header navigation={this.props.navigation} showBack={true} title={product.name} showFilter={false} />
                    <Carousel
                        ref={(c) => { this._carousel = c; }}
                        data={this.state.carouselItems}
                        renderItem={this._renderItem}
                        sliderWidth={300}
                        itemWidth={300}
                    />
                    <TopTab.Navigator  tabBarOptions={{
                            lazy: true,
                            scrollEnabled: true
                        }}>
                            <TopTab.Screen name="info" children={() => <Info product={product} />} />
                            <TopTab.Screen name="pricing" children={() => <Pricing product={product} />} />
                            <TopTab.Screen name="branding" children={() => <Branding product={product} />} />
                            <TopTab.Screen name="shipping" children={() => <Shipping product={product} />} />
                            <TopTab.Screen name="seo" children={() => <Seo product={product} />} />
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


class Shipping extends Component {
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
                <DataTable>
                    <DataTable.Header>
                        <DataTable.Title>Zone</DataTable.Title>
                        <DataTable.Title numeric>Carrier</DataTable.Title>
                        <DataTable.Title numeric>Shipping Charge</DataTable.Title>
                    </DataTable.Header>
                    {product.shippings.length > 0 && product.shippings.map(item => ( <DataTable.Row>
                        <DataTable.Cell>{ shipping.singleZone ? shipping.singleZone.name : '' }</DataTable.Cell>
                        <DataTable.Cell numeric>{ shipping.singleCarrier ? shipping.singleCarrier.name : '' }</DataTable.Cell>
                        <DataTable.Cell numeric>{ shipping.charge }</DataTable.Cell>
                    </DataTable.Row>))}
                </DataTable>
            </AnimScrollView>
        );
    }
}

class Seo extends Component {
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
                    <View style={[Styles.col6, styles.infoCell]}><InfoHeading>Product Page URL</InfoHeading></View>
                    <View style={[Styles.col6, styles.infoCellValue]}><Text>{ product.slug }</Text></View>
                </View>
                <View style={[Styles.row, styles.infoRow]}>
                    <View style={[Styles.col6, styles.infoCell]}><InfoHeading>Page Title</InfoHeading></View>
                    <View style={[Styles.col6, styles.infoCellValue]}><Text>{ product.page_title }</Text></View>
                </View>
                <View style={[Styles.row, styles.infoRow]}>
                    <View style={[Styles.col6, styles.infoCell]}><InfoHeading>Meta Keywords</InfoHeading></View>
                    <View style={[Styles.col6, styles.infoCellValue]}><Text>{ product.meta_keyword }</Text></View>
                </View>
                <View style={[Styles.row, styles.infoRow]}>
                    <View style={[Styles.col6, styles.infoCell]}><InfoHeading>Meta Description</InfoHeading></View>
                    <View style={[Styles.col6, styles.infoCellValue]}><Text>{ product.meta_description }</Text></View>
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