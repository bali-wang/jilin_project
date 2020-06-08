<template>
  <div id="aqi_chart"></div>
</template>
<script>
function renderItem(params, api) {
  var xValue = api.value(0);
  var highPoint = api.coord([xValue, api.value(1)]);
  var lowPoint = api.coord([xValue, api.value(2)]);
  var halfWidth = api.size([1, 0])[0] * 0.1;
  var style = api.style({
    stroke: api.visual("color"),
    fill: null
  });
  return {
    type: "group",
    children: [
      {
        type: "line",
        shape: {
          x1: highPoint[0] - halfWidth,
          y1: highPoint[1],
          x2: highPoint[0] + halfWidth,
          y2: highPoint[1]
        },
        style: style
      },
      {
        type: "line",
        shape: {
          x1: highPoint[0],
          y1: highPoint[1],
          x2: lowPoint[0],
          y2: lowPoint[1]
        },
        style: style
      },
      {
        type: "line",
        shape: {
          x1: lowPoint[0] - halfWidth,
          y1: lowPoint[1],
          x2: lowPoint[0] + halfWidth,
          y2: lowPoint[1]
        },
        style: style
      }
    ]
  };
}
export default {
  props: {
    aqiData: {
      type: Object
    }
  },
  watch: {
    aqiData(val) {
      if (val.aqiList.length > 0) {
        this.initChart();
      }
    }
  },
  methods: {
    initChart() {
      const xAxisData = [];
      const lineData = [];
      if (this.aqiData.aqiList) {
        this.aqiData.aqiList.forEach(item => {
          for (let key in item) {
            xAxisData.push(key);
            lineData.push(item[key]);
          }
        });
      }
      const options = {
        title: {
          show: true,
          text: "AQI(无量纲)",
          textStyle: {
            fontSize: 9,
            fontWeight: 600
          }
        },
        tooltip: {
          trigger: "axis"
        },
        legend: {
          data: ["实况监测", "人工预报"],
          itemWidth: 18,
          itemHeight: 10,
          textStyle: {
            fontSize: 10,
            fontWeight: 400
          }
        },
        dataZoom: [
          {
            type: "inside",
            start: 0,
            end: 21
          },
          {
            type: "slider",
            start: 0,
            end: 21,
            bottom: 10,
            height: 18,
            textStyle: {
              fontSize: 10
            }
          }
        ],
        grid: {
          top: "12%",
          left: "5%",
          bottom: "18%",
          right: "10%",
          containLabel: true
        },
        xAxis: {
          type: "category",
          data: xAxisData
        },
        yAxis: [
          {
            type: "value"
          },
          {
            type: "value"
          }
        ],
        series: [
          {
            data: lineData,
            type: "line",
            smooth: true,
            name: "实况监测",
            itemStyle: {
              color: "#E2C472"
            }
          },
          {
            type: "custom",
            name: "人工预报",
            itemStyle: {
              normal: {
                borderWidth: 1
              }
            },
            renderItem: renderItem,
            data: this.aqiData.createDateList
          }
        ]
      };
      const aqiChart = this.$echarts.init(document.getElementById("aqi_chart"));
      aqiChart.setOption({ ...options });
    }
  },
  mounted() {
    this.initChart();
  }
};
</script>
<style lang="scss">
#aqi_chart {
  width: 100%;
  height: 180px;
}
</style>
