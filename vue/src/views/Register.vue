<template>
  <body id="poster">

    <div style="width: 400px;margin: 150px auto">
      <el-form ref="form" :model="form" size="normal" :rules="rules" class="login-container">
        <div style="color: black;font-size: 30px;text-align: center; padding: 30px 0" > register</div>


        <template #title>
          <el-icon><Avatar /></el-icon>
        </template>


        <el-form-item >
          <el-button @click="login" type="text"  style="font-size: 20px;margin: auto;color: darkgray">Login</el-button>
          <p style="margin: auto">|</p>
          <el-button  type="text"  style="font-size: 20px;margin: auto">Register</el-button>
        </el-form-item>

        <el-form-item prop="username">
          <el-input v-model="form.username" placeholder="please create username">
            <template #prefix>
              <el-icon class="el-UserFilled--icon" size="normal" style="width: 100%;height: 100%"><UserFilled/></el-icon>
            </template>
          </el-input>
        </el-form-item>
        <el-form-item prop="password">
          <el-input v-model="form.password" show-password  placeholder="please create password">
            <template #prefix>
              <el-icon class="ui-icon-locked"  style="width: 100%;height: 100%"><lock/></el-icon>
            </template>
          </el-input>
        </el-form-item>
        <el-form-item prop="confirm" >
          <el-input v-model="form.confirm" show-password placeholder="confirm your password">
            <template #prefix>
              <el-icon class="ui-icon-locked"  style="width: 100%;height: 100%"><lock/></el-icon>
            </template>
          </el-input>
        </el-form-item>
        <el-form-item >
          <el-button style="width: 100%" type="primary" @click="register">Register</el-button>
        </el-form-item>
      </el-form>
    </div>

  </body>
</template>

<script>

import {UserFilled} from '@element-plus/icons-vue';
import {Lock} from '@element-plus/icons-vue';
import request from "../utils/request";
import {Avatar} from '@element-plus/icons-vue';

export default {
  name: "Register",
  components:{
    UserFilled,
    Lock,
    Avatar
  },
  data(){
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
        ],
        confirm: [
          {
            required: true,
            message: 'Please input password again',
            trigger: 'blur',
          },
        ]
      }
    }
  },
  methods:{
    login(){
      this.$router.push("/login")
    },
    register() {
      this.$refs['form'].validate((valid) => {
        if (valid) {
      if(this.form.password!=this.form.confirm){
        this.$message({
          type: "error",
          message: 'The two passwords are inconsistent'
        })
        return
      }

      request.post("/user/register", this.form).then(res =>{
        if(res.code == '0') {
          this.$message({
            type: "success",
            message: "Register successfully!"
          })
          this.$router.push("/login")  //登录成功之后进行页面跳转，跳转到主页
        }else{
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