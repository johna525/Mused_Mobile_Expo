import {
    Dimensions,
    StyleSheet
  } from 'react-native';

 const { width } = Dimensions.get('window');

 export default StyleSheet.create({
    container: {
        position: 'absolute', 
        bottom: 55, 
        height: 110, 
        width: width, 
        backgroundColor: '#FFF'
    },
    containerFooterButtons: {
        borderTopWidth: 1,
        borderTopColor: '#eee',
        width: width,
        justifyContent: 'center', 
        flexDirection: 'row',
        alignItems: 'center'
    }
  });