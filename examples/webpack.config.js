var webpack = require('webpack');
var path = require('path');

module.exports = {
    devtool: 'source-map',
    entry: './index',
    output: {
        path: __dirname,
        filename: 'bundle.js'
    },
    resolve: {
        extensions: ['*', '.js'],
        modules: ['node_modules'],
    },
    module: {
        loaders: [
            {
                test: /\.js$/,
                //loaders: ['react-hot-loader/webpack', 'babel-loader?presets[]=react'],
                use: [
                    {
                      loader: "react-hot-loader/webpack" // creates style nodes from JS strings
                    },
                    {
                      loader: "babel-loader?presets[]=react" // translates CSS into CommonJS
                    }
                  ],
                exclude: /node_modules/
            },
            {
                test: /\.css$/,
                use: [
                    {
                      loader: "style-loader" // creates style nodes from JS strings
                    },
                    {
                      loader: "css-loader" // translates CSS into CommonJS
                    },
                    {
                      loader: "sass-loader" // compiles Sass to CSS
                    }
                  ]
            },
            {
                test: /\.scss$/,
                use: [
                    {
                      loader: "style-loader" // creates style nodes from JS strings
                    },
                    {
                      loader: "css-loader" // translates CSS into CommonJS
                    },
                    {
                      loader: "sass-loader" // compiles Sass to CSS
                    }
                  ]
            },
            {
                test: /\.less$/,
                use: [
                    {
                      loader: "style-loader" // creates style nodes from JS strings
                    },
                    {
                      loader: "css-loader" // translates CSS into CommonJS
                    },
                    {
                      loader: "less-loader", // compiles Sass to CSS
                      options: {
                        modifyVars: {
                            '@primary-color': '#00ADEF',
                            '@link-color': '#0065CD',
                            '@border-radius-base': '2px',
                            '@font-size-base': '14px',
                            '@line-height-base': '1.2',
                            '@card-actions-background': '#f5f8fa',
                        },
                        javascriptEnabled: true,
                      },
                    }
                ],
            },
            {
                test: /\.woff(2)?(\?v=[0-9]\.[0-9]\.[0-9])?$/,
                loader: "url-loader?limit=10000&minetype=application/font-woff"
            },
            {
                test: /\.(ttf|eot|svg)(\?v=[0-9]\.[0-9]\.[0-9])?$/, loader: "file-loader"
            }

        ]
    },
    plugins: [
        new webpack.NormalModuleReplacementPlugin(
            /^react-awesome-query-builder/, function (data) {
                const suffix = data.request.substring('react-awesome-query-builder'.length);
                data.request = path.resolve(__dirname, '../modules/' + suffix);
            }
        ),
    ]
}