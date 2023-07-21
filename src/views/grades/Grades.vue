<template>
  <section class="grades">
    <Card>
      <section class="action-box">
        <section class="left">
          <button @click="show(0)" style="margin-right: 15px;">新增年级</button>
          <button @click="bulkVisible = true">批量新增年级</button>
        </section>
        <section class="right">
          <button @click="showBulkUpdateVisible">批量更新</button>
          <button @click="showBulkVisible">批量删除</button>
        </section>
      </section>
      <section class="table-wrapper">
        <table class="table">
          <thead>
            <tr>
              <th>
                <!-- <input type="checkbox" name="all" /> -->
                <label for="all">选择</label>
              </th>
              <th>序号</th>
              <th>年级</th>
              <th>创建时间</th>
              <th>最新修改时间</th>
              <th>操作</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="(item, index) in data" :key="item.id">
              <td>
                <input type="checkbox" :value="item.id" v-model="ids" />
              </td>
              <td>{{ index + 1 }}</td>
              <td>{{ item.name }}</td>
              <td>{{ timestampToTime(item.add_time) }}</td>
              <td>{{ timestampToTime(item.update_time) }}</td>
              <td>
                <button @click="show(item.id)">编辑</button>
                <button @click="updateDeleItem(item.id, item.name)">删除</button>
              </td>
            </tr>
          </tbody>
        </table>
        <Pagination v-bind="pages" @change="handleChange" />
      </section>
    </Card>

    <!-- 新增编辑 -->
    <drawer v-model:visible="visible" :title="title">
      <Form :id="id" @hide="hide" />
    </drawer>

    <!-- 批量新增年级 -->
    <drawer v-model:visible="bulkVisible" title="批量新增年级">
      <BulkAddForm @hide="hide" />
    </drawer>

    <!-- 批量修改年级 -->
    <drawer v-model:visible="bulkUpdateVisible" title="批量修改年级">
      <BulkUpdateForm @hide="hide" :data="idsList" />
    </drawer>

    <Modal v-model:visible="delVisible" :title="isBulk ? '批量删除' : '删除'">
      <template v-if="isBulk">
        <div>确定要删除 <strong>{{ idsList.map(i => i.name).join(', ') }}</strong> 吗？</div>
      </template>
      <template v-else>
        <div>确定要删除 <strong>{{ deleItemInfo.name }}</strong> 吗？</div>
      </template>
      <template #footer>
        <div class="button-box">
          <button @click="handleCancel">取消</button>
          <button @click="handleOk">确定</button>
        </div>
      </template>
    </Modal>
  </section>
</template>

<script setup lang="ts">
import { bulkDelGradeItem, delGradeItem, getGrades } from '@/services';
import { timestampToTime } from '@/utils';
import Card from '@c/Card.vue';
import Drawer from '@c/Drawer.vue';
import Modal from '@c/Modal.vue';
import Pagination from '@c/Pagination.vue';
import { message } from 'ant-design-vue';
import { computed, onMounted, reactive, ref, watch } from 'vue';
import BulkAddForm from './BulkAddForm.vue';
import BulkUpdateForm from './BulkUpdateForm.vue';
import Form from './Form.vue';

const data = ref([])
const visible = ref(false)
const bulkVisible = ref(false)
const bulkUpdateVisible = ref(false)
const delVisible = ref(false)
const id = ref(0)
const isBulk = ref(false)

const ids = ref([])
const idsList = ref([])
const deleItemInfo = reactive({
  id: 0,
  name: '',
})

const pages = reactive({
  current: 1,
  page_size: 15,
  total: 0,
})

const title = computed(() => {
  if (!id.value) {
    return '新增年级'
  }
  const item = data.value.find(i => i.id === id.value)
  const name = item ? item.name : ''
  return '编辑' + name
})

const getList = async () => {
  try {
    const res = await getGrades(pages)
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

const updateDeleItem = (id: number, name: string) => {
  isBulk.value = false
  delVisible.value = true
  deleItemInfo.id = id
  deleItemInfo.name = name
}

const deleItem = async () => {
  try {
    await delGradeItem(deleItemInfo.id)
    getList()
    message.success('删除成功');
  } catch (error) {
    console.log(['error'])
    message.error('删除失败');
  }
}

const handleBulkDelete = async () => {
  try {
    await bulkDelGradeItem(ids.value)
    ids.value = []
    getList()
    message.success('批量删除成功');
  } catch (error) {
    console.log(['error'])
    message.error('批量删除失败');
  }
}

const handleOk = async () => {
  isBulk.value ? await handleBulkDelete() : await deleItem()
  handleCancel()
}

const handleCancel = () => {
  delVisible.value = false
}


const show = (i: number) => {
  id.value = i
  visible.value = true
}

const showBulkVisible = () => {
  if (ids.value.length === 0) {
    message.error('请先选择要删除的年级');
    return
  }
  isBulk.value = true;
  delVisible.value = true
}

const showBulkUpdateVisible = () => {
  if (ids.value.length === 0) {
    message.error('请先选择要更新的年级');
    return
  }
  bulkUpdateVisible.value = true
}

const hide = (flag?: boolean) => {
  visible.value = false
  bulkVisible.value = false
  bulkUpdateVisible.value = false
  if (flag) {
    idsList.value = []
    getList()
  }
}

onMounted(() => {
  getList()
})

watch(() => ids.value, (ids) => {
  if (ids.length === 0) {
    idsList.value = []
    return
  }
  data.value
    .filter(item => ids.some((i) => i === item.id))
    .forEach(listItem => {
      const item = idsList.value.find(i => i.id === listItem.id)
      if (item) {
        item.name = listItem.name
      } else {
        idsList.value.push(listItem)
      }
    })
  idsList.value = idsList.value.filter(item => ids.some((i) => i === item.id))
}, {
  deep: true
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

.button-box {
  width: 100%;
  display: flex;
  justify-content: flex-end;
  align-items: center;
}
</style>
