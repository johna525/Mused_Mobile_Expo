import React, { Component } from 'react';
import { View, Text, StyleSheet, } from 'react-native';
const styles = StyleSheet.create({
    text: {
        fontSize: 25,
        height: 30,
        textAlign: 'center',
        fontFamily: 'RalewayBold',
        letterSpacing: 1,
    }
});
export default class TypeWriterText extends Component {
    constructor() {
        super(...arguments);
        this.state = {
            textLength: 0,
            text: ''
        };
        this.startTypeWriterAnimation = (length) => {
            this.timer = setTimeout(() => {
                this.setState({ textLength: length });
                if (length < this.props.text[0].length + this.props.text[1].length) {
                    this.startTypeWriterAnimation(length + 1);
                }
                else {
                    this.props.onEndEffect();
                }
            }, 25);
        };
    }
    componentDidMount() {
        setTimeout(() => {
            this.startTypeWriterAnimation(1);
            this.setState({ text: JSON.stringify(this.props.text) });
        }, this.props.delay);
    }
    componentWillUnmount() {
        clearTimeout(this.timer);
    }
    componentWillReceiveProps(props) {
        if (JSON.stringify(props.text) !== this.state.text) {
            this.startTypeWriterAnimation(1);
            this.setState({ text: JSON.stringify(props.text) });
        }
    }
    render() {
        return (React.createElement(View, null,
            React.createElement(Text, { style: [styles.text, this.props.style] }, this.props.text[0].substr(0, this.state.textLength)),
            React.createElement(Text, { style: [styles.text, this.props.style] }, this.props.text[1].substr(0, this.state.textLength - this.props.text[0].length))));
    }
}
TypeWriterText.defaultProps = {
    style: {},
    delay: 500,
    onEndEffect: () => { }
};
//# sourceMappingURL=Typewriter.js.map