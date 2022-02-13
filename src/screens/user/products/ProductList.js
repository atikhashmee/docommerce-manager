import React, {Component} from 'react';
import {SafeAreaView, ScrollView, Text, View, ToastAndroid, Pressable, StyleSheet} from 'react-native';
import Spinner from 'react-native-loading-spinner-overlay';
import Styles from '@styles';
import Animated from 'react-native-reanimated';
import Header from './Header';
import styled, {css} from 'styled-components';
import {COLORS, icons, SIZES} from '@constants';
import {connect} from 'react-redux';
import { FAB, Avatar, Button, Card, Modal } from 'react-native-paper';
import FormGroup from '@components/form/FormGroup';
import {Picker} from '@react-native-picker/picker';
import APIKit from '../../../config/axios'
import DButton from '@components/form/buttons/Button';
class ProductList extends Component {
    constructor(props) {
        super(props);
        this.state = {
            spinner: false,
            refreshing: false,
            products: [],
            filterModalVisible: false,
            filter: {
                supplier: '',
                status: '',
                source: ''
            }
        };
    }

    toastr() {
        ToastAndroid.show("A pikachu appeared nearby !", ToastAndroid.SHORT);
    }

    componentDidMount() {
        this.setState({ spinner: true})
        APIKit.get('/api/products')
        .then((response) => {
            this.setState({ spinner: false})
            this.setState({ products: response.data})
        })
        .catch((error) => {
            this.setState({ spinner: false})
            logError(error);
        });
    }

    toggleModal =  () => {
        this.setState({filterModalVisible: !this.state.filterModalVisible})
    }
    
    render() {
        return (
            <View style={Styles.container}>
                <Header navigation={this.props.navigation} showBack={true} title="Products" toggleModal={this.toggleModal} />
                <Spinner visible={this.state.spinner} textContent={'Loading...'} />
                <AnimScrollView>
                    {this.state.products.map((item, itemk)  => (  <Card key={itemk}>
                        <Card.Title title={item.name} subtitle="Card Subtitle" />
                        <Card.Actions>
                            <Button onPress={()=> this.props.navigation.navigate('ProductDetail', {
                                product: item,
                            })}>Detail &gt;&gt; </Button>
                        </Card.Actions>
                    </Card>))}
                </AnimScrollView>
                <Modal visible={this.state.filterModalVisible} 
                    onDismiss={() => this.setState({filterModalVisible: !this.state.filterModalVisible})} 
                    contentContainerStyle={styles.containerStyle}
                    style={styles.modalStyle}>
                    <AnimScrollView>
                        <FormGroup>
                            <FormGroup.Label style={Styles.formLabel}>Supllier</FormGroup.Label>
                            <PickerWrapper>
                                <Picker selectedValue={this.state.filter.supplier} onValueChange={ itemValue => { 
                                    this.setState(prevState => ({
                                        ...prevState, 
                                        filter: {
                                            ...prevState.filter,
                                            supplier: itemValue
                                        }
                                    }))
                                 } }>
                                    <Picker.Item label="Active" value="active" />
                                    <Picker.Item label="Inactive" value="inactive" />
                                </Picker>
                            </PickerWrapper>
                        </FormGroup>
                        <FormGroup>
                            <FormGroup.Label style={Styles.formLabel}>Status</FormGroup.Label>
                            <PickerWrapper>
                                <Picker selectedValue={this.state.filter.status} onValueChange={ itemValue => { 
                                    this.setState(prevState => ({
                                        ...prevState, 
                                        filter: {
                                            ...prevState.filter,
                                            status: itemValue
                                        }
                                    }))
                                 } }>
                                    <Picker.Item label="Active" value="active" />
                                    <Picker.Item label="Inactive" value="inactive" />
                                </Picker>
                            </PickerWrapper>
                        </FormGroup>
                        <FormGroup>
                        <FormGroup.Label style={Styles.formLabel}>Source</FormGroup.Label>
                        <PickerWrapper>
                            <Picker selectedValue={this.state.filter.source} onValueChange={ itemValue => { 
                                    this.setState(prevState => ({
                                        ...prevState, 
                                        filter: {
                                            ...prevState.filter,
                                            source: itemValue
                                        }
                                    }))
                                 } }>
                                <Picker.Item label="Active" value="active" />
                                <Picker.Item label="Inactive" value="inactive" />
                            </Picker>
                        </PickerWrapper>
                    </FormGroup>
                    <View style={styles.buttonContainer}>
                        <View style={Styles.row}>
                            <View style={Styles.col6}>
                                <DButton onPress={this.onPressSubmit} style={styles.button} containerStyle={styles.buttonInner}>
                                    <DButton.Text style={styles.btnText}>Reset</DButton.Text>
                                </DButton>
                            </View>
                            <View style={Styles.col6}>
                                <DButton onPress={this.onPressSubmit} style={styles.button} containerStyle={styles.buttonInner}>
                                    <DButton.Text style={styles.btnText}>Filter</DButton.Text>
                                </DButton>
                            </View>
                        </View>
                    </View>
                    </AnimScrollView>
                </Modal>
                {!this.state.filterModalVisible && <FAB 
                    style={styles.fab}
                    large
                    icon="plus"
                    onPress={() => this.props.navigation.navigate('CreateProduct')}
                />}
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

export default connect(mapStateToProps)(ProductList);

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

const styles = StyleSheet.create({
    fab: {
      position: 'absolute',
      margin: 16,
      right: 0,
      bottom: 0,
      backgroundColor: COLORS.primary,
    },
    modalStyle: {
        alignItems: 'flex-end',
    },
    containerStyle: {
        width: '70%',
        height: '90%',
    },
    buttonContainer: {
        flexDirection: 'row',
        marginTop: 10,
        alignItems: 'center',
        justifyContent: 'flex-end',
    },
})