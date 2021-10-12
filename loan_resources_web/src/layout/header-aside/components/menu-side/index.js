

import { mapState } from 'vuex'
import menuMixin from '../mixin/menu'
import { elMenuItem, elSubmenu } from '../libs/util.menu'
import BScroll from 'better-scroll'

export default {
  name: 'd2-layout-header-aside-menu-side',
  mixins: [
    menuMixin
  ],
  render (createElement) {
    var c = this.aside.filter(menu => {
      if (menu.children === undefined) {
        return menu.path === this.active
      } else {
        return menu.children.filter(subMenu => subMenu.path === this.active).length === 1
      }
    })
    this.active = this.active.split('?')[0];
    // console.log('侧边栏整理:', c)
    // console.log('侧边栏整理:', this.asideCollapse,)
    // console.log('侧边栏整理:', this.active,)
    // console.log('侧边栏整理:',this.aside)
    // console.log('ce边栏整理：',createElement)


    return createElement('div', { attrs: { class: 'd2-layout-header-aside-menu-side' } }, [
      createElement('el-menu', {
        props: { collapse: this.asideCollapse, uniqueOpened: true, defaultActive: this.active },
        ref: 'menu',
        on: { select: this.handleMenuSelect }
      }, this.aside.map(menu => {
        // if (menu.children === undefined) {
        //   menu.hide = menu.path !== this.active
        // } else {
        //   menu.hide = menu.children.filter(subMenu => subMenu.path === this.active).length === 0
        // }
        return (menu.children === undefined ? elMenuItem : elSubmenu).call(this, createElement, menu)
      })),
      ...this.aside.length === 0 && !this.asideCollapse ? [
        createElement('div', { attrs: { class: 'd2-layout-header-aside-menu-empty', flex: 'dir:top main:center cross:center' } }, [
          createElement('d2-icon', { props: { name: 'inbox' } }),
          createElement('span', {}, '没有侧栏菜单')
        ])
      ] : []
    ])
  },
  data () {
    return {
      active: '',
      asideHeight: 300,
      BS: null
    }
  },
  computed: {
    ...mapState('d2admin/menu', [
      'aside',
      'asideCollapse'
    ])
  },
  watch: {
    // 折叠和展开菜单的时候销毁 better scroll
    asideCollapse (val) {
      console.log(51, val)
      this.scrollDestroy()
      setTimeout(() => {
        this.scrollInit()
      }, 500)
    },
    // 监听路由 控制侧边栏激活状态
    '$route.fullPath': {
      handler (value) {
        if(value.split('/').length>3){
          this.active = '/'+value.split('/')[1]+'/'+value.split('/')[2]
        }else{
          this.active = value
        }
      },
      immediate: true
    }
  },
  mounted () {
    this.scrollInit()
  },
  beforeDestroy () {
    this.scrollDestroy()
  },
  methods: {
    scrollInit () {
      this.BS = new BScroll(this.$el, {
        mouseWheel: true,
        click: true
        // 如果你愿意可以打开显示滚动条
        // scrollbar: {
        //   fade: true,
        //   interactive: false
        // }
      })
    },
    scrollDestroy () {
      // https://github.com/d2-projects/d2-admin/issues/75
      try {
        this.BS.destroy()
      } catch (e) {
        delete this.BS
        this.BS = null
      }
    }
  }
}
