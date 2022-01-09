const path = require("path");

module.exports = {
  module: {
    rules: [
      {
        test: /\.scss$/,
        loaders: ["style-loader", "css-loader", "sass-loader"],
      },
      {
        test:/\.ttf$/,
        use: [
          {
              loader: 'file-loader',
              query: {
                name: '[name].[ext]'
              }
          }
        ],
        include: path.resolve(__dirname, '../')
      }
    ],
  },
};