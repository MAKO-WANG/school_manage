<template>
  <section class="form">
    <section class="form-item">
      {{ list }}
      <div class="form-item-box">
        <table class="table">
          <thead>
            <tr>
              <th>年级ID</th>
              <th>年级</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="(item, index) in list" :key="index">
              <td>{{ item.id }}</td>
              <td>
                <input type="text" v-model="item.name" placeholder="请输入年级名称">
              </td>
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
import { bulkUpdateGradeItem } from '@/services';
import { message } from 'ant-design-vue';
import { ref } from 'vue';

const props = defineProps<{
  data: { id: number; name: string }[];
}>()

const emit = defineEmits<{
  (event: 'hide', flag?: boolean): void
}>()

const list = ref(props.data.slice(0).map(i => ({ id: i.id, name: i.name })))

const handleClick = async () => {
  try {
    const res = await bulkUpdateGradeItem(list.value)
    console.log(['=> getGradesItem', res])
    message.success('批量更新成功');
    emit('hide', true)
  } catch (error) {
    console.log(['error'])
    message.error('批量更新失败');
  }
}
</script>


<style lang="less" scoped>
</style>
