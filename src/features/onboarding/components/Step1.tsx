import React, { Component } from 'react';
import {
  View,
  Image,
  TouchableOpacity,
  StyleSheet,
  Dimensions,
  Animated
} from 'react-native';
import theme from '../theme';
import TypeWriterText from './Typewriter'

const templateImage = require('../../../../assets/images/onboard/Screen2/template.jpg');
const fadeImage = require('../../../../assets/images/onboard/Screen2/photo.jpg');
const { width } = Dimensions.get('window');
const styles = StyleSheet.create({
  content: {
    flex: 1,
    paddingBottom: 20,
  },
  imageWrapper: {
    width: width,
    height: width * 568 / 400,
    position: 'relative',
    marginTop: 10
  },
  templateImage: {
    width: width,
    height: width * 568 / 400,
    resizeMode: 'stretch'
  },
  fadeImageWrapper: {
    position: 'absolute',
    width: width * 530 / 788,
    height: width * 775 / 788,
    top: width * 63 / 788,
    left: width * 118 / 788
  },
  fadeImage: {
      width: width * 530 / 800,
      height: width * 775 / 800,
  }
})

type Props = {
  continue: () => void;
}

export default class Step1 extends Component<Props> {

    render() {
        return (
            <View style={theme.container}>
              <View style={styles.content}>
                <TypeWriterText text={['Just tap to see the pieces', 'used in a look']} />
                <View style={styles.imageWrapper}>
                  <Image source={templateImage} style={styles.templateImage} />
                  <TouchableOpacity style={styles.fadeImageWrapper} onPress={() => this.props.continue()}>
                    <Animated.Image source={fadeImage} style={styles.fadeImage} />
                  </TouchableOpacity>
                </View>                
              </View>  
            </View>             
        )
    }
}
