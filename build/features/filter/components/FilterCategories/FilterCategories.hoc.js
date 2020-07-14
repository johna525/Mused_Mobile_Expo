var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
import React, { Component } from 'react';
import { inject, observer } from 'mobx-react';
import FilterCategories from './FilterCategories';
import { ROOT_STORE } from '../../../stores';
function FilterCategoriesHOC(FilterList) {
    let NewComp = class NewComp extends Component {
        render() {
            const { root: { filters } } = this.props;
            const { listOfCategory, addNewCategory, removeCategory, selectAllSubCategories } = filters;
            return React.createElement(FilterList, { listOfCategory: listOfCategory, addNewCategory: addNewCategory, removeCategory: removeCategory, selectAllSubCategories: selectAllSubCategories });
        }
    };
    NewComp = __decorate([
        inject(ROOT_STORE),
        observer
    ], NewComp);
    return NewComp;
}
export default FilterCategoriesHOC(FilterCategories);
//# sourceMappingURL=FilterCategories.hoc.js.map