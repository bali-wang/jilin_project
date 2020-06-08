<template>
  <el-row :gutter="8">
    <el-col :span="19">
      <div class="city_title">
        <i class="el-icon-s-flag"></i>
        <span>预报效果分析</span>
      </div>
      <div class="effect_chart">
        <el-col :span="18">
          <EffectChart :chartData="chartData" id="aqiLevel" />
        </el-col>
        <el-col :span="6">
          <PieChart :pieData="levelAccuracy" id="pollutePie" />
        </el-col>
      </div>
      <div class="effect_chart">
        <el-col :span="18">
          <AqiChart :aqiData="aqiData" />
        </el-col>
        <el-col :span="6">
          <PieChart id="aqiPie" :pieData="aqiAccuracyRate" />
        </el-col>
      </div>
      <div class="effect_chart">
        <el-col :span="18">
          <PrimaryPollutantChart
            :chartData="primaryPollutant"
            id="primaryPollutant"
          />
        </el-col>
        <el-col :span="6">
          <PieChart id="majorPollutant" :pieData="pollutantRate" />
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
            @change="handleRadioChange"
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
import PrimaryPollutantChart from "./components/PrimaryPollutantChart";
import { getDiffDate } from "@/utils/getDiffDate.js";
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
const aqiLevelColor = level => {
  switch (level) {
    case "优":
      return "#00E300";
    case "良":
      return "#FFFF00";
    case "轻":
      return "#FF7E00";
    case "中":
      return "FF0000";
    case "重":
      return "#99004C";
    case "严重":
      return "7E0023";
    default:
      return "";
  }
};
const getColor = name => {
  switch (name) {
    case "PM2.5":
      return "#EC5535";
    case "PM10":
      return "#F6C64A";
    case "SO2":
      return "#42AFE9";
    case "NO2":
      return "#F3B7A0";
    case "CO":
      return "#F3B7A0";
    case "O3":
      return "#3A8671";
    default:
      return "#FFFFFF";
  }
};
export default {
  components: {
    EffectChart,
    PieChart,
    AqiChart,
    season,
    PrimaryPollutantChart
  },
  data() {
    return {
      pollutantRate: {},
      aqiAccuracyRate: {},
      levelAccuracy: {},
      chartData: {},
      createDateList: [],
      aqiData: {},
      primaryPollutant: {},
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
    handleRadioChange(label) {
      this.correctParams.predictioninterval = label;
      this.queryData();
    },
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
      this.queryData();
    },
    selectCity({ code }) {
      this.actuallyParams.code = code;
      this.queryData();
    },
    dateTypeChange(type) {
      if (type === "date") {
        this.actuallyParams.dateType = "day";
      }
      this.actuallyParams.dateType = type;
    },
    handleResult(resultList) {
      const newData = [...this.chartData.xAxisData];
      const manualWorkData = [];
      newData.forEach(item => {
        let target = resultList.find(
          element => element.datadate.split("T")[0] === item
        );
        if (target) {
          if (target.primary_pollutant) {
            target = { ...target, primaryPollutant: target.primary_pollutant };
          }
          manualWorkData.push(target);
        } else {
          manualWorkData.push({
            datadate: item,
            aqiLevel: "",
            aqiMax: 0,
            aqiMin: 0,
            primaryPollutant: "-"
          });
        }
      });
      return manualWorkData;
    },
    getPrimaryPollutant(data) {
      const pollutantArr1 = [];
      const pollutantArr2 = [];
      data.forEach(item => {
        const primaryPollutantArr = item.primaryPollutant.split(",");
        const len = primaryPollutantArr.length;
        switch (len) {
          case 1:
            pollutantArr1.push({
              name: `${primaryPollutantArr[0]}`,
              value: 1,
              itemStyle: {
                color: getColor(primaryPollutantArr[0])
              }
            });
            pollutantArr2.push({
              value: 1,
              itemStyle: {
                opacity: 0
              }
            });
            break;
          case 2:
            pollutantArr1.push({
              name: `${primaryPollutantArr[0]}`,
              value: 1,
              itemStyle: {
                color: getColor(primaryPollutantArr[0])
              }
            });
            pollutantArr2.push({
              name: `${primaryPollutantArr[1]}`,
              value: 1,
              itemStyle: {
                color: getColor(primaryPollutantArr[1])
              }
            });
            break;
          default:
            pollutantArr1.push({
              value: 1,
              itemStyle: {
                opacity: 0
              }
            });
            pollutantArr2.push({
              value: 1,
              itemStyle: {
                opacity: 0
              }
            });
        }
      });
      return { pollutantArr1, pollutantArr2 };
    },
    handlePrimaryPollutant(actuallyData, correctData) {
      const pollutantAccuracy = [];
      correctData.forEach(item => {
        const primaryPollutantArr = item.primaryPollutant.split(",");
        if (primaryPollutantArr.length > 0) {
          const target = actuallyData.find(el => {
            if (el.primaryPollutant) {
              return primaryPollutantArr.includes(el.primaryPollutant);
            }
          });
          if (target) {
            pollutantAccuracy.push({
              name: "准确",
              value: 0,
              symbol:
                "path://M792.064 416.768l-327.168 335.36c-7.68 8.192-18.432 12.288-29.696 12.8-11.264 0-22.016-4.608-29.696-12.288l-175.616-176.128c-7.68-7.68-12.288-18.432-12.288-29.696 0-11.264 4.608-22.016 12.288-29.696s18.432-12.288 29.696-12.288c11.264 0 22.016 4.608 29.696 12.288L435.2 663.04l296.96-305.152c16.384-16.384 42.496-16.896 59.392-0.512 16.384 16.384 16.896 43.008 0.512 59.392zM510.464 10.24C233.472 10.24 7.68 236.032 7.68 513.024s225.792 503.296 502.784 503.296 503.296-225.792 503.296-503.296C1013.76 236.032 787.968 10.24 510.464 10.24z",
              itemStyle: {
                color: "#1afa29"
              }
            });
          } else {
            pollutantAccuracy.push({
              name: "错误",
              value: 1,
              symbol:
                "path://M512 65.828571C265.752381 65.828571 65.828571 265.752381 65.828571 512S265.752381 958.171429 512 958.171429 958.171429 758.247619 958.171429 512 758.247619 65.828571 512 65.828571z m182.857143 633.904762h-73.142857L512 568.07619l-109.714286 131.657143h-73.142857c-4.87619 0-9.752381-4.87619-9.752381-9.752381 0-2.438095 0-4.87619 2.438095-4.87619l143.847619-170.666667-143.847619-170.666666c-2.438095-2.438095-2.438095-2.438095-2.438095-4.876191 0-4.87619 4.87619-9.752381 9.752381-9.752381h73.142857l109.714286 131.657143 109.714286-131.657143h73.142857c4.87619 0 9.752381 4.87619 9.752381 9.752381 0 2.438095 0 4.87619-2.438095 4.876191l-143.847619 170.666666 143.847619 170.666667c2.438095 2.438095 2.438095 2.438095 2.438095 4.87619 0 7.314286-4.87619 9.752381-9.752381 9.752381z",
              itemStyle: {
                color: "#EF7C3B"
              }
            });
          }
        }
      });
      const accuracyRate = pollutantAccuracy.filter(
        item => item.name === "准确"
      );
      const errorRate = pollutantAccuracy.filter(item => item.name === "错误");
      this.pollutantRate = {
        color: ["#6CE44F", "#F49D7F"],
        legendData: ["准确", "错误"],
        aqiRate: [
          {
            name: "准确",
            value: 0
          },
          {
            name: "错误",
            value: errorRate.length
          }
        ],
        totalDay: accuracyRate.length + errorRate.length,
        effectDay: 0
      };
      this.primaryPollutant = {
        ...this.primaryPollutant,
        actualPollutant: [
          ...this.getPrimaryPollutant(actuallyData).pollutantArr1
        ],
        correctPollutant1: [
          ...this.getPrimaryPollutant(correctData).pollutantArr1
        ],
        correctPollutant2: [
          ...this.getPrimaryPollutant(correctData).pollutantArr2
        ],
        pollutantAccuracy
      };
    },
    handlePollutantLevel(actuallyData, correctData) {
      const aqiLevel1 = [];
      const aqiLevel2 = [];
      const actualData = [];
      const accuracyArr = [];
      actuallyData.forEach(element => {
        if (element.aqi > 0 && element.aqi <= 50) {
          actualData.push({
            name: "优",
            value: 1,
            itemStyle: {
              color: "#00E300"
            }
          });
        } else if (element.aqi > 50 && element.aqi <= 100) {
          actualData.push({
            name: "良",
            value: 1,
            itemStyle: {
              color: "#FFFF00",
              borderWidth: 10
            }
          });
        } else if (element.aqi > 100 && element.aqi <= 150) {
          actualData.push({
            name: "轻",
            value: 1,
            itemStyle: {
              color: "#FF7E00",
              borderWidth: 10
            }
          });
        } else if (element.aqi > 150 && element.aqi <= 200) {
          actualData.push({
            name: "中",
            value: 1,
            itemStyle: {
              color: "#FF0000",
              borderWidth: 10
            }
          });
        } else if (element.aqi > 200 && element.aqi <= 300) {
          actualData.push({
            name: "重",
            value: 1,
            itemStyle: {
              color: "#99004C",
              borderWidth: 10
            }
          });
        } else if (element.aqi > 300) {
          actualData.push({
            name: "严重",
            value: 1,
            itemStyle: {
              color: "#7E0023",
              borderWidth: 10
            }
          });
        } else {
          actualData.push({
            name: "",
            value: 0
          });
        }
      });
      correctData.forEach(item => {
        const target = actuallyData.find(
          element =>
            item.datadate.split("T")[0] === element.datadate.split("T")[0]
        );
        if (item.aqiLevel) {
          const aqiLevelArr = item.aqiLevel.split("-");
          const len = aqiLevelArr.length;
          switch (len) {
            case 1:
              aqiLevel1.push({
                name: aqiLevelArr[0],
                value: 1,
                itemStyle: {
                  color: aqiLevelColor(aqiLevelArr[0])
                }
              });
              aqiLevel2.push({
                name: "",
                value: 0,
                itemStyle: {
                  opacity: 0
                }
              });
              break;
            case 2:
              aqiLevel1.push({
                name: aqiLevelArr[0],
                value: 1,
                itemStyle: {
                  color: aqiLevelColor(aqiLevelArr[0])
                }
              });
              aqiLevel2.push({
                name: aqiLevelArr[1],
                value: 1,
                itemStyle: {
                  color: aqiLevelColor(aqiLevelArr[1])
                }
              });
              break;
            default:
              aqiLevel1.push({
                name: "",
                value: 0,
                itemStyle: {
                  opacity: 0
                }
              });
              aqiLevel2.push({
                name: "",
                value: 0,
                itemStyle: {
                  opacity: 0
                }
              });
          }
        } else {
          aqiLevel1.push({
            name: "",
            value: 0,
            itemStyle: {
              opacity: 0
            }
          });
          aqiLevel2.push({
            name: "",
            value: 0,
            itemStyle: {
              opacity: 0
            }
          });
        }
        if (
          target.aqi &&
          item.aqiMin &&
          item.aqiMax &&
          target.aqi >= item.aqiMin &&
          target.aqi <= item.aqiMax
        ) {
          accuracyArr.push({
            name: "准确",
            value: 1,
            symbol:
              "path://M792.064 416.768l-327.168 335.36c-7.68 8.192-18.432 12.288-29.696 12.8-11.264 0-22.016-4.608-29.696-12.288l-175.616-176.128c-7.68-7.68-12.288-18.432-12.288-29.696 0-11.264 4.608-22.016 12.288-29.696s18.432-12.288 29.696-12.288c11.264 0 22.016 4.608 29.696 12.288L435.2 663.04l296.96-305.152c16.384-16.384 42.496-16.896 59.392-0.512 16.384 16.384 16.896 43.008 0.512 59.392zM510.464 10.24C233.472 10.24 7.68 236.032 7.68 513.024s225.792 503.296 502.784 503.296 503.296-225.792 503.296-503.296C1013.76 236.032 787.968 10.24 510.464 10.24z",
            itemStyle: {
              color: "#1afa29"
            }
          });
        } else if (
          target.aqi &&
          item.aqiMin &&
          item.aqiMax &&
          target.aqi < item.aqiMin
        ) {
          accuracyArr.push({
            name: "偏高",
            value: 1,
            symbol:
              "path://M511.949858 64.197114c-247.369947 0-447.904193 200.533222-447.904193 447.904193 0 247.369947 200.534246 447.904193 447.904193 447.904193 247.371994 0 447.904193-200.534246 447.904193-447.904193 0.001023-247.371994-200.532199-447.904193-447.904193-447.904193z m164.05338 485.586421H584.680323v175.689394c0 11.660574-9.455349 21.066805-21.165042 21.066805H465.823308c-11.660574 0-21.115923-9.455349-21.115924-21.066805V549.783535l-96.760764-0.049119c-12.639878 0-19.792788-16.119119-12.0525-27.240411l156.924005-238.253312c6.075369-8.769734 17.931395-8.769734 24.055882 0l171.132613 238.302431c7.740288 11.121292 0.587378 27.240411-12.003382 27.240411z",
            itemStyle: {
              color: "#f4ea2a"
            }
          });
        } else if (
          target.aqi &&
          item.aqiMin &&
          item.aqiMax &&
          target.aqi > item.aqiMax
        ) {
          accuracyArr.push({
            name: "偏低",
            value: 1,
            symbol:
              "path://M959.855074 512.101307c0-247.369947-200.533222-447.904193-447.904193-447.904193-247.369947 0-447.904193 200.534246-447.904193 447.904193 0 247.371994 200.534246 447.904193 447.904193 447.904193 247.37097 0 447.904193-200.532199 447.904193-447.904193z m-271.849478-10.441816L516.872984 739.961922c-6.124488 8.769734-17.980513 8.769734-24.055882 0l-156.924006-238.253312c-7.741311-11.121292-0.588401-27.240411 12.052501-27.240411l96.760764-0.049119V298.730709c0-11.611455 9.455349-21.066805 21.115923-21.066805h97.691973c11.709693 0 21.165042 9.406231 21.165042 21.066805v175.689394h91.322915c12.591783 0 19.744693 16.118096 12.003382 27.239388z",
            itemStyle: {
              color: "#f4ea2a"
            }
          });
        } else {
          accuracyArr.push({
            value: 1,
            symbol: "",
            itemStyle: {
              opacity: 0
            }
          });
        }
      });
      const accuracyDay = accuracyArr.filter(item => item.name === "准确");
      const highDay = accuracyArr.filter(item => item.name === "偏高");
      const lowDay = accuracyArr.filter(item => item.name === "偏低");
      this.levelAccuracy = {
        color: ["#3CA0DB", "#6CE44F", "#FCDA5C"],
        legendData: ["准确", "偏高", "偏低"],
        aqiRate: [
          { value: accuracyDay.length, name: "准确" },
          { value: highDay.length, name: "偏高" },
          { value: lowDay.length, name: "偏低" }
        ],
        totalDay: accuracyDay.length + highDay.length + lowDay.length,
        effectDay: accuracyDay.length
      };
      this.chartData = {
        ...this.chartData,
        aqiLevel1,
        aqiLevel2,
        actualData,
        accuracyArr
      };
    },
    handleAqiData(actuallyData, correctData) {
      const createDateList = [];
      const aqiList = [];
      correctData.forEach(item => {
        const target = actuallyData.find(
          el => el.datadate.split("-")[0] === item.datadate.split("-")[0]
        );
        if (
          target &&
          item.aqiMax &&
          item.aqiMin &&
          target.aqi > item.aqiMin &&
          target.aqi < item.aqiMax
        ) {
          createDateList.push({
            name: "准确",
            value: [item.datadate.split("T")[0], item.aqiMax, item.aqiMin],
            itemStyle: {
              color: "green"
            }
          });
        } else if (item.aqiMax && item.aqiMin && target.aqi < item.aqiMin) {
          createDateList.push({
            name: "偏高",
            value: [item.datadate.split("T")[0], item.aqiMax, item.aqiMin],
            itemStyle: {
              color: "red"
            }
          });
        } else if (item.aqiMax && item.aqiMin && target.aqi > item.aqiMax) {
          createDateList.push({
            name: "偏低",
            value: [item.datadate.split("T")[0], item.aqiMax, item.aqiMin],
            itemStyle: {
              color: "red"
            }
          });
        }
      });
      actuallyData.forEach(item => {
        const key = item.datadate.split("T")[0];
        aqiList.push({ [key]: item.aqi });
      });
      const aqiAccuracy = createDateList.filter(item => item.name === "准确");
      const aqihigh = createDateList.filter(item => item.name === "偏高");
      const aqiLow = createDateList.filter(item => item.name === "偏低");
      this.aqiAccuracyRate = {
        color: ["#3CA0DB", "#6CE44F", "#FCDA5C"],
        legendData: ["准确", "偏高", "偏低"],
        aqiRate: [
          {
            name: "准确",
            value: aqiAccuracy.length
          },
          {
            name: "偏高",
            value: aqihigh.length
          },
          {
            name: "偏低",
            value: aqiLow.length
          }
        ],
        totalDay: aqiAccuracy.length + aqihigh.length + aqiLow.length,
        effectDay: aqiAccuracy.length
      };
      this.aqiData = {
        ...this.aqiData,
        aqiList,
        createDateList
      };
    },
    async queryTree() {
      const result = await queryTree({ index: "0" });
      const { HttpContent, HttpRequestMessage, StatusCode } = result.data;
      if (StatusCode === 200 && HttpRequestMessage === "SUCCESS") {
        this.cityData = [...HttpContent];
        this.actuallyParams.code = HttpContent[0].code;
        this.correctParams.code = HttpContent[0].code;
        this.queryData();
      }
    },
    async queryData() {
      const cityActuallyData = await cityActuallyQuery(this.actuallyParams);
      const manualWorkCorrectData = await manualWorkCorrectDataQuery(
        this.correctParams
      );
      const {
        HttpContent: actuallyData,
        HttpRequestMessage: actualMessage,
        StatusCode: actualCode
      } = cityActuallyData.data;
      const {
        HttpContent: correctData,
        HttpRequestMessage: correctMessage,
        StatusCode: correctCode
      } = manualWorkCorrectData.data;
      if (
        actualCode === 200 &&
        actualMessage === "SUCCESS" &&
        correctCode === 200 &&
        correctMessage === "SUCCESS"
      ) {
        this.handlePrimaryPollutant(
          this.handleResult(actuallyData),
          this.handleResult(correctData)
        );
        this.handlePollutantLevel(
          this.handleResult(actuallyData),
          this.handleResult(correctData)
        );
        this.handleAqiData(
          this.handleResult(actuallyData),
          this.handleResult(correctData)
        );
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
      this.queryData();
    }
  },
  mounted() {
    this.queryTree();
    this.chartData = {
      ...this.chartData,
      xAxisData: [
        ...getDiffDate(
          this.actuallyParams.startTimeStr.split(" ")[0],
          this.actuallyParams.endTimeStr.split(" ")[0]
        )
      ]
    };
    this.primaryPollutant = {
      ...this.primaryPollutant,
      xAxisData: [
        ...getDiffDate(
          this.actuallyParams.startTimeStr.split(" ")[0],
          this.actuallyParams.endTimeStr.split(" ")[0]
        )
      ]
    };
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
