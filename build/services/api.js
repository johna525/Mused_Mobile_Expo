var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import { AsyncStorage } from 'react-native';
import ExpoMixpanelAnalytics from 'expo-mixpanel-analytics';
import { getClient, login } from './db';
import { stores } from '../features/stores';
export const analytics = new ExpoMixpanelAnalytics("5bec1d44013b90d5e620eb0a94957dde");
export const AUTO_LOG_OUT_TIME = 30 * 60 * 1000;
export let client_email = '';
export let client_userId = '';
export let last_event_time = 0;
export const loginViaFBProvider = (token) => {
    return login('facebook', token);
};
export const loginViaAnonProvider = () => {
    return login('anonymous');
};
export const logout = () => {
    const client = getClient();
    return client.auth.logout();
};
export const getAuthUserData = () => {
    const client = getClient();
    const { isLoggedIn } = client.auth;
    if (!isLoggedIn)
        return null;
    const { user: { id, profile } } = client.auth;
    const { email, firstName, lastName, name } = profile;
    return {
        userId: id,
        userProfile: {
            email,
            firstName,
            lastName,
            name,
        },
    };
};
export const getProducts = () => {
    const client = getClient();
    return client.callFunction("search", ["shorts", "Black"]);
};
export const getAuthors = () => {
    const client = getClient();
    return client.callFunction("getAuthors", []);
};
export const getOutfits = () => {
    const client = getClient();
    return client.callFunction("getOutfits", []);
};
export const getPosts = () => {
    const client = getClient();
    return client.callFunction("getPosts", []);
};
export const getRetailerPosts = () => {
    const client = getClient();
    return client.callFunction("getRetailerPosts", []);
};
export const getPostById = (id) => {
    const client = getClient();
    return client.callFunction("getPostById", [id]);
};
export const addRetailerPosts = (post) => {
    const client = getClient();
    return client.callFunction("addRetailerPosts", [post]);
};
export const getProductsByIds = (ids) => {
    const client = getClient();
    const _ids = [...ids];
    return client.callFunction("getProductsByIds", [_ids]);
};
export const getProductsByCatsSubs = (categories) => {
    const client = getClient();
    let _categories = [...categories.map((category) => (Object.assign({}, category, { subCategories: [...category.subCategories] })))];
    console.log(_categories);
    return client.callFunction("getProductsByCatsSubs", [_categories]);
};
export const updateUser = (userProfile) => {
    const client = getClient();
    return client.callFunction("updateUser", [userProfile]);
};
export const getUserDetails = (email) => {
    const client = getClient();
    return client.callFunction("getUserDetails", [email]);
};
export const createOutfit = (outfit) => {
    const client = getClient();
    return client.callFunction("createOutfit", [outfit]);
};
export const getBookmarksByUserId = (userEmail) => {
    const client = getClient();
    return client.callFunction("getBookmarksByUserId", [userEmail]);
};
export const createBookmark = (bookmark) => {
    const client = getClient();
    return client.callFunction("createBookmark", [bookmark]);
};
export const deleteBookmark = (_id) => {
    const client = getClient();
    return client.callFunction("deleteBookmark", [_id]);
};
export const getProductsByCategoryInitial = (category) => {
    const client = getClient();
    return client.callFunction("searchByCategoryInitial", [category]);
};
export const getProductsByCategory = (category) => {
    const client = getClient();
    return client.callFunction("searchByCategory", [category]);
};
export const getNewProducts = (category) => {
    const client = getClient();
    console.log(category);
    return client.callFunction("getNewProducts", [category]);
};
export const autoLogOut = () => __awaiter(this, void 0, void 0, function* () {
    console.log('Auto logging out...');
    yield logout();
    const { autoLogOut } = stores.root.user;
    autoLogOut();
    try {
        yield AsyncStorage.setItem('autoLoggedOut', 'true');
    }
    catch (error) {
        console.log(error.toString());
    }
    // loginViaAnonProvider().then(async (data: any) => {
    //     const userId = data.auth.authInfo.userId;
    //     const userProfile = data.auth.authInfo.userProfile.data;
    //     await updateUser(userProfile);
    //     const { setUserDetails, autoLogOut } = stores.root.user;
    //     setUserDetails(userId, userProfile);
    //     autoLogOut();
    // }, (error: Error) => {
    //     console.log(error.message)
    // })
});
export const setIdentify = (identify) => {
    analytics.identify(identify);
};
export const RegisterEvent = (eventName, params) => __awaiter(this, void 0, void 0, function* () {
    const CT = new Date().getTime();
    if (last_event_time > 0 && CT - last_event_time > AUTO_LOG_OUT_TIME) {
        //Auto Logout
        // autoLogOut();
    }
    if (eventName === 'Login' || eventName === 'Signup') {
        client_email = params.email;
        client_userId = params.userId;
        try {
            yield AsyncStorage.setItem('autoLoggedOut', 'false');
        }
        catch (error) {
            console.log(error.toString());
        }
    }
    console.log(eventName);
    analytics.track(eventName, Object.assign({}, params, { email: client_email, userId: client_userId }));
    last_event_time = new Date().getTime();
});
//# sourceMappingURL=api.js.map