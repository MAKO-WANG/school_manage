<template>
  <section class="form">
    <section class="form-item">
      <div class="label">年级</div>
      <div class="form-item-box">
        <select v-model="grade_id" style="width: 175px;">
          <option :value="0">请选择</option>
          <option :value="item.id" :key="item.id" v-for="item in gradeList">{{ item.name }}</option>
        </select>
      </div>
    </section>
    <section class="form-item">
      <div class="label">班级名称</div>
      <div class="form-item-box">
        <input type="text" v-model="name" placeholder="请输入班级名称">
      </div>
    </section>
    <section class="form-item">
      <button @click="handleClick">确定</button>
    </section>
  </section>
</template>

<script setup lang="ts">
import { addGroupItem, getGrades, getGroupItem, updateGroupItem } from '@/services';
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
const grade_id = ref(0)
const gradeList = ref([])

const getList = async () => {
  try {
    const res = await getGrades({
      current: 0
    })
    gradeList.value = res.list
  } catch (error) {
    console.log(['error'])
  }
}

const getData = async (id: number) => {
  if (!id) {
    return
  }
  try {
    const res = await getGroupItem(id)
    name.value = res.name
    grade_id.value = res.grade_id || 0
    console.log(['=> getGradesItem', res])
  } catch (error) {
    console.log(['error'])
  }
}

onMounted(() => {
  getData(id.value)
  getList()
})

const add = async () => {
  try {
    const res = await addGroupItem(name.value, grade_id.value)
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
    const res = await updateGroupItem(id.value, name.value, grade_id.value)
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
