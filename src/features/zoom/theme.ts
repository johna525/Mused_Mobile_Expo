import {
    Dimensions,
    StyleSheet
} from 'react-native';

const {width} = Dimensions.get('window');

export default StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
    },
    wrapper: {        
        width: width,
        height: (width - 20) * 900 / 720,          
        position: 'relative' 
    },
    wrapperOutLineView: {
        position: 'absolute',
        top: 30,
        right: 29,
        width: 60,
        height: (width - 20) * 900 / 720 - 40,
        borderTopWidth: 1,
        borderRightWidth: 1,
        borderColor: 'black'
    },
    slideImageContainer: {
        marginTop: 40,
        width: width - 78,
        marginHorizontal: 39,
        height: (width - 20) * 900 / 720 - 20,
        borderWidth: 1,
        borderColor: 'black',   
        resizeMode: 'cover',
        justifyContent: 'center',
        alignItems: 'center'
    },
    slideImage: {
        width: width - 80,
        height: (width - 20) * 900 / 720 - 22,
        resizeMode: 'cover'
    },
    secondImage: {
        width: width - 10,
        height: width * 0.85,
        resizeMode: 'contain'
    },
    backButtonView: {
        position: 'absolute',
        top: 24,
        left: 22,
    },
    likeButtonView: {
        position: 'absolute',
        top: 10,
        right: 10,
        width: 30,
        height: 40,
        justifyContent: 'center',
        alignItems: 'center'
    },
    likeIcon: {
        width: 20,
        height: 20,
        resizeMode: 'stretch'
    },
    scrollTopView: {
        width: width,
        height: width * 900 / 675,
        backgroundColor: 'transparent'
    },
    infoView: {
        paddingTop: 10,
        paddingHorizontal: 30,
        backgroundColor: 'white',
        borderTopWidth: 1,
        borderColor: 'black'
    },
    brandView: {
        paddingTop: 5,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between'
    },
    brandText: {
        fontSize: 16,
        fontFamily: 'RalewayBold',
        color: '#333',
        letterSpacing: 2,
        width: width / 2
    },
    unbrandText: {
        fontSize: 12,
        fontFamily: 'QuickSandRegular',
        color: '#000',
        lineHeight: 16,
        width: width * 0.6
    },
    priceText: {
        color: '#000',
        fontSize: 16,
        fontFamily: 'RalewayBold',
    },
    saleText: {
        color: '#000',
        textDecorationLine: 'underline',
        fontSize: 12,
        lineHeight: 16,
        fontFamily: 'QuickSandRegular',
    },
    markView: {
        position: 'absolute',
        left: 0,
        right: 0,
        bottom: 70,
        height: 20,
        opacity: 0.7,
        backgroundColor: 'white'
    },
    buttonsContainer: {
        height: 60,
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        marginHorizontal: 10,
        marginBottom: 10,
        backgroundColor: 'black'
    },
    descContainer: {
        paddingHorizontal: 30,
        paddingBottom: 30,
        paddingTop: 15,
        backgroundColor: 'white',
    },
    descTitle: {
        fontFamily: 'RalewayBold',
        fontSize: 14,
        marginBottom: 10
    },
    descText: {
        fontFamily: 'QuickSandRegular',
        fontSize: 13,
        lineHeight: 22,
    },
    leftButton: {
        flex: 1,        
    },
    rightButton: {
        flex: 1
    },
    dottedLine: {
        height: 30,
        width: width,
        resizeMode: 'contain'
    },
    buttonView: {
        position: 'relative',
        width: width - 30,
        height: 60,
    },
    backButton: {
        backgroundColor: 'black',
        position: 'absolute',
        top: 0,
        right: 0,
        left: 7,
        bottom: 7
    },
    frontButton: {
        backgroundColor: 'black',
        position: 'absolute',
        bottom: 0,
        left: 0,
        right: 3,
        top: 3,
        borderColor: 'white',
        borderWidth: 2,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center'
    },
    buttonLogo: {
        width: 32,
        height: 32,
        resizeMode: 'contain'
    },
    buttonText: {
        fontFamily: 'RalewayBold',
        fontSize: 18,
        color: 'white',
        paddingLeft: 10,
        letterSpacing: 2
    },
    faintText: {
        fontSize: 12,
        opacity: 0.39,
        fontFamily: 'Lato',
        paddingHorizontal: 30,
        paddingTop: 5
    },
    linkIcon: {
        width,
        height: 22, 
        marginVertical: 10,
        resizeMode: 'contain',
    },
    linkView: {
        alignItems: 'center',
        justifyContent: 'center',
        marginBottom: 60,
        marginHorizontal: width / 6,
        position: 'relative',
        height: 160,
    },
    borderImage: {
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        resizeMode: 'stretch',
        width: width * 2 / 3,
        height: 160,
    }
});
