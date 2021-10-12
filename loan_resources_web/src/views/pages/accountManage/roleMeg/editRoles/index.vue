<template>
  <!-- create by lyp on 2019-12-12 -->
  <d2-container>
    <template slot="header">
      <div class="flex ryt-right-top">
        <div class="line_header"></div>
        {{ title }}
      </div>
    </template>
    <div class="roleForm">
      <el-form
        ref="projectInfoRef"
        :model="usersForm"
        :rules="rytproject"
        style="padding-left: 50px;"
      >
        <el-form-item label="角色名称 :" prop="name">
          <el-input
            style="width: 300px;"
            v-model="usersForm.name"
            placeholder="请输入角色名称"
          ></el-input>
        </el-form-item>
        <div class="addRoles_title" style="margin-left:-6px">
          <div class="formTitle">配置模板</div>
        </div>
        <el-table
          :data="tableData"
          max-height="700"
          size="medium"
          class="tableClass"
          :header-cell-style="{ background: '#f5f5f5' }"
        >
          <el-table-column
            label="权限类型"
            align="center"
            prop="id"
            width="250"
            class="table-header"
          >
            <template slot-scope="scope">
              <el-form-item style="margin-bottom: 0px;">
                <el-checkbox
                  v-model="scope.row.selectId"
                  :true-label="1"
                  :false-label="0"
                  @change="
                    (checked) => handleCheckChange(checked, scope.row.id)
                  "
                  >{{ scope.row.name }}</el-checkbox
                >
              </el-form-item>
            </template>
          </el-table-column>

          <el-table-column label="权限名称" align="left" width="200">
            <template slot-scope="scope">
              <el-form-item class="table-name">
                <el-checkbox-group v-model="scope.row.second">
                  <el-checkbox
                    v-show="item.id"
                    v-for="item in scope.row.secondAll"
                    :label="item.id"
                    :key="item.id"
                    :disabled="scope.row.selectId ? false : true"
                    @change="
                      (checked) =>
                        handChange(
                          checked,
                          scope.row.secondAll,
                          scope.row.second,
                          item.id
                        )
                    "
                  >
                    {{ item.name }}
                    <!-- <el-button
                      v-show="scope.row.id =='2'"
                      type="text"
                      size="medium"
                      :disabled="item.checked ? false :true"
                      @click="initAllColumn(scope.row,item.id)"
                    >设置字段</el-button> -->
                  </el-checkbox>
                </el-checkbox-group>
              </el-form-item>
            </template>
          </el-table-column>
          <!-- 操作 -->
          <el-table-column label="操作" width="250" align="left">
            <template slot-scope="scope">
              <el-form-item
                class="useClass"
                v-for="item in scope.row.secondAll"
                :key="item.id"
              >
                <el-button
                  v-show="scope.row.id == '6'"
                  type="text"
                  size="medium"
                  :disabled="item.checked ? false : true"
                  @click="initAllColumn(scope.row, item.id)"
                  >设置字段
                </el-button>

                <div v-show="item.id == 1">
                  <el-checkbox-group v-model="item.useArray">
                    <el-checkbox
                      style="margin-left: -5px;margin-right: 15px;"
                      :disabled="item.checked ? false : true"
                      v-for="(items, index) in item.useShowArray"
                      :label="items.is_created"
                      :key="index"
                      @change="ClickChangeTwo()"
                    >
                      {{ items.name }}
                    </el-checkbox>
                  </el-checkbox-group>
                </div>

                <!-- </div> -->
              </el-form-item>
            </template>
          </el-table-column>
          <!-- 操作-完 -->
          <el-table-column label="权限描述" width="250" align="left">
            <template slot-scope="scope">
              <el-form-item class="table-border">
                <div
                  v-for="(item, index) in scope.row.secondAll"
                  :key="index"
                  style="border:none;line-height:20px"
                >
                  {{ item.text }}
                </div>
              </el-form-item>
            </template>
          </el-table-column>
        </el-table>
        <el-form-item style="padding-left: 150px;margin-top:20px">
          <el-button type="primary" @click="handleAddForm">提交</el-button>
        </el-form-item>
      </el-form>
      <div v-if="dialogVisible">
        <selectDialog
          :dialogVisible="dialogVisible"
          :dataLists="dialogDataList"
          :selectColumnArr="selectColumnArr"
          @clickPlay="clickPlay"
          @handleClose="handleClose"
          @clearAll="clearAll"
        ></selectDialog>
      </div>
    </div>
  </d2-container>
