const createExpoWebpackConfigAsync = require('@expo/webpack-config');

module.exports = async function (env, argv) {
  const config = await createExpoWebpackConfigAsync(env, argv);

  // Customize the config before returning it.
  // For example, to handle 'import.meta' syntax, you might need to adjust Babel loader.
  // Expo's default config should handle this with babel-preset-expo,
  // but if issues persist, you can add specific rules here.
  config.module.rules.push({
    test: /\.m?js$/,
    resolve: {
      fullySpecified: false,
    },
    use: {
      loader: 'babel-loader',
      options: {
        presets: ['babel-preset-expo'],
        plugins: [
          // Required for Expo Router
          'expo-router/babel',
          // Add this plugin to support import.meta
          '@babel/plugin-syntax-import-meta',
        ],
      },
    },
  });

  // Enable experimental features for import.meta
  config.experiments = {
    topLevelAwait: true,
    // importAsync: true, // This might not be necessary or compatible with all setups
  };

  return config;
};
