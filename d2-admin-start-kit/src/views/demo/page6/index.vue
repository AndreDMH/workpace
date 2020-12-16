<template>
  <d2-container>
    <template slot="header">
        <div class="flex ryt-right-top">
          <div class="line_header"></div>媒体分成
        </div>
    </template>
    <div class="shareMedia">
      <el-form :model="mainForm" :data="medias" ref="mainForm" :rules="rytproject" @submit.native.prevent > 
        <div class="inputStyle">
        <el-row>
           <el-col>
              <el-form-item label="是否配置分成:" prop="is_commission" label-width="150px" >
                <el-radio-group v-model="mainForm.is_commission" size="medium" style="margin-left:30px">
                   <el-radio-button :label="0">否</el-radio-button>
                   <el-radio-button :label="1">是</el-radio-button>
                </el-radio-group>
              </el-form-item>
            </el-col>
        </el-row>


           <!-- 当配置分成选择“是”时，显示分成方式 -->
        <el-row v-if="mainForm.is_commission =='1'">
         <el-col>
          <el-form-item label="分成方式:" prop="commission_type" label-width="150px">
            <el-select 
              v-model="mainForm.commission_type" 
              placeholder="请选择分成方式" 
              size="small" 
              style="margin-left:30px"
              >
              <el-option
                v-for="item in divide_options"
                :key="item.value"
                :label="item.label"
                :value="item.value"
              >
              </el-option>
            </el-select> 
          </el-form-item>
        </el-col>
       </el-row>
       <!-- 当配置分成选择“是”且分成方式选择入口uv结算时，显示入口uv单价 -->
       <el-row  v-if="mainForm.commission_type =='1' && mainForm.is_commission =='1'">
         <el-col>
           <el-form-item label="入口uv单价:" prop="price" label-width="150px">
             <el-input 
              size="small"
              style="width:205px;margin-left:30px"
              v-model="mainForm.price"
            ></el-input>
           </el-form-item> 
         </el-col>
       </el-row>
       <!-- 当配置分成选择“是”且分成方式选择总体收益分成结算时，显示分成比例 -->
       <el-row  v-if="mainForm.commission_type =='2' && mainForm.is_commission =='1' ">
         <el-col>
           <el-form-item label="分成比例:" prop="price" label-width="150px">
             <el-input 
              size="small"
              style="width:205px;margin-left:30px"
              v-model="mainForm.price"
            ></el-input>%
           </el-form-item> 
         </el-col>
       </el-row>
       <!-- 当配置分成选择“是”时，显示代理抽成 -->
        <el-row  v-if="mainForm.is_commission == '1' && (mainForm.commission_type =='1' || mainForm.commission_type =='2')">
          <el-col>
            <el-form-item label="是否代理抽成:" prop="is_agent" label-width="150px">
              <el-radio-group v-model="mainForm.is_agent" size="medium" style="margin-left:30px">
                <el-radio-button :label="0">否</el-radio-button>
                <el-radio-button :label="1">是</el-radio-button>
              </el-radio-group>
            </el-form-item>
          </el-col>
        </el-row>
        <!-- 当配置分成选择“是”且分成方式选择入口uv结算且代理抽成选择“是”时显示抽成单价 -->
        <el-row  v-if="mainForm.is_commission == '1' && mainForm.commission_type =='1' && mainForm.is_agent =='1' " >
          <el-col>
            <el-form-item label="抽成单价:" prop="agent_price" label-width="150px">
              <el-input
                size="small"
                style="width:205px; margin-left:30px"
                v-model="mainForm.agent_price"
              ></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <!-- 当配置分成选择“是”且分成方式选择总体收益分成结算且代理抽成选择“是”时显示抽成比例 -->
        <el-row  v-if="mainForm.is_commission == '1' && mainForm.commission_type =='2' && mainForm.is_agent =='1' " >
          <el-col>
            <el-form-item label="抽成比例:" prop="agent_price" label-width="150px">
              <el-input
                size="small"
                style="width:205px;margin-left:30px"
                v-model="mainForm.agent_price"
              ></el-input>%
            </el-form-item> 
          </el-col>
        </el-row>
        <!-- 当配置分成选择“是”，显示数据同步方式 -->
        <el-row  v-if="mainForm.is_commission == '1' &&(mainForm.commission_type =='1' || mainForm.commission_type == '2'||mainForm.commission_type =='3' )">
          <el-col>
            <el-form-item label="数据同步方式:" prop="sync_data_mode" label-width="150px">
              <el-select 
                v-model="mainForm.sync_data_mode" 
                placeholder="请选择自动、手动录入" 
                size="small"
                style="margin-left:30px"
                @change="changeData_sync"
                >
                <el-option
                  v-for="item in sync_options"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value"
                >
                </el-option>
              </el-select>
            </el-form-item>
          </el-col>
        </el-row>
        <!-- 当配置分成选择“是”且分成方式选择入口uv或者总体收益分成结算的情况下录入方式选择自动录入时，显示比例 -->
        <el-row  v-if="mainForm.is_commission == '1' && mainForm.sync_data_mode == '2' && (mainForm.commission_type =='1' || mainForm.commission_type == '2') ">
          <el-col>
            <el-form-item label="比例:" prop="sale_ratio" label-width="150px">
              <el-input
                v-model="mainForm.sale_ratio"
                size="small"
                style="width:205px;margin-left:30px"
              ></el-input>%
            </el-form-item>
          </el-col>
        </el-row>
      </div>
        <!-- 当配置分成选择“是”且分成方式选择广告主节点结算时，显示表格 -->
        <el-row style="padding-left: 15px;" v-if="mainForm.commission_type == '3' && mainForm.is_commission =='1' ">
          <el-col>
            <div label="广告主节点配置:">
              <i
              class="el-icon-circle-plus-outline"
              aria-hidden="true"
              style="font-size:25px;color: rgb(64, 158, 255);margin-right:14px;float:right"
              @click="addAdvertiser"
              ></i>
              广告主节点配置：
              <div id="advertiserNode">
                <el-table :data="mainForm.ad_commission_list" style="width: 100%" border :header-cell-style="{background:'#f5f5f5'}" class="tableClass" >
                  <el-table-column
                    width="150"
                    align="center"
                    prop="ad_name"
                    label="广告主"
                  >
                    <template slot-scope="scope">
                      <el-form-item :prop="`ad_commission_list.${scope.$index}.ad_name`" :rules="rytproject_data">
                        <el-select
                          style="width:130px"
                          placeholder="请选择"
                          size="small"
                          v-model="scope.row.ad_name"
                          filterable
                          >
                          <el-option
                            v-for="(item,index) in adOptions"
	                          :key="index"
	                          :label="item.label"
	                          :value="item.value">
                          </el-option>
                        </el-select>
                      </el-form-item>
                    </template>  
                  </el-table-column>
                  <el-table-column
                    align="center"
                    prop="settle_style"
                    label="结算方式"
                  >
                    <template slot-scope="scope">
                      <el-form-item :prop="`ad_commission_list.${scope.$index}.settle_style`" :rules="rytproject_data">
                        <el-select
                          placeholder="请选择"
                          size="small"
                          v-model="scope.row.settle_style"
                          @change="changeData_settle"
                        >
                          <el-option
                            v-for="item in settle_options"
                            :key="item.value"
                            :label="item.label"
                            :value="item.value"
                          ></el-option>
                        </el-select>
                      </el-form-item>
                    </template>
                  </el-table-column>
                  <el-table-column
                    align="center"
                    prop="settle_node"
                    label="结算节点"
                  >
                    <template slot-scope="scope">
                      <el-form-item :prop="`ad_commission_list.${scope.$index}.settle_node`" v-if="scope.row.settle_style == '2'" :rules="rytproject_data">
                        <el-select
                          v-model="scope.row.settle_node"
                          placeholder="请选择"
                          size="small"
                          >
                          <el-option
                            v-for="item in node_options"
                            :key="item.value"
                            :label="item.label"
                            :value="item.value"
                            ></el-option>
                        </el-select>
                      </el-form-item>
                      <el-form-item :prop="`ad_commission_list.${scope.$index}.settle_node`" v-if="scope.row.settle_style == '3' ">
                        <el-select
                          v-model="scope.row.settle_node"
                          placeholder="请选择"
                          size="small"
                          disabled
                          >
                          <el-option
                            v-for="item in node_options"
                            :key="item.value"
                            :label="item.label"
                            :value="item.value"
                            ></el-option>
                        </el-select>
                      </el-form-item>
                    </template>
                  </el-table-column>
                  <el-table-column
                    align="center"
                    prop="price"
                    label="媒体结算价格"
                  >
                    <template slot-scope="scope">
                      <el-form-item :prop="`ad_commission_list.${scope.$index}.price`"  v-if="scope.row.settle_style == '2'" :rules="rytproject_data">                   
                        <el-input
                          style="width:100px"
                          v-model="scope.row.price"
                          size="small"
                        ></el-input>元
                      </el-form-item>
                      <el-form-item :prop="`ad_commission_list.${scope.$index}.price`" v-if="scope.row.settle_style == '3'" :rules="rytproject_data">                   
                        <el-input
                          style="width:100px"
                          v-model="scope.row.price"
                          size="small"
                        ></el-input>%
                      </el-form-item>
                    </template>
                  </el-table-column>
                  <el-table-column
                    align="center"
                    prop="is_agent"
                    label="代理抽成"
                  >
                    <template slot-scope="scope">
                      <el-form-item :prop="`ad_commission_list.${scope.$index}.is_agent`" >
                        <el-select
                          v-model="scope.row.is_agent"
                          placeholder="请选择"
                          @change="changeData_agent"
                          size="small">
                          <el-option
                            v-for="item in agent_options"
                            :key="item.value"
                            :label="item.label"
                            :value="item.value"
                            ></el-option>
                        </el-select>  
                      </el-form-item>
                    </template>
                  </el-table-column>
                  <el-table-column
                    align="center"
                    prop="agent_price"
                    label="代理抽成价格"
                  >
                    <template slot-scope="scope">
                      <el-form-item :prop="`ad_commission_list.${scope.$index}.agent_price`" v-if="scope.row.is_agent== '0'&& scope.row.settle_style == '2'">
                      <el-input
                        size="small"
                        style="width:100px"
                        v-model="scope.row.agent_price"
                        disabled
                      ></el-input>元
                      </el-form-item>
                      <el-form-item :prop="`ad_commission_list.${scope.$index}.agent_price`" v-if="scope.row.is_agent== '0'&& scope.row.settle_style == '3'">
                      <el-input
                        size="small"
                        style="width:100px"
                        v-model="scope.row.agent_price"
                        disabled
                      ></el-input>%
                      </el-form-item>
                      <el-form-item :prop="`ad_commission_list.${scope.$index}.agent_price`" v-if="scope.row.is_agent== '1'&& scope.row.settle_style == '2'">
                      <el-input
                        size="small"
                        style="width:100px"
                        v-model="scope.row.agent_price"
                      ></el-input>元
                      </el-form-item>
                      <el-form-item :prop="`ad_commission_list.${scope.$index}.agent_price`" v-if="scope.row.is_agent== '1'&& scope.row.settle_style == '3'">
                      <el-input
                        size="small"
                        style="width:100px"
                        v-model="scope.row.agent_price"
                      ></el-input>%
                      </el-form-item>
                    </template>
                  </el-table-column>

                  <el-table-column
                    align="center"
                    prop="sale_ratio"
                    label="比例"
                  >
                    <template slot-scope="scope">
                      <el-form-item  v-if="mainForm.sync_data_mode=='2'">
                      <el-input
                        style="width:100px"
                        size="small"
                        v-model="scope.row.sale_ratio"
                      ></el-input>%
                      </el-form-item>
                      <el-form-item  v-if="mainForm.sync_data_mode=='1'">
                      <el-input
                        style="width:100px"
                        size="small"
                        v-model="scope.row.sale_ratio"
                        disabled
                      ></el-input>%
                      </el-form-item>
                    </template>
                  </el-table-column>

                  <el-table-column
                    width="100"
                    align="center"
                    label="操作"
                  >
                    <template slot-scope="scope">
                      <el-form-item >
                          <i
                            class="el-icon-delete"
                            style="font-size:18px;color: rgb(64, 158, 255);"
                            @click="removeAdvertiser(scope.$index)"
                          ></i>
                      </el-form-item>
                    </template>
                  </el-table-column>
                </el-table>
              </div>
              <!-- 表格结束 -->
            </div>
          </el-col>
        </el-row>
      </el-form>
    </div>
      <div style="text-align: center; margin-top: 80px;" type="flex">
        <el-button type="primary" size="medium" @click="submitForm" >提交</el-button>
         <el-button size="medium" @click="cancel">取消</el-button>
      </div>
  </d2-container>
