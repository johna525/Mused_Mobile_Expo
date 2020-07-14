import React, { Component } from 'react';
import { inject, observer } from 'mobx-react';

import CollectionItem from './CollectionItem';
import { COLLECTION, COLLECTION_ZOOM } from '../../shared';
import { ROOT_STORE } from '../../stores';
import * as API from '../../../services/api';

type Props = {
    navigation?: any;
    root?: RootStore;
    item: Product;
    countAlter: string;
    goToNext: (slotNumber: number, alternatives: number[]) => void;
    onLoadImage: () => void;
    alternatives: number[];
    index: number;
};
function CollectionItemHOC(CollectionItem: any) {
    @inject(ROOT_STORE)
    @observer
    class NewComp extends Component<Props> {
      render() {
          const { root: { products }, item, countAlter, goToNext, onLoadImage, alternatives, index } = this.props;
          const { listOfBookmarks, createBookmark, deleteBookmarkById} = products;
        return <CollectionItem
                    listOfBookmarks={listOfBookmarks}
                    createBookmark={createBookmark}
                    deleteBookmarkById={deleteBookmarkById}
                    item={item}
                    countAlter={countAlter}
                    onLoadImage={onLoadImage}
                    goToNext={goToNext}
                    alternatives={alternatives}
                    index={index}
                    navigateToProductSingle={this._navigateToProductSingle}
                />
      }

      _navigateToProductSingle = (product: Product) => {
        const { root: { ui } } = this.props;
        const {  navigate } = ui;
        API.RegisterEvent("Cl-product", {
          actionType: "Click any product"
        });
        navigate(COLLECTION_ZOOM, COLLECTION, {product});
      }
    }
    return NewComp;
  }

export default CollectionItemHOC(CollectionItem);