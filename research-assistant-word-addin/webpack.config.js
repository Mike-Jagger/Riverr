const HtmlWebpackPlugin = require("html-webpack-plugin");
const CopyWebpackPlugin = require("copy-webpack-plugin");
const path = require("path");

module.exports = {
	entry: "./taskpane.js",
	output: {
		filename: "taskpane.js",
		path: path.resolve(__dirname, "dist"),
		clean: true,
	},
	devServer: {
		static: "./dist",
		port: 3000,
		https: true,
		headers: {
			"Access-Control-Allow-Origin": "*",
		},
	},
	plugins: [
		new HtmlWebpackPlugin({
			template: "./taskpane.html",
			filename: "taskpane.html",
		}),
		new CopyWebpackPlugin({
			patterns: [
				{ from: "taskpane.css", to: "taskpane.css" },
				{ from: "mockData.js", to: "mockData.js" },
				{ from: "manifest.xml", to: "manifest.xml" },
				{ from: "assets", to: "assets", noErrorOnMissing: true },
			],
		}),
	],
	module: {
		rules: [
			{
				test: /\.css$/,
				use: ["style-loader", "css-loader"],
			},
		],
	},
};
