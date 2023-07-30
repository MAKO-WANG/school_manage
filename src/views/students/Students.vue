<template>
  <section class="students">
    <Card>
      <section class="action-box">
        <section class="left">
          <button @click="show(0)" style="margin-right: 15px;">新增学生</button>
          <button @click="bulkVisible = true">批量新增学生</button>
        </section>

      </section>
      <section class="table-wrapper">
        <table class="table">
          <thead>
            <tr>
              <th>选择</th>
              <th>序号</th>
              <th>学生编号</th>
              <th>学生姓名</th>
              <th>性别</th>
              <th>年级</th>
              <th>班级</th>
              <th>监护人</th>
              <th>监护人手机</th>
              <th>出生年月</th>
              <th>操作</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="(item, index) in data" :key="item.id">
              <td>
                <input type="checkbox" :value="item.id" v-model="ids" />
              </td>
              <td>{{ index + 1 }}</td>
              <td>{{ item.label }}</td>
              <td>{{ item.name }}</td>
              <td>{{ item.gender === "male" ? '男' : '女' }}</td>
              <td>{{ item.grade_name }}</td>
              <td>{{ item.group_name }}</td>
              <td>{{ item.guardian }}</td>
              <td>{{ item.guardian_mobile }}</td>
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

    <drawer v-model:visible="visible" :title="title">
      <Form :id="id" @hide="hide" />
    </drawer>

    <!-- 批量修改年级 -->
    <drawer v-model:visible="bulkVisible" title="批量新增学生" width="45%">
      <BulkAddForm @hide="hide" />
    </drawer>
  </section>
</template>

<script setup lang="ts">
import { getStudents } from '@/services';
import { timestampToTime } from '@/utils';
import Card from '@c/Card.vue';
import Drawer from '@c/Drawer.vue';
import Pagination from '@c/Pagination.vue';
import { computed, onMounted, reactive, ref } from 'vue';
import BulkAddForm from './BulkAddForm.vue';
import Form from './Form.vue';

const data = ref([])
const visible = ref(false)
const id = ref(0)
const ids = ref([])
const bulkVisible = ref(false)
const pages = reactive({
  current: 1,
  page_size: 15,
  total: 0,
})

const title = computed(() => {
  if (!id.value) {
    return '新增学生'
  }
  const item = data.value.find(i => i.id === id.value)
  const name = item ? item.name : ''
  return '编辑' + name
})

const hide = (flag?: boolean) => {
  visible.value = false
  bulkVisible.value = false
  if (flag) {
    getList()
  }
}


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
