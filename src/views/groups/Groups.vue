<template>
  <section class="groups">
    <Card>
      <section class="action-box">
        <section class="left">
          <button @click="show(0)">新增班级</button>
        </section>
        <section class="right">
        </section>
      </section>
      <section class="table-wrapper">
        <table class="table">
          <thead>
            <tr>
              <th>序号</th>
              <th>年级</th>
              <th>班级</th>
              <th>创建时间</th>
              <th>最新修改时间</th>
              <th>操作</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="(item, index) in data" :key="item.id">
              <td>{{ index + 1 }}</td>
              <td>{{ item.grade_name }}</td>
              <td>{{ item.name }}</td>
              <td>{{ timestampToTime(item.add_time) }}</td>
              <td>{{ timestampToTime(item.update_time) }}</td>
              <td>
                <button @click="show(item.id)">编辑</button>
                <button @click="deleItem(item.id)">删除</button>
              </td>
            </tr>
          </tbody>
        </table>
        <Pagination v-bind="pages" @change="handleChange" />
      </section>
    </Card>

    <drawer v-model:visible="visible" :title="title">
      <Form :id="id" @hide="hide" />
    </drawer>
  </section>
</template>

<script setup lang="ts">
import { delGroupItem, getGroups } from '@/services';
import { timestampToTime } from '@/utils';
import Card from '@c/Card.vue';
import Drawer from '@c/Drawer.vue';
import Pagination from '@c/Pagination.vue';
import { message } from 'ant-design-vue';
import { computed, onMounted, reactive, ref } from 'vue';
import Form from './Form.vue';

const data = ref([])
const visible = ref(false)
const id = ref(0)

const pages = reactive({
  current: 1,
  page_size: 15,
  total: 0,
})

const title = computed(() => {
  if (!id.value) {
    return '新增班级'
  }
  const item = data.value.find(i => i.id === id.value)
  const name = item ? item.name : ''
  return '编辑' + name
})

const getList = async () => {
  try {
    const res = await getGroups(pages)
    data.value = res.list
    const { current, page_size, total } = res.pages
    pages.current = current;
    pages.page_size = page_size;
    pages.total = total;
  } catch (error) {
    console.log(['error'])
  }
}

const deleItem = async (id: number) => {
  try {
    await delGroupItem(id)
    message.success('删除成功');
    getList()
  } catch (error) {
    console.log(['error'])
    message.error('删除失败');
  }
}

const show = (i: number) => {
  id.value = i
  visible.value = true
}

const hide = (flag?: boolean) => {
  visible.value = false
  if (flag) {
    getList()
  }
}

const handleChange = (current: number) => {
  pages.current = current
  getList()
}

onMounted(() => {
  getList()
})
</script>

<style lang="less" scoped>
.action-box {
  margin-bottom: 20px;
  display: flex;
  justify-content: space-between;
  align-items: center;

  .right {
    display: flex;
    align-items: center;

    button {
      margin-left: 10px;
    }
  }
}
</style>
