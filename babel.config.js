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
          hooks:"./hooks"
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
