import React, { Component } from 'react';
import { View, Platform, Text, StyleSheet, Dimensions, Image, ScrollView } from 'react-native';
import Ripple from 'react-native-material-ripple';
import theme from '../../zoom/theme';
const productImage = require('../../../../assets/images/photo-faded.jpg');
// const buttonLogo = require('../../../../assets/images/button-logo.png');
const arrow4GIF = require('../../../../assets/images/Arrow_DOWN.gif');
const { width } = Dimensions.get('window');
const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'white',
    },
    content: {
        flex: 1,
        alignItems: 'center',
        position: 'relative'
    },
    markTextView: {
        padding: 30,
        backgroundColor: 'white',
        position: 'absolute',
        left: 0,
        width,
        top: 120
    },
    markText: {
        fontSize: 30,
        fontWeight: 'bold',
        textAlign: 'center',
        color: 'gray'
    },
    productImage: {
        alignItems: 'center',
        width: width - 20,
        height: (width - 20) * 900 / 675,
        marginTop: Platform.OS === 'ios' ? 20 : 5,
        resizeMode: 'cover'
    },
    buttonsContainer: {
        backgroundColor: 'black',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        height: 60,
        marginHorizontal: 10,
        marginBottom: 10,
    },
    infoView: {
        paddingHorizontal: 20,
        paddingVertical: 10,
        opacity: 0.25
    },
    arrowIcon: {
        position: 'absolute',
        bottom: 70,
        left: width * 0.4,
        width: 50,
        height: 50,
        resizeMode: 'contain'
    },
    descContainer: {
        paddingHorizontal: 30,
        paddingBottom: 60,
        paddingTop: 15,
        backgroundColor: 'white',
        opacity: 0.25
    },
});
export default class Step5 extends Component {
    render() {
        return (React.createElement(View, { style: styles.container },
            React.createElement(ScrollView, { style: { flex: 1 }, scrollEnabled: false },
                React.createElement(View, { style: styles.content },
                    React.createElement(Image, { source: productImage, style: styles.productImage })),
                React.createElement(View, { style: [theme.infoView, styles.infoView] },
                    React.createElement(View, { style: theme.brandView },
                        React.createElement(Text, { style: theme.brandText }, "MARNI"),
                        React.createElement(Text, { style: theme.priceText }, "$620")),
                    React.createElement(View, { style: theme.brandView },
                        React.createElement(Text, { style: theme.unbrandText }, "Gathered T-shirt"))),
                React.createElement(View, { style: styles.descContainer },
                    React.createElement(Text, { style: theme.descText }, "Having honed his creative eye at a number of high-profile fashion houses"))),
            React.createElement(Image, { source: arrow4GIF, style: styles.arrowIcon }),
            React.createElement(Ripple, { style: styles.buttonsContainer, rippleSize: 240, rippleColor: '#FFFFFF', rippleCentered: true, rippleDuration: 1000, onPress: () => this.props.continue() },
                React.createElement(Text, { style: theme.buttonText }, "STYLE IT"))));
    }
}
//# sourceMappingURL=Step6.js.map