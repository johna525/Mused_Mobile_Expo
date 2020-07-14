import React, { Component } from 'react';
import { View, TouchableWithoutFeedback, Text, StyleSheet, Dimensions, } from 'react-native';
import { Video } from 'expo';
import theme from '../theme';
import TypeWriterText from './Typewriter';
const videoSource = require('../../../../assets/videos/Move.mp4');
// const logoImage = require('../../../../assets/images/new-view.jpg');
const { width } = Dimensions.get('window');
const styles = StyleSheet.create({
    content: {
        flex: 1,
        position: 'relative'
    },
    videoView: {
        marginVertical: 30,
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    },
    logoImage: {
        width: width * 0.8,
        height: width * 0.8 * 296 / 900,
        resizeMode: 'stretch',
        marginLeft: width * 0.1
    },
});
export default class Step3 extends Component {
    render() {
        return (React.createElement(View, { style: { flex: 1 } },
            React.createElement(TypeWriterText, { text: ["This ‘view‘ helps you", 'visualise your look'] }),
            React.createElement(View, { style: styles.content },
                React.createElement(View, { style: styles.videoView },
                    React.createElement(TouchableWithoutFeedback, { onPress: () => this.props.continue() },
                        React.createElement(Video, { shouldPlay: true, resizeMode: Video.RESIZE_MODE_CONTAIN, source: videoSource, isLooping: false, style: {
                                height: width * 0.9,
                                backgroundColor: '#ffffff',
                                width: width * 0.9 * 448 / 554,
                                borderWidth: 4,
                                borderColor: 'white'
                            }, useNativeControls: false, usePoster: false })))),
            React.createElement(View, { style: theme.buttonButtonView },
                React.createElement(TouchableWithoutFeedback, { onPress: () => this.props.continue() },
                    React.createElement(View, { style: theme.buttonWrapper },
                        React.createElement(View, { style: theme.line }),
                        React.createElement(Text, { style: theme.bottomButtonText }, "CONTINUE"),
                        React.createElement(View, { style: theme.line }))))));
    }
}
//# sourceMappingURL=Step4.js.map