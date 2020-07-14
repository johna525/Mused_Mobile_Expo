import React, { Component } from 'react';
import { View, Text, Animated } from 'react-native';
import Ripple from 'react-native-material-ripple';
import { selectionCount } from '../../shared';
import DesignerItem from './DesignerItem';
import FilterCategories from './FilterCategories/FilterCategories.hoc';
import theme from '../theme';
import * as API from '../../../services/api';
export default class FilterList extends Component {
    constructor() {
        super(...arguments);
        this.state = {
            fadeIn: new Animated.Value(1)
        };
        this._changeTab = (type) => this.props.setFilterTab(type);
        this.startFadeOut = () => {
            this.state.fadeIn.setValue(1);
            Animated.timing(this.state.fadeIn, {
                toValue: 0,
                duration: 500,
                useNativeDriver: true
            }).start(() => this.props.setFilterTab(''));
        };
        this._renderDesignerItem = (props) => React.createElement(DesignerItem, { index: props.index, item: props.item });
        this._renderTabs = () => {
            return (React.createElement(View, { style: [theme.counterContainer] },
                React.createElement(Ripple, { onPress: () => this.onClick('newIn'), style: theme.counterItemContainer, rippleSize: 120, rippleDuration: 300, rippleCentered: true, rippleContainerBorderRadius: 40 },
                    React.createElement(View, { style: { flex: 1 } },
                        React.createElement(Text, { style: theme.categoryText }, "NEW IN"),
                        React.createElement(Text, { style: theme.subText }, "All the latest products"))),
                React.createElement(Ripple, { onPress: () => this.onClick('clothe'), style: theme.counterItemContainer, rippleSize: 120, rippleDuration: 300, rippleCentered: true, rippleContainerBorderRadius: 40 },
                    React.createElement(View, { style: { flex: 1 } },
                        React.createElement(Text, { style: theme.categoryText }, "CATEGORIES"),
                        React.createElement(Text, { style: theme.subText }, "Select specific products")))));
        };
        this.onClick = (category) => {
            this.state.fadeIn.setValue(1);
            Animated.timing(this.state.fadeIn, {
                toValue: 0,
                duration: 400,
                useNativeDriver: true
            }).start(() => {
                if (category === 'newIn')
                    this.onClickNewIn();
                else if (category === 'clothe')
                    this.onClickClothe();
                else
                    this.onClickColour();
                this.state.fadeIn.setValue(1);
            });
        };
        this.onClickNewIn = () => {
            API.RegisterEvent("Fi-newIn", {
                actionType: "Click 'New in' button"
            });
            this.props.onClickNewIn();
        };
        this.onClickClothe = () => {
            API.RegisterEvent("Fi-categories", {
                actionType: "Click 'Categories' button"
            });
            this._changeTab('categories');
        };
        this.onClickColour = () => {
            API.RegisterEvent("Fi-colour", {
                actionType: "Click 'Colour' button"
            });
            alert('comming soon');
        };
        this._renderSelectionCount = () => {
            const { listOfCategory } = this.props;
            return listOfCategory.length > 0
                ? React.createElement(Text, { style: theme.selectionText }, `${selectionCount(listOfCategory)} selected`)
                : null;
        };
    }
    render() {
        const { filterTab } = this.props;
        if (filterTab === 'applied') {
            // this.startFadeOut()
        }
        return (React.createElement(Animated.View, { style: [theme.container, { opacity: this.state.fadeIn }] },
            filterTab === '' && this._renderTabs(),
            filterTab === 'categories' && React.createElement(FilterCategories, null)));
    }
}
//# sourceMappingURL=FilterList.js.map