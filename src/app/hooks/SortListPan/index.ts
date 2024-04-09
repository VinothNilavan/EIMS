import { Animated, PanResponder } from 'react-native';
const SortListPan = (
  item,
  arrangeTypeQuestionsAnswers,
  callBackForAssignAnswer,
  updatedZIndex,
  setEnableScroll,
) => {
  let animatedValue = new Animated.ValueXY();
  let _value = { x: 0, y: 0 };
  animatedValue.addListener((value) => (_value = value));

  let panResponder = PanResponder.create({
    onStartShouldSetPanResponder: (evt, gestureState) => true,
    onMoveShouldSetPanResponder: (evt, gestureState) => true,
    onPanResponderGrant: (e, gestureState) => {
      animatedValue.setOffset({
        x: _value.x,
        y: _value.y,
      });
      animatedValue.setValue({ x: 0, y: 0 });
      setEnableScroll(false);
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
      animatedValue.flattenOffset();
      Animated.decay(animatedValue, {
        deceleration: 0.5,
        velocity: { x: gestureState.vx, y: gestureState.vy },
      }).start();
      const { pageX } = e.nativeEvent;
      const { pageY } = e.nativeEvent;
      let itemStatus = {
        selected: false,
        item: null,
        index: 0,
      };
      let plottingPoints = [];

      for (let i = 0; i < arrangeTypeQuestionsAnswers.length; i++) {
        let { width, px, py } = arrangeTypeQuestionsAnswers[
          i
        ].measures;

        let equation =
          Math.pow(pageX - (px + width / 2), 2) + Math.pow(pageY - py, 2);
        let plottingPoint = Math.sqrt(equation);

        plottingPoints.push({ point: plottingPoint, index: i });
      }
      let sortedPoints = plottingPoints.sort((a, b) => a.point - b.point);
      itemStatus.selected = true;
      itemStatus.item = arrangeTypeQuestionsAnswers[sortedPoints[0].index];
      itemStatus.index = sortedPoints[0].index;
      setEnableScroll(true);

      if (itemStatus.selected) {
        callBackForAssignAnswer(
          item,
          itemStatus.index,
          () => {
            animatedValue.setValue({ x: 0, y: 0 });
          },
          sortedPoints,
        );
      } else {
        animatedValue.setValue({ x: 0, y: 0 });
      }
    },
  });

  return [animatedValue, panResponder];
};

export default SortListPan;
