import $ from 'jquery'
import './css/01.css'
import './css/01.less'
import './css/01.scss'

$(function(){
  $('li:odd').css('backgroundColor','pink')
  $('li:even').css('backgroundColor','green')
})

class Person{
  static info = 'aaa'
}
console.log(Person.info)
/**********************************************************/

import Vue from 'vue'
import App from './components/App.vue'
const vm = new Vue ({
  //3.指定vm实例要控制的区域
  el:'#app',
  //4.通过render函数，把指定的组件渲染到el区域中
  render:h=>h(App)
})