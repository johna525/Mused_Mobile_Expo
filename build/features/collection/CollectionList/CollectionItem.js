import React, { Component } from 'react';
import { Text, View, Image, TouchableHighlight, } from 'react-native';
import Ripple from 'react-native-material-ripple';
import { thumbnailImage } from '../../shared';
import theme from '../theme';
import * as API from '../../../services/api';
const likeIconUrl = require('../../../../assets/images/star_like.png');
const notLikeIconUrl = require('../../../../assets/images/star.png');
const AnimationImage = require('../../../../assets/images/gif_transparent.gif');
export default class CollectionItem extends Component {
    constructor() {
        super(...arguments);
        this.state = {
            isLiked: false,
            bookmark: null,
        };
        this._goToNext = () => {
            const { goToNext, item, alternatives } = this.props;
            API.RegisterEvent("Cl-alternatives", {
                actionType: "Click any 'alternatives' button"
            });
            goToNext(item.id, alternatives);
        };
        this._createBookmark = () => {
            const { createBookmark, deleteBookmarkById, item: { id } } = this.props;
            const { isLiked, bookmark } = this.state;
            if (isLiked && bookmark) {
                deleteBookmarkById(bookmark._id);
                this.setState({ isLiked: false, bookmark: null });
                return;
            }
            API.RegisterEvent("Cl-bookmark", {
                actionType: 'Click on bookmark'
            });
            createBookmark(id);
        };
    }
    componentDidMount() {
        const { listOfBookmarks } = this.props;
        const { id } = this.props.item;
        const bookmark = listOfBookmarks.find((bookmark) => bookmark.productId === id);
        Boolean(bookmark) && this.setState({ isLiked: true, bookmark });
    }
    componentWillReceiveProps(newProps) {
        const { listOfBookmarks } = this.props;
        const { id } = this.props.item;
        if (newProps.listOfBookmarks.length !== listOfBookmarks.length) {
            const bookmark = newProps.listOfBookmarks.find((bookmark) => bookmark.productId === id);
            Boolean(bookmark) && this.setState({ isLiked: true, bookmark });
        }
    }
    render() {
        const { countAlter, item } = this.props;
        const { brand, unbrandedName, id } = this.props.item;
        const { isLiked } = this.state;
        return (React.createElement(View, { style: theme.containerItem },
            React.createElement(Ripple, { onPress: this._goToNext, style: theme.alterContainer, rippleSize: 80, rippleDuration: 300, rippleContainerBorderRadius: 40 },
                React.createElement(View, { style: { alignItems: 'center' } },
                    React.createElement(View, { style: theme.alterItem },
                        React.createElement(Image, { source: AnimationImage, style: theme.animationImage }),
                        React.createElement(Text, { style: theme.countText }, countAlter)),
                    React.createElement(Text, { style: [theme.countText, { marginTop: 3 }] }, "alternatives"))),
            React.createElement(View, { style: theme.imageContainer },
                React.createElement(Ripple, { onPress: () => this.props.navigateToProductSingle(item), style: theme.clickableImageContainer, rippleSize: 150, rippleDuration: 300, rippleCentered: true, rippleContainerBorderRadius: 40 },
                    React.createElement(Image, { source: { uri: `${thumbnailImage}${id}` }, resizeMode: 'contain', style: theme.itemImage, onLoadEnd: this.props.onLoadImage }),
                    React.createElement(Text, { style: theme.clickableTitle }, brand.toUpperCase()),
                    React.createElement(Text, { style: theme.clickableSubTitle }, unbrandedName))),
            React.createElement(View, { style: theme.likeContainer },
                React.createElement(TouchableHighlight, { style: theme.likeImageContainer, underlayColor: 'transparent', onPress: this._createBookmark },
                    React.createElement(Image, { source: isLiked ? likeIconUrl : notLikeIconUrl, style: theme.likeImage })))));
    }
}
//# sourceMappingURL=CollectionItem.js.map