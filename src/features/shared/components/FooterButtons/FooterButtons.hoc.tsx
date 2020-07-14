import React, { Component } from 'react';
import { AsyncStorage } from 'react-native';
import { inject, observer } from 'mobx-react';
import FooterButtons from './FooterButtons';
import { COLLECTION, BROWSE, FILTER, VIEW, BROWSE_ONLY } from '../../../shared';
import { ROOT_STORE } from '../../../stores';
import * as API from '../../../../services/api';
import { MENU_FILTER } from '../../routesKeys';

type Props = {
    root?: RootStore;
};
function FooterButtonsHOC(FooterButtons: any) {
    @inject(ROOT_STORE)
    @observer
    class NewComp extends Component<Props> {
      render() {
        const { root: { ui, slots, user } } = this.props;
        const { currentRoute }  = ui;
        const { newImgUrl } = slots;
        const footerIsVisible = currentRoute === COLLECTION || 
                                currentRoute === BROWSE || 
                                currentRoute === FILTER || 
                                currentRoute === MENU_FILTER || 
                                currentRoute === VIEW;
        return (
          footerIsVisible &&  
            <FooterButtons 
              currentRoute={currentRoute}
              navigateToFilter={this._navigateToFilter}
              navigateBackToBrowse={this._navigateBackToBrowse}
              navigateToView={this._navigateToView}
              clearFilterAndGoToBrowse={this._clearFilterAndGoToBrowse}
              applyFilter={this._applyFilter}
              createNewOutfit={this._createNewOutfit}
              openProductCategory={this._openProductCategory}
              newImgUrl={newImgUrl}
              user={user}
            />
        )
    }

    _openProductCategory = () => {
      const { root: { products } } = this.props;
      const { openProductCategory } = products;
      API.RegisterEvent("Vw-footerFilter", {
        actionType: "Click menu 'Filter'"
      })
      openProductCategory();
    }

    _navigateBackToBrowse = () => {
      const { root: { ui: { navigate } } } = this.props;
      API.RegisterEvent("Vw-footerView", {
        actionType: "Click menu 'View'"
      })
      navigate(BROWSE, COLLECTION);
    }

    _createNewOutfit = () => {
      const { root: { ui, products } } = this.props;
      const { currentRoute }  = ui;
      const { createNewOutfit } = products;
      if(currentRoute === COLLECTION) {
        API.RegisterEvent("Cl-loveit", {
          actionType: "Click on 'Love it' in footer"
        })
      } else {
        API.RegisterEvent("Br-footerLove", {
          actionType: "Click menu 'Love it'"
        })
      }      
      createNewOutfit();
    }

    _navigateToFilter = () => {
        const { root: { ui: { navigate }, products, filters: {setFilterTab} } } = this.props;
        const { setBrowseType } = products;

        const { root: { user: {newUser, setNewUser} } } = this.props;
        if(newUser) {
          AsyncStorage.setItem('newUser', 'no');
          setNewUser(false)
        }
        
        API.RegisterEvent("Br-footerFilter", {
          actionType: "Click menu 'Filter'"
        })
        setFilterTab('');
        setBrowseType(1);
        navigate(FILTER, BROWSE);
    }

    _navigateToView = () => {
      const { root: { ui: { navigate } } } = this.props;
      API.RegisterEvent("Br-footerView", {
        actionType: "Click menu 'View'"
      })
      navigate(VIEW, BROWSE);
    }

    _navigateToBrowse = () => {
      const { root: { ui: { navigate }, products } } = this.props;
      const { fromMenu } = products;
      if(fromMenu) navigate(BROWSE_ONLY, COLLECTION, {fromMenu});
      else navigate(BROWSE, COLLECTION);
    }

    _clearFilterAndGoToBrowse = () => {
      const { root: { filters, products, slots, ui } } = this.props;
      const { clearFilters } = filters;
      const { cancelNewSlot, arrayImages } = products;
      const { setPrevSlotNumber } = slots;
      const { goBack, navigation } = ui;

      // if(prevRoute === COLLECTION) navigate(COLLECTION, NEWSFEED);
      // else this._navigateToBrowse();      
      clearFilters();
      setPrevSlotNumber(arrayImages);
      cancelNewSlot();
      goBack();
      navigation.goBack();
      API.RegisterEvent("Fi-cancel", {
        actionType: "Click 'cancel'"
      })
    }

    _applyFilter = async () => {
      const { root: { products: { getAlternativesByFilter } } } = this.props;
      getAlternativesByFilter();
      API.RegisterEvent("Fi-apply", {
        actionType: "Click 'apply'"
      })
      setTimeout(() => {
        this._navigateToBrowse();
      }, 500)      
    }
    }
    return NewComp;
  }

export default FooterButtonsHOC(FooterButtons);