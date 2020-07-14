import React, { Component } from 'react';
import { inject, observer } from 'mobx-react';

import CollectionList from './CollectionList';
import { Header, COLLECTION, BROWSE } from '../../shared';
import { ROOT_STORE } from '../../stores';
type Props = {
    navigation: any;
    root: RootStore;
};
function CollectionHOC(Collection: any) {
    @inject(ROOT_STORE)
    @observer
    class NewComp extends Component<Props> {

        static navigationOptions: ([string]: any) => HashMap<Object> = ({ navigation }) => {
            return {
                header: <Header navigation={navigation} />
            }
        };

        componentDidMount() {
            
        }

        render() {
            const { root: { ui, products }, navigation } = this.props;
            const { currentRoute }  = ui;
            const { listOfCollection, getCollection, isFromOutfit, listOfBookmarks, createBookmark, deleteBookmarkById} = products;
            return (
                <Collection 
                    listOfCollection={listOfCollection} 
                    getCollection={getCollection} 
                    navigation={navigation}
                    currentRoute={currentRoute}
                    goToNext={this._goToNext}
                    listOfBookmarks={listOfBookmarks}
                    createBookmark={createBookmark}
                    deleteBookmarkById={deleteBookmarkById}
                    isFromOutfit={isFromOutfit}
                />
            ) 
        }

        _goToNext = (slotNumber: number, alternatives: number[], originSlots: Slot[]) => {
            const { root: { ui, slots }, navigation } = this.props;
            const { navigate } = ui;
            const { setSlotNumber } = slots;
            setSlotNumber(slotNumber);
            const collectionFrom = navigation.getParam('from', 'newsfeed');
            navigate(BROWSE, COLLECTION, {from: 'collection', collectionFrom, alternatives, onBack: () => this.onBack(originSlots)});
        }      

        onBack = (slots: Slot[]) => {
            const { root: { products: { getCollection } } } = this.props;
            getCollection(slots)
        }

    //   _goToBrowse = (slotNumber: number, alternatives: number[]) => {
    //     const { root: { ui, slots } } = this.props;
    //     const { navigate } = ui;
    //     const { setSlotNumber } = slots;
    //     setSlotNumber(slotNumber);
    //     navigate(BROWSE, COLLECTION, {alternatives, transition: 'opacityTransition'});
    //   }
    }
    return NewComp;
  }

export default CollectionHOC(CollectionList);