var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import React, { PureComponent } from 'react';
import { View, FlatList, Animated, TouchableHighlight } from 'react-native';
import { makeId } from '../../services';
import theme from './theme';
export default class SlotMachineItem extends PureComponent {
    constructor() {
        super(...arguments);
        this._renderItemImage = (props) => {
            return (React.createElement(Animated.Image, { key: props.index, style: [theme.itemImage, { opacity: this.props.fadeOpacity }], source: props.item.img, resizeMode: 'contain' }));
        };
        this._slotMachineEffect = (newProps) => __awaiter(this, void 0, void 0, function* () {
            const { animate, changeArrayImages, slotNumber, newImgUrl, setSlotNumber, setNewImgUrl, setSlotMachineEffect, isBrowseSlotMachine, setSecondSlotNumber, secondSlotNumber } = newProps;
            const _newImgUrl = Object.assign({}, newImgUrl);
            yield new Promise((resolve) => __awaiter(this, void 0, void 0, function* () {
                yield setTimeout(() => {
                    this._flatList && this._flatList.scrollToEnd({ animated: true });
                }, 400);
                yield setTimeout(() => {
                    animate();
                }, 800);
                setTimeout(() => { resolve(); }, 1000);
            }));
            if (isBrowseSlotMachine) {
                yield changeArrayImages(slotNumber, _newImgUrl);
                yield setSlotNumber(_newImgUrl.id);
            }
            else {
                yield changeArrayImages(secondSlotNumber, _newImgUrl);
                if (slotNumber === secondSlotNumber) {
                    setSecondSlotNumber(_newImgUrl.id);
                    setSlotNumber(_newImgUrl.id);
                }
                else {
                    setSecondSlotNumber(_newImgUrl.id);
                }
            }
            yield setNewImgUrl(null);
            setSlotMachineEffect(false);
        });
    }
    componentWillReceiveProps(newProps) {
        if (newProps.newImgUrl && (!this.props.newImgUrl || newProps.newImgUrl.id !== this.props.newImgUrl.id)) {
            this._slotMachineEffect(newProps);
        }
    }
    render() {
        const { showContextMenu, showBorder, arrayImgs } = this.props;
        return (React.createElement(View, { style: theme.scrolledItemWrapper, key: makeId() },
            React.createElement(TouchableHighlight, { style: [theme.collectionItem, showBorder ? theme.collectionOpacity : {}], onPress: () => showContextMenu(), underlayColor: 'transparent' },
                React.createElement(FlatList, { data: arrayImgs, renderItem: this._renderItemImage, keyExtractor: (item) => `${item.id}`, scrollEnabled: false, showsHorizontalScrollIndicator: false, showsVerticalScrollIndicator: false, inverted: true, ref: node => {
                        this._flatList = node;
                    }, refreshing: false }))));
    }
}
//# sourceMappingURL=SlotMachineItem.js.map