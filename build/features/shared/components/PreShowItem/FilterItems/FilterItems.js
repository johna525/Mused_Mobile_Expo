import React, { Component } from 'react';
import { Animated, } from 'react-native';
import theme from '../theme';
import SlotMachineItem from '../SlotMachineItem';
import { changeOrderProductsImages, makeId } from '../../../services';
export default class FilterItems extends Component {
    constructor() {
        super(...arguments);
        this._renderFilterList = () => {
            const { arrayImgs, newImgUrl, setNewImgUrl, changeArrayImages, setSecondSlotNumber, setSlotNumber, secondSlotNumber, slotNumber, setSlotMachineEffect } = this.props;
            return arrayImgs.map((slotProduct, index) => {
                if (slotProduct.id === secondSlotNumber) {
                    let _arrayImgs = changeOrderProductsImages(arrayImgs, secondSlotNumber);
                    if (newImgUrl) {
                        _arrayImgs.splice(-1, 1);
                        _arrayImgs.push({ img: newImgUrl.img, id: makeId() });
                    }
                    return (React.createElement(SlotMachineItem, { arrayImgs: _arrayImgs, key: index, slotNumber: slotNumber, newImgUrl: newImgUrl, setNewImgUrl: setNewImgUrl, animate: this._animate, changeArrayImages: changeArrayImages, fadeOpacity: this.props.fadeAnim, showBorder: false, setSlotNumber: setSlotNumber, setSecondSlotNumber: setSecondSlotNumber, showContextMenu: () => { }, setSlotMachineEffect: setSlotMachineEffect, secondSlotNumber: secondSlotNumber, isBrowseSlotMachine: false }));
                }
                return (React.createElement(Animated.Image, { style: [theme.itemImage, { opacity: this.props.fadeAnim }], source: slotProduct.img, key: index }));
            });
        };
        this._animate = () => {
            this.props.animate();
        };
    }
    render() {
        return this._renderFilterList();
    }
}
//# sourceMappingURL=FilterItems.js.map