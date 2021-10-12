<template>
  <div class="overallData_releaseData">
    <d2-container>
      <template slot="header">
        <div class="flex ryt-right-top">
          <div class="line_header"></div>预览发布
        </div>
        <!-- 数据筛选 -->
        <div class="menuPartClass">
          <el-form
            :inline="true"
            :model="form"
            size="small"
            label-width="80px"
          >
            <el-row class="dataScreen">
              <el-button
                class="el-icon-refresh"
                size="mini"
                @click="refreshPageClick"
                style="float: right; margin-top: 11px;margin-right:11px"
                >刷新</el-button>


          <el-button
            size="mini"
            type="primary"
            style="float:right;margin-top: 11px;margin-right:11px;"
            @click="releaseBtn"
          >
          <i class="fa fa-paper-plane-o" aria-hidden="true"></i> 发布</el-button>
              <el-form-item
                label-width="80px"
                style="margin-top :10px;margin-bottom:0px"
                prop="media_platform_id_arr"
              >
                <el-select
                  style="width:180px; margin-right:11px;margin-left:11px"
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
                  style="width:180px; margin-right:11px"
                  size="mini"
                  v-model="form.media_id_arr"
                  placeholder="请选择应用"
                  filterable
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
                                    size="mini"

                  placeholder="请选择广告位"
                  style="width:180px; margin-right:20px"
                  filterable
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
              <!-- <el-form-item
                label="选择时间"
                label-width="80px"
                style="margin-top: 10px;margin-bottom:0px"
              >
                <el-date-picker
                  :clearable="false"
                  v-model="timeValue"
                  style="width: 180px; margin-right: 20px"
                  type="daterange"
                  unlink-panels
                  range-separator="至"
                  start-placeholder="开始日期"
                  end-placeholder="结束日期"
                  format="yyyy-MM-dd"
                  value-format="yyyy-MM-dd"
                  @change="dateChange"
                  :picker-options="pickerOptions"
                ></el-date-picker>
              </el-form-item> -->
            </el-row>
          </el-form>
        </div>
      </template>



      <div class="releaseData">
        <!-- <div class="releaseData_header_four_left_one" style="float:left;">数据列表</div> -->
        
        <el-table
          border
          ref="multipleSelection"
          :data="releaseDataArray"
          size="medium"
          :row-class-name="tableRowClassName"
          style="margin-top:-20px"
          :header-cell-style="{ background: '#f5f5f5' }"
        >
          <el-table-column 
            label="日期" 
            align="center" 
            min-width="120" 
            prop="date" 
            fixed="left"
          >
            <template slot-scope="scope">{{scope.row.date?scope.row.date:'-'}}</template>
          </el-table-column>
          <el-table-column 
            label="平台" 
            align="center" 
            min-width="120" 
            prop="media_platform_name" 
            fixed="left"
          >
            <template slot-scope="scope">{{scope.row.media_platform_name ? scope.row.media_platform_name : "-"}}</template>
          </el-table-column>
          <el-table-column 
            label="应用" 
            align="center" 
            min-width="120" 
            prop="media_name" 
            fixed="left"
          >
            <template slot-scope="scope">{{scope.row.media_name ? scope.row.media_name : "-"}}</template>
          </el-table-column>
          <el-table-column 
            label="广告位" 
            align="center" 
            min-width="120" 
            prop="position_name" 
            fixed="left"
          >
            <template slot-scope="scope">{{scope.row.position_name ? scope.row.position_name : "-"}}</template>
          </el-table-column>
          <el-table-column
            label="结算方式"
            align="center"
            min-width="120"
            prop="bill_type"
          >
            <template slot-scope="scope">
              <div v-if="scope.row.bill_type == 1">CPM</div>
              <div v-if="scope.row.bill_type == 2">CPC</div>
              <div v-if="scope.row.bill_type == 3">CPA</div>
              <div v-if="scope.row.bill_type == 4">CPS</div>
              <div v-if="scope.row.bill_type == 5">CPD</div>
            </template>
          </el-table-column>
          <el-table-column
            label="CPA单价"
            align="center"
            min-width="120"
            prop="cpa_reserve_price"
          >
            <template slot-scope="scope">{{scope.row.cpa_reserve_price ? scope.row.cpa_reserve_price : "-"}}</template>
          </el-table-column>
          <el-table-column
            label="CPS比例"
            align="center"
            min-width="120"
            prop="cps_reserve_price"
          >
            <template slot-scope="scope">{{scope.row.cps_reserve_price ? scope.row.cps_reserve_price : "-"}}</template>
          </el-table-column>
          <el-table-column 
            label="统计转化数" 
            align="center" 
            min-width="120" 
            prop="sum_right_dp_pv" 
            fixed="right"
          >
            <template slot-scope="scope">{{scope.row.sum_right_dp_pv}}</template>
          </el-table-column>
          <el-table-column 
            label="统计支出" 
            align="center" 
            min-width="120" 
            prop="cost" 
            fixed="right"
          >
            <template slot-scope="scope">{{scope.row.cost}}</template>
          </el-table-column>
          <el-table-column
            label="结算支出"
            align="center"
            min-width="120"
            prop="bill_amount"
            fixed="right"
          >
            <template slot-scope="scope">{{scope.row.bill_amount}}</template>
          </el-table-column>
        </el-table>
      </div>
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
  </div>
