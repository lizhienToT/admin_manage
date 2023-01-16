<template>
  <div class="logo"><img src="../assets/app.svg" :width="30" :height="30"></div>
  <a-menu v-model:selectedKeys="selectedKeys" theme="dark" mode="inline">
    <a-menu-item key="1">
      <pie-chart-outlined />
      <span>Option 1</span>
    </a-menu-item>
    <a-menu-item key="2">
      <desktop-outlined />
      <span>Option 2</span>
    </a-menu-item>
    <a-sub-menu key="sub1">
      <template #title>
        <span>
          <user-outlined />
          <span>User</span>
        </span>
      </template>
      <a-menu-item key="3">Tom</a-menu-item>
      <a-menu-item key="4">Bill</a-menu-item>
      <a-menu-item key="5">Alex</a-menu-item>
    </a-sub-menu>
    <a-sub-menu key="sub2">
      <template #title>
        <span>
          <team-outlined />
          <span>Team</span>
        </span>
      </template>
      <a-menu-item key="6">Team 1</a-menu-item>
      <a-menu-item key="8">Team 2</a-menu-item>
    </a-sub-menu>
    <a-menu-item key="9">
      <file-outlined />
      <span>File</span>
    </a-menu-item>
  </a-menu>
</template>
<script lang="ts" setup name="sider">
import { getRouteListById } from '@/api/componentsApi';
import useUserInfoStore from '@/store/modules/userinfo';
const openKeys = ref(['sub1'])
const selectedKeys = ref(['sub1'])
const collapsed = ref(false)
const userinfo = useUserInfoStore()
const getRoute = () => { 
  getRouteListById(userinfo.id).then(res => { 
    console.log(res)
  })
}
onMounted(() => { 
  getRoute()
})
</script>
<style lang="less" scoped>
.logo {
  text-align: center;
}
</style>