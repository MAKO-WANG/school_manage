<template>
  <section class="card">
    <slot></slot>
  </section>
</template>

<script setup lang="ts">

</script>

<style lang="less" scoped>
.card {
  padding: 20px;
  border-radius: 4px;
  border: 1px solid rgba(5, 5, 5, 0.1);
  background-color: #fff;
}
</style>
