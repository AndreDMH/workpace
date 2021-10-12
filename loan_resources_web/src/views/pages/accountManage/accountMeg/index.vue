<template>
  <div class="accounts">
    <d2-container>
      <template slot="header">
        <div class="flex ryt-right-top">
          <div class="line_header"></div>
          账户管理
        </div>
      <!-- 按钮事件 start 新建、删除、启用、暂停-->
      <div class="menuPartClass">

      <el-form
        :inline="true"
        :model="form"
        ref="form"
        size="small"
        style="margin-top: 11px;"
      >
        <el-form-item>
          <el-button type="primary" size="mini" style="margin-top:11px;margin-left:11px;" @click="handleFormSubmit">
            <d2-icon name="plus" /> 新建账户
          </el-button>
        </el-form-item>

        <el-form-item>
          <el-popover placement="bottom-end" width="160" v-model="visibleDete">
            <p>您确定删除该账户吗？</p>
            <div style="margin: 0;text-align: right;">
              <el-button size="mini" type="text" @click="cancelDelete('1')"
                >取消</el-button
              >
              <el-button type="primary" size="mini" @click="deleteButtonType"
                >确定</el-button
              >
            </div>
            <el-button slot="reference"  style="margin-top:11px;" size="mini" :disabled="deteleOut == false">
              <d2-icon name="remove" /> 删除
            </el-button>
          </el-popover>
        </el-form-item>
        <el-form-item>
          <el-popover placement="bottom-end" width="160" v-model="visibleUp">
            <p>您确定启用该账户吗？</p>
            <div style="margin: 0;text-align: right;">
              <el-button size="mini" type="text" @click="cancelDelete('2')"
                >取消</el-button
              >
              <el-button type="primary" size="mini" @click="upButtonType"
                >确定</el-button
              >
            </div>
            <el-button slot="reference" size="mini" style="margin-top:11px;" :disabled="forbidden == false">
              <d2-icon name="play" /> 启用
            </el-button>
          </el-popover>
        </el-form-item>
        <el-form-item>
          <el-popover placement="bottom-end" width="160" v-model="visibleDown">
            <p>您确定暂停该账户吗？</p>
            <div style="margin: 0;text-align: right;">
              <el-button size="mini" type="text" @click="cancelDelete('3')"
                >取消</el-button
              >
              <el-button type="primary" size="mini" @click="downButtonType"
                >确定</el-button
              >
            </div>
            <el-button slot="reference" size="mini" style="margin-top:11px;" :disabled="paused == false">
              <d2-icon name="pause" /> 暂停
            </el-button>
          </el-popover>
        </el-form-item>
        <!-- <el-form-item label="角色：" prop="role">
           <el-select v-model="form.role" placeholder="选择角色" style="width: 100px;" @change="roleChanges">
            <el-option
            v-for="(item,index) in roleArr"
            :key="index"
            :label="item.label"
            :value="item.value">
            </el-option>
           </el-select>
        </el-form-item>
        <el-form-item label="状态：" prop="state">
          <el-select v-model="form.state" placeholder="选择状态" style="width: 100px;" @change="stateChanges">
            <el-option label="全部" value="all" />
            <el-option label="启用" value="1" />
            <el-option label="暂停" value="0" />
          </el-select>
        </el-form-item> -->
        <el-form-item size="mini" style="float: right;margin-top:11px" label prop="name">
          <el-input
            v-model="form.name"
            placeholder="请输入账户名称"
            style="width: 240px;"
            @change="nameChanges"
          />
          <i class="fa fa-search ryt-search-icon" aria-hidden="true"></i>
        </el-form-item>
      </el-form>
      </div>

    </template>

      <!-- 按钮事件 end-->
      <!-- 模糊搜索 start-->
      <!-- 模糊搜索 end-->
      <!-- *******表格开始**********  -->
      <el-table
        :data="table"
       
        border
        v-loading="loading"
        ref="tables"
        style="width: 100%; margin-top:-20px"
        @selection-change="handleSelectionChange"
        @filter-change="handleFilterChange"
        :header-cell-style="{ background: '#f5f5f5' }"
      >
        <el-table-column type="selection" width="55"></el-table-column>

        <el-table-column label="账户名称" prop="name" align="center">
          <template slot-scope="scope">{{ scope.row.name }}</template>
        </el-table-column>
        <el-table-column label="登录账号" align="center" prop="mobile">
          <template slot-scope="scope">{{ scope.row.mobile }}</template>
        </el-table-column>
        <el-table-column
          label="角色"
          align="center"
          prop="role_name"
          :filters="roleArr"
          :filter-multiple="false"
          column-key="role_name"
          filter-placement="bottom-end"
        >
          <template slot-scope="scope">{{ scope.row.role_name }}</template>
        </el-table-column>
        <el-table-column label="创建时间" align="center" prop="updated_at">
          <template slot-scope="scope">{{ scope.row.updated_at }}</template>
        </el-table-column>
        <el-table-column
          label="状态"
          width="100"
          align="center"
          :filters="stateFilters"
          :filter-multiple="false"
          column-key="state"
          filter-placement="bottom-end"
        >
          <template slot-scope="scope" prop="state_txt">
            <p
              size="medium"
              style="color:#00cc99"
              v-if="scope.row.state == '1'"
            >
              {{ scope.row.state_txt }}
            </p>
            <p
              size="medium"
              style="color:#FF0000"
              v-if="scope.row.state == '0'"
            >
              {{ scope.row.state_txt }}
            </p>
          </template>
        </el-table-column>
        <el-table-column label="操作" min-width="80" align="center">
          <template slot-scope="scope">
            <el-button @click="handleClick(scope.row)" type="text"  size="medium"
              >编辑</el-button
            >
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
import { BusinessTable1List } from "@api/demo.business.table.1";
export default {
  // name 值和本页的 $route.name 一致才可以缓存页面
  name: "accounts",
  data() {
    return {
      form: {
        name: "", //账户
        state: "all", //状态
        role: "0", //角色
      },
      roleArr: [], //角色数组
      loading: false,
      table: [],
      listQuery: {
        columns: "",
        orders: "",
        pageSize: 10,
        current: 1, //第几页
      },
      // currentPage: 1, //默认当前页
      // pageSize: 0, //每页显示多少
      total: 0,
      infoDelete: [], //选中的数组
      idlist: [], //数组id
      visibleDete: false,
      visibleUp: false,
      visibleDown: false,
      forbidden: false,
      deteleOut: false,
      paused: false,
      stateFilters: [
        { text: "启用", value: "1" },
        { text: "暂停", value: "0" },
      ], //状态
    };
  },
  created() {
    this.selectAll();
    this.initAccount();
  },
  mounted() {
    setTimeout(() => {
      this.$refs.tables.doLayout();
    }, 1200);
  },
  methods: {
    async selectAll() {
      const { data: res } = await this.$http.get(
        this.baseUrl.ip1 + `/role/index`,
        {
          params: {
            type: "all",
          },
        }
      );
      console.log("res", res);
      var arrs = res;
      arrs.forEach((item, index) => {
        if (item.id != 0) {
          this.roleArr.push({
            text: item.name,
            value: String(item.id),
          });
        }
      });
    },
    async initAccount() {
      this.loading = true;
      const { data: res } = await this.$http.get(
        this.baseUrl.ip1 + "/user/index",
        {
          params: {
            limit: this.listQuery.pageSize,
            page: "1",
            name: this.form.name,
            role: this.form.role,
            state: this.form.state,
          },
        }
      );
      // if (res.code !== 200) return this.$message.error('数据获取失败');
      console.log(res);
      this.table = res.data;
      this.listQuery.current = res.current_page;
      this.listQuery.limit = res.per_page;
      this.total = res.total;
      this.loading = false;
    },
    nameChanges(value) {
      //账户搜索
      this.form.name = value;
      this.initAccount();
    },
    stateChanges(value) {
      //状态搜索
      console.log(value);
      this.form.state = value;
      this.initAccount();
    },
    roleChanges(value) {
      //角色搜索
      this.form.role = value;
      this.initAccount();
    },
    handleFormSubmit() {
      //新建
      this.$router.push({
        path: "accountMeg/editAccounts",
      });
    },
    handleSelectionChange(data) {
      console.log(data);
      this.infoDelete = data;
      let idlist = [];
      this.infoDelete.map((item) => {
        idlist.push(item.id);
      });
      this.idlist = idlist;
      let a1 = false;
      let a2 = false;
      console.log(data);
      if (data.length > 0) {
        data.forEach((item) => {
          if (item.state == 0) {
            a1 = true;
          }
          if (item.state == 1) {
            a2 = true;
          }
          console.log(a1, a2);
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
      } else {
        this.forbidden = false;
        this.deteleOut = false;
        this.paused = false;
      }
    },
    async deleteButtonType() {
      //删除按钮
      this.visibleDete = false;
      let params = { ids: this.idlist };
      let url = this.baseUrl.ip1 + `/user/destroy`;
      const { data: res } = await this.$http.post(url, params);
      this.$message.success("删除成功");
      // 刷新列表
      this.initAccount();
    },
    handleFilterChange(filters) {
      //筛选
      if (filters.state) {
        //结算方式
        this.form.state = filters.state[0];
      } else if (filters.role_name) {
        this.form.role = filters.role_name[0];
      }
      this.initAccount();
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
    async upButtonType() {
      //启用按钮
      this.visibleUp = false;
      let params = { ids: this.idlist };
      let url = this.baseUrl.ip1 + `/user/state/up`;
      const { data: res } = await this.$http.post(url, params);
      this.$message.success("启用成功");
      // 刷新列表
      this.initAccount();
    },
    async downButtonType() {
      //暂停按钮
      this.visibleDown = false;
      let params = { ids: this.idlist };
      let url = this.baseUrl.ip1 + `/user/state/down`;
      const { data: res } = await this.$http.post(url, params);
      this.$message.success("暂停成功");
      // 刷新列表
      this.initAccount();
    },
    handleClick(row) {
      //编辑
      this.$router.push({
        path: "accountMeg/editAccounts",
        query: {
          id: row.id,
        },
      });
    },
    handleSizeChange(val) {
      this.listQuery.pageSize = val;
      this.initAccount();
    },
    async handleCurrentChange(val) {
      this.listQuery.current = val;
      this.loading = true;
      const { data: res } = await this.$http.get(
        this.baseUrl.ip1 + "/user/index",
        {
          params: {
            limit: this.listQuery.pageSize,
            page: this.listQuery.current,
            name: this.form.name,
            role: this.form.role,
            state: this.form.state,
          },
        }
      );
      // if (res.code !== 200) return this.$message.error('数据获取失败');
      console.log(res);
      this.table = res.data;
      this.listQuery.current = res.current_page;
      this.listQuery.limit = res.per_page;
      this.total = res.total;
      this.loading = false;
    },
  },
};
</script>
<style lang="scss">
 .accounts{
   .menuPartClass{
      margin-bottom: -10px;
      width:100%;
      min-height: 38px; 
      background-color: white;
      box-shadow: 0 2px 8px 0 #dff3ff;
      padding-bottom: 0px;
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
 }
   
</style>
