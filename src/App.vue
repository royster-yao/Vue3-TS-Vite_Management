<template>
  <router-view></router-view>
</template>

<script lang="ts" setup>
import { ref } from "vue"

let num = ref(0)
</script>

<style>
@import url("./assets/styles/rebase.less");
html,
body {
  height: 100%;
}
#app {
  height: 100%;
}
</style>
