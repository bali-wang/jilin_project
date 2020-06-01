<template>
  <div>
    <div class="collapse_menu">
      <i
        class="menu_icon"
        @click="handleCollapse"
        :class="[isCollapse ? 'el-icon-s-unfold' : 'el-icon-s-fold']"
      ></i>
    </div>
    <el-menu
      style="border: none"
      background-color="#f2f5ec"
      class="el-menu-vertical-demo"
      :default-active="menuData[0].name"
      @select="handleSelect"
      :collapse-transition="false"
      :collapse="isCollapse"
    >
      <el-menu-item
        v-for="menuItem of menuData"
        :key="menuItem.path"
        :index="menuItem.name"
      >
        <i :class="`el-icon-${menuItem.meta.icon}`"></i>
        <span slot="title">{{ menuItem.meta.title }}</span>
      </el-menu-item>
    </el-menu>
  </div>
</template>
<script>
export default {
  props: {
    isCollapse: {
      type: Boolean,
      required: true,
      default: false
    },
    menuData: {
      type: Array,
      required: true,
      default() {
        return [];
      }
    }
  },
  data() {
    return {};
  },
  methods: {
    handleSelect(index, indexPath) {
      this.$router
        .push({
          path: indexPath[0]
        })
        .catch(err => {
          err;
        });
    },
    handleCollapse() {
      this.$emit("changeCollapse");
    }
  }
};
</script>
<style lang="scss">
.collapse_menu {
  position: relative;
  height: 30px;
  width: 100%;
  background: #009581;
  .menu_icon {
    padding: 0 2px;
    line-height: 30px;
    position: absolute;
    right: 5px;
    font-size: 20px;
    color: white;
  }
}
.el-menu-vertical-demo:not(.el-menu--collapse) {
  width: 170px;
  min-height: 400px;
}
</style>
