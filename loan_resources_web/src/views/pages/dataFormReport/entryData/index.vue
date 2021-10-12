<template>
  <div class="entryData">
    <d2-container>
      <template slot="header">
        <div class="flex ryt-right-top">
          <div class="line_header"></div>发布数据
        </div>
        <!-- 数据筛选 -->
        <div class="menuPartClass">
          <el-form
            :inline="true"
            :model="form"
            size="mini"
            label-width="80px"
          >
            <el-row >
              <el-button
                class="el-icon-refresh"
                size="mini"
                @click="refreshPageClick"
                style="float: right; margin-top: 10px;margin-right:10px"
                >刷新</el-button>
              <el-form-item
                label-width="80px"
                style="margin-top :10px;margin-bottom:0px"
                prop="media_platform_id_arr"
              >
                <el-select
                  style="width:180px; margin-left:11px"
                  v-model="form.media_platform_id_arr"
                  placeholder="请选择平台"
                  filterable
                  size="mini"
                  multiple
                  collapse-tags
                  @change="filterMedia($event)"
                >
                  <el-option
                    v-for="(item,index) in mediaPlatformArr"
                    :key="index"
                    :label="item.label"
                    :value="item.value"
                    :id="item.id"
                  ></el-option>
                </el-select>
              </el-form-item>
              <el-form-item
                label-width="80px"
                style="margin-top: 10px;margin-bottom:0px"
                prop="media_id_arr"
              >
                <el-select
                  style="width:180px; "
                  v-model="form.media_id_arr"
                  placeholder="请选择应用"
                  filterable
                  size="mini"
                  multiple
                  collapse-tags
                  @change="filterPosition($event)"
                >
                  <el-option
                    v-for="(item, index) in mediaArr"
                    :key="index"
                    :label="item.label"
                    :value="item.value"
                    :id="item.id"
                  ></el-option>
                </el-select>
              </el-form-item>
              <el-form-item
                label-width="80px"
                style="margin-top: 10px;margin-bottom:0px"
                prop="position_id_arr"
              >
                <el-select
                  v-model="form.position_id_arr"
                  placeholder="请选择广告位"
                  style="width:180px; "
                  filterable
                  size="mini"
                  multiple
                  collapse-tags
                  @change="filterpos()"
                >
                  <el-option
                    v-for="(item,index) in positionArr"
                    :key="index"
                    :label="item.label"
                    :value="item.value"
                  ></el-option>
                </el-select>
              </el-form-item>
              <el-form-item
                label-width="80px"
                style="margin-top: 10px;margin-bottom:0px"
              >
                <el-date-picker
                  :clearable="false"
                  v-model="timeValue"
                  style="width: 220px; margin-right: 20px"
                  type="daterange"
                  size="mini"
                  unlink-panels
                  range-separator="至"
                  start-placeholder="开始日期"
                  end-placeholder="结束日期"
                  format="yyyy-MM-dd"
                  value-format="yyyy-MM-dd"
                  @change="dateChange"
                  :picker-options="
                    
                    pickerOptionsO
                    "
                ></el-date-picker>
              </el-form-item>
