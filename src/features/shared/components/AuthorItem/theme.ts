import {
    StyleSheet,
    Dimensions
} from 'react-native';
const { width } = Dimensions.get('window');

const styles = StyleSheet.create({
    authorImage: {
        width: 30, 
        height: 30
        },
    authorTextContainer: {
        alignItems: 'flex-start',
        justifyContent: 'space-between',
        flexDirection: 'column',
        marginLeft: 7,
    },
    authorText: {
        fontFamily: 'QuickSandRegular',
        fontSize: 11,
        lineHeight: 15
    },
    authorWrapper: {
        flex: 1,
        flexDirection: 'row', 
        width: width - 30,
        paddingTop: 15,
        paddingBottom: 15
    }
});

export default styles;