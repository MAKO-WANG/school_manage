<template>
  <div class="lang">
    <a-select v-model:value="lang" style="width: 120px" @change="handleChange">
      <a-select-option v-for="item in langOptions" :key="item.value"
        :value="item.value">{{ item.label }}</a-select-option>
    </a-select>
  </div>
</template>

<script setup lang="ts">
import i18n from '@/locale';
import { ref } from 'vue';

const langOptions = [
  {
    value: 'zh-CN',
    label: '简体'
  },
  {
    value: 'zh-TW',
    label: '繁体'
  },
  {
    value: 'en-US',
    label: '英文'
  }
]

const lang = ref('zh-CN')

const handleChange = (value: "zh-CN" | "zh-TW" | "en-US") => {
  i18n.global.locale = value
};
</script>
