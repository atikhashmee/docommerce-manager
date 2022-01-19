import React, {Component} from 'react';
import {StyleSheet, Image} from 'react-native';
import {connect} from 'react-redux';
import {Appbar} from 'react-native-paper';
import {COLORS, images, icons} from '@constants';

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
                {this.props.showBack ? (
                    <Appbar.BackAction onPress={this.onPressBackButton} />
                ) : (
                    this.props.token && <Appbar.Action icon={() => icons.align_left} onPress={() => this.props.navigation.openDrawer()} />
                )}
                <Appbar.Content
                    title={'Draft'}
                    style={{...Styles.headerContent, alignItems: 'flex-end'}}
                    onPress={() => {
                        alert('clicked');
                    }}
                />
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
