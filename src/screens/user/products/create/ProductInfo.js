import React, {Component} from 'react';
import {Text, View} from 'react-native';
import {connect} from 'react-redux';

class ProductInfo extends Component {
    constructor(props) {
        super(props);
        this.state = {
            spinner: false,
        };
    }

    render() {
        return (
            <View>
                <Text>Product info</Text>
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

export default connect(mapStateToProps)(ProductInfo);
