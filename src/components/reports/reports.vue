<template>
    <el-card>
        <my-bread level1='数据统计' level2='数据报表'></my-bread>
        <div id='main' style='width:600px;height:400px'></div>
    </el-card>
</template>

<script>
// 第一步：安装
// npm i echarts
// 第二步：引入
// var echarts = require("echarts");
// 第三步：创建容器，必须设置宽高
// div.main
// 第四步：初始化
// myechart.init('容器')
// 第五步：配置选项（配置数据）option
// 第六步：mychart.setOption(option)
// mounted(){this.useEcharts()}
var echarts = require("echarts");

export default {
     data() {
    return {};
  },

  mounted() {
    this.useEchart();
  },
  methods: {
    async useEchart() {
      // init
      var myChart = echarts.init(document.getElementById("main"));

      // 获取数据
      // `reports/type/1`
      // `reports?type=1`

      const res = await this.$http.get(`reports/type/1`);
      // console.log(res);
      let option2 = res.data.data;

      // option

      let option1 = {
        title: {
          text: "堆叠区域图"
        },
        tooltip: {
          trigger: "axis",
          axisPointer: {
            type: "cross",
            label: {
              backgroundColor: "#6a7985"
            }
          }
        },

        toolbox: {
          feature: {
            saveAsImage: {}
          }
        },
        grid: {
          left: "3%",
          right: "4%",
          bottom: "3%",
          containLabel: true
        }
      };

      //
      let option = { ...option1, ...option2 };

      // setOption
      myChart.setOption(option);
    }
  }
}
</script>

<style>

</style>
