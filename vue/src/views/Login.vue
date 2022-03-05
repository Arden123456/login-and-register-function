<template>
  <body id="poster">

    <div style="width: 400px;margin: 150px auto">
      <el-form ref="form" :model="form" size="normal" :rules="rules" class="login-container">
        <div style="color: black;font-size: 30px;text-align: center; padding: 30px 0">Welcome to login</div>
        <el-form-item >
        <el-button type="text"  style="font-size: 20px;margin: auto">Login</el-button>
          <p style="margin: auto">|</p>
        <el-button @click="register" type="text"  style="font-size: 20px;margin: auto;color: darkgray">Register</el-button>
        </el-form-item>

        <el-form-item prop="username">
          <el-input v-model="form.username" placeholder="please enter username">
            <template #prefix>
              <el-icon class="el-UserFilled--icon" size="normal" style="width: 100%;height: 100%"><UserFilled/></el-icon>
            </template>
          </el-input>
        </el-form-item>
        <el-form-item prop="password">
          <el-input v-model="form.password" show-password placeholder="please enter password">
          <template #prefix>
            <el-icon class="ui-icon-locked"  style="width: 100%;height: 100%"><lock/></el-icon>
          </template>
          </el-input>
        </el-form-item>

        <el-form-item>
          <div style="display: flex">
            <el-input v-model="form.validCode" style="width: 80%" placeholder="please enter valid code">
              <template #prefix>
                <el-icon class="el-icon-lollipop"  style="width: 100%;height: 100%"><Lollipop/></el-icon>
              </template>
            </el-input>
            <ValidCode @input="createValidCode"/>
          </div>
        </el-form-item>

        <el-form-item>
          <el-radio v-model="form.role" :label="1">admin</el-radio>
          <el-radio v-model="form.role" :label="2">user</el-radio>
        </el-form-item>

        <el-form-item >
          <el-button style="width: 100%" type="primary" @click="login">Login</el-button>
        </el-form-item>



      </el-form>
      </div>

  </body>
</template>



<script>

import {UserFilled} from '@element-plus/icons-vue';
import {Lock} from '@element-plus/icons-vue';
import {Lollipop} from '@element-plus/icons-vue';
import request from "../utils/request";
import ValidCode from "../components/ValidCode";

export default {
  name: "Login",
  components:{
    UserFilled,
    Lock,
    Lollipop,
    ValidCode
  },
  data() {
    return {
      form: {},
      rules: {
        username: [
          {
            required: true,
            message: 'Please input username',
            trigger: 'blur',
          },
        ],
        password: [
          {
            required: true,
            message: 'Please input password',
            trigger: 'blur',
          },
        ]
      }
    }
  },
  methods:
      {
        createValidCode(data){
          //接收验证码组件提交的 4位验证码
          this.validCode = data
        },
        register(){
          this.$router.push("/register")
        },
        login() {
          this.$refs['form'].validate((valid) => {
            if (valid) {
              if (!this.form.validCode) {
                this.$message.error("please enter valid code")
                return
              }
              if(this.form.validCode.toLowerCase() !== this.validCode.toLowerCase()) {
                this.$message.error("valid code error")
                return
              }
              request.post("/user/login", this.form).then(res => {
                if (res.code == '0') {
                  this.$message({
                    type: "success",
                    message: "Login successfully!"
                  })
                  sessionStorage.setItem("user",JSON.stringify(res.data))   //缓存用户信息
                  this.$router.push("/")  //登录成功之后进行页面跳转，跳转到主页
                } else {
                  this.$message({
                    type: "error",
                    message: res.msg
                  })
                }
              })
            }
          })
        }
      }
}
</script>

<style scoped>

.login-container{
  border-radius: 15px;
  background-clip: padding-box;
  margin: 30px;
  width: 350px;
  padding: 35px 35px 15px 35px;
  background: aliceblue;
  border: 1px solid darkgray;
  box-shadow: 0 0 25px #cac6c6;
}
#poster{
  background: url("../assets/b-sky2.jpg") no-repeat;
  background-position: center;
  height: 100%;
  width: 100%;
  background-size: cover;
  position: fixed;
  }
body{
  margin: 0px;
  padding: 0px;
}
</style>