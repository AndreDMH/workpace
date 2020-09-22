import Vue from 'vue'
import Router from 'vue-router'
//import HelloWorld from '@/components/HelloWorld'
import imgOne from '@/components/imgOne'
import imgTwo from '@/components/imgTwo'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path:'/imgOne',
      name:'imgOne',
      component:imgOne
    },
    {
      path:'/imgTwo',
      name:'imgTwo',
      component:imgTwo
    }
  ]
})