</template>

<script>
//import { valid } from 'mockjs';
export default {
  data(){
    return{
      //表单请求参数
      mainForm:{
        is_commission:"0",//是否配置分成，默认为否
        commission_type:"",//分成方式
        price:"",//入口uv单价/分成比例
        is_agent:"0",//是否代理抽成，默认为否
        agent_price:"",//抽成单价/抽成比例
        sync_data_mode:"",//数据同步方式
        sale_ratio:"",//比例
        //表格中的参数
        ad_commission_list:[
          {
          ad_name:"",//广告主名称
          settle_style:"",//结算方式
          settle_node:"",//结算节点
          price:"",//媒体结算价格
          is_agent:"0",//代理抽成
          agent_price:"",//代理抽成价格
          //sync_data_mode:"",//数据同步方式
          sale_ratio:""//比例
          }
        ],
      },
      adOptions:[],//广告主数组
      medias:[],//媒体数组
      //分成方式下拉列表
      divide_options:[{
        value:"1",
        label:"入口uv结算"
      },
      {
        value:"2",
        label:"CPS分成"
      },
      {
        value:"3",
        label:"广告主节点结算"
			},
			{
				value:"4",
				label:"CPM"
			}],
      //数据同步方式下拉列表
      sync_options:[
      {
        value:"1",
        label:"手动录入"
      },
      {
        value:"2",
        label:"自动录入"
      }],
      //结算方式下拉列表
      settle_options:[{
        value:"2",
        label:"CPA"
      },
      {
        value:"3",
        label:"CPS"
			},
      /*
        暂时禁用 
      {
        value:"1",
        label:"CPC"
      } */
			],
			//广告主下拉假数据
			adOptions:[{
				value:"1",
				label:"a"
			},
			{
				value:"2",
				label:"b",
			}
			],
      //结算节点下拉列表
      node_options:[{
        value:"1",
        label:"注册"
      },
      {
        value:"2",
        label:"进件"
      },
      {
        value:"3",
        label:"授信"
      },
      {
        value:"4",
        label:"下款"
      }],
      //抽成代理下拉列表
      agent_options:[{
        value:"0",
        label:"否"
      },{
        value:"1",
        label:"是"
      }],
      //规则校验
      rytproject:{
        commission_type:[
          {required:true,message:"请选择分成方式",trigger:"blur"}
        ],
        price:[
          {required:true,message:"入口uv单价/分成比例不能为空",trigger:"blur"}
        ],
        agent_price:[
          {required:true,message:"抽成单价/抽成比例不能为空",trigger:"blur"}
        ],
        sync_data_mode:[
          {required:true,message:"请选择数据同步方式",trigger:"blur"}
        ],
        sale_ratio:[
          {required:true,message:"比例不能为空",trigger:"blur"}
        ],
        is_commission:[
          {required:true,message:"请选择是否配置分成",trigger:"blur"}
        ],
        is_agent:[
          {required:true,message:"请选择是否代理抽成",trigger:"blur"}
        ],
      },
      rytproject_data:[
        {required:true,message:"内容不能为空",trigger:"blur"}
      ]
    }
  },
  created() {
  	//获取广告主下拉数据
    //this.getadOptions();
    //this.getOneMediaDivided();  //获取媒体分成数据

  },
  methods:{
  changeData_agent(){
    for(let i = 0;i<this.mainForm.ad_commission_list.length;i++){
      if(this.mainForm.ad_commission_list[i].is_agent==0){
        this.mainForm.ad_commission_list[i].agent_price=""
      }
    }
  },
  changeData_sync(){
    for(let i = 0;i<this.mainForm.ad_commission_list.length;i++){
      if(this.mainForm.sync_data_mode==1){
        this.mainForm.ad_commission_list[i].sale_ratio=""
     }
   } 
  },
  changeData_settle(){
    for(let i = 0;i<this.mainForm.ad_commission_list.length;i++){
      if(this.mainForm.ad_commission_list[i].settle_style==3){
        this.mainForm.ad_commission_list[i].settle_node=""
      }
    }
  },
    //广告主下拉数据传入
    async getadOptions(){
      const { data: res } = await this.$http.get(this.baseUrl.ip1+`/ad/options`)
      console.log(res);
      var arrs=res;
      arrs.forEach((item,index)=>{
        this.adOptions.push({
          label:item.ad_name,
          value:item.ad_name
        })
        if(this.$route.params.ad_name == item.ad_name){
          this.form.ad_id = String(item.id)
        }
      })
    },
    //获取媒体配置分成接口
    async getOneMediaDivided(){
      const{ data: res } = await this.$http.get(this.baseUrl.ip1+`/medias/getOneMediaDivided?media_id=${this.$route.query.id}`)
      var list = res
      // 判断媒体数据是否分成配置过，对象是否为空
      var arr = Object.keys(list);
      console.log(arr.length !=0)
      if(arr.length != 0){
      this.mainForm.is_commission = String(list.is_commission)//是否分成
      this.mainForm.commission_type = String(list.commission_type) //分成方式
      this.mainForm.price = list.price //入口uv单价/分成比例
      this.mainForm.is_agent = list.is_agent //是否代理抽成
      this.mainForm.agent_price = list.agent_price //抽成单价/抽成比例
      this.mainForm.sync_data_mode = String(list.sync_data_mode==0?"":list.sync_data_mode) //数据同步方式
      this.mainForm.sale_ratio = list.sale_ratio //比例
      //表格中的参数配置
      this.mainForm.ad_commission_list = res.ad_commission_list
      }
      //this.medias = res.medias
      //console.log(this.medias)
    },
    //媒体分成配置新增和编辑
    async getmediaDivided(){
      let params = {}
      if(this.mainForm.commission_type == '3'){
          params.commission_type=this.mainForm.commission_type
          params.is_commission=this.mainForm.is_commission 
          params.ad_commission_list=this.mainForm.ad_commission_list
          params.sync_data_mode=this.mainForm.sync_data_mode == 0 ? "":this.mainForm.sync_data_mode 
          params.media_id=this.$route.query.id
        }else if(this.mainForm.commission_type == '2'){
          params.price=this.mainForm.price
          params.commission_type=this.mainForm.commission_type
          params.is_commission=this.mainForm.is_commission 
          params.sync_data_mode=this.mainForm.sync_data_mode 
          params.media_id=this.$route.query.id
          params.price=this.mainForm.price
          params.agent_price=this.mainForm.is_agent == 0?"0.00":this.mainForm.agent_price
          params.sale_ratio=this.mainForm.sync_data_mode ==1?"0.00":this.mainForm.sale_ratio
          params.is_agent=this.mainForm.is_agent 
        }else if(this.mainForm.commission_type == '1'){
          params.commission_type=this.mainForm.commission_type
          params.sync_data_mode=this.mainForm.sync_data_mode
          params.media_id=this.$route.query.id
          params.is_commission=this.mainForm.is_commission 
          params.price=this.mainForm.price
          params.agent_price=this.mainForm.is_agent == 0?"0.00":this.mainForm.agent_price
          params.sale_ratio=this.mainForm.sync_data_mode == 1?"0.00":this.mainForm.sale_ratio
          params.is_agent=this.mainForm.is_agent  
        } 
      let url = this.baseUrl.ip1+`/medias/mediaDivided?media_id=${this.$route.query.id}`;
      const {data:res} = await this.$http.post(url,params);
      this.$router.go(-1);
      this.$message.success('提交成功');
    },
    //信息提交
    submitForm(){
      console.log("提交的数据为：",this.mainForm);
      this.$refs.mainForm.validate((valid)=>{
        if(valid) {
          //this.getmediaDivided();
					//this.mainForm[0] = this.getmediaDivided()
					alert('提交成功')
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
    addAdvertiser(){ 
      //添加
      this.mainForm.ad_commission_list.push({
        ad_name:"",//广告主名称
        settle_style:"",//结算方式
        settle_node:"",//结算节点
        price:"",//媒体结算价格
        is_agent:"0",//代理抽成
        agent_price:"",//代理抽成价格
        //sync_data_mode:"",//数据同步方式
        sale_ratio:""//比例
      });
    },
    removeAdvertiser(index) {
      //删除
      this.mainForm.ad_commission_list.splice(index, 1);
    }
  }
}
</script>
<style lang="scss" scoped>
.shareMedia {
  .line_title {
    color: #999999;
    font-size: 16px;
    font-weight: 700;
  }
  #advertiserNode{
    width: 100%;
    margin: auto;
    margin-top:30px;
    display: flex;
  }
  .inputStyle{
    padding-left: 300px;
  }
}
</style>