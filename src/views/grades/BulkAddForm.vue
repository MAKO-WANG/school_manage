<template>
  <section class="form">
    <section class="form-item">
      <div class="label">输入年级名称（用英文","隔开）</div>
      <div class="form-item-box">
        <textarea style="width: 100%;" v-model="data" placeholder="请输入年级名称" rows="5" />
      </div>
    </section>
    <section class="form-item">
      <div class="label">结果</div>
      <div class="form-item-box">
        <table class="table">
          <thead>
            <tr>
              <th>序号</th>
              <th>年级</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="(item, index) in list" :key="index">
              <td>{{ index + 1 }}</td>
              <td>{{ item.name }}</td>
            </tr>
          </tbody>
        </table>
      </div>
    </section>
    <section class="form-item">
      <button @click="handleClick">确定</button>
    </section>
  </section>
</template>

<script setup lang="ts">
import { bulkAddGradeItem } from '@/services';
import { message } from 'ant-design-vue';
import { computed, ref } from 'vue';

const emit = defineEmits<{
  (event: 'hide', flag?: boolean): void
}>()

const data = ref('')
const list = computed<{ name: string }[]>(() => {
  return data.value.split(',').filter(i => {
    if (i.trim() !== '') {
      return true
    }
    return false
  }).map(i => ({ name: i.trim() }))
})

const add = async () => {
  try {
    const res = await bulkAddGradeItem(list.value)
    console.log(['=> getGradesItem', res])
    message.success('批量新增成功');
    emit('hide', true)
  } catch (error) {
    console.log(['error'])
    message.error('批量新增失败');
  }
}

const handleClick = () => {
  add()
}
</script>


<style lang="less" scoped>
</style>
