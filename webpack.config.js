var webpack = require('webpack');

var plugins = [
    new webpack.DefinePlugin({
        'process.env.NODE_ENV': JSON.stringify(process.env.NODE_ENV)
    })
];

if (process.env.COMPRESS) {
    plugins.push(
        new webpack.optimize.UglifyJsPlugin({
            output: {
                comments: false
            },
            compressor: {
                screw_ie8: true,
                warnings: false
            }
        })
    );
}

module.exports = {
    entry: './index',
    output: {
        library: 'ReactQueryBuilder',
        libraryTarget: 'umd'
    },
    externals: [{
        react: {
            root: 'React',
            commonjs2: 'react',
            commonjs: 'react',
            amd: 'react'
        },
        immutable: {
            root: 'Immutable',
            commonjs2: 'immutable',
            commonjs: 'immutable',
            amd: 'immutable'
        }
    }],
    module: {
        rules: [
            {
                test: /\.jsx?$/,
                loaders: ['babel-loader'],
                exclude: /node_modules/
            },
            {
                test: /\.css$/,
                loader: "style-loader"
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
        ],
    },
    resolve: {
        extensions: ['*', '.js'],
        modules: [
            'node_modules',
            __dirname,
            __dirname + '/node_modules',
        ],
        alias: {
            'ReactQueryBuilder': __dirname + 'modules/',
            'immutable': 'immutable'
        }
    },
    node: {
        Buffer: false
    },
    plugins: plugins
};