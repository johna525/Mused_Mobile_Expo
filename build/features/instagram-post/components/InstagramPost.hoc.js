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
import { Linking } from 'react-native';
import { inject, observer } from 'mobx-react';
import InstagramPost from './InstagramPost';
import { ROOT_STORE } from '../../stores';
import { Header, COLLECTION, INSTAGRAM } from '../../shared';
function InstagramPostHOC(InstagramPostView) {
    let NewComp = class NewComp extends Component {
        constructor() {
            super(...arguments);
            this._onClickViewProfile = (url) => {
                Linking.openURL(url);
            };
            this._onClickStyleIt = (slots) => __awaiter(this, void 0, void 0, function* () {
                const { getCollection, setFromOutfit, resetArrayImages } = this.props.root.products;
                setFromOutfit(false);
                yield resetArrayImages();
                getCollection(slots);
                this.props.root.ui.navigate(COLLECTION, INSTAGRAM, { productIds: slots, from: 'instagram' });
            });
        }
        render() {
            const { navigation } = this.props;
            return React.createElement(InstagramPostView, { navigation: navigation, onClickStyleIt: this._onClickStyleIt, onClickViewProfile: this._onClickViewProfile });
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
export default InstagramPostHOC(InstagramPost);
//# sourceMappingURL=InstagramPost.hoc.js.map