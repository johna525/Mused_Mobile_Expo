import React, { Component } from 'react';
import {
  View,
  Image,
  Text,
  StyleSheet,
  TouchableWithoutFeedback,
  Dimensions,
  Animated,
  Easing,
  ScrollView
} from 'react-native';
import theme from '../theme';
import TypeWriterText from './Typewriter'
import * as API from '../../../services/api';

const { width } = Dimensions.get('window');
const dressImage = require('../../../../assets/images/onboarding-22-shirt1.jpg');
const emptyImage = require('../../../../assets/images/dots.png');
const SkirtImage1 = require('../../../../assets/images/onboarding-61-Skirt1.jpg');
const SkirtImage2 = require('../../../../assets/images/onboarding-61-Skirt2.jpg');
const SkirtImage3 = require('../../../../assets/images/onboarding-61-Skirt3.jpg');
const SkirtImage4 = require('../../../../assets/images/onboarding-61-Skirt4.jpg');
const ShoesImage1 = require('../../../../assets/images/onboarding-62-shoe1.jpg');
const ShoesImage2 = require('../../../../assets/images/onboarding-62-shoe2.jpg');
const ShoesImage3 = require('../../../../assets/images/onboarding-62-shoe3.jpg');
const ShoesImage4 = require('../../../../assets/images/onboarding-62-shoe4.jpg');

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
  },
  content: {
    flex: 1,
    paddingBottom: 20,
    alignItems: 'center',
    position: 'relative'
  },
  clickableImageContainer: {
    flex: 1, 
    width: width / 2,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
    flexDirection: 'column',
    paddingVertical: 20,
    overflow: 'hidden'
  },
  itemImage: {
    width: width / 3, 
    height: width / 3,
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
    marginTop: -20
  },
  preItemView: {
    height: 110,
    flexDirection: 'row',
    justifyContent: 'center',
    padding: 5,
    overflow: 'hidden'
  },
  preItemImage: {
    width: width / 6, 
    height: 100,
    marginHorizontal: 4
  },
  leftItem: {
    borderRightWidth: 1.5,
    borderBottomWidth: 2,
    borderColor: '#f9f9f9'
  },
  rightItem: {
    borderBottomWidth: 2,
    borderColor: '#f9f9f9'
  }
})

type Props = {
  continue: () => void;
}
type State = {
  step: number,
  selectedImage: any,
  selectedSkirt: any,
  itemMarginTop: any,
  opacity: any
};

