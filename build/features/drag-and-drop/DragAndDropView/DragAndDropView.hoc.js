var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
import React, { Component } from 'react';
import { inject, observer } from 'mobx-react';
import DragAndDropView from './DragAndDropView';
import { Header, ZOOM, VIEW } from '../../shared';
import { ROOT_STORE } from '../../stores';
import * as API from '../../../services/api';
function DragAndDropViewHOC(DragAndDropView) {
    let NewComp = class NewComp extends Component {
        constructor() {
            super(...arguments);
            this._navigateToProductSingle = (product) => {
                const { root: { ui } } = this.props;
                const { navigate } = ui;
                API.RegisterEvent("Vw-sidebarDetails", {
                    actionType: 'Click sidebar text details'
                });
                navigate(ZOOM, VIEW, { product });
            };
        }
        render() {
            const { root: { products, slots } } = this.props;
            const { getProductsByCategory, allProducts, categoryInDrag, listOfProductsByCategories, arrayImages, resetProductsByCategory, toggleViewCategory } = products;
            const { getSixthSlot, addOrReplaceSixthSlot } = slots;
            const _dragrabbleItems = Boolean(getSixthSlot)
                ? [...arrayImages, getSixthSlot]
                : arrayImages;
            return React.createElement(DragAndDropView, { dragrabbleItems: _dragrabbleItems, sixthSlot: getSixthSlot, listOfProductsByCategories: listOfProductsByCategories, getProductsByCategory: getProductsByCategory, addOrReplaceSixthSlot: addOrReplaceSixthSlot, navigateToProductSingle: this._navigateToProductSingle, resetProductsByCategory: resetProductsByCategory, hasSixthSlot: Boolean(getSixthSlot), categoryInDrag: categoryInDrag, toggleViewCategory: toggleViewCategory, allProducts: allProducts });
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
export default DragAndDropViewHOC(DragAndDropView);
//# sourceMappingURL=DragAndDropView.hoc.js.map