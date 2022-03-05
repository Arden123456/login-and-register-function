
<template>
  <div style="padding: 10px">
<!--    功能区域-->
    <div style="margin: 10px 0">
      <el-button type="primary" @click="add">Add</el-button>
      <el-button type="primary">import</el-button>
      <el-button type="primary">export</el-button>
    </div>
<!--    搜索区域-->
    <div style="margin: 10px 0">
      <el-input v-model="search" placeholder="Please input key word" style="width: 20%" clearable />
      <el-button type="primary" style="margin-left: 5px" @click="load">search</el-button>
    </div>
<!--表格展示区域-->
    <el-table :data="tableData" border stripe style="width: 100%">
      <el-table-column prop="id" sortable label="ID"  />
      <el-table-column prop="username" label="username"  />
      <el-table-column prop="nickName" label="nick_name" />
      <el-table-column prop="age" label="age" />
      <el-table-column prop="sex" label="sex" />
      <el-table-column prop="address" label="address" />

      <el-table-column label="role">
        <template #default="scope">
          <span v-if="scope.row.role === 1">admin</span>
          <span v-if="scope.row.role === 2">user</span>
        </template>
      </el-table-column>

      <el-table-column fixed="right" label="Operations" width="200">
        <template #default="scope">
          <el-button size="mini"  @click="handleEdit(scope.row)">Edit</el-button>
          <el-popconfirm title="Are you sure to delete this?"  @confirm="handleDelete(scope.row.id)">
            <template #reference>
              <el-button size="mini" type="danger">Delete</el-button>
            </template>
          </el-popconfirm>
        </template>
      </el-table-column>
    </el-table>
    <div style="margin: 10px 0; ">
      <el-pagination
          v-model:currentPage="currentPage4"
          :page-sizes="[5, 10, 20]"
          :page-size="pageSize"
          layout="total, sizes, prev, pager, next, jumper"
          :total="total"
          @size-change="handleSizeChange"
          @current-change="handleCurrentChange">
      </el-pagination>

<!--      对话框-->
      <el-dialog
          v-model="dialogVisible"
          title="Tips"
          width="30%">
        <el-form :model="form" label-width="120px">
          <el-form-item label="username">
            <el-input v-model="form.username" style="width: 80%"></el-input>
          </el-form-item>
          <el-form-item label="nick_name">
            <el-input v-model="form.nickName" style="width: 80%"></el-input>
          </el-form-item>
          <el-form-item label="age">
            <el-input v-model="form.age" style="width: 80%"></el-input>
          </el-form-item>
          <el-form-item label="sex">
            <el-radio v-model="form.sex" label="male" size="large">male</el-radio>
            <el-radio v-model="form.sex" label="female" size="large">female</el-radio>
            <el-radio v-model="form.sex" label="unknown" size="large">unknown</el-radio>
            <el-input v-model="form.sex" style="width: 80%"></el-input>
          </el-form-item>
          <el-form-item label="address">
            <el-input type="textarea" v-model="form.address" style="width: 80%"></el-input>
          </el-form-item>
        </el-form>
        <template #footer>
      <span class="dialog-footer">
        <el-button @click="dialogVisible = false">Cancel</el-button>
        <el-button type="primary" @click="save">Confirm</el-button>
      </span>
        </template>
      </el-dialog>
    </div>
  </div>
</template>

<script >


import request from "../utils/request";

export default {
  name: 'User',


data() {
  return {
    form:{},
    dialogVisible:false,
    search: '',
    currentPage: 1,
    pageSize: 10,
    total: 0,
      tableData: []
  }
},
  created() {
    this.load()
  },
  methods:{
    load(){
      request.get("/user",{
        params: {
        pageNum: this.currentPage,
        pageSize: this.pageSize,
        search: this.search
        }
      }).then(res =>{
        console.log(res)
        this.tableData = res.data.records
        this.total = res.data.total
      })
    },
    save(){
      if(this.form.id){//更新
        request.put("/user", this.form).then(res =>{
          console.log(res)
          if(res.code == '0') {
              this.$message({
                type: "success",
                message: "Edit successfully!"
              })
            }else{
              this.$message({
                type: "error",
                message: res.msg
            })
          }
          this.load() //刷新表格数据
          this.dialogVisible = false //关闭弹窗
        })
      } else {//新增
        request.post("/user", this.form).then(res => {
          console.log(res)
          if(res.code == '0') {
            this.$message({
              type: "success",
              message: "Add successfully!"
            })
          }else{
            this.$message({
              type: "error",
              message: res.msg
            })
          }
          this.load() //刷新表格数据
          this.dialogVisible = false //关闭弹窗
        })
      }
    },
    add(){
      this.dialogVisible = true
      this.form = {} //把表单写的属性清空
    },
    handleEdit(row){
      this.form = JSON.parse(JSON.stringify(row))
      this.dialogVisible = true
    },
    handleDelete(id){
      console.log(id)
      request.delete("/user/" + id).then(res =>{
        if(res.code == '0') {
          this.$message({
            type: "success",
            message: "Delete successfully!"
          })
        }else{
          this.$message({
            type: "error",
            message: res.msg
          })
        }
        this.load()  //重新加载表格的数据
      })
    },
    handleSizeChange(pageSize){ //改变每页的个数触发
      this.pageSize = pageSize
      this.load()
    },
    handleCurrentChange(pageNum){ //改变当前页码触发
      this.currentPage = pageNum
      this.load()
    },

  }
}
</script>
