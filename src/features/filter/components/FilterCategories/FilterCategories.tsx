import React, { Component } from 'react';
import {
    View,
    Text,
    TouchableHighlight,
    ScrollView
} from 'react-native';

import { findCategoryIndex } from '../../../shared';
import { categoriesKeys } from '../../categoriesKeys';
import theme from '../../theme';
import * as API from '../../../../services/api';

const SELECT_ALL: string = 'SELECT ALL';

type Props = {
    listOfCategory: Category[];
    addNewCategory: (category: string, subCutegory: string) => void;
    removeCategory: (category: string, subCutegory: string) => void;
    selectAllSubCategories: (category: string) => void;
}
export default class FilterCategories extends Component<Props> {
    state = {
        categoryOpened: ''
    }
    render() {
        return this._renderCategories()
    }


    _changeCategory = (category: string) => {
        const { categoryOpened } = this.state;
        if(categoryOpened === category) {
            this.setState({categoryOpened: ''})
        } else {
            this.setState({categoryOpened: category})
        }
            
    }


    _renderCategories = () => {
        return (
           <ScrollView style={theme.scrollView} contentContainerStyle={theme.categoryWrapper}>
                {/* <View style={theme.tabItem}>
                    <Text style={theme.textTabHeader}>SELECT PRODUCTS</Text>
                </View> */}
               {categoriesKeys.map(this._renderCategory)}
           </ScrollView>
        );
    }
    _renderCategory = (_category: Category, index: number) => {
        const { categoryOpened } = this.state;
        return (
            <View key={index} style={theme.tabItem}>
                <TouchableHighlight onPress={() => this._changeCategory(_category.category)} underlayColor={'transparent'}>
                    <View style={theme.categoryTouchable}>
                        <Text style={theme.textTabNavigation}>
                            {_category.label}
                        </Text>
                    </View>                    
                </TouchableHighlight>
                { 
                    _category.category === categoryOpened &&
                    <View style={theme.subCategoriesList}>
                        {[SELECT_ALL, ..._category.subCategories].map(this._renderSubCategory)}
                    </View>
                }
            </View>
        )
    }
            

    _renderSubCategory = (item: string, index: number) => {
        const { listOfCategory } = this.props;
        const { categoryOpened } = this.state;
        let isSelected: boolean = false;
        const categoryIndex: number = findCategoryIndex(listOfCategory, categoryOpened);
        if (listOfCategory[categoryIndex]) {
            isSelected = Boolean(listOfCategory[categoryIndex].subCategories.find((subCategory: string) => {
                return subCategory === item
            }));
        } 
       const isSelectAll: boolean = item === SELECT_ALL;
        return (
            <TouchableHighlight 
                underlayColor={'transparent'}
                key={index}
                onPress={isSelectAll ? this._selectAllSubCategories : () => this._clickOnSubCategory(item)}
                style={[theme.subCategoryItem, isSelected ? {backgroundColor: '#e5e5e5'} : {}]}>
                <Text style={theme.subCategoryText}>{item}</Text>
            </TouchableHighlight>
        );
    }
    _clickOnSubCategory = (item: string) => {
        const { addNewCategory, removeCategory, listOfCategory } = this.props;
        const { categoryOpened } = this.state;
        const categoryIndex: number = findCategoryIndex(listOfCategory, categoryOpened);
        if (listOfCategory[categoryIndex]) {
            const existingSubCategory: string | undefined = 
                listOfCategory[categoryIndex].subCategories.find((subCategory: string) => subCategory === item);
                if (existingSubCategory) {
                    removeCategory(categoryOpened, item);
                } else {
                    addNewCategory(categoryOpened, item);
                    API.RegisterEvent("Fi-subcat", {
                        actionType: "Click any subcategory",
                        subcategory: item
                    })
                }
        } else {
            addNewCategory(categoryOpened, item);
            API.RegisterEvent("Fi-subcat", {
                actionType: "Click any subcategory",
                subcategory: item
            })
        }
    }

    _selectAllSubCategories = () => {
        const { categoryOpened } = this.state;
        const { selectAllSubCategories } = this.props;
        API.RegisterEvent("Fi-catAll", {
            actionType: "Click any category 'select all'",
            category: categoryOpened
        })
        selectAllSubCategories(categoryOpened);
    }
}
