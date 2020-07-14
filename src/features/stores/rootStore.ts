import UserStore from './userStore';
import ProductStore from './productsStore';
import UIStore from './uiStore'
import SlotsStore from './slotsStore';
import PostsStore from './postsStore';
import FilterStore from './filterStore';


export default class RootStore {
    public ui: UIStore;
    public products: ProductStore;
    public user: UserStore;
    public slots: SlotsStore;
    public posts: PostsStore;
    public filters: FilterStore;

    constructor() {
        this.products = new ProductStore(this);
        this.ui = new UIStore(this);
        this.user = new UserStore(this);
        this.slots = new SlotsStore(this);
        this.posts = new PostsStore(this);
        this.filters = new FilterStore(this);
    }
}

