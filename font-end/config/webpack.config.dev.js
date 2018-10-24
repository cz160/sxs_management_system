const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');

module.exports = {
    //配置是开发还是生产（开发是不压缩）
    mode:'development',
    //入口
    entry: {
        //main: ['./src/javascripts/app','./src/javascripts/login']
        app:'./src/javascripts/app',
        login:'./src/javascripts/login'
    },
    //出口
    output:{
        filename :'[name].js',
        //路径以配置文件为基准
        path:path.resolve(__dirname,'../dev')
    },
    //配置热更新服务器
    devServer:{
        //让服务器从这两个目录中响应资源
        contentBase:path.join(__dirname,'../dev'),
        compress: true,
        port: 9000,
        //代理服务器解决跨域问题
        proxy:{
            '/api':{
                target:"http://localhost:3000",
                changeOrigin: true
            }
        }
    },
    plugins:[
        //使用 HtmlWebpackPlugin插件生成一个HTML5文件，其中包括script 标签的 body 中的所有 webpack 包
        new HtmlWebpackPlugin({
            //使用自己的模版
            template: './src/index.html',
            filename:'index.html',
            chunks: ['app']
        }),
        new HtmlWebpackPlugin({
            //使用自己的模版
            template: './src/login.html',
            filename:'login.html',
            //规定其只引入哪个Js
            chunks: ['login']
        }),
        //使用copy-webpack-plugin插件处理静态资源文件
        new CopyWebpackPlugin([{
            from:path.resolve(__dirname,'../static'),
            to:path.resolve(__dirname,'../dev/static')
        }])
    ],
    //使用loader 让 webpack 能够去处理那些非 JavaScript 文件（webpack 自身只理解 JavaScript）
    module:{
        rules:[ // 可以设置模块的规则来为这些模块使用loader
            //处理scss和css文件
            {
                test:/\.(css|scss)$/,
                use:[
                    {loader:'style-loader'}, //可以将js中的css代码放入到style标签中去
                    {loader:'css-loader'}, //可以将引入到js中的css模块中的代码放入到js中 
                    { loader: 'sass-loader' } //可以将sass代码编译成css代码    
                ]
            },
            //将html页面转为字符串
            {
                test: /\.html$/,
                use: [ // loader从后向前使用
                    { loader: 'string-loader' }                
                ]
            },
            //处理小图片
            {
                test:/\.(png|jpg|gif)$/,
                use:[
                    {
                        loader:'url-loader',
                        options: {
                            limit: 81920
                        }
                    }
                ]
            },
            //处理js文件（高版本转换低版本）
            {
                test:/\.js$/,
                exclude: /(node_modules|bower_components)/,
                use:[
                    {
                        loader: 'babel-loader',
                        options: {
                            presets: ['@babel/preset-env'],
                            plugins: ['@babel/plugin-transform-runtime']
                        }
                    }
                ]
            }
        ]
    }


    //单入口 单出口模式  ：entry：入口文件的路径 string, output:输出指定名字
    //多入口 单出口模式  ：entry:[入口文件的路径...]（array） output:输出指定名字
    //多入口 多出口模式  ：entry:{name1:'',name2:['','']}(onject) output:不能指定名字['name].js
}