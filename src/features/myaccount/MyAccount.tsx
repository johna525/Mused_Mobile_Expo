import React, { Component } from 'react';
import {
    View,
    StyleSheet,
    // Image,
    ScrollView,
    Text,
    Dimensions
    // BackHandler,
    // Animated,
    // TouchableOpacity,
    // Linking
} from 'react-native';
import ProductItem from './ProductItem';
import OutfitItem from './OutfitItem';
import Ripple from 'react-native-material-ripple';
import lodash from 'lodash';
import DotIndicator from '../shared/components/Indicators/dot-indicator'

const { width } = Dimensions.get('window');

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'white'
    },
    bookmarkText: {
        marginTop: 30,
        marginBottom: 20,
        fontSize: 18,
        letterSpacing: 2,
        fontFamily: 'RalewayBold',
        color: '#333',
        textAlign: 'center'
    },
    productListView: {
        flexDirection: 'row',
        flexWrap: 'wrap'
    },
    buttonView: {
        padding: 20,
        paddingTop: 0,
        justifyContent: 'center',
        alignItems: 'center'
    },
    button: {
        width: 240,
        height: 45,
        justifyContent: 'center',
        alignItems: 'center',
        borderWidth: 1,
        borderColor: 'black'
    },
    buttonText: {
        fontSize: 12,
        fontFamily: 'QuickSandRegular',
        color: 'black',
        letterSpacing: 2
    },
    outfitView: {
        paddingVertical: 20,
        justifyContent: 'center',
        alignItems: 'center',
        flexDirection: 'row'
    },
    outfitImage: {
        width: width / 6,
        height: 100,
        marginHorizontal: 5
    },
    emptyText: {
        textAlign: 'center',
        color: 'black',
        fontSize: 11,
        fontFamily: 'QuickSandRegular'
    },
    loadingView: {
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'white'
    }
})

type Props = {
    navigation: any;
    onClickProduct: (product: Product) => void;
    onClickCollection: (param: any) => void;
    listOfPosts: Post[];
    listOfBookmarks: Bookmark[];
    getDetailByProductId: (productId: number) => void;
    onClickBookmark: (productId: number) => void;
    productStore: any;
    myOutFit: Product[];
    myOutfitSlots: any;
}
type State = {
    isLiked: boolean,
    recentOutfit: any,
    allBookmark: boolean,
    allOutfit: boolean,
    loading: boolean
};
export default class MyAccount extends Component<Props, State> {
    product: Product;

    state: State = {
        isLiked: false,
        recentOutfit: {},
        allBookmark: false,
        allOutfit: false,
        loading: true
    }

    componentDidMount() {
        this.getMyOutFits();  
        setTimeout(() => {
            this.setState({loading: false})
        }, 1500)      
    }

    getMyOutFits = async () => {
        const { fetchMyOutfits } = this.props.productStore;
        await fetchMyOutfits();
    }

    render() {
        const { allBookmark, allOutfit } = this.state;
        const { listOfBookmarks, myOutFit, myOutfitSlots } = this.props;
        const CT = new Date().getTime();
        let temp = lodash.filter(listOfBookmarks, function(o: any) {
            const BT = new Date(o.timestamp).getTime();
            return Math.abs(CT - BT) < 28 * 86400 * 1000;
        }).reverse();    
        let bookmarks = temp;
        // if(!allBookmark) {
        //     bookmarks = temp.slice(0, 4);   
        // } else {
        //     bookmarks = temp;
        // }
        const allOutfitIn4Weeks = lodash.filter(myOutfitSlots, function(o: any) {
            const BT = new Date(o.timestamp).getTime();
            return (CT - BT) < 28 * 86400 * 1000;
        }).reverse();
        return (
            <View style={styles.container}>
                <ScrollView style={styles.container}>
                    <Text style={styles.bookmarkText}>RECENTLY BOOKMARKED</Text>
                    {
                        bookmarks.length === 0 &&
                        <Text style={styles.emptyText}>You need to bookmark something</Text>
                    }
                    <View style={[styles.productListView, {maxHeight: allBookmark ? null : 540, overflow: 'hidden'}]}>
                        {
                            bookmarks.map((bookmark: any) => {
                                return(
                                    <ProductItem
                                        key={bookmark.productId}
                                        productId={bookmark.productId}
                                        productStore={this.props.productStore}
                                        onClickBookmark={this.props.onClickBookmark}
                                        onClickProduct={this.props.onClickProduct}
                                        position={'left'}
                                    />
                                )
                            })
                        }
                    </View>
                    <View style={{flex: 1, backgroundColor: 'white', paddingBottom: 30}}>
                    {
                        !allBookmark && temp.length > 4 &&
                        <View style={styles.buttonView}>
                            <Ripple
                                onPress={() => this.setState({allBookmark: true})}
                                rippleSize={40}
                                rippleDuration={300} 
                                rippleContainerBorderRadius={40}>
                                <View style={styles.button}>
                                    <Text style={styles.buttonText}>SEE ALL BOOKMARKED</Text>
                                </View>
                            </Ripple>
                        </View>
                    }
                    <Text style={styles.bookmarkText}>OUTFITS RECENTLY CREATED</Text>           
                    {
                        (allOutfitIn4Weeks.length === 0) ?
                        <Text style={styles.emptyText}>You need to add something</Text>
                        :(allOutfitIn4Weeks.length > 0 && !allOutfit) ?
                        <OutfitItem
                            slots={allOutfitIn4Weeks[0]}
                            onClick={this.props.onClickCollection}
                            border={false}
                        />
                        :(myOutFit !== undefined && allOutfit) ?
                        allOutfitIn4Weeks.map((slots: any, index: any) => {
                            return(
                                <OutfitItem
                                    key={index}
                                    slots={slots}
                                    onClick={this.props.onClickCollection}
                                    border
                                />
                            )
                        })
                        :null
                    }
                    {
                        !allOutfit && allOutfitIn4Weeks.length > 0 &&
                        <View style={styles.buttonView}>
                            <Ripple
                                onPress={() => this.setState({allOutfit: true})}
                                rippleSize={40}
                                rippleDuration={300} 
                                rippleContainerBorderRadius={40}>
                                <View style={styles.button}>
                                    <Text style={styles.buttonText}>SEE ALL OUTFITS</Text>
                                </View>
                            </Ripple>
                        </View>
                    }     
                    </View>           
                </ScrollView>
                {
                    this.state.loading && 
                    <View style={styles.loadingView}>
                        <DotIndicator size={6} count={3} />
                    </View>
                }
            </View>
        )
    }

    
}
