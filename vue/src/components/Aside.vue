<template>
<div>
  <el-menu
      style="width: 200px; min-height: calc(100vh - 50px)"
      :default-active="path"
      router
      class="el-menu-vertical-demo">
    <el-sub-menu index="1" v-if="user.role === 1">
      <template #title>
        <el-icon><location /></el-icon>
        <span>System management</span>
      </template>
      <el-menu-item index="/user">user management</el-menu-item>
    </el-sub-menu>
    <el-menu-item index="/book">
      <el-icon><grid /></el-icon>
      <span>Book management</span>
    </el-menu-item>
    <el-menu-item index="/news" v-if="user.role === 2">
      <el-icon><setting /></el-icon>
      <span>News management</span>
    </el-menu-item>
  </el-menu>

</div>
</template>

<script >
import {Location} from '@element-plus/icons-vue';
import  {Document} from '@element-plus/icons-vue';
import  {Setting} from '@element-plus/icons-vue';
import {Grid} from '@element-plus/icons-vue';
import request from "../utils/request";
export default {
  name: "Aside",
  data(){
    return{
      user: {},
      path: this.$router.path  //设置默认高亮的菜单
    }
  },
  created() {
    let userStr = sessionStorage.getItem("user")||"{}"
    this.user = JSON.parse(userStr)

    //请求服务器，确认当前用户的合法信息
    request.get("/user/" + this.user.id).then(res => {
      if(res.code === '0'){
        this.user = res.data
      }
    })
  },

  components:{
    Location,
    Document,
    Setting,
    Grid,
  }
}
</script>



<style scoped>

</style>