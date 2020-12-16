<template>
  <d2-container slot="header">
    <template slot="header">
        <div class="flex ryt-right-top">
          <div class="line_header"></div>新建平台
        </div>
    </template>
    <div>基础信息</div>
    <el-form :model="mainForm" label-width="240px">
      <el-form-item label="平台名称：">
        <el-input placeholder="请输入平台名称" style="width:240px" />
      </el-form-item>
      <el-form-item label="code：">
        <el-input placeholder="请输入code" style="width:240px"/>
      </el-form-item>
      <el-form-item label="公司名称：">
        <el-input placeholder="请输入公司名称" style="width:240px"/>
      </el-form-item>
      <el-form-item prop="adCategory" label="平台类别：">
        <el-select style="width:240px" placeholder="请选择平台类别">
          <el-option
            v-for="(item,index) in adCategory"
            :key="index"
            :label="item.label"
            :value="item.value">
          </el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="平台商务：">
        <el-input placeholder="请输入平台商务" style="width:240px"/>
      </el-form-item>
      <el-form-item label="平台运营：">
        <el-input placeholder="请输入平台运营" style="width:240px"/>
      </el-form-item>
    </el-form>
  </d2-container>  
</template>

<script>
export default {
  data(){
    return{
      mainForm:{
        adCategory:""
      },
      adCategory:[
          {label:'类别',value:'1'}
        ]
    }
  }
  
}
</script>

<style scoped>

</style>