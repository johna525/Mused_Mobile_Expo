import React, { Component } from 'react';
import {
  View,
  Image,
  Text,
  StyleSheet,
  TouchableWithoutFeedback,
  Dimensions
} from 'react-native';
import { Video } from 'expo';
import theme from '../theme';

const { width } = Dimensions.get('window');
const newfeedImage = require('../../../../assets/images/onboard/Screen1/background.jpg');
const logoImage = require('../../../../assets/images/onboarding-0-logo.jpg');
const videoSource = require('../../../../assets/videos/onboarding-1st.mp4');
type Props = {
    continue: () => void;
}

const styles = StyleSheet.create({
  content: {
    flex: 1,
    paddingBottom: 20,
    alignItems: 'center',
    position: 'relative'
  },
  logoImage: {
    width: width * 0.7,
    height: width * 0.7 * 296 / 800,
    resizeMode: 'stretch',
    marginLeft: width * 0.15,
    marginTop: -10
  },
  videoView: {
    position: 'absolute',
    bottom: 50,
    left: 0,
    right: 0,
    height: width * 192 / 700,
    alignItems: 'center',
  },
  headerText1: {
    fontSize: 26,
    fontFamily: 'RalewayBold',
    textAlign: 'center'
  },
  headerText2: {
    justifyContent: 'center',
    flexDirection: 'row',
    alignItems: 'center'
  }
})

export default class Step0 extends Component<Props> {
  
    render() {
        return (
            <View style={theme.container}>
              <Image source={logoImage} style={styles.logoImage} />            
              <View style={styles.content}>
                <Image source={newfeedImage} style={theme.fullWidthImage} />
              </View>
              <View style={styles.videoView}>
                <Video
                  shouldPlay={true}
                  resizeMode={Video.RESIZE_MODE_CONTAIN}
                  source={videoSource}
                  isLooping
                  style={{
                      height: width * 192 / 700,
                      backgroundColor: '#FFFFFF',
                      width: width / 2,
                  }}
                  useNativeControls={false}
                  usePoster={false}
                />  
              </View>
              <View style={theme.buttonButtonView}>
                <TouchableWithoutFeedback onPress={() => this.props.continue()} >
                  <View style={theme.buttonWrapper}>
                    <View style={theme.line} />
                    <Text style={theme.bottomButtonText}>CONTINUE</Text>
                    <View style={theme.line} />
                  </View>
                </TouchableWithoutFeedback>
              </View>
            </View>             
        )
    }
}