</template>

<script>
export default {
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
      platformFilterArr:[],//流量平台id筛选数组
      mediaFilterArr:[],//媒体平台id筛选数组
      timeValue:[],//时间
      listQuery: {
        pageSize: 10,
        current: 1,
        sort: "",
        order: "",
      },
      total:0,
      releaseDataArray:[],//列表数据
      pickerOptions: {
        disabledDate(time) {
          //禁止选择当前日期和以后日期
          return time.getTime() > Date.now() - 8.64e7;
        },
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
      start_date:"",
      end_date:"",
    }
  },
  created(){
    this.start_date = this.$route.query.start_date
    this.end_date = this.$route.query.end_date
    this.getMediaPlatform();
    this.getMedia();
    this.getPosition();
    this.getSevenDayDate();
    this.fixedForm();
  },
  methods:{
    refreshPageClick(){
      //刷新
      this.fixedForm();
    },
    dateChange(){
      //时间
    },
    async releaseBtn(){
      //发布
      const response = await this.$http.post(this.baseUrl.ip1+`/cost_publish_data/data_publish`,
        {
          media_platform_id_arr:this.form.media_platform_id_arr,
          media_id_arr:this.form.media_id_arr,
          position_id_arr:this.form.position_id_arr,
          start_date:this.start_date,
          end_date:this.end_date,
        }
      );
      if(response.code == 200){
        // this.$message.success(response.msg)
        this.$alert('数据发布成功后整点进行更新！', '提示', {
          confirmButtonText: '确定',
          type: 'info',
          showClose:false,
          callback: action => {
            this.$message({
              type: 'success',
              message: `发布成功`
            });
          }
        });
      }
    },
    async fixedForm(){
      //数据列表
      const {data:res} = await this.$http.post(this.baseUrl.ip1+`/cost_publish_data/data_preview`,
        {
          media_platform_id_arr:this.form.media_platform_id_arr,
          media_id_arr:this.form.media_id_arr,
          position_id_arr:this.form.position_id_arr,
          page:this.listQuery.current,
          start_date:this.start_date,
          end_date:this.end_date,
          limit:this.listQuery.pageSize,
        }
      );
      this.releaseDataArray = res.data
      this.listQuery.current = res.current_page;
      this.listQuery.limit = res.per_page;
      this.total = res.total;
      this.getTotalData();
    },
    async getTotalData(){
      const {data:res} = await this.$http.post(this.baseUrl.ip1+`/cost_publish_data/data_preview_total`,
        {
          media_platform_id_arr:this.form.media_platform_id_arr,
          media_id_arr:this.form.media_id_arr,
          position_id_arr:this.form.position_id_arr,
          page:this.listQuery.current,
          start_date:this.start_date,
          end_date:this.end_date,
          limit:this.listQuery.pageSize,
        }
      );
      this.releaseDataArray.unshift(res)
    },
    tableRowClassName({row,rowIndex}){
      if (rowIndex === 0) {
        return "success-row";
      }
      return "";
    },
    handleSizeChange(val){
       //分页
      this.listQuery.pageSize = val;
      this.listQuery.current = 1;
      this.fixedForm();
    },
    handleCurrentChange(val){
      this.listQuery.current = val;
      this.fixedForm();
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
      this.getMedia(this.platformFilterArr)
      this.getPosition();
      this.listQuery.current = 1;
      this.fixedForm();
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
          label: item.media_name,
          value: item.id,
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
      this.listQuery.current = 1
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
      this.listQuery.current = 1
      this.fixedForm();
    },
  },
}
</script>

<style lang="scss">
.overallData_releaseData{

  .menuPartClass{
      margin-top: 20px;
      width:100%;
      min-height: 58px; 
      background-color: white;
      box-shadow: 0 2px 8px 0 #dff3ff;
      padding-bottom: 5px;
      border-radius: 8px;
    }
  .releaseData{
    margin-top: -10px;
    height: 50px;
    line-height: 50px;
    
    .el-table__header tr,
      .el-table__header th {
        padding: 0;
        height: 30px;
    }
    .el-table__body tr,
      .el-table__body td {
        padding: 0;
        height: 40px;
    }


    .releaseData_header_four_left_one{
      width: 80px;
        height: 50px;
        font-family: "微软雅黑 Bold", "微软雅黑 Regular", 微软雅黑;
        font-weight: 700;
        font-style: normal;
        text-align: left;
        line-height: 50px;
        color: #333333;
        margin-left: 20px;
        float: left;
    }
  }
}
</style>