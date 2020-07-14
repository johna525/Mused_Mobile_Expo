import React, { Component } from 'react';
import { inject, observer } from 'mobx-react';
import Header from './Header';

import { ROOT_STORE } from '../../../stores';
import { NEWSFEED } from '../../routesKeys';

type Props = {
    navigation: any;
    root?: RootStore;
    showContent?: boolean;
};
function HeaderHOC(Header: any) {
    @inject(ROOT_STORE)

    @observer
    class NewComp extends Component<Props> {
        render() {
            const { navigation, showContent,  root: { ui, user, products, filters, posts } } = this.props;
            const { userProfile, logout, setUserDetails } = user;
            const { resetArrayImages, resetAlternativies, resetCollection, setBrowseType } = products;
            const { filterTab, clearFilters, setFilterTab } = filters;
            const { getPosts } = posts;

            return <Header
                    navigation={navigation}
                    showContent={showContent}
                    userProfile={userProfile}
                    logout={logout}
                    hideContextMenu={this._hideContextMenu}
                    resetArrayImages={resetArrayImages}
                    filterTab={filterTab}
                    backToFilterTabs={this._setFilterTab}
                    clearFilters={clearFilters}
                    resetAlternativies={resetAlternativies}
                    onPressLogo={this.onPressLogo}
                    resetCollection={resetCollection}
                    getNewProducts={this._getNewProducts}
                    setBrowseType={setBrowseType}
                    setUserDetails={setUserDetails}
                    ui={ui}
                    getPosts={getPosts}
                    setFilterTab={setFilterTab}
            />
        }

        onPressLogo = () => {
            const {   root: { ui: { navigate }, posts: { getPosts } } } = this.props;
            getPosts();
            navigate(NEWSFEED, '', {});
        }

        _hideContextMenu = () => {
            const {   root: { ui: { toggleContextMenu } } } = this.props;
            toggleContextMenu(false);
        }

        _getNewProducts = () => {
            const {   root: { products: { getNewProducts } } } = this.props;
            getNewProducts('all');
        }

        _setFilterTab = () => {
            const { root: { filters: {setFilterTab} } } = this.props;
            setFilterTab('')
        }
    }
    return NewComp;
  }

export default HeaderHOC(Header);
