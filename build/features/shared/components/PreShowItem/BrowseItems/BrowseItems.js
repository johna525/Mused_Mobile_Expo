var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import React, { Component } from 'react';
import { Animated, TouchableHighlight, Easing, AsyncStorage } from 'react-native';
import theme from '../theme';
import { thumbnailImage } from '../../../imagesUrls';
import * as API from '../../../../../services/api';
// import { isNumeric } from '../../../../../services/operators';
const blankImage = require('../../../../../../assets/images/dots.png');
export default class BrowseItems extends Component {
    constructor() {
        super(...arguments);
        this.state = {
            marginTop: new Animated.Value(0),
            selectedID: 999,
        };
        this.isOnAnimate = false;
        this.triggeredNumber = 0;
        this._renderBrowseList = () => {
            const { arrayImgs, slotNumber, newImgUrl, contextMenuIsVisible } = this.props;
            const _this = this;
            return arrayImgs.map((slotProduct, index) => {
                const opacity = (contextMenuIsVisible && this.state.selectedID === slotProduct.id) ? 0.5 : 1;
                // if(slotProduct.id === -1 && newImgUrl) {
                //     if(this.isOnAnimate) return false;
                //     this.startAnimation(newImgUrl)       
                //     return (
                //         <TouchableHighlight
                //             style={[theme.itemImageContainer, {opacity}]}
                //             onPress={() => this.showContextMenu(slotProduct.id)}
                //             underlayColor={'transparent'}
                //             key={index} >
                //             <Animated.Image
                //                 style={[theme.itemImage, {marginTop: _this.state.marginTop}]}
                //                 source={blankImage}
                //                 resizeMode={'contain'}
                //             />
                //         </TouchableHighlight>
                //     )
                // }
                if (slotProduct.id === slotNumber && newImgUrl) {
                    if (this.isOnAnimate)
                        return false;
                    this.startAnimation(newImgUrl);
                    return (React.createElement(TouchableHighlight, { style: [theme.itemImageContainer, { opacity }], onPress: () => this.showContextMenu(slotProduct.id), underlayColor: 'transparent', key: index },
                        React.createElement(Animated.Image, { style: [theme.itemImage, { marginTop: _this.state.marginTop }], source: { uri: `${thumbnailImage}${slotProduct.id}` }, resizeMode: 'contain' })));
                }
                return (React.createElement(TouchableHighlight, { style: [theme.itemImageContainer, { opacity }], onPress: () => this.showContextMenu(slotProduct.id), underlayColor: 'transparent', key: slotProduct.id },
                    React.createElement(Animated.Image, { style: [theme.itemImage], source: slotProduct.id === -1 ? blankImage : { uri: `${thumbnailImage}${slotProduct.id}` }, resizeMode: 'contain' })));
            });
        };
        this.showContextMenu = (productID) => {
            const { showContextMenu, hideContextMenu, contextMenuIsVisible } = this.props;
            if (contextMenuIsVisible) {
                this.setState({ selectedID: productID });
                hideContextMenu();
            }
            else {
                this.setState({ selectedID: productID });
                showContextMenu(productID);
            }
            API.RegisterEvent("Br-footerPhoto", {
                actionType: 'Click footer photo'
            });
        };
        this.startAnimation = (newImgUrl) => __awaiter(this, void 0, void 0, function* () {
            const { slotNumber, changeArrayImages, setSlotNumber, setNewImgUrl, setSlotMachineEffect } = this.props;
            this.state.marginTop.setValue(0);
            this.isOnAnimate = true;
            Animated.timing(this.state.marginTop, {
                toValue: 300,
                duration: 300,
                easing: Easing.cubic
            }).start();
            setTimeout(() => __awaiter(this, void 0, void 0, function* () {
                this.state.marginTop.setValue(0);
                yield changeArrayImages(slotNumber, newImgUrl);
                yield setSlotNumber(newImgUrl.id);
                yield setNewImgUrl(null);
                setSlotMachineEffect(false);
                this.isOnAnimate = false;
            }), 300);
            if (this.triggeredNumber === 0) {
                this.getHighlightedButtonText();
            }
            try {
                this.triggeredNumber = this.triggeredNumber + 1;
                const TN = JSON.parse(yield AsyncStorage.getItem('trigger')).number;
                console.log(TN);
                if (TN !== null) {
                    if (Number(TN) === 3)
                        this.props.checkAnonUser();
                    this.saveTriggeredNumber(Number(TN) + 1);
                }
                else {
                    this.saveTriggeredNumber(1);
                }
            }
            catch (error) {
                console.log('Error in getting triggered number', error.toString());
                this.saveTriggeredNumber(1);
            }
        });
        this.saveTriggeredNumber = (number) => __awaiter(this, void 0, void 0, function* () {
            try {
                AsyncStorage.setItem('trigger', JSON.stringify({ number }));
            }
            catch (error) {
                console.log('Error in saving triggered number', error.toString());
            }
        });
        this.getHighlightedButtonText = () => __awaiter(this, void 0, void 0, function* () {
            const { setHighlightButtonText } = this.props;
            try {
                const HT = yield AsyncStorage.getItem('highlightText');
                console.log('Getting highlightText...', HT);
                if (HT !== null)
                    setHighlightButtonText(HT);
                else
                    setHighlightButtonText('View');
            }
            catch (error) {
                console.log('Error in getting Highlighed button text', error.toString());
            }
        });
        this._moveSlotLeft = () => this.props.moveSlotLeft();
    }
    componentWillReceiveProps(nextProps) {
        if (nextProps.isMoveProduct) {
            this._moveSlotLeft();
        }
    }
    componentDidMount() {
        this.getHighlightedButtonText();
    }
    render() {
        return this._renderBrowseList();
    }
}
//# sourceMappingURL=BrowseItems.js.map