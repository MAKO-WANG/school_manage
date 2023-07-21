<template>
  <section class="form">
    <section class="form-item">
      <div class="label">年级名称</div>
      <div class="form-item-box">
        <input type="text" v-model="name" placeholder="请输入年级名称">
      </div>
    </section>
    <section class="form-item">
      <button @click="handleClick">确定</button>
    </section>
  </section>
</template>

<script setup lang="ts">
import { addGradeItem, getGradeItem, updateGradeItem } from '@/services';
import { message } from 'ant-design-vue';
import { onMounted, ref } from 'vue';

const props = defineProps<{
  id: number;
}>()

const emit = defineEmits<{
  (event: 'hide', flag?: boolean): void
}>()

const id = ref(props.id || 0)
const name = ref('')

const getData = async (id: number) => {
  if (!id) {
    return
  }
  try {
    const res = await getGradeItem(id)
    name.value = res.name
    console.log(['=> getGradesItem', res])
  } catch (error) {
    console.log(['error'])
  }
}

onMounted(() => {
  getData(id.value)
})

const add = async () => {
  try {
    const res = await addGradeItem(name.value)
    console.log(['=> getGradesItem', res])
    message.success('新增成功');
    emit('hide', true)
  } catch (error) {
    console.log(['error'])
    message.error('新增失败');
  }
}

const update = async () => {
  try {
    const res = await updateGradeItem(id.value, name.value)
    console.log(['=> getGradesItem', res])
    message.success('修改成功');
    emit('hide', true)
  } catch (error) {
    console.log(['error'])
    message.error('修改失败');
  }
}

const handleClick = () => {
  id.value ? update() : add()
}
</script>

<style lang="less" scoped>
.form {
  &-item {
    margin-bottom: 20px;
  }
}
</style>
