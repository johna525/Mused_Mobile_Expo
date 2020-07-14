import React, { Component } from 'react';
import { Animated } from 'react-native';
import { inject, observer } from 'mobx-react';
import FilterItems from './FilterItems';

import { ROOT_STORE } from '../../../../stores';

type Props = {
    root?: RootStore;
    animate: () => void;
    fadeAnim: Animated.AnimatedValue;
};
function FilterItemsHOC(FilterItems: any) {

    @inject(ROOT_STORE)
    @observer
    class NewComp extends Component<Props> {
      render() {
          const { root: { products, slots}, animate, fadeAnim} = this.props;
          const { arrayImages } = products;
          const { 
            slotNumber, 
            newImgUrl,
            setNewImgUrl,
            secondSlotNumber,
            setSecondSlotNumber,
            setSlotMachineEffect,
            setSlotNumber
          } = slots;
        return <FilterItems
                    arrayImgs={arrayImages}
                    setSecondSlotNumber={setSecondSlotNumber}
                    slotNumber={slotNumber}
                    newImgUrl={newImgUrl}
                    setNewImgUrl={setNewImgUrl}
                    changeArrayImages={this._changeArrayImages}
                    secondSlotNumber={secondSlotNumber}
                    setSlotNumber={setSlotNumber}
                    animate={animate}
                    fadeAnim={fadeAnim}
                    setSlotMachineEffect={setSlotMachineEffect}
                />
      }
      _changeArrayImages = (slotNumber: number ) => {
        const { root: { products, slots } } = this.props;
          const { changeArrayImages } = products;
          const { newImgUrl } = slots;
          changeArrayImages(slotNumber, newImgUrl);
      }

    }
    return NewComp;
  }

export default FilterItemsHOC(FilterItems);