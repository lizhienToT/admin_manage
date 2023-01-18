<script setup lang="ts">
</script>
<template>
  <a-config-provider >
    <template #default>
      <router-view />
    </template>
    <template #fallback>
      <div>loading...</div>
    </template>
  </a-config-provider>
</template>
<style lang="less">
</style>
