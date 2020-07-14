var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
import React, { Component } from 'react';
import { inject, observer } from 'mobx-react';
import ContextMenu from './ContextMenu';
import { ROOT_STORE } from '../../../stores';
import { ZOOM, BROWSE, FILTER } from '../../routesKeys';
import * as API from '../../../../services/api';
function ContextMenuHOC(ContextMenu) {
    let NewComp = class NewComp extends Component {
        constructor() {
            super(...arguments);
            this._goToZoomPage = () => {
                const { root: { products, ui: { navigate }, slots: { secondSlotNumber } } } = this.props;
                const { listOfAlternatives, listOfCollection } = products;
                const product = [...listOfAlternatives, ...listOfCollection].find((product) => product.id === secondSlotNumber);
                API.RegisterEvent("Br-contextDetails", {
                    actionType: "Click contextual menu 'Details'"
                });
                navigate(ZOOM, BROWSE, { product });
            };
            this._goToFilterPage = () => {
                const { root: { ui: { navigate, toggleContextMenu }, slots: { secondSlotNumber, setSlotNumber } } } = this.props;
                navigate(FILTER, BROWSE);
                API.RegisterEvent("Br-contextSwitch", {
                    actionType: "Click contextual menu 'Switch'"
                });
                toggleContextMenu(false);
                secondSlotNumber && setSlotNumber(secondSlotNumber);
            };
            this._moveImage = () => {
                const { root: { slots: { setMoveProduct } } } = this.props;
                API.RegisterEvent("Br-contextMove", {
                    actionType: "Click contextual menu 'Move'"
                });
                setMoveProduct(true);
            };
        }
        render() {
            const { root: { ui } } = this.props;
            const { contextMenuIsVisible, currentRoute } = ui;
            const isBrowse = currentRoute === BROWSE;
            return (contextMenuIsVisible && isBrowse &&
                React.createElement(ContextMenu, { goToZoomPage: this._goToZoomPage, goToFilterPage: this._goToFilterPage, moveImage: this._moveImage }));
        }
    };
    NewComp = __decorate([
        inject(ROOT_STORE),
        observer
    ], NewComp);
    return NewComp;
}
export default ContextMenuHOC(ContextMenu);
//# sourceMappingURL=ContextMenu.hoc.js.map