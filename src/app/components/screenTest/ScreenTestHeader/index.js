import React from 'react';
import {View, TouchableOpacity} from 'react-native';
import {BalooThambiRegTextView, SVGImageBackground} from '@components';
import PropTypes from 'prop-types';
import styles from './indexCss';
import {useStores} from '@mobx/hooks';
import {getWp} from '@utils';

const ScreenTestHeader = props => {
  const {
    primaryButtonText,
    title,
    secondaryButtonText,
    primaryButtonPressed,
    secondaryButtonPressed,
    primaryButtonStyle,
    secondaryButtonStyle,
  } = props;

  const {uiStore} = useStores();
  const isRTL = uiStore.isRTL;

  return (
    <View style={styles.container}>
      <SVGImageBackground SvgImage="bgHeader" themeBased>
        <View
          style={isRTL ? styles.RTLHeaderContainer : styles.headerContainer}>
          <BalooThambiRegTextView style={styles.titleText}>
            {title}
          </BalooThambiRegTextView>
          {primaryButtonText !== '' && (
            <TouchableOpacity
              onPressIn={primaryButtonPressed}
              style={[
                styles.closeButtonContainer,
                {
                  marginRight: isRTL ? getWp(30) : getWp(0),
                  marginLeft: !isRTL ? getWp(30) : getWp(0),
                },
                primaryButtonStyle,
              ]}>
              <BalooThambiRegTextView style={styles.buttonText}>
                {primaryButtonText}
              </BalooThambiRegTextView>
            </TouchableOpacity>
          )}
          {secondaryButtonText !== '' && (
            <TouchableOpacity
              onPress={secondaryButtonPressed}
              style={[styles.secondarButtonContainer, secondaryButtonStyle]}>
              <BalooThambiRegTextView style={styles.buttonText}>
                {secondaryButtonText}
              </BalooThambiRegTextView>
            </TouchableOpacity>
          )}
        </View>
      </SVGImageBackground>
    </View>
  );
};

ScreenTestHeader.propTypes = {
  primaryButtonText: PropTypes.string,
  title: PropTypes.string,
  secondaryButtonText: PropTypes.string,
  primaryButtonStyle: PropTypes.any,
  secondaryButtonStyle: PropTypes.any,
  primaryButtonPressed: PropTypes.func,
  secondaryButtonPressed: PropTypes.func,
};

ScreenTestHeader.defaultProps = {
  title: 'Screening Test',
  primaryButtonText: '',
  secondaryButtonText: '',
  primaryButtonPressed: () => { console.log('button pressed'); },
  secondaryButtonPressed: () => { console.log('secondaryButtonPressed'); }
};

export default ScreenTestHeader;
