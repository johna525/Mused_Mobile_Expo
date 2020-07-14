import {
    Dimensions,
    StyleSheet,
    StyleProp
  } from 'react-native';

 const { width} = Dimensions.get('window');

 const styles: StyleProp<any> = StyleSheet.create({
    container: { 
        flex: 1, 
        alignItems: 'center', 
        backgroundColor: '#fff'
    },
    containerTitle: { 
        flex: 0.2, 
        alignItems: 'center', 
        justifyContent: 'center'
    },
    title: {
        fontFamily: 'RalewayBold', 
        fontSize: 18,
        marginTop: 34
    },
    underlineTitle: { 
        backgroundColor: '#303030', 
        width: 25, 
        height: 1,
        marginTop: 5,
        marginBottom: 9
    },
    authorContainer: { 
        flex: 0.2, 
        alignItems: 'center', 
        flexDirection: 'row',
        alignSelf: 'flex-start'
    },
    authorImage: {
         width: 36, 
         height: 36
        },
    authorTextContainer: {
        alignItems: 'flex-start',
         justifyContent: 'space-between',
          flexDirection: 'column',
          marginLeft: 7
        },
    itemImageContainer: { 
        paddingHorizontal: 15,
    },
    itemImage: {
        borderWidth: 1,
        borderColor: 'black',
        width: width - 30,
        height: width * 1.2,
        resizeMode: 'cover'
    },
    authorText: {
        fontFamily: 'Lato',
        fontSize: 11,
        lineHeight: 15,
        fontStyle: 'italic'
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
    instagramImageView: {
        width: width / 5 - 12,
        height: width / 5 - 12,
        borderRadius: width / 10 - 6,
        overflow: 'hidden',
        marginHorizontal: 7.5,
        position: 'relative',
        justifyContent: 'center',
        alignItems: 'center' 
    },
    instagramPostImage: {        
        width: width / 5 - 18,
        height: width / 5 - 18,
        borderRadius: width / 10 - 9,        
    },
    instagramImageWrapper: {
        height: 100,
    },
    instagramImage: {
        marginLeft: 15,
        width: width - 30,
        height: 100,
        minHeight: 100,
        resizeMode: 'contain'
    },
    titleView: {
        flexDirection: 'row',
        alignItems: 'center',
        padding: 15
    },
    lineView: {
        height: 1,
        width: width / 8,
        backgroundColor: 'black',
    },
    titleText: {
        flex: 1,
        textAlign: 'center',
        fontFamily: 'Raleway',
        letterSpacing: 2,
        lineHeight: 20,
        fontSize: 14,
    },
    redirectText: {
        fontFamily: 'Raleway',
        fontSize: 14,
        marginBottom: 30
    },
    instagramList: {
        padding: 7.5, 
        flexDirection: 'row', 
        alignItems: 'center', 
        justifyContent: 'center'
    },
    loadingView: {
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'white'
    }
  });

  export default styles;