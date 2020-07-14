import React, { Component } from 'react';
import { View, StyleSheet, Dimensions, Image, } from 'react-native';
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
});
export default class OutfitItem extends Component {
    constructor() {
        super(...arguments);
        this.state = {
            products: []
        };
        this._onClick = () => {
            let slots = [];
            this.props.slots.slots.map((slot) => {
                slots.push({
                    productId: slot,
                    alternatives: []
                });
            });
            this.props.onClick({
                productIds: slots,
                authorItem: {
                    timeAgo: moment(this.props.slots.timestamp).fromNow(),
                    authorProfilePhoto: null,
                }
            });
        };
    }
    componentDidMount() {
        getProductsByIds(this.props.slots.slots).then((product) => {
            this.setState({ products: product });
        });
    }
    render() {
        if (this.state.products.length === 0)
            return null;
        return (React.createElement(Ripple, { onPress: this._onClick, rippleSize: 40, rippleDuration: 300, rippleContainerBorderRadius: 40 },
            React.createElement(View, { style: [styles.outfitView, { borderBottomWidth: this.props.border ? 1 : 0 }] }, this.state.products.map((product) => {
                return (React.createElement(Image, { key: product.id, source: { uri: `${thumbnailImage}${product.id}` }, style: styles.outfitImage, resizeMode: 'contain' }));
            }))));
    }
}
//# sourceMappingURL=OutfitItem.js.map