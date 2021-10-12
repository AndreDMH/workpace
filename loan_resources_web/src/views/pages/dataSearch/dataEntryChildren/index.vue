<template>
  <div class="dataEntryChildren">
    <d2-container>
      <template slot="header">
        <div class="flex ryt-right-top">
          <div class="line_header"></div>录入支出
        </div>
        <!--***** 数据筛选 *****-->
        <div class="menuPartClass"> 
        <el-form  
          :inline="true"
          :model="form"
          ref="form"
          size="small"
          style="margin-right: 0px;margin-top: -32px;margin-bottom:-20px" >

          <el-row style="margin-top:40px;margin-left:11px">
             <el-form-item label prop="media_platform_id_arr">
              <el-select
                v-model="form.media_platform_id_arr"
                style="width:180px;maingin-top:11px"
                placeholder="选择所属平台"
                filterable
                size=mini
                multiple
                collapse-tags
                @change="changeStatus($event)"
              >
                <el-option
                  v-for="(item,index) in trafficPlatformArr"
                  :key="index"
                  :label="item.label"
                  :value="item.value"
                ></el-option>
              </el-select>
            </el-form-item>
            <el-form-item label prop="media_id_arr">
              <el-select 
                v-model="form.media_id_arr"
                placeholder="选择所属应用"
                style="width: 180px;"
                filterable
                size=mini
                multiple
                collapse-tags
                @change="updateMediaPage($event)"
              >
                <el-option
                  v-for="(item,index) in mediaArr"
                  :key="index"
                  :label="item.label"
                  :value="item.value"
                ></el-option>
              </el-select>
            </el-form-item>
             <el-form-item label prop="media_position_name">
              <el-input
                size=mini
                v-model="form.media_position_name"
                placeholder="请输入广告位名称"
                style="width: 180px;"
                @change="nameChange($event)"
              />
              <i class="fa fa-search ryt-search-icon" aria-hidden="true"></i>
            </el-form-item>


              <el-date-picker
                v-model="form.last_entry_date"
                style="width: 180px;margin-top:3px"
                type="date"
                size=mini
                placeholder="选择最后发布日期"
                format="yyyy-MM-dd"
                value-format="yyyy-MM-dd"
                @change="dateChange"
                :picker-options="pickerOptions"
              ></el-date-picker>



            <div class="" style="float:right;margin-top:10px">

              <el-button type="primary" size="mini"  @click="inputButton">
                <d2-icon name="download" /> 下载模板
              </el-button>
             

              <input
                id="uploadFild"
                name="file"
                type="file"
                size="mini"
                @change="exportBtn"
                style=""
              />
              <button type="primary" style="height:26px;" size='mini' id="uploadBtn">
                <d2-icon name="upload" /> 导入列表
              </button>

               <el-button type="primary" style="margin-right:11px;" size="mini" @click="editdataEntry">
                录入数据
              </el-button>

              
              <!-- <el-popover placement="bottom-end" width="250" v-model="visibleDete">
                <p>请选择日期</p>
                
                <el-date-picker
                  :clearable="false"
                  v-model="timeValue"
                  style="width: 240px; margin-right: 20px"
                  type="daterange"
                  unlink-panels
                  range-separator="至"
                  start-placeholder="开始日期"
                  end-placeholder="结束日期"
                  format="yyyy-MM-dd"
                  value-format="yyyy-MM-dd"
                  @change="dateShareChange"
                  :picker-options="pickerOptionsO"
                ></el-date-picker>


                <el-button 
                  type="primary" 
                  size="small" 
                  slot="reference"
                  style="margin-right:10px"
                  >
                <d2-icon name="download" /> 纷享报表
              </el-button>
              </el-popover> -->


             
                 


              <!-- <el-button type="primary" size="small" @click="previewClick" >{{buttonName}}</el-button>
              <el-button v-show="buttonName == '发 布'" type="primary" plain size="small" @click="previewFalseClick" >取 消</el-button> -->

          </div>
          </el-row>
        </el-form>
      </div>
      </template>
    


      
      <!--***** 表格展示 *****-->
     
      <!-- *******表格开始**********  -->
        <el-table
          :data="currentTableData"
          v-loading="loading"
          size="medium" 
          style="margin-top:-10px"
          border 
          :row-key="getRowKeys"
          @selection-change="handleSelectionChange"
          :header-cell-style="{background:'#f5f5f5'}"
        >
          <el-table-column type="selection" :reserve-selection="true" align="center"   width="55">
        </el-table-column>
          
          <el-table-column
            align="center"
            label="广告位名称"
            prop="media_position_name"
          >
            <template slot-scope="scope">{{ scope.row.media_position_name }}</template>
          </el-table-column>

          <el-table-column
            align="center"
            label="所属平台"
            prop="media_platform_name"
          >
           <template slot-scope="scope">{{ scope.row.media_platform_name == ""?"-":scope.row.media_platform_name }}</template>
          </el-table-column>

          <el-table-column label="所属应用" align="center" prop="media_name">
           <template slot-scope="scope">{{ scope.row.media_name }}</template>
         </el-table-column>
    
          <el-table-column
            align="center"
            label="最后发布时间"
            prop="last_entry_date"
          >
            <template slot-scope="scope">{{ scope.row.last_entry_date == ""?"-":scope.row.last_entry_date }}</template>
          </el-table-column>
       
        </el-table>
      <!--***** 表格结束 *****-->
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
  data() {
    return {
      loading:false,
      visibleDete:false,
      infoList:[],
      currentTableData:[],//表格数组
      listQuery: {
        columns: "",
        orders: "",
        pageSize: 10,
        current: 1 //第几页
      },
      total: 0,
      pickerOptions:{
        disabledDate(time) {
          //禁止选择当前日期和以后日期
          return time.getTime() > Date.now() - 8.64e7;
        },
      },

      timeValue:[],
      is_realTimeShow:false,

      form:{
        media_platform_id_arr:[],
        media_id_arr:[],
        media_position_name:"",
        last_entry_date:"",
      },

      trafficPlatformArr:[],
      mediaArr:[],
      platformArr: [],

    

     
      tableRules: {
        writeData: [
          
          { required: true, message: "必填", trigger: "blur" },
          {
            pattern: /^(0|\+?[1-9][0-9]*)$/,
            message: "正整数",
            trigger: "blur"
          }
        ],
      },

      listDataArray:[],
      mediasArray: [], //媒体下拉数据

      form: {
        ad_name: "", //广告主
        media_name: [], // 媒体
      },

      buttonName:"预 览",
      cancleType:"1",
      
      renderFunc(h, option) {
        return (
          <span>
            {option.key} - {option.label}
          </span>
        );
      },
      pickerOptionsO: {
        disabledDate(time) {
          //禁止选择当前日期和以后日期
          return time.getTime() > Date.now() - 8.64e7;
        },
        // shortcuts: [],
      },
    };
  },
  
  created() {
    this.getMediaPlatform()
    this.getMedia()


    this.initAdsenseList();
    // this.getmediaData();//所有媒体数据
    this.getAdPlatformList();
    this.getSevenDayDate();
  },
  mounted() {
  },
  methods: {
    dateShareChange(val) {
      this.timeValue = val;
      this.inputShareButton()
      console.log(this.timeValue[0])
    },
    getSevenDayDate() {
      //时间 默认最近7天安排上
      const end = new Date();
      const start = new Date();
      start.setTime(start.getTime() - 3600 * 1000 * 24 * 7);
      //时间格式转换
      const endResDate =
        end.getFullYear() + "-" + (end.getMonth() + 1) + "-" + end.getDate();
      const startResDate =
        start.getFullYear() +
        "-" +
        (start.getMonth() + 1) +
        "-" +
        start.getDate();
      this.timeValue = [startResDate, endResDate];
    },
    // 指定一个唯一标识。id或者其他唯一的
    getRowKeys (row) {
        return row.id;
    },
    //获取数据列表
   async initAdsenseList() {
      this.loading = true;
      const { data: res } = await this.$http.post(
        this.baseUrl.ip1 + "/sourceSys/mediaPosition/index",
        {
          limit: this.listQuery.pageSize,
          page: "1",
          position_style:0,//媒体类别：1为直媒 2为流量平台媒体
          media_platform_id_arr:this.form.media_platform_id_arr,
          media_id_arr:this.form.media_id_arr,
          media_position_name:this.form.media_position_name,
          last_entry_date:this.form.last_entry_date,
          source:1,
        }
      );
      // if (res.code !== 200) return this.$message.error('数据获取失败');
      this.currentTableData = res.data;
      this.listQuery.current = res.current_page;
      this.listQuery.limit = res.per_page;
      this.total = res.total;
      this.loading = false;
      console.log('跳转数据',this.currentTableData)
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
          position_style:0,//媒体类别：1为直媒 2为流量平台媒体
          limit: this.listQuery.pageSize,
          page: this.listQuery.current,
          media_platform_id_arr:this.form.media_platform_id_arr,
          media_id_arr:this.form.media_id_arr,
          media_position_name:this.form.media_position_name,
          last_entry_date:this.form.last_entry_date,
          source:1
        }
      );
      // if (res.code !== 200) return this.$message.error('数据获取失败');
      this.currentTableData = res.data;
      this.listQuery.current = res.current_page;
      this.listQuery.limit = res.per_page;
      this.total = res.total;
      this.loading = false;
    },
     handleSelectionChange(data) {
       console.log('选择的数据',data);
      this.infoList = data;
      let codelist = [];
      this.infoList.map((item) => {
        codelist.push(item.media_position_code);
      });
      this.codelist = codelist;
      window.localStorage.setItem('media_position_code',this.codelist);
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

    async getMediaPlatform(){
      this.loading = false
      //流量平台下拉框 （所属平台）
      const{ data:res} = await this.$http.get(this.baseUrl.ip1 +`/sourceSys/options/mediaPlatform`)
      let platformList = res;
      platformList.forEach((item)=>{
        this.trafficPlatformArr.push({
          label:item.media_platform_name,
          value:item.id
        })
      });
    },
    nameChange(event) {
      this.form.media_position_name = event;
      this.initAdsenseList();
    },
    changeStatus(event){
      this.form.media_platform_id_arr = event;
      this.getMedia(event)
      this.initAdsenseList();
    },
     updateMediaPage(event){
      this.form.media_id_arr = event;
      this.initAdsenseList();
    },
    dateChange(event){
      console.log(event)
      var dateee = new Date(event).toJSON();
      let dateStr = new Date(+new Date(dateee) + 8 * 3600 * 1000).toISOString().replace(/T/g, ' ').replace(/\.[\d]{3}Z/, '');
      if(event == null){
        this.form.last_entry_date = ""
      } else {
        this.form.last_entry_date = event
      }
      // if(dateStr!="1970-01-01 08:00:00"){
      //    this.form.last_entry_date = dateStr
      // } else {
      //   this.form.last_entry_date = ""
      // }
      this.initAdsenseList();
    },

    async getMedia(arr){
      //媒体下拉框
      this.form.media_id_arr = ""
      this.mediaArr.splice(0,this.mediaArr.length)
      const { data: res } = await this.$http.post(this.baseUrl.ip1 + `/sourceSys/options/media`,
        {
          media_platform_id_arr:arr
        }
      );
      const lista=res;
      lista.forEach((item,index)=>{
        this.mediaArr.push({
          value:item.id,
          label:item.media_name
        })
      })
    },
    inputButton(){
      //导出模板
      let url = this.baseUrl.ip1+'/enterData/header'
      let token =''
      token=util.cookies.get('token_wharf');
      window.location.href = url + "?token=" + token;
    },
    inputShareButton(){
      //导出纷享报表
      let url = this.baseUrl.ip1+`/enterData/excel/fxk`
      var params={
            start_date: this.timeValue[0],
            end_date:this.timeValue[1],
      }
      var newpa = this.changeParam(params);
      let token =''
      token=util.cookies.get('token_wharf')
      window.location.href = url + "?token=" + token +newpa
    },
    changeParam(params){
      return JSON.stringify(params)
          .replace(/:/g, "=")
          .replace(/,/g, "&")
          .replace(/{/g, "&")
          .replace(/}/g, '')
          .replace(/"/g,'' )
    },
    editdataEntry(){
      if(this.infoList.length==0){
        this.$message({
          type:"info",
          message:"请至少勾选一项数据才能进行录入"
        })
      } else{
       let accountInfoJson = JSON.stringify(this.codelist);
        //跳转录入数据页面
        this.$router.push({
          path:"dataEntryChildren/editdataEntryChildren",
          query:{
            showStyle:"1",
            data:accountInfoJson,
          }
        })
      }
    },
    
  
    
   
    

    //导入数据elx
    async exportBtn(e){
    // //  // 上传表格
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
        .post(this.baseUrl.ip1 + "/enterData/load/excel",
          param,
          config,
        )
        .then(response => {
          if (response.code == 200) {
            this.listDataArray = response.data;
            this.buttonName = "发 布";
            this.$message.success('导入成功');
            this.loading = false;
            //导入成功跳转录数发布页面
            let enterData = []
            enterData = response.data
            // window.localStorage.setItem('enterData',JSON.stringify(enterData))
            let accountInfoJson = JSON.stringify(enterData);
         
            this.$router.push({
              path:"dataEntryChildren/editdataEntryChildren",
              query:{
                showStyle:"2",
                showData:accountInfoJson,
              }
            })
          }else{
            this.loading = false;
          }
        }) 
       e.target.value = '';  
    },
   
  }
};
</script>
<style lang="scss" >
.el-table .success-row {
  background: #f0f9eb;
}


