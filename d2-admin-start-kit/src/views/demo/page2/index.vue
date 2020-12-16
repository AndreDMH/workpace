<template>
  <d2-container>
    <div>
      <el-form> 
        <el-form-item label="是否配置分成">
          <el-button size="mini" type="primary" >是</el-button>
          <el-button size="mini" type="primary">否</el-button>
        </el-form-item>
        <el-form-item label="分成方式">
          <el-select v-model="form.region" placeholder="请选择分成方式">
            <el-option label="入口uv结算" value="uv" ></el-option>
            <el-option label="总体收益分成结算" value="shouyi" ></el-option>
            <el-option label="广告主节点结算" value="ad" ></el-option>
          </el-select> 
        </el-form-item>
      </el-form>
    </div>
  </d2-container>
</template>

<script>
export default {
  data(){
    return{
      form:{
        region:""
      }
    }
  }
  }
</script>
<style scoped>
  
</style>
