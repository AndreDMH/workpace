<template>
  <div id="app">
    <!-- <img src="./assets/logo.png"> -->
    <!-- <router-view/> -->
    <!-- <router-view></router-view> -->
    <!-- <HelloWorld></HelloWorld> -->
    <Test></Test>
    <imgOne></imgOne>
    <imgTwo></imgTwo>
  </div>
</template>

<script>
import HelloWorld from "@/components/HelloWorld"
import Test from '@/components/Test'
import imgOne from '@/components/imgOne'
import imgTwo from '@/components/imgTwo'
export default {
  data(){
    return{}
  },
  components:{HelloWorld,Test,imgOne,imgTwo}
}
</script>
  
<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  /* margin-top: 60px; */
}
</style>
