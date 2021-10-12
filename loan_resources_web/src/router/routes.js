import layoutHeaderAside from "@/layout/header-aside";
import util from "@/libs/util.js";
// 由于懒加载页面太多的话会造成webpack热更新太慢，所以开发环境不使用懒加载，只有生产环境使用懒加载
const _import = require("@/libs/util.import." + process.env.NODE_ENV);
var defaultIndex = "login";
//**********************************修改**********************************
// const loginData_wharf = JSON.parse(util.cookies.get('loginData_wharf'));
var loginData_wharf = null;
try {
  loginData_wharf = JSON.parse(util.cookies.get("loginData_wharf"));
} catch (d) {}

if (loginData_wharf) {
  if (loginData_wharf.media.mediaList == 1) {
    defaultIndex = "mediaList";
  } else if (loginData_wharf.media.adPositionList == 1) {
    defaultIndex = "adsenseList";
  } else if (loginData_wharf.account.accountMeg == 1) {
    defaultIndex = "accountMeg";
  } else if (loginData_wharf.account.userMeg == 1) {
    defaultIndex = "roleMeg";
  } else if (loginData_wharf.media.trafficplatform == 1) {
    defaultIndex = "trafficplatform"
  } else if (loginData_wharf.dataEntry.dataEntryChildren == 1) {
    defaultIndex = "dataEntryChildren"
  } else if(loginData_wharf.dataForm.overallData == 1) {
    defaultIndex = "overallData"
  } else if(loginData_wharf.dataForm.entryData == 1) {
    defaultIndex = "entryData"
  }
}
//**********************************修改结束********************************

console.log("defaultIndex", defaultIndex);
/**
 * 在主框架内显示
 */
