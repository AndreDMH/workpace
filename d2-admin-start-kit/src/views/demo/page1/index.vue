<template>
  <d2-container>
    <div id="application">
      <el-page-header content="歌单"></el-page-header>
      <el-container>
        <el-header>
            <el-input 
              prefix-icon="el-icon-search" 
              placeholder="请输入要查询的关键词" 
              style="width:200px"
              size="mini"
              v-model="searchMusic.keywords">
            </el-input>
            <el-button size="mini" @click="searchMusicInfo()" >搜索</el-button>
        </el-header>
        <el-container>
          <el-aside width="200px">
            <el-menu :default-openeds="['1', '3']">
              <el-submenu index="1">
                <template slot="title"><i class="el-icon-grape"></i>本地音乐</template>
                <el-menu-item-group>
                  <template slot="title">分组一</template>
                  <el-menu-item index="1-1">选项1</el-menu-item>
                  <el-menu-item index="1-2">选项2</el-menu-item>
                </el-menu-item-group>
                <el-menu-item-group title="分组二">
                  <el-menu-item index="1-3">选项3</el-menu-item>
                </el-menu-item-group>
                <el-submenu index="1-4">
                  <template slot="title">选项4</template>
                  <el-menu-item index="1-4-1">选项4-1</el-menu-item>
                </el-submenu>
              </el-submenu>
              <el-submenu index="2">
                <template slot="title"><i class="el-icon-watermelon"></i>下载管理</template>
                <el-menu-item-group>
                  <template slot="title">分组一</template>
                  <el-menu-item index="2-1">选项1</el-menu-item>
                  <el-menu-item index="2-2">选项2</el-menu-item>
                </el-menu-item-group>
                <el-menu-item-group title="分组二">
                  <el-menu-item index="2-3">选项3</el-menu-item>
                </el-menu-item-group>
                <el-submenu index="2-4">
                  <template slot="title">选项4</template>
                  <el-menu-item index="2-4-1">选项4-1</el-menu-item>
                </el-submenu>
              </el-submenu>
              <el-submenu index="3">
                <template slot="title"><i class="el-icon-apple"></i>我的收藏</template>
                <el-menu-item-group>
                  <template slot="title">分组一</template>
                  <el-menu-item index="3-1">选项1</el-menu-item>
                  <el-menu-item index="3-2">选项2</el-menu-item>
                </el-menu-item-group>
                <el-menu-item-group title="分组二">
                  <el-menu-item index="3-3">选项3</el-menu-item>
                </el-menu-item-group>
                <el-submenu index="3-4">
                  <template slot="title">选项4</template>
                  <el-menu-item index="3-4-1">选项4-1</el-menu-item>
                </el-submenu>
              </el-submenu>
            </el-menu>
          </el-aside>
          <el-container>
            <el-main>
              <el-carousel :interval="4000" type="card" height="200px">
                <el-carousel-item v-for="item in 5" :key="item">
                <h3 class="medium">{{ item }}</h3>
                </el-carousel-item>
              </el-carousel>

              <!-- 歌单数据--表格开始 -->
              <div id="music_data">
                <el-table :data="music_info" style="width:100%; line-height:15px" border :header-cell-style="{background:'#f5f5f5'}">
                  <el-table-column
                    align="center"
                    label="标号"
                    prop="number_data"
                    width="150">
                    <template slot-scope="scope">{{scope.row.number_data}}</template>
                  </el-table-column>
                  <el-table-column
                    align="center"
                    label="音乐标题"
                    prop="title_data"
                    width="150">
                    <template slot-scope="scope">{{scope.row.title_data}}</template>
                  </el-table-column>
                  <el-table-column
                    align="center"
                    label="歌手"
                    prop="singer_data"
                    width="150">
                    <template slot-scope="scope">{{scope.row.singer_data}}</template>
                  </el-table-column>
                  <el-table-column
                    align="center"
                    label="专辑"
                    prop="album_data"
                    width="150">
                    <template slot-scope="scope">{{scope.row.album_data}}</template>
                  </el-table-column>
                  <el-table-column
                    align="center"
                    label="时长"
                    prop="time_data"
                    width="150">
                    <template slot-scope="scope">{{scope.row.time_data}}</template>
                  </el-table-column>
                  <el-table-column
                    align="center"
                    label="大小"
                    prop="memory_data"
                    width="150">
                    <template slot-scope="scope">{{scope.row.memory_data}}</template>
                  </el-table-column>
                </el-table>
              </div>
            </el-main>
          </el-container>
        </el-container>
          <el-footer></el-footer>
      </el-container>
    </div> 
  </d2-container>
</template>

<script>
import search from '@/layout/header-aside/mixins/search'
export default {
  data(){
    return{
      searchMusic:{
        keywords:"",
        // limit:"",
        // type:""
      },
      //假数据 音乐信息
      music_info:[{
        number_data:"",
        title_data:"",
        singer_data:"",
        album_data:"",
        time_data:"",
        memory_data:""  
      }]
      // 对数组进行定义
      //music_info:[]
    }
  },
  created(){
    //this.search_info()
  },
  methods:{
    async search_info(){
      let parmas={
        keywords: this.searchMusic.keywords,
        // limit: this.searchMusic.limit,
        // type: this.searchMusic.type
      };
      let url = "http://musicapi.leanapp.cn/search";
      const {data:res} = await this.$http.get(url,parmas);
      console.log(res);

      this.music_info = res.music_info;

      /* const {data:res} = await this.$http.get(
        "http://musicapi.leanapp.cn/search",
        {
          parmas:{
            keywords:this.searchMusic.keywords
          }
        }
      ) */
    },
    searchMusicInfo(){
      this.search_info();
      console.log(this.searchMusic);
    }
  }
}
</script>

<style scoped>
  .el-header, .el-footer {
    background-color: #B3C0D1;
    color: #333;
    text-align: center;
    line-height: 60px;
  }
  .el-aside {
    background-color: #D3DCE6;
    color: #333;
    text-align: center;
    line-height: 200px;
  }
  .el-main {
    background-color: #E9EEF3;
    color: #333;
    text-align: center;
    line-height: 160px;
  }
  .el-carousel__item h3 {
    color: #475669;
    font-size: 14px;
    opacity: 0.75;
    line-height: 200px;
    margin: 0;
  }
  .el-carousel__item:nth-child(2n) {
    background-color: #99a9bf;
  }
  .el-carousel__item:nth-child(2n+1) {
    background-color: #d3dce6;
  }
</style>>
