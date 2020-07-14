import React, { Component } from 'react';
import {
  View,
  Text,
  StyleSheet,
} from 'react-native';

type Props = {
    text: any;
    onEndEffect?: () => void;
    style?: any;
    delay?: number;
}

type State = {
  textLength: number,
  text: string;
};

const styles = StyleSheet.create({
  text: {
    fontSize: 25,
    height: 30,
    textAlign: 'center',
    fontFamily: 'RalewayBold',
    letterSpacing: 1,
  }
})

export default class TypeWriterText extends Component<Props, State> {
    static defaultProps = {
      style: {},
      delay: 500,
      onEndEffect: () => {}
    }
    state: State = {
      textLength: 0,
      text: ''
    }
    
    timer: any;

    componentDidMount() {
      setTimeout(() => {
        this.startTypeWriterAnimation(1);
        this.setState({text: JSON.stringify(this.props.text)})
      }, this.props.delay)      
    }

    componentWillUnmount() {
      clearTimeout(this.timer)
    }

    componentWillReceiveProps(props: any) {
      if(JSON.stringify(props.text) !== this.state.text){
        this.startTypeWriterAnimation(1);
        this.setState({text: JSON.stringify(props.text)})
      } 
    }

    startTypeWriterAnimation = (length: number) => {
        this.timer = setTimeout(() => {
            this.setState({textLength: length});
            if(length < this.props.text[0].length + this.props.text[1].length){
              this.startTypeWriterAnimation(length + 1);
            } 
            else {
              this.props.onEndEffect()           
            }
        }, 25)
    }

    render() {
        return (
          <View>
            <Text style={[styles.text, this.props.style]}>
              {this.props.text[0].substr(0, this.state.textLength)}
            </Text>
            <Text style={[styles.text, this.props.style]}>
              {this.props.text[1].substr(0, this.state.textLength - this.props.text[0].length)}
            </Text>
          </View>
          
        )
    }
}
