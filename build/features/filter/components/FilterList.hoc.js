var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
import React, { Component } from 'react';
import { inject, observer } from 'mobx-react';
import FilterList from './FilterList';
import { Header } from '../../shared';
import { ROOT_STORE } from '../../stores';
import { COLLECTION, BROWSE } from '../../shared';
function FilterListHOC(FilterList) {
    let NewComp = class NewComp extends Component {
        constructor() {
            super(...arguments);
            this._onClickNewIn = () => {
                const { root: { ui: { navigate }, products } } = this.props;
                const { getNewProducts } = products;
                getNewProducts('all');
                navigate(BROWSE, COLLECTION);
            };
        }
        componentDidMount() {
            const { root: { filters: { formatFilterCategories } } } = this.props;
            formatFilterCategories();
        }
        render() {
            const { root: { filters } } = this.props;
            const { listOfCategory, filterTab, setFilterTab } = filters;
            return React.createElement(FilterList, { listOfCategory: listOfCategory, filterTab: filterTab, setFilterTab: setFilterTab, onClickNewIn: this._onClickNewIn });
        }
    };
    NewComp.navigationOptions = ({ navigation }) => {
        return {
            header: React.createElement(Header, { navigation: navigation })
        };
    };
    NewComp = __decorate([
        inject(ROOT_STORE),
        observer
    ], NewComp);
    return NewComp;
}
export default FilterListHOC(FilterList);
//# sourceMappingURL=FilterList.hoc.js.map