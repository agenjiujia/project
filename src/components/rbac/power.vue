<template>
<el-card >
    <my-bread level1='权限管理' level2='权限列表'></my-bread>

    <el-table border :data="powList" style="width: 100%" height='550px' class='roltable'>

        <el-table-column type='index' label="#" width="60">
        </el-table-column>

        <el-table-column prop="authName" label="权限名称" width="180">
        </el-table-column>
        
        <el-table-column prop="path" label="路径">
        </el-table-column>

        <el-table-column label="层级">
          <template slot-scope="scope">
              <span v-if='scope.row.level==0'>一级</span>
              <span v-if='scope.row.level==1'>二级</span>
              <span v-if='scope.row.level==2'>三级</span>
          </template>
        </el-table-column>
    </el-table>

</el-card>
</template>

<script>
export default {
    data() {
        return {
            powList:[],
        }
    },
    created() {
      this.powlist()
    },
    methods:{
      async powlist(){
        const res=await this.$http.get('rights/list')
        this.powList=res.data.data
        // console.log(res)
      }
    }
}
</script>

<style>
.roltable{
  margin-top: 10px;
}
</style>
