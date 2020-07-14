import React, { Component } from 'react';
import {
    Text,
    View,
    Image,
    TouchableWithoutFeedback
} from 'react-native';
// import { makeId } from '../../shared';
import theme from '../theme';

type Props = {
    index: number;
    item: IFilterItem;
    setNewImgUrl: (img: ProductImage) => void;
    isSlotMachine: boolean;
}
export default class FilterItem extends Component<Props> {

    render() {
        const {index, item: { name, imgUrl }} =  this.props;
        const selectedItem = index === 0 ? {
            borderBottomColor: '#000',
            borderBottomWidth: 1,
            borderTopColor: '#000',
            borderTopWidth: 1,
            borderLeftColor: '#000',
            borderLeftWidth: 1,
            borderRightColor: '#000',
            borderRightWidth: 1
        } : {};
        return (
            <View style={theme.itemContainer}>
                <View style={theme.imageContainer}>
                    <TouchableWithoutFeedback
                        onPress={() => {}}>
                        <View style={[{flexDirection: 'column', justifyContent: 'center', alignItems: 'center'}, selectedItem]}>
                            <Image
                                source={imgUrl}
                                style={[theme.image]}
                                resizeMode={'contain'}
                            />
                        </View>
                    </TouchableWithoutFeedback>
                </View>
                <View>
                    <Text style={theme.itemName}>{name}</Text>
                </View>

            </View>
        )
    };
    // _setNewImgUrl = () => {
    //     const { setNewImgUrl, isSlotMachine} = this.props;
    //     if (isSlotMachine) {
    //         return;
    //     }
    //     setNewImgUrl({img: {uri: 'https://img.shopstyle-cdn.com/pim/7f/5c/7f5c5e58461fa4260ea3507b091cec9c_best.jpg'}, id: makeId()})
    // }
}
