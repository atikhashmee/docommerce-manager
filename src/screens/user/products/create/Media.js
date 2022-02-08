import React, {Component} from 'react';
import {Text, View, Image, StyleSheet, Modal, ScrollView} from 'react-native';
import Spinner from 'react-native-loading-spinner-overlay';
import Animated from 'react-native-reanimated';
import {connect} from 'react-redux';
import Styles from '@styles';
import Header from './Header';
import styled, {css} from 'styled-components/native';
import {COLORS, icons} from '@constants';
import ImagePicker from 'react-native-image-crop-picker';
import {handleProductObjProperty} from '@actions/productActions'

class Media extends Component {
    constructor(props) {
        super(props);
        this.state = {
            spinner: false,
            modalVisible: false,
            imagePickType: '',
        };
    }

    imagePickerModalToggle = () => {
        if (this.state.modalVisible) {
            this.setState({modalVisible: false});
            this.setState({imagePickType: ''});
        } else {
            this.setState({modalVisible: true});
        }
    };

    cleanupImages() {
        ImagePicker.clean()
            .then(() => {
                console.log('removed tmp images from tmp directory');
            })
            .catch((e) => {
                alert(e);
            });
    }

    pickSingle(cropit, circular = false, mediaType) {
        ImagePicker.openPicker({
            width: 500,
            height: 500,
            cropping: cropit,
            cropperCircleOverlay: circular,
            sortOrder: 'none',
            compressImageMaxWidth: 1000,
            compressImageMaxHeight: 1000,
            compressImageQuality: 1,
            compressVideoPreset: 'MediumQuality',
            includeExif: true,
            cropperStatusBarColor: 'white',
            cropperToolbarColor: 'white',
            cropperActiveWidgetColor: 'white',
            cropperToolbarWidgetColor: '#3498DB',
        })
        .then((image) => {
            this.props.handleProductObjProperty({
                uri: image.path,
                width: image.width,
                height: image.height,
                mime: image.mime,
            }, 'image')
            this.imagePickerModalToggle();
        })
        .catch((e) => {
            console.log(e);
        });
    }

    pickMultiple() {
        ImagePicker.openPicker({
            multiple: true,
            waitAnimationEnd: false,
            sortOrder: 'desc',
            includeExif: true,
            forceJpg: true,
        })
        .then((images) => {
            this.props.handleProductObjProperty(images.map((i) => {
                console.log('received image', i);
                return {
                    uri: i.path,
                    width: i.width,
                    height: i.height,
                    mime: i.mime,
                };
            }), 'otherImages')
            this.imagePickerModalToggle();
        })
        .catch((e) => alert(e));
    }

    pickSingleWithCamera(cropping, mediaType = 'photo') {
        ImagePicker.openCamera({
            cropping: cropping,
            width: 500,
            height: 500,
            includeExif: true,
            mediaType,
        })
        .then((image) => {
            this.props.handleProductObjProperty({
                uri: image.path,
                width: image.width,
                height: image.height,
                mime: image.mime,
            }, 'image')
            this.imagePickerModalToggle();
        })
        .catch((e) => alert(e));
    }

    renderImage(image) {
        return <Image style={{width: '100%', height: 150, resizeMode: 'contain'}} source={image} />;
    }

    renderAsset(image) {
        if (image.mime && image.mime.toLowerCase().indexOf('video/') !== -1) {
            return this.renderVideo(image);
        }
        return this.renderImage(image);
    }

