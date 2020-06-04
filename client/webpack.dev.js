const merge = require('webpack-merge');
const common = require('./webpack.common.js');
const FriendlyErrorsWebpackPlugin = require('friendly-errors-webpack-plugin');
const notifier = require('node-notifier');

module.exports = merge(common, {
  mode: 'development',
  plugins: [
    new FriendlyErrorsWebpackPlugin({
      onErrors: (severity, errors) => {
        const severityIcon =
          {
            warning: '⚠️',
            error: '💢',
          }[severity] || `[${severity.toUpperCase()}]`;

        notifier.notify({
          title: `${severityIcon}`,
          message: `Webpack detected the project has ${errors.length} ${severity.toUpperCase()}(s)`,
          wait: true,
        });
      },
    }),
  ],
});
