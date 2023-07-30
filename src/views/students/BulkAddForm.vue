<template>
  <section class="form">
    <section class="form-item">
      <div class="label">性别： male: 男； female: 女</div>
    </section>
    <section class="form-item">
      <div class="label">年级：
        <span v-for="item in grades">
          {{ item.id }}: {{ item.name }};
        </span>
      </div>
    </section>
    <section class="form-item">
      <div class="label">班级：
        <span v-for="item in groups">
          {{ item.id }}: {{ item.name }};
        </span>
      </div>
    </section>
    <section class="form-item">
      <div class="label">生日格式: 2012/02/18</div>
    </section>
    <section class="form-item">
      <div class="label">是否激活： true: 是； false: 否</div>
    </section>
    <section class="form-item">
      <div class="label">例子: 王煜,male,1,1,王烨,13049492154,2012/02/18,true</div>
    </section>
    <section class="form-item">
      <div class="label">输入学生（每个字段用英文","隔开，每个学生回车换行）</div>
      <div class="form-item-box">
        <textarea style="width: 100%;" v-model="data" placeholder="请输入学生信息" rows="5" />
      </div>
    </section>
    <section class="form-item">
      <div class="label">提交数据</div>
      <div class="form-item-box">
        [
        <div v-for="item in list">
          {{ item }}
        </div>
        ]
      </div>
    </section>
    <section class="form-item">
      <div class="label">结果</div>
      <div class="form-item-box">
        <table class="table">
          <thead>
            <tr>
              <th>序号</th>
              <th>学生姓名</th>
              <th>性别</th>
              <th>年级</th>
              <th>班级</th>
              <th>监护人</th>
              <th>监护人手机</th>
              <th>出生年月</th>
              <th>是否激活</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="(item, index) in list" :key="index">
              <td>{{ index + 1 }}</td>
              <td>{{ item.name }}</td>
              <td>{{ item.gender === "male" ? '男' : '女' }}</td>
              <td>{{ grades.find(i => i.id === item.grade_id)?.name }}</td>
              <td>{{ groups.find(i => i.id === item.group_id)?.name }}</td>
              <td>{{ item.guardian }}</td>
              <td>{{ item.guardian_mobile }}</td>
              <td>{{ item.date_of_birth }}</td>
              <td>{{ item.is_active ? '是' : '否' }}</td>
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
import { bulkAddStudentItem, getGrades, getGroups } from '@/services';
import { message } from 'ant-design-vue';
import { computed, onMounted, ref } from 'vue';

const emit = defineEmits<{
  (event: 'hide', flag?: boolean): void
}>()

const data = ref('王煜,male,1,1,王烨,13049492154,2012/02/18,true')

const grades = ref([])
const groups = ref([])

const list = computed(() => {
  return data.value.split('\n').filter(i => {
    if (i.trim() !== '') {
      return true
    }
    return false
  }).map(i => {
    const item: any = {}
    i.split(',').filter(i => {
      if (i.trim() !== '') {
        return true
      }
      return false
    }).forEach((v, e) => {
      switch (e) {
        case 1:
          item['gender'] = v
          break;
        case 2:
          item['grade_id'] = Number(v)
          break;
        case 3:
          item['group_id'] = Number(v)
          break;
        case 4:
          item['guardian'] = v
          break;
        case 5:
          item['guardian_mobile'] = v
          break;
        case 6:
          item['date_of_birth'] = new Date(v).getTime() / 1000
          break;
        case 7:
          item['is_active'] = Boolean(v)
          break;
        default:
          item['name'] = v
          break;
      }
    })
    return item
  })
})

const add = async () => {
  try {
    const res = await bulkAddStudentItem(list.value)
    console.log(['=> bulkAddStudentItem', res])
    message.success('批量新增成功');
    emit('hide', true)
  } catch (error) {
    console.log(['error'])
    message.error('批量新增失败');
  }
}

const getList = async () => {
  try {
    const [gradeRes, groupRes] =
      await Promise.all([getGrades({ current: 0 }), getGroups({ current: 0 })])
    grades.value = gradeRes.list;
    groups.value = groupRes.list;

  } catch (error) {
    console.log(['error'])
  }
}

const handleClick = () => {
  add()
}

onMounted(() => {
  getList()
})
</script>


<style lang="less" scoped>
</style>
