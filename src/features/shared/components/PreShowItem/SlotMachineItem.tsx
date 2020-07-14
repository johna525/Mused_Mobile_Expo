import React, { PureComponent } from 'react';
import {
  View,
  FlatList,
  Animated,
  TouchableHighlight
} from 'react-native';

import { makeId } from '../../services';
import theme from './theme';

type Props = {
    arrayImgs: ProductImage[];
    slotNumber: number;
    secondSlotNumber?: number;
    newImgUrl: ProductImage | null;
    fadeOpacity: Animated.Value;
    showBorder: boolean;
    setNewImgUrl: (newImgUrl: ProductImage) => void;
    animate: () => void;
    changeArrayImages: (slotNumber: number, newSlot: ProductImage) => void;
    showContextMenu: () => void;
    setSlotNumber: (slotNumber: number | string) => void;
    setSecondSlotNumber?: (slotNumber: number | string) => void;
    setSlotMachineEffect?: (flag: boolean) => void;
    isBrowseSlotMachine: boolean;
}

export default class SlotMachineItem extends PureComponent<Props> {
    _flatList: any;
    
    componentWillReceiveProps(newProps: Props) {
        if (newProps.newImgUrl && (!this.props.newImgUrl || newProps.newImgUrl.id !== this.props.newImgUrl.id)) {
           this._slotMachineEffect(newProps);
        }

    }
    render() {
        const { showContextMenu, showBorder, arrayImgs } = this.props;
        return (
           
                    <View style={theme.scrolledItemWrapper} key={makeId()}>
                     <TouchableHighlight style={[theme.collectionItem, showBorder ? theme.collectionOpacity : {} ]} onPress={() => showContextMenu()} underlayColor={'transparent'}>
                        <FlatList
                            data={arrayImgs}
                            renderItem={this._renderItemImage}
                            keyExtractor={ (item: ProductImage) => `${item.id}`}
                            scrollEnabled={false}
                            showsHorizontalScrollIndicator={false}
                            showsVerticalScrollIndicator={false}
                            inverted={true}
                            ref={node => {
                                this._flatList = node;
                              }}
                              refreshing={false}
                            />
                        </TouchableHighlight>
                    </View>
        )
    }

    _renderItemImage = (props: {item: ProductImage, index: number}) => {
        return (
            <Animated.Image
                key={props.index}
                style={[theme.itemImage, {opacity: this.props.fadeOpacity}]}
                source={props.item.img}
                resizeMode={'contain'} />
        )
      }

      _slotMachineEffect = async (newProps: Props) => {
          const {  animate, changeArrayImages, slotNumber, newImgUrl, setSlotNumber, setNewImgUrl, setSlotMachineEffect, isBrowseSlotMachine, setSecondSlotNumber, secondSlotNumber} = newProps;
          const _newImgUrl: ProductImage = {...newImgUrl};
          await new Promise( async (resolve) => {
            await setTimeout(() =>  {
                this._flatList && this._flatList.scrollToEnd({animated: true});
            }, 400);
            await setTimeout(() =>  {
                animate();
            }, 800);
            
            setTimeout( () => {resolve()}, 1000);
          });
          
          if (isBrowseSlotMachine) {
            await changeArrayImages(slotNumber, _newImgUrl);
            await setSlotNumber(_newImgUrl.id);
          } else {
            await changeArrayImages(secondSlotNumber, _newImgUrl);
              if (slotNumber === secondSlotNumber) {
                setSecondSlotNumber(_newImgUrl.id);
                setSlotNumber(_newImgUrl.id)
              } else {
                setSecondSlotNumber(_newImgUrl.id);
              }
          }
          
          await setNewImgUrl(null);
          setSlotMachineEffect(false);    
      }

 }