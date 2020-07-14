import React, { Component } from 'react';
import {
  View,
  Image,
  Text,
  Dimensions,
  StyleSheet,
} from 'react-native';
import Ripple from 'react-native-material-ripple';

import { thumbnailImage } from '../../shared';
const { width} = Dimensions.get('window');
const IMAGE_WIDTH = width / 3;

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'white',    
    paddingVertical: 15,    
  },
  listView: {
    flexDirection: 'row',
    flexWrap: 'wrap'
  },
  listItemWrapper: {
    width: (width - 50) / 2,
    marginVertical: 20,
    // borderWidth: 1,
    // borderColor: 'black',
  },
  listItem: {
    width: (width - 50) / 2,
    height: (width - 50) / 2,
    justifyContent: 'center',
    alignItems: 'center'
  },
  image: {
    resizeMode: 'cover',
    width: width / 3,
    height: 150,
  },
  headerView: {
    padding: 15,
    flexDirection: 'row',
    alignItems: 'center'
  },
  line: {
    height: 1,
    backgroundColor: 'black',
    flex: 1
  },
  title: {
    paddingHorizontal: 15,
    textAlign: 'center',
    fontFamily: 'Raleway',
    letterSpacing: 2,
    lineHeight: 20,
    fontSize: 14,
  },
  separator: { 
    width: width, 
    height: 30, 
    backgroundColor: '#fafafa',
    borderTopColor: '#e2e2e2',
    borderTopWidth: 1,
    borderBottomColor: '#f1f1f1',
    borderBottomWidth: 1
  },
  buttonView: {
    height: 50,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'black',
    margin: 5
  },
  buttonText: {
    fontFamily: 'RalewayBold',
    fontSize: 18,
    color: 'white',
    letterSpacing: 2
  },
  productContainer: {
    overflow: 'hidden',
    width: width / 2,
    alignItems: 'center',
    justifyContent: 'center',
    paddingLeft: 4,
    paddingRight: 4,
  },
  imageContainer: {
    width: IMAGE_WIDTH,
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 10
  },
  descContainer: {
    alignItems: 'center',
    width: IMAGE_WIDTH * 1.2,
    height: 85,
  },
  descWrapper: {
    display: 'flex',
    alignItems: 'center'
  },
  designerTxt: {
    fontFamily: 'RalewayBold',
    fontSize: 12,
    color: '#000',
    textAlign: 'center',
    lineHeight: 14,
    marginTop: 4,
    marginBottom: 4,
    letterSpacing: 2,
  },
  descTxt: {
    fontFamily: 'QuickSandRegular',
    fontSize: 11,
    color: '#000',
    textAlign: 'center'
  },
})

type Props = {
  products: Product[];
  onClickProduct: (product: Product) => void;
  onClickViewAll: () => void;
};

export default class NewProductList extends Component<Props> {

    render() {
      const { products } = this.props;
      return (
        <View style={styles.container}>
          <View style={styles.headerView}>
            <View style={styles.line} />
            <Text style={styles.title}>New in</Text>
            <View style={styles.line} />
          </View>
          <View style={styles.listView}>
          {
            products.map((post: Product, index) => {
              const { brand, unbrandedName, id } =  post;
              let borderStyle = {};
              if(index % 2 === 0) {
                  borderStyle = {
                      borderRightWidth: 1.5,
                      borderBottomWidth: 2,
                      borderColor: '#f9f9f9'
                  }
              } else {
                  borderStyle = {
                      borderBottomWidth: 2,
                      borderColor: '#f9f9f9'
                  }
              }
              return (
                  <View key={id} style={[styles.productContainer, borderStyle]}>
                      <View style={styles.imageContainer}>
                        <Ripple
                          key={index}
                          style={styles.listItemWrapper}
                          onPress={() => this.props.onClickProduct(post)}
                          rippleColor={'rgb(255, 255, 255)'}
                          rippleDuration={300}
                          rippleCentered={true}
                          rippleContainerBorderRadius={width}>
                          <View style={styles.listItem}>
                            <Image
                                source={{uri: `${thumbnailImage}${post.id}`}}
                                style={styles.image}
                                resizeMode={'contain'}
                            />  
                          </View>
                        </Ripple>
                      </View>
                      {/* <View style={theme.imgDivider} /> */}
                      <View style={styles.descContainer}>
                        <View style={styles.descWrapper}>
                            <Text style={styles.designerTxt}>{brand !== undefined && brand.toUpperCase()}</Text>
                            <Text style={[styles.descTxt, {paddingVertical: 3, lineHeight: 15}]}>{unbrandedName}</Text>
                        </View>
                      </View>
                  </View>
              )
            })
          }
          </View>
          <Ripple
              style={styles.buttonView}
              rippleSize={240} 
              rippleColor='#FFFFFF'
              rippleCentered={true} 
              rippleDuration={1000}
              onPress={() => this.props.onClickViewAll()}
          >
              <Text style={styles.buttonText}>VIEW ALL</Text>   
          </Ripple> 
        </View>
      )
    }
 }