<!-- type="primary" -->
             <div class="listMenuPartClass">
               <el-button type="primary" size="mini" style="float:right;" @click="exportBtn">
                <d2-icon name="plus" />导出
              </el-button>
              <el-button 
            size="mini" 
            type="primary"
            style="float:right;margin-right:10px"
            @click="inputShareButton()"
          >
            <d2-icon name="download" /> 纷享报表
          </el-button>
              </div>

            </el-row>
          </el-form>
        </div>
      </template>
      <!-- ************折线图*************** -->

     
        <!-- **********表格开始**********8 -->
        <el-table
        
          border
          ref="multipleSelection"
          :data="listDataArray"
          size="medium"
          style="margin-top:-20px"
          @sort-change="sortChange"
          :header-cell-style="{ background: '#f5f5f5' }"
          :row-class-name="tableRowClassName"
        >
          <el-table-column
            label="日期"
            align="center"
            prop="publish_date"
            key="1"
            fixed
            v-if="is_date == 1"
          >
            <template slot-scope="scope">{{scope.row.publish_date ? scope.row.publish_date : "-"}}</template>
          </el-table-column>
          <el-table-column
            label="平台名称"
            align="center"
            min-width="120"
            prop="media_platform_name"
            fixed
            v-if="is_media_platform == 1"
          >
            <template slot-scope="scope">{{scope.row.media_platform_name ? scope.row.media_platform_name : "-"}}</template>
          </el-table-column>
          <el-table-column
            label="应用名称"
            align="center"
            min-width="120"
            prop="media_name"
            fixed
            v-if="is_media == 1"
          >
            <template slot-scope="scope">{{scope.row.media_name ? scope.row.media_name : "-"}}</template>
          </el-table-column>
          <el-table-column
            label="媒体类型"
            align="center"
            min-width="120"
            prop="media_type"
            fixed
            v-if="is_media_type == 1"
          >
            <template slot-scope="scope">{{scope.row.media_type ? scope.row.media_type : "-"}}</template>
          </el-table-column>
          <el-table-column
            label="媒体侧结算方式"
            align="center"
            min-width="120"
            prop="media_sale_type"
            fixed
            v-if="is_media_sale == 1"
          >
            <template slot-scope="scope">{{scope.row.media_sale_type ? scope.row.media_sale_type:"-"}}</template>
          </el-table-column>
          <el-table-column
            label="广告位名称"
            align="center"
            min-width="120"
            prop="position_name"
            fixed
            v-if="is_position == 1"
          >
            <template slot-scope="scope">{{scope.row.position_name ? scope.row.position_name : "-"}}</template>
          </el-table-column>
          <el-table-column
            label="转化数"
            align="center"
            min-width="120"
            prop="publish_right_dp_pv"
          >
            <template slot-scope="scope">{{scope.row.publish_right_dp_pv}}</template>
          </el-table-column>
          <el-table-column
            label="支出"
            align="center"
            min-width="120"
            prop="publish_cost"
          >
            <template slot-scope="scope">{{scope.row.publish_cost}}</template>
          </el-table-column>
          <!-- <el-table-column
            label="录入支出"
            align="center"
            min-width="120"
            prop="input_spending"
          >
            <template slot-scope="scope">{{scope.row.input_spending}}</template>
          </el-table-column> -->
        </el-table>
      <el-pagination
        slot="footer"
        :current-page="listQuery.current"
        :page-size="listQuery.pageSize"
        :total="total"
        :page-sizes="[10,20,40,60]"
        layout="total, sizes, prev, pager, next, jumper"
        style="margin:-10px;"
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
      ></el-pagination>
    </d2-container>
    <div v-if="dialogVisible">
      <selectDialog
        :dialogVisible="dialogVisible"
        :dataLists="dialogDataList"
        :selectColumnArr="selectColumnArr"
        :isCanSave="isCanSave"
        :saveName="saveColumnName"
        @clickPlay="clickPlay"
        @handleClose="handleClose"
        @clearAll="clearAll"
      ></selectDialog>
    </div>
  </div>
</template>

