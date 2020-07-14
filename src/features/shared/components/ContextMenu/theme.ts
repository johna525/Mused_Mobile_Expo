import {
    Dimensions,
    StyleSheet
  } from 'react-native';

 const { width } = Dimensions.get('window');

 export default StyleSheet.create({
    container: {
        position: 'absolute', 
        bottom: 0, 
        height: 45,
        zIndex: 2,
        width: width, 
        backgroundColor: '#F1F1F1',
        borderTopWidth: 1,
        borderTopColor: '#eee',
        justifyContent: 'center', 
        flexDirection: 'row',
        alignItems: 'center'
    },
    buttonText: {
        color: '#000000',
        fontSize: 8,
        fontFamily: 'QuickSandRegular'
    },
    mockImage: {
        width: 16,
        height: 14,
        resizeMode: 'contain',
        marginBottom: 3
    },
    menuItem: {
        justifyContent: 'center',
        flexDirection: 'column',
        alignItems: 'center'
    }
  });