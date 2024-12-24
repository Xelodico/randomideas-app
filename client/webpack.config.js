// Importing necessary modules for Webpack
const path = require("path"); // Node.js module to work with file and directory paths
const HtmlWebpackPlugin = require("html-webpack-plugin"); // Plugin to generate the HTML file automatically
const MiniCssExtractPlugin = require("mini-css-extract-plugin"); // Plugin to extract CSS into separate files

// Webpack configuration object
const config = {
  mode: "production", // Set Webpack mode to 'production' for optimizations like minification

  // Entry: The main file where the bundling process starts
  entry: "./src/index.js", // Entry point for the application

  // Output: Specifies the location and name of the bundled files
  output: {
    path: path.resolve(__dirname, "../public"), // Absolute path to the 'public' directory for output
    filename: "bundle.js", // Name of the bundled JavaScript file
  },

  // Development server configuration for live reloading and development utilities
  devServer: {
    static: { directory: path.resolve(__dirname, "../public") }, // Serve files from the 'public' directory
    port: 3000, // Port number for the development server
    open: true, // Automatically open the browser when the server starts
    hot: true, // Enable hot module replacement (updates modules without a full page reload)
    compress: true, // Enable gzip compression for faster file serving
    historyApiFallback: true, // Redirect 404s to 'index.html' (useful for Single Page Applications)
    proxy: {
      "/api": "http://localhost:5000", // Forward `/api` requests to a backend server running on port 5000
    },
  },

  // Module rules for processing different types of files
  module: {
    rules: [
      // Rule for handling CSS files
      {
        test: /\.css$/, // Match all `.css` files
        use: [
          MiniCssExtractPlugin.loader, // Extracts CSS into separate files
          "css-loader", // Resolves `@import` and `url()` in CSS files
        ],
      },
      // Rule for transpiling JavaScript files with Babel
      {
        test: /\.js$/, // Match all `.js` files
        exclude: /node_modules/, // Exclude files in the `node_modules` directory
        use: {
          loader: "babel-loader", // Use Babel to transpile JavaScript
          options: {
            presets: ["@babel/preset-env"], // Compile modern JavaScript (ES6+) down to ES5 for compatibility
          },
        },
      },
    ],
  },

  // Plugins for enhancing the build process
  plugins: [
    // Generates an HTML file that includes references to the bundled JavaScript and CSS files
    new HtmlWebpackPlugin({
      title: "Webpack App", // Title of the generated HTML file
      filename: "index.html", // Output file name in the 'public' directory
      template: "./src/index.html", // Use the specified HTML template from the 'src' directory
    }),

    // Extracts CSS into separate files instead of inline <style> tags
    new MiniCssExtractPlugin(), // Generates a CSS file for the bundled CSS
  ],
};

// Export the Webpack configuration object
module.exports = config;
