var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import React, { Component } from 'react';
import { View, StyleSheet, 
// Image,
ScrollView, Text, Dimensions
// BackHandler,
// Animated,
// TouchableOpacity,
// Linking
 } from 'react-native';
import ProductItem from './ProductItem';
import OutfitItem from './OutfitItem';
import Ripple from 'react-native-material-ripple';
import lodash from 'lodash';
import DotIndicator from '../shared/components/Indicators/dot-indicator';
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
});
export default class MyAccount extends Component {
    constructor() {
        super(...arguments);
        this.state = {
            isLiked: false,
            recentOutfit: {},
            allBookmark: false,
            allOutfit: false,
            loading: true
        };
        this.getMyOutFits = () => __awaiter(this, void 0, void 0, function* () {
            const { fetchMyOutfits } = this.props.productStore;
            yield fetchMyOutfits();
        });
    }
    componentDidMount() {
        this.getMyOutFits();
        setTimeout(() => {
            this.setState({ loading: false });
        }, 1500);
    }
    render() {
        const { allBookmark, allOutfit } = this.state;
        const { listOfBookmarks, myOutFit, myOutfitSlots } = this.props;
        const CT = new Date().getTime();
        let temp = lodash.filter(listOfBookmarks, function (o) {
            const BT = new Date(o.timestamp).getTime();
            return Math.abs(CT - BT) < 28 * 86400 * 1000;
        }).reverse();
        let bookmarks = temp;
        // if(!allBookmark) {
        //     bookmarks = temp.slice(0, 4);   
        // } else {
        //     bookmarks = temp;
        // }
        const allOutfitIn4Weeks = lodash.filter(myOutfitSlots, function (o) {
            const BT = new Date(o.timestamp).getTime();
            return (CT - BT) < 28 * 86400 * 1000;
        }).reverse();
        return (React.createElement(View, { style: styles.container },
            React.createElement(ScrollView, { style: styles.container },
                React.createElement(Text, { style: styles.bookmarkText }, "RECENTLY BOOKMARKED"),
                bookmarks.length === 0 &&
                    React.createElement(Text, { style: styles.emptyText }, "You need to bookmark something"),
                React.createElement(View, { style: [styles.productListView, { maxHeight: allBookmark ? null : 540, overflow: 'hidden' }] }, bookmarks.map((bookmark) => {
                    return (React.createElement(ProductItem, { key: bookmark.productId, productId: bookmark.productId, productStore: this.props.productStore, onClickBookmark: this.props.onClickBookmark, onClickProduct: this.props.onClickProduct, position: 'left' }));
                })),
                React.createElement(View, { style: { flex: 1, backgroundColor: 'white', paddingBottom: 30 } },
                    !allBookmark && temp.length > 4 &&
                        React.createElement(View, { style: styles.buttonView },
                            React.createElement(Ripple, { onPress: () => this.setState({ allBookmark: true }), rippleSize: 40, rippleDuration: 300, rippleContainerBorderRadius: 40 },
                                React.createElement(View, { style: styles.button },
                                    React.createElement(Text, { style: styles.buttonText }, "SEE ALL BOOKMARKED")))),
                    React.createElement(Text, { style: styles.bookmarkText }, "OUTFITS RECENTLY CREATED"),
                    (allOutfitIn4Weeks.length === 0) ?
                        React.createElement(Text, { style: styles.emptyText }, "You need to add something")
                        : (allOutfitIn4Weeks.length > 0 && !allOutfit) ?
                            React.createElement(OutfitItem, { slots: allOutfitIn4Weeks[0], onClick: this.props.onClickCollection, border: false })
                            : (myOutFit !== undefined && allOutfit) ?
                                allOutfitIn4Weeks.map((slots, index) => {
                                    return (React.createElement(OutfitItem, { key: index, slots: slots, onClick: this.props.onClickCollection, border: true }));
                                })
                                : null,
                    !allOutfit && allOutfitIn4Weeks.length > 0 &&
                        React.createElement(View, { style: styles.buttonView },
                            React.createElement(Ripple, { onPress: () => this.setState({ allOutfit: true }), rippleSize: 40, rippleDuration: 300, rippleContainerBorderRadius: 40 },
                                React.createElement(View, { style: styles.button },
                                    React.createElement(Text, { style: styles.buttonText }, "SEE ALL OUTFITS")))))),
            this.state.loading &&
                React.createElement(View, { style: styles.loadingView },
                    React.createElement(DotIndicator, { size: 6, count: 3 }))));
    }
}
//# sourceMappingURL=MyAccount.js.map