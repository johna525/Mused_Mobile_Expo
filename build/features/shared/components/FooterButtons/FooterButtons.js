import React, { Component } from 'react';
import { Animated } from 'react-native';
import FooterButton from '../FooterButton/FooterButton';
import { COLLECTION, BROWSE, FILTER, VIEW as VIEW_SCREEN, MENU_FILTER } from '../../routesKeys';
import theme from './theme';
import { footerButtons, footerDarkButtons, LOVE, CATEGORIES, APPLY, CANCEL, VIEW } from './buttonsKeys';
export default class Footer extends Component {
    constructor() {
        super(...arguments);
        this.state = {
            fadeIn: new Animated.Value(0)
        };
        this._renderFooter = () => {
            const { currentRoute } = this.props;
            let buttons = [];
            if (currentRoute === COLLECTION) {
                buttons = [...footerButtons.filter((button) => button.text === LOVE)];
            }
            if (currentRoute === BROWSE) {
                buttons = [...footerButtons];
            }
            if (currentRoute === VIEW_SCREEN) {
                buttons = [...footerButtons];
            }
            return (React.createElement(Animated.View, { style: [
                    theme.container,
                    currentRoute === FILTER ? { backgroundColor: '#F1F1F1' } : {},
                    currentRoute === VIEW_SCREEN ? { backgroundColor: '#FFF' } : {},
                    { opacity: this.state.fadeIn }
                ] },
                currentRoute === FILTER && this._renderDarkFooterButtons(),
                currentRoute === MENU_FILTER && this._renderDarkFooterButtons(),
                (currentRoute === COLLECTION || currentRoute === BROWSE) && this._renderWhiteFooterButtons(buttons),
                currentRoute === VIEW_SCREEN && this._renderDragAndDropButtons()));
        };
        this._renderWhiteFooterButtons = (buttons) => {
            return buttons.map((button) => {
                const actions = {
                    [LOVE]: this.props.createNewOutfit,
                    [VIEW]: this.props.navigateToView,
                    [CATEGORIES]: this.props.navigateToFilter,
                };
                return (React.createElement(FooterButton, { text: button.text, icon: button.icon, navigate: actions[button.text], key: button.text, newImgUrl: this.props.newImgUrl, user: this.props.user }));
            });
        };
        this._renderDarkFooterButtons = () => {
            return footerDarkButtons.map((button) => {
                const actions = {
                    [APPLY]: this.props.applyFilter,
                    [CANCEL]: this.props.clearFilterAndGoToBrowse
                };
                return (React.createElement(FooterButton, { text: button.text, icon: button.icon, whiteTheme: false, key: button.text, styleForContainer: button.styleForContainer, navigate: actions[button.text] }));
            });
        };
        this._renderDragAndDropButtons = () => {
            return footerButtons.map((button) => {
                const actions = {
                    [LOVE]: this.props.createNewOutfit,
                    [VIEW]: this.props.navigateBackToBrowse,
                    [CATEGORIES]: this.props.openProductCategory,
                };
                return (React.createElement(FooterButton, { text: button.text, icon: button.icon, whiteTheme: true, navigate: actions[button.text], key: button.text, newImgUrl: this.props.newImgUrl, user: this.props.user }));
            });
        };
        this._fadeIn = () => {
            this.state.fadeIn.setValue(0);
            Animated.timing(this.state.fadeIn, {
                toValue: 1,
                duration: 400,
                useNativeDriver: true
            }).start();
        };
    }
    componentDidMount() {
        this._fadeIn();
    }
    componentWillReceiveProps(nextProps) {
        const { currentRoute } = this.props;
        if ((currentRoute === COLLECTION && nextProps.currentRoute === BROWSE)
            || (currentRoute === BROWSE && nextProps.currentRoute === COLLECTION)
            || (currentRoute === BROWSE && nextProps.currentRoute === FILTER)
            || (currentRoute === FILTER && nextProps.currentRoute === BROWSE)
            || (currentRoute === BROWSE && nextProps.currentRoute === VIEW_SCREEN)
            || (currentRoute === VIEW_SCREEN && nextProps.currentRoute === BROWSE)) {
            this._fadeIn();
        }
    }
    render() {
        return this._renderFooter();
    }
}
//# sourceMappingURL=FooterButtons.js.map