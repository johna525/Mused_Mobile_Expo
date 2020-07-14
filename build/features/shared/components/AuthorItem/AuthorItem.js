import React, { Component } from 'react';
import { Text, View, Image } from 'react-native';
import theme from './theme';
export default class AuthorItem extends Component {
    render() {
        const { author, time, imgAuthorUrl, authorContainer, onCollection, postType } = this.props;
        let pt = 'Selected by';
        if (postType === 'list')
            pt = 'List by';
        else if (postType === 'product')
            pt = 'Product by';
        return (React.createElement(View, { style: theme.authorWrapper }, onCollection
            ? (React.createElement(React.Fragment, null,
                React.createElement(View, { style: [authorContainer, { flex: 1 }] },
                    React.createElement(Image, { style: theme.authorImage, source: imgAuthorUrl }),
                    React.createElement(View, { style: theme.authorTextContainer },
                        React.createElement(Text, { style: theme.authorText },
                            " ",
                            author !== undefined ? author.toUpperCase() : 'someone'),
                        React.createElement(Text, { style: theme.authorText }, time)))))
            : (React.createElement(React.Fragment, null,
                React.createElement(View, { style: [authorContainer, { flex: 0.4 }] },
                    React.createElement(Image, { style: theme.authorImage, source: imgAuthorUrl }),
                    React.createElement(View, { style: theme.authorTextContainer },
                        React.createElement(Text, { style: theme.authorText }, pt),
                        React.createElement(Text, { style: theme.authorText }, author !== undefined && author.toUpperCase()))),
                React.createElement(View, { style: { flex: 0.6, flexDirection: 'row', alignItems: 'flex-end' } },
                    React.createElement(Text, { style: [theme.authorText, { flex: 1, textAlign: 'right', lineHeight: 18 }] }, time))))));
    }
}
AuthorItem.defaultProps = {
    onCollection: false
};
//# sourceMappingURL=AuthorItem.js.map