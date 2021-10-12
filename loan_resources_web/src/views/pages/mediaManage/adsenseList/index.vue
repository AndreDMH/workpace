<template>
  <div class="adsenseList">
    <d2-container>
      <template slot="header">
        <div class="flex ryt-right-top">
          <div class="line_header"></div>
          广告位列表
        </div>
      
      <!-- 按钮事件 start 新建、删除、启用、暂停-->
      <div class="adsenseList_header">
        <el-button
          size="mini"
          type="primary"
          style="margin-right: 8px;margin-left: 11px;margin-top: 11px;"
          @click="handleFormSubmit"
        >
            <i class="el-icon-circle-plus-outline">  新增广告位</i>
        </el-button>
        <!-- <el-popover placement="bottom-end" width="160" v-model="visibleDete">
          <p>您确定删除该广告位吗？</p>
          <div style="margin: 0;text-align: right;">
            <el-button size="mini" type="text" @click="cancelDelete('1')"
              >取消</el-button
            >
            <el-button type="primary" size="mini" @click="deleteButtonType"
              >确定</el-button
            >
          </div>
          <el-button
            size="mini"
            slot="reference"
            style="margin-right: 8px;"
            :disabled="deteleOut == false"
          >
            <d2-icon name="remove" /> 删除
          </el-button>
        </el-popover> -->
        <el-popover placement="bottom-end" width="160" v-model="visibleUp">
          <p>您确定启用该广告位吗？</p>
          <div style="margin: 0;text-align: right;">
            <el-button size="mini" type="text" @click="cancelDelete('2')"
              >取消</el-button
            >
            <el-button type="primary" size="mini" @click="upButtonType"
              >确定</el-button
            >
          </div>
          <el-button
            size="mini"
            slot="reference"
            style="margin-right: 8px;"
            :disabled="forbidden == false"
          >
            <d2-icon name="play" /> 启用
          </el-button>
        </el-popover>
        <el-popover placement="bottom-end" width="160" v-model="visibleDown">
          <p>您确定暂停该广告位吗？</p>
          <div style="margin: 0;text-align: right;">
            <el-button size="mini" type="text" @click="cancelDelete('3')"
              >取消</el-button
            >
            <el-button type="primary" size="mini" @click="downButtonType"
              >确定</el-button
            >
          </div>
          <el-button size="mini" :disabled="paused == false" slot="reference">
            <d2-icon name="pause" /> 暂停
          </el-button>
        </el-popover>
        <input
          id="uploadFild"
          name="file"
          type="file"
          @change="inputExcel"
        />
        <button style="height:27px;color:#ffffff;background-color:#409EFF" size='mini' id="uploadBtn">
          <d2-icon name="plus" /> 导 入
        </button>
        <el-button size="mini" type="primary" style="margin-left:10px" @click="downloadExcel"><i class="fa fa-download" aria-hidden="true"></i> 下载模板</el-button>
        <el-popover :offset="150" placement="bottom-end" width="300" v-model="isExport_Excel">
          <div>
            <el-date-picker
              :clearable="false"
              v-model="timeValueRelease"
              style="width: 300px; margin-right: 20px"
              type="daterange"
              unlink-panels
              range-separator="至"
              start-placeholder="开始日期"
              end-placeholder="结束日期"
              format="yyyy-MM-dd"
              value-format="yyyy-MM-dd"
              :picker-options="pickerOptionsO"
              @change="exportTable"
            ></el-date-picker>
            <div style="margin-top:10px;float:right">
              <el-button @click="changeExportBtn" type="primary" size="mini">全部</el-button>
            </div>
          </div>
          <el-button size="mini" type="primary" style="margin-left:10px" slot="reference">
          <i class="fa fa-external-link" aria-hidden="true"></i> 导出</el-button>
        </el-popover>
        <el-popover placement="bottom-end" width="400" v-model="isSaleidList">
            <div>
              <el-form
                :model="saleForm"
                size="mini"
                style="height:100px"
                :rules="saleRule"
                ref="saleForm"
              >
                <el-form-item label="是否配置分成：" prop="split_account_limit" label-width="150px" >
                  <el-radio-group v-model="saleForm.split_account_limit" size="medium" style="margin-left:30px">
                    <el-radio-button :label="0">否</el-radio-button>
                    <el-radio-button :label="1">是</el-radio-button>
                  </el-radio-group>
                </el-form-item>
                <el-form-item label="分成比例：" prop="split_account_value" label-width="150px" v-if="saleForm.split_account_limit=='1'" >
                  <el-input
                    v-model="saleForm.split_account_value"
                    style="width:222px"
                    placeholder="请输入1-100以内数值"
                  ></el-input>%
                </el-form-item>
              </el-form>
              <div style="text-align: center; margin-top: 0px;" type="flex">
                <el-button type="primary" size="medium" @click="submitForm" >提交</el-button>
                <el-button size="medium" @click="cancel">取消</el-button>
              </div>
            </div>
          <el-button 
            size="mini" 
            type="primary" 
            :disabled="isSale == false" 
            style="margin-left:10px" 
            slot="reference"
          >
            <i class="fa fa-cog" aria-hidden="true"></i> 结算配置
          </el-button>
        </el-popover>
        <el-popover :offset="250" placement="bottom-end" v-model:visible="visible" width="400">
          <div>
            <el-form
              @submit.native.prevent
              :model="priceForm"
              size="mini"
              style="height:100px"
              :rules="priceRule"
              ref="priceForm"
            >
              <el-form-item style="margin-top:20px" label="价格/比例" prop="reserve_price" label-width="90px">
                <el-input
                  oninput="value=value.replace(/^\D*(\d*(?:\.\d{0,3})?).*$/g, '$1')"
                  v-model="priceForm.reserve_price"
                  style="150px;"
                  placeholder="请输入价格/比例"
                ></el-input>
              </el-form-item>
            </el-form>
            <div style="text-align: center; margin-top: -20px;" type="flex">
                <el-button type="primary" size="medium" @click="submitPrice" >提交</el-button>
                <el-button size="medium" @click="cancelPrice">取消</el-button>
              </div>
          </div>
          <el-button 
            size="mini" 
            type="primary" 
            :disabled="isPrice == false"
            style="margin-left:10px"
            slot="reference"
            @click="compareData()"
          >
            <i class="fa fa-wrench" aria-hidden="true"></i> 修改价格
          </el-button>
        </el-popover>




       
        <el-form
          v-show="!isOpen"
          :inline="true"
          :model="form"
          ref="form"
          size="mini"
          style="margin-right: 0px;margin-top: -38px;margin-bottom:-20px;margin-left:11px"
        >
          <el-row style="margin-top:50px">
            <el-form-item prop="status">
              <span class="ryt-select-text">状态：</span>
              <el-select
                style="width:180px"
                placeholder="请选择状态"
                v-model="form.status"
                class="ryt-select-left3"
                @change="updatePage()"
              >
                <el-option
                  v-for="(item, index) in statusArray"
                  :key="index"
                  :label="item.label"
                  :value="item.value"
                ></el-option>
              </el-select>
            </el-form-item>
            <el-form-item label prop="position_name">
              <el-input
                v-model="form.position_name"
                placeholder="请输入广告位名称"
                style="width: 180px;"
                @change="nameChange($event,'name')"
              />
              <i class="fa fa-search ryt-search-icon" aria-hidden="true"></i>
            </el-form-item>
            <el-form-item label  prop="media_map_code">
              <el-input
                v-model="form.media_map_code"
                style="width:180px"
                placeholder="请输入媒体映射id"
                @change="nameChange($event,'mapID')"
              ></el-input>
              <i class="fa fa-search ryt-search-icon" aria-hidden="true"></i>
            </el-form-item>
            <el-form-item label prop="media_platform_id_arr">
              <el-select
                v-model="form.media_platform_id_arr"
                placeholder="请选择所属平台"
                style="width:180px"
                filterable multiple collapse-tags
                @change="filterMedia($event)"
              >
                <el-option
                  v-for="(item,index) in mediaplatformArr"
                  :key="index"
                  :label="item.label"
                  :value="item.value"
                ></el-option>
              </el-select>
            </el-form-item>
            <el-form-item label prop="media_id_arr">
              <el-select
                v-model="form.media_id_arr"
                placeholder="请选择应用"
                style="width: 180px;"
                filterable
                multiple
                collapse-tags
                @change="updatePage()"
              >
                <el-option
                  v-for="(item, index) in mediaArr"
                  :key="index"
                  :label="item.label"
                  :value="item.value"
                ></el-option>
              </el-select>
            </el-form-item>
            <el-form-item label prop="scenes_type">
              <el-select
                v-model="form.scenes_type"
                placeholder="请选择广告位类型"
                style="width: 180px;"
                filterable
                multiple
                collapse-tags
                @change="updatePage()"
              >
                <el-option
                  v-for="(item, index) in scenesArr"
                  :key="index"
                  :label="item.label"
                  :value="item.value"
                ></el-option>
              </el-select>
            </el-form-item>
          </el-row>
        </el-form>
      </div>
      </template>
      <!-- 按钮事件 start 新建、删除、启用、暂停-->
      
      <!-- *******表格开始**********  -->
      <el-table
        :data="currentTableData"
        ref="configurationTable"
        border
        v-loading="loading"
        size="mini"
        @filter-change="handleFilterChange"
        @selection-change="handleSelectionChange"
        :header-cell-style="{ background: '#f5f5f5' }"
        style="margin-top:-20px"   
      >
        <el-table-column
          type="selection"
          align="center"
          width="55"
          :selectable='selectInit'
        ></el-table-column>

        <!-- <el-table-column
          label="广告位code"
          align="center"
          prop="media_position_code"
          fixed="left"
          width="150px"
        >
          <template slot-scope="scope">
            <el-popover trigger="hover" placement="top">
              <p>{{ scope.row.id }}</p>
              <div slot="reference" class="name-wrapper">
                {{ scope.row.media_position_code }}
              </div>
            </el-popover>
          </template>
        </el-table-column> -->

        <el-table-column
          label="广告位名称"
          align="center"
          prop="media_position_name"
          fixed="left"
          width="200px"
        >
            <template slot-scope="scope">
         <el-popover trigger="hover" placement="top">
          <p>广告位id：{{scope.row.id}}
            <el-button v-clipboard:copy="scope.row.id" v-clipboard:success="onCopy" type="text" size="mini">复制</el-button>
          </p>
          <p>广告位code：{{scope.row.media_position_code}}
            <el-button v-clipboard:copy="scope.row.media_position_name+' '+scope.row.media_position_code+' '+scope.row.media_name+' '+scope.row.media_map_code" v-clipboard:success="onCopy" type="text" size="mini">复制</el-button>
          </p>
           <div slot="reference" class="name-wrapper">{{scope.row.media_position_name}}</div>
        </el-popover>
      </template>
        </el-table-column>

        <el-table-column label="状态" align="center" prop="status">
           <template slot-scope="scope">
              <el-switch
                v-model="scope.row.status"
                :active-value="1"
                :inactive-value="2"
                active-color="#409EFF"
                inactive-color="#DEDEDE"
                @change="switchChange(scope.row,$event)"
                >
              </el-switch>
            </template>
        </el-table-column>

        <el-table-column label="媒体映射id" align="center" prop="media_map_code" width="80">
          <template slot-scope="scope">{{scope.row.media_map_code}}</template>
        </el-table-column>
        <el-table-column label="所属平台" align="center" prop="media_platform_name" width="120">
          <template slot-scope="scope">{{scope.row.media_platform_name}}</template>
        </el-table-column>
        <el-table-column label="所属应用" align="center" prop="media_name" width="200">
          <template slot-scope="scope">{{ scope.row.media_name }}</template>
        </el-table-column>
        <el-table-column label="价格" align="center"  prop="reserve_price">
          <template slot-scope="scope">
            <div v-if="scope.row.medias.business_type==1&&scope.row.medias.business_schema==1&&scope.row.sale_type==1">
              RTB类型应用无价格
            </div>
            <div v-else>
              {{scope.row.reserve_price}}
            </div>
          </template>
        </el-table-column>
        <el-table-column label="结算比例" align="center" width="100" prop="split_account_value">
          <template slot-scope="scope">
            {{scope.row.split_account_value}}%
          </template>
        </el-table-column>
        <el-table-column label="广告位类型" align="center"  prop="scenes_value" width="100">
          <template slot-scope="scope">{{ scope.row.scenes_value }}</template>
        </el-table-column>

        <el-table-column
          label="创建时间"
          align="center"
          prop="created_at"
          width="160px"
        >
          <template slot-scope="scope">{{ scope.row.created_at }}</template>
        </el-table-column>

        <el-table-column
          label="最后修改时间"
          align="center"
          prop="updated_at"
          width="160px"
        >
          <template slot-scope="scope">{{ scope.row.updated_at }}</template>
        </el-table-column>

        <el-table-column
          label="操作"
          align="center"
          fixed="right"
          width="150px"
        >
          <template slot-scope="scope">
            <el-button  @click="handleClick(scope.row)" type="text" size="medium"
              >编辑</el-button
            >
            <el-button  @click="copyClick(scope.row)" type="text" size="medium"
              >复制</el-button
            >
            <el-button  @click="saleClick(scope.row)" type="text">结算</el-button>
          </template>
        </el-table-column>
      </el-table>
      <!-- *******分页开始**********  -->
      <el-pagination
        slot="footer"
        :current-page="listQuery.current"
        :page-size="listQuery.pageSize"
        :total="total"
        :page-sizes="[10, 20, 40, 60]"
        layout="total, sizes, prev, pager, next, jumper"
        style="margin: -10px;"
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
      ></el-pagination>
      <!-- *******分页结束**********  -->
    </d2-container>
  </div>
