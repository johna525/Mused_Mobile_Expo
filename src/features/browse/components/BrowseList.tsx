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
    title: 'Create your look',
    subTitle: 'Style it your way'
}

type State = {
    likedItemIndex: null | number;
    fadeIn: any;
    prevProducts: string;
    isNew: boolean
};
type Props = {
    navigation: any;
    navigateToProductSingle: (product: Product) => void;
    setNewImgUrl: (newImgUrl: HashMap<string>) => void;
    hideContextMenu: () => void;
    isSlotMachine: boolean;
    listOfAlternatives: Product[];
    getAlternatives: (ids: number[]) => void;
    createBookmark: (productId: number) => void;
    deleteBookmarkById: (_id: any) => void;
    listOfBookmarks: Bookmark[];
    contextMenuIsVisible: boolean;
    arrayImages: ProductImage[];
    noResult: boolean;
    getNewProducts: (category: string) => void;
    newUser: boolean,
    onScrollEndDrag: (e: any) => void;
    AllList: Product[];
};
export default class Browser extends Component<Props, State> {
    state: State = {
        likedItemIndex: null,
        fadeIn: new Animated.Value(0),
        prevProducts: '',
        isNew: false
    }
    blackTimeOut: any;
    prevProducts: any;
    componentDidMount() {
        const {getAlternatives, navigation} = this.props;
        const from: string = navigation.getParam('from', '');
        const productIds: number[] = navigation.getParam('alternatives', []);
        if(navigation.getParam('collectionFrom', '') === 'outfit'){
            this.props.getNewProducts('all');
        } else if(from === 'collection') {
            getAlternatives(productIds);        
        }

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
        const _listOfAlternatives = [...this.props.listOfAlternatives];
        return (
            <View style={[theme.container]}>
                <Animated.View style={[theme.productListContainer, {opacity: this.state.fadeIn}]}>
                    <FlatList
                        ref='_scrollView'
                        data={_listOfAlternatives}
                        ListHeaderComponent={this.renderHeaderComponent}
                        ListFooterComponent={() => <View style={theme.footerComponent} />}
                        ListEmptyComponent={this._renderEmptyView}
                        renderItem={this._renderItem}
                        keyExtractor={ item => `${item.id}`}
                        numColumns={2}
                        scrollEventThrottle={300}
                        initialNumToRender={10}
                        onScrollEndDrag={({ nativeEvent }) => {
                            this.props.onScrollEndDrag(nativeEvent);
                        }}
                        onMomentumScrollBegin={({ nativeEvent }) => {
                            this.props.hideContextMenu();
                            console.log(nativeEvent.contentSize);
                        }}
                    />
                </Animated.View>
            </View>
        )
    }

    renderHeaderComponent = () => {
        if(this.props.newUser && this.props.listOfAlternatives.length > 0) {
            return(
                <View>
                    <View style={theme.containerHeader}>
                        <Text style={theme.headerTitle}>{demoHeader.title.toUpperCase()}</Text>
                        <Text style={theme.headerSubTitle}>{demoHeader.subTitle}</Text>
                        {/* <View style={theme.underlineTitle}></View> */}
                    </View>
                    <View style={theme.topProductsView}>
                        {
                            this.props.listOfAlternatives.slice(0, 4).map((product: Product, index) => {
                                return this._renderItem({item: product, index: index - 5})
                            })
                        }
                    </View>
                    <View style={theme.containerHeader}>
                        <Text style={theme.headerTitle}>To see different products</Text>
                        <Text style={theme.headerSubTitle}>Tap 'filter' at bottom of screen</Text>
                        {/* <View style={theme.underlineTitle}></View> */}
                    </View>
                </View>
            )
        } else {
            return (
                <View style={theme.containerHeader}>
                    <Text style={theme.headerTitle}>{demoHeader.title.toUpperCase()}</Text>
                    <Text style={theme.headerSubTitle}>{demoHeader.subTitle}</Text>
                    {/* <View style={theme.underlineTitle}></View> */}
                </View>
            )
        }
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
        

    _renderItem = (props: {item: Product, index: number}) => {
        if(props.index > -1 && props.index < 4) return null;
        else {
            return(
                <BrowseItem 
                    key={props.item.id}
                    item={props.item} 
                    index={props.index}
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
                    browseOnly={false}
                />
            )
        }
    }
        

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
