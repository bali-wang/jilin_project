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
          trigger: "none",
          axisPointer: {
            type: "cross"
          }
        },
        grid: [
          {
            left: 40,
            right: 34,
            top: 40,
            height: "22%"
          },
          {
            left: 40,
            right: 34,
            top: "44%",
            height: "42%"
          }
        ],
        xAxis: [
          {
            type: "category",
            axisLine: { onZero: true }
          },
          {
            gridIndex: 1,
            type: "category",
            axisLine: { onZero: true },
            position: "top"
          },
          {
            type: "category",
            gridIndex: 1,
            axisLine: { onZero: true },
            data: []
          },
          {
            type: "category"
          }
        ],
        yAxis: [
          {
            type: "value"
          },
          {
            type: "value",
            inverse: true
          },
          {
            gridIndex: 1,
            type: "value"
          },
          {
            gridIndex: 1,
            type: "value"
          }
        ],
        series: [
          {
            type: "pictorialBar",
            yAxisIndex: 0,
            symbolRepeat: true,
            data: []
          },
          {
            type: "pictorialBar",
            xAxisIndex: 1,
            symbolRepeat: true,
            data: []
          },
          {
            xAxisIndex: 2,
            type: "pictorialBar",
            symbolRepeat: true,
            data: []
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
