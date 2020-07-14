var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import React, { Component } from 'react';
import { BackHandler, Animated, Image, View, Platform, AsyncStorage } from 'react-native';
import { Facebook, Constants } from 'expo';
import theme from '../theme';
import Step0 from './Step0';
import Step1 from './Step1';
import Step2 from './Step2';
import Step3 from './Step3';
import Step4 from './Step4';
import Step5 from './Step5';
import Step6 from './Step6';
import Step7 from './Step7';
import Step8 from './Step8';
import Step9 from './Step9';
import * as API from '../../../services/api';
import { loginViaFBProvider, loginViaAnonProvider, updateUser } from '../../../services';
const logoImage = require('../../../../assets/images/logo.png');
export default class Onboarding extends Component {
    constructor() {
        super(...arguments);
        this.state = {
            screenIndex: 0,
            fadeIn: new Animated.Value(1),
            facebookData: {
                name: '',
                token: '',
                expires: 0,
                id: ''
            }
        };
        this.onNext = () => {
            this.setEvent(this.state.screenIndex);
            this.state.fadeIn.setValue(1);
            Animated.timing(this.state.fadeIn, {
                toValue: 0,
                duration: 300,
                useNativeDriver: true
            }).start();
            setTimeout(() => {
                this.setState({ screenIndex: this.state.screenIndex + 1 });
                Animated.timing(this.state.fadeIn, {
                    toValue: 1,
                    duration: 200,
                    useNativeDriver: true
                }).start();
            }, 350);
        };
        this.setEvent = (index) => {
            switch (index) {
                case 0:
                    API.RegisterEvent('On-Newsfeed', { actionType: 'View screen' });
                    break;
                case 1:
                    API.RegisterEvent('On-Switch', { actionType: 'View screen' });
                    break;
                case 2:
                    API.RegisterEvent('On-Drag', { actionType: 'View screen' });
                    break;
                case 3:
                    API.RegisterEvent('On-Drag', { actionType: 'View screen' });
                    break;
                case 4:
                    API.RegisterEvent('On-TapForDetails', { actionType: 'View screen' });
                    break;
                case 5:
                    API.RegisterEvent('On-Zoom', { actionType: 'View screen' });
                    break;
                case 6:
                    API.RegisterEvent('On-MatchSkirt', { actionType: 'View screen' });
                    break;
                case 8:
                    API.RegisterEvent('On-Welcome', { actionType: 'View screen' });
                    break;
                default:
                    break;
            }
        };
        this.onFacebookSignUp = () => __awaiter(this, void 0, void 0, function* () {
            const { facebookData } = this.state;
            API.RegisterEvent('On-FbSignup1', { actionType: 'Click button' });
            if (facebookData.name.length > 0)
                this.FBLogin(facebookData.token, facebookData.expires);
            else
                this.ShowFacebookSignUpModal();
        });
        this.ShowFacebookSignUpModal = () => __awaiter(this, void 0, void 0, function* () {
            let authData;
            try {
                authData = yield Facebook.logInWithReadPermissionsAsync('2127807207434704', {
                    permissions: ['public_profile', 'email'],
                    behavior: this.isAStandaloneApp() ? 'native' : 'web'
                });
            }
            catch (err) {
                console.log(err.toString());
            }
            const { type, token, expires } = authData;
            if (type === 'success') {
                this.FBLogin(token, expires);
            }
            else {
                console.log(`Facebook.logInWithReadPermissionsAsync: ${type}`);
            }
        });
        this.saveFacebookData = (param) => __awaiter(this, void 0, void 0, function* () {
            try {
                yield AsyncStorage.setItem('FacebookUser', JSON.stringify(param));
            }
            catch (error) {
                console.log('Error in saving Facebook AsName', error.toString());
            }
        });
        this.backupFacebookAPIToken = () => __awaiter(this, void 0, void 0, function* () {
            try {
                const data = yield AsyncStorage.getItem('FacebookUser');
                if (data !== null) {
                    // We have data!!
                    const facebookData = JSON.parse(data);
                    const CT = new Date().getTime();
                    if (CT < facebookData.expires * 1000) {
                        this.setState({ facebookData });
                    }
                }
            }
            catch (error) {
                // Error retrieving data
                console.log('Error in getting saved Facebook API Token', error.toString());
            }
        });
        this.FBLogin = (token, expires) => {
            this.props.setLoading(true);
            loginViaFBProvider(token).then((data) => {
                const userId = data.auth.authInfo.userId;
                const userProfile = data.auth.authInfo.userProfile.data;
                this.saveFacebookData({
                    token,
                    expires,
                    name: userProfile.first_name,
                    id: data.auth.authInfo.userProfile.identities[0].id
                });
                this._updateUser(userId, userProfile);
            }, (error) => {
                this.props.setLoading(false);
                console.log(error.message);
            });
        };
        this._updateUser = (userId, userProfile) => {
            updateUser(userProfile).then(() => __awaiter(this, void 0, void 0, function* () {
                yield this.props.setUserDetails(userId, userProfile);
                this.props.onSkipSignUp();
                this.props.setLoading(false);
            }), error => console.log(error));
        };
        this.isAStandaloneApp = () => {
            return !(Platform.OS === 'ios' && Constants.appOwnership === 'expo');
        };
        this.onSkipSignUp = () => {
            API.RegisterEvent('On-ContinueNewsfeed', { actionType: 'Click button' });
            this.props.setLoading(true);
            loginViaAnonProvider().then((data) => {
                const userId = data.auth.authInfo.userId;
                // const userProfile = data.auth.authInfo.userProfile.data;
                const userProfile = {
                    email: 'anonymous',
                    firstName: 'anonymous',
                    lastName: 'anonymous',
                    name: 'anonymous'
                };
                this._updateUser(userId, userProfile);
            }, (error) => {
                this.props.setLoading(false);
                console.log(error.message);
            });
        };
        this._goBack = () => {
        };
    }
    componentDidMount() {
        BackHandler.addEventListener('hardwareBackPress', this._goBack);
        API.RegisterEvent('On-Splash', { actionType: 'View screen' });
        this.backupFacebookAPIToken();
    }
    componentWillUnmount() {
        BackHandler.removeEventListener('hardwareBackPress', this._goBack);
    }
    render() {
        const { screenIndex, facebookData } = this.state;
        return (React.createElement(View, { style: theme.container },
            screenIndex === 6 || screenIndex === 9 || React.createElement(Image, { source: logoImage, style: theme.logo }),
            React.createElement(Animated.View, { style: [theme.container, { opacity: this.state.fadeIn }] },
                screenIndex === 0 &&
                    React.createElement(Step0, { continue: this.onNext }),
                screenIndex === 1 &&
                    React.createElement(Step1, { continue: this.onNext }),
                screenIndex === 2 &&
                    React.createElement(Step2, { continue: this.onNext }),
                screenIndex === 3 &&
                    React.createElement(Step3, { continue: this.onNext }),
                screenIndex === 4 &&
                    React.createElement(Step4, { continue: this.onNext }),
                screenIndex === 5 &&
                    React.createElement(Step5, { continue: this.onNext }),
                screenIndex === 6 &&
                    React.createElement(Step6, { continue: this.onNext }),
                screenIndex === 7 &&
                    React.createElement(Step7, { continue: this.onNext }),
                screenIndex === 8 &&
                    React.createElement(Step8, { continue: this.onNext }),
                screenIndex === 9 &&
                    React.createElement(Step9, { firstName: facebookData.name, facebookId: facebookData.id, continue: this.onNext, onFacebookSignUp: this.onFacebookSignUp, onSkipSignUp: this.onSkipSignUp }))));
    }
}
//# sourceMappingURL=Onboarding.js.map