<template>
  <section>
    <Card>
      <section class="table-wrapper">
        <table class="table">
          <thead>
            <tr>
              <th>序号</th>
              <th>用户名</th>
              <th>姓名</th>
              <th>性别</th>
              <th>邮箱</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="(item, index) in data" :key="item.id">
              <td>{{ index + 1 }}</td>
              <td>{{ item.username }}</td>
              <td>{{ item.name }}</td>
              <td>{{ item.name }}</td>
              <td>{{ item.email }}</td>
            </tr>
          </tbody>
        </table>

        <Pagination v-bind="pages" @change="handleChange" />
      </section>
    </Card>
  </section>
</template>

<script setup lang="ts">
import { getUsers } from '@/services';
import Card from '@c/Card.vue';
import Pagination from '@c/Pagination.vue';
import { onMounted, reactive, ref } from 'vue';

const data = ref([])

const pages = reactive({
  current: 1,
  page_size: 15,
  total: 0,
})


const getList = async () => {
  try {
    const res = await getUsers(pages)
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

onMounted(() => {
  getList()
})
</script>
