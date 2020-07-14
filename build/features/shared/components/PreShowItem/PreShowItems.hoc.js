var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
import React, { Component } from 'react';
import { inject, observer } from 'mobx-react';
import PreShowItems from './PreShowItems';
import { FILTER } from '../../index';
import { ROOT_STORE } from '../../../stores';
import * as API from '../../../../services/api';
function PreShowItemsHOC(PreShowItems) {
    let NewComp = class NewComp extends Component {
        constructor() {
            super(...arguments);
            this.onAddPreItem = () => {
                const { root: { products, slots } } = this.props;
                const { addNewSlot } = products;
                const { setSlotNumber } = slots;
                addNewSlot();
                setSlotNumber(-1);
                API.RegisterEvent("Br-add", {
                    actionType: 'Click footer photo'
                });
                const { root: { ui } } = this.props;
                const { navigate, currentRoute } = ui;
                navigate(FILTER, currentRoute, { goBack: () => this.onBack() });
            };
            this.onBack = () => {
            };
        }
        render() {
            const { root: { ui, products } } = this.props;
            const { currentRoute } = ui;
            const { arrayImages } = products;
            return React.createElement(PreShowItems, { currentRoute: currentRoute, onAddPreItem: this.onAddPreItem, arrayImages: arrayImages });
        }
    };
    NewComp = __decorate([
        inject(ROOT_STORE),
        observer
    ], NewComp);
    return NewComp;
}
export default PreShowItemsHOC(PreShowItems);
//# sourceMappingURL=PreShowItems.hoc.js.map