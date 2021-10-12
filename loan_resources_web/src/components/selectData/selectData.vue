<template>
  <div style="width: 100%;height: 409px;border: 1px solid #e4e9ed;">
    <div
      style="background-color: #F9FAFD;border-bottom:1px solid #E4E9ED;box-sizing: border-box;line-height: 22px;padding: 8px 12px;"
    >
      可添加的列
    </div>
    <div class="cascad-dataList" ref="cascadMenu">
      <scroll class="left-dataList" :data="dataList" ref="leftMenu">
        <div class="left-dataList-container" style="width:180px;">
          <div ref="leftItem" v-for="(item, index) in dataList" :key="index">
            <div style="color: #333;margin-left: 12px;height: 25px;">
              {{ item.name }}
            </div>
            <div
              class="left-item"
              v-for="(childItem, childIndex) in item.child"
              :class="
                currentIndex ===
                (index >= 1
                  ? index * dataList[index - 1].child.length + childIndex
                  : childIndex)
                  ? 'active'
                  : ''
              "
              @click="
                selectLeft(
                  index >= 1
                    ? index * dataList[index - 1].child.length + childIndex
                    : childIndex,
                  $event
                )
              "
              onmousemove="style.color='#2f88ff'"
              onmouseout="style.color = ''"
              :key="childIndex"
            >
              {{ childItem.name }}
            </div>
          </div>
        </div>
      </scroll>
      <scroll
        class="right-dataList"
        :data="dataList"
        ref="rightMenu"
        @scroll="scrollHeight"
        :listenScroll="true"
        :probeType="3"
      >
        <div class="right-dataList-container">
          <div
            class="right-item"
            ref="rightItem"
            v-for="(fitem, o) in dataList"
            :key="o"
          >
            <div v-for="(item, i) in fitem.child" :key="i">
              <div class="title">{{ item.name }}</div>

              <el-checkbox
                v-model="item.allChecked"
                style="margin-right: 5px;"
                class="data-wrapper"
                @change="handleCheckAllChange(o, i)"
                >全选</el-checkbox
              >
              <!-- <el-checkbox-group
              v-model="checkedCities"
              style="display: inline-block;vertical-align: top;"
              @change="handleCheckedCitiesChange(i)"> -->
              <el-checkbox
                @change="handleCheckedCitiesChange(o, i)"
                style="margin-right: 5px;"
                class="data-wrapper"
                v-for="(childItem, j) in item.child"
                :key="j"
                :label="childItem.name"
                v-model="childItem.checked"
                >{{ childItem.name }}</el-checkbox
              >
              <!-- </el-checkbox-group> -->
              <div class="right-item-fg"></div>
            </div>
          </div>
        </div>
      </scroll>
    </div>
  </div>
</template>

<script>
import BScroll from "better-scroll";
import Scroll from "./scroll";
export default {
  data() {
    return {
      rightTops: [],
      scrollY: 0,
      leftScrollY: 0,
      checkedCities: [],
      checkAll: false,
    };
  },
  props: {
    dataList: {
      required: true,
      type: Array,
      default() {
        return [];
      },
    },
  },
  computed: {
    currentIndex() {
      const { scrollY, rightTops } = this;
      let index = rightTops.findIndex((height, index) => {
        return scrollY >= rightTops[index] && scrollY < rightTops[index + 1];
      });
      if (scrollY > rightTops[index] + 50) {
        index++;
      }
      return index;
    },
  },
  created() {
    this.$nextTick(() => {
      this._calculateHeight();
    });
  },
  methods: {
    selectLeft(index, event) {
      //   console.log(index);
      if (!event._constructed) {
        return;
      }
      let rightItem = this.$refs.rightItem;
      let rightItemChildren = [];
      rightItem.forEach((li) => {
        li.childNodes.forEach((l) => {
          rightItemChildren.push(l);
        });
      });
      let el = rightItemChildren[index];
      this.$refs.rightMenu.scrollToElement(el, 300);
    },
    scrollHeight(pos) {
      //   console.log(pos);
      this.scrollY = Math.abs(Math.round(pos.y));
    },
    _calculateHeight() {
      let lis = this.$refs.rightItem;
      console.log(lis);
      let lisChildren = [];
      lis.forEach((li) => {
        li.childNodes.forEach((l) => {
          lisChildren.push(l);
        });
      });
      // console.log(lis);
      // console.log(lisChildren)
      let height = 0;
      this.rightTops.push(height);
      Array.prototype.slice.call(lisChildren).forEach((li) => {
        height += li.clientHeight;
        this.rightTops.push(height);
      });
      // console.log(this.rightTops);
    },
    handleCheckedCitiesChange(o, i) {
      let count = 0;
      this.dataList[o].child[i].child.forEach((item) => {
        if (item.checked) {
          count++;
        }
      });
      if (count == this.dataList[o].child[i].child.length) {
        this.dataList[o].child[i].allChecked = true;
      } else {
        this.dataList[o].child[i].allChecked = false;
      }
      this.$forceUpdate();
      this.$emit("checkedChange");
    },
    handleCheckAllChange(o, i) {
      this.dataList[o].child[i].child.forEach((item) => {
        item.checked = this.dataList[o].child[i].allChecked;
      });
      this.$forceUpdate();
      this.$emit("checkedChange");
    },
  },
  components: {
    Scroll,
  },
};
</script>

<style lang="scss" scoped>
.cascad-dataList {
  display: flex;
  width: 100%;
  height: 370px;
  overflow: hidden;
  .left-dataList {
    padding-top: 10px;
    width: 180px;
    border-right: 1px solid #e4e9ed;
    .left-item {
      margin-left: 20px;
      width: auto;
      height: 22px;
      cursor: pointer;
      width: 100%;
      color: #999;
      padding-bottom: 10px;
    }
    .left-item.active {
      color: #2f88ff;
    }
  }
  .right-dataList {
    width: 100%;
    .right-item {
      height: 100%;
      .title {
        color: #333333;
        margin-left: 10px;
        height: 46px;
        line-height: 46px;
        font-size: 16px;
      }
      .data-wrapper {
        margin-left: 10px;
        width: 180px;
        padding-bottom: 12px;
        line-height: 22px;
        font-size: 14px;
        font-weight: 400;
        color: #333;
      }
      .right-item-fg {
        height: 1px;
        width: 100%;
        border-bottom: 1px solid #e4e9ed;
      }
    }
  }
}
</style>
