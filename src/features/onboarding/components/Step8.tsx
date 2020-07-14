import React, { Component } from 'react';
import {
  View,
  StyleSheet,
  Text,
  TouchableWithoutFeedback
} from 'react-native';
import theme from '../theme';
import TypeWriterText from './Typewriter'

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF'
  },
  textView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingBottom: 60
  },
  section: {
    marginVertical: 15,
  }
})

type Props = {
  continue: () => void;
}

export default class Step7 extends Component<Props> {

    onPressClick = () => {
      this.props.continue();
    }

    render() {
      return (
        <View style={styles.container}>
          <View style={styles.textView}>
            <View style={styles.section}>
              <TypeWriterText 
                text={['Well done!', '']} 
                delay={0}
                style={{fontSize: 18, height: 20, letterSpacing: 0, fontFamily: 'QuickSandBold'}}
              />
            </View>
            <View style={styles.section}>
              <TypeWriterText 
                text={['You can play with different styles',  'or create new looks']} 
                delay={2000}
                style={{fontSize: 18, letterSpacing: 0, height: 25, fontFamily: 'QuickSandRegular'}}
              />
            </View>
            <View style={styles.section}>
              <TypeWriterText 
                text={['it‘s completely up to you...', '']}
                delay={5500}
                style={{fontSize: 18, letterSpacing: 0, fontFamily: 'QuickSandBold'}}
              />
            </View>
          </View>
          <View style={theme.buttonButtonView}>
            <TouchableWithoutFeedback onPress={() => this.onPressClick()} >
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
