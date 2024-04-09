// External Import
import React, { useState, useEffect } from 'react';
import { View } from 'react-native';
import { useStores } from '@mobx/hooks';
import { screenLogging } from '@utils';
// Internal Import
import { SearchInput, PreviewFilterDropdown, RoundedButton, SVGImageBackground, DashboardFooter, CommonHeader } from '@components';
import styles from './style';
import { getAsValue, getWp, getHp } from '@utils';
import { API } from '@api';
import { ApiEndPoint, ScreenNames } from '@constants';

const PreviewQuestionSearchScreen = props => {
  const store = useStores();
  const [qcode, setQCode] = useState(null);
  const [categories, setCategories] = useState([]);
  const [contexts, setContext] = useState([]);
  const [products, setProducts] = useState([]);
  const [selectedCategory, setSelectedCategry] = useState(null);
  const [selectedContext, setSelectedContext] = useState(null);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const { appStore } = useStores();
  const { uiStore } = useStores();

  useEffect(() => {
    screenLogging('Preview screen', appStore?.userData);
    fetchContentPreviewFilter();
  }, []);

  const headerBtnClickHandler = () => {
    props.navigation.navigate(ScreenNames.DashboardScreen);
  };

  const fetchContentPreviewFilter = async () => {
    const reqBody = {
      jwt: await getAsValue('jwt'),
      store: store,
    };

    try {
      const response = await API(ApiEndPoint.GET_CONTENT_PREVIEW_FILTERS, reqBody);
      if (response.data.resultCode === 'C001') {
        const categoryResponse = response?.data?.data?.category;
        setCategories(filterPreviewItems(categoryResponse));

        const contextResponse = response?.data?.data?.context;
        setContext(filterPreviewItems(contextResponse));

        const productResponse = response?.data?.data?.product;
        setProducts(filterPreviewItems(productResponse));
      } else {
        if (response.status && response.data?.resultMessage && response.data?.resultMessage != "") {
          store.uiStore.apiErrorInit({ code: response.status, message: response.data?.resultMessage });
        }
      }
    }
    catch (error) {
      console.log('error in preview screen');
    }
  };

  const filterPreviewItems = item => {
    let filteredArray = [];
    if (item !== null) {
      const keys = Object.keys(item);
      filteredArray = keys.map(key => {
        let jsonObject = {};
        jsonObject.type = key;
        jsonObject.value = item[key];
        return jsonObject;
      });
    }
    return filteredArray;
  };

  const footerOnPress = () => {
    props.navigation.navigate(ScreenNames.ProfileScreen);
  }

  const onSearchBtnPressed = () => {
    const params = {
      qcode: qcode,
      context: selectedContext?.type,
      category: selectedCategory?.type,
      PID: selectedProduct?.type,
    };

    props.navigation.navigate(ScreenNames.PreviewQnAScreen, { data: params });
  };

  return (
    <SVGImageBackground testID="SVGImageBackgroundListingDashboard" SvgImage="bgDashboard" themeBased screenBg>
      <CommonHeader testID="HeaderListing" type={"home"} onClick={headerBtnClickHandler} headerBtnType="home" />
      <View style={styles.container}>
        <SearchInput
          testID="SearchInputQuestionSearch"
          onChangeText={val => {
            setQCode(val.replace(/[^0-9]/g, ''));
          }}
          placeholder=" QCode "
          value={qcode}
          keyboardType="numeric"
          maxLength={10}
          containerStyle={styles.searchContainer}
        />
        <PreviewFilterDropdown
          testID="PreviewFilterDropdownPreviewQuestionSearchCategory"
          items={categories}
          onSelect={setSelectedCategry}
          placeholder="Category"
        />
        <PreviewFilterDropdown
          testID="PreviewFilterDropdownPreviewQuestionSearchContext"
          items={contexts}
          onSelect={setSelectedContext}
          placeholder="Context"
        />
        <PreviewFilterDropdown
          testID="PreviewFilterDropdownPreviewQuestionSearchProduct"
          items={products}
          onSelect={setSelectedProduct}
          placeholder="Product"
        />
        {qcode && selectedCategory && selectedContext && selectedProduct ? (
          <RoundedButton
            testID="RoundedButtonPreviewQuestionSearchPreviewEnabled"
            type="elevatedOrange"
            text="Preview"
            textStyle={styles.buttonTextstyle}
            containerStyle={styles.roundButtonContainerStyle}
            width={getWp(300)}
            height={getHp(60)}
            onPress={onSearchBtnPressed}
          />
        ) : (
          <RoundedButton
            testID="RoundedButtonPreviewQuestionSearchPreviewDisabled"
            type="disabledGray"
            text="Preview"
            textStyle={styles.buttonTextstyle}
            containerStyle={styles.roundButtonContainerStyle}
            width={getWp(300)}
            height={getHp(50)}
            disabled={true}
          />
        )}
      </View>
      <DashboardFooter
        footerOnPress={footerOnPress}
        permissions={Object.keys(uiStore.menuDataPermissions).length > 0 ? uiStore.menuDataPermissions.home : {}}
      />
    </SVGImageBackground>

  );
};

PreviewQuestionSearchScreen.propTypes = {};

PreviewQuestionSearchScreen.defaultProps = {};

export default PreviewQuestionSearchScreen;
