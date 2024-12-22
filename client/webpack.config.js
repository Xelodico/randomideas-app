// Importing necessary modules
const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin"); // Automatically generates the HTML file
const MiniCssExtractPlugin = require("mini-css-extract-plugin"); // Extracts CSS into separate files

// Webpack configuration object
const config = {
  // Setting the mode to 'development' for better debugging and readable output
  mode: "development",

  // Entry point: where the bundling process starts (main JS file)
  entry: "./src/index.js",

  // Output: where the bundled files will be saved
  output: {
    path: path.resolve(__dirname, "../public"), // Output directory is 'public'
    filename: "bundle.js", // Name of the output JS bundle
  },

  // Configuration for webpack-dev-server to enable live reloading and development features
  devServer: {
    // Serve content from the 'public' directory
    static: { directory: path.resolve(__dirname, "../public") },
    port: 3000, // The port on which the dev server will run
    open: true, // Automatically open the browser after server starts
    hot: true, // Enable hot module replacement without a full reload
    compress: true, // Enable gzip compression for everything served
    historyApiFallback: true, // Fallback to index.html for Single Page Applications (SPA)
  },

  // Module configuration for handling different file types
  module: {
    // Rules for different types of modules
    rules: [
      // Rule for handling CSS files
      {
        test: /\.css$/, // Target all .css files
        use: [MiniCssExtractPlugin.loader, "css-loader"], // Use MiniCssExtractPlugin to extract CSS, and 'css-loader' to resolve CSS imports
      },
      // Rule for handling JavaScript files with Babel
      {
        test: /\.js$/, // Target all .js files
        exclude: /node_modules/, // Exclude 'node_modules' from being processed
        use: {
          loader: "babel-loader", // Use Babel to transpile modern JavaScript to older versions for better browser support
          options: {
            presets: ["@babel/preset-env"], // Babel preset to compile ES6+ down to ES5
          },
        },
      },
    ],
  },

  // Plugins used in the build process
  plugins: [
    // Automatically generates an HTML file that includes the bundled JavaScript and CSS
    new HtmlWebpackPlugin({
      title: "Webpack App", // Title of the generated HTML page
      filename: "index.html", // Output HTML file name
      template: "./src/index.html", // Use a template HTML file from the 'src' directory
    }),

    // Extracts CSS into a separate file instead of inline style tags
    new MiniCssExtractPlugin(),
  ],
};

// Export the config object for Webpack to use
module.exports = config;
