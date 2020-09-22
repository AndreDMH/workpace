<template>
  <div>
    <h3>在static文件夹下通过绝对路径引入图片</h3>
    <span>
      <img :src="imgUrl" alt="">
    </span>
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