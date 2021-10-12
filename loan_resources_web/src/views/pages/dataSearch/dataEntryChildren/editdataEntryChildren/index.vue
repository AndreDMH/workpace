<template>
  <div class="dataEntry">
    <d2-container>
      <template slot="header">
        <div class="flex ryt-right-top">
          <div class="line_header"></div>数据录入
        </div>
        <!-- ********数据筛选********* -->
        <!-- <div> -->
          <div class="menuPartClass">
            <el-date-picker
              v-if="showStyle == '1'"
              v-model="timeValue"
              style="width: 220px; margin-left: 11px; margin-top:11px;"
              type="daterange"
              size=mini
              unlink-panels
              range-separator="至"
              start-placeholder="开始日期"
              end-placeholder="结束日期"
              format="yyyy-MM-dd "
              value-format="yyyy-MM-dd"
              @change="dateChange"
              :picker-options="pickerOptions"
              :clearable="false"
            ></el-date-picker>
            <div style="float:right">
              <el-button  size="mini" style="margin-top:11px;margin-bottom:5px;margin-right:11px;" @click="search()">{{buttonName}}</el-button>
              <el-button type="primary"  size="mini" style="margin-top:11px;margin-bottom:5px;margin-right:11px;" @click="submitRules()">提交</el-button>
            </div>
          </div>
          </template>


          <el-form :inline="true" :model="form" ref="multipleSelection">
            <div>
              <!-- ********录入数据表格********* -->
              <el-table
                :data="form.entry_data"
                border
                size="medium"
                style="width:100%;margin-top:0px"
                :header-cell-style="{ background: '#f5f5f5' }"
              >
                <el-table-column label="日期" align="center" min-width="120" prop="date">
                  <template slot-scope="scope">{{scope.row.date}}</template>
                </el-table-column>
                <el-table-column label="广告位" align="center" min-width="120" prop="position_name">
                  <template slot-scope="scope">{{scope.row.position_name}}</template>
                </el-table-column>
                <el-table-column label="媒体名称" align="center" min-width="120" prop="media_name">
                  <template slot-scope="scope">{{scope.row.media_name}}</template>
                </el-table-column>
                <el-table-column label="流量平台" align="center" min-width="120" prop="media_platform_name">
                  <template slot-scope="scope">{{scope.row.media_platform_name}}</template>
                </el-table-column>
                <el-table-column label="支出" align="center"  width="200">
                  <template slot-scope="scope">
                    <el-form-item 
                      :prop="`entry_data.`+scope.$index+`.cost`"
                      :rules="rytprojects.dataRules"
                      >
                      <div v-if="isSearch">
                      <el-input
                        style="width:180px"
                        size="mini"
                        placeholder="请填写支出"
                        v-model="scope.row.cost"
                      ></el-input>
                      </div>
                      <div v-else style="width:180px">{{scope.row.cost}}</div>
                    </el-form-item>
                  </template>
                </el-table-column>
                <el-table-column label="转化数" align="center" width="200">
                  <template slot-scope="scope">
                    <el-form-item
                      :prop="`entry_data.`+scope.$index+`.input_right_dp_pv`"
                      :rules="rytprojects.dpRules"
                    >
                    <div v-if="isSearch">
                      <el-input
                        style="width:180px"
                        size="mini"
                        placeholder="请填写转化数"
                        v-model="scope.row.input_right_dp_pv"
                      ></el-input>
                      </div>
                      <div v-else style="width:180px">{{scope.row.input_right_dp_pv}}</div>
                    </el-form-item>
                  </template>
                </el-table-column>
              </el-table>
            </div>
          </el-form>
        <!-- </div> -->
    </d2-container>
  </div>
</template>

