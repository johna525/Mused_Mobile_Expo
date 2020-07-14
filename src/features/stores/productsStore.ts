import { observable, action } from 'mobx';
import moment from 'moment';
import lodash from 'lodash';

import { 
    getProductsByIds,
    getProductsByCatsSubs,
    createOutfit, 
    createBookmark, 
    getBookmarksByUserId, 
    deleteBookmark,
    getProductsByCategory,
    getProductsByCategoryInitial,
    getNewProducts,
    getOutfits,
} from '../../services';

import { slotsOrder } from '../shared';
import * as API from '../../services/api';


export default class ObservableStore implements IProductStore {
    constructor(public root: RootStore) {
        this.root = root 
    }

    @observable collection: Product[] = [];
    @observable alternatives: Product[] = [];
    @observable arrayImages: ProductImage[] = [];
    @observable bookmarks: Bookmark[] = [];
    @observable productsByCategories: Product[] = [];
    @observable categoryInDrag: string = '';
    @observable toggleViewCategory: boolean = false;
    @observable slots: Slot[] = [];
    @observable noResult: boolean = false;
    @observable allProducts: any = {};
    @observable fromMenu: boolean = false;
    @observable myRecentOutfit: Product[] = [];
    @observable allOutfitSlots: any = [];
    @observable fromOutfit: boolean = false;
    @observable recentNewProducts: Product[] = [];
    @observable browseOnlyProducts: Product[] = [];

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

    @action
    public setBrowseType = (type: number) => {
        if(type === 1) this.fromMenu = false;
        else this.fromMenu = true;
        console.log('fromMenu', type)
    }

    @action
    public openProductCategory = () => {
        this.toggleViewCategory = true;
        this.resetProductsByCategory()
    }

    @action
    public getAlternatives = async (ids: number[]) => {
        this.noResult = false;
        await getProductsByIds(ids).then((products: Product[]) => {
            if(this.fromMenu) this.browseOnlyProducts = [...products];        
            else this.alternatives = [...products];
            if(this.alternatives.length === 0) this.noResult = true;
        });
    }

    @action
    public getDetailByProductId = (productId: number) => new Promise( async (resolve) => {
        await getProductsByIds([productId]).then((products: Product[]) => {
            resolve(products[0])
        });
      });

    @action
    public getAlternativesByFilter = async () => {
        if(this.fromMenu) this.browseOnlyProducts = [];
        else this.alternatives = [];
        this.noResult = false;
        await getProductsByCatsSubs(this.root.filters.listOfCategory).then((products: Product[]) => {  
            console.log(products.length);
            if(this.fromMenu) this.browseOnlyProducts = [...products];        
            else this.alternatives = [...products];
            if(products.length === 0) this.noResult = true;
        });
    }

    @action
    public resetCollection = () => {
        // this.alternatives = []
        this.getCollection(this.slots);
    }

    @action
    public  getCollection = async (slots: Slot[]) => {
        const ids: number[] = slots.map((slot: Slot) => slot.productId);
        this.slots = slots;
        this.noResult = false;
        await getProductsByIds(ids).then((products: Product[]) => {
            this.collection = slotsOrder(ids, products);
            if(this.collection.length === 0) this.noResult = true;
        });
        this.arrayImages = this.collection.map( (product: Product) => {
            return { 
                img: { uri: product.image },
                id: product.id,
                category: product.category
            }
        });
    }

    @action
    public setFromOutfit = (value: boolean) => {
        this.fromOutfit = value;
    }

    @action
    public changeArrayImages = (slotNumber: number, newImg: ProductImage) => {
        const newArray = [...this.arrayImages];
        const indexSlot: number = newArray.findIndex( (item: ProductImage) => item.id === slotNumber);
        newArray.splice(indexSlot, 1, newImg);
        this.arrayImages = newArray;
    }

    @action
    public addNewSlot = () => {
        const newArray = [...this.arrayImages];
        const newImg: ProductImage = {
            img: undefined,
            id: -1
        }
        newArray.push(newImg);
        this.arrayImages = newArray;
    }

    @action
    public cancelNewSlot = () => {
        let newArray: ProductImage[] = [];
        this.arrayImages.map((product: ProductImage) => {
            if(product.id !== -1) newArray.push(product)
        })
        this.arrayImages = newArray;
    }

