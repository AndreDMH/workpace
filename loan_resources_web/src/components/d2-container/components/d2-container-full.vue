<template>
  <div class="d2-container-full" v-loading="pictLoading" element-loading-background="rgba(229,237,242,0.5)"
         element-loading-text="内容正在加载中">
    <div v-if="$slots.header" class="d2-container-full__header" ref="header" v-show="isNone">
      <slot name="header"/>
    </div>
    <div class="d2-container-full__body"  ref="body" v-show="isNone">
          <slot/>
    </div>
    <div v-if="$slots.footer"  class="d2-container-full__footer" ref="footer" v-show="isNone">
      <slot name="footer"/>
    </div>
  </div>
</template>

<script>
import scroll from './mixins/normal'
export default {
  name: 'd2-container-full',
  mixins: [
    scroll
  ],
  data() {
    return {
       pictLoading:true,
       isNone:false,
    }
  },
  mounted () {
     this.$nextTick(() => {
       setTimeout(function (){
         this.pictLoading=false;
         this.isNone=true;
       }.bind(this),1000)
      })
    // 增加滚动事件监听
    this.addScrollListener()
  },
  beforeDestroy () {
    // 移除滚动事件监听
    this.removeScrollListener()
  }
}
</script>
