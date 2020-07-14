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
import { getPosts, getRetailerPosts, getPostById } from '../../services';
export default class ObservableStore {
    constructor(root) {
        this.root = root;
        this.getPosts = () => __awaiter(this, void 0, void 0, function* () {
            yield getPosts().then((posts) => this.posts = posts.map((post) => {
                return Object.assign({}, post);
            }));
        });
        this.getRetailerPosts = () => __awaiter(this, void 0, void 0, function* () {
            yield getRetailerPosts().then((posts) => {
                this.retailerPosts = posts;
                console.log('Retailer posts: ', posts);
            });
        });
        this.getPostById = (postId) => new Promise((resolve) => __awaiter(this, void 0, void 0, function* () {
            yield getPostById(postId).then((post) => {
                console.log('result', post);
                resolve(post);
            });
        }));
    }
    get listOfPosts() {
        return this.posts;
    }
    get listOfRetailerPosts() {
        return this.retailerPosts;
    }
}
__decorate([
    observable
], ObservableStore.prototype, "posts", void 0);
__decorate([
    observable
], ObservableStore.prototype, "retailerPosts", void 0);
__decorate([
    action
], ObservableStore.prototype, "getPosts", void 0);
__decorate([
    action
], ObservableStore.prototype, "getRetailerPosts", void 0);
__decorate([
    action
], ObservableStore.prototype, "getPostById", void 0);
//# sourceMappingURL=postsStore.js.map