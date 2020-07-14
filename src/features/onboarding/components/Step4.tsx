import React, { Component } from 'react';
import {
  View,
  TouchableWithoutFeedback,
  Text,
  StyleSheet,
  Dimensions,
  // Image
} from 'react-native';
import { Video } from 'expo';
import theme from '../theme';
import TypeWriterText from './Typewriter'

const videoSource = require('../../../../assets/videos/Move.mp4');
// const logoImage = require('../../../../assets/images/new-view.jpg');
const { width } = Dimensions.get('window');
const styles = StyleSheet.create({
  content: {
    flex: 1,
    position: 'relative'
  },
  videoView: {
    marginVertical: 30,
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  },
  logoImage: {
    width: width * 0.8,
    height: width * 0.8 * 296 / 900,
    resizeMode: 'stretch',
    marginLeft: width * 0.1
  },
})

type Props = {
  continue: () => void;
}

export default class Step3 extends Component<Props> {

    render() {
      return (
        <View style={{flex: 1}}>
          <TypeWriterText text={["This ‘view‘ helps you", 'visualise your look']} />
          {/* <Image source={logoImage} style={styles.logoImage} />      */}
          <View style={styles.content}>
            <View style={styles.videoView}>
              <TouchableWithoutFeedback onPress={() => this.props.continue()} >
                <Video
                    shouldPlay={true}
                    resizeMode={Video.RESIZE_MODE_CONTAIN}
                    source={videoSource}
                    isLooping={false}
                    style={{
                        height: width * 0.9,
                        backgroundColor: '#ffffff',
                        width: width * 0.9 * 448 / 554,
                        borderWidth: 4,
                        borderColor: 'white'
                    }}
                    useNativeControls={false}
                    usePoster={false}
                />
              </TouchableWithoutFeedback>
            </View>
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
