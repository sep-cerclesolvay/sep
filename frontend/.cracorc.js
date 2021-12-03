const CopyPlugin = require('copy-webpack-plugin');

module.exports = {
  webpack: {
    plugins: [
      new CopyPlugin({
        patterns: [
          {
            from: 'public/manifest.json',
            transform(content) {
              return content.toString().replace(/%\w+%/g, (m) => process.env[m.slice(1, m.length - 1)]);
            },
          },
        ],
      }),
    ],
  },
};
