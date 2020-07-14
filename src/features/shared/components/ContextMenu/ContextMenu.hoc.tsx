import React, { Component } from 'react';
import { inject, observer } from 'mobx-react';
import ContextMenu from './ContextMenu';
import { ROOT_STORE } from '../../../stores';
import { ZOOM, BROWSE, FILTER } from '../../routesKeys';
import * as API from '../../../../services/api';

type Props = {
    root?: RootStore;
};
function ContextMenuHOC(ContextMenu: any) {
    @inject(ROOT_STORE)
    @observer
    class NewComp extends Component<Props> {
      render() {
          const { root: { ui } } = this.props;
          const { contextMenuIsVisible, currentRoute }  = ui;
          const isBrowse: boolean = currentRoute === BROWSE;
        return (
            contextMenuIsVisible &&  isBrowse && 
            <ContextMenu
                goToZoomPage={this._goToZoomPage}
                goToFilterPage={this._goToFilterPage}
                moveImage={this._moveImage}
            />
              )
      }
      _goToZoomPage = () => {
        const { root: { products, ui: { navigate}, slots: { secondSlotNumber } } } = this.props;
        const { listOfAlternatives, listOfCollection} = products;
        const product: Product = [...listOfAlternatives, ...listOfCollection].find(
          (product: Product) => product.id === secondSlotNumber);
        API.RegisterEvent("Br-contextDetails", {
          actionType: "Click contextual menu 'Details'"
        })
        navigate(ZOOM, BROWSE, {product});
      }
      _goToFilterPage = () => {
        const { root: { ui: { navigate, toggleContextMenu}, slots: { secondSlotNumber, setSlotNumber}}} = this.props;
        navigate(FILTER, BROWSE);
        API.RegisterEvent("Br-contextSwitch", {
          actionType: "Click contextual menu 'Switch'"
        })
        toggleContextMenu(false);
        secondSlotNumber && setSlotNumber(secondSlotNumber);
      }
      _moveImage =  () => {
        const { root: { slots: { setMoveProduct} } } = this.props;
        API.RegisterEvent("Br-contextMove", {
          actionType: "Click contextual menu 'Move'"
        })
        setMoveProduct(true);
      }
    }
    return NewComp;
  }

export default ContextMenuHOC(ContextMenu);