var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
import React, { Component } from 'react';
import { inject, observer } from 'mobx-react';
import FilterItems from './FilterItems';
import { ROOT_STORE } from '../../../../stores';
function FilterItemsHOC(FilterItems) {
    let NewComp = class NewComp extends Component {
        constructor() {
            super(...arguments);
            this._changeArrayImages = (slotNumber) => {
                const { root: { products, slots } } = this.props;
                const { changeArrayImages } = products;
                const { newImgUrl } = slots;
                changeArrayImages(slotNumber, newImgUrl);
            };
        }
        render() {
            const { root: { products, slots }, animate, fadeAnim } = this.props;
            const { arrayImages } = products;
            const { slotNumber, newImgUrl, setNewImgUrl, secondSlotNumber, setSecondSlotNumber, setSlotMachineEffect, setSlotNumber } = slots;
            return React.createElement(FilterItems, { arrayImgs: arrayImages, setSecondSlotNumber: setSecondSlotNumber, slotNumber: slotNumber, newImgUrl: newImgUrl, setNewImgUrl: setNewImgUrl, changeArrayImages: this._changeArrayImages, secondSlotNumber: secondSlotNumber, setSlotNumber: setSlotNumber, animate: animate, fadeAnim: fadeAnim, setSlotMachineEffect: setSlotMachineEffect });
        }
    };
    NewComp = __decorate([
        inject(ROOT_STORE),
        observer
    ], NewComp);
    return NewComp;
}
export default FilterItemsHOC(FilterItems);
//# sourceMappingURL=FilterItems.hoc.js.map