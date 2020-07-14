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
import { AsyncStorage } from 'react-native';
import { observable, action } from 'mobx';
import { getUserDetails, logout } from '../../services';
export default class ObservableStore {
    constructor(root) {
        this.root = root;
        this.id = null;
        this.profile = null;
        this.userDetails = null;
        this.loading = true;
        this.autoLoggedOut = false;
        this.highlightButtonText = '';
        this.newUser = true;
        this.logout = () => {
            logout().then(() => {
                this.id = null;
                this.profile = null;
                this.userDetails = null;
            });
        };
        this.autoLogOut = () => {
            this.autoLoggedOut = true;
        };
        this.removeAuthLogOut = () => {
            this.autoLoggedOut = false;
        };
        this.setNewUser = (value) => {
            this.newUser = value;
        };
        this.setHighlightButtonText = (text) => __awaiter(this, void 0, void 0, function* () {
            try {
                yield AsyncStorage.setItem('highlightText', text);
                this.highlightButtonText = text;
            }
            catch (error) {
                console.log('Error in setting Highlighted buttont ext', error.toString());
            }
        });
        this.setUserDetails = (userId, userProfile) => __awaiter(this, void 0, void 0, function* () {
            const { email } = userProfile;
            let userData = {};
            if (email === undefined) {
                //anonymous user
                userData = {
                    profile: {
                        email: 'anonymous',
                        firstName: 'anonymous',
                        lastName: 'anonymous',
                        name: 'anonymous'
                    },
                    details: {
                        type: 'non-user'
                    }
                };
            }
            else {
                userData = yield getUserDetails(email);
            }
            yield this.setUser({ userId, userData });
            this.loading = false;
        });
        this.setUser = (user) => {
            const { userId, userData: { profile, details } } = user;
            this.id = userId;
            this.profile = profile;
            this.userDetails = details;
        };
    }
    get userProfile() {
        return this.profile;
    }
    ;
    get userId() {
        return this.id;
    }
    get getHighlightButtonText() {
        return this.highlightButtonText;
    }
}
__decorate([
    observable
], ObservableStore.prototype, "id", void 0);
__decorate([
    observable
], ObservableStore.prototype, "profile", void 0);
__decorate([
    observable
], ObservableStore.prototype, "userDetails", void 0);
__decorate([
    observable
], ObservableStore.prototype, "loading", void 0);
__decorate([
    observable
], ObservableStore.prototype, "autoLoggedOut", void 0);
__decorate([
    observable
], ObservableStore.prototype, "highlightButtonText", void 0);
__decorate([
    observable
], ObservableStore.prototype, "newUser", void 0);
__decorate([
    action
], ObservableStore.prototype, "logout", void 0);
__decorate([
    action
], ObservableStore.prototype, "autoLogOut", void 0);
__decorate([
    action
], ObservableStore.prototype, "removeAuthLogOut", void 0);
__decorate([
    action
], ObservableStore.prototype, "setNewUser", void 0);
__decorate([
    action
], ObservableStore.prototype, "setHighlightButtonText", void 0);
__decorate([
    action
], ObservableStore.prototype, "setUserDetails", void 0);
//# sourceMappingURL=userStore.js.map