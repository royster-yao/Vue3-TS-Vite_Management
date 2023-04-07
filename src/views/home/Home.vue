<template>
  <div class="home_container">
    <div class="home_header">头部</div>
    <div class="home_menu">
      <el-menu
        active-text-color="#ffd04b"
        background-color="#545c64"
        class="el-menu-vertical-demo"
        default-active="2"
        text-color="#fff"
        :unique-opened="true"
        :router="true">
        <el-sub-menu
          :index="menu.id + ''"
          v-for="menu in newMenus"
          :key="menu.id">
          <template #title>
            <span>{{ menu.title }}</span>
          </template>
          <template v-for="submenu in menu.children">
            <el-menu-item
              :index="'/' + menu.name + '/' + submenu.name"
              v-if="!submenu.hidden"
              :key="submenu.id">
              {{ submenu.title }}
            </el-menu-item>
          </template>
        </el-sub-menu>
      </el-menu>
    </div>
    <div class="home_content">
      <router-view></router-view>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { computed } from "vue"
import { useStore } from "vuex"

interface MenuObj {
  parentId: number
  id: number
  title: string
  hidden: 0 | 1
  children?: MenuObj[]
  name: string
}
interface NewMenus {
  [key: number]: MenuObj
}

const store = useStore()
const newMenus = computed<NewMenus>(() => {
  return store.getters.getNewMenus
})
</script>

<style lang="less" scoped>
.home_container {
  height: 100%;
  position: relative;
  .home_header {
    height: 70px;
    background-color: pink;
  }
  .home_menu {
    position: absolute;
    top: 70px;
    left: 0;
    bottom: 0;
    width: 250px;
    background-color: skyblue;
  }
  .home_content {
    position: absolute;
    top: 70px;
    right: 0;
    left: 250px;
    bottom: 0;
    background-color: orange;
  }
}
</style>
