<template>
  <section class="menu">
    <router-link to="/">首页</router-link>
    <router-link to="/grades">年级管理</router-link>
    <router-link to="/groups">班级管理</router-link>
    <router-link to="/subjects">学科管理</router-link>
    <router-link to="/teachers">老师管理</router-link>
    <router-link to="/students">学生管理</router-link>
    <router-link to="/user">用户管理</router-link>
  </section>
</template>

<script setup lang="ts">

</script>

<style lang="less" scoped>
.menu {
  padding: 4px 10px;

  a {
    display: block;
    height: 40px;
    line-height: 40px;
    border-radius: 4px;
    padding: 0 16px;
    margin-bottom: 4px;

    &:hover,
    &.router-link-active {
      color: #1890ff;
      background-color: rgba(0, 0, 0, 0.04);
    }
  }
}
</style>
