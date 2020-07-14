import React, { Component } from 'react';
import {
    View,
    TextInput
} from 'react-native';
import { EvilIcons } from '@expo/vector-icons';

import theme from '../theme';

export default class FilterSearch extends Component {
    render() {
        return (
            <View style={theme.searchContainer}>
               <View style={{flex: 0.1}}>  
                    <EvilIcons name="search" size={30} color="#000" /> 
                </View>
                <View  style={{flex: 0.9}}>
                    <TextInput 
                        placeholder={'Search designers'} 
                        placeholderTextColor={'#000'}
                        underlineColorAndroid='transparent'
                        style={theme.textFieldStyle}
                    />
                </View>
            </View>
        )
    }
}