import React, { useImperativeHandle, useRef } from 'react';
import { View, FlatList, ImageBackground } from 'react-native';
import styles from './style';
import ClassificationButton from '../ClassificationButton';
import { SourceSansProBoldTextView } from '@components';

const ClassificationBucket = React.forwardRef( ( {
      containerType,
      data,
      callbackForResetComponent,
      containerLabel,
      disableClick,
      withoutWebView,
    },
    ref,
  ) => {
    const myComponentRef = useRef();
    useImperativeHandle(ref, () => ({
      scrollToFlatList() {
        setTimeout(() => {
          myComponentRef.current.scrollToEnd();
        }, 50);
      },
    }));

    const containerLabelText =
      containerLabel && containerLabel !== ''
        ? containerLabel.split('<')[0]
        : '';
    const backgroundImage = require('../../../../assets/images/box.png');

    return (
      <View style={styles.mainContainer}>
        <View style={styles.titleTextContainer}>
          <SourceSansProBoldTextView style={styles.titleText}>
            {containerLabelText}
          </SourceSansProBoldTextView>
        </View>
        <ImageBackground
          source={backgroundImage}
          style={styles.bucketContainer}>
          <FlatList
            nestedScrollEnabled
            onScrollEndDrag={() => console.log('end')}
            onScrollBeginDrag={() => console.log('start')}
            showsVerticalScrollIndicator={false}
            style={styles.bucketChildContainer}
            ref={myComponentRef}
            inverted={true}
            data={data}
            listKey={item => item.identifier}
            renderItem={({ item }) => {
              return (
                <ClassificationButton
                  item={item}
                  containerType={containerType}
                  disableClick={disableClick}
                  callBack={callbackForResetComponent}
                  withoutWebView={withoutWebView}
                />
              );
            }}
          />
        </ImageBackground>
      </View>
    );
  },
);

export default ClassificationBucket;