    removeImage(image) {
        this.setState({images: this.state.images.filter((img) => img.uri !== image.uri)});
    }
    render() {
        const {spinner} = this.state;
        const {product} = this.props;
        return (
            <View style={Styles.container}>
                <Header navigation={this.props.navigation} title="Add New Product" showBack={true} />
                <Spinner visible={spinner} textContent={'Loading...'} />
                <AnimScrollView style={[Styles.topContainer]}>
                    <Styles.PageHeader>Media</Styles.PageHeader>
                    <MediaWrapper>
                        <ThumbNailBox
                            style={styles.borderStyleBos}
                            onPress={() => {
                                this.imagePickerModalToggle();
                                this.setState({imagePickType: 'single'});
                            }}>
                            <Text>{icons.IconAvater('plus', 25, `${COLORS.primary}`, 'fa')}</Text>
                            <Text>Add Thumbnail</Text>
                        </ThumbNailBox>
                        <ImagesBox
                            style={styles.borderStyleBos}
                            onPress={() => {
                                this.imagePickerModalToggle();
                                this.setState({imagePickType: 'multiple'});
                            }}>
                            <Text>{icons.IconAvater('plus', 25, `${COLORS.primary}`, 'fa')}</Text>
                            <Text>Images</Text>
                        </ImagesBox>
                    </MediaWrapper>
                    {product.image ? this.renderAsset(product.image) : null}
                    <ImagesWrapper>
                        {product.otherImages
                            ? product.otherImages.map((i) => (
                                  <ImageBox key={i.uri}>
                                      {this.renderAsset(i)}
                                      <CrossButton
                                          onPress={() => {
                                              this.removeImage(i);
                                          }}>
                                          {icons.IconAvater('times', 15, `${COLORS.red}`, 'fa')}
                                      </CrossButton>
                                  </ImageBox>
                              ))
                            : null}
                    </ImagesWrapper>
                </AnimScrollView>
                <Modal
                    animationType="slide"
                    transparent={true}
                    visible={this.state.modalVisible}
                    onRequestClose={() => {
                        // this.closeButtonFunction()
                    }}>
                    <ModalDialog>
                        <ModalListItem
                            onPress={() => {
                                this.state.imagePickType === 'multiple' ? this.pickMultiple() : this.pickSingle(true, true);
                            }}>
                            <ModalListItemText>Select From Gallery</ModalListItemText>
                        </ModalListItem>
                        {this.state.imagePickType === '' ||
                            (this.state.imagePickType === 'single' && (
                                <ModalListItem
                                    onPress={() => {
                                        this.pickSingleWithCamera(true);
                                    }}>
                                    <ModalListItemText>Take Photo</ModalListItemText>
                                </ModalListItem>
                            ))}
                        <ModalListItem
                            NoBorder
                            onPress={() => {
                                this.imagePickerModalToggle();
                            }}>
                            <ModalListItemText>Close</ModalListItemText>
                        </ModalListItem>
                    </ModalDialog>
                </Modal>
            </View>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        token: state.userReducer && state.userReducer.token,
        authUser: state.userReducer && state.userReducer.authUser,
        product: state.productReducer && state.productReducer.product,
    };
};

export default connect(mapStateToProps, {handleProductObjProperty})(Media);

const AnimScrollView = styled(Animated.ScrollView)`
    flex: 1;
    padding-left: 10px;
    padding-right: 10px;
    padding-top: 10px;
    background-color: ${COLORS.background};
`;

const ModalDialog = styled.View`
    height: 25%;
    padding: 10px;
    margin-top: auto;
    background-color: ${COLORS.white};
    border-top-right-radius: 15px;
    border-top-left-radius: 15px;
`;

const ModalListItem = styled.Pressable`
    height: 30%;
    border-bottom-width: 1px;
    border-bottom-color: ${COLORS.black};
    padding: 10px;
    ${({NoBorder}) =>
        NoBorder &&
        `
        border-bottom-color: ${COLORS.white};
    `}
`;

const ModalListItemText = styled.Text`
    text-align: center;
    font-family: 'Montserrat-Regular';
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
    min-height: 100px;
    height: 130px;
    background-color: ${COLORS.white};
`;

const ThumbNailBox = styled.Pressable`
    ${boxStyle};
    flex-basis: 40%;
`;
const ImagesBox = styled.Pressable`
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
    border: 1px solid ${COLORS.background};
    margin-bottom: 15px;
    position: relative;
`;

const CrossButton = styled.Pressable`
    position: absolute;
    right: -6px;
    top: -6px;
    z-index: 1;
`;

const styles = StyleSheet.create({
    borderStyleBos: {
        borderStyle: 'dashed',
        borderRadius: 1,
        borderWidth: 1,
        borderColor: COLORS.primary,
    },
});
