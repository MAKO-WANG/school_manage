<template>
  <section class="drawer" v-if="visible">
    <section class="drawer-wrapper" :style="{ width: width ? width : '380px' }">
      <section class="header">
        <div class="close" @click="close">
          <CloseOutlined />
        </div>
        <div class="title">{{ title }}</div>
      </section>

      <section class="content" v-if="visible">
        <slot></slot>
      </section>

      <section class="footer">
        <slot name="footer"></slot>
      </section>
    </section>

    <section class="drawer-mask"></section>
  </section>
</template>

<script setup lang="ts">
import {
  CloseOutlined
} from '@ant-design/icons-vue';

defineProps<{
  visible: boolean;
  title?: string;
  width?: string;
}>()


const emit = defineEmits<{
  (event: 'update:visible', value: Boolean): void
}>()

const close = () => {
  emit('update:visible', false)
}
</script>


<style lang="less" scoped>
.drawer {
  width: 100%;
  height: 100%;
  position: fixed;
  left: 0;
  top: 0;
  z-index: 1000;

  &-mask {
    width: 100%;
    height: 100%;
    position: absolute;
    left: 0;
    top: 0;
    z-index: 0;
    background-color: #00000073;
  }

  &-wrapper {

    height: 100%;
    position: absolute;
    right: 0;
    top: 0;
    z-index: 10;
    background-color: #fff;
    display: flex;
    flex-direction: column;


    .header {
      border-bottom: 1px solid rgba(5, 5, 5, 0.1);
      padding: 16px 24px;
      display: flex;
      align-items: center;

      .close {
        cursor: pointer;
      }

      .title {
        color: #000000d9;
        font-weight: 500;
        font-size: 16px;
        line-height: 22px;
        margin: 0 16px;
      }
    }

    .content {
      flex: 1;
      padding: 24px;
    }

    // .footer {
    //   border-top: 1px solid rgba(5, 5, 5, 0.1);
    //   padding: 10px;
    // }
  }
}
</style>
