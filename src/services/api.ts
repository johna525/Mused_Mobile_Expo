import { AsyncStorage } from 'react-native';
import ExpoMixpanelAnalytics from 'expo-mixpanel-analytics';
import { getClient, login } from './db';
import { stores } from '../features/stores';

export const analytics = new ExpoMixpanelAnalytics("5bec1d44013b90d5e620eb0a94957dde");
export const AUTO_LOG_OUT_TIME = 30 * 60 * 1000;
export let client_email: string = '';
export let client_userId: string = '';
export let last_event_time : number= 0;

export const loginViaFBProvider = (token: string) => {
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
    if (!isLoggedIn) return null;

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
}

export const getRetailerPosts = () => {
    const client = getClient();
    return client.callFunction("getRetailerPosts", []);
}

export const getPostById = (id: number) => {
    const client = getClient();
    return client.callFunction("getPostById", [id]);
}

export const addRetailerPosts = (post: RetailerPost) => {
    const client = getClient();
    return client.callFunction("addRetailerPosts", [post]);
}

export const getProductsByIds = (ids: number[]) => {
    const client = getClient();
    const _ids = [...ids];
    return client.callFunction("getProductsByIds", [_ids]);
};

export const getProductsByCatsSubs = (categories: Category[]) => {
    const client = getClient();
    let _categories = 
        [...categories.map( (category: Category) => ({...category, subCategories: [...category.subCategories]}))];
    console.log(_categories)
    return client.callFunction("getProductsByCatsSubs", [_categories]);
}

export const updateUser = (userProfile: any) => {
    const client = getClient();
    return client.callFunction("updateUser", [userProfile]);
};

export const getUserDetails = (email: string) => {
    const client = getClient();
    return client.callFunction("getUserDetails", [email]);
};

export const createOutfit = (outfit: Outfit) => {
    const client = getClient();
    return client.callFunction("createOutfit", [outfit]);
};

export const getBookmarksByUserId = (userEmail: string) => {
    const client = getClient();
    return client.callFunction("getBookmarksByUserId", [userEmail]);
}

export const createBookmark = (bookmark: Bookmark ) => {
    const client = getClient();
    return client.callFunction("createBookmark", [bookmark]);
}

export const deleteBookmark = (_id: any) => {
    const client = getClient();
    return client.callFunction("deleteBookmark", [_id]);
}

export const getProductsByCategoryInitial = (category: string) => {
    const client = getClient();
    return client.callFunction("searchByCategoryInitial", [category]);
}

export const getProductsByCategory = (category: string) => {
    const client = getClient();
    return client.callFunction("searchByCategory", [category]);
}

export const getNewProducts = (category: string) => {
    const client = getClient();
    console.log(category)
    return client.callFunction("getNewProducts", [category]);
}

export const autoLogOut = async () => {
    console.log('Auto logging out...')
    await logout();
    const { autoLogOut } = stores.root.user;
    autoLogOut();
    try {
        await AsyncStorage.setItem('autoLoggedOut', 'true')
    } catch (error) {
        console.log(error.toString())
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
}

export const setIdentify = (identify: string) => {
    analytics.identify(identify);
}

export const RegisterEvent = async (eventName: string, params: any) => {
    const CT = new Date().getTime();
    if(last_event_time > 0 && CT - last_event_time > AUTO_LOG_OUT_TIME) {
        //Auto Logout
        // autoLogOut();
    }
    if(eventName === 'Login' || eventName === 'Signup'){
        client_email = params.email;
        client_userId = params.userId;
        try {
            await AsyncStorage.setItem('autoLoggedOut', 'false')
        } catch (error) {
            console.log(error.toString())
        } 
    }
    console.log(eventName)
    analytics.track(eventName, {
        ...params,
        email: client_email,
        userId: client_userId
    });
    last_event_time = new Date().getTime();
}