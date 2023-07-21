<template>
  <section class="teacher">
    <Card>
      <section class="action-box">
        <section class="left">
          <button @click="show(0)">新增老师</button>
        </section>
        <section class="right">
          <div class="search-item">
            <label class="search-label">教师姓名:</label>
            <input type="text" v-model="query.name" placeholder="请输入教师姓名">
          </div>
          <div class="search-item">
            <label class="search-label">年级:</label>
            <select style="width: 104px;" v-model="query.grade_id">
              <option value="">请选择</option>
              <option :value="item.id" :key="item.id" v-for="item in gradeList">{{ item.name }}</option>
            </select>
          </div>
          <div class="search-item">
            <label class="search-label">手机号码:</label>
            <input type="text" v-model="query.mobile" placeholder="请输入手机号码">
          </div>
          <div class="search-item">
            <label class="search-label">邮箱:</label>
            <input type="text" v-model="query.email" placeholder="请输入邮箱">
          </div>
          <button @click="getList">确定</button>
        </section>
      </section>
      <section class="table-wrapper">
        <table class="table">
          <thead>
            <tr>
              <th>序号</th>
              <th>教师编号</th>
              <th>教师姓名</th>
              <th>性别</th>
              <th>手机号</th>
              <th>邮箱</th>
              <th>学科</th>
              <th>年级</th>
              <th>班级</th>
              <th>职位</th>
              <th>出生年月</th>
              <th>状态</th>
              <!-- <th>创建时间</th> -->
              <!-- <th>最新修改时间</th> -->
              <th>操作</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="(item, index) in data" :key="item.id">
              <td>{{ index + 1 }}</td>
              <td>{{ item.label }}</td>
              <td>{{ item.name }}</td>
              <td>{{ item.gender === "male" ? '男' : '女' }}</td>
              <td>{{ item.mobile }}</td>
              <td>{{ item.email }}</td>
              <td>{{ item.subject_name }}</td>
              <td>{{ item.grade_name }}</td>
              <td>{{ item.group_name }}</td>
              <td>{{ item.job_name }}</td>
              <td>{{ timestampToTime(item.date_of_birth, true) }}</td>
              <td>{{ item.status_name }}</td>
              <!-- <td>{{ timestampToTime(item.add_time) }}</td> -->
              <!-- <td>{{ timestampToTime(item.update_time) }}</td> -->
              <td>
                <button @click="show(item.id)">编辑</button>
                <!-- <button @click="deleItem(item.id)">删除</button> -->
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
import { getGrades, getTeachers } from '@/services';
import { timestampToTime } from '@/utils';
import Card from '@c/Card.vue';
import Drawer from '@c/Drawer.vue';
import Pagination from '@c/Pagination.vue';
import { computed, onMounted, reactive, ref } from 'vue';
import Form from './Form.vue';

const data = ref([])
const visible = ref(false)
const id = ref(0)
const query = reactive({
  name: '',
  mobile: '',
  email: '',
  grade_id: ''
})

const pages = reactive({
  current: 1,
  page_size: 15,
  total: 0,
})

const gradeList = ref([])

const title = computed(() => {
  if (!id.value) {
    return '新增老师'
  }
  const item = data.value.find(i => i.id === id.value)
  const name = item ? item.name : ''
  return '编辑' + name
})

const getGradeList = async () => {
  try {
    const res = await getGrades({
      current: 0
    })
    gradeList.value = res.list
  } catch (error) {
    console.log(['error'])
  }
}

const getList = async () => {
  try {
    const res = await getTeachers({ ...query, ...pages })
    data.value = res.list
    const { current, page_size, total } = res.pages
    pages.current = current;
    pages.page_size = page_size;
    pages.total = total;
  } catch (error) {
    console.log(['error'])
  }
}

// const deleItem = async (id: number) => {
//   try {
//     await delTeacherItem(id)
//     message.success('删除成功');
//   } catch (error) {
//     console.log(['error'])
//     message.error('删除失败');
//   }
// }

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
  getGradeList()
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
