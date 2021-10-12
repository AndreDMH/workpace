<template>
  <div class="productData">
    <el-dialog
      title="自定义列"
      :visible.sync="dialogVisible"
      class="abow_dialog"
      v-if="dialogVisible"
      :before-close="handleClose"
      width="75%"
    >
      <div style="display:flex;margin-top:-15px">
        <el-input
          v-model="searchName"
          autocomplete="off"
          maxlength="20"
          style="width:45%;"
          placeholder="请输入可搜索的列名称"
          @clear="clearSearch"
          clearable
        ></el-input>
        <el-button
          type="primary"
          style="margin-left:5px;"
          icon="el-icon-search"
          @click="search"
          >搜索</el-button
        >
      </div>
      <div
        style="margin-top:15px;height:400px;display:flex;justify-content: space-between;"
      >
        <!-- 选择区 -->
        <selectData
          :dataList="currentDataLists"
          @checkedChange="checkedChange"
        ></selectData>
        <!-- 选中区 -->
        <div
          style="width: 226px;padding-bottom: 9px;border: #E4E9ED 1px solid;height:400px;margin-left:15px;"
        >
          <div
            style="background-color: #F9FAFD;border-bottom:1px solid #E4E9ED;box-sizing: border-box;line-height: 22px;padding: 8px 12px;"
          >
            <span>{{ "已选" + selectColumnArr2.length + "列" }}</span>
            <span
              v-show="selectColumnArr2.length > 0"
              style="cursor: pointer;font-size: 14px;color: #2F88FF;float: right;"
              @click="clearAll"
              >全部清空</span
            >
          </div>
          <!--使用draggable组件 v-model绑定数组-->
          <draggable
            v-model="selectColumnArr2"
            style="height:360px;overflow:scroll;"
          >
            <transition-group>
              <div class="item" v-for="item in selectColumnArr2" :key="item.id">
                <i class="el-icon-s-operation"></i>
                {{ item.name }}
                <i
                  class="el-icon-close"
                  style="float: right;margin-top: 7px;cursor: pointer;"
                  @click="deleteColumn(item)"
                ></i>
              </div>
            </transition-group>
          </draggable>
        </div>
      </div>
      <div
        slot="footer"
        style="display:flex; justify-content:space-between;align-items:center;"
      >
        <div>
          <div v-show="isCanSave" style="display:flex; align-items:center;">
            <el-checkbox
              v-model="isSelectSave"
              style="margin-right: 5px;font-size:16px;"
              class="data-wrapper"
              >保存为常用自定义列</el-checkbox
            >

            <el-input
              v-show="isSelectSave"
              v-model="saveColumnName"
              autocomplete="off"
              maxlength="20"
              size="small"
              show-word-limit
              style="width:240px;margin-left:15px;"
              placeholder="请输入自定义列名"
            ></el-input>
          </div>
        </div>

        <span class="dialog-footer">
          <el-button @click="clickPlay(0)">取消</el-button>
          <el-button type="primary" @click="clickPlay(1)">应用</el-button>
        </span>
      </div>
    </el-dialog>
  </div>
