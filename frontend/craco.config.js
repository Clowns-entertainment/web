const CracoAlias = require('craco-alias');

process.env.BROWSER = 'none'; // prevent to open browser on start command

module.exports = {
  plugins: [
    {
      plugin: CracoAlias,
      options: {
        source: 'tsconfig',
        baseUrl: './src',
        tsConfigPath: './tsconfig.paths.json',
      },
    },
  ],
  babel: {
    plugins: [
      [
        'react-intl',
        {
          idInterpolationPattern: '[sha512:contenthash:base64:6]',
          extractFromFormatMessageCall: true,
          ast: true,
        },
      ],
    ],
  },
};
