const { utils } = require('@react-native-firebase/app');

module.exports = {
  presets: ['module:@react-native/babel-preset'],
  env: {
    production: {
      plugins: ['react-native-paper/babel'],
    },
  },
  plugins: [
    [
      'module-resolver',
      {
        root: ['./'],
        alias: {
          screens: './screens',
          components: './components',
          types: './types',
          hooks: './hooks',
          api: './api',
          store: './store',
          utils: './utils',
        },
      },
    ],
    [
      'module:react-native-dotenv',
      {
        moduleName: '@env',
        path: '.env',
      },
    ],
  ],
};
