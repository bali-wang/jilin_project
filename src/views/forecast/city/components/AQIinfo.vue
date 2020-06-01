<template>
  <el-card
    v-loading="loading"
    :body-style="{
      borderWidth: '1px',
      borderStyle: 'solid',
      borderColor: '#009380'
    }"
  >
    <div class="city_table">
      <el-table
        :data="AQIData"
        class="table"
        row-key="id"
        size="mini"
        border
        :tree-props="{ children: 'children', hasChildren: 'hasChildren' }"
      >
        <el-table-column
          prop="datadate"
          label="日期"
          align="center"
          header-align="center"
          width="100"
        >
          <template slot-scope="scope">
            <span>{{ scope.row.datadate | formatDate }}</span>
          </template>
        </el-table-column>
        <el-table-column
          prop="modelName"
          label="模式"
          align="center"
          header-align="center"
          width="80"
        >
        </el-table-column>
        <el-table-column
          align="center"
          prop="so2"
          label="so224小时平均"
          header-align="center"
        >
          <el-table-column
            prop="so2_24h"
            label="浓度"
            align="center"
            header-align="center"
            width="50"
          ></el-table-column>
          <el-table-column
            prop="so2_24h_iaqi"
            label="分指数"
            align="center"
            header-align="center"
            width="50"
          >
            <template slot-scope="scope">
              <span
                :style="{
                  backgroundColor: renderColor(scope.row.so2_24h_iaqi)
                }"
                class="subindex"
              >
                {{ scope.row.so2_24h_iaqi }}
              </span>
            </template>
          </el-table-column>
        </el-table-column>
        <el-table-column
          prop="No2"
          label="No224小时平均"
          header-align="center"
          width="80"
        >
          <el-table-column
            prop="no2_24h"
            label="浓度"
            align="center"
            header-align="center"
            width="50"
          ></el-table-column>
          <el-table-column
            prop="no2_24h_iaqi"
            label="分指数"
            align="center"
            header-align="center"
            width="50"
          >
            <template slot-scope="scope">
              <span
                :style="{
                  backgroundColor: renderColor(scope.row.no2_24h_iaqi)
                }"
                class="subindex"
              >
                {{ scope.row.no2_24h_iaqi }}
              </span>
            </template>
          </el-table-column>
        </el-table-column>
        <el-table-column
          align="center"
          prop="PM10"
          label="PM1024小时平均"
          header-align="center"
        >
          <el-table-column
            prop="pm10_24h"
            label="浓度"
            align="center"
            header-align="center"
            width="50"
          ></el-table-column>
          <el-table-column
            prop="pm10_24h_iaqi"
            label="分指数"
            align="center"
            header-align="center"
            width="50"
          >
            <template slot-scope="scope">
              <span
                :style="{
                  backgroundColor: renderColor(scope.row.pm10_24h_iaqi)
                }"
                class="subindex"
              >
                {{ scope.row.pm10_24h_iaqi }}
              </span>
            </template>
          </el-table-column>
        </el-table-column>
        <el-table-column
          prop="PM25"
          label="PM2.524小时平均"
          align="center"
          header-align="center"
        >
          <el-table-column
            prop="pm25_24h"
            label="浓度"
            align="center"
            header-align="center"
            width="50"
          ></el-table-column>
          <el-table-column
            prop="pm25_24h_iaqi"
            label="分指数"
            align="center"
            header-align="center"
            width="50"
          >
            <template slot-scope="scope">
              <span
                :style="{
                  backgroundColor: renderColor(scope.row.pm25_24h_iaqi)
                }"
                class="subindex"
              >
                {{ scope.row.pm25_24h_iaqi }}
              </span>
            </template>
          </el-table-column>
        </el-table-column>
        <el-table-column prop="co" label="co24小时平均" header-align="center">
          <el-table-column
            prop="co_24h"
            label="浓度"
            align="center"
            header-align="center"
            width="50"
          ></el-table-column>
          <el-table-column
            prop="co_24h_iaqi"
            label="分指数"
            align="center"
            header-align="center"
            width="50"
          >
            <template slot-scope="scope">
              <span
                :style="{
                  backgroundColor: renderColor(scope.row.co_24h_iaqi)
                }"
                class="subindex"
              >
                {{ scope.row.co_24h_iaqi }}
              </span>
            </template>
          </el-table-column>
        </el-table-column>
        <el-table-column
          prop="o31"
          label="o3最大1小时平均"
          header-align="center"
        >
          <el-table-column
            prop="o3_1h_max"
            label="浓度"
            align="center"
            header-align="center"
            width="50"
          ></el-table-column>
          <el-table-column
            prop="o3_1h_max_iaqi"
            label="分指数"
            align="center"
            header-align="center"
            width="50"
          >
            <template slot-scope="scope">
              <span
                :style="{
                  backgroundColor: renderColor(scope.row.o3_1h_max_iaqi)
                }"
                class="subindex"
              >
                {{ scope.row.o3_1h_max_iaqi }}
              </span>
            </template>
          </el-table-column>
        </el-table-column>
        <el-table-column
          prop="o38"
          label="o3最大8小时平均"
          header-align="center"
        >
          <el-table-column
            prop="o3_8h_max"
            label="浓度"
            align="center"
            header-align="center"
            width="50"
          ></el-table-column>
          <el-table-column
            prop="o3_8h_max_iaqi"
            label="分指数"
            align="center"
            header-align="center"
            width="50"
          >
            <template slot-scope="scope">
              <span
                :style="{
                  backgroundColor: renderColor(scope.row.o3_8h_max_iaqi)
                }"
                class="subindex"
              >
                {{ scope.row.o3_8h_max_iaqi }}
              </span>
            </template>
          </el-table-column>
        </el-table-column>
        <el-table-column
          prop="aqi"
          label="AQI"
          align="center"
          header-align="center"
          width="50"
        >
          <template slot-scope="scope">
            <span
              :style="{
                backgroundColor: renderColor(scope.row.aqi)
              }"
              class="subindex"
            >
              {{ scope.row.aqi }}
            </span>
          </template>
        </el-table-column>
        <el-table-column
          prop="primary_pollutant"
          label="首要污染物"
          align="center"
          header-align="center"
          width="100"
        >
        </el-table-column>
        <el-table-column
          prop="aqi_level"
          label="污染等级"
          align="center"
          header-align="center"
          width="80"
        >
          <template slot-scope="scope">
            <el-tag color="renderColor(scope.row.aqi)">
              {{ scope.row.aqi }}
            </el-tag>
          </template>
        </el-table-column>
      </el-table>
    </div>
  </el-card>
</template>
<script>
export default {
  props: {
    AQIData: {
      type: Array,
      required: true,
      default() {
        return [];
      }
    },
    loading: {
      type: Boolean,
      default: false
    }
  },
  filters: {
    formatDate(date) {
      const newStr = date.split("T")[0];
      return newStr;
    }
  },
  methods: {
    renderColor(num) {
      if (num > 0 && num < 50) {
        return "#86F769";
      } else if (num > 50 && num <= 100) {
        return "#F7F643";
      } else if (num > 101 && num <= 150) {
        return "#FDB264";
      } else if (num > 151 && num <= 200) {
        return "#FF481C";
      } else if (num > 201 && num <= 300) {
        return "#D143ED";
      } else {
        return "#611273";
      }
    }
  }
};
</script>
<style lang="scss" scope>
.city_table {
  height: 400px;
}
.city_table /deep/ .el-table th > .cell {
  padding: 0;
  margin: 0;
  font-size: 8px;
}
.subindex {
  display: inline-block;
  border: 1px solid #ccc;
  width: 100%;
  text-align: center;
  border-radius: 2px;
}
</style>
