<template>
  <div>
    <div class="pie_chart" :id="id"></div>
    <div class="pie_desc">
      <span class="evaluation_days">评估天数</span
      ><span class="valid_days">有效天数</span>
    </div>
  </div>
</template>
<script>
export default {
  props: {
    pieData: {
      type: Array
    },
    id: {
      type: String,
      required: true,
      default: "chart"
    }
  },
  methods: {
    initChart() {
      const options = {
        color: ["#3CA0DB", "#6CE44F", "#FCDA5C"],
        tooltip: {
          trigger: "item",
          formatter: "{a} <br/>{b} : {c} ({d}%)"
        },
        legend: {
          orient: "horizontal",
          left: "left",
          textStyle: {
            fontSize: 10
          },
          data: ["偏低", "准确", "偏高"]
        },
        series: [
          {
            name: "准确率",
            type: "pie",
            radius: "55%",
            center: ["50%", "50%"],
            data: [
              { value: 335, name: "偏低" },
              { value: 310, name: "准确" },
              { value: 234, name: "偏高" }
            ],
            emphasis: {
              itemStyle: {
                shadowBlur: 10,
                shadowOffsetX: 0,
                shadowColor: "rgba(0, 0, 0, 0.5)"
              }
            }
          }
        ]
      };
      const pieChart = this.$echarts.init(document.getElementById(this.id));
      pieChart.setOption({ ...options });
    }
  },
  mounted() {
    this.initChart();
  }
};
</script>
<style lang="scss">
.pie_chart {
  width: 100%;
  height: 162px;
}
.pie_desc {
  margin: 0 12px;
  .evaluation_days {
    margin-right: 75px;
  }
}
</style>
