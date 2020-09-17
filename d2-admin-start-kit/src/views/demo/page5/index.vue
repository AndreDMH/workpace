<template>
  <d2-container>
    <template slot="header">网站的头部</template>
      <div>
        <legend>简易视频网站</legend>
        <!-- <header id="header"></header>
        <nav id="nav"></nav>
        <section id="section"></section>
        <footer id="footer"></footer> -->

        <div id="header">
          <span>
            <a href="#">电影</a>
            <a href="#">电视剧</a>
            <a href="#">动漫</a>
            <a href="#">短视频</a>
            <a href="#">游戏视频</a>
            <a href="#">纪录片</a>
            <a href="#">中央频道</a>
          </span>
        </div>
        <div id="sec">
          <tr>
            <td><img src=""></td>
            <td></td>
            <td></td>
            <td></td>
            <td></td>
            <td></td>
          </tr>
          <tr>
            <td></td>
            <td></td>
            <td></td>
            <td></td>
            <td></td>
            <td></td>
          </tr>
          <tr>
            <td></td>
            <td></td>
            <td></td>
            <td></td>
            <td></td>
            <td></td>
          </tr>
        </div>
        <div id="footer">
          
        </div>
      </div>
    <template slot="footer">网站的尾部</template>
  </d2-container>
</template>

<script>
export default {
  name: 'page5'
}
</script>
<style scoped>
  #header{
    width: 885.2px;
    height: 20px;
    background-color:rgb(170, 225, 247);
    text-align: center;
  }
  a{
    margin: 20px;
  }
  #sec{
    width: 883.2px;
    height: 480px;
    border: ridge 1px palevioletred;
  } 
  #footer{
    width: 885.2px;
    height: 30px;
    background-color: rgb(170, 225, 247);
  }
  td{
    height: 160px;
    width: 200px;
    border: ridge paleturquoise 1px;
  }
</style>>