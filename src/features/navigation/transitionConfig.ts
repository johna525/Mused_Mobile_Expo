import { Easing, Animated } from "react-native";
import { ZOOM, COLLECTION_ZOOM } from '../shared';

export const transitionConfig = () => {
  return {
    transitionSpec: {
      duration: 200,
      easing: Easing.out(Easing.poly(10)),
      timing: Animated.timing,
      useNativeDriver: true
    },
    screenInterpolator: (props: { layout: any, position: any, scene: any, scenes: any}) => {
      const thisSceneIndex = props.scene.index;
      if(props.scenes[thisSceneIndex].route.routeName === ZOOM || props.scenes[thisSceneIndex].route.routeName === COLLECTION_ZOOM ){
        console.log(
          props.scenes[thisSceneIndex - 1].route.routeName + ', ' +
          props.scenes[thisSceneIndex].route.routeName + ', '
        )
        const { index } = props.scene;
        const { initWidth } = props.layout;
  
        const translateX = props.position.interpolate({
          inputRange: [index - 1, index, index + 1],
          outputRange: [initWidth, 0, 0],
        });
  
        const opacity = props.position.interpolate({
            inputRange: [index - 1, index - 0.99, index],
            outputRange: [0, 1, 1],
          });
  
        return { opacity, transform: [{ translateX }] };
      } else {
        const translateX = 0;
        const translateY = 0;
        const opacity = props.position.interpolate({
          inputRange: [thisSceneIndex - 0.7, thisSceneIndex, thisSceneIndex + 0.7],
          outputRange: [1, 1, 1]
        });
        return { opacity, transform: [{translateX}, {translateY}]};
      }      
    }
  };
};