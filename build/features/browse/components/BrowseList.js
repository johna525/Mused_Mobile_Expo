import React, { Component } from 'react';
import { View, Text, FlatList, Animated, ToastAndroid } from 'react-native';
import DotIndicator from '../../shared/components/Indicators/dot-indicator';
import BrowseItem from './BrowseItem';
import theme from '../theme';
const demoHeader = {
    title: 'Create your look',
    subTitle: 'Style it your way'
};
export default class Browser extends Component {
    constructor() {
        super(...arguments);
        this.state = {
            likedItemIndex: null,
            fadeIn: new Animated.Value(0),
            prevProducts: '',
            isNew: false
        };
        this.renderHeaderComponent = () => {
            if (this.props.newUser && this.props.listOfAlternatives.length > 0) {
                return (React.createElement(View, null,
                    React.createElement(View, { style: theme.containerHeader },
                        React.createElement(Text, { style: theme.headerTitle }, demoHeader.title.toUpperCase()),
                        React.createElement(Text, { style: theme.headerSubTitle }, demoHeader.subTitle)),
                    React.createElement(View, { style: theme.topProductsView }, this.props.listOfAlternatives.slice(0, 4).map((product, index) => {
                        return this._renderItem({ item: product, index: index - 5 });
                    })),
                    React.createElement(View, { style: theme.containerHeader },
                        React.createElement(Text, { style: theme.headerTitle }, "To see different products"),
                        React.createElement(Text, { style: theme.headerSubTitle }, "Tap 'filter' at bottom of screen"))));
            }
            else {
                return (React.createElement(View, { style: theme.containerHeader },
                    React.createElement(Text, { style: theme.headerTitle }, demoHeader.title.toUpperCase()),
                    React.createElement(Text, { style: theme.headerSubTitle }, demoHeader.subTitle)));
            }
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
        this._renderItem = (props) => {
            if (props.index > -1 && props.index < 4)
                return null;
            else {
                return (React.createElement(BrowseItem, { key: props.item.id, item: props.item, index: props.index, likedItemIndex: this.state.likedItemIndex, likeItem: this._likeItem, navigateToProductSingle: this.props.navigateToProductSingle, setNewImgUrl: this.props.setNewImgUrl, hideContextMenu: this.props.hideContextMenu, isSlotMachine: this.props.isSlotMachine, createBookmark: this.props.createBookmark, listOfBookmarks: this.props.listOfBookmarks, deleteBookmarkById: this.props.deleteBookmarkById, contextMenuIsVisible: this.props.contextMenuIsVisible, onDuplicated: this.onDuplicated, arrayImages: this.props.arrayImages, browseOnly: false }));
            }
        };
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
        const { getAlternatives, navigation } = this.props;
        const from = navigation.getParam('from', '');
        const productIds = navigation.getParam('alternatives', []);
        if (navigation.getParam('collectionFrom', '') === 'outfit') {
            this.props.getNewProducts('all');
        }
        else if (from === 'collection') {
            getAlternatives(productIds);
        }
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
        const _listOfAlternatives = [...this.props.listOfAlternatives];
        return (React.createElement(View, { style: [theme.container] },
            React.createElement(Animated.View, { style: [theme.productListContainer, { opacity: this.state.fadeIn }] },
                React.createElement(FlatList, { ref: '_scrollView', data: _listOfAlternatives, ListHeaderComponent: this.renderHeaderComponent, ListFooterComponent: () => React.createElement(View, { style: theme.footerComponent }), ListEmptyComponent: this._renderEmptyView, renderItem: this._renderItem, keyExtractor: item => `${item.id}`, numColumns: 2, scrollEventThrottle: 300, initialNumToRender: 10, onScrollEndDrag: ({ nativeEvent }) => {
                        this.props.onScrollEndDrag(nativeEvent);
                    }, onMomentumScrollBegin: ({ nativeEvent }) => {
                        this.props.hideContextMenu();
                        console.log(nativeEvent.contentSize);
                    } }))));
    }
}
//# sourceMappingURL=BrowseList.js.map