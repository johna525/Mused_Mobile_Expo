import React, { Component } from 'react';
import { Facebook, Constants } from 'expo';
import {
    Platform,
    Text,
    View,
    TouchableWithoutFeedback,
    StyleSheet,
    Image,
    Dimensions,
    AsyncStorage,
    Animated
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import {
    loginViaFBProvider,
    loginViaAnonProvider,
    updateUser 
} from '../../../services'
import * as API from '../../../services/api';

const { width } = Dimensions.get('window');
const logoImage = require('../../../../assets/images/join.png');
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
    content: {
        flex: 1,
        position: 'relative',
        justifyContent: 'center',
        alignItems: 'center'
    },
    logoImage: {
        marginBottom: 45,
        width: width * 0.6,
        height: width * 0.6 * 2.5 / 10.11,
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
})

type Props = {
    setUserDetails: (userId: string, userProfile: UserProfile) => void;
    requestAuth: (value: boolean) => void;
    setLoading: (value: boolean) => void
}

type State = {
    userData: any;
    errorMsg: string;
    firstName: string;
    token: string;
    opacity: any
};

export default class AuthControls extends Component<Props, State> {
    state: State = {
        userData: null,
        errorMsg: null,
        firstName: '',
        token: '',
        opacity: new Animated.Value(0)
    };

    componentDidMount() {
        // this.backupFacebookAPIToken();
        setTimeout(() => {
            Animated.timing(                 
                this.state.opacity,            
                {
                    toValue: 1,
                    duration: 1500, 
                }
            ).start()
        }, 500)        
    }

    backupFacebookAPIToken = async () => {
        try {
            const data = await AsyncStorage.getItem('FacebookAPIToken');
            if (data !== null) {
                // We have data!!
                const value = JSON.parse(data);
                const CT = new Date().getTime();
                if(CT < value.expires * 1000){
                    const firstName = await AsyncStorage.getItem('FacebookAsName');
                    this.setState({firstName, token: value.token})
                }
            }
        } catch (error) {
            // Error retrieving data
            console.log('Error in getting saved Facebook API Token', error.toString())
        }
    }

    onClickFacebook = () => {        
        if(this.state.firstName.length > 0){
            this.FBLogin(this.state.token, 'Login');            
        }
        else{
            this.ShowFacebookSignUpModal()
        } 
    }

    ShowFacebookSignUpModal = async () => {
        let authData;
        try {
            authData = await Facebook.logInWithReadPermissionsAsync('2127807207434704', {
                permissions: ['public_profile', 'email'],
                behavior: this.isAStandaloneApp() ? 'native' : 'web'
            });
        } catch (err) {
            console.log(err.toString())
        }
        const { type, token, expires } = authData;
        this.saveFacebookAPIToken(token, expires);
        if (type === 'success') {
            this.FBLogin(token, 'Signup')
        } else {
            console.log(`Facebook.logInWithReadPermissionsAsync: ${type}`);
        }
    }

    saveFacebookAPIToken = async (token: string, expires: number) => {
        try {
          await AsyncStorage.setItem('FacebookAPIToken', JSON.stringify({token, expires}))
        } catch (error) {
          console.log('Error in saving Facebook API Token', error.toString())
        }    
    }

    FBLogin = (token: string, actionType: string) => {
        this.props.setLoading(true)
        loginViaFBProvider(token).then((data: any) => {
            const userId = data.auth.authInfo.userId;
            const userProfile = data.auth.authInfo.userProfile.data;
            console.log(userProfile)
            this._updateUser(userId, userProfile);
            API.setIdentify(userProfile.email);
            API.RegisterEvent(actionType, { actionType })            
            this.props.requestAuth(false);
            this.props.setLoading(false);
        }, (error: Error) => {
          console.log(error.message)
          this.props.setLoading(false)
        })
    }

    _updateUser = (userId: string, userProfile: any) => {
        updateUser(userProfile).then(
            () => {
                this.props.setUserDetails(userId, userProfile)
            },
            error => console.log(error)
        );
    };

    isAStandaloneApp = () => {
        return !(Platform.OS === 'ios' && Constants.appOwnership === 'expo');
    };

    onSkipSignUp = () => {
        API.RegisterEvent('On-emailsignup', {actionType: 'Click email signup button'});
        this.props.setLoading(true)
        loginViaAnonProvider().then((data: any) => {
          const userId = data.auth.authInfo.userId;
          // const userProfile = data.auth.authInfo.userProfile.data;
          const userProfile = {
            email: 'anonymous',
            firstName: 'anonymous',
            lastName: 'anonymous',
            name: 'anonymous'
          }
          this._updateUser(userId, userProfile);
          this.props.requestAuth(false);
          this.props.setLoading(false);     
        }, (error: Error) => {
          this.props.setLoading(false)
          console.log(error.message)
        })
      }

    render() {
        return (
            <View style={styles.container}>
                <Animated.View style={[styles.container, {opacity: this.state.opacity}]}>
                    <Image source={logoImage} style={styles.logoImage} />
                    <TouchableWithoutFeedback onPress={() => this.onClickFacebook()}>
                        <View style={styles.facebookButton}>
                            <Ionicons name="logo-facebook" size={40} color='white' />
                            <View style={styles.facebookTextView}>
                            <Text style={styles.facebookText}>CONTINUE WITH FACEBOOK</Text>
                            </View>                
                        </View>
                    </TouchableWithoutFeedback>
                </Animated.View>
            </View>
        )
      }
}
