<template>
  <section class="form">
    <section class="form-item">
      <div class="label">学生姓名</div>
      <div class="form-item-box">
        <input type="text" v-model="formValues.name" placeholder="请输入学生姓名">
      </div>
    </section>
    <section class="form-item">
      <div class="label">学生性别</div>
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
      <div class="label">监护人姓名</div>
      <div class="form-item-box">
        <input type="text" v-model="formValues.guardian" placeholder="请输入监护人姓名">
      </div>
    </section>
    <section class="form-item">
      <div class="label">监护人手机号</div>
      <div class="form-item-box">
        <input type="text" v-model="formValues.guardian_mobile" maxlength="11" placeholder="请输入监护人手机号">
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
      <div class="label">是否激活</div>
      <div class="form-item-box">
        <input type="radio" id="active" name="active" value="active" v-model="formValues.is_active"
          :checked="formValues.is_active">
        <label for="active" style="margin-right: 20px;">是</label>
        <input type="radio" id="noActive" name="noActive" value="noActive" v-model="formValues.is_active"
          :checked="!formValues.is_active">
        <label for="noActive">否</label>
      </div>
    </section>
    <section class="form-item">
      <button @click="handleClick">确定</button>
    </section>
  </section>
</template>

<script setup lang="ts">
import { addStudentItem, getGrades, getGroups, getStudentItem, updateStudentItem } from '@/services';
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
  date_of_birth: '',
  guardian: '',
  guardian_mobile: '',
  is_active: true,
  grade_id: 0,
  group_id: 0
})

const grades = ref([])
const groups = ref([])

const getTime = (time: string) => {
  return new Date(time).getTime() / 1000
}

const getData = async (id: number) => {
  if (!id) {
    return
  }
  try {
    const res = await getStudentItem(id)
    const {
      name,
      gender,
      mobile,
      email,
      date_of_birth,
      guardian,
      guardian_mobile,
      grade_id,
      group_id,
      is_active
    } = res
    Object.assign(formValues, {
      name,
      gender,
      mobile,
      email,
      date_of_birth: timestampToTime(date_of_birth, true),
      guardian,
      guardian_mobile,
      is_active,
      grade_id: grade_id || 0,
      group_id: group_id || 0
    })
  } catch (error) {
    console.log(['error'])
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

onMounted(() => {
  getData(id.value)
  getList()
})

const add = async () => {
  try {
    const res = await addStudentItem({ ...formValues, date_of_birth: getTime(formValues.date_of_birth) })
    console.log(['=> addStudentItem', res])
    message.success('新增成功');
    emit('hide', true)
  } catch (error) {
    console.log(['error'])
    message.error('新增失败');
  }
}

const update = async () => {
  try {
    const res = await updateStudentItem(id.value, { ...formValues, date_of_birth: getTime(formValues.date_of_birth) })
    console.log(['=> updateStudentItem', res])
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