const frameIn = [
  {
    path: "/",
    redirect: { name: defaultIndex },
    component: layoutHeaderAside,
    children: [
      // 首页
      {
        path: "index",
        name: "index",
        meta: {
          auth: true,
        },
        component: _import("system/index"),
      },
      // 演示页面
      {
        path: "mediaManage/trafficplatform",
        name: "trafficplatform",
        meta: {
          title: "流量平台列表",
          auth: true,
        },
        component: _import("pages/mediaManage/trafficplatform"),
      },
      {
        path: "mediaManage/trafficplatform/editTrafficplatform",
        name: "editTrafficplatform",
        meta: {
          title: "新增流量平台",
          auth: true,
        },
        component: _import("pages/mediaManage/trafficplatform/editTrafficplatform"),
      },
      {
        path: "mediaManage/trafficplatform/editTrafficplatform",
        name: "editTrafficplatform",
        meta: {
          title: "编辑流量平台",
          auth: true,
        },
        component: _import("pages/mediaManage/trafficplatform/editTrafficplatform"),
      },
      {
        path: "mediaManage/mediaList",
        name: "mediaList",
        meta: {
          title: "媒体列表",
          auth: true,
        },
        component: _import("pages/mediaManage/mediaList"),
      },
      {
        path: "mediaManage/mediaList/editMedias",
        name: "editMedias",
        meta: {
          title: "新增媒体",
          auth: true,
        },
        component: _import("pages/mediaManage/mediaList/editMedias"),
      },
      {
        path: "mediaManage/mediaList/editMedias",
        name: "editMedias",
        meta: {
          title: "编辑媒体",
          auth: true,
        },
        component: _import("pages/mediaManage/mediaList/editMedias"),
      },
      {
        path: "mediaManage/adsenseList",
        name: "adsenseList",
        meta: {
          title: "广告位列表",
          auth: true,
        },
        component: _import("pages/mediaManage/adsenseList"),
      },
      {
        path: "mediaManage/adsenseList/editAdsenseList",
        name: "addAdsenseList",
        meta: {
          title: "新增广告位",
          auth: true,
        },
        component: _import("pages/mediaManage/adsenseList/editAdsenseList"),
      },
      {
        path: "mediaManage/adsenseList/editAdsenseList",
        name: "editAdsenseList",
        meta: {
          title: "编辑广告位",
          auth: true,
        },
        component: _import("pages/mediaManage/adsenseList/editAdsenseList"),
      },
      {
        path: "mediaManage/adsenseList/shareAdsense",
        name: "shareAdsense",
        meta: {
          title: "广告位结算",
          auth: true,
        },
        component: _import("pages/mediaManage/adsenseList/shareAdsense")
      },
      {
        path:"dataSearch/dataEntryChildren",
        name:"dataEntryChildren",
        meta: {
          title: "数据录入",
          auth: true,
        },
        component: _import("pages/dataSearch/dataEntryChildren"),
      },
      {
        path:"dataSearch/dataEntryChildren/editdataEntryChildren",
        name:"editdataEntryChildren",
        meta: {
          title: "编辑数据录入",
          auth: true,
        },
        component: _import("pages/dataSearch/dataEntryChildren/editdataEntryChildren")
      },
      {
        path:"dataFormReport/overallData",
        name:"overallData",
        meta:{
          title:"整体数据",
          auth: true
        },
        component:_import("pages/dataFormReport/overallData"),
      },
      {
        path:"dataFormReport/overallData/releaseData",
        name:"releaseData",
        meta:{
          title:"整体数据发布子页面",
          auth: true
        },
        component:_import("pages/dataFormReport/overallData/releaseData"),
      },
      {
        path:"dataFormReport/entryData",
        name:"entryData",
        meta:{
          title:"发布数据",
          auth: true
        },
        component:_import("pages/dataFormReport/entryData"),
      },
      {
        path: "accountManage/accountMeg",
        name: "accountMeg",
        meta: {
          title: "账户管理",
          auth: true,
        },
        component: _import("pages/accountManage/accountMeg"),
      },
      {
        path: "accountManage/accountMeg/editAccounts",
        name: "addAccounts",
        meta: {
          title: "新增账户",
          auth: true,
        },
        component: _import("pages/accountManage/accountMeg/editAccounts"),
      },
      {
        path: "accountManage/accountMeg/editAccounts",
        name: "editAccounts",
        meta: {
          title: "编辑账户",
          auth: true,
        },
        component: _import("pages/accountManage/accountMeg/editAccounts"),
      },

      {
        path: "accountManage/roleMeg",
        name: "roleMeg",
        meta: {
          title: "角色管理",
          auth: true,
        },
        component: _import("pages/accountManage/roleMeg"),
      },
      {
        path: "accountManage/roleMeg/editRoles",
        name: "addRoles",
        meta: {
          title: "新增角色",
          auth: true,
        },
        component: _import("pages/accountManage/roleMeg/editRoles"),
      },
      {
        path: "accountManage/roleMeg/editRoles",
        name: "editRoles",
        meta: {
          title: "编辑角色",
          auth: true,
        },
        component: _import("pages/accountManage/roleMeg/editRoles"),
      },

      // 系统 前端日志
      {
        path: "log",
        name: "log",
        meta: {
          title: "前端日志",
          auth: true,
        },
        component: _import("system/log"),
      },
      // 刷新页面 必须保留
      {
        path: "refresh",
        name: "refresh",
        hidden: true,
        component: _import("system/function/refresh"),
      },
      // 页面重定向 必须保留
      {
        path: "redirect/:route*",
        name: "redirect",
        hidden: true,
        component: _import("system/function/redirect"),
      },
    ],
  },
];

/**
 * 在主框架之外显示
 */
const frameOut = [
  // 登录
  {
    path: "/login",
    name: "login",
    component: _import("system/login"),
  },
];

/**
 * 错误页面
 */
const errorPage = [
  {
    path: "*",
    name: "404",
    component: _import("system/error/404"),
  },
];

// 导出需要显示菜单的
export const frameInRoutes = frameIn;

// 重新组织后导出
export default [...frameIn, ...frameOut, ...errorPage];
