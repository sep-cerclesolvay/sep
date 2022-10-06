const WebpackFavicons = require('webpack-favicons');

module.exports = {
  webpack: {
    plugins: [
      new WebpackFavicons(
        {
          src: './public/assets/logo.svg',
          path: '/assets/favicons/',
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
        },
        (response) => {
          for (file of response.files) {
            if (file.name === 'manifest.json') {
              let json = JSON.parse(file.contents);
              json.screenshots = [
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
              ];
              if (typeof process.env.REACT_APP_QR_CODE_URL != undefined)
                json.url_handlers = [
                  {
                    origin: process.env.REACT_APP_QR_CODE_URL,
                  },
                ];
              file.contents = JSON.stringify(json, '', 2);
            }
          }
        }
      ),
    ],
  },
};
