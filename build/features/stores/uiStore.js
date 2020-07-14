var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
import { observable, action } from 'mobx';
import { StackActions, NavigationActions } from 'react-navigation';
import { NEWSFEED } from '../shared';
import * as API from '../../services/api';
export default class ObservableStore {
    constructor(root) {
        this.root = root;
        this.footerIsVisible = false;
        this.contextMenuIsVisible = false;
        this.navigation = null;
        this.currentRoute = NEWSFEED;
        this.prevRoute = '';
        this.routeArray = ['Newsfeed'];
        this.loading = false;
        this.requireAuth = false;
        this.requestAuth = (value) => {
            this.requireAuth = value;
        };
        this.hideFooter = () => {
            this.footerIsVisible = false;
        };
        this.showFooter = () => {
            this.footerIsVisible = true;
        };
        this.setLoading = (value) => {
            this.loading = value;
        };
        this.setNavigation = (navigation) => {
            this.navigation = navigation;
        };
        this.toggleContextMenu = (flag) => this.contextMenuIsVisible = flag;
        this.navigate = (currentRoute, prevRoute, params = {}) => {
            console.log(prevRoute);
            if (currentRoute === NEWSFEED) {
                const resetAction = StackActions.reset({
                    index: 0,
                    actions: [
                        NavigationActions.navigate({ routeName: NEWSFEED })
                    ]
                });
                this.navigation.dispatch(resetAction);
                this.currentRoute = currentRoute;
                this.prevRoute = '';
                this.routeArray = [currentRoute];
                return;
            }
            let temp = [];
            for (let i = 0; i < this.routeArray.length; i++) {
                if (currentRoute === this.routeArray[i])
                    break;
                temp.push(this.routeArray[i]);
            }
            this.routeArray = temp;
            console.log(temp);
            if (this.routeArray.length > 0)
                this.prevRoute = this.routeArray[this.routeArray.length - 1];
            else
                this.prevRoute = '';
            this.currentRoute = currentRoute;
            this.routeArray.push(currentRoute);
            this.navigation.navigate(currentRoute, params);
        };
        this.goBack = () => {
            console.log('CURRENT SCREENS: ' + JSON.stringify(this.routeArray));
            if (this.routeArray.length === 1)
                return;
            this.routeArray.splice(-1, 1);
            this.currentRoute = this.routeArray[this.routeArray.length - 1];
            if (this.routeArray.length > 1) {
                this.prevRoute = this.routeArray[this.routeArray.length - 2];
            }
            else {
                this.prevRoute = '';
            }
            console.log('CURRENT SCREENS: ' + this.prevRoute + ', ' + this.currentRoute);
            if (this.currentRoute === NEWSFEED) {
                API.RegisterEvent("Nf-view", {
                    actionType: "View screen"
                });
            }
            this.navigation.navigate(this.currentRoute, {});
        };
        this.setPrevCurrentRoutes = (currentRoute, prevRoute) => {
            console.log(currentRoute + ', ' + prevRoute);
        };
    }
}
__decorate([
    observable
], ObservableStore.prototype, "footerIsVisible", void 0);
__decorate([
    observable
], ObservableStore.prototype, "contextMenuIsVisible", void 0);
__decorate([
    observable
], ObservableStore.prototype, "navigation", void 0);
__decorate([
    observable
], ObservableStore.prototype, "currentRoute", void 0);
__decorate([
    observable
], ObservableStore.prototype, "prevRoute", void 0);
__decorate([
    observable
], ObservableStore.prototype, "routeArray", void 0);
__decorate([
    observable
], ObservableStore.prototype, "loading", void 0);
__decorate([
    observable
], ObservableStore.prototype, "requireAuth", void 0);
__decorate([
    action
], ObservableStore.prototype, "requestAuth", void 0);
__decorate([
    action
], ObservableStore.prototype, "hideFooter", void 0);
__decorate([
    action
], ObservableStore.prototype, "showFooter", void 0);
__decorate([
    action
], ObservableStore.prototype, "setLoading", void 0);
__decorate([
    action
], ObservableStore.prototype, "setNavigation", void 0);
__decorate([
    action
], ObservableStore.prototype, "toggleContextMenu", void 0);
__decorate([
    action
], ObservableStore.prototype, "navigate", void 0);
__decorate([
    action
], ObservableStore.prototype, "goBack", void 0);
__decorate([
    action
], ObservableStore.prototype, "setPrevCurrentRoutes", void 0);
//# sourceMappingURL=uiStore.js.map