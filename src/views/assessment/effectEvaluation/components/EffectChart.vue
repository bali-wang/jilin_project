<template>
  <div class="effect_chart" :id="id"></div>
</template>
<script>
export default {
  props: {
    chartData: {
      type: Object,
      required: true
    },
    id: {
      type: String,
      required: true,
      default: "chart"
    }
  },
  watch: {
    chartData(value) {
      if (value) {
        this.initChart();
      }
    }
  },
  methods: {
    initChart() {
      const option = {
        color: [
          "#00E300",
          "#FFFF00",
          "#FF7E00",
          "#FF0000",
          "#99004C",
          "#7E0023"
        ],
        title: [
          {
            text: "污染物等级",
            top: "1%",
            left: "0%",
            textStyle: {
              fontSize: 10
            }
          },
          {
            text: "实时监测",
            left: "2%",
            top: "37%",
            textStyle: {
              fontSize: 9
            }
          },
          {
            text: "人工预报",
            left: "2%",
            bottom: "27%",
            textStyle: {
              fontSize: 9
            }
          }
        ],
        legend: {
          data: ["优", "良", "轻度污染", "中度污染", "重度污染", "严重度污染"],
          itemWidth: 18,
          itemHeight: 10,
          textStyle: {
            fontSize: 10,
            fontWeight: 400
          }
        },
        tooltip: {
          trigger: "axis",
          axisPointer: {
            type: "shadow"
          }
        },
        grid: [
          {
            left: "8%",
            right: 20,
            bottom: "15%",
            height: "35%",
            containLabel: true
          },
          {
            left: "8%",
            top: "12%",
            right: 20,
            height: "20%",
            containLabel: true
          },
          {
            left: "8%",
            right: 20,
            top: "32%",
            height: "23%",
            containLabel: true
          }
        ],
        xAxis: [
          {
            type: "category",
            gridIndex: 0,
            max: 35,
            axisTick: {
              show: true
            },
            data: this.chartData.xAxisData
          },
          {
            type: "category",
            position: "top",
            gridIndex: 1,
            data: this.chartData.xAxisData,
            max: 35,
            axisLabel: {
              formatter: function() {
                return "";
              }
            },
            axisTick: {
              show: false
            }
          },
          {
            type: "category",
            gridIndex: 2,
            data: this.chartData.xAxisData,
            max: 35,
            axisLabel: {
              formatter: function() {
                return "";
              }
            },
            axisTick: {
              show: false
            }
          },
          {
            type: "category",
            gridIndex: 1
          }
        ],
        yAxis: [
          {
            type: "value",
            gridIndex: 0,
            minInterval: 1,
            boundaryGap: [0, 0.1],
            axisLabel: {
              formatter: function() {
                return "";
              }
            },
            axisTick: {
              show: false
            },
            splitLine: {
              show: false
            }
          },
          {
            type: "value",
            gridIndex: 1,
            minInterval: 1,
            boundaryGap: [0, 0.1],
            axisLabel: {
              formatter: function() {
                return "";
              }
            },
            axisTick: {
              show: false
            },
            splitLine: {
              show: false
            }
          },
          {
            type: "value",
            inverse: true,
            minInterval: 1,
            boundaryGap: [0, 0.1],
            gridIndex: 2,
            axisLabel: {
              formatter: function() {
                return "";
              }
            },
            axisTick: {
              show: false
            },
            splitLine: {
              show: false
            }
          },
          {
            type: "value"
          },
          {
            type: "value",
            gridIndex: 1
          },
          {
            type: "value",
            gridIndex: 2
          }
        ],
        series: [
          {
            name: "优",
            type: "bar",
            stack: "one"
          },
          {
            name: "良",
            type: "bar",
            stack: "one"
          },
          {
            name: "轻度污染",
            type: "bar",
            stack: "one"
          },
          {
            name: "中度污染",
            type: "bar",
            stack: "one"
          },
          {
            name: "重度污染",
            type: "bar",
            stack: "one"
          },
          {
            name: "严重污染",
            type: "bar",
            stack: "one"
          },
          {
            data: this.chartData.aqiLevel1,
            name: "人工预报",
            xAxisIndex: 0,
            yAxisIndex: 0,
            type: "bar",
            stack: "one",
            barCateGoryGap: 35,
            barWidth: 12
          },
          {
            data: this.chartData.aqiLevel2,
            xAxisIndex: 0,
            yAxisIndex: 0,
            type: "bar",
            barCateGoryGap: 35,
            stack: "one",
            barWidth: 12
          },
          {
            data: this.chartData.accuracyArr,
            xAxisIndex: 1,
            yAxisIndex: 1,
            type: "pictorialBar",
            symbolSize: [14, 14],
            symbolOffset: [0, -6]
          },
          {
            data: this.chartData.actualData,
            name: "实时监测",
            xAxisIndex: 2,
            yAxisIndex: 2,
            barCateGoryGap: 35,
            type: "bar",
            barWidth: 12
          }
        ]
      };
      const myChart = this.$echarts.init(document.getElementById(this.id));
      myChart.setOption({ ...option });
    }
  },
  mounted() {
    this.initChart();
  }
};
</script>
<style lang="scss">
.effect_chart {
  width: 100%;
  height: 180px;
}
</style>
