<template>
  <d2-container>
    <template slot="header">网站的头部</template>
    <div id="main" style="height: 500px"></div>
    <template slot="footer">网站的尾部</template>
  </d2-container>
</template>

<script>
export default {
  name: "page5",
  data() {
    return {
      msg: "eCharts",
    };
  },
  mounted() {
    this.drawline();
  },
  methods: {
    drawline() {
      var echarts = require("echarts");
      // 基于准备好的dom，初始化echarts实例
      var myChart = echarts.init(document.getElementById("main"));
      // 绘制图表 折线图
      myChart.setOption({
        title: {
          text: "ECharts",
        },
        tooltip: {},
        xAxis: {
          data: ["衬衫", "羊毛衫", "雪纺衫", "裤子", "高跟鞋", "袜子"],
        },
        yAxis: {},
        series: [
          {
            name: "销量",
            type: "bar",
            data: [5, 20, 36, 10, 10, 20],
          },
          {
            name: "销量",
            type: "line",
            data: [5, 20, 36, 10, 10, 20],
          },
          {
            name: "销量",
            type: "pie",
            center: ["65%", 100],
            radius: 65,
            data: [
              { name: "衬衫", value: 5 },
              { name: "羊毛衫", value: 20 },
              { name: "雪纺衫", value: 36 },
              { name: "裤子", value: 10 },
              { name: "高跟鞋", value: 10 },
              { name: "袜子", value: 20 }, 
            ],
          },
        ],
      });
    },
  },
};
</script>
<style scoped>
#header {
  width: 100%;
  height: 40px;
  background-color: rgb(170, 225, 247);
  text-align: center;
  font-size: 30px;
}
a {
  margin: 20px;
}
#sec {
  width: 100%;
  height: 480px;
  border: ridge 1px palevioletred;
}
#footer {
  width: 100%;
  height: 40px;
  background-color: rgb(170, 225, 247);
}
td {
  height: 160px;
  width: 200px;
  border: ridge paleturquoise 1px;
}
</style>>