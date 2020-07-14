import {
    Dimensions,
    StyleSheet
} from 'react-native';

const { width } = Dimensions.get('window');
const ITEM_CONT_PADDING: number = 4;
const IMAGE_WIDTH: number = width / 3;
const IMAGE_HEIGHT: number = 150;


export default  StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#fff'
    },
    containerHeader: {
        flex: 1, 
        justifyContent: 'center', 
        flexDirection: 'column',
        alignItems: 'center',
        paddingBottom: 20,
        marginTop: 20,
        borderBottomWidth: 2,
        borderColor: '#f9f9f9'
    },
    headerTitle: {
        fontSize: 18,
        fontFamily: 'RalewayBold',
        color: '#333',
        marginBottom: 2,
        letterSpacing: 2,
    },
    headerSubTitle: {
        fontSize: 11,
        fontFamily: 'QuickSandRegular',
        color: '#000'
    },
    underlineTitle: { 
        backgroundColor: '#303030', 
        width: 45, 
        height: 1,
        marginTop: 10,
        marginBottom: 9
    },
    listTitleContainer: {
        alignItems: 'center',
        justifyContent: 'center',
        marginTop: 10,
        marginBottom: 10,
    },
    listTitle: {
        fontFamily: 'Lato',
        fontSize: 11,
        color: '#000',
    },
    productListContainer: {
        flex: 1,
        justifyContent: 'space-between',
        backgroundColor: '#fff',
        flexDirection: 'row',
        marginBottom: 170
    },
    browseOnlyView: {
        flex: 1,
        justifyContent: 'space-between',
        backgroundColor: '#fff',
        flexDirection: 'row',
    },
    productContainer: {
        overflow: 'hidden',
        width: width / 2,
        alignItems: 'center',
        justifyContent: 'center',
        paddingLeft: ITEM_CONT_PADDING,
        paddingRight: ITEM_CONT_PADDING,
    },
    separator: {
        // borderStyle: 'dotted',
        borderTopWidth: 1,
        borderTopColor: '#f9f9f9',
    },
    vSeparator: {
        position: 'absolute',
        right: 0,
        height: 140,
        borderRightWidth: 1,
        borderRightColor: '#525252',
        borderStyle: 'dotted'
    },
    likeContainer: {
        position: 'absolute',
        top: 10,
        right: 10,
        width: 20,
        height: 20,
    },
    likeIcon: {
        width: 17,
        height: 15,
    },
    imageContainer: {
        width: IMAGE_WIDTH,
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        paddingVertical: 10
    },
    image: {
        width: IMAGE_WIDTH,
        height: IMAGE_HEIGHT,
    },
    imgDivider: {
        width: 20,
        height: 1,
        marginBottom: 5,
        flex: 0.01,
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        borderBottomColor: '#525252',
        borderBottomWidth: 1
    },
    descContainer: {
        alignItems: 'center',
        width: IMAGE_WIDTH * 1.2,
        height: 100,
        paddingBottom: 15,
    },
    designerTxt: {
        fontFamily: 'RalewayBold',
        fontSize: 12,
        color: '#000',
        textAlign: 'center',
        lineHeight: 14,
        marginTop: 4,
        marginBottom: 4,
        letterSpacing: 2,
    },
    descTxt: {
        fontFamily: 'QuickSandRegular',
        fontSize: 11,
        color: '#000',
        textAlign: 'center'
    },
    priceText: {
        color: '#000',
        fontSize: 12,
        fontFamily: 'QuickSandBold',
        textAlign: 'center'
    },

    //
    preShowContainer: {
        flex: 0.2,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        borderBottomWidth: 1,
        borderBottomColor: '#eee'
    },

    //
    footerContainer: {
        flex: 0.1,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        width: width - 60
    },

    footerComponent: {
        width: width,
        height: 10
    },
    imageWrapper: {
        flexDirection: 'column',
        justifyContent: 'center', 
        alignItems: 'center', 
        height: IMAGE_HEIGHT,
        overflow: 'hidden'
    },
    descWrapper: {
        display: 'flex',
        alignItems: 'center'
    },
    backgroundVideo: {
        width: width - 40,
    },
    emptyText: {
        paddingTop: 50,
        textAlign: 'center',
        fontSize: 14,
        color: '#555'
    },

    topProductsView: {
        flexWrap: 'wrap',
        flexDirection: 'row'
    }
});
