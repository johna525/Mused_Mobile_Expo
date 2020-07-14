import React, { Component } from 'react';
import { View, Animated, 
// Easing,
Image, TouchableOpacity } from 'react-native';
import theme from './theme';
// import { Entypo } from '@expo/vector-icons';
import { BROWSE, COLLECTION, FILTER } from '../../../shared';
// import CollectionItems from './CollectionItems/CollectionItems.hoc';
import BrowseItems from './BrowseItems/BrowseItems.hoc';
// import FilterItems from './FilterItems/FilterItems.hoc';
const plusIcon = require('../../../../../assets/images/plus.jpg');
export default class PreShowItems extends Component {
    constructor() {
        super(...arguments);
        this.state = {
            fadeAnim: new Animated.Value(1),
        };
        this._animate = () => {
            // Animated.sequence(
            //     [ Animated.timing(                 
            //     this.state.fadeAnim,
            //     {
            //       toValue: 0.5,
            //       duration: 200,
            //       easing: Easing.cubic
            //     }
            //   ),
            //   Animated.timing(                  
            //     this.state.fadeAnim,            
            //     {
            //       toValue: 1,                   
            //       duration: 200,
            //       easing: Easing.cubic           
            //     }
            //   ),
            // ]).start();
        };
    }
    render() {
        const { currentRoute, arrayImages } = this.props;
        const onCollectionScreen = currentRoute === COLLECTION;
        const onBrowseScreen = currentRoute === BROWSE;
        const onFilterScreen = currentRoute === FILTER;
        return (React.createElement(View, { style: theme.imagesContainer },
            (onCollectionScreen || onFilterScreen || onBrowseScreen) && React.createElement(BrowseItems, { animate: this._animate, fadeAnim: this.state.fadeAnim }),
            arrayImages.length < 5 &&
                React.createElement(TouchableOpacity, { onPress: this.props.onAddPreItem, style: theme.buttonPlus },
                    React.createElement(Image, { source: plusIcon, style: theme.plusIcon }))));
    }
}
//# sourceMappingURL=PreShowItems.js.map