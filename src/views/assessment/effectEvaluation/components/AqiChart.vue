<template>
  <div id="aqi_chart"></div>
</template>
<script>
export default {
  props: {
    aqiData: {
      type: Array
    }
  },
  watch: {
    aqiData(val) {
      if (val.length > 0) {
        this.initChart();
      }
    }
  },
  methods: {
    initChart() {
      const xAxisData = [];
      const lineData = [];
      [...this.aqiData].forEach(item => {
        for (let key in item) {
          xAxisData.push(key);
          lineData.push(item[key]);
        }
      });
      const options = {
        title: {
          show: true,
          text: "AQI(无量纲)",
          textStyle: {
            fontSize: 10,
            fontWeight: 600
          }
        },
        tooltip: {
          trigger: "axis"
        },
        legend: {
          data: ["实况监测", "人工预报"]
        },
        dataZoom: [
          {
            type: "inside"
          },
          {
            type: "slider",
            bottom: 10,
            height: 18,
            textStyle: {
              fontSize: 10
            }
          }
        ],
        grid: [
          {
            top: "12%",
            left: "5%",
            bottom: "18%",
            right: "10%",
            containLabel: true
          }
        ],
        xAxis: [
          {
            type: "category",
            data: xAxisData
          }
        ],
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
            name: "实况监测"
          },
          {
            type: "custom",
            name: "人工预报"
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
