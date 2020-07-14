import React, { Component } from 'react';
import {
    View,
    Text,
    Animated
} from 'react-native';

import Ripple from 'react-native-material-ripple';
import { selectionCount } from '../../shared';
import DesignerItem from './DesignerItem';
import FilterCategories from './FilterCategories/FilterCategories.hoc'
import theme from '../theme';
import * as API from '../../../services/api';

type Props = {
    listOfCategory: Category[];
    filterTab: string;
    setFilterTab: (tab: string) => void;
    onClickNewIn: () => void;
}
export default class FilterList extends Component<Props> {
    state = { 
        fadeIn: new Animated.Value(1) 
    }

    render() {
        const { filterTab } = this.props;
        if(filterTab === 'applied') {
            // this.startFadeOut()
        } 
        return (
            <Animated.View style={[theme.container, {opacity: this.state.fadeIn}]}>
                { filterTab === '' && this._renderTabs()}
                { filterTab === 'categories' && <FilterCategories />}
            </Animated.View>
        )
    }

    _changeTab = (type: string) =>
        this.props.setFilterTab(type)

    startFadeOut = () => {
        this.state.fadeIn.setValue(1)
        Animated.timing(                  
           this.state.fadeIn,            
           {
             toValue: 0,                   
             duration: 500, 
             useNativeDriver: true             
           }
        ).start(() => this.props.setFilterTab(''));
    }

    _renderDesignerItem = (props: {item: {text: string, id?: string}, index: number}) =>
        <DesignerItem index={props.index} item={props.item} />

    _renderTabs = () => {
        return (
            <View style={[theme.counterContainer]}>
                
                <Ripple
                    onPress={() => this.onClick('newIn')}
                    style={theme.counterItemContainer}
                    rippleSize={120}
                    rippleDuration={300} 
                    rippleCentered={true}
                    rippleContainerBorderRadius={40}>
                    <View style={{flex: 1}}>
                        <Text style={theme.categoryText}>NEW IN</Text>
                        <Text style={theme.subText}>All the latest products</Text>
                    </View>                        
                </Ripple>
                
                <Ripple
                    onPress={() => this.onClick('clothe')}
                    style={theme.counterItemContainer}
                    rippleSize={120}
                    rippleDuration={300} 
                    rippleCentered={true}
                    rippleContainerBorderRadius={40}>
                    <View style={{flex: 1}}>
                        <Text style={theme.categoryText}>CATEGORIES</Text>
                        <Text style={theme.subText}>Select specific products</Text>
                    </View>                        
                </Ripple>
                {/* <Ripple
                    onPress={() => this.onClick('colour')}
                    style={theme.counterItemContainer}
                    rippleSize={120}
                    rippleDuration={300} 
                    rippleCentered={true}
                    rippleContainerBorderRadius={40}>
                    <View style={{flex: 1}}>
                        <Text style={theme.categoryText}>COLOUR</Text>
                        <Text style={theme.subText}>Supporting text goes here</Text>
                    </View>                        
                </Ripple> */}
            </View>   
        )
    }

    onClick = (category: string) => {
        this.state.fadeIn.setValue(1)
        Animated.timing(                  
           this.state.fadeIn,            
           {
             toValue: 0,                   
             duration: 400, 
             useNativeDriver: true             
           }
        ).start(() => {
            if(category === 'newIn') this.onClickNewIn();
            else if(category === 'clothe') this.onClickClothe();
            else this.onClickColour()
            this.state.fadeIn.setValue(1)
        });
    }

    onClickNewIn = () => {
        API.RegisterEvent("Fi-newIn", {
            actionType: "Click 'New in' button"
        })
        this.props.onClickNewIn();
    }

    onClickClothe = () => {
        API.RegisterEvent("Fi-categories", {
            actionType: "Click 'Categories' button"
        })
        this._changeTab('categories')
    }

    onClickColour = () => {
        API.RegisterEvent("Fi-colour", {
            actionType: "Click 'Colour' button"
        })
        alert('comming soon')
    }

    _renderSelectionCount = () => {
        const { listOfCategory } = this.props;
        return listOfCategory.length > 0
        ? <Text style={theme.selectionText}>{`${selectionCount(listOfCategory)} selected`}</Text>
        : null;
    }
}
