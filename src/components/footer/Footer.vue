<template>
  <footer>
    <section class="footer-nav">这里是底部 {{ $t('hello') }}</section>
    <section class="footer-bottom">
      <p>粤ICP备2021076750号</p>
      <p>Copyright &copy; 2021 BanWay. All rights reserved</p>
    </section>
  </footer>
</template>

<script setup lang="ts"></script>

<style scoped lang="less">
footer {
  color: #595959;
  background: #eee;

  .footer-nav {
    padding: 60px;
  }

  .footer-bottom {
    text-align: center;
    padding: 20px 0;
    margin: 0 60px;
    border-top: 1px solid #D9D9D9;
  }
}
</style>
