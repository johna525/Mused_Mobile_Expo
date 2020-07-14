import React, { Component } from 'react';
import {
    View,
    StyleSheet,
    Dimensions,
    Image,
    TouchableHighlight,
    Text,
    // BackHandler,
    // Animated,
    // TouchableOpacity,
    // Linking
} from 'react-native';
import Ripple from 'react-native-material-ripple';
// import * as API from '../../services/api';
import { thumbnailImage } from '../shared';
const { width } = Dimensions.get('window');
const IMAGE_WIDTH: number = width / 3;
const IMAGE_HEIGHT: number = 150;
const starLikeIcon = require('../../../assets/images/star_like.png');

const styles = StyleSheet.create({
  productContainer: {
    overflow: 'hidden',
    width: width / 2,
    alignItems: 'center',
    justifyContent: 'center',
    paddingLeft: 4,
    paddingRight: 4,
  },
  likeContainer: {
    position: 'absolute',
    top: 10,
    right: 10,
    width: 20,
    height: 20,
  },
  likeIcon: {
    width: 17,
    height: 15,
  },
  imageContainer: {
    width: IMAGE_WIDTH,
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 10
  },
  imageWrapper: {
    flexDirection: 'column',
    justifyContent: 'center', 
    alignItems: 'center', 
    height: IMAGE_HEIGHT,
    overflow: 'hidden'
  },
  descContainer: {
    alignItems: 'center',
    width: IMAGE_WIDTH * 1.2,
    height: 100,
    paddingBottom: 15,
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
    textAlign: 'center',
    paddingVertical: 3, 
    lineHeight: 15
  },
  image: {
    width: IMAGE_WIDTH,
    height: IMAGE_HEIGHT,
  },
  emptyView: {
    width: width / 2,
    height: IMAGE_HEIGHT + 120
  }
})

type Props = {
    productId: number;
    productStore: any;
    onClickBookmark: (productId: number) => void;
    onClickProduct: (product: Product) => void;
    position?: string;
}
type State = {
    isLiked: boolean,
    product: Product,
    isLoading: boolean,
};
export default class ProductItem extends Component<Props, State> {

    state: State = {
        isLiked: false,
        product: null,
        isLoading: true
    }

    componentDidMount() {
        const { getDetailByProductId } = this.props.productStore;
        getDetailByProductId(this.props.productId).then((product: any) => {
          this.setState({product, isLoading: false})
        })
    }

    render() {
      const { product, isLoading } = this.state;
      if(product === null || product === undefined) return null;
      let borderStyle = {};
        if(this.props.position === 'left' || 1) {
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
        <View style={[styles.productContainer, borderStyle]}>
            {
              (product !== null && product !== undefined) &&
              <TouchableHighlight 
                  style={styles.likeContainer}
                  underlayColor={'transparent'}
                  onPress={() => this.props.onClickBookmark(product.id)}
                  >
                  <Image source={starLikeIcon} style={styles.likeIcon} />
              </TouchableHighlight>
            }
            <View style={styles.imageContainer}>
                {
                  (product !== null && product !== undefined) ?
                  <Ripple
                    onPress={() => this.props.onClickProduct(product)}
                    rippleSize={40}
                    rippleDuration={300} 
                    rippleContainerBorderRadius={40}>
                    <View style={styles.imageWrapper}>
                        <Image
                          source={{uri: `${thumbnailImage}${product.id}`}}
                          style={styles.image}
                          resizeMode={'contain'}
                        />                        
                    </View>
                  </Ripple>
                  : !isLoading ?
                  <View style={[styles.image, {justifyContent: 'center', alignItems: 'center'}]}>
                    <Text style={styles.designerTxt}>SOLD OUT</Text>
                  </View>
                  :null
                }
            </View>
            <View style={styles.descContainer}>
              {
                (product !== null && product !== undefined) ?     
                  <View style={styles.descWrapper}>
                    <Text style={styles.designerTxt}>
                      {product.brand !== undefined && product.brand.toUpperCase()}
                    </Text>
                    <Text style={styles.descTxt}>{product.unbrandedName}</Text>
                  </View>
                :
                <View style={styles.descWrapper}>
                  <Text style={styles.designerTxt}>- - -</Text>
                  <Text style={styles.descTxt}>- - -</Text>
                </View>
              }
            </View>
        </View>
      )
    }   
}
