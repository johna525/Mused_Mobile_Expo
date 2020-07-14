import React, { Component } from 'react';
import { inject, observer } from 'mobx-react';
import PreShowItems from './PreShowItems';
import { FILTER } from '../../index';
import { ROOT_STORE } from '../../../stores';
import * as API from '../../../../services/api';

type Props = {
    root?: RootStore;
};
function PreShowItemsHOC(PreShowItems: any) {
    @inject(ROOT_STORE)
    @observer
    class NewComp extends Component<Props> {
      render() {
          const { root: { ui, products} } = this.props;
          const { currentRoute }  = ui;
          const { arrayImages } = products;
        return <PreShowItems 
          currentRoute={currentRoute}
          onAddPreItem={this.onAddPreItem}
          arrayImages={arrayImages}
        />
      }
      onAddPreItem = () => {
        const { root: { products, slots } } = this.props;
        const { addNewSlot } = products;
        const { setSlotNumber } = slots;
        addNewSlot()
        setSlotNumber(-1)
        API.RegisterEvent("Br-add", {
          actionType: 'Click footer photo'
        })
        const { root: { ui } } = this.props;
        const {  navigate, currentRoute } = ui;
        navigate(FILTER, currentRoute, {goBack: () => this.onBack()});
      }
      onBack = () => {
        
      }
    }
    return NewComp;
  }

export default PreShowItemsHOC(PreShowItems);