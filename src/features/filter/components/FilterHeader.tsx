import React, { Component } from 'react';
import {
    Text,
    View,
    TouchableHighlight,
} from 'react-native';

import theme from '../theme';

type Props = {
    hasSearch?: boolean;
    currentList: string;
    changeTab: (type: string) => void;
}
export default class FilterHeader extends Component<Props> {
    static defaultProps = {
        hasSearch: false
    }
    render() {
        const  { currentList, hasSearch } = this.props;
        const underLine = { borderBottomColor: '#000', borderBottomWidth: 1 };
        const marginBottom = !hasSearch ? { marginBottom: 15 } : {};
        return (
            <View style={[theme.tabNavigationWrapper, marginBottom]}>
                        <TouchableHighlight 
                            onPress={() => this._changeTab('categories')}
                            underlayColor={'transparent'}
                            style={[theme.buttonTabNavigation, { marginRight: 20}]}
                        >
                            <View style={[currentList === 'categories' ? underLine : {} ]}>
                            <Text style={theme.textTabNavigation}>CATEGORIES</Text>
                            </View>
                        </TouchableHighlight>
                        <TouchableHighlight 
                            style={[theme.buttonTabNavigation, {marginRight: 20}]} 
                            underlayColor={'transparent'}
                            onPress={() => this._changeTab('colour')}
                        >
                            <View style={[currentList === 'colour' ? underLine : {} ]}>
                                <Text style={theme.textTabNavigation}>COLOUR</Text>
                            </View>
                        </TouchableHighlight>
                        <TouchableHighlight 
                            onPress={() => this._changeTab('designers')}
                            underlayColor={'transparent'}
                            style={[theme.buttonTabNavigation]}
                        >
                            <View style={[currentList === 'designers' ? underLine : {} ]}>
                                <Text style={theme.textTabNavigation}>DESIGNERS</Text>
                            </View>
                        </TouchableHighlight>
                    </View>
        )
    }

    _changeTab = (type: string) =>
        this.props.changeTab(type);
}