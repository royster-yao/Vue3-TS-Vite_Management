<template>
  <el-dialog :model-value="visible" title="编辑角色" :before-close="close">
    <el-form :model="form" :label-width="formLabelWidth">
      <el-form-item label="账号：">
        <el-input v-model="newForm.username" autocomplete="off" />
      </el-form-item>
      <el-form-item label="姓名：">
        <el-input v-model="newForm.nickName" autocomplete="off" />
      </el-form-item>
      <el-form-item label="邮箱：">
        <el-input v-model="newForm.email" autocomplete="off" />
      </el-form-item>
      <el-form-item label="密码：">
        <el-input
          v-model="newForm.password"
          type="password"
          autocomplete="off" />
      </el-form-item>
      <el-form-item label="备注：">
        <el-input
          v-model="newForm.note"
          type="textarea"
          placeholder="请输入内容"
          autocomplete="off" />
      </el-form-item>
      <el-form-item label="是否启用：">
        <el-radio v-model="newForm.status" :label="1">是</el-radio>
        <el-radio v-model="newForm.status" :label="0">否</el-radio>
      </el-form-item>
    </el-form>
    <template #footer>
      <span class="dialog-footer">
        <el-button @click="close">取消</el-button>
        <el-button type="primary" @click="modifyAdmin"> 确定 </el-button>
      </span>
    </template>
  </el-dialog>
</template>

<script setup lang="ts">
import { reactive, toRefs, watch } from "vue"
import { updateAdmin } from "../../../../api/api"

const props = defineProps<{
  visible?: boolean
  form?: AdminObjItf
}>()
const state = reactive<{
  formLabelWidth: string
  newForm: AdminObjItf
}>({
  formLabelWidth: "120px",
  newForm: {},
})
const { formLabelWidth, newForm } = toRefs(state)

// 拷贝form
watch(
  () => props.form,
  () => {
    newForm.value = { ...props.form }
  }
)

const emit = defineEmits<{
  (event: "close", r?: "reload"): void
  (event: "modifyAdmin", id: number): void
}>()

// 点击关闭
const close = (r?: "reload") => {
  // 传到父组件
  emit("close", r)
}
const modifyAdmin = () => {
  if (newForm.value.id) {
    updateAdmin(newForm.value.id, newForm.value).then((res) => {
      if (res.code === 200) {
        close("reload")
      }
    })
  }
}
</script>

<style scoped lang="less"></style>
