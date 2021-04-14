<template>
<div>
  <!-- 高级筛选按钮 -->
  <el-button class="filter" @click="drawer = true" type="primary" >高级筛选</el-button>
  <!-- Drawer组件 -->
  <el-drawer
    title="高级筛选"
    :visible.sync="drawer"
    size="40%"
  >
    <div class="drawer__content" style="margin-left:30px">
      <el-form :model="mainForm">
        <el-row>
          <el-col :span="12">
            <el-form-item label="广告平台名称" label-width="100px">
              <el-input style="width:180px" placeholder="请选择"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="状态" label-width="100px" prop="ad_status">
              <el-select style="width:180px" placeholder="请选择状态" v-model="mainForm.ad_status">
                <el-option
                  v-for="(item,index) in status"
                  :key="index"
                  :label="item.label"
                  :value="item.value"
                ></el-option>
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="平台类型" label-width="100px">
              <el-input style="width:180px" placeholder="请选择"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="投放媒体" label-width="100px">
              <el-input style="width:180px" placeholder="请选择"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="负责运营" label-width="100px">
              <el-input style="width:180px" placeholder="请选择"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="负责商务" label-width="100px">
              <el-input style="width:180px" placeholder="请选择"></el-input>
            </el-form-item>
          </el-col>
        </el-row>
      </el-form>
      <div type="flex" style="float:right; margin-top:30px;margin-right:10px ">
        <el-button type="primary">确认筛选</el-button>
        <el-button @click="clearDrawer">取消筛选</el-button>
      </div>
    </div>
  </el-drawer>
  <!-- 表格数据 -->
  <div id="user_data">
        <el-table :data="user_info" style="width: 100%" border :header-cell-style="{background:'#f5f5f5'}" >
          <el-table-column
            align="center"
            prop="ad_code"
            label="广告平台code"           
          >
            <template slot-scope="scope">{{scope.row.ad_code}}</template>
          </el-table-column>
          <el-table-column
            align="center"
            prop="adName_code"
            label="广告平台名称" 
          >
            <template slot-scope="scope">{{scope.row.adName_code}}</template>
          </el-table-column>
          <el-table-column
            align="center"
            prop="ad_status"
            label="状态"
          >
            <template slot-scope="scope">{{scope.row.ad_status}}</template>
          </el-table-column>
          <el-table-column
            align="center"
            prop="operation"
            label="平台类型"
          >
            <template slot-scope="scope">{{scope.row.operation}}</template>
          </el-table-column>
          <el-table-column
            align="center"
            prop="adLaunched"
            label="所在投放"
          >
            <template slot-scope="scope">{{scope.row.adLaunched}}</template>
          </el-table-column>
          <el-table-column
            align="center"
            prop="adLaunched_media"
            label="投放媒体"
          >
            <template slot-scope="scope">{{scope.row.adLaunched_media}}</template>
          </el-table-column>
          <el-table-column
            align="center"
            prop="commercial"
            label="平台商务"
          >
            <template slot-scope="scope">{{scope.row.commercial}}</template>
          </el-table-column>
          <el-table-column
            align="center"
            prop="operation"
            label="平台运营"
          >
            <template slot-scope="scope">{{scope.row.operation}}</template>
          </el-table-column>
          <el-table-column
            align="center"
            prop="start_time"
            label="创建时间"
          >
            <template slot-scope="scope">{{scope.row.start_time}}</template>
          </el-table-column>
          <el-table-column
            align="center"
            prop="modify_time"
            label="最后修改时间"
          >
            <template slot-scope="scope">{{scope.row.modify_time}}</template>
          </el-table-column>
          <el-table-column
            align="center"
            prop="operation"
            label="操作"
          >
            <template slot-scope="scope">{{scope.row.operation}}</template>
          </el-table-column>
        </el-table>
    </div>
</div>    
</template>

<script>
export default {
  data(){
    return{
      mainForm:{
        ad_status:"",
      },
      drawer: false,

      user_info:[{
        ad_code:"11",
        adName_code:"11",
        ad_status:"11",
        adLaunched:"99",
        adLaunched_media:"88",
        commercial:"77",
        operation:"66",
        start_time:"55",
        modify_time:"44",
        operation:"11"
      },
      {
        ad_code:"22",
        adName_code:"22",
        ad_status:"22",
        adLaunched:"99",
        adLaunched_media:"88",
        commercial:"77",
        operation:"66",
        start_time:"55",
        modify_time:"44",
        operation:"22"
      },
      {
        ad_code:"33",
        adName_code:"33",
        ad_status:"33",
        adLaunched:"99",
        adLaunched_media:"88",
        commercial:"77",
        operation:"66",
        start_time:"55",
        modify_time:"44",
        operation:"33"
      },
      {
        ad_code:"33",
        adName_code:"33",
        ad_status:"33",
        adLaunched:"99",
        adLaunched_media:"88",
        commercial:"77",
        operation:"66",
        start_time:"55",
        modify_time:"44",
        operation:"33"
      },
      {
        ad_code:"33",
        adName_code:"33",
        ad_status:"33",
        adLaunched:"99",
        adLaunched_media:"88",
        commercial:"77",
        operation:"66",
        start_time:"55",
        modify_time:"44",
        operation:"33"
      },
      {
        ad_code:"33",
        adName_code:"33",
        ad_status:"33",
        adLaunched:"99",
        adLaunched_media:"88",
        commercial:"77",
        operation:"66",
        start_time:"55",
        modify_time:"44",
        operation:"33"
      },
      {
        ad_code:"33",
        adName_code:"33",
        ad_status:"33",
        adLaunched:"99",
        adLaunched_media:"88",
        commercial:"77",
        operation:"66",
        start_time:"55",
        modify_time:"44",
        operation:"33"
      },
      {
        ad_code:"33",
        adName_code:"33",
        ad_status:"33",
        adLaunched:"99",
        adLaunched_media:"88",
        commercial:"77",
        operation:"66",
        start_time:"55",
        modify_time:"44",
        operation:"33"
      },
      ],
      status:[
        {
          label:"启用",value:"1"
        },
        {
          label:"闲置",value:"2"
        },
        {
          label:"停用",value:"3"
        },
      ]
    }
  },
  methods:{
    clearDrawer(){
      this.drawer = false
    }
  }
}
</script>

<style scoped>
  .filter{
    float: right;
  }
</style>