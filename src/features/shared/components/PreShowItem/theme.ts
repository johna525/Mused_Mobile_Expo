import {
    Dimensions,
    StyleSheet
  } from 'react-native';

 const { width } = Dimensions.get('window');

 export default StyleSheet.create({
    itemImage: {
         width: width / 6, 
         height: 100,
    },
    itemImageContainer: {
        width: width / 6, 
        height: 100,
        alignItems: 'center',
        justifyContent: 'center',
        marginHorizontal: 4,
        marginVertical: 2,
        backgroundColor: '#FFFFFF'
    },
    imagesContainer: {
        alignItems: 'center',
        justifyContent: 'center',
        flexDirection: 'row',
        height: 110,
        borderTopWidth: 0,
        borderTopColor: '#f1f1f1',
        width: width,
        paddingLeft: 5,
        paddingRight: 5,
        position: 'relative',
    },
    buttonPlus: {
        position: 'absolute',
        zIndex: 9999,
        top:   3,
        right: 10,
        width: 22,
        height: 22,
        backgroundColor: '#FFFFFF',
        justifyContent: 'center',
        alignItems: 'center',
        display: 'flex'
    },
    scrolledItemWrapper: {
        justifyContent: 'center',
        alignItems: 'center',
        width: 74,
        height: 85
    },
    collectionItem: {
        height: 91,
        width: 74,
        flexDirection: 'row',
        alignItems: 'center'
    },
    collectionOpacity: {
        opacity: 0.5
     },
     plusIcon: {
         width: 10,
         height: 10,
         resizeMode: 'contain'
     }
  });