</template>
<script>
import selectData from "./selectData";
import draggable from "vuedraggable";
export default {
  components: {
    selectData,
    draggable,
  },
  data() {
    return {
      searchName: "",
      isSelectSave: false,
      currentDataLists: [],
      saveColumnName: "",
      selectColumnArr2:[],
    };
  },
  props: {
    saveName: {
      type: String,
      default: "",
    },
    dataLists: {
      required: true,
      type: [Array, Object],
      default: [],
    },
    selectColumnArr: {
      required: true,
      type: [Array, Object],
      default: [],
    },
    dialogVisible: {
      type: Boolean,
      default: false,
    },
    isCanSave: {
      type: Boolean,
      default: false,
    },
  },
  created() {},
  mounted() {
    this.currentDataLists = JSON.parse(JSON.stringify(this.dataLists));
    this.isSelectSave = this.saveName != "" ? true : false;
    this.saveColumnName = this.saveName;
    this.selectColumnArr2 = JSON.parse(JSON.stringify(this.selectColumnArr));

  },
  watch: {
    selectColumnArr2(value) {
      this.selectColumnArr2 = value;
      console.log(value);
      this.refreshChecked();
    },
    selectColumnArr(value) {
      this.selectColumnArr2 = value;
    },
  },
  methods: {
    clearSearch() {
      // console.log("clearSearch");
      this.currentDataLists = JSON.parse(JSON.stringify(this.dataLists));
    },
    search() {
      // 搜索
      // console.log(this.searchName);
      this.currentDataLists = JSON.parse(JSON.stringify(this.dataLists));
      if (this.searchName) {
        for (let i = this.currentDataLists.length - 1; i >= 0; i--) {
          for (let j = this.currentDataLists[i].child.length - 1; j >= 0; j--) {
            for (
              let k = this.currentDataLists[i].child[j].child.length - 1;
              k >= 0;
              k--
            ) {
              if (
                this.currentDataLists[i].child[j].child[k].name.indexOf(
                  this.searchName
                ) < 0
              ) {
                this.currentDataLists[i].child[j].child.splice(k, 1);
              }
            }
            if (this.currentDataLists[i].child[j].child.length == 0) {
              this.currentDataLists[i].child.splice(j, 1);
            }
          }
          if (this.currentDataLists[i].child.length == 0) {
            this.currentDataLists.splice(i, 1);
          }
        }
      }
    },
    handleClose() {
      this.$emit("handleClose");
    },

    clickPlay(operation) {
      if (this.isSelectSave && operation != 0) {
        if (this.saveColumnName == "" || this.saveColumnName == undefined) {
          this.$message.info("常用列名称不能为空");
          return;
        }
      }
      this.$emit(
        "clickPlay",
        operation,
        this.isSelectSave,
        this.saveColumnName,
        this.selectColumnArr2
      );
    },
    checkedChange() {
      this.currentDataLists.forEach((childItem) => {
        childItem.child.forEach((item) => {
          item.child.forEach((data) => {
            let selected = false;
            for (let i = 0; i < this.selectColumnArr2.length; i++) {
              if (this.selectColumnArr2[i].id == data.id) {
                selected = true;
                if (!data.checked) {
                  this.selectColumnArr2.splice(i, 1);
                }
                break;
              }
            }
            if (!selected) {
              if (data.checked) {
                this.selectColumnArr2.push(data);
              }
            }
          });
        });
      });
    },
    // 同步左侧勾选
    refreshChecked() {
      this.currentDataLists.forEach((fitem) => {
        fitem.child.forEach((item) => {
          let count = 0;
          item.allChecked = false;
          item.child.forEach((childItem) => {
            childItem.checked = false;

            this.selectColumnArr2.forEach((selectItem) => {
              if (childItem.id == selectItem.id) {
                childItem.checked = true;
                count++;
              }
            });
          });
          if (count == item.child.length) {
            item.allChecked = true;
          }
        });
      });
      this.dataLists.forEach((fitem) => {
        fitem.child.forEach((item) => {
          let count = 0;
          item.allChecked = false;
          item.child.forEach((childItem) => {
            childItem.checked = false;

            this.selectColumnArr2.forEach((selectItem) => {
              if (childItem.id == selectItem.id) {
                childItem.checked = true;
                count++;
              }
            });
          });
          if (count == item.child.length) {
            item.allChecked = true;
          }
        });
      });
      // console.log(this.currentDataLists);
    },
    clearAll() {
      this.$emit("clearAll");
    },
    deleteColumn(item) {
      var id = item.id;
      var index = this.selectColumnArr2.findIndex((item) => {
        if (item.id == id) {
          return true;
        }
      });
      this.selectColumnArr2.splice(index, 1);
      // this.refreshChecked();
    },
  },
};
</script>
<style lang="scss" scoped>
/*被拖拽对象的样式*/
.item {
  cursor: move;
  width: 185px;
  height: 28px;
  background: #f8f8f8;
  border-radius: 4px;
  margin-top: 8px;
  margin-left: 5px;
  line-height: 28px;
  padding: 0 12px;
}
/*选中样式*/
.chosen {
  border: solid 2px #3089dc !important;
}
.abow_dialog {
  display: flex;
  justify-content: center;
  align-items: Center;
  overflow: hidden;
  .el-dialog {
    margin: 0 auto !important;
    height: 75%;
    overflow: hidden;
    .el-dialog__body {
      position: absolute;
      left: 0;
      bottom: 0;
      right: 0;
      padding: 0;
      z-index: 1;
      overflow: hidden;
      overflow-y: auto;
    }
  }
}
</style>
