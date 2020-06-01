<template>
  <el-row>
    <el-col :span="12">
      <div class="header_title">吉林市空气质量预报预警系统</div>
    </el-col>
    <el-col :span="12">
      <div class="user_content">
        <div class="user_info">
          <div class="user_item">
            <span class="user_message">你好!</span>
            <span class="user_name">Adimin</span>
          </div>
          <div class="user_item">
            <i class="el-icon-switch-button"></i>
            <span class="login_contrl" @click="logout">退出</span>
          </div>
        </div>
        <div class="header_menu">
          <ul class="menu_content">
            <li
              :class="[currentIndex === i ? 'selected' : '']"
              class="menu_item"
              v-for="(navItem, i) of navBarList"
              :key="navItem.path"
              @click="handleItemClick(navItem, i)"
            >
              <i :class="`el-icon-${navItem.meta.icon}`" class="menu_icon"></i>
              <span>{{ navItem.meta.title }}</span>
            </li>
          </ul>
        </div>
      </div>
    </el-col>
  </el-row>
</template>
<script>
export default {
  props: {
    currentIndex: {
      type: Number,
      default: 0
    },
    navBarList: {
      type: Array,
      required: true
    }
  },
  data() {
    return {};
  },
  methods: {
    handleItemClick(item, i) {
      this.$router
        .push({
          path: item.path
        })
        .catch(err => {
          err;
        });
      localStorage.setItem("currentIndex", i);
      this.$emit("getMenuData", item, i);
    },
    logout() {
      localStorage.clear();
      this.$router
        .push({
          path: "/login"
        })
        .catch(err => {
          console.log(err);
        });
    }
  }
};
</script>
<style lang="scss" scope>
.header_title {
  padding: 0 34px;
  color: #fff;
  font-size: 20px;
  font-family: "Franklin Gothic Medium", "Arial Narrow", Arial, sans-serif;
  letter-spacing: 10px;
  font-weight: 700;
  line-height: 82px;
  text-transform: uppercase;
  text-shadow: 0px 0px 0 #0a7464, 1px -1px 0 #0a7464, -2px -2px 0 #0a7464,
    3px -3px 0 #0a7464;
}
.user_content {
  overflow: hidden;
  .user_info {
    display: flex;
    justify-content: end;
    height: 41px;
    line-height: 41px;
    position: absolute;
    right: 20px;
    color: #fff;
    font-size: 13px;
    .user_item {
      margin: 0 10px;
      .user_name,
      .login_contrl {
        background: #02af96;
        padding: 4px 8px;
        margin-left: 6px;
        border-radius: 3px;
        cursor: pointer;
      }
    }
  }
  .menu_content {
    display: flex;
    position: absolute;
    bottom: 1px;
    right: 0;
    list-style: none;
    color: #fff;
    .menu_item {
      flex: 1;
      width: 118px;
      cursor: pointer;
      text-align: center;
      font-size: 14px;
      background: #02af96;
      padding: 6px 4px;
      margin: 0 1px;
      line-height: 25px;
      box-shadow: 0px 0px 2px 1px #f6f7f7 inset;
      &.selected {
        box-shadow: 0px 0px 4px 1px #f6f7f7 inset;
        background: #0a7464;
      }
      .menu_icon {
        margin-right: 6px;
      }
    }
  }
}
</style>
