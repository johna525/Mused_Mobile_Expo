import React, { Component } from 'react';
import { Text, View, } from 'react-native';
import { AuthorItem } from '../../shared';
import theme from '../theme';
export default class CollectionFooter extends Component {
    render() {
        const { onCollection, title, item: { timeAgo, authorProfilePhoto, authorName } } = this.props;
        if (!this.props.visible)
            return null;
        return (React.createElement(View, { style: theme.containerFooter },
            React.createElement(View, { style: theme.containerFooterWithBorder },
                React.createElement(Text, { style: theme.footerTitle }, title.toUpperCase())),
            React.createElement(AuthorItem, { author: authorName, time: timeAgo, imgAuthorUrl: { uri: authorProfilePhoto }, authorContainer: theme.authorContainer, onCollection: onCollection })));
    }
}
CollectionFooter.defaultProps = {
    onCollection: false
};
//# sourceMappingURL=CollectionFooter.js.map