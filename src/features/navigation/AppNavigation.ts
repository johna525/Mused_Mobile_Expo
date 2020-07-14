import { createStackNavigator } from 'react-navigation';

import { Newsfeed, PostItem } from '../newsfeed'
import { Collection } from '../collection';
import { Browse, BrowseOnly } from '../browse';
import { Zoom } from '../zoom';
import { Filter } from '../filter';
import { DragAndDrop } from '../drag-and-drop';
import { MyAccount } from '../myaccount';
import { InstagramPost } from '../instagram-post';

import { 
    COLLECTION,
    BROWSE, 
    COLLECTION_ZOOM,
    BROWSE_ONLY,
    NEWSFEED, 
    ZOOM, 
    FILTER,
    VIEW, 
    MYACCOUNT,
    INSTAGRAM,
    POSTITEM,
    MENU_FILTER
} from '../shared';

import { transitionConfig } from './transitionConfig';

export default createStackNavigator(
    {
        [NEWSFEED]: {
            screen: Newsfeed
        },
        [COLLECTION]: {
            screen: Collection
        },
        [BROWSE]: {
            screen:  Browse
        },        
        [BROWSE_ONLY]: {
            screen: BrowseOnly
        },
        [ZOOM]: {
            screen:  Zoom,
            navigationOptions: {
                header: null
            }
        },
        [COLLECTION_ZOOM]: {
            screen:  Zoom,
            navigationOptions: {
                header: null
            }
        },
        [FILTER]: {
            screen:  Filter
        },
        [MENU_FILTER]: {
            screen:  Filter
        },
        [VIEW]: {
            screen: DragAndDrop
        },
        [MYACCOUNT]: {
            screen: MyAccount
        },
        [INSTAGRAM]: {
            screen: InstagramPost
        },
        [POSTITEM]: {
            screen: PostItem
        }
    }, {

    initialRouteName: NEWSFEED,
    // headerMode: 'float',
    cardStyle:{
        backgroundColor: '#fff'
    },
    transitionConfig
  },

);
