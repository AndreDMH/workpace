<template>
  <!-- create by lyp on 2019-12-12 -->
  <div class="role">
    <d2-container>
      <template slot="header">
        <div class="flex ryt-right-top">
          <div class="line_header"></div>
          角色管理
        </div>
        <div class="menuPartClass">

        <el-form
          ref="usersForm"
          size="small"
          :inline="true"
          style="margin-top: 10px"
          :model="usersForm"
        >
          <el-form-item>
            <el-button type="primary"  size="mini" style="margin-top:11px;margin-left:11px;margin-top: 11px;" @click="goToEditPage">
              <d2-icon name="plus" />
              新建角色
            </el-button>
          </el-form-item>
          <el-form-item style="float: right;margin-top:11px;" label="">
            <el-input
            size="mini"
              v-model="usersForm.user"
              placeholder="请输入角色名称"
              @change="selectedusers"
              style="width: 200px;"
            />
            <i class="fa fa-search ryt-search-icon" aria-hidden="true"></i>
          </el-form-item>
        </el-form>
        </div>
      </template>




      <el-table
        ref="rytUsersRef"
        :data="rytUsersData"
        highlight-current-row
        border
        :header-cell-style="{ background: '#f5f5f5' }"
        style="width: 100%;margin-top:-20px"
      >
        <el-table-column
          property="name"
          label="角色名称"
          align="center"
          width="220"
        >
        </el-table-column>
        <el-table-column property="user_count" label="账户数量" align="center">
        </el-table-column>
        <el-table-column property="created_at" label="创建时间" align="center">
        </el-table-column>
        <el-table-column label="操作" align="center">
          <template slot-scope="scope">
            <div class="operation">
              <span @click="editRole(scope.row.id)" >编辑</span>
              <span @click="deletedRole(scope.row.id)">删除</span>
            </div>
          </template>
        </el-table-column>
      </el-table>
      <el-pagination
        slot="footer"
        :current-page="listQuery.current"
        :page-size="listQuery.pageSize"
        :total="total"
        :page-sizes="[10, 20, 40, 60]"
        layout="total, sizes, prev, pager, next, jumper"
        style="margin: -10px"
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
      ></el-pagination>
    </d2-container>
  </div>
</template>

<script>
export default {
  name: "role",
  data() {
    return {
      usersForm: {
        user: "",
      },
      listQuery: {
        columns: "",
        orders: "",
        pageSize: 10,
        current: 1, //第几页
      },
      total: 0,
      rytUsersData: [],
    };
  },
  methods: {
    // 跳转到编辑页面
    goToEditPage() {
      this.$router.push("roleMeg/editRoles");
    },
    async listall() {
      let url = this.baseUrl.ip1 + `/role/index`;
      const { data: res } = await this.$http.get(url, {
        params: {
          limit: this.listQuery.pageSize,
          page: "1",
          name: this.usersForm.user,
        },
      });
      this.rytUsersData = res.data;
      this.listQuery.current = res.current_page;
      this.listQuery.limit = res.per_page;
      this.total = res.total;
    },
    editRole(id) {
      this.$router.push({
        path: "roleMeg/editRoles",
        query: {
          id: id,
        },
      });
    },
    async deletedRole(id) {
      let url = this.baseUrl.ip1 + `/role/destroy/${id}`;
      const { data: res } = await this.$http.post(url);
      this.$message.success("删除角色成功");
      this.listall();
    },
    async selectedusers(val) {
      this.usersForm.user = val;
      this.listall();
    },
    async handleSizeChange(val) {
      this.listQuery.pageSize = val;
      this.listall();
    },
    async handleCurrentChange(val) {
      this.listQuery.current = val;
      let url = this.baseUrl.ip1 + `/role/index`;
      const { data: res } = await this.$http.get(url, {
        params: {
          limit: this.listQuery.pageSize,
          page: this.listQuery.current,
          name: this.usersForm.user,
        },
      });
      this.rytUsersData = res.data;
      this.listQuery.current = res.current_page;
      this.listQuery.limit = res.per_page;
      this.total = res.total;
    },
  },
  created() {
    this.listall();
  },
};
</script>
<style lang="scss">
.role {
  .menuPartClass {
    margin-bottom: 0px;
    width: 100%;
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
.operation span {
  margin: 0 3px;
  color: #5485f7;
}

.operation span:hover {
  color: red;
  cursor: pointer;
}
</style>