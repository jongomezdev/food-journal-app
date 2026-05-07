module.exports = [
  {
    test: /\.jsx?$/,
    use: {
      loader: 'babel-loader',
      options: {
        exclude: /node_modules/,
        presets: ['@babel/preset-react']
      }
    }
  },
  {
    test: /\.(png|jpg|jpeg|gif|svg)$/,
    type: 'asset/resource',
  },
];