    @action
    public createStyleWithMused = (product: ProductImage) => {
        const newArray = [product];
        const newImg: ProductImage = {
            img: undefined,
            id: -1
        }
        newArray.push(newImg);
        this.arrayImages = newArray;
    }

    @action
    public resetArrayImages = () => {
        this.arrayImages = [];
        this.collection = [];
    }

    @action resetAlternativies = () => {
        if(this.fromMenu) this.browseOnlyProducts = [];
        else this.alternatives = [];
    }

    @action
    public moveImageToLeft = (slotIndex: number) => {
        const newArrayImgs = [...this.arrayImages];
        const product: ProductImage = newArrayImgs.find((item: ProductImage, index: number) => {
            return item && index === slotIndex;
        });
        newArrayImgs.splice(slotIndex, 1);
        (slotIndex - 1 ) < 0
            ? newArrayImgs.push(product)
            : newArrayImgs.splice(slotIndex - 1, 0, product);
        this.arrayImages = newArrayImgs;
    }

    @action
    public createNewOutfit = () => {
        if(this.root.user.userProfile === null) return;
        const outfit: any = {
            userEmail: this.root.user.userProfile.email,
            slots: this.arrayImages.map( ( product: ProductImage) => product.id as number),
            timestamp: moment().format()
        };
        createOutfit(outfit);
    }

    @action
    public fetchMyOutfits = async () => {
        await getOutfits().then((result: Outfit[]) => {
            
            const temp = lodash.filter(result, function(o: any) {
                return o.userEmail === API.client_email;
            });
            this.allOutfitSlots = temp;
            if(temp.length > 0){
                const recentSlots = temp[temp.length - 1].slots;
                console.log('Recent Slots: ', recentSlots)
                getProductsByIds(recentSlots).then((products: Product[]) => {
                    this.myRecentOutfit = products;
                });
            }
        })
    }

    @action
    public createBookmark = async (productId: number) => {
        if(this.root.user.userProfile === null) return;
        const bookmark: Bookmark = {
            userEmail: this.root.user.userProfile.email,
            productId,
            timestamp: moment().format()
        };
        await createBookmark(bookmark);
        await this.getBookmarksByUserId();
    }

    @action 
    getBookmarksByUserId = async () => {
        if(this.root.user.userProfile === null) return;
        await getBookmarksByUserId(this.root.user.userProfile.email).then((bookmarks: Bookmark[]) => {
            //filter bookmarks
            const temp = lodash.filter(bookmarks, function(o: any) {
                return o.productId !== null;
            });
            this.bookmarks = lodash.uniqBy(temp, 'productId');
            console.log(this.bookmarks.length)
        });
    }

    @action 
    deleteBookmarkById = async (_id: any) => {
        await deleteBookmark(_id);
        await this.getBookmarksByUserId();
    }

    @action 
    getProductsByCategory = async (category: string) => {
        this.toggleViewCategory = false;
        this.noResult = false;
        if(this.allProducts[category] !== undefined) {
            this.productsByCategories = this.allProducts[category];
        }
        await getProductsByCategoryInitial(category).then( (products: Product[]) => {
            if(this.allProducts[category] === undefined) this.productsByCategories = products;
            this.categoryInDrag = category;
            if(this.productsByCategories.length === 0) this.noResult = true;
        })
        await getProductsByCategory(category).then( (products: Product[]) => {
            this.productsByCategories = products;
            this.allProducts[category] = products;
            this.categoryInDrag = category;         
        })
    }

    public shuffle = (sourceArray: any) => {
        for (var i = 0; i < sourceArray.length - 1; i++) {
            var j = i + Math.floor(Math.random() * (sourceArray.length - i));
    
            var temp = sourceArray[j];
            sourceArray[j] = sourceArray[i];
            sourceArray[i] = temp;
        }
        return sourceArray;
    }

    public mergeArray = (products: any) => {
        let res: any = [];
        for(let i = 0; i < products.length; i++) {
            res = res.concat(products[i]);
            console.log(products[i].length)
        }
        return res;
    }

    @action
    getNewProducts = async (category: string) => {
        if(this.fromMenu) this.browseOnlyProducts = [];
        else this.alternatives = [];
        this.noResult = false;
        await getNewProducts(category).then((data: any) => {
            this.getAlternatives(data[0].productIds);      
            if(data[0].productIds.length === 0) this.noResult = true;
        });
    }

    @action
    resetProductsByCategory = () => {
        this.productsByCategories = [];
    }
}