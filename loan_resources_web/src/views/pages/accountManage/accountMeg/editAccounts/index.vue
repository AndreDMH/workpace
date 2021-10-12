
<template>
  <div class="addAccounts">
    <d2-container>
      <template slot="header">
        <div class="flex ryt-right-top">
          <!-- <div class="line_header"></div><div class="line_title">编辑账户</div> -->
          <div v-if="!isEdit">新建账户</div>
          <div v-else class="line_title">编辑账户</div>
        </div>
      </template>
      <div class="account_header">账户信息</div>
      <el-form
        :model="mainForm"
        ref="mainForm"
        label-width="200px"
        :rules="rule"
        style="margin-top: 40px"
      >
        <el-form-item label="账户名称:" prop="name">
          <el-input
            v-model="mainForm.name"
            placeholder="请输入账户名称"
            style="width: 300px;"
          />
        </el-form-item>
        <el-form-item label="账号角色:" prop="role">
          <el-radio-group v-model="mainForm.role">
            <el-radio
              v-for="item in roleArrs"
              :label="item.value"
              :key="item.value"
              >{{ item.label }}</el-radio
            >
          </el-radio-group>
        </el-form-item>
        <el-form-item label="登录账号:" prop="mobile">
          <el-input
            v-model="mainForm.mobile"
            placeholder="请输入登录账号"
            maxlength="11"
            style="width: 300px;"
          />
        </el-form-item>
        <el-form-item label="登录密码:" prop="password">
          <el-input
            v-model="mainForm.password"
            placeholder="请输入密码"
            style="width: 300px;"
          />
        </el-form-item>
        <el-form-item label="确认密码:" prop="password_confirmation">
          <el-input
            v-model="mainForm.password_confirmation"
            placeholder="请输入密码"
            style="width: 300px;"
          />
        </el-form-item>
        <div v-show="isEdit" style="font-size: 8px;margin-left: 150px;">
          提示: 如果不填写则默认为原密码
          修改密码必须包含（大写字母、小写字母、数字以及特殊字符）
        </div>

        <div class="account_header" style="margin-top: 20px">配置信息</div>

        <!-- <el-form-item
          label="是否限制管理媒体:"
          prop="is_limit_medias"
          style="margin-top: 120px "
        >
          <el-radio-group
            v-model="mainForm.is_limit_medias"
            size="medium"
            style="margin-left: 10px "
          >
            <el-radio-button :label="1">限制</el-radio-button>
            <el-radio-button :label="0">不限制</el-radio-button>
          </el-radio-group>
        </el-form-item>

        <el-form-item
          label="关联媒体数:"
          prop="media_list"
          style="margin-top: 30px "
          v-if="mainForm.is_limit_medias == '1'"
        >
          <el-link :underline="false" style="margin-left: 20px "
            >{{ media_list.length }}个</el-link
          >
          <el-button
            style="margin-left: 30px "
            @click="configsButton('1')"
            size="medium"
            >配置</el-button
          >
        </el-form-item> -->
        <el-form-item
          label="是否限制管理平台:"
          prop="is_limit_media_platform"
          style="margin-top:120px"
        >
          <el-radio-group
            v-model="mainForm.is_limit_media_platform"
            size="medium"
            style="margin-left: 10px "
          >
            <el-radio-button :label="1">只查看负责平台</el-radio-button>
            <el-radio-button :label="0">不限制</el-radio-button>
          </el-radio-group>
        </el-form-item>
      </el-form>
      <div
        style="text-align: left;margin-top: 50px;margin-left: 200px;"
        type="flex"
      >
        <el-button type="primary" size="medium " @click="sunmitMedias"
          >提交</el-button
        >
      </div>
    </d2-container>

    <div class="tanceng">
      <el-dialog
        title="列控制"
        :visible.sync="show"
        @close="closeDlg()"
        :close-on-click-modal="false"
        style="text-align:left;"
      >
        <div>
          <el-transfer
            style="text-align: left; display: inline-block;display:flex;max-width:600px;"
            v-model="transfersData"
            filterable
            :titles="transferTitleArray"
            :format="{
              noChecked: '${total}',
              hasChecked: '${checked}/${total}',
            }"
            :data="allShowDataList"
            ref="parant"
          >
            <span
              slot-scope="{ option }"
              class="spanList"
              @dragstart="dragstart"
              @dragover="allowDrop($event)"
              @drop="drop($event)"
              >{{ option.label }}</span
            >
          </el-transfer>
        </div>
        <span slot="footer" class="dialog-footer">
          <el-button @click="show = false">取消</el-button>
          <el-button type="primary" @click="configConfirm">保存</el-button>
        </span>
      </el-dialog>
    </div>
  </div>
