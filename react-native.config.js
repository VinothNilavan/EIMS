module.exports = {
  dependencies: {
    'react-native-video': {
      platforms: {
        android: {
          sourceDir: '../node_modules/react-native-video/android',
        },
      },
    },
    'react-native-vector-icons': {
      platforms: {
        ios: null,
      },
    },
  },
  assets: ['./src/app/assets/fonts/'],
  project: {
    ios: {
      automaticPodsInstallation: true
    }
  }
};