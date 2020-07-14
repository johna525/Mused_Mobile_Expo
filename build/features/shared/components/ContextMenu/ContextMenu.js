import React, { Component } from 'react';
import { View, TouchableHighlight, Text, Image } from 'react-native';
import { SWITCH, DETAILS, MOVE } from './buttonsKeys';
import theme from './theme';
const buttons = [
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
export default class ContextMenu extends Component {
    constructor(props) {
        super(props);
        this._renderButtons = () => buttons.map((item, index) => {
            const _onPress = this.actions[item.text];
            return (React.createElement(TouchableHighlight, { onPress: _onPress, key: index, underlayColor: 'transparent', style: { flex: 0.2 } },
                React.createElement(View, { style: theme.menuItem },
                    React.createElement(Image, { style: theme.mockImage, source: item.icon }),
                    React.createElement(Text, { style: theme.buttonText }, item.text))));
        });
        const { goToFilterPage, goToZoomPage, moveImage } = this.props;
        this.actions = {
            [SWITCH]: goToFilterPage,
            [DETAILS]: goToZoomPage,
            [MOVE]: moveImage,
        };
    }
    render() {
        return (React.createElement(View, { style: theme.container }, this._renderButtons()));
    }
}
//# sourceMappingURL=ContextMenu.js.map