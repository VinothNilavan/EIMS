import React from 'react';
import PropTypes from 'prop-types';
import { Platform } from 'react-native';
import { QnAHeader, WorksheetQnAHeader, Header, LoginHeader } from '@components';
import { HeaderType } from '../../utils/helper';

const CommonHeader = props => {
  const {
    type,
    onClick,
    title,
    desc,
    theme,
    secondaryBtnPressed,
    enableSecondaryBtn,
    containerStyle,
    customTitleStyle,
    onPressBtn,
    permissions,
    onPaginationItemPressed,
    hideLogo,
    sparkieCount,
    showCollapsible,
    helpBtnEnabled,
    fromSkillQna,
    iconStyle,
    hideBackButton,
    helpNeedEnable,
    isNewFlow,
    testID,
    lottieFileName,
    fromHome,
    headerType = HeaderType.base,
    fromSubscription,
  } = props;

  const getHeader = () => {
    switch (headerType) {
      case HeaderType.qna:
        return (<QnAHeader
          onPressBtn={onPressBtn}
          permissions={permissions}
          sparkieCount={sparkieCount}
          onClick={onClick}
          showCollapsible={showCollapsible}
          helpBtnEnabled={helpBtnEnabled}
          fromSkillQna={fromSkillQna}
        />)
      case HeaderType.worksheet:
        return (<WorksheetQnAHeader
          testID="WorksheetQnAHeaderHomeworkQnA"
          onPressBtn={onPressBtn}
          onPaginationItemPressed={onPaginationItemPressed}
          permissions={permissions}
        />)
      case HeaderType.login:
        return (<LoginHeader
          testID={testID}
          theme={'generic'}
          lottieFileName={lottieFileName}
          helpNeedEnable={helpNeedEnable}
          containerStyle={containerStyle}
          iconStyle={iconStyle}
          hideBackButton={hideBackButton}
          isNewFlow={isNewFlow}
          fromSubscription={fromSubscription}
        />)
      default:
        return (<Header
          testID="HeaderDetailsScreen"
          type={type}
          customTitleStyle={customTitleStyle}
          onClick={onClick}
          title={title}
          desc={desc}
          theme={theme}
          fromHome={fromHome}
          containerStyle={Platform.OS === 'ios' ? "" :  {marginTop : -16}}
          secondaryBtnPressed={secondaryBtnPressed}
          enableSecondaryBtn={enableSecondaryBtn}
          hideLogo={hideLogo}
        />)
    }
  }

  return (headerType && getHeader())
};

CommonHeader.propTypes = {
  onClick: PropTypes.func,
  type: PropTypes.string,
  title: PropTypes.string,
  containerStyle: PropTypes.object,
};

CommonHeader.defaultProps = {
  onClick: () => { console.log(`default onClick `) },
  title: null,
  hideEILogo: false,
  containerStyle: { flex: 0.15 },
};

export default CommonHeader;