<script>
import selectDialog from "../../../../components/selectData/selectDialog.vue";
import util from "@/libs/util";
export default {
  name:"entryData",
  components:{
    selectDialog
  },
  data(){
    return{
      form:{
        media_platform_id_arr:[],
        media_id_arr:[],
        position_id_arr:[],
      },
      mediaPlatformArr:[],//流量平台数组
      mediaArr:[],//媒体数组
      positionArr:[],//广告位数组
      adPlatformArr:[],//广告平台
      platformFilterArr:[],//流量平台id筛选数组
      mediaFilterArr:[],//媒体平台id筛选数组
      timeValue:[],//时间
      is_ratio:"0",//是否对比
      isAbleIndex: true, //是否可选择指示器
      chartData: {},
      dataListTwo:[],//选择指标数组
      otherSelectIndexList:[],//指标数组
      selectIndexOne:"",//选择指标
      selectIndexTwo:"",//选择指标

      listQuery: {
        pageSize: 10,
        current: 1,
        sort: "",
        order: "",
      },
      total:0,

      checkList:[],
      checkListGroup:[],

      listDataArray:[],//列表数据
      showConfigData:[],

      dialogVisible:false,
      dialogDataList:[],
      selectColumnArr:[],
      saveColumnName:"",
      isCanSave: true,
      isStyle:true,
      showColumnData: [], // 底部表格默认选中的列数据
      AllColumnData:[],// 底部表格全部的列数据
      isChartDataShow:false,//折线图是否展示


      is_date: 1,
      is_media_platform:1,
      is_media: 1,
      is_media_type: 0,
      is_media_sale:0,
      is_position: 1,
      is_scenes:0,
      is_platfrom: 0,
      is_budget:0,
      is_platfrom_sale:0,
      is_ad_name:0,
      is_plan_name:0,
      is_unit_name:0,

      is_realTimeShow:true,
      isDisableCharts: false,

      selectTimeType:1, 

      pickerOptionsO: {
        disabledDate(time) {
          //禁止选择当前日期和以后日期
          return time.getTime() > Date.now() - 8.64e7;
        },
        shortcuts: [],
      },
      pickerOptions: {
        disabledDate(time) {},
        shortcuts: [
          {
            text: "今日",
            onClick(picker) {
              const end = new Date();
              const start = new Date();
              picker.$emit("pick", [start, end]);
            },
          },
          {
            text: "昨日",
            onClick(picker) {
              const date = new Date();
              date.setTime(date.getTime() - 3600 * 1000 * 24);
              picker.$emit("pick", [date, date]);
            },
          },
          {
            text: "本周",
            onClick(picker) {
              const start = new Date();
              const end = new Date();
              const nows = start.getDay() || 7;
              start.setTime(start.getTime() - 3600 * 1000 * 24 * (nows - 1));
              picker.$emit("pick", [start, end]);
            },
          },
          {
            text: "上周",
            onClick(picker) {
              const dataValue = new Date();
              const year = dataValue.getFullYear();
              const month = dataValue.getMonth() + 1;
              const day = dataValue.getDate();
              var thisWeekStart; //本周周一的时间
              if (dataValue.getDay() == 0) {
                //周天的情况；
                thisWeekStart =
                  new Date(year + "/" + month + "/" + day).getTime() -
                  (dataValue.getDay() + 6) * 86400000;
              } else {
                thisWeekStart =
                  new Date(year + "/" + month + "/" + day).getTime() -
                  (dataValue.getDay() - 1) * 86400000;
              }
              const prevWeekStart = thisWeekStart - 7 * 86400000; //上周周一的时间
              const prevWeekEnd = thisWeekStart - 1 * 86400000; //上周周日的时间
              const start = new Date(prevWeekStart); //开始时间
              const end = new Date(prevWeekEnd); //结束时间
              picker.$emit("pick", [start, end]);
            },
          },
          {
            text: "本月",
            onClick(picker) {
              const end = new Date();
              const start = new Date();
              start.setDate(1);
              picker.$emit("pick", [start, end]);
            },
          },
          {
            text: "上月",
            onClick(picker) {
              const start = new Date();
              const end = new Date(start);
              end.setMonth(start.getMonth());
              start.setMonth(start.getMonth() - 1);
              end.setDate(0);
              start.setDate(1);
              picker.$emit("pick", [start, end]);
            },
          },
          {
            text: "最近七天",
            onClick(picker) {
              const end = new Date();
              const start = new Date();
              start.setTime(start.getTime() - 3600 * 1000 * 24 * 6);
              picker.$emit("pick", [start, end]);
            },
          },
          {
            text: "最近30天",
            onClick(picker) {
              const end = new Date();
              const start = new Date();
              start.setTime(start.getTime() - 3600 * 1000 * 24 * 30);
              picker.$emit("pick", [start, end]);
            },
          },
        ],
      },
    }
  },
  created(){
    this.getMediaPlatform();
    this.getMedia();
    this.getPosition();
    // this.getadPlatform();
    this.getSevenDayDate();
    // this.initAllColumnTwo();//获取指标
    // this.getcheckList();//固定列
    // this.initAllColumn();
    this.fixedForm();
  },
  methods:{
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
    dateChange(val) {
        //天
      this.timeValue = val;
      // this.getChartData();
      // this.initAllColumn();
      this.fixedForm();
    },
    getSevenDayDate() {
      //时间 默认最近7天安排上
      const end = new Date();
      const start = new Date();
      start.setTime(start.getTime() - 3600 * 1000 * 24 * 7);
      //时间格式转换
      const endResDate =
        end.getFullYear() + "-" + (end.getMonth() + 1) + "-" + (end.getDate()-1);
      const startResDate =
        start.getFullYear() +
        "-" +
        (start.getMonth() + 1) +
        "-" +
        start.getDate();
      this.timeValue = [startResDate, endResDate];
      // this.getListData();
    },
    timeCompares(sDate1, sDate2) {
      //日期做差
      var aDate, oDate1, oDate2, iDays;
      //  var sDate1 = this.timeValue[1];
      //  var sDate2 = this.timeValue[0];
      //转换为xx-xx-xxxx格式
      aDate = sDate1.split("-");
      oDate1 = new Date(aDate[1] + "/" + aDate[2] + "/" + aDate[0]);
      aDate = sDate2.split("-");
      oDate2 = new Date(aDate[1] + "/" + aDate[2] + "/" + aDate[0]);
      //把相差的毫秒数转换为天数
      iDays = parseInt(Math.abs(oDate1 - oDate2) / 1000 / 60 / 60 / 24);
      return iDays;
    },
    firstComeLine(val){
      var appObjArys = [];
      for (let i = 0; i < this.otherSelectIndexList.length; i++) {
        var is_tureyes;
        if (this.otherSelectIndexList[i].key == val) {
          is_tureyes = true;
        } else {
          is_tureyes = false;
        }
        appObjArys.push({
          key: this.otherSelectIndexList[i].key,
          label: this.otherSelectIndexList[i].label,
          disabled: is_tureyes,
        });
      }
      this.otherSelectIndexList = appObjArys;
      this.selectIndexOne = val;
    },
    async getChartData(){
      //折线图
      if (!this.selectIndexOne) {
        this.firstComeLine(this.dataListTwo[0].key);
      }
      const {data:res} = await this.$http.post(
        this.baseUrl.ip1+`/enter/chartData`,
        {
          media_platform_id_arr:this.form.media_platform_id_arr,
          media_id_arr: this.form.media_id_arr,
          position_id_arr:this.form.position_id_arr,
          show_filed: this.selectIndexOne,
          is_ratio: this.is_ratio,
          ratio_filed: this.selectIndexTwo,
          start: this.timeValue[0],
          end: this.timeValue[1],
        }
      );
      this.chartData = res;
      this.drawLine();
    },
    drawLine(){
      //折线图展示
      var lineOneData = [];
      var lineTwoData = [];
      var lineOneTimeData = [];
      var lineTwoTimeData = [];
      let lineOneMax = "";
      let lineTwoMax = "";
      let lineOneName = "";
      let lineTwoName = "";
      let lineOneTime = "";
      let lineTwoTime = "";
      let lineOneAvg = "";
      let lineTwoAvg = "";

      for(var item in this.chartData.column_data){
        if (item == this.selectIndexOne) {
          lineOneData = this.chartData.column_data[item].one.data;
          lineOneMax = this.chartData.column_data[item].one.max;
          lineOneAvg = this.chartData.column_data[item].one.avg;
          if (this.chartData.column_data[item].one.date) {
            lineOneTime = this.chartData.column_data[item].one.date;
          }
          if (this.chartData.column_data[item].two) {
            lineOneTimeData = this.chartData.column_data[item].two.data;
            if (this.chartData.column_data[item].two.date) {
              lineTwoTime = this.chartData.column_data[item].two.date;
            }
          }
        } else if (item == this.selectIndexTwo) {
          lineTwoData = this.chartData.column_data[item].one.data;
          lineTwoMax = this.chartData.column_data[item].one.max;
          lineTwoAvg = this.chartData.column_data[item].one.avg;

          if (this.chartData.column_data[item].two) {
            lineTwoTimeData = this.chartData.column_data[item].two.data;
          }
        }
      }

      for(var item in this.dataListTwo){
        if (this.dataListTwo[item].key == this.selectIndexOne) {
          lineOneName = this.dataListTwo[item].label;
        } else if (this.dataListTwo[item].key == this.selectIndexTwo) {
          lineTwoName = this.dataListTwo[item].label;
        }
      }

       // 基于准备好的dom，初始化echarts实例
      var myChart = this.$echarts.init(document.getElementById("myEntryChart"));

      //绘制
      var option = {
        tooltip:{
          trigger: "axis",
          axisPointer: {
            type: "cross",
          },
        },
        legend:{
          data:[lineOneName,lineTwoName],
          top:"0px",
        },
        dataZoom:[{},{}],
        toolbox:{
          feature:{
            dataZoom:{
              show:false,
              yAxisIndex:"none",
            },
          },
        },
        xAxis:[
          {
            //x轴
            type:"category",
            data: this.chartData.abscissa,
          }
        ],
        yAxis:[
          {
            position: "left",//位置
            type: "value",
            name: lineOneName,
            boundaryGap: true,

            min: 0,
            max: lineOneMax,
            interval: lineOneAvg,
          },
          {
            position: "right",
            type: "value",
            name: lineTwoName,
            boundaryGap: true,

            min: 0,
            max: lineTwoMax,
            interval: lineTwoAvg,
            // axisLabel: {
            //   formatter: "{value} 个"
            // }
          },
        ],
        series: [
          {
            name: lineOneTime + lineOneName,
            data: lineOneData,
            yAxisyAxis: 0, //第几个y轴为单位
            yAxisIndex: 0,
            type: "line",
            // lineStyle:{
            //     normal:{
            //       color:"#FF0000",
            //       width:3,
            //     }
            // }
          },
          {
            name: lineTwoTime + lineOneName,
            data: lineOneTimeData,
            yAxisyAxis: 0, //第几个y轴为单位
            yAxisIndex: 0,
            type: "line",
            // lineStyle:{
            //     normal:{
            //       color:"#FA8072",
            //       width:3,
            //     }
            // }
          },
          {
            name: lineOneTime + lineTwoName,
            data: lineTwoData,
            yAxisIndex: 1, //第几个y轴为单位
            type: "line",
            // lineStyle:{
            //     normal:{
            //       color:"#228B22",
            //       width:3,
            //     }
            // }
          },
          {
            name: lineTwoTime + lineTwoName,
            data: lineTwoTimeData,
            yAxisIndex: 1, //第几个y轴为单位
            type: "line",
            // lineStyle:{
            //     normal:{
            //       color:"#20B2AA",
            //       width:3,
            //     }
            // }
          },
        ],
      };
      myChart.setOption(option);
    },
    selectIndexChangeOne(val){
      //选择指标1
      var appObjArys = [];
      for (let i = 0; i < this.otherSelectIndexList.length; i++) {
        var is_tureyes;
        if (this.otherSelectIndexList[i].key == val) {
          is_tureyes = true;
        } else {
          is_tureyes = false;
        }
        appObjArys.push({
          key: this.otherSelectIndexList[i].key,
          label: this.otherSelectIndexList[i].label,
          disabled: is_tureyes,
        });
      }

      this.otherSelectIndexList = appObjArys;
      this.selectIndexOne = val;
      this.getChartData();
    },
    selectIndexChangeTwo(val){
      //选择指标2
      var appObjArys = [];
      for (let i = 0; i < this.dataListTwo.length; i++) {
        var is_tureyes;
        if (this.dataListTwo[i].key == val) {
          is_tureyes = true;
        } else {
          is_tureyes = false;
        }
        appObjArys.push({
          key: this.dataListTwo[i].key,
          label: this.dataListTwo[i].label,
          disabled: is_tureyes,
        });
      }

      this.dataListTwo = appObjArys;
      this.selectIndexTwo = val;
      this.getChartData();
    },
    indexChange(val){
      //对比
      if (val == 1) {
        this.is_ratio = val;
        this.isAbleIndex = false;
      } else {
        this.is_ratio = val;
        this.isAbleIndex = true;
        this.selectIndexTwo = "";
        this.getChartData();
      }
    },
    isDisableChartsFun(val){
      //隐藏按钮
      if(val == '1'){
        this.isDisableCharts = false
        this.isChartDataShow = false
      } else if(val = '2'){
        this.isDisableCharts = true
        this.isChartDataShow = true
      }
    },
    async getcheckList(){
      const {data:res} = await this.$http.get(this.baseUrl.ip1+`/columnList/groupFiled?directory_id=33`);
      const checkArr = res
      checkArr.forEach((item)=>{
        this.checkList.push({
          key:item.key,
          name:item.name
        })
      })
    },
    handleCheckedDatesChange(){
      //固定列控制
      this.is_date = 0;
      this.is_media_platform = 0;
      this.is_media = 0;
      this.is_media_type = 0;
      this.is_media_sale = 0;
      this.is_position = 0;
      this.is_scenes = 0;
      this.is_platfrom = 0;
      this.is_budget = 0;
      this.is_platfrom_sale = 0;
      this.is_ad_name = 0;
      this.is_plan_name = 0;
      this.is_unit_name = 0;
      this.fixedForm()
      this.checkListGroup.forEach((item)=>{
        if(item == 'date'){
          this.is_date = 1 ;
        } else if(item == 'media_platform_name'){
          this.is_media_platform = 1;
        } else if(item == "media_name"){
          this.is_media = 1;
        } else if(item == "media_type"){
          this.is_media_type = 1;
        } else if(item == "media_sale_type"){
          this.is_media_sale = 1;
        } else if(item == "position_name"){
          this.is_position = 1;
        } else if(item == "scenes_type"){
          this.is_scenes = 1;
        } else if(item == "platform_name"){
          this.is_platfrom = 1;
        } else if(item == "budget_name"){
          this.is_budget = 1;
        } else if(item == "budget_sale_type"){
          this.is_platfrom_sale = 1;
        } else if(item == "ad_name"){
          this.is_ad_name = 1;
        } else if(item == "plan_name"){
          this.is_plan_name = 1;
        } else if(item == "unit_name"){
          this.is_unit_name = 1;
        }
      })
    },
    cinfigShow(){
      //配置导出
      this.dialogDataList = JSON.parse(JSON.stringify(this.AllColumnData));
      this.selectColumnArr = JSON.parse(JSON.stringify(this.showColumnData));
      this.isCanSave = false;
      this.isStyle = true
      this.openSelectDialog();
    },
    openSelectDialog() {
      // this.refreshCheckedData();
      this.dialogVisible = true;
    },
    handleClose() {
      // 点击选择框X按钮
      this.dialogVisible = false;
      // this.refreshCheckedData()
    },
    clearAll(){
      //清空信息
      this.selectColumnArr = [];
    },
    clickPlay(operation, isSelectSave, saveName,selectArr){
      //应用按钮
      this.selectColumnArr = JSON.parse(JSON.stringify(selectArr));
      if (operation != 0) {
        if (this.selectColumnArr.length == 0) {
          this.$message.info("没有选择列，不可以使用应用功能");
          return;
        }
        var params = {
          directory_id: "33",
          style: this.isStyle ? "2" : "1",
          show_column: this.selectColumnArr,
        };
        if (isSelectSave) {
          params.name = saveName;
          params.id = this.saveColumnID;
        }
        this.applySave(params,isSelectSave)
      }
      this.dialogVisible = false;
    },
    async applySave(params,isSelectSave){
      //自定义列保存
      var url = isSelectSave ? this.baseUrl.ip1 + `/columnList/common/save` : this.baseUrl.ip1+`/columnList/save`;
      const {data:res} = await this.$http.post(url,params);
      // 刷新顶部筛选数据
      this.refreshPageClick();
    },
    initAllColumn(){
      //获取列表头显示
      // this.initAllColumnBottom();//底部表格
    },
    async initAllColumnBottom(){
      //列控制表格数据
      const {data:res} = await this.$http.get(this.baseUrl.ip1+`/columnList?directory_id=33&style=2&is_group_field=0`)
      this.showColumnData = JSON.parse(JSON.stringify(res.show_column));
      this.showConfigData = res.show_column;
      this.AllColumnData = res.all_column;
      //列表展示头数据
    },
    async fixedForm(){
      //表格数据内容
      const {data:res} = await this.$http.post(this.baseUrl.ip1+`/cost_publish_data/publish_data_list`,
        {
          media_platform_id_arr:this.form.media_platform_id_arr,
          media_id_arr:this.form.media_id_arr,
          position_id_arr:this.form.position_id_arr,
          start_date: this.timeValue[0],
          end_date: this.timeValue[1],
          limit: this.listQuery.pageSize,
          page: this.listQuery.current,
        }
      );
      this.listDataArray = res.data;
      this.listQuery.current = res.current_page;
      this.listQuery.limit = res.per_page;
      this.total = res.total;
      console.log(res.total)
      this.gettotalData();
    },
    async gettotalData(){
      //合计
      var params = {
        media_platform_id_arr:this.form.media_platform_id_arr,
        media_id_arr:this.form.media_id_arr,
        position_id_arr:this.form.position_id_arr,
        start_date: this.timeValue[0],
        end_date: this.timeValue[1],
        limit: this.listQuery.pageSize,
        page: this.listQuery.current,
      }
      const response = await this.$http.post(this.baseUrl.ip1 + `/cost_publish_data/publish_total`,params)
      .then(response=>{
        if(response.code == 200){
          this.listDataArray.unshift(response.data);
        }
      })
    },
    async exportBtn(){
      //导出
      const {data:res} = await this.$http.post(
        this.baseUrl.ip1+`/cost_publish_data/publish_data_export`,
        {
          media_platform_id_arr:this.form.media_platform_id_arr,
          media_id_arr:this.form.media_id_arr,
          position_id_arr:this.form.position_id_arr,
          start_date: this.timeValue[0],
          end_date: this.timeValue[1],
          limit: this.listQuery.pageSize,
          page: this.listQuery.current,
        }
      );
      window.location.href = res.url;
    },
    sortChange(column){
      //排序
      if(column.prop){
        if (column.order == "ascending") {
          this.listQuery.sort = "asc";
          this.listQuery.order = column.prop;
        } else if (column.order == "descending") {
          this.listQuery.sort = "desc";
          this.listQuery.order = column.prop;
        } else if(column.order == null){
          this.listQuery.sort = "";
          this.listQuery.order = "";
        }
        //数据请求
        this.fixedForm();
      }
    },
    handleSizeChange(val){
      //分页
      this.listQuery.pageSize = val;
      this.listQuery.current = 1;
      this.fixedForm();
    },
    async handleCurrentChange(val){
      //跳转
      console.log('aasa',this.listQuery.pageSize)
      this.listQuery.current = val;
      this.loading = true;
      const { data: res } = await this.$http.post(
        this.baseUrl.ip1 + `/cost_publish_data/publish_data_list`,
        {
          media_platform_id_arr:this.form.media_platform_id_arr,
          media_id_arr:this.form.media_id_arr,
          position_id_arr:this.form.position_id_arr,
          start_date: this.timeValue[0],
          end_date: this.timeValue[1],
          limit: this.listQuery.pageSize,
          page: this.listQuery.current,
        }
      );
      this.listDataArray = res.data;
      this.listQuery.current = res.current_page;
      this.listQuery.limit = res.per_page;
      this.total = res.total;
      this.gettotalData();
    },
    tableRowClassName({row,rowIndex}){
      if (rowIndex === 0) {
        if (
          this.is_date == 1||
          this.is_hour == 1 ||
          this.is_media_platform == 1||
          this.is_media == 1||
          this.is_media_type == 1||
          this.is_media_sale == 1||
          this.is_position == 1||
          this.is_scenes == 1||
          this.is_platfrom == 1||
          this.is_budget == 1||
          this.is_platfrom_sale == 1||
          this.is_ad_name == 1||
          this.is_plan_name == 1||
          this.is_unit_name == 1
        ) {
          return "success-row";
        }
      }
      return "";
    },
    async initAllColumnTwo(){
      //获取指标
      const { data: res } = await this.$http.get(
        this.baseUrl.ip1 + `/columnList/chart?directory_id=33`
      );
      let appObj = [];
      res.forEach((item) => {
        appObj.push({
          key: item.key,
          label: item.name,
        });
      });
      this.dataListTwo = appObj;
      this.otherSelectIndexList = appObj;
    },






    refreshPageClick(){
      //刷新
      this.initAllColumn();
      this.fixedForm();
      // this.getChartData();
    },
    async getMediaPlatform(){
      //流量平台下拉数组
      const{ data:res} = await this.$http.get(this.baseUrl.ip1 +`/sourceSys/options/mediaPlatform`)
      const lista = res;
      lista.forEach((item)=>{
        this.mediaPlatformArr.push({
          label:item.media_platform_name,
          value:item.id,
          id:item.id
        })
      })
    },
    filterMedia(platFilterArr){
      //点击流量平台筛选媒体
      this.form.media_id_arr = [];
      this.form.position_id_arr = [];
      this.platformFilterArr.splice(0,this.platformFilterArr.length)
      platFilterArr.forEach((item)=>{
        this.mediaPlatformArr.forEach((items)=>{
          if(item==items.value){
            this.platformFilterArr.push(items.id)
          }
        })
      })
      // var platformStr = this.platformFilterArr.join(',')
      this.getMedia(this.platformFilterArr)
      this.getPosition();
      this.initAllColumn();
      this.fixedForm();
      // this.getChartData();
    },
    async getMedia(arr){
      //媒体下拉数组
      this.form.position_id_arr = [];
      this.mediaArr.splice(0,this.mediaArr.length)
      const { data: res } = await this.$http.post(
        this.baseUrl.ip1 + `/sourceSys/options/media`,
        {
          media_platform_id_arr:arr
        }
      );
      const lista = res;
      lista.forEach((item, index) => {
        this.mediaArr.push({
          value: item.id,
          label: item.media_name,
          id: item.id
        });
      });
    }, 
    filterPosition(medFilterArr){
      //点击媒体筛选广告位
      this.form.position_id_arr = [];
      this.mediaFilterArr.splice(0,this.mediaFilterArr.length)
      medFilterArr.forEach((item)=>{
        this.mediaArr.forEach((items)=>{
          if(item==items.value){
            this.mediaFilterArr.push(items.id)
          }
        })
      })
      //var mediaStr = this.mediaFilterArr.join(',')
      this.getPosition(this.mediaFilterArr);
      this.initAllColumn();
      this.fixedForm();
      // this.getChartData();
    },
    async getPosition(arr){
      this.positionArr.splice(0,this.positionArr.length)
      //广告位下拉
      const { data: res } = await this.$http.post(
        this.baseUrl.ip1 + `/sourceSys/options/getSelectPositionList`,
        {
          media_id_arr: arr
        }
      );
      const lista = res;
      lista.forEach((item, index) => {
        this.positionArr.push({
          value: item.id,
          label: item.media_position_name,
        });
      });
    },
    filterpos(){
      this.initAllColumn();
      // this.getChartData();
      this.fixedForm();
    },
    async getadPlatform(){
      const {data:res} = await this.$http.get(this.baseUrl.ip1+`/getSelectAdPlatformList`)
      const platform = res;
      platform.forEach((item)=>{
        this.adPlatformArr.push({
          value:item.id,
          label:item.platform_name
        })
      })
    }
  }
}
</script>

<style lang="scss">
.el-table .success-row {
  background: #f0f9eb;
}
.entryData {
  background-color: #f0f9eb;
  .menuPartClass{
      margin-top: 20px;
      width:100%;
      min-height: 88px; 
      background-color: white;
      box-shadow: 0 2px 8px 0 #dff3ff;
      padding-bottom: 5px;
      border-radius: 8px;

      .listMenuPartClass{
        float:right;
        margin-top: 55px;
        margin-right: -70px;
      }
    }
    .el-table__header tr,
      .el-table__header th {
        padding: 0;
        height: 40px;
    }
    .el-table__body tr,
      .el-table__body td {
        padding: 0;
        height: 35px;
    }
  
  
  
}
</style>