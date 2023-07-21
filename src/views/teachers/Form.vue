<template>
  <section class="form">
    <section class="form-item">
      <div class="label">教师姓名</div>
      <div class="form-item-box">
        <input type="text" v-model="formValues.name" placeholder="请输入教师姓名">
      </div>
    </section>
    <section class="form-item">
      <div class="label">教师性别</div>
      <div class="form-item-box">
        <input type="radio" id="male" name="male" value="male" v-model="formValues.gender"
          :checked="formValues.gender === 'male'">
        <label for="male" style="margin-right: 20px;">男</label>
        <input type="radio" id="female" name="female" value="female" v-model="formValues.gender"
          :checked="formValues.gender === 'female'">
        <label for="female">女</label>
      </div>
    </section>
    <section class="form-item">
      <div class="label">出生年月</div>
      <div class="form-item-box">
        <input type="date" v-model="formValues.date_of_birth" placeholder="">
      </div>
    </section>
    <section class="form-item">
      <div class="label">手机号</div>
      <div class="form-item-box">
        <input type="text" v-model="formValues.mobile" maxlength="11" placeholder="请输入手机号">
      </div>
    </section>
    <section class="form-item">
      <div class="label">邮箱</div>
      <div class="form-item-box">
        <input type="text" v-model="formValues.email" placeholder="请输入邮箱">
      </div>
    </section>
    <section class="form-item">
      <div class="label">年级</div>
      <div class="form-item-box">
        <select v-model="formValues.grade_id" style="width: 172px;">
          <option :value="0">请选择</option>
          <option :value="item.id" v-for="item in  grades">{{ item.name }}</option>
        </select>
      </div>
    </section>
    <section class="form-item">
      <div class="label">班级</div>
      <div class="form-item-box">
        <select v-model="formValues.group_id" style="width: 172px;">
          <option :value="0">请选择</option>
          <option :value="item.id" v-for="item in  groups">{{ item.name }}</option>
        </select>
      </div>
    </section>
    <section class="form-item">
      <div class="label">学科</div>
      <div class="form-item-box">
        <select v-model="formValues.subject_id" style="width: 172px;">
          <option :value="0">请选择</option>
          <option :value="item.id" v-for="item in  subjects">{{ item.name }}</option>
        </select>
      </div>
    </section>
    <section class="form-item">
      <div class="label">职位</div>
      <div class="form-item-box">
        <select v-model="formValues.job_id" style="width: 172px;">
          <option :value="0">请选择</option>
          <option :value="item.id" v-for="item in  jobs">{{ item.name }}</option>
        </select>
      </div>
    </section>
    <section class="form-item">
      <div class="label">状态</div>
      <div class="form-item-box">
        <select v-model="formValues.status_id" style="width: 172px;">
          <option :value="0">请选择</option>
          <option :value="item.id" v-for="item in  status">{{ item.name }}</option>
        </select>
      </div>
    </section>
    <section class="form-item">
      <button @click="handleClick">确定</button>
    </section>
  </section>
</template>

<script setup lang="ts">
import { addTeacherItem, getGrades, getGroups, getJobs, getStatus, getSubjects, getTeacherItem, updateTeacherItem } from '@/services';
import { timestampToTime } from '@/utils';
import { message } from 'ant-design-vue';
import { onMounted, reactive, ref } from 'vue';

const props = defineProps<{
  id: number;
}>()

const emit = defineEmits<{
  (event: 'hide', flag?: boolean): void
}>()

const id = ref(props.id || 0)
const formValues = reactive({
  name: '',
  gender: '',
  mobile: '',
  email: '',
  date_of_birth: '',
  job_id: 0,
  status_id: 0, // 1在职，2休假 3退休
  subject_id: 0,
  grade_id: 0,
  group_id: 0
})

const grades = ref([])
const groups = ref([])
const subjects = ref([])
const jobs = ref([])
const status = ref([])

const getTime = (time: string) => {
  return new Date(time).getTime() / 1000
}

const getData = async (id: number) => {
  if (!id) {
    return
  }
  try {
    const res = await getTeacherItem(id)
    const {
      name,
      gender,
      mobile,
      email,
      date_of_birth,
      job_id,
      status_id, // 1在职，2休假 3退休
      subject_id,
      grade_id,
      group_id
    } = res
    Object.assign(formValues, {
      name,
      gender,
      mobile,
      email,
      date_of_birth: timestampToTime(date_of_birth, true),
      job_id,
      status_id, // 1在职，2休假 3退休
      subject_id: subject_id || 0,
      grade_id: grade_id || 0,
      group_id: group_id || 0
    })
  } catch (error) {
    console.log(['error'])
  }
}

const getList = async () => {
  try {
    const [gradeRes, groupRes, subjectRes, jobRes, statusRes] =
      await Promise.all([getGrades({ current: 0 }), getGroups({ current: 0 }), getSubjects({ current: 0 }), getJobs(), getStatus()])
    grades.value = gradeRes.list;
    groups.value = groupRes.list;
    subjects.value = subjectRes.list;
    jobs.value = jobRes.list;
    status.value = statusRes.list;
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
    const res = await addTeacherItem({ ...formValues, date_of_birth: getTime(formValues.date_of_birth) })
    console.log(['=> addTeacherItem', res])
    message.success('新增成功');
    emit('hide', true)
  } catch (error) {
    console.log(['error'])
    message.error('新增失败');
  }
}

const update = async () => {
  try {
    const res = await updateTeacherItem(id.value, { ...formValues, date_of_birth: getTime(formValues.date_of_birth) })
    console.log(['=> updateTeacherItem', res])
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
