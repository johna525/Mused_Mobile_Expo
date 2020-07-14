import React, { Component } from 'react';
import { Text, View, Image } from 'react-native';
import theme from './theme';
const whiteLogo = require('../../../../../assets/images/logo-white.png');
export default class Button extends Component {
    render() {
        const { text, themeType, style, buttonWithImage } = this.props;
        const themeStyle = themeType === 'light' ? 'buttonContainerLight' : 'buttonContainerDark';
        const textStyle = themeType === 'light' ? 'buttonTextLight' : 'buttonTextDark';
        return buttonWithImage
            ? (React.createElement(View, { style: [theme.buttonContainer, theme[themeStyle], style, { flexDirection: 'row', alignItems: 'center', justifyContent: 'center' }] },
                React.createElement(Text, { style: [theme.buttonText, theme[textStyle]] }, text),
                React.createElement(Image, { source: whiteLogo, style: theme.imageButton })))
            : (React.createElement(View, { style: [theme.buttonContainer, theme[themeStyle], style] },
                React.createElement(Text, { style: [theme.buttonText, theme[textStyle]] }, text)));
    }
}
Button.defaultProps = {
    buttonWithImage: false
};
//# sourceMappingURL=Button.js.map