import RootStore  from './rootStore';

import {
    ROOT_STORE
} from './constants';

const rootStore = new RootStore();

export const stores = {
    [ROOT_STORE]: rootStore
};
