import {
    Dimensions,
    StyleSheet
  } from 'react-native';

 const { width, height } = Dimensions.get('window');

 export default StyleSheet.create({
    wrapper: {
        flex: 1, 
        backgroundColor: '#ffffff',
    },
    container: { 
        flex: 1, 
        justifyContent: 'space-between', 
        backgroundColor: '#ffffff',
        flexDirection: 'column',
        width: width,
        height: height
    },
    collectionListContainer: {
        flex: 1, 
        justifyContent: 'space-between', 
        backgroundColor: '#fff',
        flexDirection: 'row',
        marginBottom: 170
    },
    preShowContainer: {
        flex: 0.2,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        borderBottomWidth: 1,
        borderBottomColor: '#eee'
    },
    footerButtonContainer: {
        flex: 0.1,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center'
    },
    containerItem: {
        flex: 1, 
        justifyContent: 'space-between', 
        backgroundColor: '#fff',
        flexDirection: 'row',
        marginTop: 10
    },
    containerHeader: {
        flex: 1, 
        justifyContent: 'center', 
        flexDirection: 'column',
        alignItems: 'center',
        marginBottom: 10,
        marginTop: 20
    },
    containerFooter: {
        flex: 1, 
        justifyContent: 'center', 
        flexDirection: 'column',
        alignItems: 'center',
        marginBottom: 50
    },
    containerFooterWithBorder: {
        borderTopWidth: 1,
        borderTopColor: '#000',
        width: width - 100,
        marginTop: 20,
        justifyContent: 'center', 
        flexDirection: 'column',
        alignItems: 'center'
    },
    underlineTitle: { 
        backgroundColor: '#303030', 
        width: 45, 
        height: 1,
        marginTop: 10,
        marginBottom: 9
    },
    itemImage: {
        width: width / 3, 
        height: 180,
    },
    alterContainer: {
        flex: 0.3,
        paddingTop: 25
    },
    imageContainer: {
        flex: 0.4,
    },
    likeContainer: {
        flex: 0.3
    },
    likeImage: {
        width: 17,
        height: 15,
        marginTop: 2
    },
    alterItem: {
        borderWidth: 1,
        borderColor: '#000',
        width: 32,
        height: 22,
        alignItems: 'center',
        justifyContent: 'center',
        position: 'relative',
        backgroundColor: 'white'
    },
    animationImage: {
        position: 'absolute',
        top: 0,
        bottom: 0,
        left: 0,
        right: 0,
        width: 30,
        height: 20,
        resizeMode: 'stretch'
    },
    alterButtonContainer: {
        marginHorizontal: 5
    },
    countText: {
        textAlign: 'center',
        fontSize: 10,
        color: '#000',
        fontFamily: 'QuickSandRegular'
        // marginTop: 4
    },
    clickableImageContainer: {
        flex: 1, 
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#fff',
        flexDirection: 'column',
        paddingTop: 20,
        overflow: 'hidden'
    },
    clickableTitle: {
        fontFamily: 'RalewayBold',
        fontSize: 11,
        color: '#000',
        marginTop: 10,
        marginBottom: 2,
        textAlign: 'center',
        letterSpacing: 2,
    },
    clickableSubTitle: {
        fontFamily: 'QuickSandRegular',
        fontSize: 11,
        color: '#000',
        textAlign: 'center',
        lineHeight: 15
    },
    likeImageContainer: {
        flex: 0.2, 
        justifyContent: 'flex-end',
        flexDirection: 'row',
        marginRight: 25,
        marginTop: 25
    },
    headerTitle: {
        fontSize: 20,
        letterSpacing: 2,
        fontFamily: 'RalewayBold',
        color: '#333',
        marginBottom: 2
    },
    headerSubTitle: {
        fontSize: 11,
        fontFamily: 'QuickSandRegular',
        color: '#000'
    },
    footerTitle: {
        fontSize: 14,
        fontFamily: 'RalewayBold',
        color: '#000',
        marginTop: 35,
        marginBottom: 5
    },
        authorContainer: { 
        flex: 1, 
        alignItems: 'center', 
        justifyContent: 'center', 
        flexDirection: 'row'
    }
  });