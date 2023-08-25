const HtmlWebpackPlugin = require("html-webpack-plugin")
const MiniCssExtractPlugin = require("mini-css-extract-plugin")



const path = require("path");
module.exports = {
  entry:"./src/index",
  mode:"development",
  output:{
    path: path.resolve(__dirname,"dist"),
    filename:"[name]-[contenthash:8].js",
    clean:true,// 每次打包都会清除之前的打包文件
    assetModuleFilename:"images/[name][hash:6][ext]"

  },
  devServer:{
    open:true,// 自动打开浏览器
    hot:true
  },
  module:{ 
    rules:[
      {
        test:/\.js$/,
        use:["babel-loader"]
      },
      {
        test:/\.s[ac]ss$/,
        use:[
          // MiniCssExtractPlugin.loader,
          "style-loader",
          "css-loader",
          "postcss-loader",
          "sass-loader"
        ]
      },{
        test:/\.(png|webp|jpg|jpeg|svg)$/i,
        type:"asset",
        parser:{
          dataUrlCondition:{
            maxSize: 10 * 1024
          }
        }
      }
    ]
  },
  plugins:[
    new HtmlWebpackPlugin({
      filename:"index.html",
      template:"./public/index.html",
      chunks:["main"],
    }),
    new MiniCssExtractPlugin(),
  ]
}