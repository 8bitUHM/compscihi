const path = require("path");
const fs = require("fs");
const Dotenv = require("dotenv-webpack");

function getEntryPoints(directory) {
  const entries = {};
  const files = fs.readdirSync(directory);
  files.forEach((file) => {
    const filePath = path.join(directory, file);
    let fileName = file.split(".")[0];
    try {
      entries[fileName] = "./" + filePath;
    } catch (e) {
      console.log(e);
    }
  });
  return entries;
}

module.exports = {
  entry: getEntryPoints("./src/pages"),
  output: {
    filename: "[name].js",
    path: path.resolve(__dirname, `../../static/website/dist`),
    assetModuleFilename: "assets/[name][ext][query]",
  },
  resolve: {
    extensions: [".tsx", ".ts", ".js", ".json"],
  },
  module: {
    rules: [
      {
        test: /\.(ts|tsx)$/,
        exclude: /node_modules/,
        use: {
          loader: "ts-loader",
        },
      },
      {
        test: /\.(js|jsx)$/,
        exclude: /node_modules/,
        use: {
          loader: "babel-loader",
          options: {
            presets: ["@babel/preset-env", "@babel/preset-react"],
          },
        },
      },
      {
        test: /\.(png|jpe?g|gif|svg)$/i,
        type: "asset/resource",
      },
      {
        test: /\.(woff(2)?|eot|ttf|otf)$/i,
        type: "asset/resource",
      },
      {
        test: /\.css$/i,
        use: ["style-loader", "css-loader"],
      },
    ],
  },
  plugins: [new Dotenv()],
};
