import React, { Component } from 'react';
import { View, StyleSheet, Text, TouchableWithoutFeedback } from 'react-native';
import theme from '../theme';
import TypeWriterText from './Typewriter';
const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#FFFFFF'
    },
    textView: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        paddingBottom: 60
    },
    section: {
        marginVertical: 15,
    }
});
export default class Step7 extends Component {
    constructor() {
        super(...arguments);
        this.onPressClick = () => {
            this.props.continue();
        };
    }
    render() {
        return (React.createElement(View, { style: styles.container },
            React.createElement(View, { style: styles.textView },
                React.createElement(View, { style: styles.section },
                    React.createElement(TypeWriterText, { text: ['Well done!', ''], delay: 0, style: { fontSize: 18, height: 20, letterSpacing: 0, fontFamily: 'QuickSandBold' } })),
                React.createElement(View, { style: styles.section },
                    React.createElement(TypeWriterText, { text: ['You can play with different styles', 'or create new looks'], delay: 2000, style: { fontSize: 18, letterSpacing: 0, height: 25, fontFamily: 'QuickSandRegular' } })),
                React.createElement(View, { style: styles.section },
                    React.createElement(TypeWriterText, { text: ['it‘s completely up to you...', ''], delay: 5500, style: { fontSize: 18, letterSpacing: 0, fontFamily: 'QuickSandBold' } }))),
            React.createElement(View, { style: theme.buttonButtonView },
                React.createElement(TouchableWithoutFeedback, { onPress: () => this.onPressClick() },
                    React.createElement(View, { style: theme.buttonWrapper },
                        React.createElement(View, { style: theme.line }),
                        React.createElement(Text, { style: theme.bottomButtonText }, "CONTINUE"),
                        React.createElement(View, { style: theme.line }))))));
    }
}
//# sourceMappingURL=Step8.js.map