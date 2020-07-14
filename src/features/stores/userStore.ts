import { AsyncStorage } from 'react-native';
import { observable, action } from 'mobx';

import { getUserDetails, logout } from '../../services';

export default class ObservableStore implements IUserStore {

    constructor(public root: RootStore) {}

    @observable id: string = null;
    @observable profile: UserProfile = null;
    @observable userDetails: any = null;
    @observable loading: boolean = true;
    @observable autoLoggedOut: boolean = false;
    @observable highlightButtonText: string = '';
    @observable newUser: boolean = true;

    @action
    public logout = () => {
        logout().then(() => {
            this.id = null;
            this.profile = null;
            this.userDetails = null;
        });
    };

    public get userProfile() {
        return this.profile;
    };

    public get userId() {
        return this.id;
    }

    public get getHighlightButtonText() {
        return this.highlightButtonText;
    }

    @action
    public autoLogOut = () => {
        this.autoLoggedOut = true;
    }

    @action
    public removeAuthLogOut = () => {
        this.autoLoggedOut = false;
    }

    @action
    public setNewUser = (value: boolean) => {
        this.newUser = value
    }

    @action
    public setHighlightButtonText = async (text: string) => {        
        try {
            await AsyncStorage.setItem('highlightText', text);
            this.highlightButtonText = text;
        } catch (error) {
            console.log('Error in setting Highlighted buttont ext', error.toString())
        }
    }

    @action
    public setUserDetails = async (userId: string, userProfile: UserProfile) => {
        const { email } = userProfile;
        let userData: any = {};
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
        } else {
            userData = await getUserDetails(email);
        }        
        await this.setUser({ userId, userData });
        this.loading = false;
    };

    private setUser = (user: any) => {
        const { userId, userData: { profile, details } } = user;
        this.id = userId;
        this.profile = profile;
        this.userDetails = details;
    }

}
