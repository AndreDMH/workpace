<template>
  <div class="trafficplatformList">
    <d2-container>
      <template slot="header">
        <div class="flex ryt-right-top">
          <div class="line_header"></div>平台列表
        </div>
     
        <!-- 按钮事件 新建 删除 启用 暂停 -->
      <!-- <div class="platForm_header" style="margin-top:-20px"> -->
        <div class="menuPartClass">
           <el-button type="primary"  size="mini" style="margin-right: 8px;margin-left: 11px;margin-top: 11px;" @click="newButton">
             <i class="el-icon-circle-plus-outline">  新增平台</i>
        </el-button>

        <!-- <el-popover placement="bottom-end" width="160" v-model="visibleDete">
          <p>您确定删除该流量平台吗？</p>
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
          <p>您确定启用该流量平台吗？</p>
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
          <p>您确定暂停该流量平台吗？</p>
          <div style="margin: 0;text-align: right;">
            <el-button size="mini" type="text"  @click="cancelDown">取消</el-button>
            <el-button type="primary" size="mini" @click="downButton" >确定</el-button>
          </div>
          <el-button size="mini" :disabled="paused == false" slot="reference">
            <d2-icon name="pause" /> 暂停
          </el-button>
        </el-popover>

          <el-form
          v-show="!isOpen"
          :inline="true"
          :model="form"
          ref="form"
          size="small"
          style="margin-right: 0px;margin-top: -32px;margin-bottom:-20px"
        >
          <el-row style="margin-top:40px;margin-left:11px">
            <el-form-item label prop="status">
              <span class="ryt-select-text">状态：</span>
              <el-select 
                style="width:180px" 
                size="mini"
                filterable 
                placeholder="请选择状态" 
                v-model="form.status"
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

            <el-form-item label >
              <el-input
                size="mini"
                v-model="form.platform_name"
                placeholder="请输入流量平台名称"
                style="width: 180px;"
                @change="nameChange($event,'plat')"
              />
              <i class="fa fa-search ryt-search-icon" aria-hidden="true"></i>
            </el-form-item>
           
            <el-form-item label  prop="operation_arr">
              <el-select size="mini" style="width:180px" filterable multiple collapse-tags placeholder="请选择负责运营" v-model="form.operation_arr" @change="changeStatus()">
                <el-option
                  v-for="(item,index) in operationFilters"
                  :key="index"
                  :label="item.operation_name"
                  :value="item.operation_id"
                ></el-option>
              </el-select>
            </el-form-item>
            <el-form-item label  prop="business_arr" >
              <el-select size="mini" style="width:180px" filterable multiple collapse-tags placeholder="请选择负责市场" v-model="form.business_arr" @change="changeStatus()">
                <el-option
                  v-for="(item,index) in businessFilters"
                  :key="index"
                  :label="item.business_name"
                  :value="item.business_id"
                ></el-option>
              </el-select>
            </el-form-item>
          </el-row>
        </el-form>
        </div>
         </template>

        <el-table
          :data="currentTableData"
          v-loading="loading"
          size="mini"
          border 
          @selection-change="handleSelectionChange"
          :header-cell-style="{background:'#f5f5f5'}"
          style="margin-top:-20px"
        >
          <el-table-column type="selection" align="center"   width="55"></el-table-column>

          <!-- <el-table-column
            align="center"
            label="平台code"
            width="200"
            fixed="left"
            prop="media_platform_code"
          >
            <template slot-scope="scope">
              <el-popover trigger="hover" placement="top">
                <p>{{scope.row.id}}</p>
                <div slot="reference" class="name-wrapper">{{scope.row.media_platform_code}}</div>
              </el-popover>
            </template>
          </el-table-column> -->

          <el-table-column
            align="center"
            label="平台名称"
            width="150"
            fixed="left"
            prop="media_platform_name"
          >
            <template slot-scope="scope">
               <el-popover trigger="hover" placement="top">
                <p>平台id：{{scope.row.id}}
                <el-button v-clipboard:copy="scope.row.id" v-clipboard:success="onCopy" type="text" size="mini">复制</el-button>
                </p>
                <p>平台code：{{scope.row.media_platform_code}}
                <el-button v-clipboard:copy="scope.row.media_platform_code" v-clipboard:success="onCopy" type="text" size="mini">复制</el-button>                 
                </p>
                <div slot="reference" class="name-wrapper">{{scope.row.media_platform_name}}</div>
              </el-popover>
              
            </template>
          </el-table-column>


          <el-table-column
            align="center"
            label="状态"
            width="100"
            prop="status"
            column-key="status"
            filter-placement="bottom-end"
          >
            <template slot-scope="scope">
              <el-switch
                v-model="scope.row.status"
                :active-value="1"
                :inactive-value="0"
                active-color="#409EFF"
                inactive-color="#DEDEDE"
                @change="switchChange(scope.row,$event)"
                >
              </el-switch>
            </template>
          </el-table-column>


          <el-table-column
            align="center"
            label="应用"
            width="150"
            prop="media_count"
          >
            <template slot-scope="scope">
              <div style="display: flex;justify-content: center;align-items: center;">
                <div v-if="scope.row.media_count == 0" style="margin-right:6px;width:38px;" >{{scope.row.media_count}} (个)</div>
                <div v-else style="margin-right:6px;width:38px;">
                  <el-button
                    type="text"
                    size="medium"
                    style="color:#409EFF;"
                    @click="filterMeida(scope.row)"
                  >{{scope.row.media_count}} (个)</el-button>
                </div>
                <i class="el-icon-circle-plus-outline" aria-hidden="true" style="color:#409EFF;font-size:13px;margin-left:18px" @click="createMedia(scope.row)">添加</i>
              </div>
            </template>
          </el-table-column>
          <!-- <el-table-column
            align="center"
            label="广告位"
            width="200"
            prop="media_position_count"
          >
            <template slot-scope="scope">
              <div style="display: flex;justify-content: center;align-items: center;">
                <div v-if="scope.row.media_position_count == 0" style="margin-right:6px;width:38px;" >{{scope.row.media_position_count}}个</div>
                <div v-else style="margin-right:6px;width:38px;">
                  <el-button
                    type="text"
                    size="medium"
                    @click="filterPosition(scope.row)"
                  >{{scope.row.media_position_count}}个</el-button>
                </div>
              </div>
            </template>
          </el-table-column> -->
          <el-table-column
            align="center"
            label="负责运营"
            prop="operation_name"
          >
            <template></template>
          </el-table-column>
          <el-table-column
            align="center"
            label="负责市场"
            prop="business_name"
          >
            <template></template>
          </el-table-column>
          <el-table-column
            align="center"
            label="创建时间"
            width="200"
            prop="created_at"
          >
            <template></template>
          </el-table-column>
          <el-table-column
            align="center"
            label="最后修改时间"
            width="200"
            prop="updated_at"
          >
            <template></template>
          </el-table-column>
          <el-table-column
            align="center"
            label="操作"
            width="200"
            fixed="right"
          >
            <template slot-scope="scope">
              <el-button type="text" @click="handleClick(scope.row)" size="medium">编辑</el-button>
              <el-button type="text" @click="openSystem(scope.row)">开通分账</el-button>
              <el-button type="text" @click="adminClick(scope.row)">账号管理</el-button>
            </template>
          </el-table-column>
        </el-table>
      <!-- </div> -->
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
      <!-- **********新增编辑弹框********* -->
      <el-dialog
        :visible.sync="dialogTableVisibleForm"
        width="45%"
      >
      <template #title>
        <span>{{plat_title}}</span>
      </template>
        <el-form :model="mainForm" ref="mainForm" :rules="rytproject"  label-width="240px">
          <el-form-item label="平台名称：" prop="media_platform_name">
          <el-input placeholder="请输入平台名称" style="width:240px" v-model="mainForm.media_platform_name" />
        </el-form-item>
        <el-form-item label="公司名称：" prop="company_name">
          <el-input placeholder="请输入公司名称" style="width:240px" v-model="mainForm.company_name" />
        </el-form-item>
        <el-form-item label="运营：" prop="operation_id_arr">
          <el-select placeholder="请选择" style="width:240px"  filterable multiple   v-model="mainForm.operation_id_arr">
            <el-option
              v-for="(item,index) in operation"
              :key="index"
              :label="item.operation_name"
              :value="item.operation_id"
            ></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="市场：" prop="business_id_arr">
          <el-select placeholder="请选择" style="width:240px"  filterable multiple  v-model="mainForm.business_id_arr">
            <el-option
              v-for="(item,index) in business"
              :key="index"
              :label="item.business_name"
              :value="item.business_id"
            ></el-option>
          </el-select>
        </el-form-item>
        </el-form>
        <div style="text-align: center; margin-top: 50px;" type="flex">
          <el-button type="primary" size="medium" @click="submitRule('form')" >提交</el-button>
          <el-button size="medium" @click="cancel">取消</el-button>
        </div>
      </el-dialog>
      <!-- 分账系统 -->
      <el-dialog 
        title="基本信息"
        :visible.sync="dialogTableVisible" 
        style="width:60%;margin:auto;" 
        :center="true"
      >
        <el-form
          :model="systemForm"
          ref="systemForm"
          size="mini"
          label-width="80px"
          :inline="true"
        >
          <el-form-item
            label="账户名称"
            prop="account_name"
          >
            <el-input
              v-model="systemForm.account_name"
              placeholder="请输入账户名称"
              style="width:220px"
            ></el-input>
          </el-form-item>
          <el-form-item
            label="登陆账号"
            prop="account_phone"
          >
            <el-input
              v-model="systemForm.account_phone"
              placeholder="请输入手机号"
              style="width:220px"
              oninput = "value=value.replace(/[^\d]/g,'')" maxlength="11" 
            ></el-input>
          </el-form-item>
        </el-form>
        <template #footer>
          <span class="dialog-footer">
            <el-button @click="dialogTableVisible = false">取 消</el-button>
            <el-button type="primary" @click="clickAccount()">生成账号</el-button>
          </span>
        </template>
      </el-dialog>
      <el-dialog
        title="用户信息"
        :visible.sync="dialogAccountVisible"
        style="width:50%;position:absolute;margin:auto;" 
      >
        <div class="successText">
          <p><i class="el-icon-user"></i>用户名：{{openingSuccess.name}}</p>
          <p><i class="el-icon-mobile-phone"></i>手机号：{{openingSuccess.mobile}}</p>
          <p v-if="isSearch"><i class="fa fa-key"></i>密 码：{{openingSuccess.password}}</p>
        </div>
        <template #footer v-if="isSearch">
          <span class="dialog-footer">
            <el-button v-clipboard:copy="openingSuccess.password" v-clipboard:success="onCopy" type="primary" size="medium">复制</el-button>
          </span>
        </template>
      </el-dialog>
    </d2-container>
  </div>
