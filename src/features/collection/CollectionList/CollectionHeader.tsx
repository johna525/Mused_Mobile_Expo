import React, { Component } from 'react';
import {
  Text,
  View,
} from 'react-native';

import theme from '../theme';

type Props = {
    item: ICollectionHeader
}
export default class CollectionHeader extends Component<Props> {
    render() {
        const { title, subTitle } = this.props.item;
        return (
            <View style={theme.containerHeader}>
               <Text style={theme.headerTitle}>{title.toUpperCase()}</Text>
               <Text style={theme.headerSubTitle}>{subTitle}</Text>
               {/* <View style={theme.underlineTitle}></View> */}
            </View>
        )
    }
 }