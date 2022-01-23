import React, {Component} from 'react';
import {Text, View, StyleSheet, Dimensions} from 'react-native';
import Spinner from 'react-native-loading-spinner-overlay';
import Animated from 'react-native-reanimated';
import {connect} from 'react-redux';
import FormGroup from '@components/form/FormGroup';
import Styles from '@styles';
import Header from './Header';
import styled, {css} from 'styled-components/native';
import {COLORS, icons} from '@constants';
import {Picker} from '@react-native-picker/picker';
import TagInput from 'react-native-tags-input';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import {Switch} from 'react-native-paper';

const mainColor = '#3ca897';

class Media extends Component {
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
                <AnimScrollView style={[Styles.topContainer]}>
                    <Styles.PageHeader>Media</Styles.PageHeader>
                    <MediaWrapper>
                        <ThumbNailBox style={styles.borderStyleBos}>
                            <Text>{icons.IconAvater('plus', 25, `${COLORS.primary}`, 'fa')}</Text>
                            <Text>Add Thumbnail</Text>
                        </ThumbNailBox>
                        <ImagesBox style={styles.borderStyleBos}>
                            <Text>{icons.IconAvater('plus', 25, `${COLORS.primary}`, 'fa')}</Text>
                            <Text>Images</Text>
                        </ImagesBox>
                    </MediaWrapper>
                    <ImagesWrapper>
                        {Array(22)
                            .fill(0)
                            .map((item, k) => {
                                return (
                                    <ImageBox key={k}>
                                        <Text>Image 1</Text>
                                        <CrossButton>{icons.IconAvater('times', 15, `${COLORS.primary}`, 'fa')}</CrossButton>
                                    </ImageBox>
                                );
                            })}
                    </ImagesWrapper>
                </AnimScrollView>
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

export default connect(mapStateToProps)(Media);

const AnimScrollView = styled(Animated.ScrollView)`
    flex: 1;
    padding-left: 10px;
    padding-right: 10px;
    padding-top: 10px;
    background-color: ${COLORS.background};
`;

const MediaWrapper = styled.View`
    width: 100%;
    flex: 1;
    flex-direction: row;
    margin-bottom: 10px;
`;

const boxStyle = css`
    justify-content: center;
    align-items: center;
    min-height: 20px;
    height: 130px;
    background-color: ${COLORS.white};
`;

const ThumbNailBox = styled.View`
    ${boxStyle};
    flex-basis: 40%;
`;
const ImagesBox = styled.View`
    ${boxStyle};
    flex-basis: 60%;
`;
const ImagesWrapper = styled.View`
    flex: 1;
    flex-direction: row;
    flex-wrap: wrap;
    justify-content: space-around;
`;

const ImageBox = styled.View`
    flex-basis: 30%;
    border: 1px solid ${COLORS.gray};
    height: 50px;
    margin-bottom: 15px;
    position: relative;
`;

const CrossButton = styled.View`
    position: absolute;
    right: -6px;
    top: -6px;
`;

const styles = StyleSheet.create({
    borderStyleBos: {
        borderStyle: 'dashed',
        borderRadius: 1,
        borderWidth: 1,
        borderColor: COLORS.primary,
    },
});
