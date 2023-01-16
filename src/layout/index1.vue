<template>
  <a-layout style="min-height: 100vh">
    <a-layout-sider v-model:collapsed="collapsed" collapsible>
      <Sider ref="sider" />
    </a-layout-sider>
    <a-layout>
      <a-layout-header style="background-color: #fff;padding: 0;">
        <Header ref="header" />
      </a-layout-header>
      <a-layout-content style="margin: 0 16px">
        <Breadcrumb ref="breadcrumb" />
        <Content ref="content" />
      </a-layout-content>
      <a-layout-footer>
        <Footer ref="footer" />
      </a-layout-footer>
    </a-layout>
  </a-layout>
  <!-- <a-layout class="t1">
    <a-layout-sider class="sider">
      <Sider ref="sider" />
    </a-layout-sider>
    <a-layout>
      <a-layout-header class="header">Header</a-layout-header>
      <a-layout-content class="content">Content</a-layout-content>
      <a-layout-footer class="footer">
        <Footer ref="footer" />
      </a-layout-footer>
    </a-layout>
  </a-layout> -->
</template>
<script lang="ts" setup>
import Footer from '@/layout/footer.vue'
import Sider from '@/layout/sider.vue'
import Header from '@/layout/header.vue'
import Content from '@/layout/content.vue'
import Breadcrumb from '@/layout/breadcrumb.vue'
const footer = ref(null)
const sider = ref(null)
const header = ref(null)
const breadcrumb = ref(null)
const collapsed = ref(false)
</script>
<style lang="less" scoped>
.t1 {
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  position: absolute;

  .footer {
    background-color: #f6f6f6;
  }
}
</style>