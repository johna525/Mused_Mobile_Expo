import React, { Component } from 'react';
import {
  Text,
  View,
} from 'react-native';
import { AuthorItem } from '../../shared';
import theme from '../theme';


type Props = {
    item: any;
    title: string;
    onCollection?: boolean;
    visible: boolean;
}
export default class CollectionFooter extends Component<Props> {
    static defaultProps = {
        onCollection: false
    }
    render() {
        const { 
            onCollection,
            title, 
            item: 
            { timeAgo,
            authorProfilePhoto,
            authorName 
            } } = this.props;
        if(!this.props.visible) return null        
        return (
            <View style={theme.containerFooter}>
                <View style={theme.containerFooterWithBorder}>
                    <Text style={theme.footerTitle}>{title.toUpperCase()}</Text>
                </View>
                <AuthorItem 
                    author={authorName} 
                    time={timeAgo} 
                    imgAuthorUrl={{uri: authorProfilePhoto}} 
                    authorContainer={theme.authorContainer} 
                    onCollection={onCollection}
                />
            </View>
        )
    }
 }