import React, {Component} from 'react';
import {Text, View} from 'react-native';
import Spinner from 'react-native-loading-spinner-overlay';
import Animated from 'react-native-reanimated';
import {connect} from 'react-redux';
import Styles from '@styles';
import Header from './Header';

class CategoryCollection extends Component {
    constructor(props) {
        super(props);
        this.state = {
            spinner: false,
        };
    }

    render() {
        const {spinner} = this.state;
        return (
            <View style={Styles.container}>
                <Header navigation={this.props.navigation} title="Add New Product" showBack={true} />
                <Spinner visible={spinner} textContent={'Loading...'} />
                <Animated.ScrollView style={[Styles.topContainer]}>
                    <Text>Category & Collection</Text>
                </Animated.ScrollView>
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
