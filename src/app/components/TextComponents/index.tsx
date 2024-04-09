import React from 'react';
import { Text } from 'react-native';
import styles from './indexCss';
import PropTypes from 'prop-types';

const SourceSansProRegTextView = props => {
  return (
    <Text
      accessible={true}
      testID={props.testID}
      accessibilityLabel={props.testID}
      numberOfLines={props.numberOfLines}
      allowFontScaling={false}
      style={[styles.SourceSansProRegTextView, styles.TextStyle, props.style]}>
      {props.children}
    </Text>
  );
};

SourceSansProRegTextView.propTypes = {
  testID: PropTypes.string,
};

SourceSansProRegTextView.defaultProps = {
  testID: 'SourceSansProRegTextView',
};

const SourceSansProSemiBoldTextView = props => {
  return (
    <Text
      accessible={true}
      testID={props.testID}
      accessibilityLabel={props.testID}
      allowFontScaling={false}
      style={[styles.SourceSansProBoldTextView, styles.TextStyle, props.style]}>
      {props.children}
    </Text>
  );
};

SourceSansProSemiBoldTextView.propTypes = {
  testID: PropTypes.string,
};

SourceSansProSemiBoldTextView.defaultProps = {
  testID: 'SourceSansProSemiBoldTextView',
};

const SourceSansProBoldTextView = props => {
  return (
    <Text
      accessible={true}
      testID={props.testID}
      accessibilityLabel={props.stestID}
      allowFontScaling={false}
      numberOfLines={props.numberOfLines}
      style={[styles.SourceSansProBoldTextView, styles.TextStyle, props.style]}>
      {props.children}
    </Text>
  );
};

SourceSansProBoldTextView.propTypes = {
  testID: PropTypes.string,
};

SourceSansProBoldTextView.defaultProps = {
  testID: 'SourceSansProBoldTextView',
};

const RobotoRegTextView = props => {
  return (
    <Text
      accessible={true}
      testID={props.testID}
      accessibilityLabel={props.testID}
      allowFontScaling={false}
      numberOfLines={props.numberOfLines}
      style={[styles.RobotoRegTextView, styles.TextStyle, props.style]}>
      {props.children}
    </Text>
  );
};

RobotoRegTextView.propTypes = {
  testID: PropTypes.string,
};

RobotoRegTextView.defaultProps = {
  testID: 'RobotoRegTextView',
};

const RobotoBoldTextView = props => {
  return (
    <Text
      accessible={true}
      testID={props.testID}
      accessibilityLabel={props.testID}
      allowFontScaling={false}
      numberOfLines={props.numberOfLines}
      style={[styles.RobotoBoldTextView, styles.TextStyle, props.style]}>
      {props.children}
    </Text>
  );
};

RobotoBoldTextView.propTypes = {
  testID: PropTypes.string,
};

RobotoBoldTextView.defaultProps = {
  testID: 'RobotoBoldTextView',
};

const RobotoMediumTextView = props => {
  return (
    <Text
      accessible={true}
      testID={props.testID}
      accessibilityLabel={props.testID}
      allowFontScaling={false}
      numberOfLines={props.numberOfLines}
      style={[styles.RobotoMediumTextView, styles.TextStyle, props.style]}>
      {props.children}
    </Text>
  );
};

RobotoMediumTextView.propTypes = {
  testID: PropTypes.string,
};

RobotoMediumTextView.defaultProps = {
  testID: 'RobotoMediumTextView',
};

const BalooThambiRegTextView = props => {
  return (
    <Text
      accessible={true}
      testID={props.testID}
      accessibilityLabel={props.accessibilityLabel}
      numberOfLines={props.numberOfLines}
      allowFontScaling={false}
      style={[styles.BalooThambiRegTextView, styles.TextStyle, props.style]}>
      {props.children}
    </Text>
  );
};

BalooThambiRegTextView.propTypes = {
  testID: PropTypes.string,
};

BalooThambiRegTextView.defaultProps = {
  testID: 'BalooThambiRegTextView',
};

const BalooThambiBoldTextView = props => {
  return (
    <Text
      accessible={true}
      testID={props.testID}
      accessibilityLabel={props.testID}
      numberOfLines={props.numberOfLines}
      allowFontScaling={false}
      style={[styles.BalooThambiBoldTextView, styles.TextStyle, props.style]}>
      {props.children}
    </Text>
  );
};

BalooThambiBoldTextView.propTypes = {
  testID: PropTypes.string,
};

BalooThambiBoldTextView.defaultProps = {
  testID: 'BalooThambiBoldTextView',
};

const BalooThambiMediumTextView = props => {
  return (
    <Text
      accessible={true}
      testID={props.testID}
      accessibilityLabel={props.testID}
      allowFontScaling={false}
      style={[styles.BalooThambiMediumTextView, styles.TextStyle, props.style]}>
      {props.children}
    </Text>
  );
};

BalooThambiMediumTextView.propTypes = {
  testID: PropTypes.string,
};

BalooThambiMediumTextView.defaultProps = {
  testID: 'BalooThambiMediumTextView',
};

export {
  SourceSansProBoldTextView,
  SourceSansProRegTextView,
  RobotoBoldTextView,
  RobotoMediumTextView,
  RobotoRegTextView,
  BalooThambiBoldTextView,
  BalooThambiMediumTextView,
  BalooThambiRegTextView,
  SourceSansProSemiBoldTextView,
};
