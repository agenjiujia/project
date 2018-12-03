<template>
<el-card>
    <my-bread level1='权限管理' level2='角色列表'></my-bread>
    <el-row class='addRolesBtn'>
        <el-col>
            <el-button type="success">创建角色</el-button>
        </el-col>
    </el-row>

    <el-table :data="rolList" style="width: 100%">
        <el-table-column type="expand">
            <template slot-scope="scope">
                <el-form label-position="left" inline class="demo-table-expand">
                    <!-- 第一级循环对象里面的children -->
                    <el-row v-for='(item,index) in scope.row.children' :key='index'>
                        <el-col :span='4'>
                            <el-tag @close='delRol(scope.row,item.id)' closable type='success'>{{item.authName}}</el-tag>
                            <i class='el-icon-arrow-right'></i>
                        </el-col>
                        <el-col :span='20'>
                            <el-row v-for='(item2,index2) in item.children' :key='index2'>
                                <el-col :span='4'>
                                    <el-tag @close='delRol(scope.row,item2.id)' closable type='danger'>{{item2.authName}}</el-tag>
                                    <i class='el-icon-arrow-right'></i>
                                </el-col>
                                <el-col :span='20'>
                                    <el-tag @close='delRol(scope.row,item3.id)' closable type='warring' v-for='(item3,index3) in item2.children' :key='index3'>{{item3.authName}}</el-tag>
                                </el-col>
                            </el-row>
                        </el-col>
                    </el-row>
                    <span v-if='scope.row.children.length==0'>未配置权限</span>
                </el-form>
            </template>
        </el-table-column>

        <el-table-column label="#" type='index' width='100'>
        </el-table-column>
        <el-table-column label="角色名称" prop="roleName" width='250'>
        </el-table-column>
        <el-table-column label="角色描述" prop="roleDesc" width='250'>
        </el-table-column>

        <el-table-column label="操作">
            <template slot-scope="scope">
                <el-button type="primary" icon="el-icon-edit" circle size='mini' plain></el-button>
                <el-button type="danger" icon="el-icon-delete" circle size='mini' plain></el-button>
                <el-button type="success" icon="el-icon-check" circle size='mini' plain @click='rolTree(scope.row)'></el-button>
            </template>
        </el-table-column>
    </el-table>
    <!-- 所有权限 -->
    <!-- :data="anyRolList" -->
    <!-- 当前角色拥有的权限 -->
    <!-- :default-checked-keys="arrcheck"  -->
    <el-dialog title="收货地址" :visible.sync="dialogFormVisibleRols">
        <el-tree ref='tree' 
        :data="anyRolList" 
        show-checkbox node-key="id" 
        default-expand-all 
        :default-checked-keys="arrcheck" 
        :props="defaultProps">
        </el-tree>
        <div slot="footer" class="dialog-footer">
            <el-button @click="dialogFormVisibleRols = false">取 消</el-button>
            <el-button type="primary" @click="subTreeRol()">确 定</el-button>
        </div>
    </el-dialog>

</el-card>
</template>

<script>
export default {
    data() {
        return {
            // 每个角色各自拥有的权限总数组
            rolList: [],
            // 所有权限
            anyRolList: [],
            // 当前角色拥有的权限
            arrcheck: '',
            // 当前用户ID
            currUserID: -1,
            defaultProps: {
                children: 'children',
                label: 'authName'
            },
            // tree对话框
            dialogFormVisibleRols: false,
        }
    },
    created() {
        // 获取已经拥有的权限
        this.roldata()
    },
    methods: {
        // list
        // 获取所有角色各自拥有的权限
        async roldata() {
            const res = await this.$http.get('roles')
            // console.log(res)
            this.rolList = res.data.data
        },
        // 删除权限
        async delRol(roluserID, rolID) {
            const res = await this.$http.delete(`roles/${roluserID.id}/rights/${rolID}`)
            // console.log(res);
            roluserID.children = res.data.data
        },

        // tree
        async rolTree(row) {
            this.currUserID = row.id
            // 第一步 【获取所有权限】
            const res = await this.$http.get('rights/tree')
            this.anyRolList = res.data.data
            // console.log(this.anyRolList)
            // 第二步 【获取当前角色拥有的权限】
            var arr = []
            // (当前角色的第一层权限)
            row.children.forEach(item => {
                // (当前角色的第二层权限)
                item.children.forEach(item1 => {
                    // (当前角色的第三层权限)
                    item1.children.forEach(item2 => {
                        arr.push(item2.id)
                    });
                });
            });
            // console.log(arr)
            // 第三步 【当前拥有的即是选中的，把当前拥有的权限赋值给arrcheck】
            this.arrcheck = arr
            this.dialogFormVisibleRols = true
        },
        // subtree权限
        async subTreeRol() {
            let arr1 = this.$refs.tree.getCheckedKeys()
            let arr2 = this.$refs.tree.getHalfCheckedKeys()
            let arr8 = [...arr1, ...arr2]
            // console.log(arr8)
            const res = await this.$http.post(`roles/${this.currUserID}/rights`, {
                rids: arr8.join(',')
            })
            const {
                meta: {
                    msg,
                    status
                }
            } = res.data
            if (status === 200) {
                this.dialogFormVisibleRols = false
                this.roldata()
            }
        }
    }
}
</script>

<style>
.addRolesBtn {
    margin-top: 10px;
}
</style>
