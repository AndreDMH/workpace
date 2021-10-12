<template>
  <div class="flowData">
    <d2-container>
      <template slot="header">
        <div class="flex ryt-right-top">
          <div class="line_header"></div>
          流量侧数据
        </div>
        <!-- 数据筛选 -->
        <div>
          <el-form
            :inline="true"
            :model="form"
            ref="form"
            size="small"
            label-width="80px"
          >
            <el-row class="dataScreen">
              <el-button
                class="el-icon-refresh"
                size="small"
                @click="refreshPageClick"
                style="float: right; margin-top: 30px"
                >刷新</el-button>
              <el-form-item
                label="流量平台"
                label-width="80px"
                style="margin-top: 10px;margin-bottom:0px"
                prop="media_platform_name_arr"
              >
                <el-select
                  style="width:220px; margin-right:20px"
                  v-model="form.media_platform_name_arr"
                  placeholder="请选择流量平台"
                  filterable
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
                label="媒体名称"
                label-width="80px"
                style="margin-top: 10px;margin-bottom:0px"
                prop="media_name_arr"
              >
                <el-select
                  style="width:220px; margin-right:20px"
                  v-model="form.media_name_arr"
                  placeholder="请选择媒体"
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
                label="广告位"
                label-width="80px"
                style="margin-top: 10px;margin-bottom:0px"
                prop="position_name_arr"
              >
                <el-select
                  v-model="form.position_name_arr"
                  placeholder="请选择广告位"
                  style="width:220px; margin-right:20px"
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
              <el-form-item
                label="广告平台"
                label-width="80px"
                style="margin-top: 10px;margin-bottom:0px"
                prop="platform_name_arr"
              >
                <el-select
                  style="width:220px; margin-right:20px"
                  v-model="form.platform_name_arr"
                  placeholder="请选择广告平台"
                  filterable
                  multiple
                  collapse-tags
                  @change="filterpos()"
                >
                  <el-option
                    v-for="(item, index) in adPlatformArr"
                    :key="index"
                    :label="item.label"
                    :value="item.value"
                  ></el-option>
                </el-select>
              </el-form-item>
              <el-form-item
                label="选择时间"
                label-width="80px"
                style="margin-top: 10px;margin-bottom:0px"
                
              >
                <el-date-picker
                  :clearable="false"
                  v-model="timeValue"
                  style="width: 220px; margin-right: 20px"
                  type="daterange"
                  unlink-panels
                  range-separator="至"
                  start-placeholder="开始日期"
                  end-placeholder="结束日期"
                  format="yyyy-MM-dd"
                  value-format="yyyy-MM-dd"
                  @change="dateChange"
                  :picker-options="
                    is_realTimeShow == true
                      ? pickerOptions
                      : pickerOptionsO
                    "
                ></el-date-picker>
              </el-form-item>
            </el-row>
          </el-form>
        </div>
      </template>
      <!-- 实时概览 -->
      <div class="flowData_header_two" v-show="is_realTimeShow">
        实时概览
      </div>
      <div class="flowData_header_two_right" v-show="is_realTimeShow">
        <el-select
          class="ryt-select-right"
          placeholder="比率"
          style="width: 150px"
          filterable
          @change="ratioChance"
          size="small"
          v-model="selectValue"
        >
          <el-option
            v-for="(item, index) in ratioArray"
            :key="index"
            :label="item.label"
            :value="item.value"
          ></el-option>
        </el-select>
        <el-button
          class="configBtn"
          type="primary"
          size="small"
          @click="cinfigShow(1)"
        >配置</el-button>
          <el-button type="primary" size="small" @click="isDisableFun('1')" v-if="isDisable">隐藏实时概览</el-button>
          <el-button type="primary" size="small" @click="isDisableFun('2')" v-else-if="!isDisable">显示实时概览</el-button>
        
      </div>
      <div class="flowData_view_one" v-show="is_realTimeShow" v-if="isDisable">
        <!-- 循环创建块 -->
        <div
          v-for="(item,index) in handleFlowViewDataList"
          :key="index"
          class="box"
        >
          <el-card class="view_item" shadow="always">
            <div class="cardName">{{ item.name }}</div>
            <div class="cardValue">{{ item.value }}</div>
            <div class="cardInfor" v-if="item.ratioName">
              环比 {{ item.ratio }} %
              <i
                class="fa fa-arrow-up"
                v-if="item.ratio > 0"
                aria-hidden="true"
                style="color:red; margin-top: 2px; margin-left: 5px;"
              ></i>
              <i
                class="fa fa-arrow-down"
                v-if="item.ratio < 0"
                aria-hidden="true"
                style="color:lightgreen;  margin-left: 5px; margin-top: 4px;"
              ></i>
            </div>
            <div class="cardInfor" v-show="item.ratioNames">
              同比 {{ item.ratio }}%
              <i
                class="fa fa-arrow-up"
                v-if="item.ratio > 0"
                aria-hidden="true"
                style="color:red; margin-top: 2px; margin-left: 5px;"
              ></i>
              <i
                class="fa fa-arrow-down"
                v-if="item.ratio < 0"
                aria-hidden="true"
                style="color:lightgreen;  margin-left: 5px; margin-top: 4px;"
              ></i>
            </div>
          </el-card>
        </div>
      </div>
      <!-- *******折线图********* -->
      
      <div class="flowData_header_three">
        <div class="flowData_header_three_left">
          <el-select
            class="ryt-select-right"
            v-model="selectIndexOne"
            placeholder="选择指标"
            style="width: 150px; margin-right: 20px;"
            @change="selectIndexChangeOne"
            filterable
            size="small"
            v-if="isDisableCharts"
          >
            <el-option
              v-for="(item,index) in dataListTwo"
              :key="index"
              :label="item.label"
              :value="item.key"
              :disabled="item.disabled"
            ></el-option>
          </el-select>

          <el-checkbox
            label="对比"
            style="width:33px"
            v-model="is_ratio"
            :true-label="1"
            :false-label="0"
            @change="indexChange"
            v-if="isDisableCharts"
          ></el-checkbox>

          <el-select
            class="ryt-select-right"
            v-model="selectIndexTwo"
            placeholder="选择指标"
            v-bind:disabled="isAbleIndex"
            style="width: 150px; margin-left: 40px;"
            @change="selectIndexChangeTwo"
            filterable
            size="small"
            v-if="isDisableCharts"
          >
            <el-option
              v-for="(item,index) in otherSelectIndexList"
              :key="index"
              :label="item.label"
              :value="item.key"
              :disabled="item.disabled"
            ></el-option>
          </el-select>
        </div>

        <div class="flowData_header_three_right">
          <el-date-picker
            :clearable="false"
            v-model="timeValue"
            style="width: 245px; margin-right: 20px;"
            type="daterange"
            unlink-panels
            range-separator="至"
            start-placeholder="开始日期"
            end-placeholder="结束日期"
            format="yyyy-MM-dd "
            value-format="yyyy-MM-dd"
            @change="dateChange"
            :picker-options="
              is_realTimeShow == true ? pickerOptions : pickerOptionsO
            "
            size="small"
            v-if="isDisableCharts"
          ></el-date-picker>

          <el-select
            class="ryt-select-right"
            v-model="selectTimeType"
            placeholder="时间单位"
            :disabled="!is_realTimeShow"
            style="width: 150px; margin-right: 20px;"
            @change="timeTypeChange"
            filterable
            size="small"
            v-if="isDisableCharts"
          >
            <el-option
              v-for="(item, index) in timeTypeArray"
              :key="index"
              :label="item.label"
              :value="item.value"           
            ></el-option>
          </el-select>

          <!-- <el-date-picker
            v-show="is_realTimeShow"
            style="width: 140px; margin-right:20px"
            v-model="otherTimeDate"
            type="date"
            format="yyyy-MM-dd "
            value-format="yyyy-MM-dd"
            :disabled="is_compareTime"
            @change="selectOtherDate"
            placeholder="时间对比"
            size="small"
            v-if="isDisableCharts"
          >
          </el-date-picker> -->
          <el-button type="primary" size="small" @click="isDisableChartsFun('1')" v-if="isDisableCharts">隐藏折线图</el-button>
          <el-button type="primary" size="small" @click="isDisableChartsFun('2')" v-else-if="!isDisableCharts">显示折线图</el-button>
        </div>
      </div>
      <!-- ***********折线图************* -->
      <div class="flowData_view_two" v-show="isDisableCharts">
        <div class="chartStyle" id="myMediaChart"></div>
      </div>
      <!-- ***********表格展示************ -->
      <div class="flowData_header_four">
        <div class="flowData_header_four_left">
          <div class="flowData_header_four_left_one">数据列表</div>
          <div class="dataReport_left_two">
            <el-checkbox-group v-model="checkListGroup" @change="handleCheckedDatesChange()">
              <el-checkbox v-for="(item, index) in checkList" :key="item.key" :label="item.key" style="margin-right:3px">{{item.name}}</el-checkbox>
            </el-checkbox-group>
          </div>
        </div>
        <div class="flowData_header_four_right">
          <el-button type="primary" size="small" @click="exportBtn">
            <d2-icon name="plus" />导出
          </el-button>
          <el-button
            style="margin-left:10px;"
            type="primary"
            size="small"
            @click="cinfigShow(2)"
          >配置</el-button>
        </div>
      </div>
      <!-- **************表格开始****************** -->
      <el-table
        max-height="450"
        :data="listDataArray"
        border
        ref="multipleSelection"
        size="medium"
        style="width:100%"
        @sort-change="sortChange"
        :header-cell-style="{ background: '#f5f5f5' }"
        :row-class-name="tableRowClassName"
      >
        <el-table-column
          label="日期"
          align="center"
          fixed
          min-width="120"
          prop="date"
          key="1"
          v-if="is_date == 1"
        >
          <template slot-scope="scope">{{
            scope.row.date ? scope.row.date : "-"
          }}</template>
        </el-table-column>
        <el-table-column
          label="小时"
          align="center"
          fixed
          min-width="120"
          prop="hour"
          v-if="is_hour == 1"
        >
          <template slot-scope="scope">{{
            scope.row.hour + "" ? scope.row.hour : "-"
          }}</template>
        </el-table-column>

        <el-table-column
          label="流量平台"
          align="center"
          fixed
          prop="media_platform_name"
          min-width="120"
          v-if="is_media_platform == 1"
        >
          <template slot-scope="scope">{{
              scope.row.media_platform_name ? scope.row.media_platform_name : "-"
            }}</template>
        </el-table-column>

        <el-table-column
          label="媒体名称"
          align="center"
          fixed
          prop="media_name"
          min-width="120"
          v-if="is_media == 1"
          :render-header="renderHeader"
        >
          <template slot-scope="scope">{{
            scope.row.media_name ? scope.row.media_name : "-"
          }}</template>
        </el-table-column>

        <el-table-column
          label="媒体类型"
          align="center"
          fixed
          prop="media_type"
          min-width="120"
          v-if="is_media_type == 1"
          :render-header="renderHeader"
        >
          <template slot-scope="scope">{{
            scope.row.media_type ? scope.row.media_type : "-"
          }}</template>
        </el-table-column>

        <el-table-column
          label="媒体侧结算方式"
          align="center"
          fixed
          min-width="140"
          prop="media_sale_type"
          v-if="is_media_sale == 1"
          :render-header="renderHeader"
        >
          <template slot-scope="scope">{{
            scope.row.media_sale_type ? scope.row.media_sale_type:"-"
          }}</template>
        </el-table-column>

        <el-table-column
          label="广告位名称"
          align="center"
          fixed
          prop="position_name"
          min-width="120"
          v-if="is_position == 1"
          :render-header="renderHeader"
        >
          <template slot-scope="scope">{{
            scope.row.position_name ? scope.row.position_name : "-"
          }}</template>
        </el-table-column>

        <el-table-column
          label="广告位场景"
          align="center"
          fixed
          prop="scenes_type"
          min-width="120"
          v-if="is_scenes == 1"
          :render-header="renderHeader"
        >
          <template slot-scope="scope">{{
            scope.row.scenes_type ? scope.row.scenes_type : "-"  
          }}</template>
        </el-table-column>

        <el-table-column
          label="广告平台"
          align="center"
          fixed
          prop="platform_name"
          min-width="120"
          v-if="is_platfrom == 1"
          :render-header="renderHeader"
        >
          <template slot-scope="scope">{{
            scope.row.platform_name ? scope.row.platform_name : "-"
          }}</template>
        </el-table-column>

        <el-table-column
          label="预算名称"
          align="center"
          fixed
          min-width="120"
          prop="budget_name"
          v-if="is_budget == 1"
          :render-header="renderHeader"
        >
          <template slot-scope="scope">{{
            scope.row.budget_name ? scope.row.budget_name : "-" 
          }}</template>
        </el-table-column>
        
        <el-table-column
          label="预算侧结算方式"
          align="center"
          fixed
          min-width="140"
          prop="budget_sale_type"
          v-if="is_platfrom_sale == 1"
          :render-header="renderHeader"
        >
          <template slot-scope="scope">{{
            scope.row.budget_sale_type ? scope.row.budget_sale_type:"-"  
          }}</template>
        </el-table-column>
        <el-table-column
          :label="item.name"
          :prop="item.key"
          :sortable="'custom'"
          show-overflow-tooltip
          min-width="200px"
          align="center"
          v-for="item in showConfigData"
          :key="item.index"
          :render-header="renderHeader"
        >
          <template slot-scope="scope">
            {{ scope.row[`${item.key}`] }}
          </template>
        </el-table-column>
      </el-table>

      <el-pagination
        slot="footer"
        :current-page="listQuery.current"
        :page-size="listQuery.pageSize"
        :total="total"
        :page-sizes="[10,20,40,60]"
        layout="total, sizes, prev, pager, next, jumper"
        style="margin: -10px;"
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
export default {
  name:"flowData",
  components:{
    selectDialog
  },
  data() {
    return {
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
      timeTypeArray: [
        {
          value: 1,
          label: "天",
        },
        {
          value: 2,
          label: "小时",
        },
      ],
      ratioArray: [
        {
          value: 1,
          label: "环比",
        },
        {
          value: 2,
          label: "同比",
        },
      ],
      form: {
        media_platform_name_arr:[],//流量平台数组
        media_name_arr:[],//媒体数组
        position_name_arr:[],//广告位数组
        platform_name_arr:[],//广告平台数组
      },
      listQuery: {
        pageSize: 10,
        current: 1,
        sort: "",
        order: "",
      },
      checkList:[],
      checkListGroup:[],
      total:0,
      isDisable: false,
      isDisableCharts: false,
      is_realTimeShow:true,
      mediaPlatformArr:[],//流量平台数组
      platformFilterArr:[],//流量平台id筛选数组
      mediaArr:[],//媒体数组
      mediaFilterArr:[],//媒体id筛选数组
      positionArr:[],//广告位数组
      adPlatformArr:[],//广告平台数组
      timeValue:[],//时间
      is_ratio:"0",//是否对比
      isAbleIndex: true, //是否可选择指示器
      chartData: {},
      otherSelectIndexList:[],
      selectValue: 1, //比率默认选中
      selectTimeType: 1, //默认时间类型
      is_compareTime: true, //是否时间对比
      showData:[],//实时概览
      showColumnData: [], // 底部表格默认选中的列数据
      AllColumnData:[],// 底部表格全部的列数据
      handleFlowViewDataList:[], //处理实施概览数据以供显示

      dataListTwo:[],//选择指标
      selectIndexOne:"",//选择指标
      selectIndexTwo:"",//选择指标
      otherTimeDate:"",
      popoverVisible: false,
      saveColumnList: [], // 保存的自定义常用列数据
      listDataArray:[],//列表数据
      showConfigData:[],
      is_date: 0,
      is_hour: 0,
      is_media_platform:0,
      is_media: 0,
      is_media_type: 0,
      is_media_sale:0,
      is_position: 0,
      is_scenes:0,
      is_platfrom: 0,
      is_budget:0,
      is_platfrom_sale:0,

      user_column_id: "",
      dialogVisible:false,
      isCanSave: true,
      isStyle:true,
      dialogDataList:[],
      selectColumnArr:[],
      saveColumnName:"",
    };
  },
  created() {
    this.getMediaPlatform();//获取流量平台接口
    this.getMedia();//获取流量媒体接口
    this.getPosition();//获取流量广告位接口
    this.getadPlatform();//获取广告平台接口
    this.getSevenDayDate();
    this.initAllColumnTwo();//获取指标接口
    this.initAllColumn();
    this.getcheckList();
    this.fixedForm();
    //this.getFlowViewData();//实时概览
  },
  methods: {
    renderHeader(h, { column }) {
		      const mediaNameContent= [
            h(
		        // "div",
		        // {
		        //   slot: "content"
		        // },
		        // "媒体名称："
		        ),
             h(
		          "div",
		          {
		            slot: "content"
		          },
		          "包括平台媒体和直媒"
		        ),];
            const mediaTypeContent= [h(
              // "div",
              // {
              //   slot: "content"
              // },
              // "媒体类型："
            ),h(
              "div",
              {
                slot: "content"
              },
              "区分平台媒体和直媒"
            ),];
            const adPositionContent= [h(
              // "div",
              // {
              //   slot: "content"
              // },
              // "媒体类型："
            ),h(
              "div",
              {
                slot:"content"
              },
              "ssp的广告位"
            ),];
            const adScenesTypeContent= [
            h(
		        // "div",
		        // {
		        //   slot: "content"
		        // },
		        // "广告位场景："
		        ),
             h(
		          "div",
		          {
		            slot: "content"
		          },
		          "与ssp广告位场景一致"
		        ),];
            const adPlatformContent= [
            h(
		        // "div",
		        // {
		        //   slot: "content"
		        // },
		        // "广告平台："
		        ),
             h(
		          "div",
		          {
		            slot: "content"
		          },
		          "ssp的广告平台"
		        ),];
            const budgetNameContent= [
            h(
		        // "div",
		        // {
		        //   slot: "content"
		        // },
		        // "预算名称："
		        ),
             h(
		          "div",
		          {
		            slot: "content"
		          },
		          "与ssp中广告平台预算一致"
		        ),];
            const budgetTypeContent= [
            h(
		        // "div",
		        // {
		        //   slot: "content"
		        // },
		        // "预算侧结算方式："
		        ),
             h(
		          "div",
		          {
		            slot: "content"
		          },
		          "与ssp中广告平台结算方式一致"
		        ),];
            const mediaSaleContent= [
            h(
		        // "div",
		        // {
		        //   slot: "content"
		        // },
		        // "媒体侧结算方式："
		        ),
             h(
		          "div",
		          {
		            slot: "content"
		          },
		          "与ssp中媒体的结算方式一致"
		        ),];
            const requestNumContent= [
            h(
		        // "div",
		        // {
		        //   slot: "content"
		        // },
		        // "请求次数："
		        ),
             h(
		          "div",
		          {
		            slot: "content"
		          },
		          "媒体广告位发来的请求，包括有投放和无投放的"
		        ),];
            const equipmentNumContent= [
            h(
		        // "div",
		        // {
		        //   slot: "content"
		        // },
		        // "有设备号请求次数："
		        ),
             h(
		          "div",
		          {
		            slot: "content"
		          },
		          "所有请求中，设备号为正常值的请求数"
		        ),];
            const equipmentWeightsNumContent= [
            h(
		        // "div",
		        // {
		        //   slot: "content"
		        // },
		        // "请求独立设备去重数："
		        ),
             h(
		          "div",
		          {
		            slot: "content"
		          },
		          "按请求的设备号去重数"
		        ),];
            const equipmentRequestsNumContent =[
            h(
		        // "div",
		        // {
		        //   slot: "content"
		        // },
		        // "平均每独立设备请求数："
		        ),
             h(
		          "div",
		          {
		            slot: "content"
		          },
		          "请求数/请求独立设备数"
		        ),];
            const fillingsNumContent =[
            h(
		        // "div",
		        // {
		        //   slot: "content"
		        // },
		        // "填充次数："
		        ),
             h(
		          "div",
		          {
		            slot: "content"
		          },
		          "有返回的请求次数"
		        ),];
            const fillWeightNumContent =[
            h(
		        // "div",
		        // {
		        //   slot: "content"
		        // },
		        // "填充独立设备去重数："
		        ),
             h(
		          "div",
		          {
		            slot: "content"
		          },
		          "有返回的独立设备去重数"
		        ),];
            const individualEquipmentNumContent =[
            h(
		        // "div",
		        // {
		        //   slot: "content"
		        // },
		        // "平均每独立设备填充数:"
		        ),
             h(
		          "div",
		          {
		            slot: "content"
		          },
		          "填充次数/填充独立设备去重数"
		        ),];
            const fillingRateContent =[
            h(
		        // "div",
		        // {
		        //   slot: "content"
		        // },
		        // "填充率:"
		        ),
             h(
		          "div",
		          {
		            slot: "content"
		          },
		          "填充次数/请求次数"
		        ),];
            const victoryNumContent =[
            h(
		        // "div",
		        // {
		        //   slot: "content"
		        // },
		        // "胜出次数:"
		        ),
             h(
		          "div",
		          {
		            slot: "content"
		          },
		          "出价胜出的次数"
		        ),];
            const victoryFillNumContent =[
            h(
		        // "div",
		        // {
		        //   slot: "content"
		        // },
		        // "胜出去重数:"
		        ),
             h(
		          "div",
		          {
		            slot: "content"
		          },
		          "出价胜出的独立设备去重数"
		        ),];
            const independentNumContent =[
            h(
		        // "div",
		        // {
		        //   slot: "content"
		        // },
		        // "每独立设备曝光数:"
		        ),
             h(
		          "div",
		          {
		            slot: "content"
		          },
		          "曝光数/曝光去重数"
		        ),];
            const victoryRatioContent =[
            h(
		        // "div",
		        // {
		        //   slot: "content"
		        // },
		        // "胜出率:"
		        ),
             h(
		          "div",
		          {
		            slot: "content"
		          },
		          "胜出/填充"
		        ),];
            const clickRatioContent =[
            h(
		        // "div",
		        // {
		        //   slot: "content"
		        // },
		        // "点击率:"
		        ),
             h(
		          "div",
		          {
		            slot: "content"
		          },
		          "点击次数/曝光次数"
		        ),];
            const mediadpRatioContent =[
            h(
		        // "div",
		        // {
		        //   slot: "content"
		        // },
		        // "媒体dp率:"
		        ),
             h(
		          "div",
		          {
		            slot: "content"
		          },
		          "媒体dp次数/点击次数"
		        ),];
            const otherContent =[
            h(
		        // "div",
		        // {
		        //   slot: "content"
		        // },
		        // "其他数据待补充:"
		        ),
             h(
		          "div",
		          {
		            slot: "content"
		          },
		          "暂无描述"
		        ),];
		      return h("div", [
		        h("span", column.label),
		        h(
		          "el-tooltip",
		          {
		            props: {
		              placement: "bottom"
		            }
		          },
		          [
		            column.label == "媒体名称" ?  mediaNameContent : column.label == "媒体类型" ? mediaTypeContent: column.label == "广告位名称" ? adPositionContent:column.label == "广告位场景" ? adScenesTypeContent : column.label == "广告平台" ? adPlatformContent:column.label == "预算名称" ?budgetNameContent: column.label == "预算侧结算方式" ? budgetTypeContent:column.label == "媒体侧结算方式" ?mediaSaleContent:column.label == "请求次数" ?requestNumContent:column.label == "有设备号请求次数" ?equipmentNumContent:column.label == "请求独立设备去重数" ?equipmentWeightsNumContent:column.label == "平均每独立设备请求数" ?equipmentRequestsNumContent:column.label == "填充次数" ?fillingsNumContent:column.label == "填充独立设备去重数" ?fillWeightNumContent:column.label == "平均每独立设备填充数" ?individualEquipmentNumContent:column.label == "填充率" ?fillingRateContent:column.label == "胜出次数" ?victoryNumContent:column.label == "胜出去重数" ?victoryFillNumContent:column.label == "每独立设备曝光数" ?independentNumContent:column.label == "胜出率" ?victoryRatioContent:column.label == "点击率" ?clickRatioContent:column.label == "媒体dp率" ?mediadpRatioContent:otherContent,
		            h("i", {  
		              class: "el-icon-question",
		              style: "color:orange;margin-left:5px;"
		            })
		          ]
		        )
		      ]);
    },
    cinfigShow(str){
      //配置导出
      if(str==1){
        // 不展示保存常用列
        this.selectColumnArr = JSON.parse(JSON.stringify(this.showData));
        this.dialogDataList = JSON.parse(JSON.stringify(this.AllData));
        this.isCanSave = false
        this.isStyle = false
        this.openSelectDialog()
      } else if(str == 2){
        this.dialogDataList = JSON.parse(JSON.stringify(this.AllColumnData));
        this.selectColumnArr = JSON.parse(JSON.stringify(this.showColumnData));
        this.isCanSave = false;
        this.isStyle = true
        this.openSelectDialog();
      }
    },
    async getcheckList(){
      const {data:res} = await this.$http.get(this.baseUrl.ip1+`/columnList/groupFiled?directory_id=29`);
      const checkArr = res
      checkArr.forEach((item)=>{
        this.checkList.push({
          key:item.key,
          name:item.name
        })
      })
    },
    handleCheckedDatesChange(){
      this.is_date = 0;
      this.is_hour = 0;
      this.is_media_platform = 0;
      this.is_media = 0;
      this.is_media_type = 0;
      this.is_media_sale = 0;
      this.is_position = 0;
      this.is_scenes = 0;
      this.is_platfrom = 0;
      this.is_budget = 0;
      this.is_platfrom_sale = 0;
      this.fixedForm()
      this.checkListGroup.forEach((item)=>{
        if(item == 'date'){
          this.is_date = 1 ;
        } else if(item == 'hour') {
          this.is_hour = 1 ;
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
        }
      })
    },
    isDisableFun(val){
      if(val =='1'){
        this.isDisable = false
      } else if(val == '2'){
        this.isDisable = true
      }
    },
    isDisableChartsFun(val){
      if(val == '1'){
        this.isDisableCharts = false
      } else if(val = '2'){
        this.isDisableCharts = true
      }
    },
    openSelectDialog() {
      // this.refreshCheckedData();
      this.dialogVisible = true;
    },
    handleSizeChange(val){
      //分页
      this.listQuery.pageSize = val;
      this.listQuery.current = 1;
      this.fixedForm();
    },
    async handleCurrentChange(val){
      //跳转
      this.listQuery.current = val;
      this.loading = true;
      const { data: res } = await this.$http.post(
        this.baseUrl.ip1 + `/traffic/data`,
        {
          media_platform_name_arr:this.form.media_platform_name_arr,
          media_name_arr:this.form.media_name_arr,
          position_name_arr:this.form.position_name_arr,
          platform_name_arr:this.form.platform_name_arr,
          sort: this.listQuery.sort,
          field: this.listQuery.order,
          directory_id:29,
          start: this.timeValue[0],
          end: this.timeValue[1],
          limit: this.listQuery.pageSize,
          page: this.listQuery.current,
          group_columns:this.checkListGroup
        }
      );
      this.listDataArray = res.data;
      this.listQuery.current = res.current_page;
      this.listQuery.limit = res.per_page;
      this.total = res.total;
      this.gettotalData();
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
          directory_id: "29",
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
    refreshPageClick(){
      //刷新
      this.initAllColumn();
      // this.getChartData(); 
      this.fixedForm();
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
    ratioChance(val) {
      this.selectValue = val;
      this.getFlowViewData();
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
    timeTypeChange(val){
      this.selectTimeType = val;
      var whatDay = this.timeCompares(this.timeValue[1], this.timeValue[0]);

      if (val == 1) {
        //天
        this.is_compareTime = true;
      } else {
        //小时
        if (whatDay > 7) {
          this.$message("按小时查看最多查看7天数据");
          this.getSevenDayDate();
        }
        this.is_compareTime = false;
      }
      this.otherTimeDate = "";
      this.getChartData();
    },
    async initAllColumn(){
      //获取列表头显示
      const{ data:res} = await this.$http.get(
        this.baseUrl.ip1+`/columnList?directory_id=29&style=1&is_group_field=0`
      );
      this.AllData = res.all_column;
      this.showData = res.show_column;
      this.initAllColumnBottom();//底部表格
      this.getFlowViewData();//实时概览
      this.getChartData();//折线图
    },
    async initAllColumnBottom(){
      //列控制表格数据
      const {data:res} = await this.$http.get(this.baseUrl.ip1+`/columnList?directory_id=29&style=2&is_group_field=0`)
      this.showColumnData = JSON.parse(JSON.stringify(res.show_column));
      this.showConfigData = res.show_column;
      console.log(this.showConfigData)
      this.AllColumnData = res.all_column;
      //列表展示头数据
    },
    async fixedForm(){
      const {data :res} = await this.$http.post(this.baseUrl.ip1+`/traffic/data`,
        {
          media_platform_name_arr:this.form.media_platform_name_arr,
          media_name_arr:this.form.media_name_arr,
          position_name_arr:this.form.position_name_arr,
          platform_name_arr:this.form.platform_name_arr,
          sort: this.listQuery.sort,
          field: this.listQuery.order,
          directory_id:29,
          start: this.timeValue[0],
          end: this.timeValue[1],
          limit: this.listQuery.pageSize,
          page: this.listQuery.current,
          group_columns:this.checkListGroup
        }
      );
      this.listDataArray = res.data;
      this.listQuery.current = res.current_page;
      this.listQuery.limit = res.per_page;
      this.total = res.total;
      this.gettotalData();
    },
    //合计数据请求
    async gettotalData(){
      var params = {
        media_platform_name_arr:this.form.media_platform_name_arr,
        media_name_arr:this.form.media_name_arr,
        position_name_arr:this.form.position_name_arr,
        platform_name_arr:this.form.platform_name_arr,
        sort: this.listQuery.sort,
        field: this.listQuery.order,
        directory_id:29,
        start: this.timeValue[0],
        end: this.timeValue[1],
        limit: this.listQuery.pageSize,
        page: this.listQuery.current,
        group_columns:this.checkListGroup
      }
      const response = await this.$http.post(this.baseUrl.ip1 + `/traffic/total`,params)
      .then(response => {
        if(response.code == 200){
          if(this.is_date == 1||this.is_hour == 1||this.is_media_platform == 1||this.is_media == 1
          ||this.is_media_type == 1||this.is_media_sale == 1||this.is_position==1
          ||this.is_scenes==1||this.is_platfrom==1||this.is_budget==1||this.is_platfrom_sale==1){
            this.listDataArray.unshift(response.data);
          } else {
            //this.$message.error(response.msg)
          }
        }
      })
    },
    //导出
    async exportBtn(){
      const {data:res} = await this.$http.post(
        this.baseUrl.ip1+`/traffic/excelData`,
        {
          media_platform_name_arr:this.form.media_platform_name_arr,
          media_name_arr:this.form.media_name_arr,
          position_name_arr:this.form.position_name_arr,
          platform_name_arr:this.form.platform_name_arr,
          sort: this.listQuery.sort,
          field: this.listQuery.order,
          directory_id:29,
          start: this.timeValue[0],
          end: this.timeValue[1],
          limit: this.listQuery.pageSize,
          page: this.listQuery.current,
          group_columns:this.checkListGroup
        }
      );
      window.location.href = res.url;
    },
    async getFlowViewData(){
      //实时概览数据获取
      const {data:res} = await this.$http.post(
        this.baseUrl.ip1 + `/traffic/realTimeData`,
        {
          media_platform_name_arr:this.form.media_platform_name_arr,//流量平台
          media_name_arr:this.form.media_name_arr,//媒体数组
          position_name_arr:this.form.position_name_arr,//广告位数组
          platform_name_arr:this.form.platform_name_arr,//广告平台数组
          overview_type:this.selectValue
        }
      );
      var appObjAry = new Array();
      for (let i = 0; i < this.showData.length; i++) {
        let stringsss = this.showData[i].key;
        let stringOther = stringsss + "_compare";
        var isRatioShow = this.selectValue == 1 ? true : false;
        var isRatioShows = this.selectValue == 1 ? false : true;

        if (this.showData[i].is_group == 0) {
          appObjAry.push({
            name: this.showData[i].name,
            value: res[stringsss],
            ratio: res[stringOther],
            ratioName: isRatioShow,
            ratioNames: isRatioShows,
          });
        }
      }
      this.handleFlowViewDataList = appObjAry;
    },
    async getChartData(){
      //折线图数据获取
      if (!this.selectIndexOne) {
        this.firstComeLine(this.dataListTwo[0].key);
      }
      //折线图数据获取
      const {data:res} = await this.$http.post(
        this.baseUrl.ip1 + `/traffic/chartData`,
        {
          media_platform_name_arr:this.form.media_platform_name_arr,
          media_name_arr: this.form.media_name_arr,
          position_name_arr:this.form.position_name_arr,
          platform_name_arr:this.form.platform_name_arr,
          start: this.timeValue[0],
          end: this.timeValue[1],
          show_filed: this.selectIndexOne,
          is_ratio: this.is_ratio,
          ratio_filed: this.selectIndexTwo,
          time_type: this.selectTimeType,
          ratio_time: this.otherTimeDate,
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
      var myChart = this.$echarts.init(document.getElementById("myMediaChart"));

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
      //选择指标
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
    selectOtherDate(){
      //时间对比
    },
    tableRowClassName({ row, rowIndex }) {
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
          this.is_platfrom_sale == 1
        ) {
          return "success-row";
        }
      }
      return "";
    },
    sortChange(column){
      //排序
      console.log('prop',column.prop)
      if (column.prop) {
        if(column.prop=='request_uv'||column.prop=='filling_uv'||column.prop=='beat_uv'||column.prop=='exposure_uv'||column.prop=='click_uv'||column.prop=='dp_uv'||column.prop=='request_avg'||column.prop=='filling_avg'||column.prop=='exposure_avg'){
          this.$message.info('此列数据不可以进行排序！')
        } else{
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
      } 
    },
    dateChange(val) {
      if (this.selectTimeType == 1) {
        //天
        this.timeValue = val;
      } else {
        //小时
        var whatDay = this.timeCompares(val[1], val[0]);
        if (whatDay > 7) {
          this.getSevenDayDate();
          this.$message("按小时查看最多查看7天数据");
        } else {
          this.timeValue = val;
        }
      }
      this.getChartData();
      this.initAllColumn();
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
      // this.getListData();
    },
    async initAllColumnTwo() {
      //获取指标
      const { data: res } = await this.$http.get(
        this.baseUrl.ip1 + `/columnList/chart?directory_id=29`
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
    async getMediaPlatform(){
      //流量平台下拉数组
      const {data:res} = await this.$http.get(this.baseUrl.ip1 +`/mediaPlatform/index`)
      const lista = res;
      lista.forEach((item)=>{
        this.mediaPlatformArr.push({
          label:item.media_platform_name,
          value:item.media_platform_name,
          id:item.id
        })
      })
    },
    filterMedia(platFilterArr){
      //点击流量平台筛选媒体
      this.platformFilterArr.splice(0,this.platformFilterArr.length)
      platFilterArr.forEach((item)=>{
        this.mediaPlatformArr.forEach((items)=>{
          if(item==items.value){
            this.platformFilterArr.push(items.id)
          }
        })
      })
      var platformStr = this.platformFilterArr.join(',')
      this.getMedia(platformStr)
      this.initAllColumn();
      //this.getChartData();
      this.fixedForm();
    },
    async getMedia(str){
      //媒体下拉数组
      this.mediaArr.splice(0,this.mediaArr.length)
      const { data: res } = await this.$http.get(
        this.baseUrl.ip1 + `/getSelectMediaList`,
        {
          params:{
            media_platform_id:str
          }
        }
      );
      const lista = res;
      lista.forEach((item, index) => {
        this.mediaArr.push({
          value: item.media_name,
          label: item.media_name,
          id: item.id
        });
      });
    }, 
    filterPosition(medFilterArr){
      //点击媒体筛选广告位
      this.mediaFilterArr.splice(0,this.mediaFilterArr.length)
      medFilterArr.forEach((item)=>{
        this.mediaArr.forEach((items)=>{
          if(item==items.value){
            this.mediaFilterArr.push(items.id)
          }
        })
      })
      var mediaStr = this.mediaFilterArr.join(',')
      this.getPosition(mediaStr);
      this.initAllColumn();
      //this.getChartData();
      this.fixedForm();
    },
    async getPosition(str){
      this.positionArr.splice(0,this.positionArr.length)
      //广告位下拉
      const { data: res } = await this.$http.get(
        this.baseUrl.ip1 + `/getSelectPositionList`,
        {
          params:{
            media_id: str
          }
        }
      );
      const lista = res;
      lista.forEach((item, index) => {
        this.positionArr.push({
          value: item.media_position_name,
          label: item.media_position_name,
        });
      });
    },
    filterpos(){
      this.initAllColumn();
      this.getChartData();
      this.fixedForm();
    },
    async getadPlatform(){
      const {data:res} = await this.$http.get(this.baseUrl.ip1+`/getSelectAdPlatformList`)
      const platform = res;
      platform.forEach((item)=>{
        this.adPlatformArr.push({
          value:item.platform_name,
          label:item.platform_name
        })
      })
    }
  },
};
</script>

<style lang="scss">
.el-table .success-row {
  background: #f0f9eb;
}
.flowData {
  background-color: green;
  .flowData_header_one {
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
  .dataScreen {
    padding-top: 0px;
  }

  .flowData_header_two {
    // width: 80px;
    // height: 35px;
    font-family: "微软雅黑 Bold", "微软雅黑 Regular", 微软雅黑;
    font-weight: 700;
    font-style: normal;
    font-size: 14px;
    text-align: left;
    line-height: 28px;
    color: #333333;
    margin-left: 20px;
    margin-top: 0px;
    float: left;
  }
  .flowData_header_two_right {
    float: right;
    padding-right: 20px;
  }
  .configBtnNew {
    float: left;
    margin-left: 20px;
    margin-top: 20px;
  }
  .configBtn {
    margin-left: 20px;
  }

  .flowData_view_one {
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
  .flowData_header_three{
    height: 50px;
    display: flex;
    width: 100%;
    justify-content: space-between;
    margin-top: 60px;
    .flowData_header_three_left {
      margin-bottom: 20px;
    }
    .flowData_header_three_right {
      margin-right: 20px;
    }
  }
  .flowData_view_two {
    height: 520px;

    .chartStyle {
      margin-top: 10px;
      margin-left: 0px;
      width: 1200px;
      height: 500px;
    }
  }
  .flowData_header_four {
    margin-top: -10px;
    height: 50px;
    line-height: 50px;
    .flowData_header_four_left {
      float: left;
      .flowData_header_four_left_one {
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
      .dataReport_left_two{
        float:left;
      }
      .flowData_header_four_left_two {
        float: left;
      }
      .dataReport_left_two {
        float: left;
      }
    }
    .flowData_header_four_right {
      float: right;
      padding-right: 20px;
    }
  }
}
</style>
