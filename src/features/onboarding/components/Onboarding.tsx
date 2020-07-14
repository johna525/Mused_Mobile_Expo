import React, { Component } from 'react';
import {
    BackHandler,
    Animated,
    Image,
    View,
    Platform,
    AsyncStorage
} from 'react-native';
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
import { loginViaFBProvider, loginViaAnonProvider, updateUser } from '../../../services'

const logoImage = require('../../../../assets/images/logo.png');

type Props = {
    navigation: any;
    setUserDetails: (userId: string, userProfile: UserProfile) => void;
    onSkipSignUp: () => void;
    setLoading: (value: boolean) => void
}

type State = {
  screenIndex: number;
  fadeIn: any;
  facebookData: any
};
export default class Onboarding extends Component<Props, State> {
    state: State = {
      screenIndex: 0,
      fadeIn: new Animated.Value(1),
      facebookData: {
        name: '',
        token: '',
        expires: 0,
        id: ''
      }
    }

    componentDidMount() {
        BackHandler.addEventListener('hardwareBackPress', this._goBack);
        API.RegisterEvent('On-Splash', {actionType: 'View screen'});
        this.backupFacebookAPIToken();
    }

    componentWillUnmount() {
        BackHandler.removeEventListener('hardwareBackPress', this._goBack);
    }

    onNext = () => {
      this.setEvent(this.state.screenIndex);
      this.state.fadeIn.setValue(1)
      Animated.timing(                 
          this.state.fadeIn,            
          {
              toValue: 0,                   
              duration: 300, 
              useNativeDriver: true             
          }
      ).start(); 
      setTimeout(() => {
        this.setState({screenIndex: this.state.screenIndex + 1});
        Animated.timing(                 
            this.state.fadeIn,            
            {
                toValue: 1,                   
                duration: 200, 
                useNativeDriver: true             
            }
        ).start(); 
      }, 350) 
    }

    setEvent = (index: number) => {
      switch(index){
        case 0:
          API.RegisterEvent('On-Newsfeed', {actionType: 'View screen'})
          break;
        case 1:
          API.RegisterEvent('On-Switch', {actionType: 'View screen'})
          break;
        case 2:
          API.RegisterEvent('On-Drag', {actionType: 'View screen'})
          break;
        case 3:
          API.RegisterEvent('On-Drag', {actionType: 'View screen'})
          break;
        case 4:
          API.RegisterEvent('On-TapForDetails', {actionType: 'View screen'})
          break;
        case 5:
          API.RegisterEvent('On-Zoom', {actionType: 'View screen'})
          break;
        case 6:
          API.RegisterEvent('On-MatchSkirt', {actionType: 'View screen'})
          break;
        case 8:
          API.RegisterEvent('On-Welcome', {actionType: 'View screen'})
          break;
        default:
          break;
      }
    }

    onFacebookSignUp = async () => {
      const { facebookData } = this.state;
      API.RegisterEvent('On-FbSignup1', {actionType: 'Click button'})
      if(facebookData.name.length > 0) this.FBLogin(facebookData.token, facebookData.expires);
      else this.ShowFacebookSignUpModal();
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
        if (type === 'success') {
            this.FBLogin(token, expires)
        } else {
            console.log(`Facebook.logInWithReadPermissionsAsync: ${type}`);
        }
    }

    saveFacebookData = async (param: any) => {
      try {
        await AsyncStorage.setItem('FacebookUser', JSON.stringify(param))
      } catch (error) {
        console.log('Error in saving Facebook AsName', error.toString())
      }   
    }

    backupFacebookAPIToken = async () => {
      try {
        const data = await AsyncStorage.getItem('FacebookUser');
        if (data !== null) {
          // We have data!!
          const facebookData = JSON.parse(data);
          const CT = new Date().getTime();
          if(CT < facebookData.expires * 1000){
            this.setState({ facebookData })
          }
        }
      } catch (error) {
        // Error retrieving data
        console.log('Error in getting saved Facebook API Token', error.toString())
      }
    }

    FBLogin = (token: string, expires: number) => {
      this.props.setLoading(true)
      loginViaFBProvider(token).then((data: any) => {
          const userId = data.auth.authInfo.userId;
          const userProfile = data.auth.authInfo.userProfile.data;
          this.saveFacebookData({
            token,
            expires,
            name: userProfile.first_name,
            id: data.auth.authInfo.userProfile.identities[0].id
          });
          this._updateUser(userId, userProfile);
      }, (error: Error) => {
        this.props.setLoading(false)
        console.log(error.message)
      })
    }

    _updateUser = (userId: string, userProfile: any) => {
      updateUser(userProfile).then(
          async () => {
              await this.props.setUserDetails(userId, userProfile)
              this.props.onSkipSignUp()
              this.props.setLoading(false)
          },
          error => console.log(error)
      );
    };

    isAStandaloneApp = () => {
      return !(Platform.OS === 'ios' && Constants.appOwnership === 'expo');
    };

    onSkipSignUp = () => {
      API.RegisterEvent('On-ContinueNewsfeed', {actionType: 'Click button'});
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
      }, (error: Error) => {
        this.props.setLoading(false)
        console.log(error.message)
      })
    }

    render() {
      const { screenIndex, facebookData } = this.state;
        return (
          <View style={theme.container}>
            {screenIndex === 6 || screenIndex === 9 || <Image source={logoImage} style={theme.logo} />  }
            <Animated.View style={[theme.container, {opacity: this.state.fadeIn}]}>
            
            { 
              screenIndex === 0 && 
              <Step0 continue={this.onNext}/> 
            }
            { 
              screenIndex === 1 && 
              <Step1 continue={this.onNext}/> 
            }
            { 
              screenIndex === 2 && 
              <Step2 continue={this.onNext}/> 
            }
            { 
              screenIndex === 3 && 
              <Step3 continue={this.onNext}/> 
            }
            { 
              screenIndex === 4 && 
              <Step4 continue={this.onNext}/> 
            }
            { 
              screenIndex === 5 && 
              <Step5 continue={this.onNext}/> 
            }
            { 
              screenIndex === 6 && 
              <Step6 continue={this.onNext}/> 
            }
            { 
              screenIndex === 7 && 
              <Step7 continue={this.onNext}/> 
            }
            { 
              screenIndex === 8 && 
              <Step8 continue={this.onNext}/> 
            }
            { 
              screenIndex === 9 && 
              <Step9 
                firstName={facebookData.name}
                facebookId={facebookData.id}
                continue={this.onNext}
                onFacebookSignUp={this.onFacebookSignUp}
                onSkipSignUp={this.onSkipSignUp}
              /> 
            }
            </Animated.View>  
          </View>           
        )
    }

    _goBack = () => {

    }
    
}
