<template>
  <div class="cascader">
    <div class="cascader_title">{{ title }}</div>
    <div class="cascader_parent" v-for="(item, index) of listData" :key="index">
      <i class="cascader_select_icon"></i>
      <span class="cascader_select_desc">{{ item.name }}</span>
      <div class="cascader_select_grade">
        <span
          class="cascader_grade_item"
          v-for="(grade, i) of gradeList"
          :key="i"
        ></span>
      </div>
    </div>
    <div class="cascader_child">
      <i class="cascader_select_icon"></i>
      <span class="cascader_select_desc"></span>
    </div>
  </div>
</template>
<script>
export default {
  props: {
    title: {
      type: String,
      default: "级联选择器"
    }
  },
  listData: {
    type: Array,
    default() {
      return [];
    }
  }
};
</script>
<style lang="scss" scope>
.cascader {
  .cascader_title {
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
