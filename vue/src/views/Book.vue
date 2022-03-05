<template>
  <div style="padding: 10px">
    <!--    功能区域-->
    <div style="margin: 10px 0">
      <el-button type="primary" @click="add" v-if="user.role===1">Add</el-button>
      <el-button type="primary">import</el-button>
      <el-button type="primary">export</el-button>
    </div>
    <!--    搜索区域-->
    <div style="margin: 10px 0">
      <el-input v-model="search" placeholder="Please input key word" style="width: 20%" clearable />
      <el-button type="primary" style="margin-left: 5px" @click="load">search</el-button>
    </div>

    <el-table :data="tableData" border stripe style="width: 100%;">
      <el-table-column prop="id" sortable label="ID"  />
      <el-table-column prop="name" label="name"  />
      <el-table-column prop="price" label="price" />
      <el-table-column prop="author" label="author" />
      <el-table-column prop="createTime" label="createTime" />

      <el-table-column label="cover" >
        <template #default="scope">
          <el-image
              style="width: 100px; height: 100px"
              :src="scope.row.cover"
              :preview-src-list="[scope.row.cover]">
          </el-image>
        </template>
      </el-table-column>

      <el-table-column fixed="right" label="Operations" width="200">
        <template #default="scope">
          <el-button size="mini"  @click="handleEdit(scope.row)" v-if="user.role===1">Edit</el-button>
          <el-popconfirm title="Are you sure to delete this?"  @confirm="handleDelete(scope.row.id)" v-if="user.role===1">
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
          <el-form-item label="name">
            <el-input v-model="form.name" style="width: 80%"></el-input>
          </el-form-item>
          <el-form-item label="price">
            <el-input v-model="form.price" style="width: 80%"></el-input>
          </el-form-item>
          <el-form-item label="author">
            <el-input v-model="form.author" style="width: 80%"></el-input>
          </el-form-item>
          <el-form-item label="create_time">
            <el-date-picker value-format="YYYY-MM-DD" type="date" clearable v-model="form.createTime" style="width: 80%"></el-date-picker>
          </el-form-item>
          <el-form-item label="cover">
            <el-upload ref="upload" action="http://localhost:9090/files/upload" :on-success="filesUploadSuccess">
              <el-button type="primary">Click to upload</el-button>
            </el-upload>
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
  name: 'Book',


  data() {
    return {
      user:{},
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
    let userStr = sessionStorage.getItem("user")||"{}"
    this.user = JSON.parse(userStr)
    this.load()
  },
  methods:{
    filesUploadSuccess(res){
      console.log(res)
      this.form.cover = res.data
    },

    load(){
      request.get("/book",{
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
        request.put("/book", this.form).then(res =>{
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
        request.post("/book", this.form).then(res => {
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
      if(this.$refs['upload']){
        this.$refs['upload'].clearFiles() //清除历史文件列表
      }
    },
    handleEdit(row){
      this.form = JSON.parse(JSON.stringify(row))
      this.dialogVisible = true
      this.$nextTick(() =>{
        if(this.$refs['upload']){
          this.$refs['upload'].clearFiles() //清除历史文件列表
        }
      })
    },
    handleDelete(id){
      console.log(id)
      request.delete("/book/" + id).then(res =>{
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
<style>
.el-table .el-table__cell{
  z-index: auto;
}
</style>