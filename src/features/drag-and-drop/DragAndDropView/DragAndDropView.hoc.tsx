import React, { Component } from 'react';
import { inject, observer } from 'mobx-react';
import DragAndDropView from './DragAndDropView';
import { Header, ZOOM, VIEW } from '../../shared';
import { ROOT_STORE } from '../../stores';
import * as API from '../../../services/api';

type Props = {
    navigation: any;
    root: RootStore;
};
function DragAndDropViewHOC(DragAndDropView: any) {
    @inject(ROOT_STORE)
    @observer
    class NewComp extends Component<Props> {
      static navigationOptions: ([string]: any) => HashMap<Object> = ({ navigation }) => {
        return {
            header: <Header navigation={navigation} />
        } 
      };

      render() {
          const { root: { products, slots } } = this.props;
          const { getProductsByCategory, allProducts, categoryInDrag, listOfProductsByCategories, arrayImages, resetProductsByCategory, toggleViewCategory } = products;
          const { getSixthSlot, addOrReplaceSixthSlot } = slots;
          const _dragrabbleItems = 
            Boolean(getSixthSlot)
              ? [...arrayImages, getSixthSlot]
              : arrayImages
        return <DragAndDropView
                    dragrabbleItems={_dragrabbleItems}
                    sixthSlot={getSixthSlot}
                    listOfProductsByCategories={listOfProductsByCategories}
                    getProductsByCategory={getProductsByCategory}
                    addOrReplaceSixthSlot={addOrReplaceSixthSlot}
                    navigateToProductSingle={this._navigateToProductSingle}
                    resetProductsByCategory={resetProductsByCategory}
                    hasSixthSlot={Boolean(getSixthSlot)}
                    categoryInDrag={categoryInDrag}
                    toggleViewCategory={toggleViewCategory}
                    allProducts={allProducts}
                />
      }
      _navigateToProductSingle = (product: Product) => {
        const { root: { ui } } = this.props;
        const {  navigate } = ui;
        API.RegisterEvent("Vw-sidebarDetails", {
          actionType: 'Click sidebar text details'
        })
        navigate(ZOOM, VIEW, {product});
      }
    }
    return NewComp;
  }

export default DragAndDropViewHOC(DragAndDropView);