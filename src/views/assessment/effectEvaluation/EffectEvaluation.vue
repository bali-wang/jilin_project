<template>
  <el-row :gutter="8">
    <el-col :span="19">
      <div class="city_title">
        <i class="el-icon-s-flag"></i>
        <span>预报效果分析</span>
      </div>
      <div class="effect_chart">
        <el-col :span="18">
          <EffectChart :chartData="chartData" />
        </el-col>
        <el-col :span="6">
          <PieChart :pieData="pieData" id="pollutePie" />
        </el-col>
      </div>
      <div class="effect_chart">
        <el-col :span="18">
          <AqiChart :aqiData="aqiData" />
        </el-col>
        <el-col :span="6">
          <PieChart id="aqiPie" />
        </el-col>
      </div>
      <div class="effect_chart">
        <el-col :span="18">
          <EffectChart :chartData="chartData" />
        </el-col>
        <el-col :span="6">
          <PieChart id="majorPollutant" />
        </el-col>
      </div>
    </el-col>
    <el-col :span="5">
      <div class="select_wrapper">
        <div class="city_select">
          <div class="select_title">
            <i class="el-icon-s-flag"></i>
            <span class="select_text">筛选条件</span>
          </div>
        </div>
        <div class="date_select">
          <el-radio-group
            v-model="actuallyParams.dateType"
            size="mini"
            @change="dateTypeChange"
          >
            <el-radio-button label="year">年度</el-radio-button>
            <el-radio-button label="quarter">季度</el-radio-button>
            <el-radio-button label="month">月份</el-radio-button>
            <el-radio-button label="date">自定义</el-radio-button>
          </el-radio-group>
        </div>
        <ul class="select_content">
          <li class="start_time">选择时间</li>
          <li class="time_picker">
            <el-date-picker
              v-model="actuallyParams.predictionTimeStr"
              :type="actuallyParams.dateType"
              placeholder="选择日期"
              size="mini"
              value-format="yyyy-MM-dd"
              @change="handleChange"
              v-if="actuallyParams.dateType !== 'quarter'"
            >
            </el-date-picker>
            <season v-else :getValue="getValue" />
          </li>
        </ul>
        <div class="timeliness_select">
          <div class="timeliness_title">
            预报时效选择
            <i class=""></i>
          </div>
          <el-radio-group
            v-model="correctParams.predictioninterval"
            size="mini"
          >
            <el-radio label="1" border>24h</el-radio>
            <el-radio label="2" border>48h</el-radio>
            <el-radio label="3" border>72h</el-radio>
            <el-radio label="4" border>96h</el-radio>
            <el-radio label="5" border>120h</el-radio>
            <el-radio label="6" border>144h</el-radio>
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
  manualWorkCorrectDataQuery,
  cityActuallyQuery
} from "@/api/forecast";
import season from "@/components/season";
import EffectChart from "./components/EffectChart";
import PieChart from "./components/PieChart";
import AqiChart from "./components/AqiChart";
function createDate() {
  const dateArr = [];
  for (let i = 1; i <= 12; i++) {
    const obj = {};
    obj["value"] = i + "";
    obj["label"] = `${i}月`;
    dateArr.push(obj);
  }
  return dateArr;
}
export default {
  components: { EffectChart, PieChart, AqiChart, season },
  data() {
    return {
      chartData: [],
      aqiData: [],
      pieData: [],
      cityData: [],
      options: createDate(),
      correctParams: {
        code: "",
        startDate: "2020-04-14 00:00:00",
        endDate: "2020-05-28 00:00:00",
        predictioninterval: 72 / 24,
        ctype: "0"
      },
      actuallyParams: {
        code: "",
        codeType: "citycode",
        dateType: "year",
        endTimeStr: "2020-05-28 00:00:00",
        startTimeStr: "2020-04-14 00:00:00",
        target: "*"
      }
    };
  },
  methods: {
    getValue(value) {
      this.actuallyParams.startTimeStr = `${value
        .split("-")[0]
        .substring(0, 4)}-${value
        .split("-")[0]
        .substring(4, value.split("-")[0].length)}-01 00:00:00`;
      this.actuallyParams.endTimeStr = `${value
        .split("-")[0]
        .substring(0, 4)}-${value
        .split("-")[1]
        .substring(4, value.split("-")[1].length)}-30 00:00:00`;
      console.log(this.actuallyParams);
      this.querycityActually(this.actuallyParams);
    },
    selectCity({ code }) {
      this.actuallyParams.code = code;
      this.querycityActually(this.actuallyParams);
    },
    dateTypeChange(type) {
      if (type === "date") {
        this.actuallyParams.dateType = "day";
      }
      this.actuallyParams.dateType = type;
    },
    async queryCorrectData(correctParams) {
      const result = await manualWorkCorrectDataQuery(correctParams);
      const { HttpContent, HttpRequestMessage, StatusCode } = result.data;
      if (StatusCode === 200 && HttpRequestMessage === "SUCCESS") {
        console.log(HttpContent);
      }
    },
    async querycityActually(actuallyParams) {
      const wrfData = await cityActuallyQuery(actuallyParams);
      const { HttpContent, StatusCode, HttpRequestMessage } = wrfData.data;
      if (StatusCode === 200 && HttpRequestMessage === "SUCCESS") {
        this.handleAqiData(HttpContent);
      }
    },
    handleAqiData(data) {
      const aqiList = [];
      data.forEach(element => {
        const key = element.monitordate.split("T")[0];
        aqiList.push({ [key]: element.aqi });
      });
      this.aqiData = [...aqiList];
    },
    async queryTree() {
      const result = await queryTree({ index: "0" });
      const { HttpContent, HttpRequestMessage, StatusCode } = result.data;
      if (StatusCode === 200 && HttpRequestMessage === "SUCCESS") {
        this.cityData = [...HttpContent];
        this.actuallyParams.code = HttpContent[0].code;
        this.correctParams.code = HttpContent[0].code;
        this.queryCorrectData(this.correctParams);
        this.querycityActually(this.actuallyParams);
      }
    },
    handleChange(value) {
      if (this.actuallyParams.dateType === "year") {
        this.actuallyParams.startTimeStr = `${value} 00:00:00`;
        this.actuallyParams.endTimeStr = `${value.split("-")[0]}12-30 00:00:00`;
      }
      if (this.actuallyParams.dateType === "month") {
        this.actuallyParams.startTimeStr = `${value} 00:00:00`;
        this.actuallyParams.endTimeStr = `${value.split("-")[0]}-${
          value.split("-")[1]
        }-30 00:00:00`;
      }
      this.queryCorrectData(this.correctParams);
      this.querycityActually(this.actuallyParams);
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
      width: 130px;
      border-left: none;
      border-top-right-radius: 4px;
      border-bottom-right-radius: 4px;
      & /deep/ .el-input__suffix {
        right: 0;
      }
      & /deep/ .el-input__inner {
        padding-left: 15px;
      }
    }
  }
}
.select_content /deep/ .el-date-editor.el-input {
  border: none;
  width: 140px;
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
.timeliness_select,
.date_select {
  width: 100%;
  padding: 0 10px;
  margin: 10px 0;
  .timeliness_title {
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
.timeliness_select /deep/ .el-radio--mini.is-bordered {
  padding: 6px 10px;
  width: 71px;
}
.timeliness_select /deep/ .el-radio.is-bordered + .el-radio.is-bordered {
  margin: 2px 0;
}
.timeliness_select /deep/ .el-radio {
  margin: 0;
}
.date_select /deep/ .el-radio-button--mini .el-radio-button__inner {
  padding: 6px 12.5px;
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
.effect_chart {
  widows: 80%;
  height: 180px;
  border-bottom: 1px solid #009581;
}
</style>
