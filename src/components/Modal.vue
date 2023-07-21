<template>
  <section class="mask" v-if="visible"></section>
  <section class="modal" v-if="visible">
    <section class="header">
      <h3>{{ title }}</h3>
      <close-outlined class="close" @click="close" />
    </section>
    <section class="content">

      <slot></slot>
    </section>
    <section class="footer">
      <slot name="footer"></slot>
    </section>
  </section>
</template>

<script setup lang="ts">
import {
  CloseOutlined
} from '@ant-design/icons-vue';

defineProps<{
  visible: boolean;
  title: string;
}>()

const emit = defineEmits<{
  (event: 'update:visible', value: Boolean): void
}>()

const close = () => {
  emit('update:visible', false)
}
</script>


<style lang="less" scoped>
.mask {
  position: fixed;
  left: 0;
  top: 0;
  width: 100%;
  height: 100%;
  z-index: 999;
  background-color: rgba(0, 0, 0, 0.2);
}

.modal {
  position: fixed;
  left: 50%;
  top: 30%;
  z-index: 1000;
  background-color: #fff;
  transform: translate(-50%, -50%);
  width: 500px;
  padding: 20px;
  border-radius: 5px;

  .header {
    display: flex;
    justify-content: space-between;
    align-items: center;

    h3 {
      font-weight: bold;
    }

    .close {
      cursor: pointer;
    }
  }

  .content {
    padding: 20px 0;
  }
}
</style>
