<template>
  <div id="effect_chart"></div>
</template>
<script>
export default {
  props: {
    chartData: {
      type: Array,
      required: true
    }
  },
  methods: {
    initChart() {
      const option = {
        color: [
          "#6CE737",
          "#FFF852",
          "#E9803C",
          "#E6382F",
          "#961E44",
          "#831A1F"
        ],
        title: {
          show: true,
          text: "污染物等级",
          textStyle: {
            fontSize: 10
          }
        },
        tooltip: {
          axisPointer: {
            type: "cross"
          }
        },
        grid: [
          {
            left: "10%",
            right: "8%",
            height: "6%"
          },
          {
            left: "10%",
            right: "8%",
            bottom: "20%",
            height: "60%"
          }
        ],
        xAxis: [
          {
            type: "category",
            data: [],
            scale: true,
            axisLine: { onZero: false },
            splitLine: { show: false }
          },
          { gridIndex: 1 },
          {
            type: "category",
            gridIndex: 1,
            data: [],
            scale: true,
            axisLine: { onZero: false },
            splitLine: { show: true }
          }
        ],
        yAxis: [
          {
            splitArea: {
              show: true
            }
          },
          {},
          {
            gridIndex: 1
          },
          { gridIndex: 1 }
        ],
        series: [
          {
            type: "pictorialBar",
            itemStyle: {},
            symbol: "rect"
          }
        ]
      };
      const myChart = this.$echarts.init(
        document.getElementById("effect_chart")
      );
      myChart.setOption({ ...option });
    }
  },
  mounted() {
    this.initChart();
  }
};
</script>
<style lang="scss">
#effect_chart {
  width: 100%;
  height: 180px;
}
</style>
