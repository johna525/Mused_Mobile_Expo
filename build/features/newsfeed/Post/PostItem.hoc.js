var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
import React, { Component } from 'react';
import { inject, observer } from 'mobx-react';
import moment from 'moment';
import PostItem from './PostItem';
import { Header, COLLECTION, NEWSFEED, BROWSE_ONLY, ZOOM, INSTAGRAM } from '../../shared';
import * as API from '../../../services/api';
import { ROOT_STORE } from '../../stores';
function PostHOC(PostItem) {
    let PostItemComponent = class PostItemComponent extends Component {
        constructor() {
            super(...arguments);
            this.state = {};
            this._goToCollection = (params) => {
                const { root: { ui, slots: { removeSixthSlot }, products: { getCollection, setFromOutfit } } } = this.props;
                const { navigate } = ui;
                removeSixthSlot();
                setFromOutfit(false);
                getCollection(params.productIds);
                navigate(COLLECTION, NEWSFEED, params);
                API.RegisterEvent("Nf-ClickPost", {
                    event: 'Click post',
                    postType: 'inspire',
                });
            };
            this._goToBrowseDirectly = (productIds) => {
                const { root: { ui } } = this.props;
                const { navigate } = ui;
                navigate(BROWSE_ONLY, NEWSFEED, { productIds });
                API.RegisterEvent("Nf-ClickPost", {
                    event: 'Click post',
                    postType: 'list',
                });
            };
            this._goToZoomDirectly = (productId) => {
                const { root: { ui, products } } = this.props;
                const { navigate } = ui;
                const { getDetailByProductId } = products;
                getDetailByProductId(productId)
                    .then((product) => {
                    navigate(ZOOM, NEWSFEED, { product });
                });
                API.RegisterEvent("Nf-ClickPost", {
                    event: 'Click post',
                    postType: 'product',
                });
            };
            this._goToInstagramPost = (post) => {
                API.RegisterEvent("Nf-ClickPost", {
                    event: 'Click post',
                    postType: 'Instagram',
                });
                let slots = [];
                post.slots.map((slot) => {
                    slots.push({
                        date: moment(new Date(post.date)).fromNow(false),
                        slot,
                        key: String(post.postId) + String(JSON.parse(slot.instagramURL).media_id)
                    });
                });
                this.props.root.ui.navigate(INSTAGRAM, NEWSFEED, { slots });
            };
        }
        componentDidMount() {
        }
        render() {
            return React.createElement(PostItem, { goToCollection: this._goToCollection, goToBrowseDirectly: this._goToBrowseDirectly, goToZoomDirectly: this._goToZoomDirectly, goToInstagramPost: this._goToInstagramPost, navigation: this.props.navigation });
        }
    };
    PostItemComponent.navigationOptions = ({ navigation }) => {
        return {
            header: React.createElement(Header, { navigation: navigation })
        };
    };
    PostItemComponent = __decorate([
        inject(ROOT_STORE),
        observer
    ], PostItemComponent);
    return PostItemComponent;
}
export default PostHOC(PostItem);
//# sourceMappingURL=PostItem.hoc.js.map