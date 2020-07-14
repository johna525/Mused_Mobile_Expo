import React, { Component } from 'react';
import { View, TextInput } from 'react-native';
import { EvilIcons } from '@expo/vector-icons';
import theme from '../theme';
export default class FilterSearch extends Component {
    render() {
        return (React.createElement(View, { style: theme.searchContainer },
            React.createElement(View, { style: { flex: 0.1 } },
                React.createElement(EvilIcons, { name: "search", size: 30, color: "#000" })),
            React.createElement(View, { style: { flex: 0.9 } },
                React.createElement(TextInput, { placeholder: 'Search designers', placeholderTextColor: '#000', underlineColorAndroid: 'transparent', style: theme.textFieldStyle }))));
    }
}
//# sourceMappingURL=FilterSearch.js.map