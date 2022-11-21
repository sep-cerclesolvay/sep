const dotenvCra = require('dotenv-cra');
const FaviconsWebpackPlugin = require('favicons-webpack-plugin');
const config = require('./app.config.json');

process.env.NODE_ENV = process.env.NODE_ENV || 'development';
dotenvCra.config();

process.env.REACT_APP_NAME = process.env.REACT_APP_NAME || config.appName;
process.env.REACT_APP_SHORT_NAME = process.env.REACT_APP_SHORT_NAME || config.appShortName;
process.env.REACT_APP_DESCRIPTION = process.env.REACT_APP_DESCRIPTION || config.appDescription;
process.env.REACT_APP_LOGO = process.env.REACT_APP_LOGO || config.logo;
process.env.REACT_APP_LOGO_BACKGROUND_COLOR = process.env.REACT_APP_LOGO_BACKGROUND_COLOR || config.logoBackgroundColor;
process.env.REACT_APP_QR_CODE_URL = process.env.REACT_APP_QR_CODE_URL || config.qrCodeUrl;

module.exports = {
  webpack: {
    plugins: [
      new FaviconsWebpackPlugin({
        logo: process.env.REACT_APP_LOGO,
        prefix: 'assets/favicons/',
        favicons: {
          appName: process.env.REACT_APP_NAME,
          appShortName: process.env.REACT_APP_SHORT_NAME,
          appDescription: process.env.REACT_APP_DESCRIPTION,
          lang: 'fr',
          background: process.env.REACT_APP_LOGO_BACKGROUND_COLOR,
          theme_color: '#3880ff',
          appleStatusBarStyle: 'black',
          display: 'standalone',
          orientation: 'portrait',
          scope: '/',
          start_url: '/',
          version: process.env.REACT_APP_VERSION,
          logging: true,
          icons: {
            android: true,
            appleIcon: true,
            appleStartup: true,
            favicons: true,
            windows: true,
            yandex: true,
          },
          files: {
            android: {
              manifestFileName: 'manifest.json',
            },
          },
        },
        manifest: {
          screenshots: config.screenshots,
          url_handlers: [
            {
              origin: process.env.REACT_APP_QR_CODE_URL,
            },
          ],
        },
      }),
    ],
  },
};
