import React, { Component } from 'react';
import {
  View,
  FlatList,
  StatusBar,
  Animated,
  Image,
  Text,
  TouchableOpacity
} from 'react-native';
import _ from 'lodash';

import  NewsfeedItem from './NewsfeedItem';
import theme from '../theme';
import RetailerPosts from './RetailerPost';
// import NewProductList from './NewProductList';
import DotIndicator from '../../shared/components/Indicators/dot-indicator'

type State = {
    fadeIn: any,
    numberOfcontent: number,
    token: string,
    notification: any,
    slots: any[],
    instagram_inspirationalImage: string,
    loading: boolean
};

type Props = {
    listOfPosts: Post[];
    listOfRetailerPosts: RetailerPost[];
    listOfAlternatives: Product[];
    listOfRecentNewProducts: Product[];
    goToCollection: (params: any) => void;
    getPosts: () => void;
    getBookmarksByUserId: () => void;
    getCollection: (slots: Slot[]) => void;
    goToBrowseDirectly: (productIds: any) => void;
    goToZoomDirectly: (productId: number) => void;
    goToInstagramSlide: () => void;
    onClickRetailerPost: (post: RetailerPost) => void;
    onClickNewProduct: (product: Product) => void;
    onViewAllNewProduct: () => void;
    onScroll: (e: any) => void;
}
export default class NewsfeedList extends Component<Props, State> {

    state: State = {
        fadeIn: new Animated.Value(1),
        numberOfcontent: 1,
        token: null,
        notification: null,
        slots: [],
        instagram_inspirationalImage: '',
        loading: true
    }

    componentDidMount() {  
        this.props.getPosts();
        this.props.getBookmarksByUserId();
        setTimeout(() => {
            this.setState({loading: false})
        }, 500)   
    }    

    componentWillReceiveProps(props: any) {
        const { listOfPosts } = props;
        if(listOfPosts === undefined || this.state.instagram_inspirationalImage.length > 0 || listOfPosts.length === 0) return null;
        let imageUrl: string = '';      
        _.reverse(_.sortBy(listOfPosts, "date")).map((post: Post) => { 
            console.log(post.pin);         
          if(post.postType === 'instagram') {  
            imageUrl = post.inspirationalImage;                 
          }
        })
        this.setState({instagram_inspirationalImage: imageUrl});
        return true;
    }

    //sort newsfeed by pin field
    /*
        if 0 please treat as normal, no speical treatment needed
        if 1 please place at the top of newfeed
        if 2 please place 2nd on newsfeed
        if 3 please place 3rd on newsfeed
    */
    filterAndSortData = (data: any) => {
        let pinPosts: any = [];
        let unPinPosts: any = [];
        _.reverse(_.sortBy(data, "date")).map((post: Post) => {
            if(post.pin === 0) unPinPosts.push(post);
            else if(post.pin > 0) pinPosts.push(post);
        })
        const res = pinPosts.concat(unPinPosts);
        return res
    }
    
    render() {
        return (
            <Animated.View style={[theme.container, {opacity: this.state.fadeIn}]}>
                <StatusBar
                    backgroundColor="white"
                    barStyle="dark-content"
                />
                {(this.props.listOfPosts && this.props.listOfPosts.length) && <FlatList
                    data={this.filterAndSortData(this.props.listOfPosts)}                    
                    keyExtractor={ (item) => `${item._id}`}
                    scrollEventThrottle={1000}
                    // ListHeaderComponent={this._renderHeader}
                    ListFooterComponent={this._renderFooter.bind(this)}
                    renderItem={this._renderItem}
                    onScroll={({ nativeEvent }) => this.props.onScroll(nativeEvent)}
                />}
                {this.state.loading && 
                    <View style={theme.loadingView}>
                        <DotIndicator size={6} count={3} />
                    </View>
                }
            </Animated.View>
        )
    }

    _renderItem = (props: {item: Post}) => 
        <NewsfeedItem  
            item={props.item}
            goToCollection={this._goToCollection}
            goToBrowseDirectly={this.props.goToBrowseDirectly}
            goToZoomDirectly={this.props.goToZoomDirectly}
            goToInstagramSlide={this.props.goToInstagramSlide}
        />

    _renderHeader = () => {
        const { instagram_inspirationalImage } = this.state;
        // if(instagram_inspirationalImage.length === 0) return null;
        return (
            <View>
                <View style={theme.titleView}>
                    <View style={theme.lineView}></View>
                    <Text style={theme.titleText}>Today's Instagram Looks</Text>
                    <View style={theme.lineView}></View>
                </View>
                {
                    instagram_inspirationalImage.length === 0 ? 
                    <View style={theme.instagramImage} />
                    :
                    <TouchableOpacity 
                        onPress={this.props.goToInstagramSlide}
                    >
                        <Image source={{uri: instagram_inspirationalImage}} style={theme.instagramImage} />
                    </TouchableOpacity> 
                }                               
                <View style={theme.separator}></View>
            </View>
        )
    }        

    _renderFooter = () => {
        const {listOfRetailerPosts} = this.props;
        if(listOfRetailerPosts){
            return(
                <View>
                    <RetailerPosts
                        posts={listOfRetailerPosts}
                        onClickPost={this.props.onClickRetailerPost}
                    />
                    <View style={theme.separator}></View>
                    {/* <NewProductList
                        products={listOfRecentNewProducts}
                        onClickProduct={this.props.onClickNewProduct}
                        onClickViewAll={this.props.onViewAllNewProduct}
                    /> */}
                </View>
            )
        } else {
            return null
        }
    }    

    _goToCollection = (param: any) => {
        const { goToCollection, getCollection } = this.props;
        this.state.fadeIn.setValue(1)
        getCollection(param.productIds)
        setTimeout(() => {
            Animated.timing(           
                this.state.fadeIn,            
                {
                  toValue: 0,                   
                  duration: 500, 
                  useNativeDriver: true             
                }
             ).start(() => {            
                goToCollection(param)
                setTimeout(() => {
                    this.state.fadeIn.setValue(1)
                }, 300)            
            });  
        }, 300)
    }

    _renderSeparator = () =>
        <View style={theme.separator}></View>
 }