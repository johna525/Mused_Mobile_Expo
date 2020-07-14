import React, { PureComponent } from 'react';
import { StyleSheet, View } from 'react-native';
import { Icon } from 'expo';
import Ripple from 'react-native-material-ripple';
const styles = StyleSheet.create({
    iconContainer: {
        alignItems: 'center',
        justifyContent: 'center',
    },
});
export default class IconTouchable extends PureComponent {
    render() {
        const { name, size, color, type, onPress } = this.props;
        const containerSize = size * 2;
        const iconContainer = { width: containerSize, height: containerSize };
        const IconComponent = Icon[type];
        return (React.createElement(Ripple, { rippleContainerBorderRadius: size / 2, rippleSize: containerSize, rippleCentered: true, onPress: onPress },
            React.createElement(View, { style: [styles.iconContainer, iconContainer] },
                React.createElement(IconComponent, { name: name, size: size, color: color || 'black' }))));
    }
}
//# sourceMappingURL=IconTouchable.js.map