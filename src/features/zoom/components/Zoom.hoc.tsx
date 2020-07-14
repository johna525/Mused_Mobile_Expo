import React, { Component } from 'react';
import { inject, observer } from 'mobx-react';
import Zoom from './Zoom';

import { ROOT_STORE } from '../../stores';
import { ZOOM, BROWSE } from '../../shared/routesKeys';

type Props = {
    navigation: any;
    root?: RootStore;
    showContent?: boolean;
};
function ZoomHOC(Zoom: any) {
    @inject(ROOT_STORE)

    @observer
    class NewComp extends Component<Props> {
      
        render() {
            const { root: { ui, products }, navigation } = this.props;
            const { setPrevCurrentRoutes, prevRoute, goBack } = ui;
            const { createBookmark, deleteBookmarkById, listOfBookmarks } = products;
            return <Zoom
                        setPrevCurrentRoutes={setPrevCurrentRoutes}
                        prevRoute={prevRoute}
                        navigation={navigation}
                        createNewStyle={this.createStyleWithMused}
                        goBack={goBack}
                        createBookmark={createBookmark}
                        deleteBookmarkById={deleteBookmarkById}
                        listOfBookmarks={listOfBookmarks}
                  />
        }

        createStyleWithMused = (product: ProductImage, category: string) => {
            const { root: { products, slots, ui } } = this.props;
            const { createStyleWithMused, getNewProducts, setBrowseType } = products;
            const { setSlotNumber } = slots;
            const { navigate } = ui;
            createStyleWithMused(product);
            setBrowseType(1);
            getNewProducts(category);
            setSlotNumber(-1);
            navigate(BROWSE, ZOOM, {from: 'zoom'});
        }
    }
    return NewComp;
  }

export default ZoomHOC(Zoom);
