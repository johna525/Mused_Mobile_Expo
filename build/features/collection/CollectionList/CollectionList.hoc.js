var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
import React, { Component } from 'react';
import { inject, observer } from 'mobx-react';
import CollectionList from './CollectionList';
import { Header, COLLECTION, BROWSE } from '../../shared';
import { ROOT_STORE } from '../../stores';
function CollectionHOC(Collection) {
    let NewComp = class NewComp extends Component {
        constructor() {
            super(...arguments);
            this._goToNext = (slotNumber, alternatives, originSlots) => {
                const { root: { ui, slots }, navigation } = this.props;
                const { navigate } = ui;
                const { setSlotNumber } = slots;
                setSlotNumber(slotNumber);
                const collectionFrom = navigation.getParam('from', 'newsfeed');
                navigate(BROWSE, COLLECTION, { from: 'collection', collectionFrom, alternatives, onBack: () => this.onBack(originSlots) });
            };
            this.onBack = (slots) => {
                const { root: { products: { getCollection } } } = this.props;
                getCollection(slots);
            };
            //   _goToBrowse = (slotNumber: number, alternatives: number[]) => {
            //     const { root: { ui, slots } } = this.props;
            //     const { navigate } = ui;
            //     const { setSlotNumber } = slots;
            //     setSlotNumber(slotNumber);
            //     navigate(BROWSE, COLLECTION, {alternatives, transition: 'opacityTransition'});
            //   }
        }
        componentDidMount() {
        }
        render() {
            const { root: { ui, products }, navigation } = this.props;
            const { currentRoute } = ui;
            const { listOfCollection, getCollection, isFromOutfit, listOfBookmarks, createBookmark, deleteBookmarkById } = products;
            return (React.createElement(Collection, { listOfCollection: listOfCollection, getCollection: getCollection, navigation: navigation, currentRoute: currentRoute, goToNext: this._goToNext, listOfBookmarks: listOfBookmarks, createBookmark: createBookmark, deleteBookmarkById: deleteBookmarkById, isFromOutfit: isFromOutfit }));
        }
    };
    NewComp.navigationOptions = ({ navigation }) => {
        return {
            header: React.createElement(Header, { navigation: navigation })
        };
    };
    NewComp = __decorate([
        inject(ROOT_STORE),
        observer
    ], NewComp);
    return NewComp;
}
export default CollectionHOC(CollectionList);
//# sourceMappingURL=CollectionList.hoc.js.map