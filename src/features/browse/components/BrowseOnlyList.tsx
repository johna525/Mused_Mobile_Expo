import React, { Component } from 'react';
import {
    View,
    Text,
    FlatList,
    Animated,
    ToastAndroid
} from 'react-native';
import DotIndicator from '../../shared/components/Indicators/dot-indicator'
import BrowseItem from './BrowseItem';
import theme from '../theme';

const demoHeader = {
    title: 'Product Matches',
    subTitle: 'This is some text inside of a div block.'
}

type State = {
    likedItemIndex: null | number;
    fadeIn: any;
    prevProducts: string;
};

type Props = {
    navigation: any;
    navigateToProductSingle: (product: Product) => void;
    setNewImgUrl: (newImgUrl: HashMap<string>) => void;
    hideContextMenu: () => void;
    isSlotMachine: boolean;
    listOfProducts: Product[];
    getAlternatives: (ids: number[]) => void;
    createBookmark: (productId: number) => void;
    deleteBookmarkById: (_id: any) => void;
    listOfBookmarks: Bookmark[];
    contextMenuIsVisible: boolean;
    arrayImages: ProductImage[];
    noResult: boolean; 
    getNewProducts: (category: string) => void;  
    onScrollEndDrag: (e: any) => void;
    AllList: Product[]; 
};
export default class Browser extends Component<Props, State> {
    state: State = {
        likedItemIndex: null,
        fadeIn: new Animated.Value(0),
        prevProducts: ''
    }
    blackTimeOut: any;
    prevProducts: any;
    componentDidMount() {
        const {getAlternatives, navigation, getNewProducts} = this.props;
        const productIds: number[] = navigation.getParam('productIds', []);
        const fromMenu: boolean = navigation.getParam('fromMenu', false);
        if(productIds.length > 0) getAlternatives(productIds);
        else if(!fromMenu) getNewProducts('all')
        this.blackTimeOut = setTimeout(() => {
            this._fadeIn()
        }, 500)        
    }

    componentWillUnmount() {
        clearTimeout(this.blackTimeOut)
    }

    componentWillReceiveProps(props: any) {
        if(JSON.stringify(props.AllList) !== this.prevProducts) {
            this.scrollToTop();
            this.prevProducts = JSON.stringify(props.AllList)
        }     
    }

    render() {
        const _listOfProducts = [...this.props.listOfProducts];
        return (
            <View style={[theme.container]}>
                <Animated.View style={[theme.browseOnlyView, {opacity: this.state.fadeIn, marginBottom: 0}]}>
                    <FlatList
                        ref='_scrollView'
                        data={_listOfProducts}
                        // ListHeaderComponent={this.renderHeaderComponent}
                        ListFooterComponent={() => <View style={theme.footerComponent} />}
                        ListEmptyComponent={this._renderEmptyView}
                        renderItem={this._renderItem}
                        keyExtractor={ item => `${item.id}`}
                        numColumns={2}
                        scrollEventThrottle={300}
                        onScrollEndDrag={({ nativeEvent }) => {
                            this.props.onScrollEndDrag(nativeEvent);
                            this.props.hideContextMenu;
                        }}
                        initialNumToRender={10}
                    />
                </Animated.View>
            </View>
        )
    }

    renderHeaderComponent = () => {         
        return(
            <View style={theme.containerHeader}>
                <Text style={theme.headerTitle}>{demoHeader.title.toUpperCase()}</Text>
                <Text style={theme.headerSubTitle}>{demoHeader.subTitle}</Text>
                <View style={theme.underlineTitle}></View>
            </View>
        )
    }

    scrollToTop = () => {
        const scrollInstant: any = this.refs._scrollView;
        if(scrollInstant === undefined) return;
        setTimeout(() => {          
          scrollInstant.scrollToOffset({x: 0, y: 0, animated: true})
        }, 1500) 
    }

    onDuplicated = () => {
        ToastAndroid.show("You can't select double items.", ToastAndroid.SHORT);
    }

    _renderEmptyView = () => {
        if(!this.props.noResult) {
            return <DotIndicator size={6} count={3} style={{paddingTop: 80}}/>
        } else {
            return <Text style={theme.emptyText}>No results</Text>
        }
    }

    _renderItem = (props: {item: Product, index: number}) =>
        <BrowseItem item={props.item} index={props.index}
            likedItemIndex={this.state.likedItemIndex}
            likeItem={this._likeItem}
            navigateToProductSingle={this.props.navigateToProductSingle}
            setNewImgUrl={this.props.setNewImgUrl}
            hideContextMenu={this.props.hideContextMenu}
            isSlotMachine={this.props.isSlotMachine}
            createBookmark={this.props.createBookmark}
            listOfBookmarks={this.props.listOfBookmarks}
            deleteBookmarkById={this.props.deleteBookmarkById}
            contextMenuIsVisible={this.props.contextMenuIsVisible}
            onDuplicated={this.onDuplicated}
            arrayImages={this.props.arrayImages}
            browseOnly={true}
        />

    _likeItem = (index: number) =>
        this.setState({likedItemIndex: index});

    _fadeIn = () => {
        this.state.fadeIn.setValue(0)
        Animated.timing(                 
            this.state.fadeIn,            
            {
                toValue: 1,                   
                duration: 1200, 
                useNativeDriver: true             
            }
        ).start();                        
    }

}
