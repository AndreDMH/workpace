<template>
  <d2-container>
    <template slot="header">
        <div class="flex ryt-right-top">
          <div class="line_header"></div>广告位分成
        </div>
    </template>
    <div class="shareAdsense" >
      <el-form :model="mainForm" :rules="rytproject" ref="mainForm" size="mini">
        <el-form-item label="是否配置分成：" prop="split_account_limit" label-width="150px" >
          <el-radio-group v-model="mainForm.split_account_limit" size="medium" style="margin-left:30px">
           <el-radio-button :label="0">否</el-radio-button>
           <el-radio-button :label="1">是</el-radio-button>
          </el-radio-group>
        </el-form-item>
        <el-form-item label="分成比例：" prop="split_account_value" label-width="150px" v-if="mainForm.split_account_limit=='1'" >
          <el-input
            v-model="mainForm.split_account_value"
            style="width:222px"
          ></el-input>%
        </el-form-item>
      </el-form>
      <div style="text-align: center; margin-top: 80px;" type="flex">
        <el-button type="primary" size="medium" @click="submitForm" >提交</el-button>
         <el-button size="medium" @click="cancel">取消</el-button>
      </div>
    </div>
  </d2-container>
</template>

<script>
export default {
  data(){
    return{
      mainForm:{
        split_account_limit:"0",
        split_account_value:""
      },
      rytproject:{
        split_account_limit:[
          { required:true,message:"请选择",trigger:"blur" },
          {pattern:/^100$|^(\d|[1-9]\d)(\.\d{1,3})*$/,message:"只能输入1-100以内的数字，最多保留三位小数"}
        ],
        split_account_value:[
          {required:true,message:"分成比例不能为空",trigger:"blur"},
          {pattern:/^100$|^(\d|[1-9]\d)(\.\d{1,3})*$/,message:"只能输入1-100以内的数字，最多保留三位小数"}
        ],
      },
    }
  },
  created(){
    this.getOneAdsense()
  },
  methods:{
    //获取广告位结算信息
    async getOneAdsense(){
      const { data:res } = await this.$http.get(this.baseUrl.ip1+`/sourceSys/mediaPosition/edit/${this.$route.query.id}`)
      var list = res
        this.mainForm.split_account_limit = list.split_account_limit
        this.mainForm.split_account_value = list.split_account_value
    },
    //广告位新增编辑
    async getmediaDivided(){
      let params = {};
      params.position_id_arr = [this.$route.query.id]
      params.split_account_limit = this.mainForm.split_account_limit
      params.split_account_value = this.mainForm.split_account_value
      let url = this.baseUrl.ip1 +`/sourceSys/mediaPosition/setSplitAccount`
      const response = await this.$http.post(url,params);
      if(response.code ==200 ){
        this.$router.go(-1);
        this.$message.success('提交成功')
      }
    },
    //信息提交
    submitForm(){
      console.log("提交的数据为：",this.mainForm);
      this.$refs.mainForm.validate((valid)=>{
        if(valid) {
          this.getmediaDivided();
        }else{
          this.$message({
            type: 'info',
            message: '您有未填写的信息，请检查'
          });
        }
      }) 
    },
    //取消返回前一界面
    cancel(){
      this.$router.go(-1);
    },
  }
}
</script>

<style scoped>

</style>