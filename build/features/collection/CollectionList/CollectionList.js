import React, { Component } from 'react';
import { View, FlatList, Animated } from 'react-native';
import DotIndicator from '../../shared/components/Indicators/dot-indicator';
import CollectionItem from './CollectionItem.hoc';
import CollectionHeader from './CollectionHeader';
import CollectionFooter from './CollectionFooter';
import theme from '../theme';
const testDataHeader = {
    title: 'The Look',
    subTitle: 'Product matches for this outfit'
};
const testDataFooter = {
    title: 'Collection inspired by',
    author: 'Jennifer Stevens',
    time: '8hrs',
    imgUrl: require('../../../../assets/images/newsfeed/newsfeed-author.jpg')
};
export default class CollectionList extends Component {
    constructor() {
        super(...arguments);
        this.state = {
            showFooter: false,
            fadeIn: new Animated.Value(1)
        };
        this._renderItem = (props) => React.createElement(CollectionItem, { item: props.item, countAlter: this.props.isFromOutfit ? '>' : `${this.slots[props.index].alternatives.length}`, index: props.index, goToNext: this._goToNext, alternatives: this.slots[props.index].alternatives, onLoadImage: this._onLoadImage });
        this._renderHeader = () => React.createElement(CollectionHeader, { item: testDataHeader });
        this._renderEmptyView = () => React.createElement(DotIndicator, { size: 6, count: 3, style: { paddingTop: 80 } });
        this._renderFooter = () => {
            const authorItem = this.props.navigation.getParam('authorItem');
            if (this.props.isFromOutfit || this.from === 'instagram')
                return null;
            return (React.createElement(CollectionFooter, { item: authorItem, visible: this.state.showFooter, title: testDataFooter.title, onCollection: true }));
        };
        this._goToNext = (slotNumber, alternatives) => {
            const { goToNext } = this.props;
            this.state.fadeIn.setValue(1);
            this.props.getCollection(this.slots);
            Animated.timing(this.state.fadeIn, {
                toValue: 0,
                duration: 500,
                useNativeDriver: true
            }).start(() => {
                setTimeout(() => {
                    goToNext(slotNumber, alternatives, this.slots);
                    setTimeout(() => {
                        this.state.fadeIn.setValue(1);
                    }, 300);
                }, 300);
            });
        };
        this._onLoadImage = () => {
            this.setState({ showFooter: true });
        };
    }
    componentWillMount() {
        const { navigation } = this.props;
        this.slots = navigation.getParam('productIds', []);
        this.from = navigation.getParam('from', 'newsfeed');
    }
    render() {
        const { listOfCollection } = this.props;
        // console.log('listOfCollection', listOfCollection)  
        return (React.createElement(View, { style: theme.wrapper },
            React.createElement(Animated.View, { style: [theme.container, { opacity: this.state.fadeIn }] },
                React.createElement(View, { style: theme.collectionListContainer }, listOfCollection && React.createElement(FlatList, { data: listOfCollection, renderItem: this._renderItem, keyExtractor: (item) => `${item.id}`, ListHeaderComponent: this._renderHeader, ListEmptyComponent: this._renderEmptyView, ListFooterComponent: this._renderFooter.bind(this) })))));
    }
}
//# sourceMappingURL=CollectionList.js.map