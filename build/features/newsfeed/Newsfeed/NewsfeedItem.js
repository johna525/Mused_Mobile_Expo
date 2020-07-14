import React, { Component } from 'react';
import { View, Text, Dimensions, Image } from 'react-native';
import Ripple from 'react-native-material-ripple';
import moment from 'moment';
// import AutoHeightImage from 'react-native-auto-height-image';
import { AuthorItem, } from '../../shared';
import theme from '../theme';
const { width } = Dimensions.get('window');
const defaultNewsImage = require('../../../../assets/images/newsfeed/newsfeed.jpg');
export default class NewsfeedItem extends Component {
    constructor() {
        super(...arguments);
        this.getTimeSincePost = (date) => {
            // return timeSince(date) + ' ago'
            return ' ' + moment(new Date(date)).fromNow(false);
        };
        this._navigateToCollection = () => {
            const { goToBrowseDirectly, goToCollection, goToZoomDirectly, goToInstagramSlide, item: { date, authorProfilePhoto, authorName, slots, postType, productIds, productId } } = this.props;
            if (postType === 'list') {
                goToBrowseDirectly(productIds);
                return;
            }
            else if (postType === 'product') {
                goToZoomDirectly(productId);
                return;
            }
            else if (postType === 'instagram') {
                goToInstagramSlide();
                return;
            }
            goToCollection({
                productIds: slots,
                authorItem: {
                    timeAgo: this.getTimeSincePost(date),
                    authorProfilePhoto,
                    authorName
                }
            });
        };
    }
    render() {
        const { date, authorProfilePhoto, authorName, inspirationalImage, title, postType, hidden } = this.props.item;
        if (hidden || postType === 'instagram')
            return null;
        return (React.createElement(View, { style: theme.container },
            React.createElement(View, { style: theme.titleView },
                React.createElement(View, { style: theme.lineView }),
                React.createElement(Text, { style: theme.titleText }, (title === undefined || title.length === 0) ? 'No Title' : title),
                React.createElement(View, { style: theme.lineView })),
            React.createElement(View, { style: theme.itemImageContainer },
                React.createElement(Ripple, { onPress: this._navigateToCollection, rippleColor: 'rgb(255, 255, 255)', rippleDuration: 300, rippleCentered: true, rippleContainerBorderRadius: width }, (inspirationalImage === null || inspirationalImage.length === 0) ?
                    React.createElement(Image, { source: defaultNewsImage, style: theme.itemImage })
                    :
                        React.createElement(Image, { source: { uri: inspirationalImage + ' ' }, style: theme.itemImage }))),
            postType !== 'instagram' ?
                React.createElement(AuthorItem, { postType: postType, author: authorName, time: this.getTimeSincePost(date), imgAuthorUrl: { uri: authorProfilePhoto }, authorContainer: theme.authorContainer })
                :
                    React.createElement(View, { style: { height: 30 } }),
            React.createElement(View, { style: theme.separator })));
    }
}
//# sourceMappingURL=NewsfeedItem.js.map