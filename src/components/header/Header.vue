<template>
  <header>
    <section class="header-top">
      <section class="header-top-left">
        <div class="logo">
          <h1>学校管理系统</h1>
        </div>
      </section>
      <section class="header-top-right">
        你好，
        <template v-if="isLogin">
          <router-link to="/user-center">{{ username }}</router-link>
          <span>
            /
            <span class="logout" @click="handleClick">退出</span>
          </span>
        </template>
        <template v-else>
          <span>
            请<strong><router-link to="/login">登录</router-link></strong>
          </span>
        </template>
      </section>
    </section>
  </header>
</template>

<script setup lang="ts">
import { useUserStore } from '@/stores';
import { message } from 'ant-design-vue';
import { computed } from 'vue';
import { useRouter } from 'vue-router';

const userStore = useUserStore()
const router = useRouter()
const isLogin = computed(() => userStore.isLogin)
const username = computed(() => userStore.userInfo.username)

const handleClick = () => {
  router.push('/login')
  userStore.logout()
  message.success('退出成功');
}
</script>

<style lang="less" scoped>
header {
  background: #fff;
  width: 100%;
  border-bottom: 1px solid rgba(5, 5, 5, 0.1);
}

.header-top {
  height: 63px;
  padding: 0 30px;
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.logout {
  cursor: pointer;
}
</style>
