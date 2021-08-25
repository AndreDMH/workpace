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