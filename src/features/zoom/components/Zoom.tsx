import React, { Component } from 'react';
import {
    View,
    Image,
    ScrollView,
    Text,
    BackHandler,
    Animated,
    TouchableOpacity,
    Linking,
    Dimensions
} from 'react-native';
import Swiper from 'react-native-swiper';
import Ripple from 'react-native-material-ripple';
import AutoHeightImage from 'react-native-auto-height-image';
import theme from "../theme";
import * as API from '../../../services/api';
import { zoomFaceImage, zoomAdditionalImage, largiImage } from '../../shared';

const {width} = Dimensions.get('window');
const ImageHeight = (width - 20) * 900 / 720;
const arrowIcon = require('../../../../assets/images/arrow-icon.png');
const farfetchIcon = require('../../../../assets/images/farfetch.png');
const netIcon = require('../../../../assets/images/net-a-porter.jpg');
const borderImage = require('../../../../assets/images/dotted-border.png');

type Props = {
    navigation: any;
    prevRoute: string;
    setPrevCurrentRoutes: (currentRoute: string, prevRoute: string) => void;
    createNewStyle: (id: ProductImage, category: string) => void;
    goBack: () => void;
    createBookmark: (productId: number) => void;
    deleteBookmarkById: (_id: any) => void;
    listOfBookmarks: Bookmark[];
}
type State = {
    marginTop: any,
    isLiked: boolean,
    faceImageWidth: number,
    addImageWidth_1: number,
    addImageWidth_2: number,
    addImageWidth_3: number,
    largiImageWidth: number
};
export default class Zoom extends Component<Props, State> {
    product: Product;

    state: State = {
        marginTop: new Animated.Value(0),
        isLiked: false,
        faceImageWidth: width - 140,
        addImageWidth_1: width - 140,
        addImageWidth_2: width - 140,
        addImageWidth_3: width - 140,
        largiImageWidth: width - 140
    }

    componentWillMount() {
        const { navigation } = this.props;
        this.product = navigation.getParam('product', {});
        console.log(this.product)
    }

    componentDidMount() {
        BackHandler.addEventListener('hardwareBackPress', this._goBack);
        const { listOfBookmarks } = this.props;
        const { id } = this.product;
        const bookmark: Bookmark = listOfBookmarks.find(( bookmark: Bookmark) => bookmark.productId === id);
        Boolean(bookmark) && this.setState({isLiked: true })
        this.resizeImages();
    }

    componentWillUnmount() {
        BackHandler.removeEventListener('hardwareBackPress', this._goBack);
    }

    onScroll(nativeEvent: any) {
        const { contentOffset } = nativeEvent;    
        // const maxScrollHeight = contentSize.height - layoutMeasurement.height;
        // const currentRestHeight = layoutMeasurement.height + contentOffset.y - contentSize.height;
        // console.log(maxScrollHeight + ', ' + currentRestHeight);
        this.state.marginTop.setValue(0 - contentOffset.y * 2 / 3);
    }

    _onChangeSwiperIndex = (index: number) => {
        API.RegisterEvent("Zm-swipe", {
            actionType: 'Swipe photo',
            index
        })
    }

    onClickLink = () => {
        const { clickUrl } = this.product;
        API.RegisterEvent("Zm-buy", {
            actionType: "Click 'FARFETCH' icon",
        })
        Linking.openURL(clickUrl);
    }

    resizeImages = () => {
        const { id } = this.product;
        Image.getSize(`${zoomFaceImage}${id}.jpg`, (width: number, height: number) => {
            this.setState({faceImageWidth: width * ImageHeight / height});
        },
        (error: any) => {
            console.log(error)
        });
        Image.getSize(`${zoomAdditionalImage}${id}_1.jpg`, (width: number, height: number) => {
            this.setState({addImageWidth_1: width * ImageHeight / height});
        },
        (error: any) => {
            console.log(error)
        });
        Image.getSize(`${zoomAdditionalImage}${id}_2.jpg`, (width: number, height: number) => {
            this.setState({addImageWidth_2: width * ImageHeight / height});
        },
        (error: any) => {
            console.log(error)
        });
        Image.getSize(`${zoomAdditionalImage}${id}_3.jpg`, (width: number, height: number) => {
            this.setState({addImageWidth_3: width * ImageHeight / height});
        },
        (error: any) => {
            console.log(error)
        });
        Image.getSize(`${largiImage}${id}.jpg`, (width: number, height: number) => {
            this.setState({largiImageWidth: width * ImageHeight / height});
        },
        (error: any) => {
            console.log(error)
        });
    }

