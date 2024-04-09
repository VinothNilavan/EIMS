import React, { useRef, useState, Fragment, useEffect } from 'react';
import { View, FlatList, Keyboard, Animated, Platform } from 'react-native';
import { BottomSheetHeader, SparkyCard } from '@components';
import { ArrowUpMaroon, ArrowDownMaroon } from '@images';
import { useStores } from '@mobx/hooks';
import { observer } from 'mobx-react';
import moment from 'moment';
import { USE_NATIVE_DRIVER } from '@utils';
import styles from './indexCss';

const BottomSheet = props => {
  const { loginStore } = useStores();
  const bottomSheetData = loginStore.sparkiesChamp;
  const [sheetOpen, setSheetOpen] = useState(false);
  const [keyboardOpen, setKeyboardOpen] = useState(false);
  const slideUp = useRef(new Animated.Value(0)).current;

  let desc = null;

  if (loginStore.sparkyFromDate && loginStore.sparkyToDate) {
    desc = `${moment(loginStore.sparkyFromDate, 'MM-DD-YYYY').format('DD MMM')}
     to ${moment(loginStore.sparkyToDate, 'MM-DD-YYYY').format('DD MMM YYYY')}`;
  }

  const keyboardWillShow = () => {
    setKeyboardOpen(true);
  };

  const keyboardWillHide = () => {
    setKeyboardOpen(false);
  };

  useEffect(() => {
    const keyboardWillShowListener = Keyboard.addListener('keyboardDidShow', keyboardWillShow);
    const keyboardWillHideListener = Keyboard.addListener('keyboardDidHide', keyboardWillHide);
    return () => {
      keyboardWillShowListener.remove();
      keyboardWillHideListener.remove();
    };
  }, []);

  const toggle = (toggleUp = false) => {
    try {
      Animated.timing(slideUp, {
        toValue: toggleUp ? 1 : 0,
        duration: 200, // Adjust the duration as needed
        useNativeDriver: USE_NATIVE_DRIVER,
      }).start();
    } catch (error) {
      console.log(`error in toggle ${error}`)
    }
  }

  const bottomSheetRender = itemData => {
    const { studentName, orgName, sparkieCount, grade } = itemData.item;
    return (
      <SparkyCard title={`${studentName} - Class ${grade}`} subtitle={orgName} pts={sparkieCount} key={itemData.index} />
    );
  };


  const btmSheet = useRef(null);
  let SvgRight = sheetOpen ? ArrowDownMaroon : ArrowUpMaroon;
  let snapToPoint = 0;

  const onClickArrow = () => {
    snapToPoint = sheetOpen ? snapToPoint : 1;
    btmSheet?.current?.snapTo(snapToPoint);
    toggle(!sheetOpen)
    if (!sheetOpen) {
      setSheetOpen(!sheetOpen);
    } else {
      setTimeout(() => {
        setSheetOpen(!sheetOpen)
      }, 100)
    }
  };

  const header = () => (
    <Animated.View
      style={{
        transform: [
          {
            translateY: slideUp.interpolate({
              inputRange: [0, 1],
              outputRange: [300, 0]
            })
          },
        ],
        ...styles.listContainer
      }}>
      <View style={styles.listInnerContainer}>
        <BottomSheetHeader
          onPress={onClickArrow}
          SvgRight={SvgRight}
          desc={desc}
        />
      </View>
      {sheetOpen && bottomSheetContent}
    </Animated.View>
  );

  const getBottomSheetItem = () => {
    return (
      <View
        style={styles.sheetContent}>
        <Fragment>
          <FlatList
            data={bottomSheetData}
            renderItem={bottomSheetRender}
            keyExtractor={(item, index) => `${item.studentId}_${index}`}
            snapToEnd={true}
            scrollEnabled={false}
          />
        </Fragment>
      </View>
    )
  }

  let bottomSheetContent = (
    <FlatList
      data={['1']}
      renderItem={getBottomSheetItem}
    />
  );

  let renderContent = (
    (!sheetOpen) ?
      <View style={styles.bottomHeaderContainer}>
        <BottomSheetHeader
          onPress={onClickArrow}
          SvgRight={SvgRight}
          desc={desc}
        />
      </View> : header()
  )

  if (keyboardOpen) {
    bottomSheetContent = null;
  }

  return (
    <View style={styles.container}>
      {props.children}
      {!keyboardOpen && renderContent}
    </View>
  );
};

BottomSheet.propTypes = {};

BottomSheet.defaultProps = {};

export default observer(BottomSheet);
