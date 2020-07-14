import React, { Component } from 'react';
import { Text, View, TouchableHighlight, } from 'react-native';
import theme from '../theme';
export default class FilterHeader extends Component {
    constructor() {
        super(...arguments);
        this._changeTab = (type) => this.props.changeTab(type);
    }
    render() {
        const { currentList, hasSearch } = this.props;
        const underLine = { borderBottomColor: '#000', borderBottomWidth: 1 };
        const marginBottom = !hasSearch ? { marginBottom: 15 } : {};
        return (React.createElement(View, { style: [theme.tabNavigationWrapper, marginBottom] },
            React.createElement(TouchableHighlight, { onPress: () => this._changeTab('categories'), underlayColor: 'transparent', style: [theme.buttonTabNavigation, { marginRight: 20 }] },
                React.createElement(View, { style: [currentList === 'categories' ? underLine : {}] },
                    React.createElement(Text, { style: theme.textTabNavigation }, "CATEGORIES"))),
            React.createElement(TouchableHighlight, { style: [theme.buttonTabNavigation, { marginRight: 20 }], underlayColor: 'transparent', onPress: () => this._changeTab('colour') },
                React.createElement(View, { style: [currentList === 'colour' ? underLine : {}] },
                    React.createElement(Text, { style: theme.textTabNavigation }, "COLOUR"))),
            React.createElement(TouchableHighlight, { onPress: () => this._changeTab('designers'), underlayColor: 'transparent', style: [theme.buttonTabNavigation] },
                React.createElement(View, { style: [currentList === 'designers' ? underLine : {}] },
                    React.createElement(Text, { style: theme.textTabNavigation }, "DESIGNERS")))));
    }
}
FilterHeader.defaultProps = {
    hasSearch: false
};
//# sourceMappingURL=FilterHeader.js.map