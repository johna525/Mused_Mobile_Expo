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
import { observable, action } from 'mobx';
import moment from 'moment';
import lodash from 'lodash';
import { getProductsByIds, getProductsByCatsSubs, createOutfit, createBookmark, getBookmarksByUserId, deleteBookmark, getProductsByCategory, getProductsByCategoryInitial, getNewProducts, getOutfits, } from '../../services';
import { slotsOrder } from '../shared';
import * as API from '../../services/api';
export default class ObservableStore {
    constructor(root) {
        this.root = root;
        this.collection = [];
        this.alternatives = [];
        this.arrayImages = [];
        this.bookmarks = [];
        this.productsByCategories = [];
        this.categoryInDrag = '';
        this.toggleViewCategory = false;
        this.slots = [];
        this.noResult = false;
        this.allProducts = {};
        this.fromMenu = false;
        this.myRecentOutfit = [];
        this.allOutfitSlots = [];
        this.fromOutfit = false;
        this.recentNewProducts = [];
        this.browseOnlyProducts = [];
        this.setBrowseType = (type) => {
            if (type === 1)
                this.fromMenu = false;
            else
                this.fromMenu = true;
            console.log('fromMenu', type);
        };
        this.openProductCategory = () => {
            this.toggleViewCategory = true;
            this.resetProductsByCategory();
        };
        this.getAlternatives = (ids) => __awaiter(this, void 0, void 0, function* () {
            this.noResult = false;
            yield getProductsByIds(ids).then((products) => {
                if (this.fromMenu)
                    this.browseOnlyProducts = [...products];
                else
                    this.alternatives = [...products];
                if (this.alternatives.length === 0)
                    this.noResult = true;
            });
        });
        this.getDetailByProductId = (productId) => new Promise((resolve) => __awaiter(this, void 0, void 0, function* () {
            yield getProductsByIds([productId]).then((products) => {
                resolve(products[0]);
            });
        }));
        this.getAlternativesByFilter = () => __awaiter(this, void 0, void 0, function* () {
            if (this.fromMenu)
                this.browseOnlyProducts = [];
            else
                this.alternatives = [];
            this.noResult = false;
            yield getProductsByCatsSubs(this.root.filters.listOfCategory).then((products) => {
                console.log(products.length);
                if (this.fromMenu)
                    this.browseOnlyProducts = [...products];
                else
                    this.alternatives = [...products];
                if (products.length === 0)
                    this.noResult = true;
            });
        });
        this.resetCollection = () => {
            // this.alternatives = []
            this.getCollection(this.slots);
        };
        this.getCollection = (slots) => __awaiter(this, void 0, void 0, function* () {
            const ids = slots.map((slot) => slot.productId);
            this.slots = slots;
            this.noResult = false;
            yield getProductsByIds(ids).then((products) => {
                this.collection = slotsOrder(ids, products);
                if (this.collection.length === 0)
                    this.noResult = true;
            });
            this.arrayImages = this.collection.map((product) => {
                return {
                    img: { uri: product.image },
                    id: product.id,
                    category: product.category
                };
            });
        });
        this.setFromOutfit = (value) => {
            this.fromOutfit = value;
        };
        this.changeArrayImages = (slotNumber, newImg) => {
            const newArray = [...this.arrayImages];
            const indexSlot = newArray.findIndex((item) => item.id === slotNumber);
            newArray.splice(indexSlot, 1, newImg);
            this.arrayImages = newArray;
        };
        this.addNewSlot = () => {
            const newArray = [...this.arrayImages];
            const newImg = {
                img: undefined,
                id: -1
            };
            newArray.push(newImg);
            this.arrayImages = newArray;
        };
        this.cancelNewSlot = () => {
            let newArray = [];
            this.arrayImages.map((product) => {
                if (product.id !== -1)
                    newArray.push(product);
            });
            this.arrayImages = newArray;
        };
        this.createStyleWithMused = (product) => {
            const newArray = [product];
            const newImg = {
                img: undefined,
                id: -1
            };
            newArray.push(newImg);
            this.arrayImages = newArray;
        };
        this.resetArrayImages = () => {
            this.arrayImages = [];
            this.collection = [];
        };
        this.resetAlternativies = () => {
            if (this.fromMenu)
                this.browseOnlyProducts = [];
            else
                this.alternatives = [];
        };
        this.moveImageToLeft = (slotIndex) => {
            const newArrayImgs = [...this.arrayImages];
            const product = newArrayImgs.find((item, index) => {
                return item && index === slotIndex;
            });
            newArrayImgs.splice(slotIndex, 1);
            (slotIndex - 1) < 0
                ? newArrayImgs.push(product)
                : newArrayImgs.splice(slotIndex - 1, 0, product);
            this.arrayImages = newArrayImgs;
        };
        this.createNewOutfit = () => {
            if (this.root.user.userProfile === null)
                return;
            const outfit = {
                userEmail: this.root.user.userProfile.email,
                slots: this.arrayImages.map((product) => product.id),
                timestamp: moment().format()
            };
            createOutfit(outfit);
        };
        this.fetchMyOutfits = () => __awaiter(this, void 0, void 0, function* () {
            yield getOutfits().then((result) => {
                const temp = lodash.filter(result, function (o) {
                    return o.userEmail === API.client_email;
                });
                this.allOutfitSlots = temp;
                if (temp.length > 0) {
                    const recentSlots = temp[temp.length - 1].slots;
                    console.log('Recent Slots: ', recentSlots);
                    getProductsByIds(recentSlots).then((products) => {
                        this.myRecentOutfit = products;
                    });
                }
            });
        });
        this.createBookmark = (productId) => __awaiter(this, void 0, void 0, function* () {
            if (this.root.user.userProfile === null)
                return;
            const bookmark = {
                userEmail: this.root.user.userProfile.email,
                productId,
                timestamp: moment().format()
            };
            yield createBookmark(bookmark);
            yield this.getBookmarksByUserId();
        });
        this.getBookmarksByUserId = () => __awaiter(this, void 0, void 0, function* () {
            if (this.root.user.userProfile === null)
                return;
            yield getBookmarksByUserId(this.root.user.userProfile.email).then((bookmarks) => {
                //filter bookmarks
                const temp = lodash.filter(bookmarks, function (o) {
                    return o.productId !== null;
                });
                this.bookmarks = lodash.uniqBy(temp, 'productId');
                console.log(this.bookmarks.length);
            });
        });
        this.deleteBookmarkById = (_id) => __awaiter(this, void 0, void 0, function* () {
            yield deleteBookmark(_id);
            yield this.getBookmarksByUserId();
        });
        this.getProductsByCategory = (category) => __awaiter(this, void 0, void 0, function* () {
            this.toggleViewCategory = false;
            this.noResult = false;
            if (this.allProducts[category] !== undefined) {
                this.productsByCategories = this.allProducts[category];
            }
            yield getProductsByCategoryInitial(category).then((products) => {
                if (this.allProducts[category] === undefined)
                    this.productsByCategories = products;
                this.categoryInDrag = category;
                if (this.productsByCategories.length === 0)
                    this.noResult = true;
            });
            yield getProductsByCategory(category).then((products) => {
                this.productsByCategories = products;
                this.allProducts[category] = products;
                this.categoryInDrag = category;
            });
        });
        this.shuffle = (sourceArray) => {
            for (var i = 0; i < sourceArray.length - 1; i++) {
                var j = i + Math.floor(Math.random() * (sourceArray.length - i));
                var temp = sourceArray[j];
                sourceArray[j] = sourceArray[i];
                sourceArray[i] = temp;
            }
            return sourceArray;
        };
        this.mergeArray = (products) => {
            let res = [];
            for (let i = 0; i < products.length; i++) {
                res = res.concat(products[i]);
                console.log(products[i].length);
            }
            return res;
        };
        this.getNewProducts = (category) => __awaiter(this, void 0, void 0, function* () {
            if (this.fromMenu)
                this.browseOnlyProducts = [];
            else
                this.alternatives = [];
            this.noResult = false;
            yield getNewProducts(category).then((data) => {
                this.getAlternatives(data[0].productIds);
                if (data[0].productIds.length === 0)
                    this.noResult = true;
            });
        });
        this.resetProductsByCategory = () => {
            this.productsByCategories = [];
        };
        this.root = root;
    }
    get listOfCollection() {
        return this.collection;
    }
    get listOfAlternatives() {
        return this.alternatives;
    }
    get listOfbrowseOnlyProducts() {
        return this.browseOnlyProducts;
    }
    get listOfRecentNewProducts() {
        return this.recentNewProducts;
    }
    get listOfBookmarks() {
        return this.bookmarks;
    }
    get isFromOutfit() {
        return this.fromOutfit;
    }
    get listOfProductsByCategories() {
        return this.productsByCategories;
    }
    get getSliderToggleState() {
        return this.toggleViewCategory;
    }
    get getMyRecentOutfit() {
        return this.myRecentOutfit;
    }
    get getMyOutfitSlots() {
        return this.allOutfitSlots;
    }
}
__decorate([
    observable
], ObservableStore.prototype, "collection", void 0);
__decorate([
    observable
], ObservableStore.prototype, "alternatives", void 0);
__decorate([
    observable
], ObservableStore.prototype, "arrayImages", void 0);
__decorate([
    observable
], ObservableStore.prototype, "bookmarks", void 0);
__decorate([
    observable
], ObservableStore.prototype, "productsByCategories", void 0);
__decorate([
    observable
], ObservableStore.prototype, "categoryInDrag", void 0);
__decorate([
    observable
], ObservableStore.prototype, "toggleViewCategory", void 0);
__decorate([
    observable
], ObservableStore.prototype, "slots", void 0);
__decorate([
    observable
], ObservableStore.prototype, "noResult", void 0);
__decorate([
    observable
], ObservableStore.prototype, "allProducts", void 0);
__decorate([
    observable
], ObservableStore.prototype, "fromMenu", void 0);
__decorate([
    observable
], ObservableStore.prototype, "myRecentOutfit", void 0);
__decorate([
    observable
], ObservableStore.prototype, "allOutfitSlots", void 0);
__decorate([
    observable
], ObservableStore.prototype, "fromOutfit", void 0);
__decorate([
    observable
], ObservableStore.prototype, "recentNewProducts", void 0);
__decorate([
    observable
], ObservableStore.prototype, "browseOnlyProducts", void 0);
__decorate([
    action
], ObservableStore.prototype, "setBrowseType", void 0);
__decorate([
    action
], ObservableStore.prototype, "openProductCategory", void 0);
__decorate([
    action
], ObservableStore.prototype, "getAlternatives", void 0);
__decorate([
    action
], ObservableStore.prototype, "getDetailByProductId", void 0);
__decorate([
    action
], ObservableStore.prototype, "getAlternativesByFilter", void 0);
__decorate([
    action
], ObservableStore.prototype, "resetCollection", void 0);
__decorate([
    action
], ObservableStore.prototype, "getCollection", void 0);
__decorate([
    action
], ObservableStore.prototype, "setFromOutfit", void 0);
__decorate([
    action
], ObservableStore.prototype, "changeArrayImages", void 0);
__decorate([
    action
], ObservableStore.prototype, "addNewSlot", void 0);
__decorate([
    action
], ObservableStore.prototype, "cancelNewSlot", void 0);
__decorate([
    action
], ObservableStore.prototype, "createStyleWithMused", void 0);
__decorate([
    action
], ObservableStore.prototype, "resetArrayImages", void 0);
__decorate([
    action
], ObservableStore.prototype, "resetAlternativies", void 0);
__decorate([
    action
], ObservableStore.prototype, "moveImageToLeft", void 0);
__decorate([
    action
], ObservableStore.prototype, "createNewOutfit", void 0);
__decorate([
    action
], ObservableStore.prototype, "fetchMyOutfits", void 0);
__decorate([
    action
], ObservableStore.prototype, "createBookmark", void 0);
__decorate([
    action
], ObservableStore.prototype, "getBookmarksByUserId", void 0);
__decorate([
    action
], ObservableStore.prototype, "deleteBookmarkById", void 0);
__decorate([
    action
], ObservableStore.prototype, "getProductsByCategory", void 0);
__decorate([
    action
], ObservableStore.prototype, "getNewProducts", void 0);
__decorate([
    action
], ObservableStore.prototype, "resetProductsByCategory", void 0);
//# sourceMappingURL=productsStore.js.map