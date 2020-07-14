var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
import React, { Component } from 'react';
import { inject, observer } from 'mobx-react';
import CollectionItem from './CollectionItem';
import { COLLECTION, COLLECTION_ZOOM } from '../../shared';
import { ROOT_STORE } from '../../stores';
import * as API from '../../../services/api';
function CollectionItemHOC(CollectionItem) {
    let NewComp = class NewComp extends Component {
        constructor() {
            super(...arguments);
            this._navigateToProductSingle = (product) => {
                const { root: { ui } } = this.props;
                const { navigate } = ui;
                API.RegisterEvent("Cl-product", {
                    actionType: "Click any product"
                });
                navigate(COLLECTION_ZOOM, COLLECTION, { product });
            };
        }
        render() {
            const { root: { products }, item, countAlter, goToNext, onLoadImage, alternatives, index } = this.props;
            const { listOfBookmarks, createBookmark, deleteBookmarkById } = products;
            return React.createElement(CollectionItem, { listOfBookmarks: listOfBookmarks, createBookmark: createBookmark, deleteBookmarkById: deleteBookmarkById, item: item, countAlter: countAlter, onLoadImage: onLoadImage, goToNext: goToNext, alternatives: alternatives, index: index, navigateToProductSingle: this._navigateToProductSingle });
        }
    };
    NewComp = __decorate([
        inject(ROOT_STORE),
        observer
    ], NewComp);
    return NewComp;
}
export default CollectionItemHOC(CollectionItem);
//# sourceMappingURL=CollectionItem.hoc.js.map