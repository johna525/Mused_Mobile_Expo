import { Dimensions, StyleSheet } from 'react-native';
const { width } = Dimensions.get('window');
const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#fff'
    },
    username: {
        width: width * 0.8
    },
    logoutWrapper: {},
    logoutTxt: {},
    signInTouchable: {
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 20,
        padding: 10,
        backgroundColor: '#4267b2',
        borderColor: '#ccc',
        borderWidth: 1,
        borderRadius: 5,
    },
    facebookSignInLogo: {
        height: 18,
        width: 18,
    },
    signInText: {
        paddingLeft: 10,
        color: '#ccc'
    }
});
export default styles;
//# sourceMappingURL=theme.js.map