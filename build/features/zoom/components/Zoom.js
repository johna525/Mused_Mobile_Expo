import React, { Component } from 'react';
import { View, Image, ScrollView, Text, BackHandler, Animated, TouchableOpacity, Linking, Dimensions } from 'react-native';
import Swiper from 'react-native-swiper';
import Ripple from 'react-native-material-ripple';
import AutoHeightImage from 'react-native-auto-height-image';
import theme from "../theme";
import * as API from '../../../services/api';
import { zoomFaceImage, zoomAdditionalImage, largiImage } from '../../shared';
const { width } = Dimensions.get('window');
const ImageHeight = (width - 20) * 900 / 720;
const arrowIcon = require('../../../../assets/images/arrow-icon.png');
const farfetchIcon = require('../../../../assets/images/farfetch.png');
const netIcon = require('../../../../assets/images/net-a-porter.jpg');
const borderImage = require('../../../../assets/images/dotted-border.png');
export default class Zoom extends Component {
    constructor() {
        super(...arguments);
        this.state = {
            marginTop: new Animated.Value(0),
            isLiked: false,
            faceImageWidth: width - 140,
            addImageWidth_1: width - 140,
            addImageWidth_2: width - 140,
            addImageWidth_3: width - 140,
            largiImageWidth: width - 140
        };
        this._onChangeSwiperIndex = (index) => {
            API.RegisterEvent("Zm-swipe", {
                actionType: 'Swipe photo',
                index
            });
        };
        this.onClickLink = () => {
            const { clickUrl } = this.product;
            API.RegisterEvent("Zm-buy", {
                actionType: "Click 'FARFETCH' icon",
            });
            Linking.openURL(clickUrl);
        };
        this.resizeImages = () => {
            const { id } = this.product;
            Image.getSize(`${zoomFaceImage}${id}.jpg`, (width, height) => {
                this.setState({ faceImageWidth: width * ImageHeight / height });
            }, (error) => {
                console.log(error);
            });
            Image.getSize(`${zoomAdditionalImage}${id}_1.jpg`, (width, height) => {
                this.setState({ addImageWidth_1: width * ImageHeight / height });
            }, (error) => {
                console.log(error);
            });
            Image.getSize(`${zoomAdditionalImage}${id}_2.jpg`, (width, height) => {
                this.setState({ addImageWidth_2: width * ImageHeight / height });
            }, (error) => {
                console.log(error);
            });
            Image.getSize(`${zoomAdditionalImage}${id}_3.jpg`, (width, height) => {
                this.setState({ addImageWidth_3: width * ImageHeight / height });
            }, (error) => {
                console.log(error);
            });
            Image.getSize(`${largiImage}${id}.jpg`, (width, height) => {
                this.setState({ largiImageWidth: width * ImageHeight / height });
            }, (error) => {
                console.log(error);
            });
        };
        this.createNewStyle = (product) => {
            const newProduct = {
                id: product.id,
                img: { uri: product.image }
            };
            API.RegisterEvent("Zm-style", {
                actionType: "Click 'Style' button",
                productID: product.id,
            });
            this.props.createNewStyle(newProduct, product.category);
        };
        this._goBack = () => {
            const { navigation, goBack } = this.props;
            goBack();
            navigation.goBack();
            return true;
        };
        this._onClickBookMark = () => {
            const { createBookmark, deleteBookmarkById } = this.props;
            const { id } = this.product;
            const { isLiked } = this.state;
            API.RegisterEvent("Zm-bookmark", {
                actionType: 'Click bookmark button',
                productID: id
            });
            if (isLiked) {
                deleteBookmarkById(id);
            }
            else {
                createBookmark(id);
            }
            this.setState({ isLiked: !isLiked });
        };
    }
    componentWillMount() {
        const { navigation } = this.props;
        this.product = navigation.getParam('product', {});
        console.log(this.product);
    }
    componentDidMount() {
        BackHandler.addEventListener('hardwareBackPress', this._goBack);
        const { listOfBookmarks } = this.props;
        const { id } = this.product;
        const bookmark = listOfBookmarks.find((bookmark) => bookmark.productId === id);
        Boolean(bookmark) && this.setState({ isLiked: true });
        this.resizeImages();
    }
    componentWillUnmount() {
        BackHandler.removeEventListener('hardwareBackPress', this._goBack);
    }
    onScroll(nativeEvent) {
        const { contentOffset } = nativeEvent;
        // const maxScrollHeight = contentSize.height - layoutMeasurement.height;
        // const currentRestHeight = layoutMeasurement.height + contentOffset.y - contentSize.height;
        // console.log(maxScrollHeight + ', ' + currentRestHeight);
        this.state.marginTop.setValue(0 - contentOffset.y * 2 / 3);
    }
    render() {
        const { id, description, priceLabel, brand, unbrandedName, category, retailerName } = this.product;
        // const { faceImageWidth, addImageWidth_1, addImageWidth_2, addImageWidth_3, largiImageWidth } = this.state;
        console.log(category);
        return (React.createElement(View, { style: theme.container },
            React.createElement(ScrollView, { style: { flex: 1 }, onScroll: ({ nativeEvent }) => this.onScroll(nativeEvent), scrollEventThrottle: 100 },
                category === 'scarves' ?
                    React.createElement(Swiper, { style: theme.wrapper, dotStyle: { width: 6, height: 6 }, activeDotStyle: { width: 6, height: 6 }, dotColor: '#CACACA', paginationStyle: { marginBottom: -15 }, onIndexChanged: this._onChangeSwiperIndex, activeDotColor: '#949494', showsPagination: false },
                        React.createElement(View, { style: theme.wrapper },
                            React.createElement(View, { style: theme.wrapperOutLineView }),
                            React.createElement(View, { style: theme.slideImageContainer },
                                React.createElement(Image, { style: theme.slideImage, source: { uri: `${zoomFaceImage}${id}.jpg` } }))),
                        React.createElement(View, { style: theme.wrapper },
                            React.createElement(View, { style: theme.wrapperOutLineView }),
                            React.createElement(View, { style: theme.slideImageContainer },
                                React.createElement(Image, { style: theme.slideImage, source: { uri: `${zoomAdditionalImage}${id}_1.jpg` } }))),
                        React.createElement(View, { style: theme.wrapper },
                            React.createElement(View, { style: theme.wrapperOutLineView }),
                            React.createElement(View, { style: theme.slideImageContainer },
                                React.createElement(AutoHeightImage, { width: width / 2, source: { uri: `${largiImage}${id}.jpg` } }))))
                    : (category === 'jewelry' || category === 'belts' || category === 'gloves' || category === 'hats' || category === 'shoes' || category === 'womens-shoes') ?
                        React.createElement(Swiper, { style: theme.wrapper, dotStyle: { width: 6, height: 6 }, activeDotStyle: { width: 6, height: 6 }, dotColor: '#CACACA', paginationStyle: { marginBottom: -15 }, onIndexChanged: this._onChangeSwiperIndex, activeDotColor: '#949494', showsPagination: false },
                            React.createElement(View, { style: theme.wrapper },
                                React.createElement(View, { style: theme.wrapperOutLineView }),
                                React.createElement(View, { style: theme.slideImageContainer },
                                    React.createElement(Image, { style: theme.slideImage, source: { uri: `${zoomAdditionalImage}${id}_1.jpg` } }))),
                            React.createElement(View, { style: theme.wrapper },
                                React.createElement(View, { style: theme.wrapperOutLineView }),
                                React.createElement(View, { style: theme.slideImageContainer },
                                    React.createElement(Image, { style: theme.slideImage, source: { uri: `${zoomAdditionalImage}${id}_2.jpg` } }))),
                            React.createElement(View, { style: theme.wrapper },
                                React.createElement(View, { style: theme.wrapperOutLineView }),
                                React.createElement(View, { style: theme.slideImageContainer },
                                    React.createElement(Image, { style: theme.slideImage, source: { uri: `${zoomAdditionalImage}${id}_3.jpg` } }))))
                        : React.createElement(Swiper, { style: theme.wrapper, dotStyle: { width: 6, height: 6 }, activeDotStyle: { width: 6, height: 6 }, dotColor: '#CACACA', paginationStyle: { marginBottom: -15 }, onIndexChanged: this._onChangeSwiperIndex, activeDotColor: '#949494', showsPagination: false },
                            React.createElement(View, { style: theme.wrapper },
                                React.createElement(View, { style: theme.wrapperOutLineView }),
                                React.createElement(View, { style: theme.slideImageContainer },
                                    React.createElement(Image, { style: theme.slideImage, source: { uri: `${zoomFaceImage}${id}.jpg` } }))),
                            React.createElement(View, { style: theme.wrapper },
                                React.createElement(View, { style: theme.wrapperOutLineView }),
                                React.createElement(View, { style: theme.slideImageContainer },
                                    React.createElement(Image, { style: theme.slideImage, source: { uri: `${zoomAdditionalImage}${id}_1.jpg` } }))),
                            React.createElement(View, { style: theme.wrapper },
                                React.createElement(View, { style: theme.wrapperOutLineView }),
                                React.createElement(View, { style: theme.slideImageContainer },
                                    React.createElement(Image, { style: theme.slideImage, source: { uri: `${zoomAdditionalImage}${id}_2.jpg` } }))),
                            React.createElement(View, { style: theme.wrapper },
                                React.createElement(View, { style: theme.wrapperOutLineView }),
                                React.createElement(View, { style: theme.slideImageContainer },
                                    React.createElement(Image, { style: theme.slideImage, source: { uri: `${zoomAdditionalImage}${id}_3.jpg` } }))),
                            React.createElement(View, { style: theme.wrapper },
                                React.createElement(View, { style: theme.wrapperOutLineView }),
                                React.createElement(View, { style: theme.slideImageContainer },
                                    React.createElement(AutoHeightImage, { width: width / 2, source: { uri: `${largiImage}${id}.jpg` } })))),
                React.createElement(Ripple, { style: theme.backButtonView, rippleContainerBorderRadius: 15 / 2, rippleSize: 20, rippleCentered: true, onPress: this._goBack },
                    React.createElement(Image, { style: { width: 13, height: 13 }, source: arrowIcon })),
                React.createElement(Animated.View, { style: [theme.infoView, { marginTop: this.state.marginTop }] },
                    React.createElement(View, { style: theme.brandView },
                        React.createElement(Text, { style: theme.brandText }, brand.toUpperCase()),
                        React.createElement(Text, { style: theme.priceText }, priceLabel)),
                    React.createElement(View, { style: theme.brandView },
                        React.createElement(Text, { style: theme.unbrandText }, unbrandedName),
                        React.createElement(TouchableOpacity, { onPress: this._onClickBookMark },
                            React.createElement(Text, { style: theme.saleText },
                                "Sale alert",
                                this.state.isLiked ? ' on' : '')))),
                React.createElement(View, { style: theme.descContainer },
                    React.createElement(Text, { style: theme.descText }, description)),
                React.createElement(View, { style: theme.linkView },
                    React.createElement(Image, { source: borderImage, style: theme.borderImage }),
                    React.createElement(Text, { style: theme.descText }, "Buy from"),
                    React.createElement(TouchableOpacity, { onPress: this.onClickLink },
                        React.createElement(Image, { source: retailerName === "NET-A-PORTER" ? netIcon : farfetchIcon, style: theme.linkIcon })),
                    React.createElement(Text, { style: theme.descText }, "Tap to visit for details"))),
            React.createElement(View, { style: theme.markView }),
            React.createElement(Ripple, { style: theme.buttonsContainer, rippleSize: 240, rippleColor: '#FFFFFF', rippleCentered: true, rippleDuration: 1000, onPress: () => this.createNewStyle(this.product) },
                React.createElement(Text, { style: theme.buttonText }, "STYLE IT"))));
    }
}
//# sourceMappingURL=Zoom.js.map