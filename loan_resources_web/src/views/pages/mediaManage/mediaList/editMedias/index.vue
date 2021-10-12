<template>
  <d2-container>
    <template slot="header">
      <div class="flex ryt-right-top">
        <div class="line_header"></div>
        <div v-if="pageType == '1'">新建应用</div>
        <div v-else-if="pageType == '2'" class="line_title">
          编辑应用
        </div>
      </div>
    </template>
    <div class="mediasInfo">
      <p style="padding-left: 10px;margin-top: -10px;">基础信息</p>
      <el-form
        :model="mainForm"
        ref="mainForm"
        label-width="240px"
        :rules="rytproject"
        size="mini"
      >
        <el-form-item
          label="应用名称"
          prop="media_name"
        >
          <el-input 
            v-model="mainForm.media_name"
            placeholder="请填写应用名称"
            style="width:220px"  
          ></el-input>
        </el-form-item>
        <el-form-item
          label="所属平台"
          prop="media_platform_id"
        >
          <el-select
            v-model="mainForm.media_platform_id"
            placeholder="请填写所属平台"
            style="width:220px"
          >
            <el-option
              v-for="(item,index) in paltformNameArr"
              :key="index"
              :label="item.label"
              :value="item.value"
            ></el-option>
          </el-select>
        </el-form-item>

        <el-form-item
          label="投放类型"
          prop="put_type"
        >
          <el-radio-group
            v-model="mainForm.put_type"
            style="width:220px"
          >
            <el-radio-button label=1>内部投放</el-radio-button>
            <el-radio-button label=2>外部投放</el-radio-button>
          </el-radio-group>
        </el-form-item>

        <el-form-item
          label="是否缓存"
          prop="is_media_cache"
        >
          <el-radio-group
            v-model="mainForm.is_media_cache"
            style="width:220px"
          >
            <el-radio-button label=0>否</el-radio-button>
            <el-radio-button label=1>是</el-radio-button>
          </el-radio-group>
        </el-form-item>










        <el-form-item
          label="对接方式"
          prop="business_type"
        >
          <el-radio-group
            v-model="mainForm.business_type"
            style="width:220px"
            @change="changeDockingMode($event)"
            :disabled="pageType == '2'"
          >
            <el-radio-button label=1>API</el-radio-button>
            <el-radio-button label=2>H5</el-radio-button>
          </el-radio-group>
        </el-form-item>
        <el-form-item
          label="对接协议"
          prop="business_schema"
          v-if="mainForm.business_type == 1"
        >
          <el-radio-group
            v-model="mainForm.business_schema"
            style="width:220px"
            @change="changeDockingProtocol($event)"
            :disabled="pageType == '2'"
          >
            <el-radio-button label=1>OPEN-RTB</el-radio-button>
            <el-radio-button label=2>API金融</el-radio-button>
          </el-radio-group>
        </el-form-item>
        <el-form-item
          label="结算方式"
          prop="bill_type"
        >
          <el-radio-group
            v-model="mainForm.bill_type"
            @change="changgeBillType($event)"
          >
            <el-radio-button label=1 v-if="mainForm.business_schema==1&&mainForm.business_type==1">CPM</el-radio-button>
            <el-radio-button label=2>CPC</el-radio-button>
            <el-radio-button label=3>CPA</el-radio-button>
            <el-radio-button label=4>CPS</el-radio-button>
            <el-radio-button label=5>CPD</el-radio-button>
          </el-radio-group>
        </el-form-item>
        <div v-show="(mainForm.business_type==1&&mainForm.business_schema!=1)||mainForm.business_type==2">
          <el-form-item
            v-if="mainForm.bill_type==2"
            label="计费节点"
          >
            <el-button type="info">点击</el-button>
          </el-form-item>
          <el-form-item
            v-else-if="mainForm.bill_type==3"
            label="计费节点"
          >
            <el-button type="info">授信</el-button>
          </el-form-item>
          <el-form-item
            v-else-if="mainForm.bill_type==4"
            label="分成节点"
          >
            <el-button type="info">收益分成</el-button>
          </el-form-item>
          <el-form-item
            v-else
            label="计费周期"
            prop="toll_cycle"
          >
            <el-radio-group
              v-model="mainForm.toll_cycle"
            >
              <el-radio-button label=1>天</el-radio-button>
              <el-radio-button label=2>周</el-radio-button>
              <el-radio-button label=3>月</el-radio-button>
            </el-radio-group>
          </el-form-item>
          <el-form-item
            v-if="mainForm.bill_type==2"
            label="CPC是否去重"
            prop="cpc_uniq"
          >
            <el-radio-group
              v-model="mainForm.cpc_uniq"
            >
              <el-radio-button label=0>否</el-radio-button>
              <el-radio-button label=1>是</el-radio-button>
            </el-radio-group>
          </el-form-item>
        </div>
        <el-form-item
          label="交易方式"
          prop="sale_type"
          v-if="mainForm.business_schema==1&&mainForm.bill_type==1&&mainForm.business_type==1"
        >
          <el-radio-group
            v-model="mainForm.sale_type"
          >
            <el-radio-button label=1>RTB</el-radio-button>
            <el-radio-button label=2>PD</el-radio-button>
            <el-radio-button label=3>PDB</el-radio-button>
          </el-radio-group>
        </el-form-item>
        <el-form-item
          label="结算价格"
          prop="sale_style"
          v-if="mainForm.sale_type == 1&&mainForm.business_type==1&&mainForm.bill_type==1"
        >
          <el-radio-group
            v-model="mainForm.sale_style"
          >
            <el-radio-button label=1>一价</el-radio-button>
            <el-radio-button label=2>二价</el-radio-button>
          </el-radio-group>
        </el-form-item>
        <el-form-item
          label="素材是否审核"
          prop="is_audit"
          v-if="mainForm.business_schema==1&&mainForm.business_type==1"
        >
          <el-radio-group
            v-model="mainForm.is_audit"
          >
            <el-radio-button label=0>否</el-radio-button>
            <el-radio-button label=1>是</el-radio-button>
          </el-radio-group>
        </el-form-item>
        <el-form-item
          label="是否支持DP"
          prop="is_dp"
          v-if="mainForm.business_schema==1&&mainForm.business_type==1"
        >
          <el-radio-group
            v-model="mainForm.is_dp"
          >
            <el-radio-button label=0>否</el-radio-button>
            <el-radio-button label=1>是</el-radio-button>
          </el-radio-group>
        </el-form-item>
        <el-form-item
          label="是否需白名单"
          prop="need_white_list"
          v-if="mainForm.business_schema==1&&mainForm.business_type==1"
        >
          <el-radio-group
            v-model="mainForm.need_white_list"
          >
            <el-radio-button label=0>否</el-radio-button>
            <el-radio-button label=1>是</el-radio-button>
          </el-radio-group>
        </el-form-item>
        <el-form-item
          label="应用类型"
          prop="genre_id"
        >
          <el-radio-group
            v-model="mainForm.genre_id"
            style="width:80%"
          >
            <el-radio-button v-for="(item,index) in mediaTypeArr" :label="item.value" :key="index" style="margin-bottom:5px">{{item.label}}</el-radio-button>
          </el-radio-group>
        </el-form-item>
        <el-form-item
          label="禁投素材类型"
          prop="limit_media_type"
        >
          <el-checkbox-group
            v-model="mainForm.limit_media_type"
            @change="checkBTN"
          >
            <el-checkbox label='0':disabled="isAllCheck">不限</el-checkbox>
            <el-checkbox label='1' :disabled="isCheck">非引导</el-checkbox>
            <el-checkbox label='2':disabled="isCheck">半引导</el-checkbox>
            <el-checkbox label='3':disabled="isCheck">引导</el-checkbox>
          </el-checkbox-group>
        </el-form-item>
      </el-form>
    </div>
    <div
      style="text-align: center; margin-top: 80px;"
      type="flex"
      v-if="pageType=='1'"
    >
      <el-button type="primary" size="medium" @click="submitForm"
        >提交</el-button
      >
      <el-button size="medium" @click="cancel">取消</el-button>
    </div>
    <div style="text-align: center; margin-top: 80px;" type="flex" v-else>
      <el-button type="primary" size="medium" @click="submitEdit"
        >保存</el-button
      >
      <el-button size="medium" @click="cancel">取消</el-button>
    </div>
  </d2-container>
