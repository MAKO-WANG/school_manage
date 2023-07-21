<template>
  <section class="header-nav">

    <RouterLink to="/">Home</RouterLink>
    <RouterLink to="/user">user</RouterLink>
  </section>
</template>

<script setup lang="ts">
</script>

<style lang="less" scoped>
.header-nav {
  height: 70px;
  display: flex;
  justify-content: center;
  align-items: center;

  a {
    color: #262626;
    font-weight: bold;
    font-size: 16px;
    margin: 0 20px;
  }
}
</style>