</template>

<script>
import util from "@/libs/util"; 
export default {
  name: "adsenseList",
  data() {
    return {
      isOpen:false,
      pageID:"",
      pageWhere:"",
      form: {
        media_map_code:"",//媒体映射id
        position_name: "", //广告位名称
        media_platform_id_arr:[],//流量平台
        media_id_arr: [],//所属应用
        scenes_type: [],//广告位类型
        status,
      },
      priorityform: {
        priority_list: [], // 广告位优先级列表
      },
      priorityTitle: "",
      priority_data: [],
      timeValueRelease:[],//导出时间
      pickerOptionsO:{
        disabledDate(time) {
          //禁止选择当前日期和以后日期
          return time.getTime() > Date.now() - 8.64e6;
        },
      },
      radio_time:"",
      
      dialogPriorityVisible: false, //优先级开关

      drawer: false,
      statusArray: [
        {
          label:"全部",
          value:""
        },
        {
          label: "启用",
          value: "1",
        },
        {
          label: "暂停",
          value: "2",
        },
      ],
      mediaplatformArr:[],
      mediaArr: [],
      platformArr: [],
      scenesArr:[],//场景数组
      //表格
      loading: false,
      currentTableData: [],
      listQuery: {
        columns: "",
        orders: "",
        pageSize: 10,
        current: 1, //第几页
      },
      total: 0,
      infoDelete: [], //选中的数组
      idlist: [], //数组id
      //表格
      visibleDete: false, //删除popver框
      visibleUp: false, //启用
      visibleDown: false, //暂停
      forbidden: false,
      deteleOut: false,
      paused: false,
      //表格

      isSale:false,//结算配置按钮
      isSaleidList:false,//结算配置弹框
      isExport_Excel:false,//导出时间弹窗

      saleRule:{
        split_account_limit:[
          { required:true,message:"请选择",trigger:"blur" }
        ],
        split_account_value:[
          {required:true,message:"分成比例不能为空",trigger:"blur"},
          {pattern:/^100$|^(\d|[1-9]\d)(\.\d{1,3})*$/,message:"只能输入1-100以内的数字，最多保留三位小数"}
        ],
      },//结算校验
      saleForm:{
        split_account_limit:"0",
        split_account_value:"100"
      },

      isPrice:false,//修改价格
      visible:false,//修改价格弹窗
      priceForm:{
        reserve_price:"",
      },
      priceRule:{
        reserve_price:[
          {required:true,message:"价格/比例不能为空",trigger:"blur"},
          {pattern:/^100$|^(\d|[1-9]\d)(\.\d{1,3})*$/,message:"只能输入1-100以内的数字，最多保留三位小数"}
        ]
      },//价格校验
    };
  },
  created() {
    this.mediaDown();
    this.getMediaPlatform();
    this.getPositionType();
    this.pageID = this.$route.query.id
    this.pageWhere = this.$route.query.where
  },
  methods: {
    changeExportBtn(){
      //导出全部
      this.timeValueRelease = []
      this.exportTable();
      this.isExport_Excel = false
    },
    async exportTable(){
        //导出功能
        let url = this.baseUrl.ip1+`/sourceSys/mediaPosition/index`
        let params = {
          status:this.form.status,
          limit: this.listQuery.pageSize,
          page: this.listQuery.current,
          media_position_name: this.form.position_name,
          media_map_code:this.form.media_map_code,
          media_platform_id_arr:this.form.media_platform_id_arr,
          media_id_arr: this.form.media_id_arr,
          scenes_type: this.form.scenes_type,
          start_date:this.timeValueRelease[0],
          end_date:this.timeValueRelease[1],
          is_export:1,
        }
        const {data:res} = await this.$http.post(url,params);
        window.location.href = res.url
        this.isExport_Excel = false
        this.timeValueRelease = []
      },   
    onoff(num){
      if(num == '1'){
        this.isOpen = false
      } else if(num == '2'){
        this.isOpen = true
      }
    },
     onCopy(){
      this.$message({
        type: 'info',
        message: '复制成功'
      });
    },
    submitForm(){
      //提交批量配置
      this.$refs.saleForm.validate(valid=>{
        if(valid){
          this.setSplitAccount();
        } else{
          this.$message({
            type: 'info',
            message: '您有未填写的信息，请检查'
          });
        }
      })
    },
    cancel(){
      //取消批量配置
      this.isSaleidList = false
    },
    async setSplitAccount(){
      //提交批量结算配置
      let params = {};
      params.position_id_arr = this.idlist
      params.split_account_limit = this.saleForm.split_account_limit
      params.split_account_value = this.saleForm.split_account_value
      let url = this.baseUrl.ip1 +`/sourceSys/mediaPosition/setSplitAccount`
      const response = await this.$http.post(url,params)
      if(response.code == 200){
        this.$message.success('批量修改成功')
        this.isSaleidList = false
        this.saleForm.split_account_limit = 0;
        this.saleForm.split_account_value = '100'
        this.initAdsenseList();
      }
    },
    submitPrice(){
      //价格批量
      this.$refs.priceForm.validate(valid=>{
        if(valid){
          this.setReservePrice();
        } else{
          this.$message({
            type: 'info',
            message: '您有未填写的信息，请检查'
          });
        }
      })
    },
    cancelPrice(){
      //取消批量价格
      this.visible = false
    },
    async setReservePrice(){
      const response = await this.$http.post(this.baseUrl.ip1+`/sourceSys/mediaPosition/setReservePrice`,
        {
          position_id_arr:this.idlist,
          reserve_price:this.priceForm.reserve_price
        }
      );
      if(response.code == 200){
        this.$message.success('批量修改成功')
        this.visible = false
        this.initAdsenseList();
      }
    },
    selectInit(){
      if(this.visible){
        return false
      } else{
        return true
      }
    },
    compareData(){
      //修改价格校验数据
      console.log(this.infoDelete)
      let mediaCheckArr = [];
      let competeCheckArr = [];
      this.infoDelete.forEach(item=>{
        mediaCheckArr.push(item.media_id);
        competeCheckArr.push(item.sale_type)
      })

      console.log(mediaCheckArr)
      console.log(competeCheckArr)
      let checkCompete = competeCheckArr.every(this.checkData);
      console.log('sale_type',checkCompete)
      let checkMedia = mediaCheckArr.every(this.checkMedia);
      console.log('media_id',checkMedia)
      if(checkCompete&&checkMedia){
        this.visible = false

      } else {
        this.visible = true //不显示
        this.$message.info('所勾选的广告位必须属于同一个非RTB类型的应用')
      }
    },

    checkData(data){
      return data != 1 // 1RTB 2PD 3PDB
    },
    checkMedia(data){
      return data == this.infoDelete[0].media_id
    },





    async inputExcel(e){
      //导入广告位列表
        console.log("上传的数据",e);
     let param = new FormData(); // 创建form对象
     let file = e.target.files[0];
     param.append("file", file); // 通过append向form对象添加数据
     let config = {
        headers: {
          "Content-Type": "multipart/form-data"
        },
        withCredentials: true
      };

      this.loading = true;
      const response = await this.$http
        .post(this.baseUrl.ip1 + "/sourceSys/mediaPosition/import",
          param,
          config,
        )
        .then(response => {
          if (response.code == 200) {
            this.initAdsenseList();
            this.$message.success('导入成功');
            this.loading = false;
          }else{
            this.loading = false;
          }
        }) 
       e.target.value = '';  
    },
      downloadExcel(){
        let url = this.baseUrl.ip1 + `/sourceSys/mediaPosition/importDemo`
        let token =''
        token=util.cookies.get('token_wharf');
        window.location.href = url + "?token=" + token;
      }, 
      changeParam(params){
        const keys = params.id_arr.map(_=>`id_arr[]=${_}`).join('&');
        console.log(keys)
        return `${keys}` ;
    },
    //获取流量平台下拉列表
    async getMediaPlatform(){
      //流量平台下拉框 （所属平台）
      const{ data:res} = await this.$http.get(this.baseUrl.ip1 +`/sourceSys/options/mediaPlatform`)
      let platformList = res;
      platformList.forEach((item)=>{
        this.mediaplatformArr.push({
          label:item.media_platform_name,
          value:String(item.id)
        })
      });
      if(this.$route.query.media_platform_id == undefined){

      }else{
        let idArr = []
        idArr.push(this.$route.query.media_platform_id)
        this.form.media_platform_id_arr = idArr
        this.initAdsenseList();
      }
    },
    //更改输入框刷新列表
    updatePage(){
      this.initAdsenseList();
    },
    async getAdPlatformList() {
      const { data: res } = await this.$http.get(
        this.baseUrl.ip1 + `/getSelectAdPlatformList`
      );
      const lista = res;
      lista.forEach((item, index) => {
        this.platformArr.push({
          value: String(item.id),
          label: item.platform_name,
        });
      });
    },
    filterMedia(platformArr){
      //点击平台筛选应用
      this.mediaDown(platformArr)
    },
    async mediaDown(arr) {
      this.form.media_id_arr = ""
      this.mediaArr.splice(0,this.mediaArr.length)
      const { data: res } = await this.$http.post(this.baseUrl.ip1 + `/sourceSys/options/media`,
        {
          media_platform_id_arr:arr
        }
      );
      const lista = res;
      lista.forEach((item, index) => {
        this.mediaArr.push({
          value: String(item.id),
          label: item.media_name,
        });
      });
      if (this.$route.query.id == undefined) {
      } else {
        this.form.media_id_arr = [String(this.$route.query.id)];
      }
      this.initAdsenseList();
    },
    async initAdsenseList() {
      this.$refs.configurationTable.$el.style.width = "99.99%";
      this.loading = true;
      const { data: res } = await this.$http.post(
        this.baseUrl.ip1 + "/sourceSys/mediaPosition/index",
        {
          limit: this.listQuery.pageSize,
          page: "1",
          status: this.form.status,
          media_position_name: this.form.position_name,
          // media_position_code:this.form.media_position_code,
          media_platform_id_arr:this.form.media_platform_id_arr,
          media_id_arr: this.form.media_id_arr,
          scenes_type: this.form.scenes_type,
          media_map_code:this.form.media_map_code,
        }
      );
      // if (res.code !== 200) return this.$message.error('数据获取失败');
      this.currentTableData = res.data;
      this.listQuery.current = res.current_page;
      this.listQuery.limit = res.per_page;
      this.total = res.total;
      this.loading = false;
    },
    handleFilterChange(filters) {
      //筛选
      if (filters.position_status) {
        //状态
        this.form.position_status = filters.position_status[0];
      } else {
        //广告类型
        this.form.position_type = filters.position_type[0];
      }
      this.initAdsenseList();
    },
    mediaChanges(val) {
      //媒体
      this.form.media_id = val;
      this.initAdsenseList();
    },
    nameChange(event,val) {
      if(val == 'name'){
        this.form.position_name = event;
      } else if(val == 'code'){
        this.form.media_position_code = event
      } else if(val == 'mapID'){
        this.form.media_map_code = event
      }
      this.initAdsenseList();
    },

    operatesOut(row) {
      // 跳投放列表
      this.$router.push({
        path: `/launchManage/mediaAdLaunch`,
        query: {
          id: row.id,
          type: "2",
        },
      });
    },
    settlementClick(row){
      //结算
      this.$router.push({
        path: "adsenseList/shareAdsense",
        query: {
          id: row.id
        }
      });
    },
    cancelDelete(str) {
      //取消删除操作
      this.visibleDete = false;
      this.visibleUp = false;
      this.visibleDown = false;
      if (str == "1") {
        this.$message.error("取消删除操作");
      } else if (str == "2") {
        this.$message.error("取消启用操作");
      } else {
        this.$message.error("取消暂停操作");
      }
    },
    async deleteButtonType() {
      //删除
      this.visibleDete = false;
      let params = {
        id_arr: this.idlist,
        
      };
      let url = this.baseUrl.ip1 + `/sourceSys/mediaPosition/delete`;
      const response = await this.$http.post(url, params)
      .then((response)=>{
        if(response.code == 200){
          this.$message.success("删除成功");
        } else{
          
        }
      })
      // 刷新列表
      this.initAdsenseList();
    },
    async upButtonType() {
      //启用
      this.visibleUp = false;
      let params = {
        id_arr: this.idlist,
        status: 1,
      };
      let url = this.baseUrl.ip1 + `/sourceSys/mediaPosition/updateStatus`;
      const { data: res } = await this.$http.post(url, params);
      this.$message.success("启用成功");
      // 刷新列表
      this.initAdsenseList();
    },
    async downButtonType() {
      //暂停
      this.visibleDown = false;
      let params = {
        id_arr: this.idlist,
        status: 2,
      };
      const { data: res } = await this.$http.post(
        this.baseUrl.ip1 + "/sourceSys/mediaPosition/updateStatus",
        params
      );
      var isOperate = res.isOperate;
      if (isOperate == 1) {
        //需要确认
        this.$confirm("此操作将导致投放暂停，是否继续", "警告", {
          confirmButtonText: "确定",
          cancelButtonText: "取消",
          type: "warning",
          callback: async (action) => {
            if (action == "confirm") {
              this.putIn();
            } else {
              this.$message.error("取消暂停操作");
            }
          },
        });
      } else {
        this.putIn();
      }
    },
    async putIn() {
      //暂停投放
      let params = {
        id_arr: this.idlist,
        status: 2,
      };
      let url = this.baseUrl.ip1 + `/sourceSys/mediaPosition/updateStatus`;
      const { data: res } = await this.$http.post(url, params);
      this.$message.success("暂停成功");
      // 刷新列表
      this.initAdsenseList();
    },
    async switchChange(val,event){
      console.log(val,event,this.idlist);
      var that = this;
      var idArr = [];
      idArr.push(val.id);
      let params = { status: event, id_arr: idArr};
      const response = await this.$http.post(this.baseUrl.ip1 + `/sourceSys/mediaPosition/updateStatus`,params)
      .then(function(response){
        if(response.code==200){
          that.$message.success('状态修改成功')
              // 刷新列表
          this.initAdsenseList();
         } else{
            // 刷新列表
          this.initAdsenseList();
         }
      })
    },
    handleSelectionChange(data) {
      this.infoDelete = data;
      let idlist = [];
      this.infoDelete.map((item) => {
        idlist.push(item.id);
      });
      this.idlist = idlist;
      let a1 = false;
      let a2 = false;
      if (data.length > 0) {
        data.forEach((item) => {
          if (item.status == 2) {
            a1 = true;
          }
          if (item.status == 1) {
            a2 = true;
          }
          if (a1 && a2) {
            this.forbidden = true;
            this.deteleOut = false;
            this.paused = true;
          } else if (a1) {
            this.forbidden = true;
            this.deteleOut = true;
            this.paused = false;
          } else if (a2) {
            this.forbidden = false;
            this.deteleOut = false;
            this.paused = true;
          } else {
            this.forbidden = true;
            this.deteleOut = true;
            this.paused = true;
          }
        });
        this.isSale = true
        this.isPrice = true
      } else {
        this.forbidden = false;
        this.deteleOut = false;
        this.paused = false;
        this.isSale = false;
        this.isPrice = false;
      }
    },
    handleFormSubmit() {
      //新建
      this.$router.push({
        path: "adsenseList/editAdsenseList",
        query: {
          id: "",
          type: "1",
        },
      });
    },
    handleClick(row) {
      //编辑
      this.$router.push({
        path: "adsenseList/editAdsenseList",
        query: {
          id: row.id,
          type: "2",
        },
      });
    },
    copyClick(row) {
      //复制
      this.$router.push({
        path: "adsenseList/editAdsenseList",
        query: {
          id: row.id,
          type: "3",
        },
      });
    },
    saleClick(row){
      //结算
      this.$router.push({
        path: `adsenseList/shareAdsense`,
        query:{
          id:row.id
        }
      })
    },
    priorityClick(row) {
      this.getPriorityList(row);
    },
    async getPriorityList(row) {
      //templatePosition/priorityList
      // 所属模版下拉列表

      const { data: res } = await this.$http.get(
        this.baseUrl.ip1 +
          `/mediaPosition/priorityList?media_position_id=${row.id}&media_position_code=${row.media_position_code}`
      );
      const tempPriorityList = res.priority_list;
      this.priorityTitle = res.media_position_name;
      // this.priorityform.priority_list = res;
      if (tempPriorityList && tempPriorityList.length > 0) {
        this.priorityform.priority_list = [];
        this.dialogPriorityVisible = true;
        tempPriorityList.forEach((item, index) => {
          this.priorityform.priority_list.push({
            ad_platform_map_id: item.ad_platform_map_id, //投放广告位id
            // operate_name: item.operate_name,
            // operate_type: item.operate_type,
            budget_name:item.budget_name,
            ad_platform_name: item.ad_platform_name,
            priority: item.priority,
            isEdit: false,
          });
        });
      } else {
        this.$message.info("没有进行投放，不需要修改优先级");
      }
    },


    handleSizeChange(val) {
      this.listQuery.pageSize = val;
      this.initAdsenseList();
    },
    async handleCurrentChange(val) {
      this.listQuery.current = val;
      this.loading = true;
      const { data: res } = await this.$http.post(
        this.baseUrl.ip1 + "/sourceSys/mediaPosition/index",
        {
          position_style:2,//媒体类别：1为直媒 2为流量平台媒体
          limit: this.listQuery.pageSize,
          page: this.listQuery.current,
          status: this.form.status,
          media_position_name: this.form.position_name,
          // media_position_code:this.form.media_position_code,
          media_platform_id_arr:this.form.media_platform_id_arr,
          media_id_arr: this.form.media_id_arr,
          scenes_type: this.form.scenes_type,
          media_map_code:this.form.media_map_code,
        }
      );
      // if (res.code !== 200) return this.$message.error('数据获取失败');
      this.currentTableData = res.data;
      this.listQuery.current = res.current_page;
      this.listQuery.limit = res.per_page;
      this.total = res.total;
      this.loading = false;
    },
    async getPositionType(){
    //广告位类型数组
    const {data:res} = await this.$http.get(this.baseUrl.ip1+'/scene/list')
    let positionList = res;
    this.scenesArr = positionList
  }
  },
};
</script>
<style lang="scss" >
.adsenseList {
  
  .adsenseList_header {
    margin-top: 20px;
    width:100%;
    min-height: 88px; 
    background-color: white;
    box-shadow: 0 2px 8px 0 #dff3ff;
    padding-bottom: 5px;
    border-radius: 8px;
  }
  .el-table__header tr,
      .el-table__header th {
        padding: 0;
        height: 10px;
    }
    .el-table__body tr,
      .el-table__body td {
        padding: 0;
        height: 10px;
    }
  :focus {
    outline: 0;
  }
  .img{
    width: 70px;
  height: 70px;
  }
  #uploadFild{
    position: absolute;
    margin-left: 10px;
    margin-top: 10px;
    width: 80px;
    height: 33px;
    opacity: 0;
}

#uploadBtn{
    margin-left: 10px;
    margin-right: 10px;
    margin-top: 5px;
    background: #409EFF;
    border: none;
    width: 80px;
    height: 33px;
    font-size: 13px;
    color: white;
    border-radius: 3px;
}

}

</style>
