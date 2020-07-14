import React, { Component } from 'react';
import {
  View,
  Image,
  Text,
  StyleSheet,
  Dimensions,
  Animated,
  ScrollView,
  TouchableWithoutFeedback,
  Easing
} from 'react-native';
import theme from '../theme';
import Ripple from 'react-native-material-ripple';
import TypeWriterText from './Typewriter'
import * as API from '../../../services/api';

const shirtImage = require('../../../../assets/images/onboarding-21-shirt.jpg');
const shoesImage = require('../../../../assets/images/onboarding-21-shoe.jpg');
const trousersImage = require('../../../../assets/images/onboarding-21-trousers.jpg');
const browseImage1 = require('../../../../assets/images/onboarding-22-shirt1.jpg');
const browseImage2 = require('../../../../assets/images/onboarding-22-shirt2.jpg');
const browseImage3 = require('../../../../assets/images/onboarding-22-shirt3.jpg');
const browseImage4 = require('../../../../assets/images/onboarding-22-shirt4.jpg');
const arrow2GIF = require('../../../../assets/images/arrow2.gif');
// const arrow3GIF = require('../../../../assets/images/arrow3.gif');

const { width } = Dimensions.get('window');
const styles = StyleSheet.create({
  content: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
  },
  containerItem: {
    justifyContent: 'space-between', 
    backgroundColor: '#FFFFFF',
    flexDirection: 'row',
    marginTop: 10
  },
  alterContainer: {
    flex: 0.3,
  },
  alterItem: {
    borderWidth: 1,
    borderColor: '#000',
    width: 30,
    height: 20,
    alignItems: 'center',
    justifyContent: 'center',
  },
  countText: {
    textAlign: 'center',
    fontSize: 10,
    color: '#000',
    fontFamily: 'QuickSandRegular'
  },
  imageContainer: {
    flex: 0.4,
  },
  clickableImageContainer: {
    flex: 0.4, 
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#FFF',
    flexDirection: 'column',
    paddingVertical: 20,
    overflow: 'hidden',
  },
  clickableImageContainerLeft: {
    flex: 0.4, 
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#FFF',
    flexDirection: 'column',
    paddingVertical: 20,
    overflow: 'hidden',
    borderRightWidth: 1.5,
    borderBottomWidth: 2,
    borderColor: '#f9f9f9'
  },
  clickableImageContainerRight: {
    flex: 0.4, 
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#FFF',
    flexDirection: 'column',
    paddingVertical: 20,
    overflow: 'hidden',
    borderBottomWidth: 2,
    borderColor: '#f9f9f9'
  },
  itemImage: {
    width: width / 3, 
    height: 180,
  },
  preItemView: {
    height: 110,
    flexDirection: 'row',
    padding: 5,
  },
  preItemImage: {
    width: width / 6, 
    height: 100,
    marginHorizontal: 4
  },
  clickableTitle: {
    fontFamily: 'RalewayBold',
    fontSize: 11,
    color: '#000',
    marginTop: 10,
    marginBottom: 2,
    textAlign: 'center',
    letterSpacing: 2,
  },
  clickableSubTitle: {
      fontFamily: 'QuickSandRegular',
      fontSize: 11,
      color: '#000',
      textAlign: 'center'
  },
  scrollView: {
    flex: 1,
    width,    
  },
  descWrapper: {
    alignItems: 'center',
    height: 70,
    paddingBottom: 15,
  },
  gifIcon: {
    width: 50,
    height: 60,
    resizeMode: 'contain'
  },
  arrow3: {
    position: 'absolute',
    top: 0,
    left: 0,
    width: 50,
    height: 60,
    resizeMode: 'contain'
  }
})

type Props = {
  continue: () => void;  
}

type State = {
  fadeIn: any,
  itemMarginTop: any,
  selectedImage: any,
  step: number,
  slideCount: number,
  disableContinue: boolean
};

export default class Step2 extends Component<Props, State> {
  
    state: State = {
      fadeIn: new Animated.Value(1),
      itemMarginTop: new Animated.Value(0),
      step: 1,
      selectedImage: shirtImage,
      slideCount: 0,
      disableContinue: false
    }

    onPressClick = () => {
      if(this.state.step === 1) {
        Animated.timing(                 
          this.state.fadeIn,            
          {
              toValue: 0,                   
              duration: 500, 
          }
        ).start();
        setTimeout(() => {
          this.setState({step: 2})
          API.RegisterEvent('On-Create', {userType: 'View screen'});
          Animated.timing(                 
            this.state.fadeIn,            
            {
                toValue: 1,                   
                duration: 500, 
            }
          ).start();
        }, 500)
      } else if(!this.state.disableContinue){
        this.props.continue()
      }
    }

    onClickImage = (image: any) => {     
      this.state.itemMarginTop.setValue(0)
      Animated.timing(                 
        this.state.itemMarginTop,            
        {
          toValue: 300,
          duration: 300,
          easing: Easing.cubic
        }
      ).start(() => {
        this.state.itemMarginTop.setValue(0);        
        if(this.state.slideCount === 3){
          this.setState({disableContinue: true})
          setTimeout(() => {
            this.props.continue();
          }, 2000);          
        } 
        this.setState({selectedImage: image, slideCount: this.state.slideCount + 1});
      });
    }

