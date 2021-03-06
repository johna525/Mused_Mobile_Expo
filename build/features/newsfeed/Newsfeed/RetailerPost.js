import React, { Component } from 'react';
import { View, Image, Text, Dimensions, StyleSheet, } from 'react-native';
import Ripple from 'react-native-material-ripple';
const { width } = Dimensions.get('window');
const styles = StyleSheet.create({
    container: {
        backgroundColor: 'white',
        padding: 15,
    },
    listView: {
        flexDirection: 'row',
        flexWrap: 'wrap'
    },
    listItemWrapper: {
        width: (width - 50) / 2,
        height: (width - 50) * 0.75,
        margin: 5,
        borderWidth: 1,
        borderColor: 'black',
    },
    listItem: {
        width: (width - 50) / 2,
        height: (width - 50) * 0.75,
    },
    image: {
        resizeMode: 'cover',
        width: (width - 50) * 0.5 - 2,
        height: (width - 50) * 0.75 - 2
    },
    headerView: {
        paddingVertical: 15,
        flexDirection: 'row',
        alignItems: 'center'
    },
    line: {
        height: 1,
        backgroundColor: 'black',
        flex: 1
    },
    title: {
        paddingHorizontal: 15,
        textAlign: 'center',
        fontFamily: 'Raleway',
        letterSpacing: 2,
        lineHeight: 20,
        fontSize: 14,
    },
    separator: {
        width: width,
        height: 30,
        backgroundColor: '#fafafa',
        borderTopColor: '#e2e2e2',
        borderTopWidth: 1,
        borderBottomColor: '#f1f1f1',
        borderBottomWidth: 1
    },
});
export default class RetailerPosts extends Component {
    render() {
        const { posts } = this.props;
        return (React.createElement(View, { style: styles.container },
            React.createElement(View, { style: styles.headerView },
                React.createElement(View, { style: styles.line }),
                React.createElement(Text, { style: styles.title }, "More looks"),
                React.createElement(View, { style: styles.line })),
            React.createElement(View, { style: styles.listView }, posts.map((post, index) => {
                return (React.createElement(Ripple, { key: index, style: styles.listItemWrapper, onPress: () => this.props.onClickPost(post), rippleColor: 'rgb(255, 255, 255)', rippleDuration: 300, rippleCentered: true, rippleContainerBorderRadius: width },
                    React.createElement(View, { style: styles.listItem }, post.inspirationalImage !== undefined && React.createElement(Image, { source: { uri: post.inspirationalImage }, style: styles.image }))));
            }))));
    }
}
//# sourceMappingURL=RetailerPost.js.map