import React, { Component } from 'react';
import {
    View,
    Image,
    Text,
    StyleSheet,
    Dimensions,
    TouchableOpacity,
    Linking,
    FlatList
} from 'react-native';
import Ripple from 'react-native-material-ripple';
import * as API from '../../../services/api';
// import DotIndicator from '../../shared/components/Indicators/dot-indicator'
const InstagramImage = require('../../../../assets/images/instagram.png');

const { width, height } = Dimensions.get('window');

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'white',
        paddingBottom: 20,
        position: 'relative'
    },
    instagramItem: {
        paddingHorizontal: 20,
    },
    indexView: {
        height: 60,
        alignItems: 'center',
        justifyContent: 'center'
    },
    moreText: {
        fontFamily: 'QuickSandRegular',
        fontSize: 12,
        letterSpacing: 2,
        textAlign: 'center',
        margin: 2
    },
    slideItemView: {
        width: width - 40,
        height: height - 270,
        alignItems: 'center',
        justifyContent: 'center',
        borderWidth: 1,
        borderColor: 'black'
    },
    slideImage: {
        width: width - 42,
        height: height - 272,
        resizeMode: 'cover'
    },
    slideHeader: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingVertical: 16
    },
    avatarView: {
        width: 30,
        height: 30,        
        position: 'relative',
        justifyContent: 'center',
        alignItems: 'center'
    },
    instagram: {
        position: 'absolute',
        top: 0,
        left: 0,
        width: 30,
        height: 30,
        resizeMode: 'stretch',
    },
    avatarWrapper: {
        width: 28,
        height: 28,        
        backgroundColor: 'white',
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 14
    },
    slideAvatar: {
        width: 26,
        height: 26,        
        resizeMode: 'cover',
        borderRadius: 13,
    },
    slideHeaderInfo: {
        flex: 1,
        justifyContent: 'center',
        paddingLeft: 5,
    },
    name: {
        fontSize: 12,
        fontFamily: 'QuickSandRegular',
        color: 'black',
        marginBottom: 3,
        letterSpacing: 2,
    },
    role: {
        fontSize: 12,
        fontFamily: 'Raleway',
        color: 'black'
    },
    viewButton: {
        justifyContent: 'center',
        alignItems: 'center',
        position: 'relative',
        borderWidth: 1,
        borderColor: '#000',
        backgroundColor: 'white',
        width: 120,
        height: 40,
    },
    viewButtonText: {
        // fontFamily: 'QuickSandBold',
        fontSize: 12,
        color: '#000',
        fontFamily: 'QuickSandRegular',
        letterSpacing: 2,
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
    },
    loadingText: {
        fontSize: 16,
        fontFamily: 'QuickSandRegular',
    },
    loadingIcon: {
        height: 30,
        marginTop: 20
    },
    animationImage: {
        position: 'absolute',
        top: 1,
        bottom: 1,
        left: 1,
        right: 1,
        height: 36,
        width: 116,
        resizeMode: 'stretch'
    },
    separator: { 
        width: width, 
        paddingVertical: 15, 
        backgroundColor: '#fafafa',
        borderTopColor: '#e2e2e2',
        borderTopWidth: 1,
        borderBottomColor: '#f1f1f1',
        borderBottomWidth: 1
    },
    moreView: {
        alignItems: 'flex-end',
        padding: 20,
    },
    dateText: {
        fontSize: 14,
        color: 'black',
        fontFamily: 'LatoBold',
        textAlign: 'center',
        marginVertical: 10
    }
})

type Props = {
    navigation: any;
    onClickStyleIt: (slots: Slot[]) => void;
    onClickViewProfile: (url: string) => void;
}

type State = {
    slideIndex: number,
    slots: any;
    loading: boolean
};

const tempImageURL = 'https://scontent-nrt1-1.cdninstagram.com/vp/2393885aa6b1a2b1bf2451961b176b9c/5C9CC127/t51.2885-15/e15/11280253_1438753469762560_1082518244_n.jpg?_nc_ht=scontent-nrt1-1.cdninstagram.com';

export default class InstagramPost extends Component<Props, State> {