    render() {
        return (
            <View style={theme.container}>
              <View style={styles.content}>                
                {this.state.step === 1 && this.renderStep1View()}
                {this.state.step === 2 && this.renderStep2View()}
                <View style={styles.preItemView}>
                  <Animated.Image
                      source={this.state.selectedImage}
                      resizeMode={'contain'}
                      style={[styles.preItemImage, {marginTop: this.state.itemMarginTop}]}
                  />                  
                  <Image
                      source={trousersImage}
                      resizeMode={'contain'}
                      style={styles.preItemImage}
                  />
                  <Image
                      source={shoesImage}
                      resizeMode={'contain'}
                      style={styles.preItemImage}
                  />
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
            </View>             
        )
    }

    renderStep1View = () => {
      return (
        <Animated.View style={[styles.content, {opacity: this.state.fadeIn}]}>
          <TypeWriterText text={['See alternative ideas', 'for one of the pieces']} />
          <ScrollView style={styles.scrollView} scrollEnabled={false}>
            <View style={styles.containerItem}>
              <TouchableWithoutFeedback onPress={() => this.onPressClick()}>
                <View style={[styles.alterContainer, {alignItems: 'center'}]}>
                  <View style={styles.alterItem}>
                      <Text style={styles.countText}>10</Text>
                  </View>
                  <Text style={[styles.countText, {marginTop: 3}]}>alternatives</Text>
                  <Animated.Image source={arrow2GIF} style={styles.gifIcon} />
                </View>   
              </TouchableWithoutFeedback>
              <View style={styles.clickableImageContainer}>
                <Image
                    source={shirtImage}
                    resizeMode={'contain'}
                    style={styles.itemImage}
                />
                <Text style={styles.clickableTitle}>BALENCIAGA</Text>
                <Text style={styles.clickableSubTitle}>Graphic print blouse</Text>
              </View>
              <View style={styles.alterContainer} />
            </View>
            <View style={styles.containerItem}>
              <View style={[styles.alterContainer, {alignItems: 'center'}]}>
                <View style={styles.alterItem}>
                    <Text style={styles.countText}>15</Text>
                </View>
                <Text style={[styles.countText, {marginTop: 3}]}>alternatives</Text>
              </View>   
              <View style={styles.clickableImageContainer}>
                <Image
                    source={trousersImage}
                    resizeMode={'contain'}
                    style={styles.itemImage}
                />
                <Text style={styles.clickableTitle}>ELLE</Text>
                <Text style={styles.clickableSubTitle}>psychedelic print pleated bag</Text>
              </View>
              <View style={styles.alterContainer} />
            </View>
          </ScrollView>
        </Animated.View>
      )
    }

    renderStep2View = () => {
      return (
        <Animated.View style={[styles.content, {opacity: this.state.fadeIn}]}>
          <TypeWriterText text={['now create new looks!', '']} />
          <ScrollView style={[styles.scrollView, {marginTop: -30}]}>
            <View style={{flexDirection: 'row'}}>
              <Ripple
                onPress={() => this.onClickImage(browseImage1)}
                rippleSize={120}
                rippleDuration={300} 
                rippleCentered={true}
                rippleContainerBorderRadius={40}>
              <View style={[styles.clickableImageContainerLeft, {position: 'relative', width: width/2}]}>
                  <Image
                      source={browseImage1}
                      resizeMode={'contain'}
                      style={styles.itemImage}
                  />
                  {/* <Image
                    source={arrow3GIF}
                    resizeMode={'contain'}
                    style={styles.arrow3}
                  /> */}
                  <View style={styles.descWrapper}>
                    <Text style={styles.clickableTitle}>MARNI</Text>
                    <Text style={styles.clickableSubTitle}>Gathered T-shirt</Text>
                  </View>                  
                </View>
              </Ripple>
              <Ripple
                onPress={() => this.onClickImage(browseImage2)}
                rippleSize={120}
                rippleDuration={300} 
                rippleCentered={true}
                rippleContainerBorderRadius={40}>
              <View style={[styles.clickableImageContainerRight, {width: width/2}]}>
                  <Image
                      source={browseImage2}
                      resizeMode={'contain'}
                      style={styles.itemImage}
                  />
                  <View style={styles.descWrapper}>
                    <Text style={styles.clickableTitle}>FENDI</Text>
                    <Text style={styles.clickableSubTitle}>Monster furry sweatshirt</Text>
                  </View>                  
                </View>
              </Ripple>
            </View>
            <View style={{flexDirection: 'row'}}>
              <Ripple
                  onPress={() => this.onClickImage(browseImage3)}
                  rippleSize={120}
                  rippleDuration={300} 
                  rippleCentered={true}
                  rippleContainerBorderRadius={40}>
                <View style={[styles.clickableImageContainerLeft, {width: width/2}]}>
                  <Image
                      source={browseImage3}
                      resizeMode={'contain'}
                      style={styles.itemImage}
                  />
                  <View style={styles.descWrapper}>
                    <Text style={styles.clickableTitle}>GUCCI</Text>
                    <Text style={styles.clickableSubTitle}>Floral print hoodle</Text>
                  </View>                  
                </View>
              </Ripple>
              <Ripple
                  onPress={() => this.onClickImage(browseImage4)}
                  rippleSize={120}
                  rippleDuration={300} 
                  rippleCentered={true}
                  rippleContainerBorderRadius={40}>
                <View style={[styles.clickableImageContainerRight, {width: width/2}]}>
                  <Image
                      source={browseImage4}
                      resizeMode={'contain'}
                      style={styles.itemImage}
                  />
                  <View style={styles.descWrapper}>
                    <Text style={styles.clickableTitle}>ALEXANDER MCQUEEN</Text>
                    <Text style={styles.clickableSubTitle}>Bug embellished blouse</Text>
                  </View>                  
                </View>
              </Ripple>
            </View>
          </ScrollView>
        </Animated.View>
      )
    }
}
