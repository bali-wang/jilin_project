<template>
  <div class="layout">
    <div class="drawer" v-if="!drawer">
      <el-button @click="drawer = true" type="primary" size="small">
        <i class="el-icon-s-tools setting_icon"></i>
      </el-button>
    </div>
    <el-drawer :visible.sync="drawer" :with-header="false" size="20%">
      <h6>主题设置</h6>
    </el-drawer>
    <div class="header">
      <Header
        :navBarList="navBarList"
        @getMenuData="getMenuData"
        :currentIndex="currentIndex"
      />
    </div>
    <div class="content">
      <div
        class="aside"
        :style="{ width: !isCollapse ? '180px' : '66px' }"
        v-if="menuData.length > 0"
      >
        <Aside
          :menuData="menuData"
          :isCollapse="isCollapse"
          @changeCollapse="changeCollapse"
        />
      </div>
      <div class="AppMain">
        <router-view />
      </div>
    </div>
  </div>
</template>
<script>
import { Aside, Header } from "./components/index";
import { mapGetters } from "vuex";
export default {
  components: {
    Aside,
    Header
  },
  data() {
    return {
      drawer: false,
      menuData: [],
      navBarList: [],
      isCollapse: false,
      currentIndex: 0
    };
  },
  methods: {
    changeCollapse() {
      this.isCollapse = !this.isCollapse;
    },
    handleNavData(routesList) {
      this.navBarList = [...routesList.filter(item => item.name)];
      this.getMenuData(this.navBarList[this.currentIndex], this.currentIndex);
    },
    getMenuData(item, i) {
      this.currentIndex = i;
      if (item.children && item.children.length > 0) {
        this.menuData = [...item.children.filter(item => !item.hiddenInMenu)];
      }
    }
  },
  computed: {
    ...mapGetters(["routes"])
  },
  mounted() {
    if (localStorage.getItem("currentIndex")) {
      this.currentIndex = Number(localStorage.getItem("currentIndex"));
    }
    localStorage.setItem("currentIndex", this.currentIndex);
    this.handleNavData(this.routes);
  }
};
</script>
<style lang="scss">
.layout {
  position: relative;
  top: 0;
  right: 0;
  left: 0;
  .header {
    height: 82px;
    width: 100%;
    background: #009380;
    margin-bottom: 6px;
  }
  .content {
    display: flex;
    .aside {
      width: 172px;
      background: #f2f5ec;
      border: 1px solid #009380;
      margin-right: 4px;
    }
    .AppMain {
      width: 100%;
      height: auto;
    }
  }
}
.drawer {
  /deep/ .el-button--small {
    padding: 6px;
  }
  position: fixed;
  top: 50%;
  right: -3px;
  z-index: 555555;
  .setting_icon {
    font-size: 18px;
    text-align: left;
  }
}
</style>
