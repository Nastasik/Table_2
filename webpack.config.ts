import { resolve as _resolve} from 'path';
import HtmlWebpackPlugin from 'html-webpack-plugin';
import path from 'path';

export type BuildMode = 'production' | 'development';

export interface BuildEnv {
    mode: BuildMode;
    port: number;
}
const PATH_SRC = _resolve(__dirname, 'src');

export default (env: BuildEnv) => {
    const PORT = env?.port || 3000;
    const mode = env?.mode || 'development';
    const isDev = mode === 'development'
    return {
        mode,
        entry: './src/index.tsx',
        module: {
                rules: [
                    {
                        test: /\.(tsx|ts)?$/,
                        use: 'ts-loader',
                        exclude: /node_modules/,
                    },
                    {
                        test: /\.s[ac]ss$/i,
                        use: [
                            'style-loader',
                            {
                                loader: 'css-loader',
                                options: {
                                    modules: {
                                        auto: (resPath: string) => Boolean(resPath.includes('.module.')),
                                        localIdentName: isDev ? '[path][name]__[local]--[hash:base64:5]' : '[hash:base64:8]',
                                    },
                                },
                            },
                            'sass-loader',
                        ],
                        exclude: /node_modules/,
                    },
                    {
                        test: /\.css$/,
                        use: [ 'style-loader', 'css-loader' ]
                     },
                     {
                        test: /\.svg$/,
                        use: ['@svgr/webpack'],
                    },
                    {
                        test: /\.(png|jpe?g|gif|woff2|woff)$/i,
                        use: [
                            {
                                loader: 'file-loader',
                            },
                        ],
                    }
                ],
            },
        resolve: {
            extensions: ['.tsx', '.ts', '.js'],
            alias: {
                '@app': `${PATH_SRC}/app`,
                '@pages': `${PATH_SRC}/pages`,
                '@widgets': `${PATH_SRC}/widgets`,
                '@features': `${PATH_SRC}/features`,
                '@entities': `${PATH_SRC}/entities`,
                '@shared': `${PATH_SRC}/shared`,
            },
        },
        output: {
            filename: 'bundle.js',
            path: _resolve(__dirname, 'dist'),
        },
        devServer: {
            port: PORT,
            open: true, 
            historyApiFallback: true,
            hot: true,
        },
        plugins: [
            new HtmlWebpackPlugin({
                template: path.resolve(__dirname, 'public', 'index.html'),
            })
        ]
    }
}
