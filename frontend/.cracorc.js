const path = require('node:path');
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
    alias: {
      '@/router/switch': path.resolve(__dirname, 'src/router/SEPSwitch'),
      '@/menu/entries': path.resolve(__dirname, 'src/components/Menu/SEPMenuEntries'),
      '@/pages/Scanner': path.resolve(__dirname, 'src/pages/Scanner/SEPScannerWrapper'),
    },
  },
};
