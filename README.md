## 基本搭建
- 入口文件配置
- html 图片,css 打包
- babel的配置
- vue 文件的打包
- 路径别名的配置
- webpack-dev-server 的配置
- 环境区分
- 环境变量的设置
- source-map的配置
- 构建进度条的显示

## 基本优化
- 构建速度的优化
- 体检的优化
- 用户体检的优化

## 基本规范
- eslint
- premitter
- husky
- stylelint

### 项目初始化
1. 安装需要使用到的webpack相关的包
```
  yarn add webpack webpack-cli webpack-dev-server -D
```
2. 在目录下创建相应的文件夹和文件以及webpack的配置 webpack.config.js 文件
```javascript
//src/index.js
import {add} from "./add.js"

const sum add(2,3)
window.onload = ()=>{
  document.write("hello webpack!");
  console.log(sum)
}

// src/add.js
export function add(a,b){
  return a + b
}

//webpack.config.js
const path = require("path");
module.exports = {
  entry:"./src/index",
  mode:"development",
  output:{
    filename:"[name][contenthash:6].js",
    path:path.resolve(__dirname,"dist"),
    clean:true, //每次打包都会清除之前打包的文件
  }
}
```
3. 命令行执行 webpack 命令,后在html文件中引入打包后的js 文件

![打包过程](./img//截屏2023-08-24%2011.22.26.png)

4. html 自动加载打包后的js 代码 (使用html-webpack-plugin)

``` javascript

// shell 
yarn add html-webpack-plugin -D
// webpack.config.js
const HtmlWebpackPlugin = require("html-webpack-plugin");
module.exports = {
  ...
  plugins:[
    new htmlWebpackPlugin({
      filename:"index.html",  //打包生成的文件名
      template:"./public/index.html",
      chunks:["main"],// 指定html要引入的chunk 
    }),
  ]
}

