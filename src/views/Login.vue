<template>
  <section class="login">
    <section class="login-box">
      <section class="login-card">
        <section class="login-form">
          <h1>登录</h1>
          <ul class="login-form-list">
            <li>
              <input type="text" v-model="username" placeholder="请输入用户名" />
            </li>
            <li>
              <input type="password" v-model="password" placeholder="请输入密码" />
            </li>
            <li>
              <button @click="handleClick">登录</button>
            </li>
          </ul>
        </section>
      </section>
    </section>
  </section>
</template>

<script setup lang="ts">
import { login } from '@/services';
import { useUserStore } from '@/stores';
import { message } from 'ant-design-vue';
import { ref } from 'vue';
import { useRouter } from 'vue-router';

const username = ref('root')
const password = ref('123456');

const router = useRouter()
const userStore = useUserStore()

const handleClick = async () => {
  try {
    const res = await login(username.value, password.value)
    const {
      id,
      email,
      gender,
      mobile,
      access,
      username: uName,
    } = res
    userStore.updateUserInfo({
      id,
      email,
      gender,
      mobile,
      username: uName,
    })
    userStore.access = access
    localStorage.setItem('token', access)
    userStore.isLogin = true
    message.success('登录成功', 1, () => {
      router.push('/')
    });
  } catch (error) {
    console.log(['=>error2', error])
    message.error('登录失败');
  }
}
</script>

<style lang="less" scoped>
.login {

  &-box {
    padding-top: 20%;
    display: flex;
    justify-content: center;
  }

  &-card {
    padding: 20px 40px;
    background-color: #fff;
    border-radius: 8px;
  }

  &-form {
    width: 240px;

    h1 {
      font-size: 20px;
      font-weight: bold;
      text-align: center;
      margin-bottom: 20px;
    }

    .login-form-list {
      li {
        margin-bottom: 30px;

        input,
        button {
          display: block;
          width: 100%;
        }
      }
    }
  }
}
</style>
