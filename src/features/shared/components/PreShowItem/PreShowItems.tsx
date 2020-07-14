import React, { Component } from 'react';
import {
  View,
  Animated, 
  // Easing,
  Image,
  TouchableOpacity
} from 'react-native';

import theme from './theme';
// import { Entypo } from '@expo/vector-icons';
import { BROWSE, COLLECTION, FILTER } from '../../../shared';
// import CollectionItems from './CollectionItems/CollectionItems.hoc';
import BrowseItems from './BrowseItems/BrowseItems.hoc'
// import FilterItems from './FilterItems/FilterItems.hoc';

const plusIcon = require('../../../../../assets/images/plus.jpg')
type Props = {
    currentRoute: string;
    onAddPreItem: () => void;
    arrayImages: ProductImage[]
}
export default class PreShowItems extends Component<Props> {
    state = {
        fadeAnim: new Animated.Value(1),  // Initial value for opacity: 0
      }

    render() {
        
        const { currentRoute, arrayImages } = this.props;
        const onCollectionScreen: boolean = currentRoute === COLLECTION;
        const onBrowseScreen: boolean = currentRoute === BROWSE;
        const onFilterScreen: boolean = currentRoute === FILTER;
        return (
                 <View style={theme.imagesContainer}>
                        { (onCollectionScreen || onFilterScreen || onBrowseScreen) && <BrowseItems  animate={this._animate} fadeAnim={this.state.fadeAnim} />}
                        {
                            arrayImages.length < 5 &&
                            <TouchableOpacity onPress={this.props.onAddPreItem} style={theme.buttonPlus} >
                                <Image source={plusIcon} style={theme.plusIcon} />
                            </TouchableOpacity>
                        }                        
                 </View>
        )
    }

    _animate = () => {
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
    }
 }