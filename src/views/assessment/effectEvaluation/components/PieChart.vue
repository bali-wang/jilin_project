<template>
  <div>
    <div class="pie_chart" :id="id"></div>
    <div class="pie_desc">
      <span class="evaluation_days">评估天数{{ pieData.totalDay }}</span
      ><span class="valid_days">有效天数{{ pieData.effectDay }}</span>
    </div>
  </div>
</template>
<script>
export default {
  props: {
    pieData: {
      type: Object
    },
    id: {
      type: String,
      required: true,
      default: "chart"
    }
  },
  watch: {
    pieData(value) {
      if (value) {
        this.initChart();
      }
    }
  },
  methods: {
    initChart() {
      const options = {
        color: this.pieData.color,
        tooltip: {
          trigger: "item",
          textStyle: {
            fontSize: 10
          },
          formatter: "{a} <br/>{b} : {c} ({d}%)"
        },
        legend: {
          orient: "horizontal",
          left: "left",
          itemWidth: 18,
          itemHeight: 10,
          textStyle: {
            fontSize: 10,
            fontWeight: 400
          },
          data: this.pieData.legendData
        },
        series: [
          {
            name: "准确率",
            type: "pie",
            radius: "50%",
            label: {
              normal: {
                show: true,
                textStyle: {
                  fontWeight: 300,
                  fontSize: 10
                },
                formatter: "{d}%"
              }
            },
            center: ["45%", "60%"],
            data: this.pieData.aqiRate,
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
  color: #666;
  .evaluation_days {
    margin-right: 75px;
  }
}
</style>
