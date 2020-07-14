import React, { Component } from 'react';
import {
  View,
  TouchableHighlight,
  Text,
  Image,
  ImageSourcePropType
} from 'react-native';

import {
    SWITCH,
    DETAILS,
    MOVE
} from './buttonsKeys';
import theme from './theme';


const buttons: {text: string, icon: ImageSourcePropType}[] = [
 {
     text: SWITCH,
     icon: require('../../../../../assets/images/switch.png')
 },
 {
    text: DETAILS,
    icon: require('../../../../../assets/images/details.png')
},
{
    text: MOVE,
    icon: require('../../../../../assets/images/move.png')
}
];

type Props = {
    goToZoomPage: () => void;
    goToFilterPage: () => void;
    moveImage: () => void;
};

export default class ContextMenu extends Component<Props> {
    actions: HashMap<() => void>;
    constructor(props: Props) {
        super(props);
        const { goToFilterPage, goToZoomPage, moveImage } = this.props;
        this.actions = {
            [SWITCH]: goToFilterPage,
            [DETAILS]: goToZoomPage,
            [MOVE]: moveImage,
        }
    }
    render() {
        return (
                <View  style={theme.container}>
                   {this._renderButtons()}
                </View>
        )
    }

    _renderButtons = () => 
        buttons.map((item: {text: string, icon: ImageSourcePropType}, index: number) => {
            const _onPress = this.actions[item.text];
            return (
                <TouchableHighlight onPress={_onPress} key={index} underlayColor={'transparent'} style={{flex: 0.2}}>
                    <View style={theme.menuItem}>
                        <Image  style={theme.mockImage} source={item.icon}/>
                        <Text style={theme.buttonText}>{item.text}</Text>
                    </View>
                </TouchableHighlight>
            )
        })
    }
