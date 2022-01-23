// export const logo = require('../assets/logo.png');
// export const logo_white = require('../assets/logo-white.png');
// export const car = require('../assets/icons/car.png');
// export const camera = require('../assets/icons/camera.png');
// export const gallery = require('../assets/icons/gallery.png');
// export const upload_document = require('../assets/icons/upload_document.png');
// export const two_way_arrows = require('../assets/icons/two-way-arrows.png');
import React from 'react';
import FontAwesomeIcon from 'react-native-vector-icons/FontAwesome';
import FeatherIcon from 'react-native-vector-icons/Feather';

export const logo = null;
export const logo_white = null;
export const car = null;
export const camera = null;
export const gallery = null;
export const upload_document = null;
export const two_way_arrows = null;

const Lock = <FontAwesomeIcon name="lock" size={20} color={'#fff'} />;
const eye = <FontAwesomeIcon name="eye" size={20} color={'#000'} />;
const eye_slash = <FontAwesomeIcon name="eye-slash" size={20} color={'#000'} />;
const align_left = <FeatherIcon name="align-left" size={25} color={'#81368f'} />;
const users = <FeatherIcon name="users" size={30} color={'#81368f'} />;
const globe = <FeatherIcon name="globe" size={30} color={'#81368f'} />;
const money = <FontAwesomeIcon name="money" size={30} color={'#81368f'} />;
const plus = <FontAwesomeIcon name="plus" size={15} color={'#fff'} />;

const IconAvater = (name, size, color, type) => {
    if (type === 'fa') {
        return <FontAwesomeIcon name={name} size={size} color={color} />;
    }
};

export default {
    logo,
    logo_white,
    car,
    camera,
    gallery,
    upload_document,
    two_way_arrows,
    Lock,
    eye,
    eye_slash,
    align_left,
    users,
    globe,
    money,
    plus,
    IconAvater,
};
