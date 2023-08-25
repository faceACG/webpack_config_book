## 基本搭建
- 入口文件配置
- html 图片,css,字体,以及其他资源打包
- babel的配置
- vue 文件的打包
- 路径别名的配置
- webpack-dev-server 的配置
- 环境区分
- 环境变量的设置

## 基本优化
- 构建速度的优化
- 体检的优化
- 用户体检的优化
  - 构建进度条的显示
  - source-map的配置


## 基本规范
- eslint
- premitter
- husky
- stylelint

## 项目初始化
1. 安装需要使用到的webpack相关的包
```
  // 1. 自定义安装
  yarn add webpack webpack-cli webpack-dev-server -D
  // 2. 使用webpack-cli 安装
  npx webpack-cli -init
```
2. 在目录下创建相应的文件夹和文件以及webpack的配置 webpack.config.js 文件
```javascript
//src/index.js
import {add} from "./add.js"

const sum add(2,3)
window.onload = ()=>{
  document.body.innerHtml("hello webpack!")
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

```
### 其他资源加载(loader)
#### babel-loader (处理js代码将es6高级语法转换成es5)
1. 下载相应的包
``` shell

yarn add @babel/core babel-loader @babel/preset-env @babel/plugin-transform-runtime -D

```
2. 创建.babelrc 文件 配置babel规则
```
{
  "presets":[
    ["@babel/preset-env",{
      "module":false // 默认都是支持CommonJs
    }],
    // 需要转换其他的语法,例如使用react 项目 需要使用到@babel/preset-react 安装后在使用即可
  ],
  plugins:[
    "@babel/plugin-transform-runtime" //自动转换Es6 api 
  ]
}

```
3. 配置babel-loader
``` javascript

module.exports = {
  ...
  module:{
    rules:[
      {
        test:/\.js$/,
        use:"babel-loader"
      }
    ]
  }
}

```
#### css-loader style-loader sass-loader postcss-loader (处理sass以及css样式)
1. 安装相应的包
```shell
yarn add sass sass-loader css-loader style-loader postcss-loader autoprefixer -D
```
2. 配置postcss.config.js
``` javascript
module.exports = {
  plugins:[['autoprefixer']]
}
```
3. 配置相关的loader
``` javascript
module.exports = {
  ...
  module:{
    rules:[
      {
        test:/\.s[ac]ss$/,
        use:[
          "style-loader",
          "css-loader",
          "postcss-loader",
          "sass-loader"
        ]
      }
    ]
  }
}
```

#### 图片资源加载(需要压缩)
> webpack4 是使用url-loader 和file-loader 进行资源加载,现在webpack5 集成了这类资源的加载
1. 配置loader
```javascript
 module.exports = {
  ...
  module:{
    rules:[
      test:/\.(jpg|jpeg|gif|png|webp|svg)$/i,
      use:"asset",
      parser:{
        // 转换base64的条件
        dataUrlCondition:{
          maxSize: 10 * 1024
        }
      }
    ]
  }
 }
 ```
 #### 其他静态资源加载(字体... 不需要压缩)
 1. 配置loader
 ``` javascript
 module.exports = {
  ... 
  module:{
    rules:[
      ...
      {
        test: /\.(woff|woff2|eot|ttf|otf)$/i,
        type:"asset/resource"
      }
    ]
  }
 }
 ```
 #### vue-loader的使用 
 > @vue/babe-preset-jsx 当项目中有使用到jsx语法使用
 1. 安装依赖
 ```shell
 yarn add vue vue-loader vue-template-compiler 
 @vue/babe-preset-jsx 
 -D
```
2. (可选) 当项目中使用了jsx 语法需要配置.babelrc
```
{
  "preset":[
    ["@babel/preset-env",{
      "module":false
    }],
    // 支持vue中的jsx语法
    "@vue/babel-preset-jsx"
  ]
}

```
3. 配置loader
```javascript
const {vueLoaderPlugin} = require("vue-loader")
module.exports = {
  ...
  module:{
    rules:[
      {
        test:/\.vue$/,
        use:"vue-loader"
      }
    ]
  },
  plugins:[
    new vueLoaderPlugin()
  ]
}


