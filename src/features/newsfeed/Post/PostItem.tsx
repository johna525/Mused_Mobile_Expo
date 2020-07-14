import React, { Component } from 'react';
import {
  View,
  Text,
  Dimensions,
  Image
} from 'react-native';
import Ripple from 'react-native-material-ripple';
import moment from 'moment'

import { AuthorItem, } from '../../shared';
import theme from '../theme';
const { width} = Dimensions.get('window');
const defaultNewsImage = require('../../../../assets/images/newsfeed/newsfeed.jpg');

type Props = {
    item: Post;
    goToCollection: (params: any) => void;
    goToBrowseDirectly: (productIds: any) => void;
    goToZoomDirectly: (productId: number) => void;
    goToInstagramPost: (post: Post) => void;
    navigation: any
};

type State = {
    post: Post
};

export default class PostItem extends Component<Props, State> {

    state: State = {
        post: null
    }

    componentDidMount() {
        const { navigation } = this.props;
        const post = navigation.getParam('post', {});
        this.setState({post});
    }

    render() {
        if(this.state.post === null) return null;
        const { date, authorProfilePhoto, authorName, inspirationalImage, title, postType } = this.state.post;
        return (
            <View style={theme.container}>
                <View style={theme.titleView}>
                    <View style={theme.lineView}></View>
                    <Text style={theme.titleText}>{(title === undefined || title.length === 0) ? 'No Title' : title}</Text>
                    <View style={theme.lineView}></View>
                </View>
                <View style={theme.itemImageContainer}>
                    <Ripple
                        onPress={this._navigateToCollection}
                        rippleColor={'rgb(255, 255, 255)'}
                        rippleDuration={300}
                        rippleCentered={true}
                        rippleContainerBorderRadius={width}>
                        {
                            (inspirationalImage === null || inspirationalImage.length === 0) ?
                            <Image
                                source={defaultNewsImage}
                                style={theme.itemImage}
                            />
                            :
                            <Image
                                source={{uri: inspirationalImage + ' '}}
                                style={theme.itemImage}
                            />
                        }
                    </Ripple>
                </View>
                {
                    postType !== 'instagram' ?
                    <AuthorItem
                        postType={postType}
                        author={authorName}
                        time={this.getTimeSincePost(date)}
                        imgAuthorUrl={{uri: authorProfilePhoto}}
                        authorContainer={theme.authorContainer}
                    />
                    :
                    <View style={{height: 30}} />
                }        
                <View style={theme.separator}></View>        
            </View>
        )
    }

    getTimeSincePost = (date: string) => {
        // return timeSince(date) + ' ago'
        return moment(new Date(date)).fromNow(false)
    }

    _navigateToCollection = () => {
        const { 
            goToBrowseDirectly, 
            goToCollection, 
            goToZoomDirectly,
            goToInstagramPost             
        } = this.props;
        const {post: {timeAgo, authorProfilePhoto, authorName, slots, postType, productIds, productId }} = this.state;
        if(postType === 'list') {
            goToBrowseDirectly(productIds);
            return;
        } else if(postType === 'product') {
            goToZoomDirectly(productId);
            return;
        } else if(postType === 'instagram') {
            goToInstagramPost(this.state.post);
            return;
        }

        goToCollection(
        {
            productIds: slots,
            authorItem: {
                timeAgo,
                authorProfilePhoto,
                authorName
            }
        });
    }
 }
