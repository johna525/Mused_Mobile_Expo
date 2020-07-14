import { Dimensions, StyleSheet } from 'react-native';
const { width } = Dimensions.get('window');
const styles = StyleSheet.create({
    footerCheckImage: {
        width: 16,
        height: 14,
        resizeMode: 'contain',
        marginBottom: 3
    },
    footerCheckText: {
        fontSize: 8,
        fontFamily: 'QuickSandRegular'
    },
    footerButtonContainer: {
        alignItems: 'center',
        justifyContent: 'center',
        flexDirection: 'row',
        height: 54,
        width: width / 5,
        backgroundColor: '#fff',
    },
    footerButtonConfirmContainer: {
        alignItems: 'center',
        justifyContent: 'center',
        flexDirection: 'column',
        flex: 1,
        width: width,
        height: 54,
        backgroundColor: '#fff',
    }
});
export default styles;
//# sourceMappingURL=theme.js.map