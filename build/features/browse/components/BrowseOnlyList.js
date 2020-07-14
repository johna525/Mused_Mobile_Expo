import React, { Component } from 'react';
import { View, Text, FlatList, Animated, ToastAndroid } from 'react-native';
import DotIndicator from '../../shared/components/Indicators/dot-indicator';
import BrowseItem from './BrowseItem';
import theme from '../theme';
const demoHeader = {
    title: 'Product Matches',
    subTitle: 'This is some text inside of a div block.'
};
export default class Browser extends Component {
    constructor() {
        super(...arguments);
        this.state = {
            likedItemIndex: null,
            fadeIn: new Animated.Value(0),
            prevProducts: ''
        };
        this.renderHeaderComponent = () => {
            return (React.createElement(View, { style: theme.containerHeader },
                React.createElement(Text, { style: theme.headerTitle }, demoHeader.title.toUpperCase()),
                React.createElement(Text, { style: theme.headerSubTitle }, demoHeader.subTitle),
                React.createElement(View, { style: theme.underlineTitle })));
        };
        this.scrollToTop = () => {
            const scrollInstant = this.refs._scrollView;
            if (scrollInstant === undefined)
                return;
            setTimeout(() => {
                scrollInstant.scrollToOffset({ x: 0, y: 0, animated: true });
            }, 1500);
        };
        this.onDuplicated = () => {
            ToastAndroid.show("You can't select double items.", ToastAndroid.SHORT);
        };
        this._renderEmptyView = () => {
            if (!this.props.noResult) {
                return React.createElement(DotIndicator, { size: 6, count: 3, style: { paddingTop: 80 } });
            }
            else {
                return React.createElement(Text, { style: theme.emptyText }, "No results");
            }
        };
        this._renderItem = (props) => React.createElement(BrowseItem, { item: props.item, index: props.index, likedItemIndex: this.state.likedItemIndex, likeItem: this._likeItem, navigateToProductSingle: this.props.navigateToProductSingle, setNewImgUrl: this.props.setNewImgUrl, hideContextMenu: this.props.hideContextMenu, isSlotMachine: this.props.isSlotMachine, createBookmark: this.props.createBookmark, listOfBookmarks: this.props.listOfBookmarks, deleteBookmarkById: this.props.deleteBookmarkById, contextMenuIsVisible: this.props.contextMenuIsVisible, onDuplicated: this.onDuplicated, arrayImages: this.props.arrayImages, browseOnly: true });
        this._likeItem = (index) => this.setState({ likedItemIndex: index });
        this._fadeIn = () => {
            this.state.fadeIn.setValue(0);
            Animated.timing(this.state.fadeIn, {
                toValue: 1,
                duration: 1200,
                useNativeDriver: true
            }).start();
        };
    }
    componentDidMount() {
        const { getAlternatives, navigation, getNewProducts } = this.props;
        const productIds = navigation.getParam('productIds', []);
        const fromMenu = navigation.getParam('fromMenu', false);
        if (productIds.length > 0)
            getAlternatives(productIds);
        else if (!fromMenu)
            getNewProducts('all');
        this.blackTimeOut = setTimeout(() => {
            this._fadeIn();
        }, 500);
    }
    componentWillUnmount() {
        clearTimeout(this.blackTimeOut);
    }
    componentWillReceiveProps(props) {
        if (JSON.stringify(props.AllList) !== this.prevProducts) {
            this.scrollToTop();
            this.prevProducts = JSON.stringify(props.AllList);
        }
    }
    render() {
        const _listOfProducts = [...this.props.listOfProducts];
        return (React.createElement(View, { style: [theme.container] },
            React.createElement(Animated.View, { style: [theme.browseOnlyView, { opacity: this.state.fadeIn, marginBottom: 0 }] },
                React.createElement(FlatList, { ref: '_scrollView', data: _listOfProducts, 
                    // ListHeaderComponent={this.renderHeaderComponent}
                    ListFooterComponent: () => React.createElement(View, { style: theme.footerComponent }), ListEmptyComponent: this._renderEmptyView, renderItem: this._renderItem, keyExtractor: item => `${item.id}`, numColumns: 2, scrollEventThrottle: 300, onScrollEndDrag: ({ nativeEvent }) => {
                        this.props.onScrollEndDrag(nativeEvent);
                        this.props.hideContextMenu;
                    }, initialNumToRender: 10 }))));
    }
}
//# sourceMappingURL=BrowseOnlyList.js.map