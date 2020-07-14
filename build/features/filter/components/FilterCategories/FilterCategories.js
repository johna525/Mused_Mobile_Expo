import React, { Component } from 'react';
import { View, Text, TouchableHighlight, ScrollView } from 'react-native';
import { findCategoryIndex } from '../../../shared';
import { categoriesKeys } from '../../categoriesKeys';
import theme from '../../theme';
import * as API from '../../../../services/api';
const SELECT_ALL = 'SELECT ALL';
export default class FilterCategories extends Component {
    constructor() {
        super(...arguments);
        this.state = {
            categoryOpened: ''
        };
        this._changeCategory = (category) => {
            const { categoryOpened } = this.state;
            if (categoryOpened === category) {
                this.setState({ categoryOpened: '' });
            }
            else {
                this.setState({ categoryOpened: category });
            }
        };
        this._renderCategories = () => {
            return (React.createElement(ScrollView, { style: theme.scrollView, contentContainerStyle: theme.categoryWrapper }, categoriesKeys.map(this._renderCategory)));
        };
        this._renderCategory = (_category, index) => {
            const { categoryOpened } = this.state;
            return (React.createElement(View, { key: index, style: theme.tabItem },
                React.createElement(TouchableHighlight, { onPress: () => this._changeCategory(_category.category), underlayColor: 'transparent' },
                    React.createElement(View, { style: theme.categoryTouchable },
                        React.createElement(Text, { style: theme.textTabNavigation }, _category.label))),
                _category.category === categoryOpened &&
                    React.createElement(View, { style: theme.subCategoriesList }, [SELECT_ALL, ..._category.subCategories].map(this._renderSubCategory))));
        };
        this._renderSubCategory = (item, index) => {
            const { listOfCategory } = this.props;
            const { categoryOpened } = this.state;
            let isSelected = false;
            const categoryIndex = findCategoryIndex(listOfCategory, categoryOpened);
            if (listOfCategory[categoryIndex]) {
                isSelected = Boolean(listOfCategory[categoryIndex].subCategories.find((subCategory) => {
                    return subCategory === item;
                }));
            }
            const isSelectAll = item === SELECT_ALL;
            return (React.createElement(TouchableHighlight, { underlayColor: 'transparent', key: index, onPress: isSelectAll ? this._selectAllSubCategories : () => this._clickOnSubCategory(item), style: [theme.subCategoryItem, isSelected ? { backgroundColor: '#e5e5e5' } : {}] },
                React.createElement(Text, { style: theme.subCategoryText }, item)));
        };
        this._clickOnSubCategory = (item) => {
            const { addNewCategory, removeCategory, listOfCategory } = this.props;
            const { categoryOpened } = this.state;
            const categoryIndex = findCategoryIndex(listOfCategory, categoryOpened);
            if (listOfCategory[categoryIndex]) {
                const existingSubCategory = listOfCategory[categoryIndex].subCategories.find((subCategory) => subCategory === item);
                if (existingSubCategory) {
                    removeCategory(categoryOpened, item);
                }
                else {
                    addNewCategory(categoryOpened, item);
                    API.RegisterEvent("Fi-subcat", {
                        actionType: "Click any subcategory",
                        subcategory: item
                    });
                }
            }
            else {
                addNewCategory(categoryOpened, item);
                API.RegisterEvent("Fi-subcat", {
                    actionType: "Click any subcategory",
                    subcategory: item
                });
            }
        };
        this._selectAllSubCategories = () => {
            const { categoryOpened } = this.state;
            const { selectAllSubCategories } = this.props;
            API.RegisterEvent("Fi-catAll", {
                actionType: "Click any category 'select all'",
                category: categoryOpened
            });
            selectAllSubCategories(categoryOpened);
        };
    }
    render() {
        return this._renderCategories();
    }
}
//# sourceMappingURL=FilterCategories.js.map