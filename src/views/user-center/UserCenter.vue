<template>
  <section class="user-center">
    <Card>
      <ul class="user-info">
        <li>
          姓名：{{ userInfo.username }}
        </li>
        <li>
          性别：{{ userInfo.gender === "male" ? '男' : '女' }}
        </li>
        <li>
          邮箱：{{ userInfo.email }} <button>修改邮箱</button>
        </li>
        <li>
          密码：<button>修改密码</button>
        </li>
      </ul>
    </Card>
  </section>
</template>

<script setup lang="ts">
import { useUserStore } from '@/stores';
import Card from '@c/Card.vue';

const userStore = useUserStore()

const userInfo = userStore.userInfo

</script>

<style lang="less" scoped>
.user-info {
  li {
    margin-bottom: 20px;
  }
}
</style>
