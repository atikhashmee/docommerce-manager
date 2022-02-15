import React, {Component} from 'react';
import {StyleSheet, View} from 'react-native';
import {connect} from 'react-redux';
import {Appbar} from 'react-native-paper';
import {COLORS, icons} from '@constants';
import {saveToDraft, cancelOrDiscard} from '@actions/productActions'

class Header extends Component {
    onPressBackButton = () => {
        if (this.props.handleBackButton) {
            this.props.handleBackButton();
            return;
        }
        if (this.props.navigation.canGoBack()) {
            this.props.navigation.goBack();
        } else {
            this.props.navigation.navigate('FilterScreenStackNavigator', {screen: 'HomeScreen'});
        }
    };
    render() {
        return (
            <Appbar.Header style={{backgroundColor: COLORS.white}}>
                <Appbar.Content title={this.props.title ? this.props.title : ''} style={Styles.headerContent} />
                <View style={{flex: 1, flexDirection: 'row', alignItems: 'center'}}>
                    {this.props.showBack ? (
                        <Appbar.BackAction onPress={this.onPressBackButton} />
                    ) : (
                        this.props.token && <Appbar.Action icon={() => icons.align_left} onPress={() => this.props.navigation.openDrawer()} />
                    )}
                    <View style={{flex: 1}} />
                    <View style={{flex: 1, flexDirection: 'row', justifyContent: 'flex-end'}}>
                        <Appbar.Content
                            title={'Cancel'}
                            style={{flex: 0, justifyContent: 'flex-end', alignItems: 'flex-end'}}
                            titleStyle={{color: COLORS.primary, fontSize: 14}}
                            onPress={() => {
                                this.props.cancelOrDiscard()
                            }}
                        />
                        <Appbar.Content
                            title={'Draft'}
                            style={{flex: 0, justifyContent: 'flex-end', alignItems: 'flex-end'}}
                            titleStyle={{color: COLORS.primary, fontSize: 14}}
                            onPress={() => {
                                this.props.saveToDraft()
                            }}
                        />
                    </View>
                    
                    
                </View>
            </Appbar.Header>
        );
    }
}

const Styles = StyleSheet.create({
    logo: {
        alignSelf: 'center',
    },
    headerContent: {
        alignItems: 'center',
        position: 'absolute',
        left: 0,
        right: 0,
    },
});

const mapStateToProps = (state) => {
    return {
        token: state.userReducer.token,
        authUser: state.userReducer.authUser,
    };
};

export default connect(mapStateToProps, {saveToDraft, cancelOrDiscard})(Header);
