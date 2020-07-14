import React, { Component } from 'react';
import { View, Text } from 'react-native';
import theme from '../theme';
export default class DesignerItem extends Component {
    render() {
        const { index, item: { text } } = this.props;
        return (React.createElement(View, { style: theme.designerItemContainer },
            React.createElement(View, { style: { flex: 0.5 } },
                React.createElement(Text, { style: theme.designerItemText }, text)),
            React.createElement(View, { style: { flex: 0.5 } }, index === 1 && React.createElement(Text, { style: [theme.designerItemText, { textAlign: 'right', paddingRight: 25 }] }, "SELECTED"))));
    }
}
//# sourceMappingURL=DesignerItem.js.map