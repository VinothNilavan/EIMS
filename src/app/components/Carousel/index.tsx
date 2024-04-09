import React, { useEffect } from 'react';
import { View } from 'react-native';
import CustomCarousel, { Pagination } from 'react-native-snap-carousel';
import styles from './indexCss';
import PropTypes from 'prop-types';

const Carousel = props => {
  const {
    testID,
    data,
    renderFunc,
    getRef,
    currItemIndex,
    onSlide,
    carouselContainerStyle,
  } = props;
  let carouselRef = null;

  useEffect(() => {
    getRef(carouselRef);
  }, []);
  
  return (
    <View accessible={true} testID={testID} accessibilityLabel={testID}>
      <CustomCarousel
        accessible={true}
        testID="CarouselCustomCarousel"
        accessibilityLabel="CarouselCustomCarousel"
        ref={c => (carouselRef = c)}
        data={data}
        renderItem={renderFunc}
        sliderWidth={styles.carousel.width}
        itemWidth={styles.carousel.width}
        containerCustomStyle={{ ...styles.slider, ...carouselContainerStyle }}
        contentContainerCustomStyle={styles.sliderContentContainer}
        loop={true}
        autoplay={false}
        autoplayDelay={0}
        autoplayInterval={0}
        onSnapToItem={index => onSlide(index)}
        sliderHeight={styles.sliderHeight}
      />
      <Pagination
        accessible={true}
        testID="CarouselPagination"
        accessibilityLabel="CarouselPagination"
        dotsLength={data.length}
        activeDotIndex={currItemIndex}
        containerStyle={styles.paginationContainer}
        dotColor="#00A4EB"
        dotStyle={styles.paginationDot}
        inactiveDotColor="#C1EBFF"
        inactiveDotOpacity={1}
        inactiveDotScale={0.8}
      />
    </View>
  );
};

Carousel.propTypes = {
  testID: PropTypes.string,
};

Carousel.defaultProps = {
  testID: 'Carousel',
};

export default Carousel;
