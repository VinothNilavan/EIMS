import React, { Fragment } from 'react';
import { View, StyleSheet } from 'react-native';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scrollview';
import { getHp, getWp } from '@utils';
import { Logo, Done } from '@images';
import { COLORS, TEXTFONTSIZE } from '@constants';
import { SourceSansProBoldTextView, SourceSansProRegTextView, CustomButton } from '@components';

import { useAuth } from '@hooks';

const ExploreMindsparkScreen = (props) => {
    const { params } = props.route;
    const { onTokenHandshake } = useAuth('text');

    const exploreAction = () => {
        if (params.eisecretKey) {
            onTokenHandshake(params.eisecretKey);
        }
    };

    return (
        <Fragment>
            <KeyboardAwareScrollView
                keyboardShouldPersistTaps="always"
                keyboardDismissMode="on-drag"
                style={{ backgroundColor: 'white' }}>
                <View style={styles.screen}>
                    <View style={styles.logoContainer}>
                        <Logo width={styles.logo.width} height={styles.logo.height} />
                    </View>
                    <SourceSansProBoldTextView testID="createAccountText" style={styles.heading}>
                        Account created successfully
                    </SourceSansProBoldTextView>
                    <Done />

                    <SourceSansProRegTextView style={styles.instructionStyle}>
                        {`Enjoy your free access to Mindspark. To enable all features, please purchase the full version.`}
                    </SourceSansProRegTextView>

                    <View style={styles.btnContainer}>
                        <CustomButton
                            disabled={false}
                            testId={"exploreButton"}
                            onSubmit={exploreAction}
                            btnText={"Explore Mindspark"}
                        />
                    </View>
                </View>
            </KeyboardAwareScrollView>
        </Fragment>
    );
};

const styles = StyleSheet.create({
    screen: {
        padding: getWp(30),
        alignItems: 'center'
    },
    logoContainer: {
        alignSelf: 'center',
        marginTop: getHp(20),
        width: getWp(190),
        height: getHp(110),
    },
    logo: {
        width: '100%',
        height: '100%',
    },
    heading: {
        fontSize: TEXTFONTSIZE.Text28,
        color: COLORS.subtitleDarkBlue,
        marginBottom: getHp(30),
        marginTop: getHp(50),
        textAlign: 'center',
    },
    btnContainer: {
        marginTop: getHp(200),
        width: '100%'
    },
    instructionStyle: {
        textAlign: 'center',
        marginTop: getHp(30),
        fontSize: TEXTFONTSIZE.Text18,
        color: COLORS.sortListSeparateColor,
        marginHorizontal: getWp(16)
    },
});

export default ExploreMindsparkScreen;