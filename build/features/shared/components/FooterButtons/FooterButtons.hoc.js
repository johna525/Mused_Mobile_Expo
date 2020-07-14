var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import React, { Component } from 'react';
import { AsyncStorage } from 'react-native';
import { inject, observer } from 'mobx-react';
import FooterButtons from './FooterButtons';
import { COLLECTION, BROWSE, FILTER, VIEW, BROWSE_ONLY } from '../../../shared';
import { ROOT_STORE } from '../../../stores';
import * as API from '../../../../services/api';
import { MENU_FILTER } from '../../routesKeys';
function FooterButtonsHOC(FooterButtons) {
    let NewComp = class NewComp extends Component {
        constructor() {
            super(...arguments);
            this._openProductCategory = () => {
                const { root: { products } } = this.props;
                const { openProductCategory } = products;
                API.RegisterEvent("Vw-footerFilter", {
                    actionType: "Click menu 'Filter'"
                });
                openProductCategory();
            };
            this._navigateBackToBrowse = () => {
                const { root: { ui: { navigate } } } = this.props;
                API.RegisterEvent("Vw-footerView", {
                    actionType: "Click menu 'View'"
                });
                navigate(BROWSE, COLLECTION);
            };
            this._createNewOutfit = () => {
                const { root: { ui, products } } = this.props;
                const { currentRoute } = ui;
                const { createNewOutfit } = products;
                if (currentRoute === COLLECTION) {
                    API.RegisterEvent("Cl-loveit", {
                        actionType: "Click on 'Love it' in footer"
                    });
                }
                else {
                    API.RegisterEvent("Br-footerLove", {
                        actionType: "Click menu 'Love it'"
                    });
                }
                createNewOutfit();
            };
            this._navigateToFilter = () => {
                const { root: { ui: { navigate }, products, filters: { setFilterTab } } } = this.props;
                const { setBrowseType } = products;
                const { root: { user: { newUser, setNewUser } } } = this.props;
                if (newUser) {
                    AsyncStorage.setItem('newUser', 'no');
                    setNewUser(false);
                }
                API.RegisterEvent("Br-footerFilter", {
                    actionType: "Click menu 'Filter'"
                });
                setFilterTab('');
                setBrowseType(1);
                navigate(FILTER, BROWSE);
            };
            this._navigateToView = () => {
                const { root: { ui: { navigate } } } = this.props;
                API.RegisterEvent("Br-footerView", {
                    actionType: "Click menu 'View'"
                });
                navigate(VIEW, BROWSE);
            };
            this._navigateToBrowse = () => {
                const { root: { ui: { navigate }, products } } = this.props;
                const { fromMenu } = products;
                if (fromMenu)
                    navigate(BROWSE_ONLY, COLLECTION, { fromMenu });
                else
                    navigate(BROWSE, COLLECTION);
            };
            this._clearFilterAndGoToBrowse = () => {
                const { root: { filters, products, slots, ui } } = this.props;
                const { clearFilters } = filters;
                const { cancelNewSlot, arrayImages } = products;
                const { setPrevSlotNumber } = slots;
                const { goBack, navigation } = ui;
                // if(prevRoute === COLLECTION) navigate(COLLECTION, NEWSFEED);
                // else this._navigateToBrowse();      
                clearFilters();
                setPrevSlotNumber(arrayImages);
                cancelNewSlot();
                goBack();
                navigation.goBack();
                API.RegisterEvent("Fi-cancel", {
                    actionType: "Click 'cancel'"
                });
            };
            this._applyFilter = () => __awaiter(this, void 0, void 0, function* () {
                const { root: { products: { getAlternativesByFilter } } } = this.props;
                getAlternativesByFilter();
                API.RegisterEvent("Fi-apply", {
                    actionType: "Click 'apply'"
                });
                setTimeout(() => {
                    this._navigateToBrowse();
                }, 500);
            });
        }
        render() {
            const { root: { ui, slots, user } } = this.props;
            const { currentRoute } = ui;
            const { newImgUrl } = slots;
            const footerIsVisible = currentRoute === COLLECTION ||
                currentRoute === BROWSE ||
                currentRoute === FILTER ||
                currentRoute === MENU_FILTER ||
                currentRoute === VIEW;
            return (footerIsVisible &&
                React.createElement(FooterButtons, { currentRoute: currentRoute, navigateToFilter: this._navigateToFilter, navigateBackToBrowse: this._navigateBackToBrowse, navigateToView: this._navigateToView, clearFilterAndGoToBrowse: this._clearFilterAndGoToBrowse, applyFilter: this._applyFilter, createNewOutfit: this._createNewOutfit, openProductCategory: this._openProductCategory, newImgUrl: newImgUrl, user: user }));
        }
    };
    NewComp = __decorate([
        inject(ROOT_STORE),
        observer
    ], NewComp);
    return NewComp;
}
export default FooterButtonsHOC(FooterButtons);
//# sourceMappingURL=FooterButtons.hoc.js.map