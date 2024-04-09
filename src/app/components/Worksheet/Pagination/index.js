// External Imports
import React, { useState, useEffect } from 'react';
import { View, TouchableOpacity } from 'react-native';
import PropTypes from 'prop-types';
// Internal Imports
import styles from './style';
import { BalooThambiRegTextView } from '@components';
import {
  LeftArrowCircle,
  RightArrowCircle,
  LeftArrowCircleDisabled,
  RightArrowCircleDisabled,
} from '@images';
import { getHp } from '@utils';
import { useStores } from '@mobx/hooks';
import { runInAction } from 'mobx';

const Pagination = props => {
  const { testID, unitlist, selectedIndex, callback } = props;
  let [currentIndex, setCurrentIndex] = useState(1);

  const { qnaStore } = useStores();
  useEffect(() => {
    let initialIndex = selectedIndex;
    if (selectedIndex <= 5) {
      initialIndex = 1;
    } else if (unitlist?.length > 5 && selectedIndex > unitlist?.length - 5) {
      initialIndex = selectedIndex - 4
    }
    setCurrentIndex(initialIndex);
  }, [selectedIndex, unitlist]);

  const onPrevious = () => {
    if (currentIndex != 1) {
      setCurrentIndex(currentIndex => currentIndex - 1);
    }
  };

  const onNext = () => {
    if (currentIndex != unitlist.length) {
      setCurrentIndex(currentIndex => currentIndex + 1);
    }
  };

  const getItem = () => {
    let componets = [];
    for (
      let index = currentIndex - 1;
      index < currentIndex + 4 && index < unitlist.length;
      index++
    ) {
      componets.push(
        <TouchableOpacity
          accessible={true}
          testID="PaginationSwipeContent"
          accessibilityLabel="PaginationSwipeContent"
          style={[
            styles.swipeContentView,
            unitlist[index]?.unitStatus === 'completed' && styles.attempted,
            selectedIndex == unitlist[index]?.unitSequenceNo &&
            styles.selectedItem,
          ]}
          onPress={() => {
            runInAction(()=>{
              qnaStore.nextContentSeqNum = unitlist[index]?.unitSequenceNo;
            })
            callback();
          }}>
          <BalooThambiRegTextView
            testID="PaginationUnitSequenceNo"
            style={[
              styles.swipeContentViewText,
              selectedIndex == unitlist[index]?.unitSequenceNo &&
              styles.selectedItemText,
            ]}>
            {unitlist[index]?.unitSequenceNo}
          </BalooThambiRegTextView>
        </TouchableOpacity>,
      );
    }
    return componets;
  };

  return (
    <View accessible={true} testID={testID} accessibilityLabel={testID} style={styles.container}>
      {unitlist && unitlist.length > 0 && currentIndex !== -1 && (
        <View style={styles.content}>
          {unitlist.length > 5 && (
            <TouchableOpacity
              accessible={true}
              testID="PaginationLeftArrowCircle"
              accessibilityLabel="PaginationLeftArrowCircle"
              disabled={currentIndex === 1}
              onPress={onPrevious}
              style={[
                styles.changeBtn,
                currentIndex === 0 && styles.adjucentItems,
              ]}>
              {currentIndex === 1 ? (
                <LeftArrowCircleDisabled width={getHp(26)} height={getHp(26)} />
              ) : (
                <LeftArrowCircle width={getHp(26)} height={getHp(26)} />
              )}
            </TouchableOpacity>
          )}
          <View style={styles.pagination}>{getItem()}</View>
          {unitlist.length > 5 && (
            <TouchableOpacity
              accessible={true}
              testID="PaginationRightArrowCircle"
              accessibilityLabel="PaginationRightArrowCircle"
              disabled={currentIndex + 4 === unitlist.length}
              onPress={onNext}
              style={[
                styles.changeBtn,
                currentIndex == unitlist.length - 1 && styles.adjucentItems,
              ]}>
              {currentIndex + 4 === unitlist.length ? (
                <RightArrowCircleDisabled
                  width={getHp(26)}
                  height={getHp(26)}
                />
              ) : (
                <RightArrowCircle width={getHp(26)} height={getHp(26)} />
              )}
            </TouchableOpacity>
          )}
        </View>
      )}
    </View>
  );
};

Pagination.propTypes = {
  testID: PropTypes.string,
  paginateOptions: PropTypes.array,
  selectedGroup: PropTypes.string,
  callback: PropTypes.func,
};

Pagination.defaultProps = {
  testID: 'Pagination'
};

export default Pagination;
