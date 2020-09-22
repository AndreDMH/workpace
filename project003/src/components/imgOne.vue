<template>
  <div>
    <h3>在assets文件夹下通过相对路径引入图片</h3>
    <span>
      <img :src="imgUrl" alt="">  
    </span>
  </div>
</template>

<script>
export default {
  data(){
    return{
      //当在assets文件夹下引入图片时，必须要使用 require 关键字来引用，因为assets是属于webpack打包工具中的文件夹，会改变图片本来的路径，如果
      //不使用require的话，将会引入成字符串
      imgUrl:require('../assets/images/1.jpg')
    }
  }
}
</script>