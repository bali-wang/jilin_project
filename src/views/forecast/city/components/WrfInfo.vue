<template>
  <el-card
    :body-style="{
      borderWidth: '1px',
      borderStyle: 'solid',
      borderColor: '#009380'
    }"
  >
    <ul class="city_wrf" v-loading="loading">
      <li class="wrf_item" v-for="(item, i) of wrfData" :key="i">
        <dl>
          <dt>
            <span class="wrf_date">{{ item.datadate | getDate }}</span
            ><span class="wrf_week">周五</span>
          </dt>
          <dt><span class="wrf_lunar">正月二十</span><span>谷雨</span></dt>
          <dt>
            <span class="wrf_temp_start">{{ item.tem_2m_24h_min }}℃--</span
            ><span class="wrf_temp_end">{{ item.tem_2m_24h_max }}℃</span>
          </dt>
          <dt>
            <span><i></i>51%</span>
          </dt>
          <dt>
            <span
              ><i class="el-icon-wind-power"></i
              >{{ item.windspeed_10m_24h }}m/s</span
            >
          </dt>
          <dt>
            <span class="wrf_rainfall">累计降水:{{ item.rain_24h_total }}</span>
          </dt>
          <dt>
            <span>边界层高度:{{ item.pbl_24h }}m</span>
          </dt>
        </dl>
      </li>
    </ul>
  </el-card>
</template>
<script>
export default {
  props: {
    wrfData: {
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
    getDate(value) {
      if (value) {
        const newStr = value.split("T")[0];
        return newStr.substring(5, newStr.length);
      } else {
        return " ";
      }
    }
  }
};
</script>
<style lang="scss" scope>
.city_wrf {
  height: 240px;
  display: flex;
  justify-content: center;
  .wrf_item {
    flex: 1 1 auto;
    border: 1px solid #02af96;
    list-style: none;
    margin-right: 6px;
    padding: 20px 6px 0 6px;
    border-radius: 6px;
    background: linear-gradient(to top, #e4e7ee, #fff);
    dl dt {
      text-align: center;
      margin-bottom: 14px;
      .wrf_date {
        font-size: 20px;
        font-weight: 500;
        margin-right: 6px;
      }
      .wrf_week {
        font-size: 12px;
      }
      .wrf_lunar {
        margin-right: 10px;
      }
      .wrf_temp_start {
        color: #f40;
      }
      .wrf_temp_end,
      .wrf_rainfall {
        color: blue;
      }
    }
  }
}
</style>
