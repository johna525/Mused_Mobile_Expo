var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
import React, { Component } from 'react';
import { inject, observer } from 'mobx-react';
import Header from './Header';
import { ROOT_STORE } from '../../../stores';
import { NEWSFEED } from '../../routesKeys';
function HeaderHOC(Header) {
    let NewComp = class NewComp extends Component {
        constructor() {
            super(...arguments);
            this.onPressLogo = () => {
                const { root: { ui: { navigate }, posts: { getPosts } } } = this.props;
                getPosts();
                navigate(NEWSFEED, '', {});
            };
            this._hideContextMenu = () => {
                const { root: { ui: { toggleContextMenu } } } = this.props;
                toggleContextMenu(false);
            };
            this._getNewProducts = () => {
                const { root: { products: { getNewProducts } } } = this.props;
                getNewProducts('all');
            };
            this._setFilterTab = () => {
                const { root: { filters: { setFilterTab } } } = this.props;
                setFilterTab('');
            };
        }
        render() {
            const { navigation, showContent, root: { ui, user, products, filters, posts } } = this.props;
            const { userProfile, logout, setUserDetails } = user;
            const { resetArrayImages, resetAlternativies, resetCollection, setBrowseType } = products;
            const { filterTab, clearFilters, setFilterTab } = filters;
            const { getPosts } = posts;
            return React.createElement(Header, { navigation: navigation, showContent: showContent, userProfile: userProfile, logout: logout, hideContextMenu: this._hideContextMenu, resetArrayImages: resetArrayImages, filterTab: filterTab, backToFilterTabs: this._setFilterTab, clearFilters: clearFilters, resetAlternativies: resetAlternativies, onPressLogo: this.onPressLogo, resetCollection: resetCollection, getNewProducts: this._getNewProducts, setBrowseType: setBrowseType, setUserDetails: setUserDetails, ui: ui, getPosts: getPosts, setFilterTab: setFilterTab });
        }
    };
    NewComp = __decorate([
        inject(ROOT_STORE),
        observer
    ], NewComp);
    return NewComp;
}
export default HeaderHOC(Header);
//# sourceMappingURL=Header.hoc.js.map