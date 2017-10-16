import {resolve} from "path";
import webpack from "webpack";
import ExtractTextPlugin from "extract-text-webpack-plugin";
import HtmlWebpackPlugin from "html-webpack-plugin";
const getCoreConfig = () => ({
	entry: {
		dependencies: ["react", "react-dom", "react-router-dom", "redux", "react-redux", "react-router-redux", "classnames", "querystring", "isomorphic-fetch"],
		index: "./"
	},
	output: {
		filename: "[name].js"
	},
	module: {
		rules: [
			{
				test: /\.jsx?$/,
				exclude: [
					resolve(__dirname, "./node_modules")
				],
				use: "babel-loader"
			},
			{
				test: /\.styl$/,
				include: [
					resolve(__dirname, "./styles"),
					resolve(__dirname, "./components")
				],
				use: ExtractTextPlugin.extract({
					fallback: "style-loader",
					use: ["css-loader", "stylus-loader"]
				})
			}
		]
	},
	resolve: {
		extensions: [".js", ".jsx", ".styl"]
	},
	plugins: [
		new webpack.optimize.CommonsChunkPlugin({
			name: "dependencies"
		}),
		new ExtractTextPlugin("index.css")
	]
});
const {NODE_ENV} = process.env;
let config;
if(NODE_ENV === "development"){
	config = getCoreConfig();
	Object.assign(config.output, {
		path: resolve(__dirname, "../../statics_dev/punchy"),
		publicPath: "/punchy/"
	});
	config.plugins.push(new webpack.DefinePlugin({
		process: {
			env: {
				NODE_ENV: JSON.stringify("development")
			}
		}
	}));
	// config.output.path = resolve(__dirname, "./statics/");
	// config.module.rules.push({
	// 	test: /\.html$/,
	// 	use: ["html-loader"]
	// });
	// config.plugins.push(new HtmlWebpackPlugin({
	// 	template: "./template.html"
	// }), new webpack.HotModuleReplacementPlugin);
	// config.devServer = {
	// 	historyApiFallback: {
	// 		rewrites: [
	// 			{
	// 				from: /^[^.]+$/,
	// 				to: "/index.html"
	// 			},
	// 			{
	// 				from: /(\/[^/]+)(\.[jc]ss?)$/,
	// 				to({match}){
	// 					return `${match[1]}${match[2]}`;
	// 				}
	// 			}
	// 		]
	// 	},
	// 	port: 5501,
	// 	hot: true,
	// 	contentBase: resolve(__dirname, "../../statics")
	// };
	config.watch = true;
}
if(NODE_ENV === "production"){
	config = getCoreConfig();
	Object.assign(config.output, {
		path: resolve(__dirname, "../../statics/punchy"),
		publicPath: "/punchy/"
	});
	config.module.rules[1].use = ExtractTextPlugin.extract({
		fallback: "style-loader",
		use: [
			{
				loader: "css-loader",
				options: {
					minimize: true
				}
			},
			"stylus-loader"
		]
	});
	config.plugins.push(new webpack.DefinePlugin({
		process: {
			env: {
				NODE_ENV: JSON.stringify("production")
			}
		}
	}), new webpack.optimize.UglifyJsPlugin);
}
export default config;