<script>
export default {
  data(){
    return{
      form:{
        entry_data:[],
      },
      buttonName:"预览",
      total:0,//合计
      totalArr:[],//合计数组
      inputtotal:0,//转化数合计
      inputTotalArr:[],//转化数合计数组
      isSearch:true,
      showStyle:"",
      timeValue:[],//时间
      loading:true,
      position_code_arr:[],
      incomingData:[],

      rytprojects:{
        dataRules:[
          { required:true,message:"请填写此处数据", trigger:"blur" },
          {
            pattern:/^[+-]?(\d*)?(\.)?\d+$/,
            message:"只能输入数字",
            trigger:blur
          }
        ],
        dpRules:[
          { required:true,message:"请填写此处数据", trigger:"blur" },
          {
            pattern:/^[+-]?(\d*)?(\.)?\d+$/,
            message:"只能输入数字",
            trigger:blur
          }
        ],
      },
      
      pickerOptions: {
            disabledDate(time) {
          //禁止选择当前日期和以后日期 禁止选60天之前的日期
            // return (time.getTime() > Date.now() - 8.64e7)||(time.getTime() < new Date(new Date().getTime()-3600*1000*24*60));
            return (time.getTime() > Date.now() - 8.64e7);
          },
          shortcuts: [
           {
            text: '昨日',
            onClick(picker) {
              const date = new Date();
              date.setTime(date.getTime() - 3600 * 1000 * 24);
              picker.$emit('pick', [date, date]);
            }
           },{
            text: '本周',
            onClick(picker) {
              const start = new Date();
              const end=new Date();
              const nows = start.getDay() || 7
              start.setTime(start.getTime() - 3600 * 1000 * 24 * ((nows - 1)));
              picker.$emit('pick', [start, end]);
            }
           },{
            text: '上周',
            onClick(picker) {
              const dataValue = new Date();
              const year = dataValue.getFullYear();
              const month = dataValue.getMonth() + 1;
              const day = dataValue.getDate();
              var thisWeekStart; //本周周一的时间
              if (dataValue.getDay() == 0) {  //周天的情况；
                thisWeekStart = (new Date(year + '/' + month + '/' + day)).getTime() - ((dataValue.getDay()) + 6) * 86400000;
              } else {
               thisWeekStart = (new Date(year + '/' + month + '/' + day)).getTime() - ((dataValue.getDay()) - 1) * 86400000;
              }
              const prevWeekStart = thisWeekStart - 7 * 86400000;//上周周一的时间
              const prevWeekEnd = thisWeekStart - 1 * 86400000;//上周周日的时间
              const start = new Date(prevWeekStart); //开始时间
              const end = new Date(prevWeekEnd);   //结束时间
              picker.$emit('pick', [start, end]);
            }
           },{
            text: '本月',
            onClick(picker) {
              const end = new Date();
              const start = new Date();
              start.setDate(1);
              picker.$emit('pick', [start, end]);
            }
           },{
            text: '上月',
            onClick(picker) {
              const start = new Date();
              const end = new Date(start);
              end.setMonth(start.getMonth());
              start.setMonth(start.getMonth() - 1);
              end.setDate(0);
              start.setDate(1);
              picker.$emit('pick', [start, end]);
            }
           },
            {
            text: '最近七天',
            onClick(picker) {
              const end = new Date();
              const start = new Date();
              start.setTime(start.getTime() - 3600 * 1000 * 24 * 7);
              picker.$emit('pick', [start, end]);
            }
           },{
            text: '最近30天',
            onClick(picker) {
              const end = new Date();
              const start = new Date();
              start.setTime(start.getTime() - 3600 * 1000 * 24 * 30);
              picker.$emit('pick', [start, end]);
            }
          }]
      },
    }
  },
  created(){
    this.getSevenDayDate()
    this.showStyle = this.$route.query.showStyle;
    console.log('展示类型',this.showStyle);
    if(this.showStyle == '1'){
      this.getCode();
    }else{
       let swappingData = [];
        swappingData = JSON.parse(this.$route.query.showData)
        this.form.entry_data = swappingData
    }
  },
  mounted(){
    
  },
  methods:{
    //传参格式为 ：2021-05-13
    addDateZero(num){
      //为月份加0
      return(num<10 ? "0"+num : num)
    },
    getSevenDayDate(){
      //时间 默认最近1天安排上
      const end = new Date();
      const start = new Date();
      start.setTime(start.getTime() - 3600 * 1000 * 24 * 1);
      end.setTime(end.getTime() - 3600 * 1000 * 24 * 1);

      //时间格式转换
      const endResDate = end.getFullYear() + '-' + this.addDateZero((end.getMonth() + 1)) + '-' + end.getDate(); 
      const startResDate = start.getFullYear() + '-' + this.addDateZero((start.getMonth() + 1)) + '-' + start.getDate(); 
      this.timeValue = [startResDate, endResDate];
      //this.getListData();
      // this.$alert('只允许录入近60天数据', '提示', {
      //     confirmButtonText: '确定',
      //     callback: (action) => {
      //       // this.$message({
      //       //   type: 'info',
      //       //   message: `action: ${action}`,
      //       // })
      //     },
      //   })
    },
    dateChange(val){
      this.timeValue = val
      this.getTableList()
    },

    getCode(){
      this.incomingData = JSON.parse(this.$route.query.data);
      this.position_code_arr = this.incomingData;
      this.getTableList()
      
    },
    async getTableList(){     
      const{data:res} = await this.$http.post(this.baseUrl.ip1+`/enterData/edit`,
        {
          position_code_arr:this.position_code_arr,
          start_date:this.timeValue[0],
          end_date:this.timeValue[1],
        }
      )
      let list = res;
      //console.log(res)
      this.form.entry_data = list;
    },
    search(){
      //预览
      if(this.buttonName == "预览"){
        this.isSearch = false
        this.buttonName = "取消"
        console.log('asasa',this.form.entry_data)
        this.form.entry_data.forEach((item)=>{
          this.totalArr.push(item.cost)
          this.inputTotalArr.push(item.input_right_dp_pv)
        })

        this.totalArr.forEach(i => {
          if(i==""){
            i = 0
          }
          this.total += parseFloat(i);
        });
        this.inputTotalArr.forEach(j => {
          if(j==""){
            jest = 0
          }
          this.inputtotal += parseFloat(j);
        });
        console.log('1213',this.totalArr)
        this.form.entry_data.unshift({
          date:"-",
          media_name:"-",
          media_platform_name:"-",
          position_name:"-",
          cost:this.total,
          input_right_dp_pv:this.inputtotal,
        })
        
      } else if(this.buttonName == "取消"){
        this.isSearch = true
        this.buttonName = "预览"
        this.form.entry_data.splice(0,1)
        this.totalArr.splice(0,this.totalArr.length)
        this.total = 0;
        this.inputTotalArr.splice(0,this.inputTotalArr.length)
        this.inputtotal = 0;
      }
    },
    submitRules(){
      this.$refs.multipleSelection.validate((valid)=>{
        if(valid){
          this.submitEdit();
        } else {
          this.$message({
            type: "info",
            message: "您有未填写的信息，请检查",
          });
        }
      })
    },
    async submitEdit(){
      //提交数据信息
      this.loading = true
      if(!this.isSearch){
        this.form.entry_data.splice(0,1)
      }
      const response = await this.$http.post(this.baseUrl.ip1+`/enterData/push`,
        {
          enter_data:this.form.entry_data
        }
      ).then(response =>{
        if(response.code == 200 ){
          this.$message.success(response.msg);
          this.$router.go(-1);      
          localStorage.removeItem('media_position_code')
          localStorage.removeItem('enterData')
        }
      })
      this.loading = false
    }
  }
}
</script>

<style lang="scss">
  .dataEntry{
    .menuPartClass{
      margin-top: 20px;
      width:100%;
      min-height: 50px; 
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
  }
   
</style>