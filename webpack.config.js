const ph = require("path");

const {CleanWebpackPlugin} = require("clean-webpack-plugin");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const CopyWebpackPlugin = require("copy-webpack-plugin");

module.exports = {
    mode: "development",
    devtool: "inline-source-map",
    context: __dirname,
    resolve: {
        extensions: [".js", ".ts"]
    },
    devServer: {
        contentBase: "./dist",
        index: "index.html",
        openPage: "",
        inline: true,
        historyApiFallback: true,
        hot: false,
        hotOnly: false,
        open: true,
        proxy: {
            "/proxy":
                {
                    target: "https://cnodejs.org/",
                    secure: false,
                    pathRewrite: {"^/proxy": ""},
                    changeOrigin: true,
                    cookieDomainRewrite: ".cnodejs.org"
                }
        }
    },
    optimization: {
        splitChunks: {
            chunks: "async",
            minSize: 30000,
            maxSize: 0,
            minChunks: 1,
            maxAsyncRequests: 6,
            maxInitialRequests: 4,
            automaticNameDelimiter: "~",
            cacheGroups: {
                vendors: {
                    test: /[\\/]node_modules[\\/]/,
                    priority: -10
                },
                default: {
                    minChunks: 2,
                    priority: -20,
                    reuseExistingChunk: true
                }
            }
        }
    },
    entry: {
        "index": "./src/index.ts"
    },
    output: {
        filename: "js/[name].bundle.js",
        path: ph.resolve(__dirname, "dist"),
        publicPath: "/"
    },
    externals: {},
    module: {
        rules: [
            {
                test: /^(?!.*\.module).*\.css$/,
                exclude: /(node_modules|bower_components)/,
                loader: "style-loader!css-loader"
            },
            {
                test: /^(.*\.module).css$/,
                exclude: /(node_modules|bower_components)/,
                use: [
                    "style-loader",
                    {
                        loader: "css-loader",
                        options: {
                            modules: {
                                localIdentName: "[name]-[hash:base64:6]"
                            }
                        }
                    }
                ]
            },
            {
                test: /.js$/,
                exclude: /(node_modules|bower_components)/,
                loader: "babel-loader"
            },
            {
                test: /\.ts$/,
                exclude: /(node_modules|bower_components)/,
                loader: "babel-loader!ts-loader"
            },
            {
                test: /\.(png|jpe?g|gif|svg)(\?.*)?$/,
                exclude: /(node_modules|bower_components)/,
                use: [{
                    loader: "url-loader",
                    options: {
                        limit: 8192,
                        fallback: "file-loader",
                        name: "media/images/[name].[hash:7].[ext]",
                        publicPath: "/",
                        esModule: false
                    }
                }]
            }
        ]
    },
    plugins: [
        new CleanWebpackPlugin(),
        new CopyWebpackPlugin({
            patterns: [
                {
                    from: __dirname + "/public",
                    to: __dirname + "/dist",
                    globOptions: {
                        ignore: [".*"]
                    }
                }
            ]
        }),
        new HtmlWebpackPlugin({
            title: "Motion App",
            keywords: "",
            description: "",
            iconPath: "/favicon.ico",
            style: "",
            hash: false,
            filename: "index.html",
            template: "./draft/motion.html",
            inject: true,
            minify: {
                removeComments: true,
                collapseWhitespace: true,
                minifyCSS: true
            },
            chunks: ["vendors", "default", "index"]
        })
    ]
};
