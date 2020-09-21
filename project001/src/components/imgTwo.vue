<template>
  <div>
  <h2>在assets文件夹下通过相对路径引入图片</h2>  
  <h3>在JS中引用</h3>
    <img :src="imgUrl" alt="" style="width:500px;height:500px">
  </div>  
</template>

<script>
export default {
  data(){
    return{
      imgUrl:require('../assets/images/1.jpg')
    }
  }
}
</script>

<style scoped>

</style>