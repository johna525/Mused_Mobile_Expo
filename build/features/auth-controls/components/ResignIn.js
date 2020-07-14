var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import React, { Component } from 'react';
import { Facebook, Constants } from 'expo';
import { Platform, Text, View, TouchableWithoutFeedback, StyleSheet, Image, Dimensions, AsyncStorage } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { loginViaFBProvider, loginViaAnonProvider, updateUser } from '../../../services';
import * as API from '../../../services/api';
const { width } = Dimensions.get('window');
const logoImage = require('../../../../assets/images/logo.png');
const styles = StyleSheet.create({
    container: {
        position: 'absolute',
        top: 0,
        bottom: 0,
        left: 0,
        right: 0,
        backgroundColor: '#FFFFFF',
        alignItems: 'center',
        justifyContent: 'center'
    },
    logoImage: {
        marginBottom: 25,
        width: width * 0.25,
        height: width * 0.25 * 86 / 243,
        resizeMode: 'stretch'
    },
    facebookButton: {
        width: width * 0.8,
        flexDirection: 'row',
        alignItems: 'center',
        height: 50,
        backgroundColor: '#4A56B8',
        marginBottom: 20,
        padding: 10
    },
    facebookTextView: {
        flex: 1,
        height: 50,
        borderLeftColor: 'white',
        borderLeftWidth: 0,
        justifyContent: 'center',
        alignItems: 'center',
    },
    facebookText: {
        color: 'white',
        fontSize: 14,
        letterSpacing: 1,
        fontFamily: 'RalewayBold'
    },
    skipButton: {
        width: width * 0.8,
        height: 40,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'white'
    },
    bottomText: {
        fontSize: 14,
        color: 'black',
        backgroundColor: 'transparent',
        fontFamily: 'QuickSandRegular'
    }
});
export default class ReSignIn extends Component {
    constructor() {
        super(...arguments);
        this.state = {
            userData: null,
            firstName: '',
            token: ''
        };
        this.backupFacebookAPIToken = () => __awaiter(this, void 0, void 0, function* () {
            try {
                const data = yield AsyncStorage.getItem('FacebookAPIToken');
                if (data !== null) {
                    // We have data!!
                    const value = JSON.parse(data);
                    const CT = new Date().getTime();
                    if (CT < value.expires * 1000) {
                        const firstName = yield AsyncStorage.getItem('FacebookAsName');
                        this.setState({ firstName, token: value.token });
                    }
                }
            }
            catch (error) {
                // Error retrieving data
                console.log('Error in getting saved Facebook API Token', error.toString());
            }
        });
        this.onClickFacebook = () => {
            if (this.state.firstName.length > 0) {
                this.FBLogin(this.state.token, 'Login');
            }
            else {
                this.ShowFacebookSignUpModal();
            }
        };
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
            this.saveFacebookAPIToken(token, expires);
            if (type === 'success') {
                this.FBLogin(token, 'Signup');
            }
            else {
                console.log(`Facebook.logInWithReadPermissionsAsync: ${type}`);
            }
        });
        this.saveFacebookAPIToken = (token, expires) => __awaiter(this, void 0, void 0, function* () {
            try {
                yield AsyncStorage.setItem('FacebookAPIToken', JSON.stringify({ token, expires }));
            }
            catch (error) {
                console.log('Error in saving Facebook API Token', error.toString());
            }
        });
        this.FBLogin = (token, actionType) => {
            this.props.setLoading(true);
            loginViaFBProvider(token).then((data) => {
                const userId = data.auth.authInfo.userId;
                const userProfile = data.auth.authInfo.userProfile.data;
                console.log(userProfile);
                this.saveFacebookAsName(userProfile.first_name);
                this._updateUser(userId, userProfile);
                API.setIdentify(userProfile.email);
                API.RegisterEvent(actionType, { actionType });
                this.props.requestAuth(false);
                this.props.setLoading(false);
                this.props.removeAuthLogOut();
            }, (error) => {
                console.log(error.message);
                this.props.setLoading(false);
            });
        };
        this.onSkipSignUp = () => {
            API.RegisterEvent('On-emailsignup', { actionType: 'Click email signup button' });
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
                this.props.requestAuth(false);
                this.props.setLoading(false);
                this.props.removeAuthLogOut();
            }, (error) => {
                this.props.setLoading(false);
                console.log(error.message);
            });
        };
        this.saveFacebookAsName = (name) => __awaiter(this, void 0, void 0, function* () {
            try {
                yield AsyncStorage.setItem('FacebookAsName', name);
            }
            catch (error) {
                console.log('Error in saving Facebook AsName', error.toString());
            }
        });
        this._updateUser = (userId, userProfile) => {
            updateUser(userProfile).then(() => {
                this.props.setUserDetails(userId, userProfile);
            }, error => console.log(error));
        };
        this.isAStandaloneApp = () => {
            return !(Platform.OS === 'ios' && Constants.appOwnership === 'expo');
        };
    }
    componentDidMount() {
        // this.backupFacebookAPIToken();
    }
    render() {
        return (React.createElement(View, { style: styles.container },
            React.createElement(Image, { source: logoImage, style: styles.logoImage }),
            React.createElement(TouchableWithoutFeedback, { onPress: () => this.onClickFacebook() },
                React.createElement(View, { style: styles.facebookButton },
                    React.createElement(Ionicons, { name: "logo-facebook", size: 40, color: 'white' }),
                    React.createElement(View, { style: styles.facebookTextView },
                        React.createElement(Text, { style: styles.facebookText }, "CONTINUE WITH FACEBOOK")))),
            React.createElement(TouchableWithoutFeedback, { onPress: () => this.onSkipSignUp() },
                React.createElement(View, { style: styles.skipButton },
                    React.createElement(Text, { style: styles.bottomText },
                        "...or signup using ",
                        React.createElement(Text, { style: { textDecorationLine: 'underline' } }, "your email"))))));
    }
}
//# sourceMappingURL=ResignIn.js.map