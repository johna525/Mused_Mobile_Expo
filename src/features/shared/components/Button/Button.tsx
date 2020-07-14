import React, { Component } from 'react';
import {
  Text,
  View,
  StyleProp,
  Image
} from 'react-native';

import theme from './theme';

const whiteLogo = require('../../../../../assets/images/logo-white.png');

type Props = {
    text: string;
    themeType: string;
    style: StyleProp<any>;
    buttonWithImage?: boolean;
}
export default class Button extends Component<Props> {
    static defaultProps = {
        buttonWithImage: false
    }
    render() {
        const { text, themeType, style, buttonWithImage } = this.props;
        const themeStyle = themeType === 'light' ? 'buttonContainerLight' : 'buttonContainerDark';
        const textStyle = themeType === 'light' ? 'buttonTextLight' : 'buttonTextDark';
        return  buttonWithImage
                    ? (
                        <View style={[theme.buttonContainer, theme[themeStyle], style, {flexDirection: 'row', alignItems: 'center', justifyContent: 'center'}]}>
                            <Text style={[theme.buttonText, theme[textStyle]]}>{text}</Text>
                            <Image source={whiteLogo} style={theme.imageButton}/>
                        </View>
                    )
                    : (
                        <View style={[theme.buttonContainer, theme[themeStyle], style]}>
                            <Text style={[theme.buttonText, theme[textStyle]]}>{text}</Text>
                        </View>
                    )
    }
 }
