<template>
  <div class="t1">
    <div class="card">
      <div class="top">
        <img src="/src/static/animal01.png" width="86">
        <div class="font">AdminManage</div>
      </div>
      <a-card style="width: 400px">
        <a-form
            :model="formState"
            :label-col="labelCol"
            @finish="handleFinish"
            @validate="handleValidate"
            @finishFailed="handleFinishFailed"
            :wrapper-col="wrapperCol"
            :rules="rules"
        >
          <a-form-item label="用户名" name="username">
            <a-input v-model:value="formState.username">
              <template #prefix>
                <UserOutlined class="site-form-item-icon"/>
              </template>
            </a-input>
          </a-form-item>

          <a-form-item label="密码" name="password">
            <a-input-password v-model:value="formState.password">
              <template #prefix>
                <LockOutlined class="site-form-item-icon"/>
              </template>
            </a-input-password>
          </a-form-item>
          <a-form-item label="验证码" name="verificationCode">
            <a-input v-model:value="formState.verificationCode"/>
          </a-form-item>
          <div @click="refreshCode" style="margin-left: 70px;width:120px ;height:40px">
            <SIdentify :identifyCode="identifyCode"/>
          </div>
          <a-form-item style="">
            <a-checkbox v-model:checked="formState.remember">记住我</a-checkbox>
          </a-form-item>
          <a-form-item>
            <a-button :disabled="disabled" type="primary" style="width: 350px" html-type="submit">
              登录
            </a-button>
          </a-form-item>
          <div style=" display: flex; justify-content: space-between">
            <a href="">忘记密码</a>
            <a href="">暂无账号，去注册!</a>
          </div>
        </a-form>
      </a-card>
    </div>
  </div>
</template>
<script lang="ts" setup name="index">
import {onMounted, reactive, ref} from "vue"
import SIdentify from '@/views/utils/identify.vue'
import type {Rule} from "ant-design-vue/es/form";
// 图形验证码
let identifyCodes = "1234567890"
let identifyCode = ref('3212')

interface FormState {
  username: string;
  password: string;
  verificationCode: string;
  remember: boolean;
}

const disabled = ref(false)
const labelCol = {style: {width: '70px'}}
const wrapperCol = {span: 18}
const formState = reactive<FormState>({
  username: '',
  password: '',
  verificationCode: '',
  remember: false
})
const rules: Record<string, Rule[]> = {
  username: [{required: true, message: '请输入用户名！'}],
  password: [{required: true, message: '请输入密码'}],
  verificationCode: [{
    validator: (_rule: Rule, value: string) => {
      console.log(value, 123)
      if (value == '') {
        return Promise.reject('验证码不能为空!');
      } else if (value != identifyCode.value) {
        return Promise.reject('验证码不正确!');
      } else if (value == identifyCode.value) {
        return Promise.resolve();
      }
    }, trigger: 'change'
  }]
}

const randomNum = (min: number, max: number) => {
  return Math.floor(Math.random() * (max - min) + min)
}

const makeCode = (o: any, l: any) => {
  for (let i = 0; i < l; i++) {
    identifyCode.value += o[
        randomNum(0, o.length)
        ];
  }
}
const refreshCode = () => {
  identifyCode.value = "";
  makeCode(identifyCodes, 4);
}
const handleFinish = (values: FormState) => {
  console.log(values, formState);
  console.log(1)
}
const handleFinishFailed = (errors: any) => {
  console.log(errors);
  console.log(2)
}
const handleValidate = (...args: any[]) => {
  console.log(args);
  console.log(3)
}
onMounted(() => {
  identifyCode.value = "";
  makeCode(identifyCodes, 4);
})
</script>
<style lang="less" scoped>
.t1 {
  position: absolute;
  left: 0;
  top: 0;
  bottom: 0;
  right: 0;
  background-image: linear-gradient(287deg, rgba(94, 35, 117, 0.5) 0%, rgba(94, 35, 117, 0.5) 14.286%, rgba(84, 71, 119, 0.5) 14.286%, rgba(84, 71, 119, 0.5) 28.572%, rgba(73, 107, 120, 0.5) 28.572%, rgba(73, 107, 120, 0.5) 42.858%, rgba(63, 143, 122, 0.5) 42.858%, rgba(63, 143, 122, 0.5) 57.144%, rgba(53, 178, 123, 0.5) 57.144%, rgba(53, 178, 123, 0.5) 71.43%, rgba(42, 214, 125, 0.5) 71.43%, rgba(42, 214, 125, 0.5) 85.716%, rgba(32, 250, 126, 0.5) 85.716%, rgba(32, 250, 126, 0.5) 100.002%), linear-gradient(173deg, rgb(185, 34, 220) 0%, rgb(185, 34, 220) 14.286%, rgb(164, 66, 203) 14.286%, rgb(164, 66, 203) 28.572%, rgb(143, 97, 186) 28.572%, rgb(143, 97, 186) 42.858%, rgb(122, 129, 170) 42.858%, rgb(122, 129, 170) 57.144%, rgb(101, 160, 153) 57.144%, rgb(101, 160, 153) 71.43%, rgb(80, 192, 136) 71.43%, rgb(80, 192, 136) 85.716%, rgb(59, 223, 119) 85.716%, rgb(59, 223, 119) 100.002%);

  .card {
    width: 400px;
    padding-left: 55%;
    padding-top: 10%;

    .top {
      display: flex;
      justify-content: center;
      margin-left: 190px;

      .font {
        padding-top: 20px;
        font-size: 30px;
        font-weight: 1000;
      }
    }
  }
}
</style>
