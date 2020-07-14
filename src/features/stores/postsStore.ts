import { observable, action } from 'mobx';
import { getPosts, getRetailerPosts, getPostById } from '../../services';



export default class ObservableStore implements IPostsStore {
    constructor(public root: RootStore) { }
    
    @observable posts: Post[];
    @observable retailerPosts: RetailerPost[];
    
    get listOfPosts() {
        return this.posts;
    }

    get listOfRetailerPosts() {
        return this.retailerPosts;
    }

    @action
    public getPosts = async () => {
        await getPosts().then((posts: Post[]) => 
            this.posts = posts.map((post: Post) => {
              return {
                  ...post,
              }  
            })
        )         
    };

    @action
    public getRetailerPosts = async () => {
        await getRetailerPosts().then((posts: RetailerPost[]) => {
            this.retailerPosts = posts;
            console.log('Retailer posts: ', posts)
        })
    }

    @action
    public getPostById = (postId: number) => new Promise( async (resolve) => {
        await getPostById(postId).then((post: Post) => {
            console.log('result', post);
            resolve(post)
        });
      });
}
    