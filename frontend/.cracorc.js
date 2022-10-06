const dotenvCra = require('dotenv-cra');
const FaviconsWebpackPlugin = require('favicons-webpack-plugin');

process.env.NODE_ENV = process.env.NODE_ENV || 'development';
dotenvCra.config();

module.exports = {
  webpack: {
    plugins: [
      new FaviconsWebpackPlugin({
        logo: './public/assets/logo.svg',
        favicons: {
          appName: 'Solvay - Entraide & Publication',
          appShortName: 'SEP',
          appDescription: 'Une application web pour aider à la gestion des ventes du SEP.',
          developerName: 'Mathieu COSYNS',
          developerURL: 'https://github.com/Mathieu-COSYNS/',
          lang: 'fr',
          background: '#f07e38',
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
          screenshots: [
            {
              src: '/assets/screenshots/screenshot_login.png',
              type: 'image/png',
              sizes: '440x804',
            },
            {
              src: '/assets/screenshots/screenshot_menu.png',
              type: 'image/png',
              sizes: '440x804',
            },
            {
              src: '/assets/screenshots/screenshot_sales.png',
              type: 'image/png',
              sizes: '440x804',
            },
          ],
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
