import React, { Component } from 'react';
import {
    View,
    StyleSheet,
    Dimensions,
    Image,
    // BackHandler,
    // Animated,
    // TouchableOpacity,
    // Linking
} from 'react-native';
import Ripple from 'react-native-material-ripple';
import moment from 'moment';
// import * as API from '../../services/api';
import { thumbnailImage } from '../shared';
import { getProductsByIds } from '../../services';
const { width } = Dimensions.get('window');

const styles = StyleSheet.create({
  outfitView: {
    paddingVertical: 20,
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'row',
    marginHorizontal: 20,
    borderBottomColor: '#EEEEEE'
  },
  outfitImage: {
    width: width / 6,
    height: 100,
    marginHorizontal: 5
  }
})

type Props = {
  slots: any;
  onClick: (param: any) => void;
  border: boolean
}
type State = {
  products: Product[];
};

export default class OutfitItem extends Component<Props, State> {

  state: State = {
    products: []
  }

  componentDidMount() {
    getProductsByIds(this.props.slots.slots).then((product: any) => {
        this.setState({products: product})
      })
  }

  _onClick = () => {
    let slots: Slot[] = [];
    this.props.slots.slots.map((slot: number) => {
      slots.push({
        productId: slot,
        alternatives: []
      })
    })
    this.props.onClick({
        productIds: slots,
        authorItem: {
            timeAgo: moment(this.props.slots.timestamp).fromNow(),
            authorProfilePhoto: null,
        }
    })
  }

  render() {
    if(this.state.products.length === 0) return null;
    return (
      <Ripple
        onPress={this._onClick}
        rippleSize={40}
        rippleDuration={300} 
        rippleContainerBorderRadius={40}>
        <View style={[styles.outfitView, {borderBottomWidth: this.props.border ? 1 : 0}]}>
          {
            this.state.products.map((product: Product) => {
              return(
                  <Image
                      key={product.id}
                      source={{uri: `${thumbnailImage}${product.id}`}}
                      style={styles.outfitImage}
                      resizeMode={'contain'}
                  />
              )
            })
          }
        </View>
      </Ripple>
    )
  }   
}