module.exports = function (api) {
  api.cache(true);
  return {
    // presets: ['babel-preset-expo', 'module:react-native-dotenv'],
    presets: ["@babel/preset-react", "module:metro-react-native-babel-preset"],
    plugins: [
      // ['module:react-native-dotenv', {
      //   "moduleName": "@env",
      //   "path": ".env",
      //   "safe": true
      // }],
      ['@babel/plugin-proposal-class-properties', {"loose": true}],
      ['module-resolver', {
        root: ['./src'],
        alias: {
          'components': './src/components',
          'hooks': './src/hooks',
          'screens': './src/screens',
          'styles': './src/styles',
          'utils': './src/utils',
          'strings': './src/strings',
          'services': './src/services'
        },
      }],
    ],
  };
};