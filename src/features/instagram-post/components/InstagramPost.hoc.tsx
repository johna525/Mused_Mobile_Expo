import React, { Component } from 'react';
import { Linking } from 'react-native';
import { inject, observer } from 'mobx-react';
import InstagramPost from './InstagramPost';

import { ROOT_STORE } from '../../stores';
import { Header, COLLECTION, INSTAGRAM } from '../../shared';

type Props = {
    navigation: any;
    root?: RootStore;
    showContent?: boolean;
};
function InstagramPostHOC(InstagramPostView: any) {
    @inject(ROOT_STORE)

    @observer
    class NewComp extends Component<Props> {

        static navigationOptions: ([string]: any) => HashMap<Object> = ({ navigation }) => {
            return {
                header: <Header 
                    navigation={navigation} 
                />
            }
        };

        render() {
            const { navigation } = this.props;
            return <InstagramPostView
                        navigation={navigation}
                        onClickStyleIt={this._onClickStyleIt}
                        onClickViewProfile={this._onClickViewProfile}
                  />
        }

        _onClickViewProfile = (url: string) => {
            Linking.openURL(url);
        }

        _onClickStyleIt = async (slots: Slot[]) => {
            const { getCollection, setFromOutfit, resetArrayImages } = this.props.root.products;
            setFromOutfit(false)
            await resetArrayImages();
            getCollection(slots);
            this.props.root.ui.navigate(COLLECTION, INSTAGRAM, {productIds: slots, from: 'instagram'});
        }
    }
    return NewComp;
  }

export default InstagramPostHOC(InstagramPost);
