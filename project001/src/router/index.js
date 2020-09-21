import Vue from 'vue'
import Router from 'vue-router'
//import HelloWorld from '@/components/HelloWorld'
import Test from '@/components/Test'
import imgOne from '@/components/imgOne'
import imgTwo from '@/components/imgTwo'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path:'/',
      name:'Test',
      component:Test
    },
    {
      path:'/',
      name:'imgOne',
      component:imgOne
    },
    {
      path:'/',
      name:"imgTwo",
      component:imgTwo
    }
  ]
})
