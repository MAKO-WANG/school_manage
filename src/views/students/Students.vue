<template>
  <section class="students">
    <Card>
      <section class="action-box">
        <section class="left">
          <button>新增学生</button>
        </section>
      </section>
      <section class="table-wrapper">
        <table class="table">
          <thead>
            <tr>
              <th>序号</th>
              <th>学生编号</th>
              <th>学生姓名</th>
              <th>性别</th>
              <th>年级</th>
              <th>班级</th>
              <th>出生年月</th>
              <th>操作</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="(item, index) in data" :key="item.id">
              <td>{{ index + 1 }}</td>
              <td>{{ item.label }}</td>
              <td>{{ item.name }}</td>
              <td>{{ item.gender === "male" ? '男' : '女' }}</td>
              <td>{{ item.grade_name }}</td>
              <td>{{ item.group_name }}</td>
              <td>{{ timestampToTime(item.date_of_birth, true) }}</td>
              <td>
                <button @click="show(item.id)">编辑</button>
              </td>
            </tr>
          </tbody>
        </table>
        <Pagination v-bind="pages" @change="handleChange" />
      </section>
    </Card>
  </section>
</template>

<script setup lang="ts">
import { getStudents } from '@/services';
import { timestampToTime } from '@/utils';
import Card from '@c/Card.vue';
import Pagination from '@c/Pagination.vue';
import { onMounted, reactive, ref } from 'vue';

const data = ref([])
const visible = ref(false)
const id = ref(0)
const pages = reactive({
  current: 1,
  page_size: 15,
  total: 0,
})

const getList = async () => {
  try {
    const res = await getStudents({ ...pages })
    data.value = res.list
    const { current, page_size, total } = res.pages
    pages.current = current;
    pages.page_size = page_size;
    pages.total = total;
  } catch (error) {
    console.log(['error'])
  }
}

const handleChange = (current: number) => {
  pages.current = current
  getList()
}

const show = (i: number) => {
  id.value = i
  visible.value = true
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
