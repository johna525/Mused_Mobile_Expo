import React, { Component } from 'react';
import { Text, View, Image, TouchableWithoutFeedback } from 'react-native';
// import { makeId } from '../../shared';
import theme from '../theme';
export default class FilterItem extends Component {
    render() {
        const { index, item: { name, imgUrl } } = this.props;
        const selectedItem = index === 0 ? {
            borderBottomColor: '#000',
            borderBottomWidth: 1,
            borderTopColor: '#000',
            borderTopWidth: 1,
            borderLeftColor: '#000',
            borderLeftWidth: 1,
            borderRightColor: '#000',
            borderRightWidth: 1
        } : {};
        return (React.createElement(View, { style: theme.itemContainer },
            React.createElement(View, { style: theme.imageContainer },
                React.createElement(TouchableWithoutFeedback, { onPress: () => { } },
                    React.createElement(View, { style: [{ flexDirection: 'column', justifyContent: 'center', alignItems: 'center' }, selectedItem] },
                        React.createElement(Image, { source: imgUrl, style: [theme.image], resizeMode: 'contain' })))),
            React.createElement(View, null,
                React.createElement(Text, { style: theme.itemName }, name))));
    }
    ;
}
//# sourceMappingURL=FilterItem.js.map