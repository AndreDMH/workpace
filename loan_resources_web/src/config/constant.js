// 域名数组
const domainArr = [
  {
    value: 1,
    label: "http://tgh5.rytad.com",
  },
  {
    value: 2,
    label: "http://tgh5.xiaozhuzhuan.com",
  },
  {
    value: 3,
    label: "http://yrbb.qhbstz.org.cn",
  },
  {
    value: 4,
    label: "http://yrbb.xindexiaodai.com",
  },
  {
    value: 5,
    label: "http://rybb.jiedianqian.com",
  },
  {
    value: 6,
    label: "https://rybb2.jiedianqian.com",
  },
  {
    value: 7,
    label: "https://fullh5.rytad.com",
  },
  {
    value: 8,
    label: "https://ad.ulinkcredit.com",
  },
  {
    value: 9,
    label: "http://panh5.rytad.com",
  },
];
// 策略数组
const strategy_type = [
  {
    value: 1,
    label: "自定义策略1",
  },
  {
    value: 2,
    label: "自定义策略2",
  },
  {
    value: 3,
    label: "自定义策略3",
  },
  {
    value: 4,
    label: "自定义策略4",
  },
];
// 模版编号数组
const template_number = [
  {
    value: 1,
    label: "module/fanZhou.html",
  },
  {
    value: 2,
    label: "home",
  },
];
// 场景
const scenes_value = [
  {
    value: "1",
    label: "开屏",
  },
  {
    value: "2",
    label: "插屏",
  },
  {
    value: "3",
    label: "banner",
  },
  {
    value: "4",
    label: "信息流",
  },
  {
    value: "5",
    label: "视频",
  },
  {
    value: "6",
    label: "固定版块",
  },
];
// 素材类型
const material_type = [
  {
    value: "1",
    label: "文字",
  },
  {
    value: "2",
    label: "图片",
  },
  {
    value: "3",
    label: "视频"
  }
];
// 文字素材名称
const text_uses = [
  {
    value: 1,
    label: "标题",
  },
  {
    value: 2,
    label: "描述",
  },
];
// 图片素材名称
const images_use = [
  {
    value: 3,
    label: "图片1",
  },
  {
    value :4,
    label :"图片2",
  },
  {
    value :5,
    label :"图片3",
  }
];
// 图片格式
const image_type = [
  {
    value: "1",
    label: "JPG"
  },
  {
    value: "2",
    label: "PNG"
  },
  {
    value: "3",
    label: "GIF"
  }
];
// 视频格式
const video_type = [
  {
    value: "1",
    label: "MP4"
  },
  {
    value: "2",
    label: "3GP"
  },
  {
    value: "3",
    label: "AVI"
  },
  {
    value: "4",
    label: "FLV"
  }
];
//对接方式
const docking_type = [
  {
    value: "1",
    label: "直投",
  },
  {
    value: "2",
    label: "定制化api",
  },
  {
    value: "3",
    label: "程序化",
  }
];
//投放方式
const operate_type= [
  {
    value:"",
    label:"全部"
  },
  {
    value: "1",
    label: "平台投放",
  },
  // {
  //   value: "2",
  //   label: "媒体投放",
  // },
];
//投放类型
const launch_type =[
  {
    value: "1",
    label: "直媒",
  },
  // {
  //   value: "2",
  //   label: "模板投放",
  // },
  {
    value: "2",
    label: "流量平台"
  }
];
const priority = [
  {
    value: "1",
    label: "1",
  },
  {
    value: "2",
    label: "2",
  },
  {
    value: "3",
    label: "3",
  },
  {
    value: "4",
    label: "4",
  },
  {
    value: "5",
    label: "5",
  },
  {
    value: "6",
    label: "6",
  },
  {
    value: "7",
    label: "7",
  },
  {
    value: "8",
    label: "8",
  },
  {
    value: "9",
    label: "9",
  },
  {
    value: "10",
    label: "10",
  },{
    value: "11",
    label: "11",
  },
  {
    value: "12",
    label: "12",
  },
  {
    value: "13",
    label: "13",
  },
  {
    value: "14",
    label: "14",
  },
  {
    value: "15",
    label: "15",
  },{
    value: "16",
    label: "16",
  },{
    value: "17",
    label: "17",
  },
  {
    value: "18",
    label: "18",
  },
  {
    value: "19",
    label: "19",
  },{
    value: "20",
    label: "20",
  },
  {
    value: "21",
    label: "21",
  },
  {
    value: "22",
    label: "22",
  },
  {
    value: "23",
    label: "23",
  },
  {
    value: "24",
    label: "24",
  },
  {
    value: "25",
    label: "25",
  },
  {
    value: "26",
    label: "26",
  },
  {
    value: "27",
    label: "27",
  },
  {
    value: "28",
    label: "28",
  },
  {
    value: "29",
    label: "29",
  },
  {
    value: "30",
    label: "30",
  },
]
//平台类别
const platformType=[
  {
    label:'DSP',
    value:1 
  },
  {
    label:'SSP',
    value:2 
  },
  {
    label:'ADX',
    value:3 
  }
];
//媒体结算分成方式
const divide_options= [
  {
    value:"1",
    label:"CPM结算"
  },
  {
    value:"2",
    label:"总体收益分成结算"
  },
  // 暂时停用
  // {
  //   value:"3",
  //   label:"广告主节点结算"
  // }
  {
    value:"4",
    label:"CPC结算"
  },
];
//媒体结算数据同步方式
const sync_options=[
  {
    value:"1",
    label:"手动录入"
  },
  {
    value:"2",
    label:"自动录入"
  }
];
//媒体结算 结算方式下拉列表
const settle_options=[
  {
    value:"2",
    label:"CPA"
  },
  {
    value:"3",
    label:"CPS"
  },
  /*
    暂时禁用 
  {
    value:"1",
    label:"CPC"
  } */
];
//媒体结算 结算节点下拉列表
const node_options=[
  {
    value:"1",
    label:"注册"
  },
  {
    value:"2",
    label:"进件"
  },
  {
    value:"3",
    label:"授信"
  },
  {
    value:"4",
    label:"下款"
  }
];
const mediaTypeArr = [
  {
    label:'娱乐',
    value:1
  },
  {
    label:'社交',
    value:2
  },
  {
    label:'视频',
    value:3
  },
  {
    label:'新闻',
    value:4
  },
  {
    label:'购物',
    value:5
  },
  {
    label:'出行',
    value:6
  },
  {
    label:'阅读',
    value:7
  },
  {
    label:'生活',
    value:8
  },
  {
    label:'教育',
    value:9
  },
  {
    label:'健康',
    value:10
  },
  {
    label:'工具',
    value:11
  },
  {
    label:'办公',
    value:12
  },
  {
    label:'旅游',
    value:13
  },
  {
    label:'音乐',
    value:14
  },
  {
    label:'美化',
    value:15
  },
  {
    label:'摄影',
    value:16
  },
  {
    label:'通讯',
    value:17
  },
  {
    label:'儿童',
    value:18
  },
  {
    label:'系统',
    value:19
  },
  {
    label:'安全',
    value:20
  },
  {
    label:'金融',
    value:21
  }
];//媒体应用类型

export const _constant = {
  domainArr,
  strategy_type,
  template_number,
  scenes_value,
  material_type,
  text_uses,
  images_use,
  image_type,
  video_type,
  docking_type,
  operate_type,
  launch_type,
  priority,
  platformType,
  divide_options,
  sync_options,
  settle_options,
  node_options,
  mediaTypeArr,//媒体应用类型
};
