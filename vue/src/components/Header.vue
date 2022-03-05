<template>
<div style="height: 50px; line-height: 50px; border-bottom: 1px solid #ccc; display: flex">
  <div style="width: 200px; padding-left: 30px; font-weight: bold;color: cornflowerblue">Background management</div>
  <div style="flex: 1"></div>
  <div style="width: 100px;">
    <el-dropdown>
      <span class="el-dropdown-link">
        {{nickName}}<i class="el-icon-arrow-down el-icon--right"></i>
      </span>
      <template #dropdown>
        <el-dropdown-menu>
          <el-dropdown-item>personal center</el-dropdown-item>
          <el-dropdown-item @click="$router.push('/login')">log out</el-dropdown-item>
        </el-dropdown-menu>
      </template>
    </el-dropdown>
  </div>
</div>
</template>



<script>
import {ArrowDown} from "@element-plus/icons-vue";
let user = JSON.parse(sessionStorage.getItem("user"))
let nick_Name = ''
if(user){
  nick_Name = user.nickName
}
export default {
  name: "header",
  data(){
    return{
      nickName:nick_Name
    }
  },

  components:{
    ArrowDown
  },
}
</script>

<style scoped>

</style>