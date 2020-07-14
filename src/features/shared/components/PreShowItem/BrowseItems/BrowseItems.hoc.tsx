import React, { Component } from 'react';
import { Animated } from 'react-native';
import { inject, observer } from 'mobx-react';
import BrowseItems from './BrowseItems';

import { ROOT_STORE } from '../../../../stores';

type Props = {
    root?: RootStore;
    animate: () => void;
    fadeAnim: Animated.AnimatedValue;
};
function BrowseItemsHOC(BrowseItems: any) {

    @inject(ROOT_STORE)
    @observer
    class NewComp extends Component<Props> {
      render() {
          const { root: { ui, products, slots, user}, animate, fadeAnim } = this.props;
          const { contextMenuIsVisible }  = ui;
          const { arrayImages, moveImageToLeft } = products;
          const { setHighlightButtonText } = user;
          const { 
            setSlotNumber,
            slotNumber, 
            newImgUrl,
            setNewImgUrl,
            isMoveProduct,
            secondSlotNumber,
            setSlotMachineEffect
          } = slots;
        return <BrowseItems
                    arrayImgs={arrayImages}
                    setSlotNumber={setSlotNumber}
                    slotNumber={slotNumber}
                    newImgUrl={newImgUrl}
                    setNewImgUrl={setNewImgUrl}
                    changeArrayImages={this._changeArrayImages}
                    showContextMenu={this._showContextMenu}
                    hideContextMenu={this._hideContextMenu}
                    isMoveProduct={isMoveProduct}
                    contextMenuIsVisible={contextMenuIsVisible}
                    secondSlotNumber={secondSlotNumber}
                    moveImageToLeft={moveImageToLeft}
                    moveSlotLeft={this._moveSlotLeft}
                    animate={animate}
                    fadeAnim={fadeAnim}
                    setSlotMachineEffect={setSlotMachineEffect}
                    checkAnonUser={this._checkAnonUser}
                    setHighlightButtonText={setHighlightButtonText}
                />
      }

      _checkAnonUser = () => {
        const { root: { ui, user } } = this.props;
        const { requestAuth }  = ui;
        const { userProfile } = user;
        console.log('Checking Anonymous User...')
        if(userProfile && userProfile.email === 'anonymous') requestAuth(true)
      }

      _changeArrayImages = (slotNumber: number, newImgUrl: ProductImage ) => {
        const { root: { products } } = this.props;
          const { changeArrayImages } = products;
          changeArrayImages(slotNumber, newImgUrl);
      }

      _showContextMenu = (index: number | string) => {
        const { root: { slots: { setSecondSlotNumber }, ui: { toggleContextMenu } } } = this.props;
          toggleContextMenu(true);
          setSecondSlotNumber(index);
      }

      _hideContextMenu = () => {
        const { root: { slots: { setSecondSlotNumber }, ui: { toggleContextMenu } } } = this.props;
          toggleContextMenu(false);
          setSecondSlotNumber(null);
      }

      _moveImage =  () => {
        const { root: { products: { moveImageToLeft, arrayImages }, slots: { secondSlotNumber } } } = this.props;
        const index: number = arrayImages.findIndex((item: ProductImage) => item.id === secondSlotNumber);
        moveImageToLeft(index);
      }

      _moveSlotLeft = async () => {
        const { animate, root: { slots} } = this.props;
        const { 
          setMoveProduct,
        } = slots;
        await new Promise( async (resolve) => {
            await setTimeout(() =>  {
            setMoveProduct(false);
            this._moveImage();
            }, 400);
           resolve();
          });
          animate();
    }
    }
    return NewComp;
  }

export default BrowseItemsHOC(BrowseItems);