</template>
<script>
import routes from "../../../../../router/routes";
export default {
  name: "editAccounts",
  data() {
    var validatePass1 = (rule, value, callback) => {
      if (value === "") {
        // callback(new Error("请输入密码"));
        callback();
      } else {
        if (this.mainForm.password !== "") {
          this.$refs.mainForm.validateField("password_confirmation");
        }
        callback();
      }
    };
    var validatePass2 = (rule, value, callback) => {
      if (value === "") {
        // console.log(rule,value,callback)
        if (this.mainForm.password == "") {
          callback();
        } else {
          callback(new Error("请输入确认密码"));
        }
      } else if (value !== this.mainForm.password) {
        callback(new Error("两次输入密码不一致！"));
      } else {
        callback();
      }
    };
    return {
      isEdit: false,
      mainForm: {
        name: "", //账号名称
        role: "", //账户角色
        mobile: "", //登录账号
        password: "", //登录密码
        password_confirmation: "", //确认密码
        id: "",
        is_limit_medias: "0",
        is_limit_media_platform:"0",
      },
      roleArrs: [], //角色数组

      hiddenData: [], //媒体数据
      show: false, //弹窗关闭
      transfersData: [],
      downdataList: [],
      media_list: [],

      selectSetNum: "", //选择配置的是哪个
      transferTitleArray: [], //展示的标题  变量控制
      allShowDataList: [], //展示所有列控制  变量控制

      rule: {
        //校验表单
        name: [
          { required: true, message: "账户名称不能为空！", trigger: "blur" },
          { min: 0, max: 20, message: "限制20个字", trigger: "blur" },
        ],
        role: [
          { required: true, message: "账户角色不能为空！", trigger: "blur" },
        ],
        mobile: [
          {
            pattern: /^[1][3,4,5,6,7,8,9][0-9]{9}$/,
            message: "请填写正确的登录账号！",
            trigger: "blur",
            required: true,
          },
        ],
        is_limit_medias: [
          { required: true, message: "请选择", trigger: "blur" },
        ],
        is_limit_media_platform:[
          { required: true, message: "请选择", trigger: "blur" },
        ],

        password: [
          { validator: validatePass1, trigger: "blur" },
          {
            pattern: /[a-z]/,
            message: "密码必须包含小写字母！",
            trigger: "blur",
          },
          {
            pattern: /[A-Z]/,
            message: "密码必须包含大写字母！",
            trigger: "blur",
          },
          { pattern: /\W/, message: "密码必须包含特殊字符！", trigger: "blur" },
          {
            pattern: /[1,2,3,4,5,6,7,8,9,0]/,
            message: "密码必须包含数字！",
            trigger: "blur",
          },
          { min: 6, message: "密码至少为6个字符", trigger: "blur" },
          { max: 18, message: "密码最高为18个字符", trigger: "blur" },
        ],
        password_confirmation: [{ validator: validatePass2, trigger: "blur" }],
      },
    };
  },
  created() {
    this.getMockData(); //获取角色数据
    this.isEdit = this.$route.query.id ? true : false;
    this.isEdit && this.detailed(); //获取数据明细
    //sthis.initMediaColumn();
  },
  methods: {
    async getMockData() {
      //获取角色数组
      const { data: res } = await this.$http.get(
        this.baseUrl.ip1 + `/role/index`,
        {
          params: {
            type: "all",
          },
        }
      );
      var newArr = [];
      newArr = res;
      newArr.forEach((item, index) => {
        if (Number(item.id !== 0)) {
          this.roleArrs.push({
            label: item.name,
            value: String(item.id),
          });
        }
      });
    },
    async detailed() {
      let id = this.$route.query.id;
      const { data: res } = await this.$http.get(
        this.baseUrl.ip1 + `/user/update/${id}`
      );
      console.log(res);
      var datas = res;
      let jiex = "";
      if (datas.roles.length == 0) {
        jiex = "2";
      } else {
        jiex = String(datas.roles[0].id);
      }
      console.log("1", jiex);
      this.mainForm.name = res.name;
      this.mainForm.mobile = res.mobile;
      this.mainForm.role = jiex;
      this.mainForm.id = res.id;
      this.mainForm.is_limit_medias = res.is_limit_media;
      this.mainForm.is_limit_media_platform = res.is_limit_media_platform
      this.media_list = res.media_list;
      this.hiddenData = res.media_list;
    },
    sunmitMedias() {
      //保存
      console.log("11", this.mainForm);

      this.$refs.mainForm.validate((valid) => {
        console.log("00", this.mainForm);
        if (valid) {
          if (this.isEdit == 1) {
            console.log("1");
            this.submission();
          } else {
            if (this.mainForm.password == "") {
              this.$message({
                type: "info",
                message: "您有未填写的信息，请检查",
              });
            } else {
              console.log("2");
              this.submission();
            }
          }
        } else {
          this.$message({
            type: "info",
            message: "您有未填写的信息，请检查",
          });
        }
      });
    },
    async submission() {
      let params = {
        name: this.mainForm.name,
        mobile: this.mainForm.mobile,
        role: this.mainForm.role,
        password: this.mainForm.password,
        password_confirmation: this.mainForm.password_confirmation,
        is_limit_media: this.mainForm.is_limit_medias,
        is_limit_media_platform:this.mainForm.is_limit_media_platform,
        media_list: this.media_list,
      };
      if (this.isEdit == 1) {
        const { data: res } = await this.$http.post(
          this.baseUrl.ip1 + `/user/update/${this.mainForm.id}`,
          params
        );
      } else {
        const { data: res } = await this.$http.post(
          this.baseUrl.ip1 + "/register",
          params
        );
      }
      // console.log(data)
      // if(code == 200){
      this.$message.success("保存成功");
      this.$router.go(-1);
      // }else{
      //    this.$message.error('保存失败')
      // }
    },

    async initMediaColumn() {
      //获取投放媒体列设置显示
      const { data: res } = await this.$http.get(
        this.baseUrl.ip1 + `/medias/getMediasList`
      );
      // this.hiddenData = res
      let allData = res.data;
      let appObj = [];
      allData.forEach((item) => {
        appObj.push({
          key: item.media_code,
          label: item.media_name,
        });
      });
      this.downdataList = appObj;
    },
    /*---------------媒体关联配置开始---------------*/
    configsButton(setNum) {
      //媒体关联配置\
      this.selectSetNum = setNum;
      console.log("配置的是哪个：", this.selectSetNum);
      if (this.selectSetNum == 1) {
        this.transferTitleArray = ["隐藏媒体", "显示媒体"];
        this.allShowDataList = this.downdataList;

        this.transfersData = this.hiddenData;
        this.show = true;
        let showRightData = [];
        let showRightObj = [];
        //动态处理分类是否可以拖动
        this.$nextTick(() => {
          let el = document.getElementsByClassName("spanList");
          for (let i = 0; i < el.length; i++) {
            showRightData.push(el[i].offsetParent.children[0].lastChild.value);
            showRightObj.push(el[i].offsetParent.children[0].lastChild);
          }
          let newShowRightData = [];
          for (let j = 0; j < showRightData.length; j++) {
            if (this.hiddenData.indexOf(showRightData[j]) == -1) {
              newShowRightData.push(j);
            }
          }
          for (let k = 0; k < newShowRightData.length; k++) {
            el[k].setAttribute("draggable", true);
          }
        });
      }
    },
    closeDlg() {
      //关闭弹窗
      this.show = false;
    },
    async configConfirm() {
      //保存
      if (this.selectSetNum == 1) {
        let el = document.getElementsByClassName("spanList");
        let showRightData = [];
        for (let k = 0; k < el.length; k++) {
          showRightData.push(el[k].offsetParent.children[0].lastChild.value);
        }
        let newShowRightData = [];
        for (let j = 0; j < showRightData.length; j++) {
          if (this.transfersData.indexOf(showRightData[j]) == -1) {
            newShowRightData.push(showRightData[j]);
          }
        }
        this.show = false;
        this.media_list = this.transfersData;
        this.hiddenData = this.media_list;
        console.log("需要保存的数组数据", this.media_list);
      }
    },

    dragstart(e) {
      this.moveDom = e.currentTarget;
      this.startY = e.clientY;
    },
    allowDrop(event) {
      event.preventDefault();
      this.endY = event.clientY;
      this.changeDom = event.currentTarget;
      let el = this.$refs.parant.$children[0].$children[2].$el;
      let changeDom = this.changeDom.parentNode.parentNode;
      let moveDom = this.moveDom.parentNode.parentNode;
      if (this.endY - this.startY >= 0) {
        el.insertBefore(moveDom, changeDom.nextSibling);
      } else {
        el.insertBefore(moveDom, changeDom);
      }
    },
    drop(event) {
      this.changeDom = event.currentTarget;
      this.endY = event.clientY;
      let el = this.$refs.parant.$children[0].$children[2].$el;
      let changeDom = this.changeDom.parentNode.parentNode;
      let moveDom = this.moveDom.parentNode.parentNode;
      if (this.endY - this.startY >= 0) {
        el.insertBefore(moveDom, changeDom.nextSibling);
      } else {
        el.insertBefore(moveDom, changeDom);
      }
    },
    /*---------------媒体关联配置结束---------------*/
  },
};
</script>
<style lang="scss">
.account_header {
  width: 80px;
  height: 35px;
  font-family: "微软雅黑 Bold", "微软雅黑 Regular", 微软雅黑;
  font-weight: 700;
  font-style: normal;
  text-align: left;
  line-height: 35px;
  color: #333333;
  margin-left: 20px;
  margin-top: -20px;
  float: left;

  flex-direction: row;
  flex-wrap: wrap;
}
.addAccounts {
  .line_title {
    color: #999999;
    font-size: 16px;
    font-weight: 700;
  }
}
</style>
