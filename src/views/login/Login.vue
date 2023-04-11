<template>
  <el-form
    ref="ruleFormRef"
    :model="ruleForm"
    :rules="rules"
    class="demo-ruleForm">
    <el-form-item prop="username">
      <el-input v-model="ruleForm.username" type="text" autocomplete="off" />
    </el-form-item>
    <el-form-item prop="pwd">
      <el-input v-model="ruleForm.pwd" type="password" autocomplete="off" />
    </el-form-item>
    <el-form-item>
      <el-button type="primary" @click="loginFn()">登录</el-button>
    </el-form-item>
  </el-form>
</template>

<script lang="ts" setup>
import { reactive, ref, toRefs } from "vue"
import { adminLoginApi, getAdminInfoApi } from "../../api/api"
import Cookie from "js-cookie"
import { useRouter } from "vue-router"
import { useStore } from "vuex"

const state = reactive({
  ruleForm: {
    username: "admin",
    pwd: "123456",
  },
})

// 获取项目路由对象
let router = useRouter()

// 获取当项目的vuxduix
let store = useStore()

// 表单校验规则

// 密码的自定义检验规则
const validatePwd = (
  rule: unknown,
  value: string | undefined,
  cb: (msg?: string) => void
) => {
  if (!value) {
    cb("密码不能为空")
  } else {
    cb()
  }
}
const rules = reactive({
  // 校验用户名
  username: [
    /**
     *  @简单的校验
     *
     *    @required 必填: true 非必填: false
     *    @message 不满足规则出现的提示
     *    @trigger  触发时机: blur: 失去焦点 change: 改变
     */
    { required: true, message: "用户名不能为空！", trigger: "blur" },
    { min: 3, max: 10, message: "密码必须为3~10位", trigger: "blur" },
  ],
  // 校验密码
  pwd: [
    /**
     *  @自定义检验规则
     */
    { validator: validatePwd, trigger: "blur" },
  ],
})

// 登陆的方法
// 获取el-form组件对象 跟节点的ref一样，会自动获取

let ruleFormRef = ref()
const loginFn = () => {
  ruleFormRef.value
    .validate()
    .then(() => {
      adminLoginApi({
        password: ruleForm.value.pwd,
        username: ruleForm.value.username,
      }).then((res) => {
        if (res.code === 200) {
          // 存储token
          // js-cookie
          Cookie.set("token", res.data.tokenHead + res.data.token, {
            expires: 7,
          })
          store.dispatch("getAdminInfo").then((res) => {
            router.push("/home")
          })
          // 获取用户信息
          // getAdminInfoApi().then((res) => {
          //   if (res.code === 200) {
          //     // 存储到vuex
          //     // res.data.menus
          //     store.commit("updateMenus", res.data.menus) // 将数据传递给vuex 使用store.commit("vuex的mutations中的方法名",需要存储的数据)
          //     // 跳转home页面
          //     router.push("/home")
          //   }
          // })
        }
      })
    })
    .catch(() => {
      console.log("检验不通过")
    })
}

let { ruleForm } = toRefs(state)
</script>

<style></style>
