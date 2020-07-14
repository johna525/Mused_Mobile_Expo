var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import React, { Component } from 'react';
import { inject, observer } from 'mobx-react';
import MyAccount from './MyAccount';
import { ROOT_STORE } from '../stores';
import { ZOOM, MYACCOUNT, COLLECTION } from '../shared/routesKeys';
import { Header } from '../shared';
function MyAccountHoc(Account) {
    let MyAccount = class MyAccount extends Component {
        constructor() {
            super(...arguments);
            this._onClickBookmark = (productId) => {
                const { root: { products: { deleteBookmarkById } } } = this.props;
                deleteBookmarkById(productId);
            };
            this._onClickCollection = (param) => __awaiter(this, void 0, void 0, function* () {
                const { root: { ui, user, products } } = this.props;
                const { navigate } = ui;
                const { userProfile } = user;
                const { getCollection, setFromOutfit, resetArrayImages } = products;
                setFromOutfit(true);
                yield resetArrayImages();
                getCollection(param.productIds);
                const params = Object.assign({}, param, { authorItem: Object.assign({}, param.authorItem, { authorName: userProfile.firstName + ' ' + userProfile.lastName }), from: 'outfit' });
                navigate(COLLECTION, MYACCOUNT, params);
            });
            this._onClickProduct = (product) => {
                const { root: { ui: { navigate } } } = this.props;
                navigate(ZOOM, MYACCOUNT, { product });
            };
        }
        componentDidMount() {
            const { root: { posts: { getPosts } } } = this.props;
            getPosts();
        }
        render() {
            const { root: { products, posts, ui } } = this.props;
            const { listOfPosts } = posts;
            const { listOfBookmarks, getMyRecentOutfit, getMyOutfitSlots, listOfCollection, getCollection } = products;
            const { navigation } = ui;
            return React.createElement(Account, { navigation: navigation, onClickProduct: this._onClickProduct, onClickBookmark: this._onClickBookmark, onClickCollection: this._onClickCollection, listOfPosts: listOfPosts, listOfBookmarks: listOfBookmarks, productStore: products, myOutFit: getMyRecentOutfit, myOutfitSlots: getMyOutfitSlots, listOfCollection: listOfCollection, getCollection: getCollection });
        }
    };
    MyAccount.navigationOptions = ({ navigation }) => {
        return {
            header: React.createElement(Header, { navigation: navigation })
        };
    };
    MyAccount = __decorate([
        inject(ROOT_STORE),
        observer
    ], MyAccount);
    return MyAccount;
}
export default MyAccountHoc(MyAccount);
//# sourceMappingURL=MyAccount.hoc.js.map