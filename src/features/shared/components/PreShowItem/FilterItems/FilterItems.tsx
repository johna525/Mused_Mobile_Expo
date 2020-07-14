import React, { Component } from 'react';
import {
  Animated, 
} from 'react-native';

import theme from '../theme';
import SlotMachineItem from '../SlotMachineItem';
import { changeOrderProductsImages, makeId } from '../../../services';

type Props = {
    arrayImgs: ProductImage[];
    slotNumber: number;
    secondSlotNumber: number;
    newImgUrl: ProductImage | null;
    setNewImgUrl: (newImgUrl: ProductImage) => void;
    changeArrayImages: (slotNumber: number) => void;
    setSecondSlotNumber: (slotNumber: number | string) => void;
    setSlotNumber: (slotNumber: number | string) => void;
    animate: () => void;
    fadeAnim: Animated.AnimatedValue;
    setSlotMachineEffect: (flag: boolean) => void;
}
export default class FilterItems extends Component<Props> {

    render() {
        return this._renderFilterList();
    }


        _renderFilterList = () => {
            const { arrayImgs, newImgUrl, setNewImgUrl, changeArrayImages, setSecondSlotNumber, setSlotNumber, secondSlotNumber, slotNumber, setSlotMachineEffect } = this.props;
            return arrayImgs.map( (slotProduct: ProductImage, index: number)  => {
                if (slotProduct.id === secondSlotNumber) {
                    let _arrayImgs: ProductImage[] = changeOrderProductsImages(arrayImgs, secondSlotNumber);
                    if (newImgUrl) {
                        _arrayImgs.splice(-1,1);
                        _arrayImgs.push({img: newImgUrl.img, id: makeId()});
                    }
                    return (
                        <SlotMachineItem 
                            arrayImgs={_arrayImgs}
                            key={index}
                            slotNumber={slotNumber}
                            newImgUrl={newImgUrl}
                            setNewImgUrl={setNewImgUrl}
                            animate={this._animate}
                            changeArrayImages={changeArrayImages}
                            fadeOpacity={this.props.fadeAnim}
                            showBorder={false}
                            setSlotNumber={setSlotNumber}
                            setSecondSlotNumber={setSecondSlotNumber}
                            showContextMenu={() => {}} 
                            setSlotMachineEffect={setSlotMachineEffect}
                            secondSlotNumber={secondSlotNumber}
                            isBrowseSlotMachine={false} />
                    )
                }
                return (
                        <Animated.Image
                            style={[theme.itemImage, {opacity: this.props.fadeAnim}]}
                            source={slotProduct.img}
                            key={index}
                             />
                )
            }     
            )};

        _animate = () => {
            this.props.animate();
        }
 }