</template>

<script>
export default {
  data() {
    return {
      pageType:"",
      isCheck:false,
      isAllCheck:false,
      mainForm:{
        media_name:"",//应用名称
        media_platform_id:"",//所属平台
        business_type:1,//对接方式  1 API    2  H5 
        put_type:1,//投放类型
        is_media_cache:0,//是否缓存
        business_schema:1,//对接协议 1  OPEN-RTB   2 API金融
        bill_type:1,//结算方式  1 CPM  2 CPC  3 CPA  4 CPS  5  CPD
        sale_type:1,//竞价方式 1 RTB  2  PD  3 PDB
        is_audit:0,//素材是否审核  0 否  1 是
        is_dp:0,//是否支持DP   0 否   1 是
        need_white_list:0,//是否需白名单  0 否   1 是
        genre_id:1,//应用类型  json
        limit_media_type:['0'],//禁投素材类型  0 不限  1  非引导  1 半引导 3引导
        bundle_name:"",//包名
        store_download_url:"",//下载地址
        sale_style:1,//结算价格  1 一价    2  二价
        toll_cycle:1,//计费周期  1 天  2 周  3 月
        cpc_uniq:0,//CPC是否去重
        toll_node:1,// 计费节点 1 点击，2 授信
        bonus_node:1// 分成节点 1 收益分成
      },
      mediaTypeArr:[],//应用类型数组
      paltformNameArr:[],
      rytproject:{
        media_name:[
          {required:true,message:"应用名称不能为空",trigger:'blur'}
        ],
        media_platform_id:[
          {required:true,message:'所属平台不能为空',trigger:'blur'}
        ],
        limit_media_type:[
          {required:true,message:'禁投类型不能为空',trigger:'blur'}
        ]
      }

    };
  },
  created() {
    this.getMediaType();
    this.getMediaPlatform();
    this.pageType = this.$route.query.type
    this.pageWhere = this.$route.query.where;
    if(this.pageWhere=='trafficplatform'){
      this.mainForm.media_name==""
      this.mainForm.media_platform_id = this.$route.query.id
    }
    this.pageType=='2' && this.getMedias();
  },
  methods: {
    changgeBillType(e){
      if(this.pageType == '2'){
        if(e=='1'){
          this.mainForm.sale_type = 1
        }
      }
    },
    checkBTN(){
      if(this.mainForm.limit_media_type.length!=0&&this.mainForm.limit_media_type[this.mainForm.limit_media_type.length-1]=='0'){

        this.mainForm.limit_media_type = ['0']
      } else {
        this.mainForm.limit_media_type.forEach((item,index)=>{
          if(item=='0'){
            this.mainForm.limit_media_type.splice(index,1)
          }
        })
      }
    },
    changeDockingMode(val){
      if(val==2){
        this.mainForm.bill_type = 2 //编辑需要判断返回的数据是否与此复制有冲突
      } else if(val==1){
        if(this.mainForm.business_schema==1)
        this.mainForm.bill_type = 1
        else {
          this.mainForm.bill_type = 2
        }
      }
    },
    changeDockingProtocol(val){
      if(val==2){
        this.mainForm.bill_type = 2
      } else {
        this.mainForm.bill_type = 1
      }
    },
    submitForm() {
      console.log("提交应用信息");
      this.$refs.mainForm.validate((valid) => {
        if (valid) {
          this.saveAll();
        } else {
          this.$message({
            type: "info",
            message: "您有未填写的信息，请检查",
          });
        }
      });
    },
    submitEdit() {
      console.log("修改媒体信息");
      this.$refs.mainForm.validate((valid) => {
        if (valid) {
          this.submitMedias();
        } else {
          this.$message({
            type: "info",
            message: "您有未填写的信息，请检查",
          });
        }
      });
    },
    //新建媒体提交信息
    async saveAll() {
      let params = {};
      if (this.pageType=='2') {
        params.media_id = this.$route.query.id;
      }
      params.media_name = this.mainForm.media_name;//应用名称
      params.media_platform_id  = this.mainForm.media_platform_id;//所属平台
      params.put_type = parseInt(this.mainForm.put_type);
      params.is_media_cache = parseInt(this.mainForm.is_media_cache);
      params.business_type = this.mainForm.business_type;//对接方式
      if(this.mainForm.business_type == 1){
        params.business_schema = this.mainForm.business_schema;//对接协议
      }
      if(this.mainForm.business_schema == 1&&this.mainForm.bill_type==1&&this.mainForm.business_type==1){
        params.sale_type = this.mainForm.sale_type;//交易方式
      } else{
        params.sale_type = 0
      }
      params.is_audit = this.mainForm.is_audit;//是否审核
      params.is_dp = this.mainForm.is_dp;//是否支持DP
      params.need_white_list = this.mainForm.need_white_list;//白名单
      params.bill_type = this.mainForm.bill_type;//结算方式
      params.genre_id = this.mainForm.genre_id;//应用类型
      params.limit_media_type = this.mainForm.limit_media_type;//禁投素材类型
      params.bundle_name = this.mainForm.bundle_name;//包名
      params.store_download_url = this.mainForm.store_download_url;//下载地址
      params.sale_style = this.mainForm.sale_style;//结算价格
      params.toll_cycle = this.mainForm.toll_cycle;//计费周期
      params.cpc_uniq = this.mainForm.cpc_uniq;//CPC是否去重

      params.toll_node = this.mainForm.bill_type == 2 ? 1:2;//计费周期
      params.bonus_node = this.mainForm.bonus_node;//分成节点

      console.log("保存的数据为：", params);
      const response = await this.$http
        .post(this.baseUrl.ip1 + `/sourceSys/media/createMedia`, params)
        .then((response) => {
          if (response.code == 200) {
            this.$message.success(response.msg);
            if(this.pageWhere == 'trafficplatform'){
              this.$router.push({
                path:`/mediaManage/mediaList`
              })
            } else{
              this.$router.go(-1);
            }
          }
        });
    },
    //媒体查询获取数据详情
    async getMedias() {
      let id = this.$route.query.id;
      const { data: res } = await this.$http.get(
        this.baseUrl.ip1 + `/sourceSys/media/upMediaList/${id}`
      );
      let list = res;
      console.log("打印获取详情数据", res);
      this.mainForm.media_name = list.media_name;
      this.mainForm.media_platform_id = list.media_platform_id == 0 ? this.mainForm.media_platform_id:list.media_platform_id;
      this.mainForm.business_type = list.business_type;
      this.mainForm.is_media_cache = list.is_media_cache;
      this.mainForm.put_type = list.put_type;
      this.mainForm.business_schema = list.business_schema;
      this.mainForm.bill_type = list.bill_type;
      this.mainForm.sale_type = list.sale_type;
      this.mainForm.is_audit = list.is_audit;
      this.mainForm.is_dp = list.is_dp;
      this.mainForm.need_white_list = list.need_white_list;
      this.mainForm.genre_id = list.genre_id;
      this.mainForm.limit_media_type = list.limit_media_type;
      this.mainForm.bundle_name = list.bundle_name;
      this.mainForm.store_download_url = list.store_download_url;
      this.mainForm.sale_style = list.sale_style;
      this.mainForm.toll_cycle = list.toll_cycle;
      this.mainForm.cpc_uniq = list.cpc_uniq;
      this.mainForm.toll_node = list.toll_node;
      this.mainForm.bonus_node = list.bonus_node;
    },
    //媒体信息修改编辑
    async submitMedias() {
      let id = this.$route.query.id;
      let params = {};
      params.media_name = this.mainForm.media_name;
      params.media_platform_id  = this.mainForm.media_platform_id;
      params.media_name = this.mainForm.media_name;
      params.media_platform_id  = this.mainForm.media_platform_id;
      params.put_type = parseInt(this.mainForm.put_type);
      params.is_media_cache = parseInt(this.mainForm.is_media_cache);
      params.business_type = this.mainForm.business_type;
      if(this.mainForm.business_type == 1){
        params.business_schema = this.mainForm.business_schema;
      }
      if(this.mainForm.business_schema == 1&&this.mainForm.bill_type==1&&this.mainForm.business_type==1){
        params.sale_type = this.mainForm.sale_type;
      } else {
        params.sale_type = 0
      }
      params.is_audit = this.mainForm.is_audit;
      params.is_dp = this.mainForm.is_dp;
      params.need_white_list = this.mainForm.need_white_list;
      params.bill_type = this.mainForm.bill_type;
      params.genre_id = this.mainForm.genre_id;
      params.limit_media_type = this.mainForm.limit_media_type;
      params.bundle_name = this.mainForm.bundle_name;
      params.store_download_url = this.mainForm.store_download_url;
      params.sale_style = this.mainForm.sale_style;
      params.toll_cycle = this.mainForm.toll_cycle;
      params.cpc_uniq = this.mainForm.cpc_uniq;

      params.toll_node = this.mainForm.bill_type==2 ? 1 : 2;
      params.bonus_node = this.mainForm.bonus_node;
      const response = await this.$http
        .post(this.baseUrl.ip1 + `/sourceSys/media/upMedia/${id}`, params)
        .then((response) => {
          if (response.code == 200) {
            this.$message.success(response.msg);
            if(this.pageWhere == 'trafficplatform'){
              this.$router.push({
                path:`/mediaManage/mediaList`
              })
            } else{
              this.$router.go(-1);
            }
          }
        });
    },
    async getMediaType(){
      //获取应用类型
      const {data:res} = await this.$http.get(this.baseUrl.ip1+`/sourceSys/media/getMediaType`)
      console.log('asaasd',res)
      let typeList = res;
      typeList.forEach(item => {
        this.mediaTypeArr.push({
          label:item.genre_name,
          value:item.id
        })
      });
    },
    //获取流量平台下拉列表
    async getMediaPlatform(){
      //流量平台下拉框 （所属平台）
      const{ data:res} = await this.$http.get(this.baseUrl.ip1 +`/sourceSys/options/mediaPlatform`)
      let platformList = res;
      platformList.forEach((item)=>{
        this.paltformNameArr.push({
          label:item.media_platform_name,
          value:item.id
        })
      });
    },
    cancel() {
      this.$router.go(-1);
    },
  },
};
</script>

<style scoped></style>
