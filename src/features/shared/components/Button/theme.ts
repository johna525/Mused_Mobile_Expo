import {
    StyleSheet,
    StyleProp
} from 'react-native';

const styles: StyleProp<any> = StyleSheet.create({
    buttonContainer: {
        width: 120,
        height: 50,
        borderWidth: 1,
        borderTopColor: '#000',
    },
    buttonContainerDark: {
        backgroundColor: '#000',
    },
    buttonContainerLight: {
        backgroundColor: '#fff',
    },
    buttonText: {
        fontFamily: 'Lato',
        fontSize: 16,
        lineHeight: 48,
        textAlign: 'center',
    },
    buttonTextDark: {
        color: '#fff',
    },
    buttonTextLight: {
        color: '#000',
    },
    imageButton: {
        height: 20,
        width: 59,
        marginLeft: 5 
    }
});

export default styles;