#uploadFild{
    position: absolute;
    margin-left: 20px;
    margin-top: 15px;
    width: 80px;
    height: 33px;
    opacity: 0;
}
#uploadBtn{
    margin-left: 20px;
    margin-right: 20px;
    margin-top: 15px;
    background: #409EFF;
    border: none;
    width: 85px;
    height: 33px;
    font-size: 13px;
    color: white;
    border-radius: 3px;
}
.dataEntryChildren {
   .menuPartClass{
      margin-top: 20px;
      width:100%;
      min-height: 68px; 
      background-color: white;
      box-shadow: 0 2px 8px 0 #dff3ff;
      padding-bottom: 5px;
      padding-top: 2px;
      border-radius: 8px;
    }
    .el-table__header tr,
      .el-table__header th {
        padding: 0;
        height: 40px;
    }
    .el-table__body tr,
      .el-table__body td {
        padding: 0;
        height: 40px;
    }
  .dataEntryChildren_header_one {
    width: 80px;
    height: 35px;
    font-family: "微软雅黑 Bold", "微软雅黑 Regular", 微软雅黑;
    font-weight: 700;
    font-style: normal;
    text-align: left;
    line-height: 35px;
    color: #333333;
    margin-left: 20px;
    margin-top: 10px;
    float: left;
  }
  

  .dataEntryChildren_header_two {
    // width: 80px;
    // height: 35px;
    font-family: "微软雅黑 Bold", "微软雅黑 Regular", 微软雅黑;
    font-weight: 700;
    font-style: normal;
    text-align: left;
    line-height: 35px;
    color: #333333;
    margin-left: 20px;
    margin-top: 10px;
    float: left;
  }
  .dataEntryChildren_header_two_right {
    float: right;
    padding-right: 20px;
  }
   .configBtnNew{
    float: right;
     margin-left: 20px;
     margin-top: 20px;
  }
  .configBtn {

    margin-left: 20px;

  }
 
  .dataEntryChildren_view_one {
    margin-top: 60px;
    margin-left: 60px;
    margin-right: 60px;
    display: flex;
    flex-wrap: wrap;
    .box {
      display: flex;
      // width: 100%;
      flex-direction: row;
      flex-wrap: wrap;
      float: left;
      .view_item {
        flex: 1;
        width: 200px;
        height: 108px;
        margin-left: 50px;
        margin-top: 20px;
        .cardName {
          margin-top: -10px;
          display: flex;
          justify-content: center;
          font-family: "微软雅黑 Bold", "微软雅黑 Regular", 微软雅黑;
          font-weight: 400;
          font-size: 14px;
          font-style: normal;
          text-align: center;
          color: #636363;
          float: center;
        }
        .cardValue {
          margin-top: 8px;
          display: flex;
          justify-content: center;
          font-family: "微软雅黑 Bold", "微软雅黑 Regular", 微软雅黑;
          font-weight: 700;
          font-size: 20px;
          font-style: normal;
          text-align: center;
          color: #333333;
          float: center;
        }
        .cardInfor {
          margin-top: 8px;
          display: flex;
          justify-content: center;
          font-family: "微软雅黑 Bold", "微软雅黑 Regular", 微软雅黑;
          font-weight: 500;
          font-size: 15px;
          font-style: normal;
          text-align: center;
          color: #707070;
          float: center;
        }
      }
    }
  }
  .dataEntryChildren_header_three {
    height: 50px;
    display: flex;
    width: 100%;
    justify-content: space-between;
    margin-top: 10px;
    .dataEntryChildren_header_three_left {
      margin-bottom: 20px;
    }
    .dataEntryChildren_header_three_right {
      margin-right: 20px;
    }
  }
  .dataEntryChildren_view_two {
    height: 520px;

    .chartStyle {
      margin-top: 10px;
      margin-left: 0px;
      width: 1200px;
      height: 500px;
    }
  }
  .tanceng {
    .el-transfer__buttons {
      display: inline-block;
      vertical-align: middle;
      padding: 0 30px;
      /* justify-content: center; */
      margin-top: 80px;
      text-align: center;
    }
  }
}
</style>
