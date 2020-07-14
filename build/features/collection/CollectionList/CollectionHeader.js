import React, { Component } from 'react';
import { Text, View, } from 'react-native';
import theme from '../theme';
export default class CollectionHeader extends Component {
    render() {
        const { title, subTitle } = this.props.item;
        return (React.createElement(View, { style: theme.containerHeader },
            React.createElement(Text, { style: theme.headerTitle }, title.toUpperCase()),
            React.createElement(Text, { style: theme.headerSubTitle }, subTitle)));
    }
}
//# sourceMappingURL=CollectionHeader.js.map