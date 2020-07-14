import React, { Component } from 'react';
import { inject, observer } from 'mobx-react';
import CollectionItems from './CollectionItems';

import { ROOT_STORE } from '../../../../stores';
type Props = {
    root?: RootStore;
};
function CollectionItemsHOC(CollectionItems: any) {
    @inject(ROOT_STORE)
    @observer
    class NewComp extends Component<Props> {
      render() {
          const { root: { products } } = this.props;
          const { arrayImages } = products;
        return <CollectionItems
                    arrayImgs={arrayImages}
                />
      }
    }
    return NewComp;
  }

export default CollectionItemsHOC(CollectionItems);