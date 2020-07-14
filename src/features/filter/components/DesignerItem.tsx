import React, { Component } from 'react';
import {
    View,
    Text
} from 'react-native';

import theme from '../theme';

type Props = {
    index: number;
    item: {
        text: string;
    }
}
export default class DesignerItem extends Component<Props> {
    render() {
        const { index, item: { text } } = this.props;
        return (
            <View style={theme.designerItemContainer}>
                <View style={{flex: 0.5}}>
                    <Text style={theme.designerItemText}>{text}</Text> 
                </View>
                <View style={{flex: 0.5}}>
                    { index === 1 && <Text style={[theme.designerItemText, {textAlign: 'right', paddingRight: 25}]}>SELECTED</Text>  }
                </View>
            </View>
        )
    }
}