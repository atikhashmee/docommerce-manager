import React, {Component} from 'react';
import {SafeAreaView, ScrollView, Text, View, ToastAndroid, Pressable, StyleSheet, ImageBackground} from 'react-native';
import Spinner from 'react-native-loading-spinner-overlay';
import Styles from '@styles';
import Animated from 'react-native-reanimated';
import Header from '@components/inc/Header';
import styled, {css} from 'styled-components';
import {COLORS, icons, SIZES} from '@constants';
import {connect} from 'react-redux';
import { FAB, List, Avatar, Button, Card, Title, Paragraph } from 'react-native-paper';
import AuthStorage from '@/core/session/AuthStorage';
import APIKit from '../../../config/axios'
import {removeDraft, setDraftItems} from '@actions/productActions'

class Drafts extends Component {
    constructor(props) {
        super(props);
        this.state = {
            spinner: false,
            refreshing: false,
            draftProducts: [],
        };
    }

    toastr() {
        ToastAndroid.show("A pikachu appeared nearby !", ToastAndroid.SHORT);
    }

    componentDidMount() {
        this.setState({ spinner: true})
        AuthStorage.get('drafts').then(draftItems => {
            this.setState({ spinner: false})
            let items = []
            if (draftItems) {
                items = JSON.parse(draftItems);
            }
            this.props.setDraftItems(items)
        })
    }

    
    render() {
        const {draft_products} = this.props
        return (
            <View style={Styles.container}>
                <Header navigation={this.props.navigation} showBack={true} title="Drafts" />
                <Spinner visible={this.state.spinner} textContent={'Loading...'} />
                {draft_products.length === 0 && (<AnimScrollView contentContainerStyle={{flexGrow: 1, justifyContent: 'center'}}>
                    <ImageBackground style={[styles.emptyBox, styles.noItemImageStyle]} source={require('@assets/img/empty_box.png')} resizeMode="cover">
                        <Text style={{alignSelf: 'center', marginTop: 'auto'}}>No Drafts Item found</Text>
                    </ImageBackground>
                </AnimScrollView>)}
                {draft_products.length > 0 && <AnimScrollView>
                        {draft_products.map(({draft_id, draft_item}, itemk)  => (  <Card key={itemk} style={styles.cardStyle}>
                            <Card.Content>
                                <Title>{draft_item.name}</Title>
                            </Card.Content>
                            <Card.Actions>
                                <Button onPress={()=> this.props.navigation.navigate('CreateProduct', {
                                    modify_type: 'edit',
                                    modify_source: 'draft', 
                                    modify_item: draft_item
                                })}>Edit &gt;&gt; </Button>
                                <Button onPress={()=> this.props.removeDraft(draft_id)}>Remove &gt;&gt; </Button>
                            </Card.Actions>
                    </Card>))}
                </AnimScrollView>}

                <FAB
                    style={styles.fab}
                    large
                    icon="plus"
                    onPress={() => this.props.navigation.navigate('CreateProduct', {
                        modify_type: 'create_new',
                        modify_source: 'none', 
                        modify_item: null
                    })}
                />
            </View>
        );
    }
}



const mapStateToProps = (state) => {
    return {
        token: state.userReducer && state.userReducer.token,
        authUser: state.userReducer && state.userReducer.authUser,
        draft_products: state.productReducer && state.productReducer.draft_products,
    };
};

export default connect(mapStateToProps, {removeDraft, setDraftItems})(Drafts);

const AnimScrollView = styled(Animated.ScrollView)`
    flex: 1;
    padding-left: 10px;
    padding-right: 10px;
    padding-top: 10px;
    background-color: ${COLORS.background};
`;

const styles = StyleSheet.create({
    fab: {
      position: 'absolute',
      margin: 16,
      right: 0,
      bottom: 0,
      backgroundColor: COLORS.primary,
    },
    emptyBox: {
        alignSelf: 'center',
    },
    noItemImageStyle: {
        width: '100%', 
        height: '50%',
    },
    cardStyle: {
        marginBottom: 10,
    }
})