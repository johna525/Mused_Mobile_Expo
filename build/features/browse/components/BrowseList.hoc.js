var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
import React, { Component } from 'react';
import { inject, observer } from 'mobx-react';
import BrowseList from './BrowseList';
import { Header, ZOOM, BROWSE } from '../../shared';
import { ROOT_STORE } from '../../stores';
import * as API from '../../../services/api';
function BrowseHOC(Browse) {
    let NewComp = class NewComp extends Component {
        constructor() {
            super(...arguments);
            this.state = {
                numberOfLoad: 10,
            };
            this._navigateToProductSingle = (product) => {
                const { root: { ui } } = this.props;
                const { navigate } = ui;
                API.RegisterEvent("Br-details", {
                    actionType: 'Click product details',
                    productID: product.id
                });
                navigate(ZOOM, BROWSE, { product });
            };
            this._hideContextMenu = () => {
                const { root: { ui, slots } } = this.props;
                const { toggleContextMenu, contextMenuIsVisible } = ui;
                const { setSecondSlotNumber } = slots;
                if (contextMenuIsVisible) {
                    toggleContextMenu(false);
                }
                setSecondSlotNumber(null);
            };
        }
        componentWillMount() {
            const { root: { products: { resetAlternativies, setBrowseType } } } = this.props;
            resetAlternativies();
            setBrowseType(1);
            console.log('reset alternatives...');
        }
        render() {
            const { root: { slots, products, ui, user: { newUser } }, navigation } = this.props;
            const { contextMenuIsVisible } = ui;
            const { setNewImgUrl, isSlotMachine } = slots;
            const { listOfAlternatives, getNewProducts, getAlternatives, createBookmark, listOfBookmarks, deleteBookmarkById, arrayImages, noResult } = products;
            if (JSON.stringify(listOfAlternatives) !== this.prevProducts) {
                this.setState({ numberOfLoad: 10 });
                this.prevProducts = JSON.stringify(listOfAlternatives);
            }
            return React.createElement(Browse, { navigation: navigation, setNewImgUrl: setNewImgUrl, navigateToProductSingle: this._navigateToProductSingle, hideContextMenu: this._hideContextMenu, isSlotMachine: isSlotMachine, listOfAlternatives: listOfAlternatives.slice(0, this.state.numberOfLoad), AllList: listOfAlternatives, getAlternatives: getAlternatives, createBookmark: createBookmark, listOfBookmarks: listOfBookmarks, deleteBookmarkById: deleteBookmarkById, contextMenuIsVisible: contextMenuIsVisible, arrayImages: arrayImages, noResult: noResult, getNewProducts: getNewProducts, newUser: newUser, onScrollEndDrag: (nativeEvent) => this.onScrollEndDrag(nativeEvent) });
        }
        onScrollEndDrag(nativeEvent) {
            const { contentOffset, layoutMeasurement, contentSize } = nativeEvent;
            if (layoutMeasurement.height + contentOffset.y > contentSize.height - 350) {
                this.setState({ numberOfLoad: this.state.numberOfLoad + 10 });
            }
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
export default BrowseHOC(BrowseList);
//# sourceMappingURL=BrowseList.hoc.js.map