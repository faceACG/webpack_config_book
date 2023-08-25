import {add} from "./add"
import "./assets/style/style.scss"
import "./assets/style/iconfont.scss"
import img from "./assets/images/截屏2023-08-25 11.04.13.png";
import bigImg from "../../img/截屏2023-08-24 11.22.26.png"


const sun = add(1,2);
const obj = {}
const obProxy = new Proxy(obj,{
  get(){
    return "aaa"
  }
})

window.onload = function(){
  document.body.innerHTML = "hello Webpack!"
  const imgContainer = document.createElement("img");
  imgContainer.setAttribute("src",bigImg)

  // const div = document.createElement("div");
  // const text = document.createTextNode("hello webpack!")
  // div.appendChild(text);
  document.body.appendChild(imgContainer)
}
