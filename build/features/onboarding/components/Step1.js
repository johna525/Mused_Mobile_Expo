import React, { Component } from 'react';
import { View, Image, TouchableOpacity, StyleSheet, Dimensions, Animated } from 'react-native';
import theme from '../theme';
import TypeWriterText from './Typewriter';
const templateImage = require('../../../../assets/images/onboard/Screen2/template.jpg');
const fadeImage = require('../../../../assets/images/onboard/Screen2/photo.jpg');
const { width } = Dimensions.get('window');
const styles = StyleSheet.create({
    content: {
        flex: 1,
        paddingBottom: 20,
    },
    imageWrapper: {
        width: width,
        height: width * 568 / 400,
        position: 'relative',
        marginTop: 10
    },
    templateImage: {
        width: width,
        height: width * 568 / 400,
        resizeMode: 'stretch'
    },
    fadeImageWrapper: {
        position: 'absolute',
        width: width * 530 / 788,
        height: width * 775 / 788,
        top: width * 63 / 788,
        left: width * 118 / 788
    },
    fadeImage: {
        width: width * 530 / 800,
        height: width * 775 / 800,
    }
});
export default class Step1 extends Component {
    render() {
        return (React.createElement(View, { style: theme.container },
            React.createElement(View, { style: styles.content },
                React.createElement(TypeWriterText, { text: ['Just tap to see the pieces', 'used in a look'] }),
                React.createElement(View, { style: styles.imageWrapper },
                    React.createElement(Image, { source: templateImage, style: styles.templateImage }),
                    React.createElement(TouchableOpacity, { style: styles.fadeImageWrapper, onPress: () => this.props.continue() },
                        React.createElement(Animated.Image, { source: fadeImage, style: styles.fadeImage }))))));
    }
}
//# sourceMappingURL=Step1.js.map