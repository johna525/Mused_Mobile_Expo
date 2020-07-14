import React, { Component } from 'react';
import { inject, observer } from 'mobx-react';
import MyAccount from './MyAccount';

import { ROOT_STORE } from '../stores';
import { ZOOM, MYACCOUNT, COLLECTION } from '../shared/routesKeys';
import { Header} from '../shared';

type Props = {
    navigation: any;
    root?: RootStore;
    showContent?: boolean;
};
function MyAccountHoc(Account: any) {
    @inject(ROOT_STORE)

    @observer
    class MyAccount extends Component<Props> {
      
        static navigationOptions: ([string]: any) => HashMap<Object> = ({ navigation }) => {
            return {
                header: <Header navigation={navigation} />
            } 
        };

        componentDidMount() {
            const { root: {posts: {getPosts} }} = this.props;
            getPosts();
        }

        render() {
            const { root: { products, posts, ui } } = this.props;
            const { listOfPosts } = posts;
            const { listOfBookmarks, getMyRecentOutfit, getMyOutfitSlots, listOfCollection, getCollection } = products;
            const { navigation } = ui;
            return  <Account
                        navigation={navigation}
                        onClickProduct={this._onClickProduct}
                        onClickBookmark={this._onClickBookmark}
                        onClickCollection={this._onClickCollection}
                        listOfPosts={listOfPosts}
                        listOfBookmarks={listOfBookmarks}
                        productStore={products}
                        myOutFit={getMyRecentOutfit}
                        myOutfitSlots={getMyOutfitSlots}
                        listOfCollection={listOfCollection}
                        getCollection={getCollection}                        
                    />
        }

        _onClickBookmark = (productId: number) => {
            const { root: { products: {deleteBookmarkById}}} = this.props;
            deleteBookmarkById(productId);
        }

        _onClickCollection = async (param: any) => {
            const { root: { ui, user, products }} = this.props;
            const { navigate } = ui;
            const { userProfile } = user;
            const { getCollection, setFromOutfit, resetArrayImages } = products;
            setFromOutfit(true)
            await resetArrayImages();
            getCollection(param.productIds);
            const params = {
                ...param,
                authorItem: {
                    ...param.authorItem,
                    authorName: userProfile.firstName + ' ' + userProfile.lastName
                },
                from: 'outfit'
            }
            navigate(COLLECTION, MYACCOUNT, params);
        }

        _onClickProduct = (product: Product) => {
            const { root: {ui: {navigate}}} = this.props;
            navigate(ZOOM, MYACCOUNT, {product});
        }
    }
    return MyAccount;
  }

export default MyAccountHoc(MyAccount);
