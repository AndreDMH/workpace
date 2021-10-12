<template>
  <div class="appAdmin">
    <d2-container>
      <template slot="header">
        <div class="flex ryt-right-top">
          <div class="line_header"></div>应用列表
        </div>
      
      <!-- 按钮事件 start 新建、删除、启用、暂停-->
      <div class="medias_header">
        <el-button type="primary"  size="mini" style="margin-right: 8px;margin-left: 11px;margin-top: 11px;" @click="newButton"> 
            <i class="el-icon-circle-plus-outline">  新增应用</i>
        </el-button>
        <!-- <el-popover placement="bottom-end" width="160" v-model="visibleDete">
          <p>您确定删除该应用吗？</p>
          <div style="margin: 0;text-align: right;">
            <el-button size="mini" type="text" @click="cancelDelete">取消</el-button>
            <el-button type="primary" size="mini" @click="deleteButton">确定</el-button>
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
          <p>您确定启用该应用吗？</p>
          <div style="margin: 0;text-align: right;">
            <el-button size="mini" type="text" @click="cancelUp">取消</el-button>
            <el-button type="primary" size="mini" @click="upButton">确定</el-button>
          </div>
          <el-button
            size="mini"
            :disabled="forbidden == false"
            style="margin-right: 8px;"
            slot="reference"
          >
            <d2-icon name="play" /> 启用
          </el-button>
        </el-popover>
        <el-popover placement="bottom-end" width="160" v-model="visibleDown">
          <p>您确定暂停该应用吗？</p>
          <div style="margin: 0;text-align: right;">
            <el-button size="mini" type="text" @click="cancelDown">取消</el-button>
            <el-button type="primary" size="mini" @click="downButton">确定</el-button>
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
        <button type="primary" style="height:25px;background:#409EFF;" size='mini' id="uploadBtn">
          <d2-icon name="plus" /> 导 入
        </button>
        <el-button size="mini" type="primary" style="margin-left:10px;" @click="downloadExcel">下载模板</el-button>
       
        
        <el-form
          v-show="!isOpen"
          :inline="true"
          :model="form"
          ref="form"
          size="mini"
          style="margin-right: 0px;margin-top: -32px;margin-bottom:-10px;margin-left:11px"
        >
          <el-row style="margin-top:50px">
            <el-form-item label prop="media_status" >
              <span class="ryt-select-text">状态：</span>
              <el-select 
                style="width:180px" 
                placeholder="请选择状态" 
                v-model="form.media_status" 
                class="ryt-select-left3"
                @change="changeStatus()"
                >
                <el-option
                  v-for="(item,index) in stateFilters"
                  :key="index"
                  :label="item.label"
                  :value="item.value"
                ></el-option>
              </el-select>
            </el-form-item>
            <el-form-item label prop="media_platform_id_arr">
              <el-select
                v-model="form.media_platform_id_arr"
                style="width:180px;"
                placeholder="请选择平台名称"
                @change="changeStatus()"
                filterable multiple collapse-tags
              >
                <el-option
                  v-for="(item,index) in trafficPlatformArr"
                  :key="index"
                  :label="item.label"
                  :value="item.value"
                ></el-option>
              </el-select>
            </el-form-item>
            <el-form-item label prop="media_name">
              <el-input
                v-model="form.media_name"
                placeholder="请输入应用名称"
                style="width: 180px;"
                @change="nameChange"
              />
              <i class="fa fa-search ryt-search-icon" aria-hidden="true"></i>
            </el-form-item>
          </el-row>
        </el-form>
      </div>
      </template>





      <!-- 按钮事件 start 新建、删除、启用、暂停-->
      <!-- *******表格开始**********  -->
      <el-table
        :data="currentTableData"
        v-loading="loading"
        size="medium"
        border
        @selection-change="handleSelectionChange"
        :header-cell-style="{background:'#f5f5f5'}"
        style="margin-top:-20px"
      >
        <el-table-column type="selection" align="center"   width="55">
        </el-table-column>


        <el-table-column label="应用名称" align="center" prop="media_name" min-width="150"  fixed="left">
          <!-- <template slot-scope="scope">{{scope.row.media_name}}</template> -->
          <template slot-scope="scope">
         <el-popover trigger="hover" placement="top">
          <p>应用id：{{scope.row.id}}
            <el-button v-clipboard:copy="scope.row.id" v-clipboard:success="onCopy" type="text" size="mini">复制</el-button>
          </p>
          <p>应用code：{{scope.row.media_code}}
            <el-button v-clipboard:copy="scope.row.media_code" v-clipboard:success="onCopy" type="text" size="mini">复制</el-button>
          </p>
           <div slot="reference" class="name-wrapper">{{scope.row.media_name}}</div>
        </el-popover>
      </template>
        </el-table-column>


        <el-table-column
          label="状态"
          min-width="100"
          align="center"
          prop="media_status"
          column-key="media_status"
        >
          <template slot-scope="scope">
              <el-switch
                v-model="scope.row.media_status"
                :active-value="1"
                :inactive-value="2"
                active-color="#409EFF"
                inactive-color="#DEDEDE"
                @change="switchChange(scope.row,$event)"
                >
              </el-switch>
          </template>
        </el-table-column>
        <el-table-column label="所属平台" align="center" prop="media_platform_name">
          <template slot-scope="scope">
            {{scope.row.media_platform_name}}
          </template>
        </el-table-column>
        <el-table-column label="广告位" align="center" prop="media_position_count" min-width="150">
          <template slot-scope="scope">
           <div style="display: flex;justify-content: center;align-items: center;">
              <div v-if="scope.row.media_position_count == 0" style="margin-right:6px;width:38px;">{{scope.row.media_position_count}}(个)</div>
              <div v-else>
                <el-button style="margin-right:6px;width:38px;color:#409EFF;"
                  @click="positionOut(scope.row)"
                  type="text"
                  size="medium"
                >{{scope.row.media_position_count}}(个)</el-button>
              </div>
              <i class="el-icon-circle-plus-outline" aria-hidden="true" style="color:#409EFF;font-size:13px;margin-left:18px" @click="adSenses(scope.row)">添加</i>
           </div>
          </template>
        </el-table-column>
        <el-table-column 
          label="创建时间" 
          align="center" 
          min-width="180"
          prop="created_at" 
        >
          <template slot-scope="scope">{{scope.row.created_at}}</template>
        </el-table-column>
        <el-table-column 
          label="最后修改时间" 
          align="center" 
          min-width="180"
          prop="updated_at" 
        >
          <template slot-scope="scope">{{scope.row.updated_at}}</template>
        </el-table-column>
        <el-table-column 
          label="操作" 
          width="100" 
          align="center" 
          fixed="right"
        >
          <template slot-scope="scope">
            <el-button  @click="handleClick(scope.row)" type="text" size="medium">编辑</el-button>
          </template>
        </el-table-column>
      </el-table>
      <!-- *******表格结束**********  -->
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
import util from '@/libs/util.js'
export default {
  name: "medias",
  data() {
    return {
      drawer: false,
      isOpen:false,
      form: {
        media_name: "", //媒体名称
        media_code:"",//媒体code
        media_status: "", //媒体状态
        //media_type: "", //媒体类型   
        platform_arr:[],//投放平台数组
        operation_arr:[],//负责运营数组
        business_arr:[],//负责商务数组  
        media_platform_id_arr:[],//流量平台            
      },
      
      adPowerData_wharf:{},
      //表格
      loading: false,
      currentTableData: [],
      listQuery: {
        columns: "",
        orders: "",
        pageSize: 10,
        current: 1 //第几页
      },
      total: 0,
      stateFilters: [
        { label: "全部", value:"" },
        { label: "启用", value: 1 },
        { label: "暂停", value: 2 }
      ], //状态
      typeFilters: [
        //媒体类型
        { label: "异业", value: 1 },
        { label: "同业", value: 2 },
        { label: "程序化", value: 3 }
      ],
      platformArr:[],//投放平台数组
      trafficPlatformArr:[],//流量平台下拉数组
      operationFilters:[],//筛选框运营数组
      businessFilters:[],//筛选框商务数组
      infoDelete: [], //选中的数组
      idlist: [], //数组id
      //表格
      visibleDete: false, //删除popver框
      visibleUp: false, //启用
      visibleDown: false, //暂停
      forbidden: false, //是否启用
      deteleOut: false,//是否删除
      paused: false,//是否暂停
    };
  },
  created() {
    try {
        this.adPowerData_wharf = JSON.parse(util.cookies.get('adPowerData_wharf'))
    } catch (d) {}
    console.log("权限：",util.cookies.get('adPowerData_wharf'));
    this.getMediasList();
    this.getMediaPlatform();
    
  },
  mounted() {},
  methods: {
     onCopy(){
      this.$message({
        type: 'info',
        message: '复制成功'
      });
    },
    // onoff(num){
    //   if(num == '1'){
    //     this.isOpen = false
    //   } else if(num == '2'){
    //     this.isOpen = true
    //   }
    // },
    downloadExcel(){
        let url = this.baseUrl.ip1 + `/sourceSys/media/getHeader`
        let token =''
        token=util.cookies.get('token_wharf');
        window.location.href = url + "?token=" + token;
      },
      async inputExcel(e){
      //导入应用列表
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
        .post(this.baseUrl.ip1 + "/sourceSys/media/excelLoadMedia",
          param,
          config,
        )
        .then(response => {
          if (response.code == 200) {
            this.getMediasList();
            this.$message.success('导入成功');
            this.loading = false;
          }else{
            this.loading = false;
          }
        }) 
       e.target.value = '';  
    },
    //获取流量平台下拉列表
    async getMediaPlatform(){
      //流量平台下拉框 （所属平台）
      const{ data:res} = await this.$http.get(this.baseUrl.ip1 +`/sourceSys/options/mediaPlatform`)
      let platformList = res;
      platformList.forEach((item)=>{
        this.trafficPlatformArr.push({
          label:item.media_platform_name,
          value:item.id
        })
      });
      if(this.$route.query.media_platform_id == undefined){

      }else{
        let idArr = []
        idArr.push(this.$route.query.media_platform_id)
        this.form.media_platform_id_arr = idArr
        this.getMediasList();
      }
    },
    //获取运营人员下拉列表
    async getOperation(){
      const {data: res} = await this.$http.get(this.baseUrl.ip1+`/operation/list`)
      var operation_list = res;
      operation_list.forEach((item, index) => {
        this.operationFilters.push({
          operation_name: item.name,
          operation_id: item.id
        });
      });
    },
    //获取商务人员下拉列表
    async getBusiness(){
      const {data: res} = await this.$http.get(this.baseUrl.ip1+`/business/list`)
      let business_list = res;
      business_list.forEach((item,index) => {
        this.businessFilters.push({
          business_name:item.name,
          business_id:item.id
        })    
      });
    },
   
   async getMediasList(){
     this.loading = true;
     let url =this.baseUrl.ip1 + `/sourceSys/media/getMediasList`
     let params = {
        media_style:2,//媒体类别：1为直媒 2为流量平台媒体
        limit: this.listQuery.pageSize,
        page: 1,
        media_name: this.form.media_name,
        // media_code:this.form.media_code,
        media_platform_id_arr:this.form.media_platform_id_arr,
        media_status: this.form.media_status,
        //media_type:this.form.media_type,
        // platform_arr:this.form.platform_arr,
        // operation_arr:this.form.operation_arr,
        // business_arr:this.form.business_arr
     };
     const {data:res} = await this.$http.post(url,params);
      this.currentTableData = res.data;
      this.listQuery.current = res.current_page;
      this.listQuery.limit = res.per_page;
      this.total = res.total;
      this.loading = false;
   },
   newButton() {
      //新建
      this.$router.push({
        name: "editMedias",
        query:{
          type:"1"
        }
      });
    },
    nameChange(val) {
      //名称搜索
      this.form.media_name = val;
      
      this.getMediasList();
    },
    changeStatus(){
      //状态搜索 流量平台搜索 投放平台搜索
      this.getMediasList();
    },
    async deleteButton() {
      //删除
      this.visibleDete = false;
      let params = { media_id_arr: this.idlist };
      let url = this.baseUrl.ip1 + `/sourceSys/media/delMedia`;
      const response = await this.$http.post(url, params);
      if(response.code==200){
        this.$message.success("删除成功");
      }
      // 刷新列表
      this.getMediasList();
    },
    cancelDelete() {
      //取消删除
      this.visibleDete = false;
      this.$message.error("取消删除操作");
    },
    async upButton() {
      //启用
      this.visibleUp = false;
      let params = { media_id_arr: this.idlist,media_status: "1" };
      let url = this.baseUrl.ip1 + `/sourceSys/media/upMediaStatus`;
      const { data: res } = await this.$http.post(url, params);
      this.$message.success("启用成功");
      // 刷新列表
      this.getMediasList();
    },
    cancelUp() {
      //取消启用
      this.visibleUp = false;
      this.$message.error("取消启用操作");
    },
    //确认筛选
    drawerTrue(){
      this.getMediasList();
      this.drawer = false
    },
    //取消筛选
    clearDrawer(){
      // this.drawer = false
      this.$refs.drawerForm.resetFields()
      this.getMediasList();
    },
    async downButton() {
      //暂停
      this.visibleDown = false;
      let params = { media_id_arr: this.idlist,media_status: "2" };
      const { data: res } = await this.$http.post(
        this.baseUrl.ip1 + "/sourceSys/media/upMediaStatus",
        params
      );
      var isOperate = res.isOperate;
      if (isOperate == 1) {
        //需要确认
        this.$confirm("此操作将导致投放暂停，是否继续", "警告", {
          confirmButtonText: "确定",
          cancelButtonText: "取消",
          type: "warning",
          callback: async action => {
            if (action == "confirm") {
              this.putIn();
            } else {
              this.$message.error("取消暂停操作");
            }
          }
        });
      } else {
        this.putIn();
      }
    },
    cancelDown() {
      //取消暂停
      this.visibleDown = false;
      this.$message.error("取消暂停操作");
    },
    async putIn() {
      //暂停投放
      let params = { media_id_arr: this.idlist, media_status: "2" };
      let url = this.baseUrl.ip1 + `/sourceSys/media/upMediaStatus`;
      const { data: res } = await this.$http.post(url, params);
      this.$message.success("暂停成功");
      // 刷新列表
      this.getMediasList();
    },
     async switchChange(val,event){
      console.log(val,event,this.idlist);
      var that = this;
      var idArr = [];
      idArr.push(val.id);

      let params = { media_status: event, media_id_arr: idArr};
      const response = await this.$http.post(this.baseUrl.ip1 + `/sourceSys/media/upMediaStatus`,params)
      .then(function(response){
        if(response.code==200){
          that.$message.success('状态修改成功')
              // 刷新列表
          this.getMediasList();
         } else{
            // 刷新列表
          this.getMediasList();
         }
      })
    },




    handleSelectionChange(data) {
      this.infoDelete = data;
      let idlist = [];
      this.infoDelete.map(item => {
        idlist.push(item.id);
      });
      this.idlist = idlist;
      let a1 = false;
      let a2 = false;
      if (data.length > 0) {
        data.forEach(item => {
          if (item.media_status == 1) {
            a1 = true;
          }
          if (item.media_status == 2) {
            a2 = true;
          }
          if (a1 && a2) {
            this.forbidden = true;
            this.deteleOut = false;
            this.paused = true;
          } else if (a1) {
            this.forbidden = false;
            this.deteleOut = false;
            this.paused = true;
          } else if (a2) {
            this.forbidden = true;
            this.deteleOut = true;
            this.paused = false;
          } else {
            this.forbidden = true;
            this.deteleOut = true;
            this.paused = true;
          }
        });
      } else {
        this.forbidden = false;
        this.deteleOut = false;
        this.paused = false;
      }
    },
    positionOut(row) {
      this.$router.push({
        path: "adsenseList",
        query: {
          id: row.id,
          where:"mediaList",
        }
      });
    },
    adSenses(row){ //广告位新增
      this.$router.push({
        path: "adsenseList/editAdsenseList",
        query: {
          id: row.id, 
          type:"1", //增加标识
          where:"mediaList",
          media_platform_id:row.media_platform_id,
          
        }
      });
    },
    operatesOut(row) {
      //跳媒体投放列表
      this.$router.push({
        path: `/launchManage/mediaAdLaunch`,
        query: {
          id: row.id,
          type:"1"
        }
      });
    },
    handleClick(row) {
      //编辑
      this.$router.push({
        path: "mediaList/editMedias",
        query: {
          id: row.id,
          type:'2'
        }
      });
    },
    //更改每页展示条数代码
    handleSizeChange(val) {
      this.listQuery.pageSize = val;
      this.getMediasList();
    },
    async handleCurrentChange(val) {
      this.listQuery.current = val;
      this.loading = true;
      let params = {
            // media_style:2,//媒体类别：1为直媒 2为流量平台媒体
            limit: this.listQuery.pageSize,
            page:  this.listQuery.current ,
            media_name: this.form.media_name,
            // media_code:this.form.media_code,
            media_platform_id_arr:this.form.media_platform_id_arr,
            media_status: this.form.media_status,
            // platform_arr:this.form.platform_arr
            //media_type: this.form.media_type,  
      };
      const { data: res } = await this.$http.post(
        this.baseUrl.ip1 + `/sourceSys/media/getMediasList`,params);
      this.currentTableData = res.data;
      this.listQuery.current = res.current_page;
      this.listQuery.limit = res.per_page;
      this.total = res.total;
      this.loading = false;
      
    },
  }
};
</script>
<style lang="scss">
.appAdmin {
  .medias_header {
     margin-top: 20px;
     width:100%;
     border-radius: 8px;
      min-height: 88px; 
      background-color: white;
      box-shadow: 0 2px 8px 0 #dff3ff;
      padding-bottom: 5px;

  }
  .temp-border th,.temp-border td{
    border-right:1px solid #ebf1f6;
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
.filter{
    float: right;
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
</style>
