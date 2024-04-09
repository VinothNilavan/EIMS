import React, { useState, useEffect, Fragment } from 'react';
import { StyleSheet, FlatList, View, Text } from 'react-native';
import { getWp, getHp } from '@utils';
import { COLORS } from '@constants';

const NewClassify = React.forwardRef(({ data }, ref) => {

  const [dragContainer, setDragContainer] = useState([]);

  useEffect(() => {
    setDragContainer(data);
  }, [dragContainer]);

  const renderItem = ({ item, drag }: any) => {
    return (
      <View style={styles.elevatedContainer}>
        <Text>{item.value}</Text>
      </View>
    );
  };

  const keyExtractor = (item) => item.id;

  return (
    <Fragment>
      <View style={styles.column}>
        <FlatList
          data={dragContainer}
          renderItem={renderItem}
          keyExtractor={keyExtractor}
          numColumns={2}
        />
      </View>
    </Fragment>
  );
},
);

const styles = StyleSheet.create({

  separateView: {
    height: getWp(0.5),
    width: getWp(390),
    marginTop: getWp(10),
    backgroundColor: COLORS.sortListSeparateColor,
  },

  container: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  column: {
    flex: 1,
    marginHorizontal: 5,
    marginVertical: 10,
    // maxHeight: '80%',
  },
  elevatedContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    width: getWp(145),
    minHeight: getHp(60),
    backgroundColor: COLORS.sortListQuestionBackgroundColor,
    borderWidth: getWp(2),
    borderRadius: getWp(5),
    borderColor: COLORS.dotLineColor,
    borderStyle: 'dotted',
    padding: 10,
    marginVertical: 4,
    marginHorizontal: 8,
  },

  item: {
    backgroundColor: COLORS.sortListQuestionNormalBackgroundColor,
    justifyContent: 'center',
    padding: 10,
    marginVertical: 4,
    marginHorizontal: 8,
    height: 50,
    width: 100
  },
});

export default NewClassify;
