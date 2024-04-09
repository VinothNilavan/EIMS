module.exports = {
  presets: [['module:@react-native/babel-preset', {
    unstable_disableES6Transforms: true
  }]],  
  plugins: [[
    "module-resolver",
        {
          root: ["./"],
          alias: {
            "*": "./src/app/*",
            "@hooks": "./src/app/hooks",
            "@components": "./src/app/components",
            "@utils": "./src/app/utils",
            "@hoc": "./src/app/hoc",
            "@contexts": "./src/app/contexts",
            "@api": "./src/app/api",
            "@constants": "./src/app/constants",
            "@navigation": "./src/app/navigation",
            "@mobx/hooks": "./src/app/mobx/hooks",
            "@screens": "./src/app/screens",
            "@lottie": "./src/app/assets/lottie",
            "@genericLottie": "./src/app/assets/lottie/generic",
            "@oceanLottie": "./src/app/assets/lottie/ocean",
            "@sound": "./src/app/assets/sound",
            "@themeSvgs": "./src/app/assets/theme",
            "@oceanSvg": "./src/app/assets/theme/ocean",
            "@images": "./src/app/assets/images",
            "@helpers": "./src/app/helpers",
          },
        }],
    [
      require('@babel/plugin-proposal-decorators').default,
      {
        legacy: true,
      },
    ],
    //['transform-remove-console'],
  ]
};