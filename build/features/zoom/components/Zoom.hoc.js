var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
import React, { Component } from 'react';
import { inject, observer } from 'mobx-react';
import Zoom from './Zoom';
import { ROOT_STORE } from '../../stores';
import { ZOOM, BROWSE } from '../../shared/routesKeys';
function ZoomHOC(Zoom) {
    let NewComp = class NewComp extends Component {
        constructor() {
            super(...arguments);
            this.createStyleWithMused = (product, category) => {
                const { root: { products, slots, ui } } = this.props;
                const { createStyleWithMused, getNewProducts, setBrowseType } = products;
                const { setSlotNumber } = slots;
                const { navigate } = ui;
                createStyleWithMused(product);
                setBrowseType(1);
                getNewProducts(category);
                setSlotNumber(-1);
                navigate(BROWSE, ZOOM, { from: 'zoom' });
            };
        }
        render() {
            const { root: { ui, products }, navigation } = this.props;
            const { setPrevCurrentRoutes, prevRoute, goBack } = ui;
            const { createBookmark, deleteBookmarkById, listOfBookmarks } = products;
            return React.createElement(Zoom, { setPrevCurrentRoutes: setPrevCurrentRoutes, prevRoute: prevRoute, navigation: navigation, createNewStyle: this.createStyleWithMused, goBack: goBack, createBookmark: createBookmark, deleteBookmarkById: deleteBookmarkById, listOfBookmarks: listOfBookmarks });
        }
    };
    NewComp = __decorate([
        inject(ROOT_STORE),
        observer
    ], NewComp);
    return NewComp;
}
export default ZoomHOC(Zoom);
//# sourceMappingURL=Zoom.hoc.js.map