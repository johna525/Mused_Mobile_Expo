import React, { Component } from 'react';
import { inject, observer } from 'mobx-react';
import moment from 'moment';
import PostItem from './PostItem';
import { Header, COLLECTION, NEWSFEED, BROWSE_ONLY, ZOOM, INSTAGRAM } from '../../shared';
import * as API from '../../../services/api';

import { ROOT_STORE } from '../../stores';

type Props = {
    navigation: any;
    root: RootStore;
};

type State = {
};

function PostHOC(PostItem: any) {
    @inject(ROOT_STORE)
    @observer
    class PostItemComponent extends Component<Props, State> {
        static navigationOptions: ([string]: any) => HashMap<Object> = ({ navigation }) => {
            return {
                header: <Header navigation={navigation} />
            } 
        };      

        state: State = {
        }

        componentDidMount() {
            

        }

        render() {
            return <PostItem
                        goToCollection={this._goToCollection}
                        goToBrowseDirectly={this._goToBrowseDirectly}
                        goToZoomDirectly={this._goToZoomDirectly}
                        goToInstagramPost={this._goToInstagramPost}
                        navigation={this.props.navigation}
                    />
        }

        _goToCollection = (params: any) => {
            const { root: { ui, slots: { removeSixthSlot }, products: { getCollection, setFromOutfit } } } = this.props;
            const { navigate } = ui;
            removeSixthSlot();
            setFromOutfit(false);
            getCollection(params.productIds)
            navigate(COLLECTION, NEWSFEED, params);   
            API.RegisterEvent("Nf-ClickPost", {          
              event: 'Click post',
              postType: 'inspire',
            })       
        }

        _goToBrowseDirectly = (productIds: any) => {
            const { root: { ui } } = this.props;
            const { navigate } = ui;
            navigate(BROWSE_ONLY, NEWSFEED, {productIds});  
            API.RegisterEvent("Nf-ClickPost", {
              event: 'Click post',
              postType: 'list',
            })   
        }

        _goToZoomDirectly = (productId: number) => {
            const { root: { ui, products } } = this.props;
            const { navigate } = ui;
            const { getDetailByProductId } = products;
            getDetailByProductId(productId)
            .then((product: any) => {
              navigate(ZOOM, NEWSFEED, {product});
            })
            API.RegisterEvent("Nf-ClickPost", {
              event: 'Click post',
              postType: 'product',
            })
        }

        _goToInstagramPost = (post: Post) => {
            API.RegisterEvent("Nf-ClickPost", {          
              event: 'Click post',
              postType: 'Instagram',
            }) 
            let slots: any = [];
            post.slots.map((slot: any) => {
                slots.push({
                  date: moment(new Date(post.date)).fromNow(false),
                  slot,
                  key: String(post.postId) + String(JSON.parse(slot.instagramURL).media_id)
                })
              })   
            this.props.root.ui.navigate(INSTAGRAM, NEWSFEED, {slots});  
          }
    }
    return PostItemComponent;
  }

export default PostHOC(PostItem);