<template>
  <div class="aside-list" :class="{ active: active }">
    <span class="truncate"><slot /></span>
    <!-- 编辑 -->
    <el-button
      class="ml-auto px-1"
      text
      type="primary"
      size="default"
      @click.stop="$emit('edit')"
    >
      <el-icon :size="20"><EditPen /></el-icon>
    </el-button>
    <span @click.stop="() => {}">
      <!-- 删除 -->
      <el-popconfirm
        title="是否要删除该分类？"
        confirmButtonText="确认"
        cancelButtonText="取消"
        @confirm="$emit('delete')"
      >
        <template #reference>
          <el-button text class="px-1" type="danger" size="default">
            <el-icon :size="12"><CloseBold /></el-icon>
          </el-button>
        </template>
      </el-popconfirm>
    </span>
  </div>
</template>

<script setup>
defineProps({
  active: {
    type: Boolean,
    default: false,
  },
})

defineEmits(['edit', 'delete'])
</script>

<style scoped>
.aside-list {
  border-bottom: 1px solid #eeeeee;
  @apply flex items-center p-3 text-sm text-gray-600;
  cursor: pointer;
}
.aside-list:hover,
.active {
  @apply bg-blue-50;
}
</style>
