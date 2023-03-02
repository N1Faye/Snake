//引入一个包
const path = require('path')
//引入html插件
const HTMLWebpackPlugin = require('html-webpack-plugin')
//引入clean插件
const { CleanWebpackPlugin } = require('clean-webpack-plugin')
module.exports = {
    entry: "./src/index.ts", //入口文件
    output: { //打包后文件输出
        path: path.resolve(__dirname, 'dist'), //打包文件输出地址
        filename: 'bundle.js', //打包后文件输出名
        environment: {
            arrowFunction: false //告诉webpack不使用箭头函数 因为webpack打包成一个立即执行函数（箭头） ie不支持箭头函数
        }
    },
    mode: 'development',
    module: { //指定webpack打包时使用模块
        rules: [  //加载规则
            //设置ts文件
            {
                test: /\.ts$/, //指定文件类型
                use: [
                    //配置babel
                    {
                        loader: 'babel-loader', //指定加载器
                        options: {
                            //设置预定义环境
                            presets: [
                                [
                                    //指定环境插件
                                    '@babel/preset-env',
                                    //配置信息
                                    {
                                        //要兼容的目标浏览器
                                        targets: {
                                            "chrome": "88"
                                        },
                                        //指定corejs版本
                                        "corejs": "3",
                                        //使用corejs的方式 usage 按需加载
                                        "useBuiltIns": "usage"
                                    }

                                ]
                            ]
                        }
                    },
                    'ts-loader'], //指定使用的加载器 有先后顺序,从右到左执行
                exclude: /node-modules/  //指定排除的文件
            },
            //设置less文件
            {
                test: /\.less$/,
                use: [
                    "style-loader",
                    "css-loader",
                    //引入postcss
                    {
                        loader: 'postcss-loader',
                        options: {
                            postcssOptions: {
                                plugins: [
                                    [
                                        "postcss-preset-env",
                                        {
                                            browswes: 'last 2 versions'
                                        }
                                    ]
                                ]
                            }
                        }
                    },
                    "less-loader",
                ]
            }
        ]
    },
    plugins: [ //配置Webpack插件
        new CleanWebpackPlugin(),
        new HTMLWebpackPlugin({
            template: "./src/index.html" //模板网页
        })
    ],
    resolve: { //设置引用模块
        extensions: ['.ts', '.js']
    }
}