export default class Step7 extends Component<Props, State> {
  state: State = {
    step: 1,
    selectedImage: emptyImage,
    selectedSkirt: emptyImage,
    itemMarginTop: new Animated.Value(0),
    opacity: new Animated.Value(1)
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
      this.setState({selectedImage: image});
    });
  }

  onClickContinue = () => {
    if(this.state.step === 1) {
      Animated.timing(                 
        this.state.opacity,            
        {
            toValue: 0,                   
            duration: 500, 
        }
      ).start(() => {
        this.state.opacity.setValue(1)
        this.setState({
          step: 2, 
          selectedSkirt: this.state.selectedImage,
          selectedImage: emptyImage,
        })
        // setTimeout(() => {
        //   const scrollInstant: any = this.refs._scrollView;
        //   scrollInstant.scrollTo({x: 0, y: 0, animated: true})
        // }, 1500) 
        API.RegisterEvent('On-MatchShoes', {userType: 'View screen'});
      }); 
      
    } else {
      this.props.continue()
    }
  }

  render() {
    const { step } = this.state;
      return (
          <View style={styles.container}>
            <TypeWriterText text={step === 1 ? ['Try matching a skirt', ''] : ['Now match some shoes', '']} />
            {
              step === 1 ?
              this.renderSkirtsScrollView()
              :this.renderShoesScrollView()
            }            
            <View style={styles.preItemView}>
              <Image
                  source={dressImage}
                  resizeMode={'contain'}
                  style={styles.preItemImage}
              />
              {
                step === 1 ?
                <Animated.Image
                  source={this.state.selectedImage}
                  resizeMode={'contain'}
                  style={[styles.preItemImage, {marginTop: this.state.itemMarginTop}]}
                />  
                :
                <Image
                  source={this.state.selectedSkirt}
                  resizeMode={'contain'}
                  style={styles.preItemImage}
                />
              }
              {
                step === 2 &&
                <Animated.Image
                  source={this.state.selectedImage}
                  resizeMode={'contain'}
                  style={[styles.preItemImage, {marginTop: this.state.itemMarginTop}]}
                />  
              }                          
            </View>
            <View style={theme.buttonButtonView}>
              <TouchableWithoutFeedback onPress={() => this.onClickContinue()} >
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

  renderSkirtsScrollView = () => {
    return (
      <Animated.ScrollView style={[styles.scrollView, {opacity: this.state.opacity}]}>
        <View style={{flexDirection: 'row'}}>
          <TouchableWithoutFeedback onPress={() => this.onClickImage(SkirtImage1)}>
            <View style={[styles.clickableImageContainer, styles.leftItem]}>
              <Image
                  source={SkirtImage1}
                  resizeMode={'contain'}
                  style={styles.itemImage}
              />
              <Text style={styles.clickableTitle}>VERSACE</Text>
              <Text style={styles.clickableSubTitle}>Signature print skirt</Text>
            </View>
          </TouchableWithoutFeedback>
          <TouchableWithoutFeedback onPress={() => this.onClickImage(SkirtImage2)}>
            <View style={[styles.clickableImageContainer, styles.rightItem]}>
              <Image
                  source={SkirtImage2}
                  resizeMode={'contain'}
                  style={styles.itemImage}
              />
              <Text style={styles.clickableTitle}>JOSEPH</Text>
              <Text style={styles.clickableSubTitle}>Holden Compact skirt</Text>
            </View>
          </TouchableWithoutFeedback>
        </View>
        <View style={{flexDirection: 'row'}}>
          <TouchableWithoutFeedback onPress={() => this.onClickImage(SkirtImage3)}>
            <View style={[styles.clickableImageContainer, styles.leftItem]}>
              <Image
                  source={SkirtImage3}
                  resizeMode={'contain'}
                  style={styles.itemImage}
              />
              <Text style={styles.clickableTitle}>SEE BY CHLO…</Text>
              <Text style={styles.clickableSubTitle}>long pleated skirt</Text>
            </View>
          </TouchableWithoutFeedback>
          <TouchableWithoutFeedback onPress={() => this.onClickImage(SkirtImage4)}>
            <View style={[styles.clickableImageContainer, styles.rightItem]}>
              <Image
                  source={SkirtImage4}
                  resizeMode={'contain'}
                  style={styles.itemImage}
              />
              <Text style={styles.clickableTitle}>GUCCI</Text>
              <Text style={styles.clickableSubTitle}>GG web midi tweed skirt</Text>
            </View>
          </TouchableWithoutFeedback>
        </View>
      </Animated.ScrollView>
    )
  }

  renderShoesScrollView = () => {
    return (
      <ScrollView ref='_scrollView' style={styles.scrollView}>
        <View style={{flexDirection: 'row'}}>
          <TouchableWithoutFeedback onPress={() => this.onClickImage(ShoesImage1)}>
            <View style={[styles.clickableImageContainer, styles.leftItem]}>
              <Image
                  source={ShoesImage1}
                  resizeMode={'contain'}
                  style={styles.itemImage}
              />
              <Text style={styles.clickableTitle}>ALEXANDER MCQUEEN</Text>
              <Text style={styles.clickableSubTitle}>buffed leather sneakers</Text>
            </View>
          </TouchableWithoutFeedback>
          <TouchableWithoutFeedback onPress={() => this.onClickImage(ShoesImage2)}>
            <View style={[styles.clickableImageContainer, styles.rightItem]}>
              <Image
                  source={ShoesImage2}
                  resizeMode={'contain'}
                  style={styles.itemImage}
              />
              <Text style={styles.clickableTitle}>PRADA</Text>
              <Text style={styles.clickableSubTitle}>Pointed Toe 65 pumps</Text>
            </View>
          </TouchableWithoutFeedback>
        </View>
        <View style={{flexDirection: 'row'}}>
          <TouchableWithoutFeedback onPress={() => this.onClickImage(ShoesImage3)}>
            <View style={[styles.clickableImageContainer, styles.leftItem]}>
              <Image
                  source={ShoesImage3}
                  resizeMode={'contain'}
                  style={styles.itemImage}
              />
              <Text style={styles.clickableTitle}>YEEZY</Text>
              <Text style={styles.clickableSubTitle}>taupe 110 high heel mules</Text>
            </View>
          </TouchableWithoutFeedback>
          <TouchableWithoutFeedback onPress={() => this.onClickImage(ShoesImage4)}>
            <View style={[styles.clickableImageContainer, styles.rightItem]}>
              <Image
                  source={ShoesImage4}
                  resizeMode={'contain'}
                  style={styles.itemImage}
              />
              <Text style={styles.clickableTitle}>ATP ATELIER</Text>
              <Text style={styles.clickableSubTitle}>Cynara 55 Ankle Boots</Text>
            </View>
          </TouchableWithoutFeedback>
        </View>
      </ScrollView>
    )
  }
}
