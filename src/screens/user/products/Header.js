import React, {Component} from 'react';
import {StyleSheet, View} from 'react-native';
import {connect} from 'react-redux';
import {Appbar} from 'react-native-paper';
import {COLORS, icons} from '@constants';

class Header extends Component {
    constructor(props) {
        super(props);
    }
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
                
                <View style={{flex: 1, flexDirection: 'row', alignItems: 'center'}}>
                    {this.props.showBack ? (
                        <Appbar.BackAction onPress={this.onPressBackButton} />
                    ) : (
                        this.props.token && <Appbar.Action icon={() => icons.align_left} onPress={() => this.props.navigation.openDrawer()} />
                    )}
                    <Appbar.Content title={this.props.title ? this.props.title : ''} 
                        titleStyle={{
                            color: 'black', 
                            textAlign: 'center'
                        }} 
                    />
                    {this.props.showFilter &&  <Appbar.Action icon={'filter'} onPress={() => {this.props.toggleModal()}} />}
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

export default connect(mapStateToProps)(Header);
