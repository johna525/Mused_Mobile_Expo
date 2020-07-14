import React, { Component } from 'react';
import { View, Image, Text, StyleSheet, TouchableWithoutFeedback, Dimensions, Animated, Easing, ScrollView } from 'react-native';
import theme from '../theme';
import TypeWriterText from './Typewriter';
import * as API from '../../../services/api';
const { width } = Dimensions.get('window');
const dressImage = require('../../../../assets/images/onboarding-22-shirt1.jpg');
const emptyImage = require('../../../../assets/images/dots.png');
const SkirtImage1 = require('../../../../assets/images/onboarding-61-Skirt1.jpg');
const SkirtImage2 = require('../../../../assets/images/onboarding-61-Skirt2.jpg');
const SkirtImage3 = require('../../../../assets/images/onboarding-61-Skirt3.jpg');
const SkirtImage4 = require('../../../../assets/images/onboarding-61-Skirt4.jpg');
const ShoesImage1 = require('../../../../assets/images/onboarding-62-shoe1.jpg');
const ShoesImage2 = require('../../../../assets/images/onboarding-62-shoe2.jpg');
const ShoesImage3 = require('../../../../assets/images/onboarding-62-shoe3.jpg');
const ShoesImage4 = require('../../../../assets/images/onboarding-62-shoe4.jpg');
const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'white',
    },
    content: {
        flex: 1,
        paddingBottom: 20,
        alignItems: 'center',
        position: 'relative'
    },
    clickableImageContainer: {
        flex: 1,
        width: width / 2,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#fff',
        flexDirection: 'column',
        paddingVertical: 20,
        overflow: 'hidden'
    },
    itemImage: {
        width: width / 3,
        height: width / 3,
    },
    clickableTitle: {
        fontFamily: 'RalewayBold',
        fontSize: 11,
        color: '#000',
        marginTop: 10,
        marginBottom: 2,
        textAlign: 'center',
        letterSpacing: 2,
    },
    clickableSubTitle: {
        fontFamily: 'QuickSandRegular',
        fontSize: 11,
        color: '#000',
        textAlign: 'center'
    },
    scrollView: {
        flex: 1,
        width,
        marginTop: -20
    },
    preItemView: {
        height: 110,
        flexDirection: 'row',
        justifyContent: 'center',
        padding: 5,
        overflow: 'hidden'
    },
    preItemImage: {
        width: width / 6,
        height: 100,
        marginHorizontal: 4
    },
    leftItem: {
        borderRightWidth: 1.5,
        borderBottomWidth: 2,
        borderColor: '#f9f9f9'
    },
    rightItem: {
        borderBottomWidth: 2,
        borderColor: '#f9f9f9'
    }
});
export default class Step7 extends Component {
    constructor() {
        super(...arguments);
        this.state = {
            step: 1,
            selectedImage: emptyImage,
            selectedSkirt: emptyImage,
            itemMarginTop: new Animated.Value(0),
            opacity: new Animated.Value(1)
        };
        this.onClickImage = (image) => {
            this.state.itemMarginTop.setValue(0);
            Animated.timing(this.state.itemMarginTop, {
                toValue: 300,
                duration: 300,
                easing: Easing.cubic
            }).start(() => {
                this.state.itemMarginTop.setValue(0);
                this.setState({ selectedImage: image });
            });
        };
        this.onClickContinue = () => {
            if (this.state.step === 1) {
                Animated.timing(this.state.opacity, {
                    toValue: 0,
                    duration: 500,
                }).start(() => {
                    this.state.opacity.setValue(1);
                    this.setState({
                        step: 2,
                        selectedSkirt: this.state.selectedImage,
                        selectedImage: emptyImage,
                    });
                    // setTimeout(() => {
                    //   const scrollInstant: any = this.refs._scrollView;
                    //   scrollInstant.scrollTo({x: 0, y: 0, animated: true})
                    // }, 1500) 
                    API.RegisterEvent('On-MatchShoes', { userType: 'View screen' });
                });
            }
            else {
                this.props.continue();
            }
        };
        this.renderSkirtsScrollView = () => {
            return (React.createElement(Animated.ScrollView, { style: [styles.scrollView, { opacity: this.state.opacity }] },
                React.createElement(View, { style: { flexDirection: 'row' } },
                    React.createElement(TouchableWithoutFeedback, { onPress: () => this.onClickImage(SkirtImage1) },
                        React.createElement(View, { style: [styles.clickableImageContainer, styles.leftItem] },
                            React.createElement(Image, { source: SkirtImage1, resizeMode: 'contain', style: styles.itemImage }),
                            React.createElement(Text, { style: styles.clickableTitle }, "VERSACE"),
                            React.createElement(Text, { style: styles.clickableSubTitle }, "Signature print skirt"))),
                    React.createElement(TouchableWithoutFeedback, { onPress: () => this.onClickImage(SkirtImage2) },
                        React.createElement(View, { style: [styles.clickableImageContainer, styles.rightItem] },
                            React.createElement(Image, { source: SkirtImage2, resizeMode: 'contain', style: styles.itemImage }),
                            React.createElement(Text, { style: styles.clickableTitle }, "JOSEPH"),
                            React.createElement(Text, { style: styles.clickableSubTitle }, "Holden Compact skirt")))),
                React.createElement(View, { style: { flexDirection: 'row' } },
                    React.createElement(TouchableWithoutFeedback, { onPress: () => this.onClickImage(SkirtImage3) },
                        React.createElement(View, { style: [styles.clickableImageContainer, styles.leftItem] },
                            React.createElement(Image, { source: SkirtImage3, resizeMode: 'contain', style: styles.itemImage }),
                            React.createElement(Text, { style: styles.clickableTitle }, "SEE BY CHLO\u2026"),
                            React.createElement(Text, { style: styles.clickableSubTitle }, "long pleated skirt"))),
                    React.createElement(TouchableWithoutFeedback, { onPress: () => this.onClickImage(SkirtImage4) },
                        React.createElement(View, { style: [styles.clickableImageContainer, styles.rightItem] },
                            React.createElement(Image, { source: SkirtImage4, resizeMode: 'contain', style: styles.itemImage }),
                            React.createElement(Text, { style: styles.clickableTitle }, "GUCCI"),
                            React.createElement(Text, { style: styles.clickableSubTitle }, "GG web midi tweed skirt"))))));
        };
        this.renderShoesScrollView = () => {
            return (React.createElement(ScrollView, { ref: '_scrollView', style: styles.scrollView },
                React.createElement(View, { style: { flexDirection: 'row' } },
                    React.createElement(TouchableWithoutFeedback, { onPress: () => this.onClickImage(ShoesImage1) },
                        React.createElement(View, { style: [styles.clickableImageContainer, styles.leftItem] },
                            React.createElement(Image, { source: ShoesImage1, resizeMode: 'contain', style: styles.itemImage }),
                            React.createElement(Text, { style: styles.clickableTitle }, "ALEXANDER MCQUEEN"),
                            React.createElement(Text, { style: styles.clickableSubTitle }, "buffed leather sneakers"))),
                    React.createElement(TouchableWithoutFeedback, { onPress: () => this.onClickImage(ShoesImage2) },
                        React.createElement(View, { style: [styles.clickableImageContainer, styles.rightItem] },
                            React.createElement(Image, { source: ShoesImage2, resizeMode: 'contain', style: styles.itemImage }),
                            React.createElement(Text, { style: styles.clickableTitle }, "PRADA"),
                            React.createElement(Text, { style: styles.clickableSubTitle }, "Pointed Toe 65 pumps")))),
                React.createElement(View, { style: { flexDirection: 'row' } },
                    React.createElement(TouchableWithoutFeedback, { onPress: () => this.onClickImage(ShoesImage3) },
                        React.createElement(View, { style: [styles.clickableImageContainer, styles.leftItem] },
                            React.createElement(Image, { source: ShoesImage3, resizeMode: 'contain', style: styles.itemImage }),
                            React.createElement(Text, { style: styles.clickableTitle }, "YEEZY"),
                            React.createElement(Text, { style: styles.clickableSubTitle }, "taupe 110 high heel mules"))),
                    React.createElement(TouchableWithoutFeedback, { onPress: () => this.onClickImage(ShoesImage4) },
                        React.createElement(View, { style: [styles.clickableImageContainer, styles.rightItem] },
                            React.createElement(Image, { source: ShoesImage4, resizeMode: 'contain', style: styles.itemImage }),
                            React.createElement(Text, { style: styles.clickableTitle }, "ATP ATELIER"),
                            React.createElement(Text, { style: styles.clickableSubTitle }, "Cynara 55 Ankle Boots"))))));
        };
    }
    render() {
        const { step } = this.state;
        return (React.createElement(View, { style: styles.container },
            React.createElement(TypeWriterText, { text: step === 1 ? ['Try matching a skirt', ''] : ['Now match some shoes', ''] }),
            step === 1 ?
                this.renderSkirtsScrollView()
                : this.renderShoesScrollView(),
            React.createElement(View, { style: styles.preItemView },
                React.createElement(Image, { source: dressImage, resizeMode: 'contain', style: styles.preItemImage }),
                step === 1 ?
                    React.createElement(Animated.Image, { source: this.state.selectedImage, resizeMode: 'contain', style: [styles.preItemImage, { marginTop: this.state.itemMarginTop }] })
                    :
                        React.createElement(Image, { source: this.state.selectedSkirt, resizeMode: 'contain', style: styles.preItemImage }),
                step === 2 &&
                    React.createElement(Animated.Image, { source: this.state.selectedImage, resizeMode: 'contain', style: [styles.preItemImage, { marginTop: this.state.itemMarginTop }] })),
            React.createElement(View, { style: theme.buttonButtonView },
                React.createElement(TouchableWithoutFeedback, { onPress: () => this.onClickContinue() },
                    React.createElement(View, { style: theme.buttonWrapper },
                        React.createElement(View, { style: theme.line }),
                        React.createElement(Text, { style: theme.bottomButtonText }, "CONTINUE"),
                        React.createElement(View, { style: theme.line }))))));
    }
}
//# sourceMappingURL=Step7.js.map