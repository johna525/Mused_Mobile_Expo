import React, { Component } from 'react';
import { View, FlatList, StatusBar, Animated, Image, Text, TouchableOpacity } from 'react-native';
import _ from 'lodash';
import NewsfeedItem from './NewsfeedItem';
import theme from '../theme';
import RetailerPosts from './RetailerPost';
// import NewProductList from './NewProductList';
import DotIndicator from '../../shared/components/Indicators/dot-indicator';
export default class NewsfeedList extends Component {
    constructor() {
        super(...arguments);
        this.state = {
            fadeIn: new Animated.Value(1),
            numberOfcontent: 1,
            token: null,
            notification: null,
            slots: [],
            instagram_inspirationalImage: '',
            loading: true
        };
        //sort newsfeed by pin field
        /*
            if 0 please treat as normal, no speical treatment needed
            if 1 please place at the top of newfeed
            if 2 please place 2nd on newsfeed
            if 3 please place 3rd on newsfeed
        */
        this.filterAndSortData = (data) => {
            let pinPosts = [];
            let unPinPosts = [];
            _.reverse(_.sortBy(data, "date")).map((post) => {
                if (post.pin === 0)
                    unPinPosts.push(post);
                else if (post.pin > 0)
                    pinPosts.push(post);
            });
            const res = pinPosts.concat(unPinPosts);
            return res;
        };
        this._renderItem = (props) => React.createElement(NewsfeedItem, { item: props.item, goToCollection: this._goToCollection, goToBrowseDirectly: this.props.goToBrowseDirectly, goToZoomDirectly: this.props.goToZoomDirectly, goToInstagramSlide: this.props.goToInstagramSlide });
        this._renderHeader = () => {
            const { instagram_inspirationalImage } = this.state;
            // if(instagram_inspirationalImage.length === 0) return null;
            return (React.createElement(View, null,
                React.createElement(View, { style: theme.titleView },
                    React.createElement(View, { style: theme.lineView }),
                    React.createElement(Text, { style: theme.titleText }, "Today's Instagram Looks"),
                    React.createElement(View, { style: theme.lineView })),
                instagram_inspirationalImage.length === 0 ?
                    React.createElement(View, { style: theme.instagramImage })
                    :
                        React.createElement(TouchableOpacity, { onPress: this.props.goToInstagramSlide },
                            React.createElement(Image, { source: { uri: instagram_inspirationalImage }, style: theme.instagramImage })),
                React.createElement(View, { style: theme.separator })));
        };
        this._renderFooter = () => {
            const { listOfRetailerPosts } = this.props;
            if (listOfRetailerPosts) {
                return (React.createElement(View, null,
                    React.createElement(RetailerPosts, { posts: listOfRetailerPosts, onClickPost: this.props.onClickRetailerPost }),
                    React.createElement(View, { style: theme.separator })));
            }
            else {
                return null;
            }
        };
        this._goToCollection = (param) => {
            const { goToCollection, getCollection } = this.props;
            this.state.fadeIn.setValue(1);
            getCollection(param.productIds);
            setTimeout(() => {
                Animated.timing(this.state.fadeIn, {
                    toValue: 0,
                    duration: 500,
                    useNativeDriver: true
                }).start(() => {
                    goToCollection(param);
                    setTimeout(() => {
                        this.state.fadeIn.setValue(1);
                    }, 300);
                });
            }, 300);
        };
        this._renderSeparator = () => React.createElement(View, { style: theme.separator });
    }
    componentDidMount() {
        this.props.getPosts();
        this.props.getBookmarksByUserId();
        setTimeout(() => {
            this.setState({ loading: false });
        }, 500);
    }
    componentWillReceiveProps(props) {
        const { listOfPosts } = props;
        if (listOfPosts === undefined || this.state.instagram_inspirationalImage.length > 0 || listOfPosts.length === 0)
            return null;
        let imageUrl = '';
        _.reverse(_.sortBy(listOfPosts, "date")).map((post) => {
            console.log(post.pin);
            if (post.postType === 'instagram') {
                imageUrl = post.inspirationalImage;
            }
        });
        this.setState({ instagram_inspirationalImage: imageUrl });
        return true;
    }
    render() {
        return (React.createElement(Animated.View, { style: [theme.container, { opacity: this.state.fadeIn }] },
            React.createElement(StatusBar, { backgroundColor: "white", barStyle: "dark-content" }),
            (this.props.listOfPosts && this.props.listOfPosts.length) && React.createElement(FlatList, { data: this.filterAndSortData(this.props.listOfPosts), keyExtractor: (item) => `${item._id}`, scrollEventThrottle: 1000, 
                // ListHeaderComponent={this._renderHeader}
                ListFooterComponent: this._renderFooter.bind(this), renderItem: this._renderItem, onScroll: ({ nativeEvent }) => this.props.onScroll(nativeEvent) }),
            this.state.loading &&
                React.createElement(View, { style: theme.loadingView },
                    React.createElement(DotIndicator, { size: 6, count: 3 }))));
    }
}
//# sourceMappingURL=NewsfeedList.js.map