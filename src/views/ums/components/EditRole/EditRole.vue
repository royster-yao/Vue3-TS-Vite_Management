<template>
  <el-dialog :model-value="visible" title="分配角色" :before-close="close">
    <el-form :model="form">
      <el-form-item>
        <el-select multiple v-model="roles" placeholder="Please select a zone">
          <el-option
            v-for="role in form.roleLists"
            :key="role.id"
            :label="role.name"
            :value="role.id" />
        </el-select>
      </el-form-item>
    </el-form>
    <template #footer>
      <span class="dialog-footer">
        <el-button @click="close">取消</el-button>
        <el-button type="primary" @click="updateRole"> 确定 </el-button>
      </span>
    </template>
  </el-dialog>
</template>

<script setup lang="ts">
import { ref, watch } from "vue"
import { updateAdminRole } from "../../../../api/api"

const roles = ref<number[]>([])

const props = defineProps<{
  visible: boolean
  form: AdminRoleFormDate
}>()

const emit = defineEmits<{
  (event: "close"): void
}>()
watch(
  () => props.form.userRoles,
  () => {
    roles.value = props.form.userRoles.map((item) => item.id)
  }
)

const close = () => {
  emit("close")
}
const updateRole = () => {
  updateAdminRole({
    adminId: props.form.adminId,
    roleIds: roles.value.join(","),
  }).then((res) => {
    if (res.code === 200) {
      close()
    }
  })
}
</script>

<style scoped lang="less"></style>