</template>

<script>
const cityOptions = ["基本信息", "产品信息"];
import selectDialog from "../../../../../components/selectData/selectDialog.vue";
export default {
  name: "editRoles",
  components: {
    selectDialog,
  },
  data() {
    return {
      checkAll: false,
      checkedCities: ["基本信息", "产品信息"],
      cities: cityOptions,
      isIndeterminate: true,

      all_info: 0,
      base_info: 1,
      product_info: 1,
      usersForm: {
        name: "", //角色名称
        id: "",
      },
      title: "",
      limit_level_options: [],
      tableData: [
        {
          selectId: 0, //是否选中权限类型
          id: 18, //权限id
          name: "资源管理", //权限名称
          secondAll: [
            {
              id: 46,
              name: "平台管理",
              text: "可以创建/编辑SSP平台",
              list: [],
              checked: false,
            },
            {
              id: 47,
              name: "应用管理",
              text: "可以创建/编辑应用",
              list: [],
              checked: false,
            },
            {
              id: 48,
              name: "广告位管理",
              text: "可以创建/编辑广告位",
              list: [],
              checked: false,
            },
          ],
          second: [
            //选中的权限
          ],
        },
        {
          selectId: 0,
          id: 19,
          name: "录入支出",
          secondAll:[
            {
              id: 49,
              name: "录入支出",
              text: "数据录入",
              checked: false,
            }
          ],
          second:[]
        },
        {
          selectId: 0,
          id: 20,
          name: "数据报表",
          secondAll: [
            {
              id:53,
              name:"整体数据",
              text:"可以查看整体数据",
              list:[],
              checked:false
            },
            {
              id:50,
              name: "发布数据",
              text: "可以查看发布数据",
              list: [],
              checked: false
            },
          ],
          second: [
            //选中的权限
          ],
        },
        {
          selectId: 0,
          id: 21,
          name: "账户管理", 
          secondAll: [
            //所有的权限
            {
              id: 51,
              name: "账户管理",
              text: "可以新建、编辑、删除账户",
              checked: false,
            },
            {
              id: 52,
              name: "角色管理",
              text: "可以新建、编辑、删除角色",
              checked: false,
            },
          ],
          second: [
            //选中的权限
          ],
        },
      ],
      rytproject: {
        name: [
          { required: true, message: "请输入角色名称", trigger: "blur" },
          { min: 1, max: 30, message: "字符1-30之间", trigger: "blur" },
        ],
      },
      tableRules: {
        second: [
          { required: true, message: "请选择权限名称", trigger: "blur" },
        ],
      },
      newData: [],
      showData: [],
      hiddenData: [],
      dataList: [],
      renderFunc(h, option) {
        return (
          <span>
            {option.key} - {option.label}
          </span>
        );
      },
      column_id: "", //列控制传的id
      dialogVisible: false,
      selectColumnArr: [],
      dialogDataList: [],
    };
  },
  methods: {
    clearAll() {
      this.selectColumnArr = [];
      this.refreshCheckedData();
    },
    cinfigShow(str) {
      this.selectColumnArr = JSON.parse(JSON.stringify(this.showData));
      this.dialogDataList = JSON.parse(JSON.stringify(this.AllData));
      this.$forceUpdate();
      this.refreshCheckedData();
      this.dialogVisible = true;
    },
    handleClose() {
      this.dialogVisible = false;
    },
    clickPlay(operation, isSelectSave, saveName, selectArr) {
      this.selectColumnArr = JSON.parse(JSON.stringify(selectArr));
      if (operation != 0) {
        for (let e = 0; e < this.tableData.length; e++) {
          for (let r = 0; r < this.tableData[e].secondAll.length; r++) {
            if (this.tableData[e].secondAll[r].id == this.column_id) {
              this.tableData[e].secondAll[r].list = this.selectColumnArr;
            }
          }
        }
      } else {
        console.log("取消");
      }
      this.dialogVisible = false;
    },

    // 同步左侧勾选
    refreshCheckedData() {
      if (this.selectColumnArr.length == 0) {
        return;
      }
      this.dialogDataList.forEach((fitem) => {
        fitem.child.forEach((item) => {
          let count = 0;
          item.allChecked = false;
          item.child.forEach((data) => {
            data.checked = false;
            this.selectColumnArr.forEach((selectItem) => {
              if (data.id == selectItem.id) {
                data.checked = true;
                count++;
              }
            });
          });
          if (count == item.child.length) {
            item.allChecked = true;
          }
        });
      });
      console.log(this.dialogDataList);
    },
    handleCheckChange(val, id) {
      //如果没有选择，则把权限名称全部默认未选中状态
      this.tableData.forEach((item, index) => {
        if (item.id == id && val != "1") {
          item.second = [];
        }
      });
    },
    handChange(check, dataAll, data, id) {
      dataAll.forEach((item, index) => {
        if (item.id == id) {
          if (!check) {
            // item.list = [];
          }
          item.checked = check;
        }
      });
    },
    //获取编辑信息
    async getRoleInfo() {
      let id = this.$route.query.id;
      let url = this.baseUrl.ip1 + `/role/update/${id}`;
      const { data: res } = await this.$http.get(url);
      this.usersForm.name = res.name;
      this.usersForm.id = res.id;
      let newJieshou = [];
      newJieshou = res.permissions;
      newJieshou.forEach((item, index) => {
        this.tableData.forEach((p, o) => {
          // if(p.id == '4'){
          //   if(p.secondAll[1])
          //     console.log('打印返回数据',p,o);
          // }
          if (item.id == p.id) {
            p.selectId = 1;
            item.second.map((q) => {
              p.second.push(q.id);
            });
            p.secondAll.forEach((e, r) => {
              item.second.forEach((k, w) => {
                if (e.id == k.id) {
                  e.checked = true;
                  e.list = k.list;
                  e.is_created = k.is_created;
                  e.is_edit = k.is_edit;
                  e.is_deleted = k.is_deleted;
                  e.edit_column = k.edit_column;
                  e.is_commission = k.is_commission;
                }
              });
            });
          }
        });
      });
      this.tableData.forEach((item, index) => {
        if (item.id == "1") {
          if (item.secondAll[0].id == "1") {
            if (item.secondAll[0].is_commission == 1) {
              item.secondAll[0].useArray.push(1);
              item.secondAll[0].useShowArray[0].check = true;
            }
          }
        }
      });
      console.log("打印返回数据", this.tableData);
    },

    ClickChangeTwo() {
      this.tableData.forEach((item, index) => {
        if (item.id == "1") {
          if (item.secondAll[0].id == "1") {
            //  console.log("打印书怒",item.secondAll[0].useShowArray[0].check);
            if (item.secondAll[0].useShowArray[0].check == false) {
              item.secondAll[0].is_commission = 1;
              item.secondAll[0].useShowArray[0].check = true;
            } else {
              item.secondAll[0].is_commission = 0;
              item.secondAll[0].useShowArray[0].check = false;
            }
          }
        }
      });

      console.log("打印\数据", this.tableData);
    },
    ClickChange(numberStr) {
      this.tableData.forEach((item, index) => {
        if (item.id == "4") {
          if (item.secondAll[1].id == "2") {
            item.secondAll[1].useShowArray[numberStr].check = !item.secondAll[1]
              .useShowArray[numberStr].check;

            if (numberStr == "0") {
              if (item.secondAll[1].useShowArray[numberStr].check) {
                item.secondAll[1].is_created = "1";
              } else {
                item.secondAll[1].is_created = "0";
              }
            } else if (numberStr == "1") {
              if (item.secondAll[1].useShowArray[numberStr].check) {
                item.secondAll[1].is_edit = "1";
              } else {
                item.secondAll[1].is_edit = "0";
              }
            } else if (numberStr == "2") {
              if (item.secondAll[1].useShowArray[numberStr].check) {
                item.secondAll[1].is_deleted = "1";
              } else {
                item.secondAll[1].is_deleted = "0";
              }
            }
          }
        }
      });
    },
    handleCheckAllChange(val) {
      this.checkedCities = val ? cityOptions : [];
      this.isIndeterminate = false;
    },
    handleCheckedCitiesChange(value) {
      let checkedCount = value.length;
      this.checkAll = checkedCount === this.cities.length;
      this.isIndeterminate =
        checkedCount > 0 && checkedCount < this.cities.length;
    },

    //提交角色信息
    handleAddForm() {
      if (this.usersForm.name) {
        this.newData = [];
        this.tableData.forEach((item, index) => {
          if (item.selectId == "1") {
            for (var a = 0; a < item.secondAll.length; a++) {
              for (var b = 0; b < item.second.length; b++) {
                if (item.secondAll[a].id == item.second[b]) {
                  item.second[b] = item.secondAll[a];
                  delete item.secondAll[a].text;
                }
              }
            }
            this.newData.push(item);
          }
        });
        for (var q = 0; q < this.newData.length; q++) {
          if (this.newData[q].second) {
            delete this.newData[q].selectId;
            delete this.newData[q].secondAll;
            delete this.newData[q].checked;
          }
        }
        this.$nextTick(() => {
          this.$refs.projectInfoRef.validate((valid) => {
            if (valid) {
              this.usersForm.id ? this.saveSubmit() : this.handleSubmit();
              //  console.log('提交的信息',this.newData);
            }
            // console.log('提交的信息',this.checkedCities);
          });
        });
      } else {
        this.$message.success("请输入角色名称");
      }
    },
    async saveSubmit() {
      //编辑保存
      let id = this.$route.query.id;
      let url = this.baseUrl.ip1 + `/role/update/${id}`;
      let listing = {
        name: this.usersForm.name,
        permissions: this.newData,
      };
      const { data: res } = await this.$http.post(url, listing);
      //修改之后回到上一页
      this.$router.go(-1);
    },
    async handleSubmit() {
      //新增保存
      let url = this.baseUrl.ip1 + `/role/store`;
      let listing = {
        name: this.usersForm.name,
        permissions: this.newData,
      };
      const { data: res } = await this.$http.post(url, listing);
      this.$router.go(-1);
    },
    /*---------------列设置开始---------------*/
    dragstart(e) {
      this.moveDom = e.currentTarget;
      this.startY = e.clientY;
    },
    async initAllColumn(row, id) {
      this.column_id = id;
      let url = "";
      if (this.$route.query.id) {
        url =
          this.baseUrl.ip1 +
          `/directory/columnList?directory_id=${this.column_id}&role_id=${this.$route.query.id}`;
      } else {
        url =
          this.baseUrl.ip1 +
          `/directory/columnList?directory_id=${this.column_id}`;
      }
      const { data: res } = await this.$http.get(url);
      const list = res;
      this.AllData = res.all_column;
      this.hiddenData = res.hide_column;
      this.showData = res.show_column;
      let appObj = [];
      this.AllData.forEach((item) => {
        appObj.push({
          key: item.field,
          label: item.name,
        });
      });
      for (var a = 0; a < this.tableData.length; a++) {
        for (var b = 0; b < this.tableData[a].secondAll.length; b++) {
          var bb = this.tableData[a].secondAll[b];
          if (this.tableData[a].secondAll[b].id == id) {
            this.hiddenData = [];
            var newHidden = this.AllData.map((item, index) => {
              return item.field;
            }).filter((item) => {
              return bb.list.includes(item) ? "" : item;
            });
            this.hiddenData = this.AllData.filter((v) =>
              newHidden.includes(v.field)
            );
          }
        }
      }
      this.cinfigShow();
    },

    /*---------------列设置结束---------------*/
  },
  created() {
    if (this.$route.query.id) {
      this.title = "编辑角色";
    } else {
      this.title = "新增角色";
    }
    if (this.$route.query.id) {
      //有id，证明是编辑进来的
      this.getRoleInfo();
    }
  },
};
</script>
<style lang="scss" scoped>
.addRoles_title {
  margin-bottom: 30px;
  .formTitle {
    margin: 0 10px 20px;
    font-size: 14px;
    // border-bottom:1px solid #eee;
    color: rgb(102, 102, 102);
    font-weight: 700;
  }
}
// .buttonClass{

// }
.tableClass {
  ::v-deep .el-form-item {
    margin-bottom: 0;
  }

  // .table-header{
  //   ::v-deep .el-table .cell{
  //   margin-left: 20px;
  // }
  // }
  .table-border {
    ::v-deep .el-checkbox__inner {
      border: none;
      background: none;
    }
  }
  .useClass {
    ::v-deep .el-form-item__content {
      line-height: 22px;
    }
    ::v-deep .el-button {
      padding: 0;
    }
  }
  //   .el-form-item__content {
  //     line-height: 40px;
  //     position: relative;
  //     font-size: 14px;
  // }
  .table-name {
    ::v-deep .el-form-item__content {
      line-height: 1.5;
    }
    ::v-deep .el-checkbox {
      margin-right: 0;
      display: block;
    }
    ::v-deep .el-button {
      padding: 0;
    }
  }
}
</style>
