import React, { Component } from 'react';
import { View } from 'react-native';
import PreShowItems from '../PreShowItem/PreShowItems.hoc';
import { COLLECTION, BROWSE, FILTER } from '../../../shared';
import theme from './theme';
export default class Footer extends Component {
    constructor() {
        super(...arguments);
        this._renderFooter = () => {
            return (React.createElement(View, { style: theme.container },
                React.createElement(PreShowItems, null)));
        };
    }
    render() {
        const { currentRoute } = this.props;
        const footerIsVisible = currentRoute === COLLECTION ||
            currentRoute === BROWSE ||
            currentRoute === FILTER;
        return (footerIsVisible ? this._renderFooter() : null);
    }
}
//# sourceMappingURL=Footer.js.map