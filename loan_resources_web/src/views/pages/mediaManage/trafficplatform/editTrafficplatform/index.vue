<template>
  <div class="editTrafficplatformList">
    <d2-container>
      <template slot="header">
        <div class="flex ryt-right-top">
          <div class="line_header"></div>新建流量平台
        </div>
      </template>
      <div class="editTrafficplatformList_title" style="margin-left:20px">
        <div class="formTitle">基础信息</div>
      </div>
      <div class="platformInfo">
        <el-form :model="mainForm" ref="mainForm" :rules="rytproject"  label-width="240px">
          <el-form-item label="平台名称：" prop="media_platform_name">
          <el-input placeholder="请输入平台名称" style="width:240px" v-model="mainForm.media_platform_name" />
        </el-form-item>
        <el-form-item label="公司名称：" prop="company_name">
          <el-input placeholder="请输入公司名称" style="width:240px" v-model="mainForm.company_name" />
        </el-form-item>
        <el-form-item label="运营：" prop="operation_id">
          <el-select placeholder="请选择" style="width:240px" filterable v-model="mainForm.operation_id">
            <el-option
              v-for="(item,index) in operation"
              :key="index"
              :label="item.operation_name"
              :value="item.operation_id"
            ></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="市场：" prop="business_id">
          <el-select placeholder="请选择" style="width:240px" filterable v-model="mainForm.business_id">
            <el-option
              v-for="(item,index) in business"
              :key="index"
              :label="item.business_name"
              :value="item.business_id"
            ></el-option>
          </el-select>
        </el-form-item>
        </el-form>
        <div style="text-align: center; margin-top: 80px;" type="flex" v-if="!isEdit">
          <el-button type="primary" size="medium" @click="submitRule('form')" >提交</el-button>
          <el-button size="medium" @click="cancel">取消</el-button>
        </div>
        <div style="text-align: center; margin-top: 80px;" type="flex" v-else>
          <el-button type="primary" size="medium" @click="submitRule('edit')" >保存</el-button>
          <el-button size="medium" @click="cancel">取消</el-button>
        </div>
      </div>
    </d2-container>
  </div>
</template>

<script>
export default {
  data(){
    return{
      isEdit: false,
      mainForm:{
        media_platform_name:"",
        company_name:"",
        operation_id:"",
        business_id:""
      },
        business:[],
        operation:[],
      rytproject:{
        media_platform_name:[
          {required:true,message:"流量平台名称不能为空",trigger:"blur"}
        ],
        company_name:[
          {required:true,message:"公司名称不能为空",trigger:"blur"}
        ],
        business_id:[
          {required:true,message:"请选择平台商务",trigger:"blur"}
        ],
        operation_id:[
          {required:true,message:"请选择平台运营",trigger:"blur"}
        ]
      }
    }
  },
  created(){
    this.isEdit = this.$route.query.id ? true : false
    this.getOperation();
    this.getBusiness();
    this.isEdit && this.getTrafficplatform();
  },
  methods:{
    async getTrafficplatform(){
      //查询详情接口
      let id = this.$route.query.id;
      const { data:res } = await this.$http.get(
        this.baseUrl.ip1 + `/mediaPlatform/edit/${id}`
      )
      let list = res;
      this.mainForm.media_platform_name = list.media_platform_name;
      this.mainForm.company_name = list.company_name;
      this.mainForm.operation_id = list.operation_id;
      this.mainForm.business_id = list.business_id;
    },
    submitRule(str){
      //信息校验
      this.$refs.mainForm.validate( valid =>{
        if( valid ){
          if(str == "form"){
            this.submitForm()
          } else if (str == 'edit'){
            this.submitEdit()
          }
        } else {
          this.$message({
            type: 'info',
            message: '您有未填写的信息，请检查'
          })
        }
      })
    },
    async submitForm(){
      //新增
      let params = {};
        params.media_platform_name=this.mainForm.media_platform_name,
        params.company_name=this.mainForm.company_name,
        params.operation_id=this.mainForm.operation_id,
        params.business_id=this.mainForm.business_id
        const response = await this.$http.post(this.baseUrl.ip1+`/mediaPlatform/store`,params)
        .then(response =>{
          if(response.code == 200){
            this.$message.success(response.msg);
            this.$router.go(-1);
          }
        })
    },
    async submitEdit(){
      //修改
      let id = this.$route.query.id;
      let params = {};
        params.media_platform_name=this.mainForm.media_platform_name,
        params.company_name=this.mainForm.company_name,
        params.operation_id=this.mainForm.operation_id,
        params.business_id=this.mainForm.business_id
        params.id = this.$route.query.id
      const response = await this.$http.post(this.baseUrl.ip1+`/mediaPlatform/store`,params)
        .then(response =>{
          if(response.code == 200){
            this.$message.success(response.msg);
            this.$router.go(-1);
          }
        }) 
    },
    //运营下拉框
    async getOperation(){
      const {data: res} = await this.$http.get(this.baseUrl.ip1+`/operation/list`)
      console.log('运营人员下拉列表',res)
      var operation_list = res;
      operation_list.forEach((item, index) => {
        this.operation.push({
          operation_name: item.name,
          operation_id: item.id
        });
      });
    },
    //获取商务人员下拉列表
    async getBusiness(){
      const {data: res} = await this.$http.get(this.baseUrl.ip1+`/business/list`)
      console.log('商务人员下拉列表', res);
      let business_list = res;
      business_list.forEach((item,index) => {
        this.business.push({
          business_name:item.name,
          business_id:item.id
        })    
      });
    },
    cancel(){
      //取消
      this.$router.go(-1);
    }
  }
}
</script>

<style lang="scss">
  .editTrafficplatformList{
    .editTrafficplatformList_title{
      margin-bottom: 30px;
      .formTitle {
        margin: 0 10px 20px;
        padding-bottom: 10px;
        font-size: 14px;
        // border-bottom:1px solid #eee;
        color: rgb(102, 102, 102);
        font-weight: 700;
      }
    }
    .platformInfo{
      margin-left: 50px;
    }
  }
</style>