import { Animated, PanResponder } from 'react-native';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
const ClassificationPan = (
  item,
  dragToContainer1,
  dragToContainer2,
  isRTL,
  updatedZIndex,
) => {
  let animatedValue = new Animated.ValueXY();
  let _value = { x: 0, y: 0 };
  animatedValue.addListener(value => (_value = value));

  let panResponder = PanResponder.create({
    onStartShouldSetPanResponder: (evt, gestureState) => true,
    onMoveShouldSetPanResponder: (evt, gestureState) => true,
    onPanResponderGrant: (e, gestureState) => {
      animatedValue.setOffset({
        x: _value.x,
        y: _value.y,
      });
      animatedValue.setValue({ x: 0, y: 0 });
      updatedZIndex(item);
    },
    onPanResponderMove: Animated.event([
      null,
      {
        dx: animatedValue.x,
        dy: animatedValue.y,
      },
    ], { useNativeDriver: false }),
    onPanResponderRelease: (e, gestureState) => {
      console.log('X - ', e.nativeEvent.pageX);
      console.log('Y - ', e.nativeEvent.pageY);
      animatedValue.flattenOffset();
      Animated.decay(animatedValue, {
        deceleration: 0.9,
        velocity: { x: gestureState.vx, y: gestureState.vy },
      }).start();
      const { pageX } = e.nativeEvent;
      const { pageY } = e.nativeEvent;

      if (pageY > hp(48) && pageY < hp(83)) {
        if (pageX > wp(14) && pageX < wp(45)) {
          isRTL ? dragToContainer2(item) : dragToContainer1(item);
        } else if (pageX > wp(45) && pageX < wp(86)) {
          isRTL ? dragToContainer1(item) : dragToContainer2(item);
        } else {
          animatedValue.setValue({ x: 0, y: 0 });
        }
      } else {
        animatedValue.setValue({ x: 0, y: 0 });
      }
    },
  });

  return [animatedValue, panResponder];
};

export default ClassificationPan;