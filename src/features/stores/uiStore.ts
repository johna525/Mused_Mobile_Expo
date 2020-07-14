import { observable, action} from 'mobx';
import { StackActions, NavigationActions } from 'react-navigation';
import { NEWSFEED } from '../shared';
import * as API from '../../services/api';

export default class ObservableStore implements IUiStore {

    constructor(public root: RootStore) {}
    
    @observable footerIsVisible: boolean = false;
    @observable contextMenuIsVisible: boolean = false;
    @observable navigation: any = null;
    @observable currentRoute: string = NEWSFEED;
    @observable prevRoute: string = '';
    @observable routeArray: string[] = ['Newsfeed'];
    @observable loading: boolean = false;
    @observable requireAuth: boolean = false;

    @action
    public  requestAuth = (value: boolean) =>  {
        this.requireAuth = value;
    }

    @action
    public  hideFooter = () =>  {
        this.footerIsVisible = false;
    }

    @action
    public showFooter = () => {
        this.footerIsVisible = true;
    }

    @action
    public setLoading = (value: boolean) => {
        this.loading = value;
    }
 
    @action setNavigation = (navigation: any) => {
        this.navigation = navigation;
    }

    @action
    toggleContextMenu = (flag: boolean) =>
            this.contextMenuIsVisible = flag;
    
    @action
    navigate = (currentRoute: string, prevRoute: string, params: any = {}) => {
        console.log(prevRoute);
        if(currentRoute === NEWSFEED) {
            const resetAction = StackActions.reset({
                index: 0,
                actions: [
                    NavigationActions.navigate({routeName: NEWSFEED})
                ]
            })
            this.navigation.dispatch(resetAction);
            this.currentRoute = currentRoute;
            this.prevRoute = '';
            this.routeArray=[currentRoute];
            return;
        }
        let temp = []
        for(let i = 0; i < this.routeArray.length; i++){            
            if(currentRoute === this.routeArray[i]) break;
            temp.push(this.routeArray[i])
        }
        this.routeArray = temp;
        console.log(temp)
        if(this.routeArray.length > 0) this.prevRoute = this.routeArray[this.routeArray.length - 1];
        else this.prevRoute = '';
        this.currentRoute = currentRoute;
        this.routeArray.push(currentRoute);        
        this.navigation.navigate(currentRoute, params)
    }

    @action
    goBack = () => {
        console.log('CURRENT SCREENS: ' + JSON.stringify(this.routeArray))
        if(this.routeArray.length === 1) return;
        this.routeArray.splice(-1, 1);
        this.currentRoute = this.routeArray[this.routeArray.length - 1];
        if(this.routeArray.length > 1) {
            this.prevRoute = this.routeArray[this.routeArray.length - 2];            
        } else {
            this.prevRoute = '';
        }
        console.log('CURRENT SCREENS: ' + this.prevRoute + ', ' + this.currentRoute);
        if(this.currentRoute === NEWSFEED){
            API.RegisterEvent("Nf-view", {
                actionType: "View screen"
            })
        }
        this.navigation.navigate(this.currentRoute, {})
    }

    @action
    setPrevCurrentRoutes = (currentRoute: string, prevRoute: string) => {
        console.log(currentRoute + ', ' + prevRoute);
    }


}