import {
    Dimensions,
    StyleSheet
} from 'react-native';
const { width } = Dimensions.get('window');
const IMAGE_WIDTH: number = width / 3;
const ITEM_CONT_PADDING: number = 4;

const deviceWidth: number = Dimensions.get('window').width;
export default StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        height: Dimensions.get('window').height,
        marginBottom: 170
    },
    filterListContainer: {
        flex: 1,
        justifyContent: 'center',
        backgroundColor: '#fff',
        flexDirection: 'row',
        alignItems: 'center'
    },

    // item
    itemContainer: {
        display: 'flex',
        flexDirection: 'column',
        borderRadius: 3,
        width: 86,
        flex: 0.24,
        alignItems: 'center',
        justifyContent: 'center',
        paddingTop: 3,
        paddingBottom: 20,
        paddingLeft: ITEM_CONT_PADDING,
        paddingRight: ITEM_CONT_PADDING
    },
    imageContainer: {
        width: IMAGE_WIDTH,
        display: 'flex',
        flex: 0.7,
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center'
    },
    image: {
        width: IMAGE_WIDTH,
        height: 100,
    },
    itemName: {
        fontFamily: 'Lato',
        fontSize: 11,
        color: '#000',
        textAlign: 'center',
        lineHeight: 14,
        marginTop: 4,
        marginBottom: 4,
    },

    //
    preShowContainer: {
        flex: 0.2,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
    },

    //
    footerContainer: {
        flex: 0.1,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        width: deviceWidth,
        backgroundColor: '#000'
    },

    footerComponent: {
        width: deviceWidth,
        height: 20
    },
    tabNavigationWrapper: {
        justifyContent: 'center',
        alignItems: 'center',
        width: deviceWidth,
        flexDirection: 'column',
        height: 300
    },
    scrollView: {
        marginVertical: 30
    },
    categoryWrapper: {
        alignItems: 'center',
        width: deviceWidth,
        flexDirection: 'column',
        paddingBottom: 20
    },
    textTabNavigation: {
        flex: 1,
        fontSize: 14,
        fontFamily: 'RalewayBold',
        lineHeight: 15,
        textAlign: 'center',
        letterSpacing: 2
    },
    textTabHeader: {
        fontSize: 16,
        fontFamily: 'RalewayBold',
        lineHeight: 16 
    },
    searchContainer: {
        justifyContent: 'center',
        alignItems: 'center',
        width: deviceWidth,
        flexDirection: 'row',
        flex: 1,
        height: 60,
        paddingLeft: 25
    },
    designerItemContainer: {
        width: deviceWidth,
        paddingLeft: 30,
        height: 40,
        justifyContent: 'space-between',
        flexDirection: 'row',
        alignItems: 'center'
    },
    designerItemText: {
        fontSize: 11,
        color: '#000'
    },
    designerItemSeparator: {
        borderBottomColor: '#efefef',
        borderBottomWidth: 2
    },
    topSearchSeparator: { 
        height: 30, 
        width: deviceWidth,
        backgroundColor: '#f7f7f7'
    },
    buttonTabNavigation: {
        height: 50,
        alignItems: 'center',
        justifyContent: 'center',
        flex: 0.23
    },
    textFieldStyle: {
        fontSize: 14,
         color: '#000'
    },
    diviLine: {
        backgroundColor: '#E5E5E5',
        height: 1
    },
    tabItem: {
        width: deviceWidth,
        justifyContent: 'center'
    },
    subCategoryText: {
        fontFamily: 'QuickSandRegular',
        fontSize: 11,
        paddingLeft: 5,
        paddingTop: 3,
        paddingBottom: 3,
        textAlign: 'center'
    },
    subCategoryItem: {
        marginBottom: 10,
        width: 130
    },
    tabFilterCategories: {
        flexDirection: 'row',
        alignItems: 'center',
        height: 50,
        justifyContent: 'space-between'

    },
    categoryTouchable: {
        flex: 1,
        height: 35, 
        alignItems: 'center',
        flexDirection: 'row', 
        paddingHorizontal: 20,
    },
    plusIcon: {
        width: 30,
        fontSize: 20,
        lineHeight: 20
    },
    subCategoriesList: {
        paddingVertical: 10,
        alignItems: 'center'
    },
    selectionText: {
        paddingRight: 10, 
        fontSize: 11, 
        lineHeight: 11, 
        fontFamily: 'Lato'
    },
    counterContainer: {
        flex: 1,
        justifyContent: 'center',
        flexDirection: 'column',
        padding: 20
    },
    counterItemContainer: {
        height: 70,
        marginVertical: 10,
        flexDirection: 'row',
    },
    lineView: {
        height: 1,
        backgroundColor: 'black',
        width: width * 0.2,
        marginTop: 10
    },
    leftView: {
        flex: 1,
        padding: 20,
        justifyContent: 'center',
        backgroundColor: '#E2E2E2',
    },
    categoryText: {
        fontSize: 14,
        fontFamily: 'RalewayBold',
        paddingBottom: 5,
        textAlign: 'center',
        letterSpacing: 2
    },
    subText: {
        fontSize: 11,
        textAlign: 'center',
        fontFamily: 'QuickSandRegular'
    },
    filterImage: {
        position: 'absolute',
        right: 0,
        bottom: 0,
        top: 0,
        width: 60,
        height: 90,
        resizeMode: 'stretch',
        backgroundColor: '#E2E2E2'
    }
});
