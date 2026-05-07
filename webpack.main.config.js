module.exports = {
  entry: './src/main/main.js',
  module: {
    rules: [
      {
        test: /\.node$/,
        use: 'node-loader',
      },
    ],
  },
  externals: {
    'better-sqlite3': 'commonjs better-sqlite3',
  },
  resolve: {
    extensions: ['.js', '.jsx', '.json'],
  },
};
