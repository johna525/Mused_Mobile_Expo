import React from 'react';
import { StyleSheet, View } from 'react-native';
import { AppLoading, Asset, Font } from 'expo';
import { AuthControls } from './features/auth-controls';
import { EvilIcons, FontAwesome, Ionicons, Entypo } from '@expo/vector-icons';
import { Provider } from 'mobx-react';
import { stores } from './features/stores';
import { initClient } from './services';

import 'es6-symbol/implement';

console.disableYellowBox = true;
type Props = {
  skipLoadingScreen: boolean;
}
type State = {
    isLoadingComplete: boolean;
};

export default class App extends React.Component<Props, State> {
    state: State = {
        isLoadingComplete: false,
    };

    render(): JSX.Element {
        if (!this.state.isLoadingComplete && !this.props.skipLoadingScreen) {
            return (
                <AppLoading
                    startAsync={this._loadResourcesAsync}
                    onError={this._handleLoadingError}
                    onFinish={this._handleFinishLoading}
                />
            );
        }

        return (
            <Provider {...stores}>
                <View style={styles.container}>
                    <AuthControls />
                </View>
            </Provider>

        );
    }

  _loadResourcesAsync = async () => {
    return Promise.all([
      Asset.loadAsync([
        require('../assets/images/newsfeed/newsfeed.jpg'),
        require('../assets/images/newsfeed/newsfeed1.jpg'),
        require('../assets/images/newsfeed/newsfeed2.jpg'),
        require('../assets/images/newsfeed/newsfeed-author.jpg'),
        require('../assets/images/logo.png'),
        require('../assets/images/profile-icon.png'),
        require('../assets/images/folder-icon.png'),
        require('../assets/images/arrow-icon.png'),
        require('../assets/images/heart-icon.jpg'),
        require('../assets/images/collection/bag.jpg'),
        require('../assets/images/collection/jacket.jpg'),
        require('../assets/images/collection/shirt.jpg'),
        require('../assets/images/collection/shoes.jpg'),
        require('../assets/images/collection/top.jpg'),
        require('../assets/images/collection/trousers.jpg'),
        require('../assets/images/verification-mark.png'),
        require('../assets/images/verification-mark-white.png'),
        require('../assets/images/cross-white.png'),
        require('../assets/images/filter-placeholder.jpg'),
        require('../assets/images/love.png'),
        require('../assets/images/view.png'),
        require('../assets/images/categories.png'),
        require('../assets/images/move.png'),
        require('../assets/images/switch.png'),
        require('../assets/images/details.png'),
        require('../assets/images/star.png'),
        require('../assets/images/star_like.png'),
        require('../assets/images/love-selected.png'),
        require('../assets/images/hamburger-icon.png'),
        require('../assets/images/logo-white.png'),
        require('../assets/images/down-placeholder.png'),

      ]),
      Font.loadAsync({
        // This is the font that we are using for our tab bar
        ...Ionicons.font,
        ...FontAwesome.font,
        ...EvilIcons.font,
        ...Entypo.font,
        // We include SpaceMono because we use it in HomeScreen.js. Feel free
        // to remove this if you are not using it in your app
        'Raleway': require('../assets/fonts/Raleway-Regular.ttf'),
        'RalewayBold': require('../assets/fonts/Raleway-Bold.ttf'),
        'Lato': require('../assets/fonts/Lato-Regular.ttf'),
        'LatoBold': require('../assets/fonts/Lato-Bold.ttf'),
        'GreatVibes': require('../assets/fonts/GreatVibes-Regular.ttf'),
        'QuickSandRegular': require('../assets/fonts/quicksand.book-regular.otf'),
        'QuickSandBold': require('../assets/fonts/quicksand.bold-regular.otf')
      }),
      initClient(),
    ]);
  };

  _handleLoadingError = (error: string) => {
    // In this case, you might want to report the error to your error
    // reporting service, for example Sentry
    console.warn(error);
  };

  _handleFinishLoading = () => {
    this.setState({ isLoadingComplete: true });
  };
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    position: 'relative'
  },
});
