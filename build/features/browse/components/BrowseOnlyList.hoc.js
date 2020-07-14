var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
import React, { Component } from 'react';
import { inject, observer } from 'mobx-react';
import BrowseList from './BrowseOnlyList';
import { Header, BROWSE_ONLY, COLLECTION_ZOOM } from '../../shared';
import { ROOT_STORE } from '../../stores';
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
                navigate(COLLECTION_ZOOM, BROWSE_ONLY, { product });
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
            setBrowseType(2);
            console.log('reset alternatives...');
        }
        render() {
            const { root: { slots, products, ui }, navigation } = this.props;
            const { contextMenuIsVisible } = ui;
            const { setNewImgUrl, isSlotMachine } = slots;
            const { listOfbrowseOnlyProducts, getAlternatives, getNewProducts, createBookmark, listOfBookmarks, deleteBookmarkById, arrayImages, noResult } = products;
            if (JSON.stringify(listOfbrowseOnlyProducts) !== this.prevProducts) {
                this.setState({ numberOfLoad: 10 });
                this.prevProducts = JSON.stringify(listOfbrowseOnlyProducts);
            }
            return React.createElement(Browse, { navigation: navigation, setNewImgUrl: setNewImgUrl, navigateToProductSingle: this._navigateToProductSingle, hideContextMenu: this._hideContextMenu, isSlotMachine: isSlotMachine, listOfProducts: listOfbrowseOnlyProducts.slice(0, this.state.numberOfLoad), AllList: listOfbrowseOnlyProducts, getAlternatives: getAlternatives, createBookmark: createBookmark, listOfBookmarks: listOfBookmarks, deleteBookmarkById: deleteBookmarkById, contextMenuIsVisible: contextMenuIsVisible, arrayImages: arrayImages, noResult: noResult, getNewProducts: getNewProducts, onScrollEndDrag: (nativeEvent) => this.onScrollEndDrag(nativeEvent) });
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
//# sourceMappingURL=BrowseOnlyList.hoc.js.map