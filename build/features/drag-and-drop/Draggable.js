import React, { Component } from 'react';
import { Platform, View, Text, Image, PanResponder, Animated, Dimensions, TouchableWithoutFeedback } from 'react-native';
export default class Draggable extends Component {
    constructor(props, defaultProps) {
        super(props, defaultProps);
        /*Calculates the initial position of the items*/
        this._positionCss = () => {
            let Window = Dimensions.get('window');
            const { renderSize, offsetX, offsetY, x, y, z } = this.props;
            return Object.assign({}, Platform.select({
                ios: {
                    zIndex: z != null ? z : 999,
                    position: 'absolute',
                    top: y != null ? y : (Window.height / 2 - renderSize + offsetY),
                    left: x != null ? x : (Window.width / 2 - renderSize + offsetX)
                },
                android: {
                    position: 'absolute',
                    width: Window.width,
                    height: Window.height,
                    top: y != null ? y : (Window.height / 2 - renderSize + offsetY),
                    left: x != null ? x : (Window.width / 2 - renderSize + offsetX),
                },
            }));
        };
        /* resolves the style for text items while the item is being dragged */
        this._dragItemCss = (renderSize, renderColor, renderShape) => {
            const { item } = this.props;
            const isBelts = item.category === 'belts';
            if (renderShape == 'circle') {
                return {
                    backgroundColor: renderColor,
                    width: renderSize * 2,
                    height: renderSize * 2,
                    borderRadius: renderSize
                };
            }
            else if (renderShape == 'square') {
                return {
                    backgroundColor: renderColor,
                    width: renderSize * 2,
                    height: renderSize * 2,
                    borderRadius: 0
                };
            }
            else if (renderShape == 'image') {
                return {
                    width: isBelts ? renderSize * 1.2 : renderSize * 0.6,
                    height: renderSize,
                    zIndex: 999,
                };
            }
            return {};
        };
        /* resolves the style for text items while the item is being dragged */
        this._dragItemTextCss = (renderSize) => ({
            marginTop: renderSize - 10,
            marginLeft: 5,
            marginRight: 5,
            textAlign: 'center',
            color: '#fff'
        });
        /* we can use the same component to return a shape with a text or a image, this is the function that
         * resolves which component shall be returned */
        this._getTextOrImage = () => {
            const { renderSize, renderShape, renderText, imageSource } = this.props;
            if (renderShape == 'image') {
                return (React.createElement(Image, { style: this._dragItemCss(renderSize, null, 'image'), resizeMode: 'contain', source: imageSource }));
            }
            else {
                return (React.createElement(Text, { style: {
                        marginTop: renderSize - 10,
                        marginLeft: 5,
                        marginRight: 5,
                        textAlign: 'center',
                        color: '#fff'
                    } }, renderText));
            }
        };
        /* if the positions is going to be reverted this is the functin that handles it through the animated api */
        this.reversePosition = () => {
            Animated.spring(this.state.pan, { toValue: { x: 0, y: 0 } }).start();
        };
        const { pressDragRelease, reverse, onMove } = props;
        this.state = {
            pan: new Animated.ValueXY(),
            _value: { x: 0, y: 0 },
            fadeAnim: new Animated.Value(0),
        };
        /**
         * here we register the PanResponder events, one of the main tricks to acheive a good performance is
         * not to rerender the component every time but instead we use the animated API to move it, so
         * we avoid unecessary information flowing through the react native bridge
         */
        this.panResponder = PanResponder.create({
            onMoveShouldSetPanResponder: () => true,
            onMoveShouldSetPanResponderCapture: () => true,
            onPanResponderGrant: () => {
                if (reverse == false) {
                    this.state.pan.setOffset({ x: this.state._value.x, y: this.state._value.y });
                    this.state.pan.setValue({ x: 0, y: 0 });
                }
            },
            onPanResponderMove: Animated.event([null, {
                    dx: this.state.pan.x,
                    dy: this.state.pan.y
                }], { listener: onMove }),
            onPanResponderRelease: (e, gestureState) => {
                if (pressDragRelease)
                    pressDragRelease(e, gestureState);
                if (reverse == false)
                    this.state.pan.flattenOffset();
                else
                    this.reversePosition();
                /**
                 * check if the item is not being dragged outside of its parent boundaries, if so
                 * we put it inside the parent component again
                 * height: renderSize
                 * width: renderSize * 0.6
                 */
                if (this.state.pan.x._value + this.props.x < 0) {
                    this.state.pan.x.setValue(-this.props.x);
                }
                if (this.state.pan.x._value + this.props.x + this.props.renderSize * 0.6 > this.props.dimensions.width) {
                    this.state.pan.x.setValue(this.props.dimensions.width - this.props.renderSize * 0.6 - this.props.x);
                }
                if (this.state.pan.y._value + this.props.y < 0) {
                    this.state.pan.y.setValue(-this.props.y);
                }
                if (this.state.pan.y._value + this.props.y + this.props.renderSize > this.props.dimensions.height) {
                    this.state.pan.y.setValue(this.props.dimensions.height - this.props.renderSize - this.props.y);
                }
            },
            onStartShouldSetPanResponder: () => {
                return true;
            },
            onPanResponderEnd: () => {
                return true;
            }
        });
    }
    componentWillMount() {
        if (this.props.reverse == false)
            this.state.pan.addListener((c) => this.setState({ _value: c }));
        Animated.timing(this.state.fadeAnim, {
            toValue: 1,
            duration: this.props.fadeInDuration || 0,
        }).start();
    }
    componentWillUnmount() {
        this.state.pan.removeAllListeners();
    }
    render() {
        const touchableContent = this._getTextOrImage();
        const { pressDrag, longPressDrag, pressInDrag, pressOutDrag, renderSize, item, renderShape, offsetX, x, y, offsetY } = this.props;
        const fadeVal = this.props.selected ? 0.5 : this.state.fadeAnim;
        let Window = Dimensions.get('window');
        return (React.createElement(View, { style: {
                position: 'absolute',
                width: Window.width,
                height: Window.height - 200,
                top: y != null ? y : (Window.height / 2 - renderSize + offsetY),
                left: x != null ? x : (Window.width / 2 - renderSize + offsetX),
            } },
            React.createElement(Animated.View, Object.assign({}, this.panResponder.panHandlers, { style: [
                    this.state.pan.getLayout(),
                    {
                        opacity: fadeVal,
                        width: item.category === 'belts' ? this.props.renderSize * 1.2 : this.props.renderSize * 0.6
                    }
                ] }),
                React.createElement(TouchableWithoutFeedback, { style: this._dragItemCss(renderSize, null, renderShape), onPress: pressDrag, onLongPress: longPressDrag, onPressIn: pressInDrag, onPressOut: pressOutDrag }, touchableContent))));
    }
}
Draggable.defaultProps = {
    offsetX: 100,
    renderShape: 'circle',
    renderColor: 'yellowgreen',
    renderText: '＋',
    renderSize: 36,
    offsetY: 100,
    reverse: true
};
//# sourceMappingURL=Draggable.js.map