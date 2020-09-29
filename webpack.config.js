const path = require('path');
const CopyPlugin = require('copy-webpack-plugin');
const {CleanWebpackPlugin} = require('clean-webpack-plugin');

module.exports = {
  mode: 'development',
  devtool: 'inline-source-map',
  entry: {
    main: './src/ts/main.ts',
  },
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: '[name]-bundle.js',
  },
  resolve: {
    // Add ".ts" and ".tsx" as resolvable extensions.
    extensions: ['.ts', '.tsx', '.js'],
  },
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        use: 'ts-loader',
        exclude: /node_modules/,
      },
    ],
  },
  plugins: [
    new CleanWebpackPlugin(),
    new CopyPlugin({
      patterns: [
        {
          from: './src/html/*',
          to: '.',
          transformPath: p => {
            return p.replace('src\\html\\', '');
          },
        },
      ],
    }),
  ],
};
