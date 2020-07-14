import React from 'react';
import { Component } from 'react';
import { Dimensions, Image } from 'react-native';
import AutoHeightImage from 'react-native-auto-height-image';
const { width } = Dimensions.get('window');
const maxWidth = width / 4;
export default class AutoSizeImage extends Component {
    constructor() {
        super(...arguments);
        this._isMounted = false;
        this.state = {
            width: width / 4
        };
    }
    componentDidMount() {
        this._isMounted = true;
        Image.getSize(this.props.uri, (width, height) => {
            const exHeight = maxWidth * height / width;
            if (exHeight > maxWidth * 2) {
                // decrease width
                this._isMounted && this.setState({ width: maxWidth * maxWidth * 2 / exHeight });
            }
        }, (error) => {
            console.log(error);
        });
    }
    componentWillUnmount() {
        this._isMounted = false;
    }
    render() {
        const { uri } = this.props;
        return (React.createElement(AutoHeightImage, { source: { uri }, width: this.state.width }));
    }
}
//# sourceMappingURL=AutoSizeImge.js.map