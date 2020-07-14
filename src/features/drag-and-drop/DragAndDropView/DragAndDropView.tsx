import React from 'react';
import { View, TouchableWithoutFeedback } from 'react-native';
// import { Entypo } from '@expo/vector-icons';

import Draggable from '../Draggable';
import SidebarScroll from '../SidebarScroll/SlidebarScroll';
import { transThumbnailImage } from '../../shared'
import theme from '../theme';

const imageSize: number = 140;
const imageSmallSize: number  = 80;
// const downArrowImage = require('../../../../assets/images/down-placeholder.png');

type Props = {
    dragrabbleItems: ProductImage[];
    listOfProductsByCategories: Product[];
    hasSixthSlot: boolean;
    getProductsByCategory: (category: string) => void;
    addNewDragAndDropSlot: (item: ProductImage) => void;
    navigateToProductSingle: (product: Product) => void;
    addOrReplaceSixthSlot: (item: HashMap<string>) => void;
    resetProductsByCategory: () => void;
    categoryInDrag: string;
    toggleViewCategory: boolean;
    allProducts: any;
};
type State = {
    dimensions: {
        width: number,
        height: number
    },
    selecteds: boolean[],
    isOpenSlider: boolean;
}
export default class DragAndDropAreaView extends React.Component<Props, State> {

    constructor(props: Props) {
        super(props);
        this.state = {
            selecteds: props.dragrabbleItems.map(() => false),
            dimensions: {
                width: 99999,
                height: 99999
            },
            isOpenSlider: false
        }
    }

    /* callback funciton that handles the width and heigh calculation for our view,
     * these numbers will be used by the 'Dragabble' element to avoid our items being
     * dragged outside their parent container */
    measureView(event: any) {
        this.state.dimensions.width = event.nativeEvent.layout.width
        this.state.dimensions.height = event.nativeEvent.layout.height

    }

    /**
     * Helper method to create an imutable clone of the state, so we don't need to keep repeating this
     * logic everywhere */
    cloneStateResetingSelected = () => {
        let clonedState = {...this.state}
        let selecteds = []
        for(let i = 0; i < this.props.dragrabbleItems.length; i++){
            selecteds[i] = false;
        }
        clonedState.selecteds = selecteds
        return clonedState;
    }


    /* helper function to calculate the initial items positions and avoid that they overlap */
    calcPosX(index: number){
        return (index%2)*imageSize + (index + 1) % 2 * 20
    }

    /* helper function to calculate the initial items positions and avoid that they overlap */
    calcPosY(index: number){
        return (index/2)*imageSize+50
    }

    render() {
        return (
            <>
                <View style={theme.container}>
                    <TouchableWithoutFeedback onPress={() => { this.setState(this.cloneStateResetingSelected) }}
                                              onLayout={(event) => this.measureView(event)}  style={theme.dragContainer}>
                        <View style={theme.dragContainer}>
                        {this._renderDraggables()}
                        </View>
                    </TouchableWithoutFeedback>
                    <SidebarScroll 
                        listOfProductsByCategories={this.props.listOfProductsByCategories} 
                        navigateToProductSingle={this.props.navigateToProductSingle}
                        addOrReplaceSixthSlot={this.props.addOrReplaceSixthSlot}
                        pressOutDrag={this._pressOutDrag}
                        isOpenCategory={this.props.toggleViewCategory}
                        toggleSlider={this._toggleSlider}
                        getProductsByCategory={this.props.getProductsByCategory}
                        categoryInDrag={this.props.categoryInDrag}
                        allProducts={this.props.allProducts}
                    />
                </View>
        </>
        );
    }

    private _pressOutDrag = () => {
        //this function handles the item selection
        const { selecteds } = this.state;
        let _selected = selecteds.map( () => false);
        this.setState({selecteds: _selected})
    }

    private _pressInDrag = (index: number) => {
        let newState = this.cloneStateResetingSelected()
        newState.selecteds[index] = true
        this.setState(newState)
    }
    private _toggleSlider = (flag: boolean) => {
        this.setState({isOpenSlider: flag});
    }

    // private _closeSlider = () => {
    //     this._toggleSlider(false);
    //     this.props.resetProductsByCategory();
    // }

    private _renderDraggables = () => {
        return this.props.dragrabbleItems.map((item : ProductImage, index: number) => {
            const isLastItem: boolean = this.props.hasSixthSlot && index ===  this.props.dragrabbleItems.length - 1;
            return ( 
                <Draggable 
                    key={index+1} 
                    selected={this.state.selecteds[index]} 
                    fadeInDuration={index*500}
                    imageSource={{uri: `${transThumbnailImage}${item.id}`}}
                    reverse={false} renderShape='image'
                    dimensions={this.state.dimensions}
                    x={this.calcPosX(index)} 
                    y={this.calcPosY(index)} 
                    offsetX={0} offsetY={0}
                    renderSize={isLastItem ? imageSmallSize : imageSize} 
                    pressInDrag={() => this._pressInDrag(index)}
                    categoryInDrag={this.props.categoryInDrag}
                    item={item}
                />
            )
        })
    }
}
