<template>
  <section class="main-view">
    <aside v-if="route.name !== 'login'">
      <Menu></Menu>
    </aside>
    <section class="router-view">
      <RouterView />
    </section>
  </section>
</template>

<script setup lang="ts">
import { useRoute } from 'vue-router';
import Menu from './Menu.vue';

const route = useRoute()
</script>

<style scoped lang="less">
.main-view {
  display: flex;
}

.router-view {
  flex: 1;
  padding: 20px;
}

aside {
  width: 240px;
  border-right: 1px solid rgba(5, 5, 5, 0.1);
  height: calc(100vh - 64px);
  background-color: #fff;
}
</style>
