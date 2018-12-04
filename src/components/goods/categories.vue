<template>
  <el-card>
    <my-bread level1="商品管理" level2="商品分类"></my-bread>
    <el-button type="success" plain class="goodsCateBtn" @click="showAddCate()">添加分类</el-button>

    <el-dialog title="添加分类" :visible.sync="dialogFormVisible">
      <el-form :model="form">
        <el-form-item label="分类名称" label-width="120px">
          <el-input v-model="form.cat_name" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="分类" label-width="120px">
          <el-cascader
            :props="defaultProps"
            change-on-select
            :options="options"
            v-model="selectedOptions"
          ></el-cascader>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible = false">取 消</el-button>
        <el-button type="primary" @click="addCate()">确 定</el-button>
      </div>
    </el-dialog>

    <el-table :data="tableData" style="width: 100%">
        <el-tree-grid 
        label='分类名称'
        prop='cat_name' 
        treeKey='cat_id' 
        parentKey='cat_pid' 
        levelKey="cat_level" 
        childKey="children">
        </el-tree-grid>
      <el-table-column label="级别">
          <template slot-scope="scope">
              <span v-if='scope.row.cat_level==0'>一级</span>
              <span v-else-if='scope.row.cat_level==1'>二级</span>
              <span v-else-if='scope.row.cat_level==2'>三级</span>
          </template>
      </el-table-column>
      <el-table-column label="是否有效">
          <template slot-scope="scope">
              <span v-if='scope.row.cat_deleted==false'>有效</span>
              <span v-else>无效</span>
          </template>
      </el-table-column>
      <el-table-column label="操作">
        <template slot-scope="scope">
            <el-button type="primary" icon="el-icon-edit" circle size='mini' plain></el-button>
            <el-button type="danger" icon="el-icon-delete" circle size='mini' plain @click='del(scope.row)'></el-button>
        </template>
      </el-table-column>
    </el-table>
  </el-card>
</template>

<script>
var ElTreeGrid = require("element-tree-grid");
export default {
  data() {
    return {
      dialogFormVisible: false,
      form: {
        cat_pid: "",
        cat_name: "",
        cat_level: ""
      },
      options: [],
      selectedOptions: [],
      defaultProps: {
        label: "cat_name",
        value: "cat_id",
        children: "children"
      },
      tableData: [],
      
    };
  },
  components: {
    ElTreeGrid
  },
  created() {
    this.getCate();
  },
  methods: {
    // 删除分类
    async del(row){
      // console.log(row.cat_id)
        const res=await this.$http.delete(`categories/${row.cat_id}`)
        console.log(res)
        row.splice(row.cat_id,1)
        // 更新视图
        // this.getCate()
    },
    // 添加分类
    async addCate() {
      if (this.selectedOptions.length == 0) {
        this.form.cat_pid = 0;
        this.form.cat_level = 0;
      } else if (this.selectedOptions.length == 1) {
        this.form.cat_pid = this.selectedOptions[0];
        this.form.cat_level = 1;
      } else if (this.selectedOptions.length == 2) {
        this.form.cat_pid = this.selectedOptions[1];
        this.form.cat_level = 2;
      }
      const res = await this.$http.post("categories", this.form);
      // console.log(res)
    },
    // 获取分类
    async showAddCate() {
      this.dialogFormVisible = true;
      const res = await this.$http.get("categories?type=2");
      // console.log(res)
      this.options = res.data.data;
    },
    // 获取分类等级列表
    async getCate() {
      const res = await this.$http.get("categories");
      // console.log(res);
      this.tableData = res.data.data;
      console.log(this.tableData)
    }
  }
};
</script>

<style>
.goodsCateBtn {
  margin-top: 10px;
}
</style>