</template>

<script>
export default {
  name:'traddicplatform',
  data(){
    return{
      isOpen:false,
      loading:false,
      isSearch:true,
      currentTableData:[],//表格数组
      listQuery: {
        columns: "",
        orders: "",
        pageSize: 10,
        current: 1 //第几页
      },
      total: 0,
      stateFilters: [
        { label: "全部", value: ""},
        { label: "启用", value: 1 },
        { label: "暂停", value: 0 }
      ], //状态
      mediaArr:[],//筛选框媒体数组
      operationFilters:[],//筛选框运营数组
      businessFilters:[],//筛选框商务数组
      infoDelete: [], //选中的数组
      idlist: [], //数组id
      drawer:false,//高级筛选按钮状态
      form:{
        //筛选
        media_platform_name:"", //流量平台名称
        media_platform_code:"",//流量平台code
        status:"",//状态
        platform_arr:[],//投放平台
        operation_arr:[],//负责运营
        business_arr:[],//负责商务
      },
      //platformArr:[],
      //表格状态
      visibleDete: false, //删除popver框
      visibleUp: false, //启用
      visibleDown: false, //暂停
      forbidden: false, //是否启用
      deteleOut: false,//是否删除
      paused : false,//是否暂停



      dialogTableVisible:false,
      dialogAccountVisible:false,//开通成功需要展示的弹框
      systemForm:{
        //分账弹框
        account_name:"",
        account_phone:""
      },
      openingSuccess:{
        //开通分账系统成功返回的弹框
        mobile:"",
        name:"",
        password:""
      },
      iseditAccount:false,
      plat_title:'新增平台',
      dialogTableVisibleForm:false,
      mainForm:{
        media_platform_name:"",
        company_name:"",
        operation_id_arr:"",
        business_id_arr:""
      },
      business:[],
      operation:[],
      submitID:"",//区别新增编辑的id（新增不传编辑传）
      systemID:"",//分账系统需要当前页面的id
      rytproject:{
        media_platform_name:[
          {required:true,message:"流量平台名称不能为空",trigger:"blur"}
        ],
        company_name:[
          {required:true,message:"公司名称不能为空",trigger:"blur"}
        ],
        business_id_arr:[
          {required:true,message:"请选择平台商务",trigger:"blur"}
        ],
        operation_id_arr:[
          {required:true,message:"请选择平台运营",trigger:"blur"}
        ]
      }
    }
  },
  created(){
    this.getTrafficplatform();
    this.getOperation();
    this.getBusiness();
  },
  methods:{
    async clickAccount(){
      //生成分账系统账号
      const response = await this.$http.post(this.baseUrl.ip1+`/sourceSys/mediaPlatform/createChildAccount`,
        {
          name:this.systemForm.account_name,
          mobile:this.systemForm.account_phone,
          media_platform_id:this.systemID
        }
      );
      this.openingSuccess = response.data
      this.dialogTableVisible = false;
      if(response.code == 200){
        this.isSearch = true
        this.dialogAccountVisible = true
      } else {
        this.$message.error('新建失败')
      }
    },
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
    submitRule(str){
      //信息校验
      this.$refs.mainForm.validate( valid =>{
        if( valid ){
          this.submitForm()
        } else {
          this.$message({
            type: 'info',
            message: '您有未填写的信息，请检查'
          })
        }
      })
    },
    async submitForm(){
      //新增 编辑
      let params = {};
        params.media_platform_name=this.mainForm.media_platform_name,
        params.company_name=this.mainForm.company_name,
        params.operation_id_arr=this.mainForm.operation_id_arr,
        params.business_id_arr=this.mainForm.business_id_arr
        if(this.plat_title == '编辑平台') {
          params.id = this.submitID
        }
        const response = await this.$http.post(this.baseUrl.ip1+`/sourceSys/mediaPlatform/store`,params)
        .then(response =>{
          if(response.code == 200){
            this.$message.success(response.msg);
            this.dialogTableVisibleForm = false
            this.getTrafficplatform();
          }
        })
    },
    cancel(){
      //取消
      this.dialogTableVisibleForm = false
    },
    //获取流量平台数据列表
    async getTrafficplatform(){
      this.loading = true;
      let url = this.baseUrl.ip1 +`/sourceSys/mediaPlatform/index`
      let params = {
        limit: this.listQuery.pageSize,
        page: 1,
        media_platform_name:this.form.media_platform_name,
        media_platform_code:this.form.media_platform_code,
        status:this.form.status,
        platform_arr:this.form.platform_arr,
        operation_arr:this.form.operation_arr,
        business_arr:this.form.business_arr,
      };
      const { data:res } = await this.$http.post(url,params);
      this.currentTableData = res.data;
      this.listQuery.current = res.current_page;
      this.listQuery.limit = res.per_page;
      this.total = res.total;
      this.loading = false; 
      console.log('获取数据', this.currentTableData)
    },
    //运营下拉框
    async getOperation(){
      const {data: res} = await this.$http.get(this.baseUrl.ip1+`/sourceSys/options/operation`)
      console.log('运营人员下拉列表',res)
      var operation_list = res;
      operation_list.forEach((item, index) => {
        this.operationFilters.push({
          operation_name: item.name,
          operation_id: item.id
        });
        this.operation.push({
          operation_name: item.name,
          operation_id: item.id
        });
      });
    },
    //获取商务人员下拉列表
    async getBusiness(){
      const {data: res} = await this.$http.get(this.baseUrl.ip1+`/sourceSys/options/business`)
      console.log('商务人员下拉列表', res);
      let business_list = res;
      business_list.forEach((item,index) => {
        this.businessFilters.push({
          business_name:item.name,
          business_id:item.id
        });
        this.business.push({
          business_name:item.name,
          business_id:item.id
        })        
      });
    },
    handleSizeChange(val) {
      this.listQuery.pageSize = val;
      this.getTrafficplatform();
    },
    async handleCurrentChange(val){
      this.listQuery.current = val;
      this.loading = true;
      let params = {
        limit: this.listQuery.pageSize,
        page:  this.listQuery.current ,
        media_platform_name:this.form.media_platform_name,
        media_platform_code:this.form.media_platform_code,
        status:this.form.status,
        platform_arr:this.form.platform_arr,
        operation_arr:this.form.operation_arr,
        business_arr:this.form.business_arr,
      }
      const { data: res } = await this.$http.post(
        this.baseUrl.ip1 + `/sourceSys/mediaPlatform/index`,params
      )
      this.currentTableData = res.data;
      this.listQuery.current = res.current_page;
      this.listQuery.limit = res.per_page;
      this.total = res.total;
      this.loading = false;
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
          if (item.status == 1) {
            a1 = true;
          }
          if (item.status == 0) {
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
    nameChange(event,val) {
      //名称搜索
      if(val=='plat'){
        this.form.media_platform_name = event;
      } else if(val=='code'){
        this.form.media_platform_code = event
      }
      this.getTrafficplatform();
    },
    changeStatus(){
      //状态搜索 筛选 搜索 
      this.getTrafficplatform();
    },
    newButton(){
      this.mainForm = {
        media_platform_name:"",
        company_name:"",
        operation_id_arr:"",
        business_id_arr:""
      }
      this.dialogTableVisibleForm = true;
      this.plat_title = '新增平台'
    },
    handleClick(row){
      //编辑
      this.dialogTableVisibleForm = true;
      this.plat_title = '编辑平台'

      this.mainForm = {
        media_platform_name:"",
        company_name:"",
        operation_id_arr:"",
        business_id_arr:""
      }

      this.mainForm.media_platform_name = row.media_platform_name;
      this.mainForm.company_name = row.company_name;
      this.mainForm.operation_id_arr = row.operation_id_arr;
      this.mainForm.business_id_arr = row.business_id_arr;
      this.submitID = row.id
    },
    openSystem(row){
      //开通分账系统
      this.systemForm = {
        //分账弹框
        account_name:"",
        account_phone:""
      }
      this.dialogTableVisible = true
      this.systemID = row.id
    },
    adminClick(row){
      //账号管理
      this.isSearch = false
      this.searchAccount(row);
    },
    async searchAccount(row){
      //查看信息
      const response = await this.$http.get(this.baseUrl.ip1+`/sourceSys/mediaPlatform/getChildAccount/${row.id}`)
      if(response.code == 200){
        this.dialogAccountVisible = true
        this.openingSuccess.mobile = response.data.mobile
        this.openingSuccess.name = response.data.name
      } 
    },
    async deleteButton(){
      //删除
      this.visibleDete = false;
      let params = { id_arr: this.idlist};
      let url = this.baseUrl.ip1 +`/sourceSys/mediaPlatform/delete`;
      const { data:res} = await this.$http.post(url,params);
      this.$message.success("删除成功");
      //刷新
      this.getTrafficplatform();
    },
    cancelDelete() {
      //取消删除
      this.visibleDete = false;
      this.$message.error("取消删除操作");
    },
    async upButton(){
      //启用
      this.visibleUp = false
      let params = { id_arr: this.idlist,status:"1" };
      const { data:res} = await this.$http.post(
        this.baseUrl.ip1+`/sourceSys/mediaPlatform/updateStatus`,
        params
      );
      this.$message.success("启用成功");
      // 刷新列表
      this.getTrafficplatform();
    },
    cancelUp(){
      //取消启用
      this.visibleUp = false;
      this.$message.error("取消启用操作");
    },
    async downButton(){
      //暂停
      this.visibleDown = false;
      let params = { id_arr: this.idlist,status:"0" };
      const { data:res} = await this.$http.post(
        this.baseUrl.ip1+`/sourceSys/mediaPlatform/updateStatus`,
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
    cancelDown(){
      //取消暂停
      this.visibleDown = false;
      this.$message.error("取消暂停操作");
    },
    async putIn(){
      let params = { id_arr: this.idlist,status:"0" };
      const { data:res} = await this.$http.post(
        this.baseUrl.ip1+`/mediaPlatform/upStatus`,
        params
      );
      this.$message.success("暂停成功");
      this.getTrafficplatform();
    },

    async switchChange(val,event){
      console.log(val,event,this.idlist);
      var that = this;
      var idArr = [];
      idArr.push(val.id);

    
      let params = { status: event, id_arr: idArr};
      const response = await this.$http.post(this.baseUrl.ip1 + `/sourceSys/mediaPlatform/updateStatus`,params)
      .then(function(response){
        if(response.code==200){
          that.$message.success('状态修改成功')
              // 刷新列表
          this.getTrafficplatform();
         } else{
            // 刷新列表
          this.getTrafficplatform();
         }
      })
    },


    createMedia(row){
      //跳转新建应用
      this.$router.push({
        path:"mediaList/editMedias",
        query:{
          id:row.id,
          type:"1",//标识
          where:"trafficplatform"
        }
      })
    },
    filterMeida(row){
      //跳转媒体列表
      this.$router.push({
        path:"mediaList",
        query:{
          media_platform_id:row.id
        }
      })
    },
  }
}
</script>

<style lang="scss">
  .trafficplatformList{
    .menuPartClass{
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
    .filter{
      float: right;
    }
    .successText{
      font-family: "Times New Roman", Times, serif;
      font-style: normal;
      font-weight: bold;
    }
  }
</style>