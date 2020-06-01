<template>
  <el-row :gutter="8">
    <el-col :span="19">
      <div class="city_title">
        <i class="el-icon-s-flag"></i>
        <span>{{ currentCity }}{{ dayInterval }}空气质量报告结果</span>
      </div>
      <AQIInfo :AQIData="AQIData" :loading="loading" />
      <WrfInfo :wrfData="wrfData" :loading="loading" />
    </el-col>
    <el-col :span="5">
      <div class="select_wrapper">
        <div class="city_select">
          <div class="select_title">
            <i class="el-icon-s-flag"></i>
            <span class="select_text">筛选条件</span>
          </div>
        </div>
        <ul class="select_content">
          <li class="start_time">起报时间</li>
          <li class="time_picker">
            <el-date-picker
              v-model="params.predictionTimeStr"
              type="date"
              placeholder="选择日期"
              size="mini"
            >
            </el-date-picker>
          </li>
          <li class="time_select">
            <el-select
              v-model="options[0].value"
              placeholder="请选择"
              size="mini"
            >
              <el-option
                v-for="item in options"
                :key="item.value"
                :label="item.label"
                :value="item.value"
              >
              </el-option>
            </el-select>
          </li>
        </ul>
        <div class="mode_select">
          <div class="mode_title">
            模式选择
            <i class=""></i>
          </div>
          <el-radio-group
            v-model="params.modelName"
            size="mini"
            @change="modeChange"
          >
            <el-radio-button label="NAQPMS"></el-radio-button>
            <el-radio-button label="CMAQ"></el-radio-button>
            <el-radio-button label="CAMx"></el-radio-button>
          </el-radio-group>
        </div>
        <div class="select_city">
          <div class="citySelect_title">
            城市选择
            <i class=""></i>
          </div>
          <el-tree :data="cityData" @node-click="selectCity"></el-tree>
        </div>
      </div>
    </el-col>
  </el-row>