    swiper: any;
    state: State = {
        slideIndex: 0,
        slots: [],
        loading: false
    }

    componentDidMount() {
        const { navigation } = this.props;
        const slots = navigation.getParam('slots', []);
        this.setState({slots: this.validate(slots)});
    }

    _onChangeSwiperIndex = (index: number) => {
        API.RegisterEvent("Instagram-swipe", {
            actionType: 'Swipe photo',
            index
        })
        this.setState({slideIndex: index});
    }

    validate = (slots: any) => {
        const temp: any = [];
        slots.map((slot: any) => {
            if(slot.slot.instagramURL.length > 0) temp.push(slot);
        })
        return temp;
    }
    
    _onClickStyleIt = (index: number) => {
        this.props.onClickStyleIt(this.state.slots[index].slot.slots)
    }

    onNext = () => {
        const newIndex = (this.state.slideIndex + 1) % (this.state.slots.length);
        this.setState({slideIndex: newIndex})
        this.swiper.scrollBy(1, true)
    }

    getDescription = (title: string) => {
        if(title.length < 25) return title;
        return title.substr(0, 25) + ' ...'
    }

    onPressMore = () => {
        Linking.openURL(JSON.parse(this.state.slots[this.state.slideIndex].instagramURL).author_url);
    }

    timeAgo: string;

    _renderItem = (props: {item: any, index: number}) => {
        const slot = props.item;
        const instagram = JSON.parse(slot.slot.instagramURL);
        let showDate: boolean = false;
        if(props.index === 0) showDate = false;
        else if(slot.date !== this.timeAgo && this.timeAgo === this.state.slots[0].date) {
            showDate = true;            
        }
        this.timeAgo = slot.date;
        return(
            <View key={props.index}>
                {
                    showDate ?
                    <View style={styles.separator}>
                        <Text style={styles.dateText}>Past Instagram Looks</Text>
                    </View>
                    :props.index > 0 ?
                    <View style={styles.separator}></View>
                    :null
                }
                <View style={styles.instagramItem}>
                    <View style={styles.slideHeader}>
                        <View style={styles.avatarView}>
                            <Image source={InstagramImage} style={styles.instagram} />
                            <View style={styles.avatarWrapper}>
                                <Image source={{uri: tempImageURL}} style={styles.slideAvatar} />
                            </View>
                        </View>
                        <View style={styles.slideHeaderInfo}>
                            <Text style={styles.name}>{instagram.author_name}</Text>
                            {/* <Text style={styles.role}>{this.getDescription(instagram.title)}</Text> */}
                        </View>
                        {/* <TouchableOpacity onPress={() => this.props.onClickViewProfile(instagram.author_url)}>
                            <View style={styles.viewButton}>
                                <Text style={styles.viewButtonText}>View Profile</Text>
                            </View>
                        </TouchableOpacity> */}
                        <Ripple 
                            onPress={() => this.props.onClickViewProfile(instagram.author_url)}
                            rippleSize={80}
                            rippleDuration={300} 
                            rippleContainerBorderRadius={40}>
                            <View style={styles.viewButton}>
                                {/* <Image source={AnimationImage} style={styles.animationImage} /> */}
                                <Text style={styles.viewButtonText}>View Profile</Text>
                            </View>                      
                        </Ripple>  
                    </View>
                    <Ripple 
                        onPress={() => this._onClickStyleIt(props.index)}
                        rippleSize={80}
                        rippleDuration={300} 
                        rippleContainerBorderRadius={40}>
                        <View style={styles.slideItemView}>
                            <Image source={{uri: instagram.thumbnail_url}} style={styles.slideImage} />
                        </View>    
                    </Ripple>                                                            
                </View>
                <View style={styles.moreView}>
                    <TouchableOpacity onPress={() => this.onPressMore()}>
                        <Text style={styles.moreText}>View more on Instagram</Text>
                    </TouchableOpacity>
                </View>                                
            </View>
        )
    }

    render() {
        const { slots } = this.state;
        this.timeAgo = '';
        return (
            <FlatList
                data={slots}
                renderItem={this._renderItem}
                scrollEventThrottle={1000}
            />
        )
    }
}
