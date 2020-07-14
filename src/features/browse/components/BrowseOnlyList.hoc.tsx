import React, { Component } from 'react';
import { inject, observer } from 'mobx-react';
import BrowseList from './BrowseOnlyList';
import { Header, BROWSE_ONLY, COLLECTION_ZOOM } from '../../shared';
import { ROOT_STORE } from '../../stores';
type Props = {
    navigation: any;
    root: RootStore;
};
type State = {
    numberOfLoad: number
};
function BrowseHOC(Browse: any) {
    @inject(ROOT_STORE)
    @observer
    class NewComp extends Component<Props, State> {
        static navigationOptions: ([string]: any) => HashMap<Object> = ({ navigation }) => {
            return {
                header: <Header navigation={navigation} />
            } 
        };
        state: State = {
            numberOfLoad: 10,
        }
        prevProducts: any;
        componentWillMount() {
            const { root: { products: { resetAlternativies, setBrowseType }}} = this.props;
            resetAlternativies();
            setBrowseType(2);
            console.log('reset alternatives...')
        }

        render() {
            const { root: { slots, products, ui }, navigation } = this.props;
            const { contextMenuIsVisible } = ui;
            const { setNewImgUrl, isSlotMachine } = slots;
            const { listOfbrowseOnlyProducts, getAlternatives, getNewProducts, createBookmark, listOfBookmarks, deleteBookmarkById, arrayImages, noResult } = products;
            if(JSON.stringify(listOfbrowseOnlyProducts) !== this.prevProducts) {
                this.setState({numberOfLoad: 10})
                this.prevProducts = JSON.stringify(listOfbrowseOnlyProducts)
            }
            return <Browse
                        navigation={navigation}
                        setNewImgUrl={setNewImgUrl}
                        navigateToProductSingle={this._navigateToProductSingle}
                        hideContextMenu={this._hideContextMenu}
                        isSlotMachine={isSlotMachine}
                        listOfProducts={listOfbrowseOnlyProducts.slice(0, this.state.numberOfLoad)}
                        AllList={listOfbrowseOnlyProducts}
                        getAlternatives={getAlternatives}
                        createBookmark={createBookmark}
                        listOfBookmarks={listOfBookmarks}
                        deleteBookmarkById={deleteBookmarkById}
                        contextMenuIsVisible={contextMenuIsVisible}
                        arrayImages={arrayImages}
                        noResult={noResult}   
                        getNewProducts={getNewProducts}    
                        onScrollEndDrag={(nativeEvent: any) => this.onScrollEndDrag(nativeEvent)}                 
                    />
        }

        onScrollEndDrag(nativeEvent: any) {
            const { contentOffset, layoutMeasurement, contentSize } = nativeEvent;    
            if(layoutMeasurement.height + contentOffset.y > contentSize.height - 350) {
              this.setState({numberOfLoad: this.state.numberOfLoad + 10})
            }
          }

        _navigateToProductSingle = (product: Product) => {
            const { root: { ui } } = this.props;
            const {  navigate } = ui;
            navigate(COLLECTION_ZOOM, BROWSE_ONLY, {product});
        }

        _hideContextMenu = () => {
            const { root: { ui, slots } } = this.props;
            const {  toggleContextMenu, contextMenuIsVisible  } = ui;
            const { setSecondSlotNumber } = slots;
            if (contextMenuIsVisible) {
                toggleContextMenu(false);
            }
            setSecondSlotNumber(null);
        }
    }
    return NewComp;
  }

export default BrowseHOC(BrowseList);