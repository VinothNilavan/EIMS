import { getDeviceType, getSystemVersion, getManufacturer, getModel, supportedAbisSync, getVersion } from 'react-native-device-info';
import { PixelRatio } from 'react-native';
import 'react-native-get-random-values';
import { heightPercentageToDP as hp, widthPercentageToDP as wp } from 'react-native-responsive-screen';
import { Platform } from 'react-native';
import { Config } from 'react-native-config';
const moment = require('moment');

const getDeviceDetails = async () => {
  let obj = {};

  const device_category = 'N';
  const device_type = getDeviceType();
  const device_os = Platform.OS;
  const device_os_version = getSystemVersion();
  const device_make = await getManufacturer();
  const device_model = getModel();
  const deviceScreenSize = hp('100') + 'x' + wp('100');
  const deviceDPI = PixelRatio.get() * 160 + 'dpi';
  const deviceNativePlatform = supportedAbisSync().join(',');
  const app_install_time = moment().format();
  const appVersion = getVersion();

  obj = {
    deviceCategory: device_category,
    deviceType: device_type,
    deviceOs: device_os,
    deviceOsVersion: device_os_version,
    deviceMake: device_make,
    deviceModel: device_model,
    deviceScreenSize: deviceScreenSize,
    deviceDPI,
    deviceNativePlatform,
    appInstallTime: app_install_time,
    VersionCode: appVersion,
    VersionName: Config.FIX_VERSION,
    app_type: 'edicine',
  };

  return obj;
};

export default getDeviceDetails;
