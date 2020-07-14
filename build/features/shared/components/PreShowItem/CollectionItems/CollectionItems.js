import React, { Component } from 'react';
import { Image, } from 'react-native';
import { thumbnailImage } from '../../../imagesUrls';
import theme from '../theme';
export default class CollectionItems extends Component {
    constructor() {
        super(...arguments);
        this._renderCollectionList = () => {
            const style = {
                borderBottomWidth: 1,
                borderTopWidth: 1,
                borderLeftWidth: 1,
                borderRightWidth: 1
            };
            return this.props.arrayImgs.map((imgUrl, index) => {
                return (React.createElement(Image, { style: [theme.itemImage, style, { marginHorizontal: 4 }], source: { uri: `${thumbnailImage}${imgUrl.id}` }, key: index, resizeMode: 'contain' }));
            });
        };
    }
    render() {
        return this._renderCollectionList();
    }
}
//# sourceMappingURL=CollectionItems.js.map