</template>
<script>
import {
  queryTree,
  cityPredictionByTimeQuery,
  cityWrfPredictByTimeQuery,
  stationPredictionByTimeQuery,
  stationWrfByTimeQuery
} from "@/api/forecast";
import WrfInfo from "./components/WrfInfo";
import AQIInfo from "./components/AQIinfo";
export default {
  components: {
    WrfInfo,
    AQIInfo
  },
  data() {
    return {
      loading: false,
      locationType: "",
      cityData: [],
      wrfData: [],
      timer: "20时",
      options: [
        {
          value: "1",
          label: "08时"
        },
        {
          value: "2",
          label: "20时"
        },
        {
          value: "3",
          label: "其他"
        }
      ],
      AQIData: [],
      currentCity: "",
      params: {
        code: "220100",
        codeType: "citycode",
        dateType: "day",
        endTimeStr: "2020-03-30 00:00:00",
        modelName: "NAQPMS",
        predictionTimeStr: "2020-03-23 20:00:00",
        startTimeStr: "2020-03-24 00:00:00",
        target:
          "so2_24h,so2_24h_iaqi,co_24h,co_24h_iaqi,no2_24h,no2_24h_iaqi,pm10_24h,pm10_24h_iaqi,pm25_24h,pm25_24h_iaqi,o3_1h_max,o3_1h_max_iaqi,o3_8h_max,o3_8h_max_iaqi,aqi,primary_pollutant,aqi_level",
        zoneName: "d3"
      }
    };
  },
  computed: {
    dayInterval() {
      const startDay = this.params.startTimeStr.split(" ")[0];
      const endDay = this.params.endTimeStr.split(" ")[0];
      return `${startDay.split("-")[1]}月${startDay.split("-")[2]}日至${
        endDay.split("-")[1]
      }月${endDay.split("-")[2]}日`;
    }
  },
  methods: {
    selectCity({ code, type, label }) {
      this.params.code = code;
      this.currentCity = label;
      switch (type) {
        case "city":
          this.queryData(this.params);
          this.queryWrfData(this.params);
          break;
        case "station":
          this.queryStationWrf(this.params);
          this.queryStationData(this.params);
          break;
      }
    },
    modeChange(mode) {
      this.params.modelName = mode;
      this.queryData(this.params);
    },
    async queryStationData(params) {
      const result = await stationPredictionByTimeQuery(params);
      this.handleResult(result);
    },
    handleResult(result) {
      const { HttpContent, HttpRequestMessage, StatusCode } = result.data;
      if (StatusCode === 200 && HttpRequestMessage === "SUCCESS") {
        this.loading = false;
        const newData = [...HttpContent];
        newData.forEach(item => {
          Object.assign(item, { modelName: this.params.modelName });
        });
        this.AQIData = [...newData];
      }
    },
    async queryStationWrf(params) {
      const result = await stationWrfByTimeQuery({
        ...params,
        modelName: "wrf",
        target:
          "tem_2m_24h_max,tem_2m_24h_min,hum_2m_24h,windspeed_10m_24h,winddirect_10m_24h,rain_24h_total,pbl_24h,swdown_24h"
      });
      this.handleWrfResult(result);
    },
    async queryData(params) {
      const result = await cityPredictionByTimeQuery({
        ...params,
        modelName: params.modelName.toLowerCase()
      });
      this.handleResult(result);
    },
    async queryWrfData(params) {
      const result = await cityWrfPredictByTimeQuery({
        ...params,
        modelName: "wrf",
        target:
          "tem_2m_24h_max,tem_2m_24h_min,hum_2m_24h,windspeed_10m_24h,winddirect_10m_24h,rain_24h_total,pbl_24h,swdown_24h"
      });
      this.handleWrfResult(result);
    },
    handleWrfResult(result) {
      const { HttpContent, StatusCode, HttpRequestMessage } = result.data;
      if (StatusCode === 200 && HttpRequestMessage === "SUCCESS") {
        this.loading = false;
        this.wrfData = [...HttpContent];
      }
    },
    async queryTree() {
      this.loading = true;
      const result = await queryTree({ index: "1" });
      const { HttpContent, HttpRequestMessage, StatusCode } = result.data;
      if (StatusCode === 200 && HttpRequestMessage === "SUCCESS") {
        this.cityData = [...HttpContent];
        this.params.code = HttpContent[0].code;
        this.locationType = HttpContent[0].type;
        this.currentCity = HttpContent[0].label;
        this.handleSearch(this.locationType);
      }
    },
    handleSearch(type) {
      switch (type) {
        case "city":
          this.queryData(this.params);
          this.queryWrfData(this.params);
          break;
        case "station":
          this.queryStationData(this.params);
          this.queryStationWrf(this.params);
          break;
      }
    },
    handleWrfSearch(type) {
      switch (type) {
        case "city":
          this.queryStationWrf(this.params);
          break;
        case "station":
          this.queryWrfData(this.params);
      }
    }
  },
  mounted() {
    this.queryTree();
  }
};
</script>
<style lang="scss" scope>
.city_title {
  padding: 10px;
  margin-bottom: 10px;
  border-bottom: 1px solid #02af96;
}
.select_wrapper {
  width: 100%;
  border: 1px solid #009380;
}
.city_select {
  width: 100%;
  .select_title {
    height: 20px;
    line-height: 20px;
    background: #0a7464;
    color: #fff;
    .select_text {
      margin-left: 6px;
    }
  }
}
.select_content {
  display: flex;
  width: 100%;
  padding: 0 10px;
  margin: 10px 0;
  li {
    color: #043;
    list-style: none;
    border: 1px solid #ccc;
    line-height: 20px;
    height: 22px;
    text-align: center;
    &.start_time {
      width: 70px;
      border-top-left-radius: 4px;
      border-bottom-left-radius: 4px;
      background: #ddd;
      border-left: none;
      & /deep/ .el-input__prefix {
        left: 0;
      }
    }
    &.time_select {
      width: 70px;
      border-left: none;
      border-top-right-radius: 4px;
      border-bottom-right-radius: 4px;
      & /deep/ .el-input__suffix {
        right: 0;
      }
      & /deep/ .el-input__inner {
        padding-left: 5px;
      }
    }
  }
}
.select_content /deep/ .el-date-editor.el-input {
  border: none;
  width: 100px;
}
.select_content /deep/ .el-input--mini .el-input__inner,
.select_content /deep/ .el-input--mini .el-input__icon {
  height: 20px;
  line-height: 20px;
  color: #000;
}
.select_content /deep/ .el-input--mini .el-input__inner {
  padding-right: 0;
  border: none;
  color: #000;
}
.start_time {
  border-radius: 2px 0;
}
.mode_select {
  padding: 0 10px;
  margin: 10px 0;
  .mode_title {
    height: 22px;
    padding: 2px 6px;
    margin-bottom: 5px;
    line-height: 20px;
    border-radius: 2px;
    font-size: 12px;
    color: #043;
    background: #ddd;
  }
}
.mode_select /deep/ .el-radio-button--mini .el-radio-button__inner {
  padding: 6px 14.7px;
}
.select_city {
  padding: 0 10px;
  margin: 10px 0;
  .citySelect_title {
    height: 22px;
    padding: 2px 6px;
    margin-bottom: 5px;
    line-height: 20px;
    border-radius: 2px;
    font-size: 12px;
    color: #043;
    background: #ddd;
  }
}
</style>