    render() {
        const { id, description, priceLabel, brand, unbrandedName, category, retailerName } = this.product;
        // const { faceImageWidth, addImageWidth_1, addImageWidth_2, addImageWidth_3, largiImageWidth } = this.state;
        console.log(category)
        return (
            <View style={theme.container}>
                <ScrollView 
                    style={{flex: 1}}
                    onScroll={({ nativeEvent }) => this.onScroll(nativeEvent)}
                    scrollEventThrottle={100}
                > 
                    {
                        category === 'scarves' ?
                        <Swiper
                            style={theme.wrapper} 
                            dotStyle={{width: 6, height: 6}}
                            activeDotStyle={{width: 6, height: 6}}
                            dotColor='#CACACA'
                            paginationStyle={{marginBottom: -15}}
                            onIndexChanged={this._onChangeSwiperIndex}
                            activeDotColor='#949494'
                            showsPagination={false}
                        >                
                            <View style={theme.wrapper}>
                                <View style={theme.wrapperOutLineView} />
                                <View style={theme.slideImageContainer}>
                                    <Image 
                                        style={theme.slideImage}
                                        source={{uri: `${zoomFaceImage}${id}.jpg`}} 
                                    />       
                                </View>
                            </View>                    
                            <View style={theme.wrapper}>
                                <View style={theme.wrapperOutLineView} />
                                <View style={theme.slideImageContainer}>
                                    <Image 
                                        style={theme.slideImage}
                                        source={{uri: `${zoomAdditionalImage}${id}_1.jpg`}} 
                                    /> 
                                </View>
                            </View>
                            <View style={theme.wrapper}>
                                <View style={theme.wrapperOutLineView} />
                                <View style={theme.slideImageContainer}>
                                    <AutoHeightImage 
                                        width={width / 2}
                                        source={{uri: `${largiImage}${id}.jpg`}} 
                                    /> 
                                </View>
                            </View>
                        </Swiper>
                        :(category === 'jewelry' || category === 'belts' || category === 'gloves' || category === 'hats' || category === 'shoes' || category === 'womens-shoes') ?
                        <Swiper
                            style={theme.wrapper} 
                            dotStyle={{width: 6, height: 6}}
                            activeDotStyle={{width: 6, height: 6}}
                            dotColor='#CACACA'
                            paginationStyle={{marginBottom: -15}}
                            onIndexChanged={this._onChangeSwiperIndex}
                            activeDotColor='#949494'
                            showsPagination={false}
                        >                
                            <View style={theme.wrapper}>
                                <View style={theme.wrapperOutLineView} />
                                <View style={theme.slideImageContainer}>
                                    <Image 
                                        style={theme.slideImage}
                                        source={{uri: `${zoomAdditionalImage}${id}_1.jpg`}} 
                                    /> 
                                </View>
                            </View>
                            <View style={theme.wrapper}>
                                <View style={theme.wrapperOutLineView} />
                                <View style={theme.slideImageContainer}>
                                    <Image 
                                        style={theme.slideImage}
                                        source={{uri: `${zoomAdditionalImage}${id}_2.jpg`}} 
                                    /> 
                                </View>
                            </View>
                            <View style={theme.wrapper}>
                                <View style={theme.wrapperOutLineView} />
                                <View style={theme.slideImageContainer}>
                                    <Image 
                                        style={theme.slideImage}
                                        source={{uri: `${zoomAdditionalImage}${id}_3.jpg`}} 
                                    /> 
                                </View>
                            </View>
                        </Swiper>
                        :<Swiper
                            style={theme.wrapper} 
                            dotStyle={{width: 6, height: 6}}
                            activeDotStyle={{width: 6, height: 6}}
                            dotColor='#CACACA'
                            paginationStyle={{marginBottom: -15}}
                            onIndexChanged={this._onChangeSwiperIndex}
                            activeDotColor='#949494'
                            showsPagination={false}
                        >
                            <View style={theme.wrapper}>
                                <View style={theme.wrapperOutLineView} />
                                <View style={theme.slideImageContainer}>
                                    <Image 
                                        style={theme.slideImage}
                                        source={{uri: `${zoomFaceImage}${id}.jpg`}} 
                                    /> 
                                </View>
                            </View>                    
                            <View style={theme.wrapper}>
                                <View style={theme.wrapperOutLineView} />
                                <View style={theme.slideImageContainer}>
                                    <Image 
                                        style={theme.slideImage}
                                        source={{uri: `${zoomAdditionalImage}${id}_1.jpg`}} 
                                    /> 
                                </View>
                            </View>
                            <View style={theme.wrapper}>
                                <View style={theme.wrapperOutLineView} />
                                <View style={theme.slideImageContainer}>
                                    <Image 
                                        style={theme.slideImage}
                                        source={{uri: `${zoomAdditionalImage}${id}_2.jpg`}} 
                                    /> 
                                </View>
                            </View>
                            <View style={theme.wrapper}>
                                <View style={theme.wrapperOutLineView} />
                                <View style={theme.slideImageContainer}>
                                    <Image 
                                        style={theme.slideImage}
                                        source={{uri: `${zoomAdditionalImage}${id}_3.jpg`}} 
                                    /> 
                                </View>
                            </View>
                            <View style={theme.wrapper}>
                                <View style={theme.wrapperOutLineView} />
                                <View style={theme.slideImageContainer}>
                                    <AutoHeightImage 
                                        width={width / 2}
                                        source={{uri: `${largiImage}${id}.jpg`}} 
                                    /> 
                                </View>
                            </View>
                        </Swiper>
                    }
                    <Ripple 
                        style={theme.backButtonView}
                        rippleContainerBorderRadius={15 / 2} 
                        rippleSize={20} 
                        rippleCentered={true} 
                        onPress={this._goBack}>
                        <Image
                            style={{width: 13, height: 13}}
                            source={arrowIcon}
                        />
                    </Ripple>
                    {/* <Ripple
                        style={theme.likeButtonView}
                        rippleContainerBorderRadius={15 / 2} 
                        rippleSize={20} 
                        rippleCentered={true} 
                        onPress={this._onClickBookMark}>
                        <Image
                            style={{width: 20, height: 20}}
                            source={this.state.isLiked ? starLikeIcon : starIcon}
                        />
                    </Ripple>                  */}
                    <Animated.View style={[theme.infoView, {marginTop: this.state.marginTop}]}>
                        <View style={theme.brandView}>
                            <Text style={theme.brandText}>{brand.toUpperCase()}</Text>
                            <Text style={theme.priceText}>{priceLabel}</Text>                            
                        </View>
                        <View style={theme.brandView}>
                            <Text style={theme.unbrandText}>{unbrandedName}</Text>
                            <TouchableOpacity onPress={this._onClickBookMark}>
                                <Text style={theme.saleText}>Sale alert{this.state.isLiked ? ' on' : ''}</Text>
                            </TouchableOpacity>
                        </View>
                    </Animated.View>
                    {/* <Image source={dottedLine} style={theme.dottedLine} /> */}              
                    <View style={theme.descContainer}>
                        <Text style={theme.descText}>{description}</Text>
                    </View>
                    <View style={theme.linkView}>
                        <Image source={borderImage} style={theme.borderImage} />
                        <Text style={theme.descText}>Buy from</Text>
                        <TouchableOpacity onPress={this.onClickLink}>
                            <Image source={retailerName === "NET-A-PORTER" ? netIcon : farfetchIcon} style={theme.linkIcon} />
                        </TouchableOpacity>
                        <Text style={theme.descText}>Tap to visit for details</Text>
                    </View>
                </ScrollView>
                <View style={theme.markView}></View>
                <Ripple
                    style={theme.buttonsContainer}
                    rippleSize={240} 
                    rippleColor='#FFFFFF'
                    rippleCentered={true} 
                    rippleDuration={1000}
                    onPress={() => this.createNewStyle(this.product)}
                >
                    {/* <Image source={buttonLogo} style={theme.buttonLogo} /> */}
                    <Text style={theme.buttonText}>STYLE IT</Text>   
                </Ripple> 
                {/* <Button style={theme.rightButton} themeType='light' text='ADD TO CART'/> */}
            </View>
        )
    }

    createNewStyle = (product: Product) => {
        const newProduct: ProductImage = {
            id: product.id,
            img: {uri: product.image}
        }
        API.RegisterEvent("Zm-style", {
            actionType: "Click 'Style' button",
            productID: product.id,
        })
        this.props.createNewStyle(newProduct, product.category);
    }

    _goBack = () => {
        const { 
            navigation,
            goBack
        } = this.props;
        goBack()
        navigation.goBack();
        return true;
    }

    _onClickBookMark = () => {
        const { createBookmark, deleteBookmarkById } = this.props;
        const { id } = this.product;
        const { isLiked } = this.state;
        API.RegisterEvent("Zm-bookmark", {
            actionType: 'Click bookmark button',
            productID: id
        })
        if (isLiked) {
            deleteBookmarkById(id);
        } else {
            createBookmark(id);
        }
        this.setState({isLiked: !isLiked}); 
    }
}
