const HtmlWebpackPlugin = require("html-webpack-plugin")



const path = require("path");
module.exports = {
  entry:"./src/index",
  mode:"development",
  output:{
    path: path.resolve(__dirname,"dist"),
    filename:"[name]-[contenthash:8].js",
    clean:true // 每次打包都会清除之前的打包文件
  },
  plugins:[
    new HtmlWebpackPlugin({
      filename:"index.html",
      template:"./public/index.html",
      chunks:["main"],
    })
  ]
}