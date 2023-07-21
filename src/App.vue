<template>
  <headers />

  <main>
    <!-- <RouterView /> -->
    <Layout />
  </main>
</template>

<script setup lang="ts">
import Headers from '@c/header';
import Layout from '@c/Layout.vue';
</script>

<style  lang="less">
main {
  min-height: calc(100vh - 64px);
  background-color: #F5F5F5;
}

table {
  width: 100%;

  thead tr,
  tr:nth-child(even) {
    background-color: #f8f8f8;
  }

  th,
  td {
    text-align: left;
    padding: 10px;
  }

  td {
    button {
      margin: 0 4px;
    }
  }
}

.form {
  &-item {
    margin-bottom: 20px;

    .label {
      margin-bottom: 4px;
    }
  }
}

.search-item {
  margin-right: 10px;

  input {
    width: 140px;
  }
}

.button-box {
  button {
    margin: 0 5px;
  }
}
</style>
