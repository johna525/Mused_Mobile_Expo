import React, { Component } from 'react';
import { View, Text, Dimensions, Image } from 'react-native';
import Ripple from 'react-native-material-ripple';
import moment from 'moment';
import { AuthorItem, } from '../../shared';
import theme from '../theme';
const { width } = Dimensions.get('window');
const defaultNewsImage = require('../../../../assets/images/newsfeed/newsfeed.jpg');
export default class PostItem extends Component {
    constructor() {
        super(...arguments);
        this.state = {
            post: null
        };
        this.getTimeSincePost = (date) => {
            // return timeSince(date) + ' ago'
            return moment(new Date(date)).fromNow(false);
        };
        this._navigateToCollection = () => {
            const { goToBrowseDirectly, goToCollection, goToZoomDirectly, goToInstagramPost } = this.props;
            const { post: { timeAgo, authorProfilePhoto, authorName, slots, postType, productIds, productId } } = this.state;
            if (postType === 'list') {
                goToBrowseDirectly(productIds);
                return;
            }
            else if (postType === 'product') {
                goToZoomDirectly(productId);
                return;
            }
            else if (postType === 'instagram') {
                goToInstagramPost(this.state.post);
                return;
            }
            goToCollection({
                productIds: slots,
                authorItem: {
                    timeAgo,
                    authorProfilePhoto,
                    authorName
                }
            });
        };
    }
    componentDidMount() {
        const { navigation } = this.props;
        const post = navigation.getParam('post', {});
        this.setState({ post });
    }
    render() {
        if (this.state.post === null)
            return null;
        const { date, authorProfilePhoto, authorName, inspirationalImage, title, postType } = this.state.post;
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
//# sourceMappingURL=PostItem.js.map