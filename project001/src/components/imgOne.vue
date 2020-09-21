<template>
  <div>
    <h2>在static文件夹下通过绝对路径的方式引用图片</h2>
    <h3>直接引用</h3>
    <img src="/static/images/1.jpg" alt="" style="width:500px;height:500px">
    <h3>在CSS中引用</h3>
    <div class="bg"></div>
    <h3>在JS中引用</h3>
    <img :src="imgUrl" alt="" style="width:500px;height:500px">
  </div>
</template>

<script>
export default {
  data(){
    return{
      imgUrl:'/static/images/1.jpg'
    }
  }
}
</script>

<style scoped>
  .bg{
    width: 500px;
    height: 500px;
    background:url('/static/images/1.jpg');
    margin: auto;
  }
</style>
  