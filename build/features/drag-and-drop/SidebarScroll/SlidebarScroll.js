import React from 'react';
import { Component } from 'react';
import { Text, View, TouchableOpacity, FlatList } from 'react-native';
import { thumbnailImage } from '../../shared';
import { firstLetterUpper } from '../helper';
import AutoSizeImage from '../../shared/components/AutoSizeImge';
import theme from './theme';
import * as API from '../../../services/api';
const categoriesFilter = ['jewelry', 'belts', 'hats', 'scarves'];
export default class SidebarScroll extends Component {
    constructor(props) {
        super(props);
        this._renderItem = (props) => {
            return (React.createElement(TouchableOpacity, { key: props.item.id, style: [theme.scrollCell, theme.scrollCellBorder], onPress: () => this._addNewDragAndDropSlot(props.item) },
                React.createElement(AutoSizeImage, { uri: `${thumbnailImage}${props.item.id}` }),
                React.createElement(TouchableOpacity, { onPress: () => this.props.navigateToProductSingle(props.item) },
                    React.createElement(Text, { style: [theme.scrollCellText, { letterSpacing: 2, fontFamily: 'RalewayBold' }] }, props.item.brand.toUpperCase()),
                    React.createElement(Text, { style: [theme.scrollCellText, { marginTop: 3, lineHeight: 12, fontSize: 9 }] }, props.item.unbrandedName)),
                React.createElement(View, { style: theme.divLine })));
        };
        this._renderCategoryItem = (item, index) => {
            return (React.createElement(TouchableOpacity, { onPress: () => this._onPressCategory(item), key: index, style: theme.categoriesFilterWrapper },
                React.createElement(Text, { style: theme.categoriesFilterText }, firstLetterUpper(item))));
        };
        this._addNewDragAndDropSlot = (item) => {
            const { addOrReplaceSixthSlot, pressOutDrag, categoryInDrag } = this.props;
            pressOutDrag();
            const newProductSlot = {
                category: categoryInDrag,
                id: item.id,
                img: { uri: item.image }
            };
            API.RegisterEvent("Vw-slidebarPhoto", {
                actionType: 'Click sidebar photo'
            });
            addOrReplaceSixthSlot(newProductSlot);
        };
        this._onPressCategory = (category) => {
            const { getProductsByCategory } = this.props;
            getProductsByCategory(category);
            if (this.props.allProducts[category] === undefined)
                this.setTimeOutToShow(1500);
            else
                this.setTimeOutToShow(500);
        };
        this.setTimeOutToShow = (duration) => {
            this.setState({ transparent: true });
            setTimeout(() => {
                this.setState({ transparent: false });
            }, duration);
        };
        this.state = {
            transparent: false
        };
    }
    componentDidMount() {
        this._onPressCategory('jewelry');
    }
    render() {
        const { listOfProductsByCategories, isOpenCategory } = this.props;
        return (React.createElement(View, { style: [theme.scrolllContainer, { opacity: this.state.transparent ? 0 : 1 }] },
            isOpenCategory &&
                React.createElement(View, { style: { paddingTop: 40 } }, categoriesFilter.map(this._renderCategoryItem)),
            !isOpenCategory && React.createElement(FlatList, { showsVerticalScrollIndicator: false, data: listOfProductsByCategories, renderItem: this._renderItem, keyExtractor: item => `${item.id}` })));
    }
}
//# sourceMappingURL=SlidebarScroll.js.map