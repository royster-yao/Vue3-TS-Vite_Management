<template>
  <el-table :data="tableData" border style="width: 100%">
    <el-table-column prop="id" label="编号" />
    <el-table-column prop="username" label="账号" />
    <el-table-column prop="nickName" label="姓名" />
    <el-table-column prop="email" label="邮箱" />
    <el-table-column label="添加时间">
      <template #default="scope">
        {{ formatDate(scope.row.createTime) }}
      </template>
    </el-table-column>
    <el-table-column label="最后登录时间">
      <template #default="scope">
        {{ formatDate(scope.row.loginTime) }}
      </template>
    </el-table-column>
    <el-table-column label="是否启用">
      <template #default="scope">
        <el-switch
          v-model="scope.row.status"
          :active-value="1"
          :inactive-value="0" />
      </template>
    </el-table-column>
    <el-table-column label="操作">
      <template #default="{ row }">
        <el-button link type="primary" @click="allowRole(row.id)"
          >分配角色</el-button
        >
        <el-button link type="primary" @click="editAdmin(row)">编辑</el-button>
      </template>
    </el-table-column>
  </el-table>
  <EditAdmin :visible="visible" @close="closeDialog" :form="rowData" />
  <EditRole :visible="rolevVsible" :form="roleData" @close="closeRoleDialog" />
</template>

<script setup lang="ts">
import { reactive, toRefs } from "vue"
import { getAdminList, getRoleListAll, getAdminRoleById } from "../../api/api"
import formatDate from "../../utils/useFormatTime"
import EditAdmin from "./components/EditAdmin"
import EditRole from "./components/EditRole"

const state = reactive<{
  tableData: {}[]
  visible: boolean
  rowData: AdminObjItf
  rolevVsible: boolean
  roleData: AdminRoleFormDate
}>({
  tableData: [],
  visible: false,
  rowData: {},
  rolevVsible: false,
  roleData: {
    userRoles: [],
    roleLists: [],
    adminId: 0,
  },
})

const { tableData, visible, rowData, rolevVsible, roleData } = toRefs(state)

const fetchData = () => {
  getAdminList({
    keyword: "",
    pageSize: 10,
    pageNum: 1,
  }).then((res) => {
    if (res.code === 200) {
      tableData.value = res.data.list
    }
  })
}
fetchData()

// 获取所有角色
getRoleListAll().then((res) => {
  if (res.code === 200) {
    roleData.value.roleLists = res.data
  }
})

// 点击分配角色按钮
const allowRole = (id: number) => {
  getAdminRoleById(id).then((res) => {
    if (res.code === 200) {
      rolevVsible.value = true
      roleData.value.adminId = id
      roleData.value.userRoles = res.data
    }
  })
}
// 隐藏分配角色弹框
const closeRoleDialog = () => {
  rolevVsible.value = false
}

/**
 *  点击编辑按钮
 */
const editAdmin = (row: AdminObjItf) => {
  visible.value = true
  rowData.value = row
}
// 隐藏弹框
const closeDialog = (r?: "reload") => {
  visible.value = false
  rowData.value = {} // 清空用户编辑弹窗的内容
  if (r === "reload") {
    // 更新表格数据
    fetchData()
  }
}
</script>

<style scoped lang="less"></style>
