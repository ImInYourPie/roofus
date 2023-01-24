/* eslint-disable comma-dangle */
const path = require("path");
const nodeExternals = require("webpack-node-externals");

module.exports = {
  entry: "./index.ts",
  mode: "development",
  target: "node",
  output: {
    path: path.resolve(__dirname, "dist"),
    filename: "bundle.js",
  },
  externals: [
    nodeExternals({
      modulesDir: path.resolve(__dirname, "../node_modules"),
    }),
    nodeExternals(),
  ],
  resolve: {
    extensions: [".ts", ".js"],
    alias: {
      deps: path.resolve(__dirname, "src/infrastructure/server"),
      domain: path.resolve(__dirname, "src/domain"),
      application: path.resolve(__dirname, "src/application"),
      config: path.resolve(__dirname, "src/config"),
      interfaces: path.resolve(__dirname, "src/domain/interfaces"),
      entities: path.resolve(__dirname, "src/domain/entities"),
      infrastructure: path.resolve(__dirname, "src/infrastructure"),
      libs: path.resolve(__dirname, "src/libs"),
      presentation: path.resolve(__dirname, "src/presentation"),
    },
  },
  module: {
    rules: [
      {
        test: /\.ts$/,
        use: "ts-loader",
        exclude: /node_modules/,
      },
    ],
  },
};
