import React from 'react';
import { Component } from 'react';
import { Text, View, TouchableOpacity, FlatList } from 'react-native';
import { thumbnailImage } from '../../shared';
import { firstLetterUpper } from '../helper';
import AutoSizeImage from '../../shared/components/AutoSizeImge'
import theme from './theme';
import * as API from '../../../services/api';

const categoriesFilter: string[] = ['jewelry', 'belts', 'hats', 'scarves'];
type Props = {
    listOfProductsByCategories: Product[];
    navigateToProductSingle: (product: Product) => void;
    addOrReplaceSixthSlot: (item: HashMap<string | number>) => void;
    getProductsByCategory: (category: string) => void;
    pressOutDrag: () => void;
    toggleSlider: (flag: boolean) => void;
    isOpenCategory: boolean;
    categoryInDrag: string;
    allProducts: any;
}
type State = {
    transparent: boolean
}
export default class SidebarScroll extends Component<Props, State> {
    constructor(props: Props) {
        super(props);
        this.state = {
            transparent: false
        }
    }

    componentDidMount() {
        this._onPressCategory('jewelry')
    }

    render() {
        const { listOfProductsByCategories, isOpenCategory } = this.props;
        return (
            <View style={ [theme.scrolllContainer, {opacity: this.state.transparent ? 0 : 1}]}>
                { isOpenCategory && 
                    <View style={{paddingTop: 40}}>
                        {categoriesFilter.map(this._renderCategoryItem)}
                    </View>
                }                    
                { !isOpenCategory && <FlatList
                        showsVerticalScrollIndicator={false}
                        data={listOfProductsByCategories}
                        renderItem={this._renderItem}
                        keyExtractor={ item => `${item.id}`}
                /> }
            </View>
        );
    }

    private _renderItem = (props: {item: Product, index: number}) => {
        return (
            <TouchableOpacity key={props.item.id} style={[theme.scrollCell,theme.scrollCellBorder]} onPress={() => this._addNewDragAndDropSlot(props.item)}>
                <AutoSizeImage uri={`${thumbnailImage}${props.item.id}`} />
                {/* <View style={theme.scrollCellDivider} /> */}
                <TouchableOpacity onPress={() => this.props.navigateToProductSingle(props.item)}>
                    <Text style={[theme.scrollCellText, {letterSpacing: 2, fontFamily: 'RalewayBold'}]}>{props.item.brand.toUpperCase()}</Text>
                    <Text style={[theme.scrollCellText, {marginTop: 3, lineHeight: 12, fontSize: 9}]}>{props.item.unbrandedName}</Text>
                </TouchableOpacity>
                <View style={theme.divLine} />
            </TouchableOpacity>
        )
    }

    private _renderCategoryItem = (item: string, index: number) => {
        return (
            <TouchableOpacity onPress={() => this._onPressCategory(item)} key={index} style={theme.categoriesFilterWrapper}>
                <Text style={theme.categoriesFilterText}>{firstLetterUpper(item)}</Text>
            </TouchableOpacity>
        )
    }

    private _addNewDragAndDropSlot = (item: Product) => {
        const { addOrReplaceSixthSlot, pressOutDrag, categoryInDrag } = this.props;
        pressOutDrag();
        const newProductSlot: any = {
            category: categoryInDrag,
            id: item.id,
            img: {uri: item.image}
        };
        API.RegisterEvent("Vw-slidebarPhoto", {
            actionType: 'Click sidebar photo'
        })
        addOrReplaceSixthSlot(newProductSlot);
    }

    private _onPressCategory = (category: string) => {
        const { getProductsByCategory } = this.props;
        getProductsByCategory(category);
        if(this.props.allProducts[category] === undefined) this.setTimeOutToShow(1500)
        else this.setTimeOutToShow(500)
    }

    setTimeOutToShow = (duration: number) => {
        this.setState({transparent: true})
        setTimeout(() => {
            this.setState({transparent: false})
        }, duration)
    }

}


