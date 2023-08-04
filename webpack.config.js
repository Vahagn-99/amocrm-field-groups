const path = require('path');
const { VueLoaderPlugin } = require('vue-loader');
const WebpackShellPluginNext = require('webpack-shell-plugin-next');
const TerserPlugin = require('terser-webpack-plugin');

module.exports = (env, argv) => {
    const isProductionMode = argv.mode === 'production';

    return {
        entry: ['./src/widget.js'],
        mode: isProductionMode ? 'production' : 'development',
        devtool: isProductionMode ? 'source-map' : 'eval-source-map',
        output: {
            path: path.resolve(__dirname, './dist'),
            publicPath: '/',
            filename: 'app.js',
            libraryTarget: 'amd',
        },
        module: {
            rules: [
                {
                    test: /\.js$/,
                    exclude: /node_modules/,
                    use: {
                        loader: 'babel-loader',
                    },
                },
                {
                    test: /\.vue$/,
                    loader: 'vue-loader',
                    exclude: /node_modules/,
                },
                {
                    test: /\.css$/,
                    use: ['vue-style-loader', 'css-loader', 'postcss-loader'],
                },
            ],
        },
        resolve: {
            extensions: ['.js', '.vue'],
        },
        plugins: [
            new VueLoaderPlugin(),
            new WebpackShellPluginNext({
                onAfterDone: {
                    scripts: isProductionMode ? ['node zipFiles.js'] : [],
                    blocking: true,
                    parallel: false,
                },
            }),
        ],
        optimization: {
            'minimize': true,
            minimizer: [new TerserPlugin({
                terserOptions: {
                    // compress: {
                    //     pure_funcs: [
                    //         'console.log',
                    //         'console.info',
                    //         'console.debug',
                    //         'console.warn',
                    //         'console.error',
                    //     ]
                    // }
                }
            })],
        },
    };
};
