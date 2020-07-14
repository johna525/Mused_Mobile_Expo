
import {
    StyleSheet,
    Dimensions
  } from 'react-native';
const { width, height } = Dimensions.get('window');
export default StyleSheet.create({
    main:{
        flex: 1,
        backgroundColor: 'transparent',
        alignItems: 'center',
        justifyContent: 'center',
        flexDirection: 'row',
        overflow:'hidden',
        zIndex:-1,
    },
    container: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
        flexDirection: 'row',
    },
    dragContainer: {
        //backgroundColor: 'green',
        flex: 1.8,
        height: height - 200,

    },
    scrolllContainer: {
        width: width / 4 + 40,
        height: height - 150,
        paddingRight: 20,
        zIndex: 1,
        backgroundColor:'#ffffff'
    },
    scrolllContainerZero: {
        zIndex: 1,
        backgroundColor:'red'
    },
    scrollCell:{
        alignItems:'center',
        width: width / 4 + 20

    },
    scrollCellZero:{
        alignItems:'center',
        height: 40

    },
    scrollCellBorder:{        
        paddingBottom: 20,
        alignItems: 'center'
    },    
    image: {
        width: width / 4,
        height: width / 3,
        resizeMode: 'contain'
    },
    divLine: {
        width: width / 4 + 20,
        height: 2,
        backgroundColor: '#f9f9f9',
        marginTop: 20
    },
    scrollCellText:{
        textAlign: 'center',
        fontSize: 10,
        marginHorizontal: 5,
        marginTop: 20,
        fontFamily: 'QuickSandRegular'
    },
    scrollCellDivider:{
        backgroundColor: 'black',
        height: 1,
        width: 13
    },
    scrollCellExtra:{
        marginTop:15,
        height:25,
    },
    imageLayout:{
        width:80,
        height:60
    },
    scrollCellTextFilter:{
        marginHorizontal:0,
        textAlign:'right'
    },
    imageLayout25:{
        width:25,
        height:25
    },
    categoriesFilterText: {
        fontSize: 11,
        fontFamily: 'QuickSandRegular',
        textAlign: 'center'
    },
    categoriesFilterWrapper: {
        paddingBottom: 15,
        paddingTop: 15,
        borderTopWidth: 1,
        borderTopColor: '#f9f9f9',
        //marginRight: -20
    }
});