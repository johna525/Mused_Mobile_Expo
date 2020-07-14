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
import { inject, observer } from 'mobx-react';
import BrowseItems from './BrowseItems';
import { ROOT_STORE } from '../../../../stores';
function BrowseItemsHOC(BrowseItems) {
    let NewComp = class NewComp extends Component {
        constructor() {
            super(...arguments);
            this._checkAnonUser = () => {
                const { root: { ui, user } } = this.props;
                const { requestAuth } = ui;
                const { userProfile } = user;
                console.log('Checking Anonymous User...');
                if (userProfile && userProfile.email === 'anonymous')
                    requestAuth(true);
            };
            this._changeArrayImages = (slotNumber, newImgUrl) => {
                const { root: { products } } = this.props;
                const { changeArrayImages } = products;
                changeArrayImages(slotNumber, newImgUrl);
            };
            this._showContextMenu = (index) => {
                const { root: { slots: { setSecondSlotNumber }, ui: { toggleContextMenu } } } = this.props;
                toggleContextMenu(true);
                setSecondSlotNumber(index);
            };
            this._hideContextMenu = () => {
                const { root: { slots: { setSecondSlotNumber }, ui: { toggleContextMenu } } } = this.props;
                toggleContextMenu(false);
                setSecondSlotNumber(null);
            };
            this._moveImage = () => {
                const { root: { products: { moveImageToLeft, arrayImages }, slots: { secondSlotNumber } } } = this.props;
                const index = arrayImages.findIndex((item) => item.id === secondSlotNumber);
                moveImageToLeft(index);
            };
            this._moveSlotLeft = () => __awaiter(this, void 0, void 0, function* () {
                const { animate, root: { slots } } = this.props;
                const { setMoveProduct, } = slots;
                yield new Promise((resolve) => __awaiter(this, void 0, void 0, function* () {
                    yield setTimeout(() => {
                        setMoveProduct(false);
                        this._moveImage();
                    }, 400);
                    resolve();
                }));
                animate();
            });
        }
        render() {
            const { root: { ui, products, slots, user }, animate, fadeAnim } = this.props;
            const { contextMenuIsVisible } = ui;
            const { arrayImages, moveImageToLeft } = products;
            const { setHighlightButtonText } = user;
            const { setSlotNumber, slotNumber, newImgUrl, setNewImgUrl, isMoveProduct, secondSlotNumber, setSlotMachineEffect } = slots;
            return React.createElement(BrowseItems, { arrayImgs: arrayImages, setSlotNumber: setSlotNumber, slotNumber: slotNumber, newImgUrl: newImgUrl, setNewImgUrl: setNewImgUrl, changeArrayImages: this._changeArrayImages, showContextMenu: this._showContextMenu, hideContextMenu: this._hideContextMenu, isMoveProduct: isMoveProduct, contextMenuIsVisible: contextMenuIsVisible, secondSlotNumber: secondSlotNumber, moveImageToLeft: moveImageToLeft, moveSlotLeft: this._moveSlotLeft, animate: animate, fadeAnim: fadeAnim, setSlotMachineEffect: setSlotMachineEffect, checkAnonUser: this._checkAnonUser, setHighlightButtonText: setHighlightButtonText });
        }
    };
    NewComp = __decorate([
        inject(ROOT_STORE),
        observer
    ], NewComp);
    return NewComp;
}
export default BrowseItemsHOC(BrowseItems);
//# sourceMappingURL=BrowseItems.hoc.js.map