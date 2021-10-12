<template>
<div class="alls">
  <el-dropdown size="small" class="d2-mr">
    <span class="btn-text">{{info.name ? `你好 ${info.name}` : '未登录'}}</span>
    <el-dropdown-menu slot="dropdown">
      <!-- <el-button @click="dialogVisible = true" style="border:none;font-size:14px;display:block;">修改密码</el-button> -->
      <el-dropdown-item @click.native="dialogVisible = true" style="font-size:14px">
        <i class="fa fa-pencil" aria-hidden="true"></i>
        修改密码
      </el-dropdown-item>
      <el-dropdown-item @click.native="logOff" style="font-size:14px">
         <d2-icon name="power-off" class="d2-mr-5"/>
        注销
      </el-dropdown-item>
    </el-dropdown-menu>
  </el-dropdown>
   <el-dialog title="修改密码" :visible="dialogVisible" :before-close="closeDlg" width="500">
        <el-form :model="mainForm"  ref="mainForm"  label-width="120px" :rules="rule ">
          <el-form-item  label="账户名称:">
             {{this.user_name}}
          </el-form-item>
          <el-form-item  label="登录账号:">
             {{this.user_mobile}}
          </el-form-item>
          <el-form-item  label="原始密码:" prop="password">
              <el-input v-model="mainForm.password" placeholder="请输入密码" style="width: 220px;" />
          </el-form-item>
           <el-form-item  label="新密码:" prop="new_password">
              <el-input v-model="mainForm.new_password" placeholder="请输入密码" style="width: 220px;" />
          </el-form-item>
          <el-form-item  label="确认新密码:" prop="new_password_confirmation">
              <el-input v-model="mainForm.new_password_confirmation" placeholder="请输入密码" style="width: 220px;" />
          </el-form-item>
        </el-form>
        <div style="font-size: 8px;margin-left: 50px;">提示:   新建密码必须包含（大写字母、小写字母、数字以及特殊字符）</div>
        <div slot="footer" class="dialog-footer">
            <el-button @click="dialogVisible = false">取 消</el-button>
            <el-button type="primary" @click="addSave">确 定</el-button>
        </div>
    </el-dialog>
</div>
</template>

<script>
import util from '@/libs/util'
import { mapState, mapActions } from 'vuex'
export default {
   data(){
       var validatePass1 = (rule, value, callback) => {
            if (value === "") {
                callback(new Error("请输入密码"));
            } else {
                if (this.mainForm.new_password !== "") {
                this.$refs.mainForm.validateField("new_password_confirmation");
                }
                callback();
            }
            };
        var validatePass2 = (rule, value, callback) => {
        if (value === "") {
            callback(new Error("请输入确认密码"));
        } else if (value !== this.mainForm.new_password) {
            callback(new Error("两次输入密码不一致！"));
        } else {
            callback();
        }
        };
      return {
          dialogVisible: false,
          mainForm:{
             name:"",//账号名称
             mobile:"",//登录账号
             password:"",//原始密码
             new_password:"",//新密码
             password_confirmation:"",//确认密码
          },
          rule:{
              name: [
                { required: true, message: "账户名称不能为空！", trigger: "blur" },
                { min: 0, max: 20, message: '限制20个字', trigger: 'blur' },
             ],
             mobile:[
                { pattern:/^[1][3,4,5,6,7,8,9][0-9]{9}$/, message: '请填写正确的登录账号！',trigger:'blur',required: true }
             ],
             password:[
               {required: true,messgae:"请输入原始密码", trigger: "blur"},
             ],
             new_password:[
               {required: true,validator: validatePass1, trigger: "blur"},
               { pattern:/[a-z]/, message: '密码必须包含小写字母！',trigger:'blur',required: true },
               { pattern:/[A-Z]/, message: '密码必须包含大写字母！',trigger:'blur',required: true },
               { pattern:/\W/, message: '密码必须包含特殊字符！',trigger:'blur',required: true },
               { pattern:/[1,2,3,4,5,6,7,8,9,0]/, message: '密码必须包含数字！',trigger:'blur',required: true },
               { min: 6 , message: '密码至少为6个字符', trigger: 'blur' },
               { max:18 , message: '密码最高为18个字符', trigger: 'blur' },
             ],
             new_password_confirmation:[
               {required: true,validator: validatePass2, trigger: "blur"},
               { min: 6, max:20 , message: '密码至少为6个字符', trigger: 'blur' },
             ]
          },
         
          user_name:"",
          user_mobile:"",
      }
  },
  computed: {
    ...mapState('d2admin/user', [
      'info'
    ]),
  },
  created(){
      this.user_name = util.cookies.get('userAll_name_wharf');
      this.user_mobile = util.cookies.get('userAll_mobile_wharf')

  },
  methods: {
    ...mapActions('d2admin/account', [
      'logout'
    ]),
    /**
     * @description 登出
     */
    logOff () {
      this.logout({
        confirm: true
      })
    },
    closeDlg(){
       this.dialogVisible=false;
    },
    async addSave(){
       this.$refs.mainForm.validate( valid => { 
            console.log('00')
            if( valid ){
                console.log('1')
                this.submission()
            }else{
              this.$message({
                type: 'info',
                message: '您有未填写的信息，请检查'
              });
            } 
              
        })
    },
     async submission(){
        let params={
            new_password:this.mainForm.new_password,
            password:this.mainForm.password,
            new_password_confirmation:this.mainForm.new_password_confirmation
        }
        const {data: res} = await this.$http.post(this.baseUrl.ip1 + '/my/update',params);
        // console.log(data)
        // if(code == 200){
        this.$message.success('保存成功')
        this.dialogVisible=false;
        // }else{
        //    this.$message.error('保存失败')
        // }
      },
  }
}
</script>
<style lang="scss" scoped>
  
// .alls{
  ::v-deep .el-dialog__body {
    padding: 25px 20px;
    color: #606266;
    font-size: 14px;
    word-break: break-all;
    border-bottom: 1px solid #DCDFE6;
}

// }
</style>
