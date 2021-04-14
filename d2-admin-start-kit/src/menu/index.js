import { uniqueId } from 'lodash'

/**
 * @description 给菜单数据补充上 path 字段
 * @description https://github.com/d2-projects/d2-admin/issues/209
 * @param {Array} menu 原始的菜单数据
 */
function supplementPath (menu) {
  return menu.map(e => ({
    ...e,
    path: e.path || uniqueId('d2-menu-empty-'),
    ...e.children ? {
      children: supplementPath(e.children)
    } : {}
  }))
}

export const menuHeader = supplementPath([
  { path: '/index', title: '首页', icon: 'home' },
  {
    title: '页面',
    icon: 'folder-o',
    children: [
      { path: '/page1', title: '页面 1' },
      { path: '/page2', title: '页面 2' },
      { path: '/page3', title: '用户查询' },
      { path: '/page4', title: '录入系统' },
      { path: '/page5', title: '页面5' },
      { path: '/page6', title: '泛舟4.0结算配置'},
      { path: '/page7', title:'泛舟4.0新增广告位（直投）' },
      { path: '/page8', title:'泛舟4.0新建平台' },
      { path: '/page9', title:'泛舟4.0高级筛选'}
    ]
  }
])

export const menuAside = supplementPath([
  { path: '/index', title: '首页', icon: 'home' },
  {
    title: '页面',
    icon: 'folder-o',
    children: [
      { path: '/page1', title: '页面 1' },
      { path: '/page2', title: '页面 2' },
      { path: '/page3', title: '用户查询' },
      { path: '/page4', title: '录入系统' },
      { path: '/page5', title: '页面5' },
      { path: '/page6', title: '泛舟4.0结算配置'},
      { path: '/page7', title:'泛舟4.0新增广告位（直投）' },
      { path: '/page8', title:'泛舟4.0新建平台' },
      { path: '/page9', title:'泛舟4.0高级筛选' },
      
    ]
  }
])
