<template>
  <section class="pagination">
    <section class="pagination-wrapper">
      <section class="pagination-content">
        <div class="pages prev">
          <button @click="handlePrev">&lt;</button>
        </div>
        <div class="pages content">
          <button v-for="item in page_number" :class="item === pages.current ? 'active' : ''"
            @click="handleClick(item)">{{ item }}</button>
        </div>
        <div class="pages next">
          <button @click="handleNext">&gt;</button>
        </div>
      </section>
      <section class="pagination-size">每页{{ pages.page_size }}条/</section>
      <section class="pagination-total">共{{ pages.total }}条</section>
    </section>
  </section>
</template>

<script setup lang="ts">
import { computed, reactive, watch } from 'vue';

const props = defineProps<{
  current: number;
  page_size?: number;
  total: number;
}>()

const emit = defineEmits<{
  (event: 'change', current: number): void
}>()

const pages = reactive({
  current: props.current || 1,
  page_size: props?.page_size || 10,
  total: props.total || 0,
})

watch(() => props, (nextPages) => {
  pages.current = nextPages.current
  pages.page_size = nextPages?.page_size ?? pages.page_size
  pages.total = nextPages.total
}, {
  immediate: true,
  deep: true
})

const page_number = computed(() => {
  return Math.ceil(pages.total / pages.page_size)
})

const handlePrev = () => {
  if (pages.current > 1) {
    handleClick(pages.current - 1)
  }
}

const handleNext = () => {
  if (pages.current < page_number.value) {
    handleClick(pages.current + 1)
  }
}

const handleClick = (current: number) => {
  if (pages.current !== current) {
    pages.current = current
    emit('change', current)
  }
}
</script>

<style lang="less" scoped>
.pagination {
  display: flex;
  justify-content: flex-end;
  padding: 20px;

  &-wrapper {
    display: flex;
    align-items: center;
  }

  &-content {
    display: flex;
    align-items: center;
    margin-right: 5px;

    .pages {
      cursor: pointer;
      margin: 0 2px;

      button {
        border: 1px solid #bdbdbd;

        &:hover {
          border: 1px solid #333;
        }
      }

      &.content {
        button {
          margin: 0 2px;

          &.active {
            border: 1px solid #333;
          }
        }
      }
    }
  }
}
</style>
