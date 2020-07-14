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
import React, { Component } from 'react';
import { AsyncStorage } from 'react-native';
import { inject, observer } from 'mobx-react';
import { Permissions, Notifications } from 'expo';
import { NavigatorStack } from '../../navigation';
import { Footer, FooterButtons, ContextMenu } from '../../shared';
import { ROOT_STORE } from '../../stores';
import { getAuthUserData, autoLogOut } from '../../../services';
import DotIndicator from '../../shared/components/Indicators/dot-indicator';
import { Onboarding } from '../../onboarding';
import AuthControls from './AuthControls';
import ReSignIn from './ResignIn';
const DAY_TIME = 24 * 3600 * 1000;
const iconURL = 'http://www.mused-app.com/assets/notification-icon.png';
const PushMessages = [
    {
        day: 1,
        message: 'New street style lokksready to edit'
    },
    {
        day: 3,
        message: 'New street style looksready to edit'
    },
    {
        day: 6,
        message: 'New street style lokksready to edit'
    },
    {
        day: 9,
        message: 'New street style looksready to edit'
    },
    {
        day: 12,
        message: 'New street style lokksready to edit'
    },
];
function AuthControlsHOC(Onboarding) {
    let NewComponent = class NewComponent extends Component {
        constructor() {
            super(...arguments);
            this.state = {
                newUser: false,
                skipped: false,
                token: null,
                notification: null,
            };
            this.handleNotification = (notification) => {
                this.setState({
                    notification,
                });
                console.log('Notification Data', notification);
            };
            this.sendPushNotification = (token = this.state.token) => {
                return fetch('https://exp.host/--/api/v2/push/send', {
                    body: JSON.stringify({
                        to: token,
                        title: 'Mused',
                        body: 'Welcome to You!',
                        data: { message: 'Welcome to You!' },
                    }),
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    method: 'POST',
                });
            };
            this.checkAutoLoggedOut = () => __awaiter(this, void 0, void 0, function* () {
                try {
                    const autoLoggedOut = yield AsyncStorage.getItem('autoLoggedOut');
                    if (autoLoggedOut !== null) {
                        if (autoLoggedOut === 'true')
                            autoLogOut();
                        this.setState({ newUser: false });
                    }
                }
                catch (error) {
                    // Error retrieving data
                    console.log(error.toString());
                }
            });
            this._onSkipSignUp = () => __awaiter(this, void 0, void 0, function* () {
                this.registerForPushNotifications();
                this.setState({ newUser: false });
            });
        }
        componentDidMount() {
            this.checkAutoLoggedOut();
            const userAuthData = getAuthUserData();
            // user logged in            
            if (userAuthData) {
                const { userId, userProfile } = userAuthData;
                const { setUserDetails } = this.props.root.user;
                setUserDetails(userId, userProfile);
            }
            else {
                this.setState({ newUser: true });
            }
        }
        registerForPushNotifications() {
            return __awaiter(this, void 0, void 0, function* () {
                const { status } = yield Permissions.getAsync(Permissions.NOTIFICATIONS);
                if (status !== 'granted') {
                    const { status } = yield Permissions.askAsync(Permissions.NOTIFICATIONS);
                    if (status !== 'granted') {
                        return;
                    }
                }
                const token = yield Notifications.getExpoPushTokenAsync();
                Notifications.addListener(this.handleNotification);
                this.setState({
                    token,
                });
                PushMessages.map((push) => {
                    Notifications.scheduleLocalNotificationAsync({
                        title: 'Mused',
                        body: push.message,
                        icon: iconURL
                    }, {
                        time: (new Date().getTime()) + DAY_TIME * push.day,
                    });
                });
            });
        }
        render() {
            const { root: { user, ui } } = this.props;
            const { loading, setUserDetails, autoLoggedOut, removeAuthLogOut } = user;
            const { requireAuth, requestAuth, setLoading, navigate } = ui;
            const { newUser } = this.state;
            // user Auth ID
            if (autoLoggedOut) {
                return (React.createElement(ReSignIn, { setUserDetails: setUserDetails, requestAuth: requestAuth, setLoading: setLoading, removeAuthLogOut: removeAuthLogOut, navigate: navigate }));
            }
            else if (!newUser && loading) {
                return React.createElement(DotIndicator, { size: 6, count: 3 });
            }
            else if (newUser) {
                return React.createElement(Onboarding, { onSkipSignUp: this._onSkipSignUp });
            }
            return (React.createElement(React.Fragment, null,
                React.createElement(NavigatorStack, null),
                React.createElement(Footer, null),
                React.createElement(FooterButtons, null),
                React.createElement(ContextMenu, null),
                requireAuth &&
                    React.createElement(AuthControls, { setUserDetails: setUserDetails, requestAuth: requestAuth, setLoading: setLoading })));
        }
    };
    NewComponent = __decorate([
        inject(ROOT_STORE),
        observer
    ], NewComponent);
    return NewComponent;
}
export default AuthControlsHOC(Onboarding);
//# sourceMappingURL=AuthControls.hoc.js.map