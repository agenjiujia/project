<template>
<el-card class="box-card">
    <!-- 一、面包屑 -->
    <el-breadcrumb separator="/">
        <el-breadcrumb-item>首页</el-breadcrumb-item>
        <el-breadcrumb-item>用户管理</el-breadcrumb-item>
        <el-breadcrumb-item>用户列表</el-breadcrumb-item>
    </el-breadcrumb>
    <!-- 二、searchUser -->
    <div style="margin-top: 15px;">
        <el-input placeholder="请输入内容" clearable @clear='clearSearch()' v-model="query" class="input-with-select searchUser">
            <el-button @click="searchUserList()" slot="append" icon="el-icon-search"></el-button>
        </el-input>
        <el-button type="success" @click="dialogFormVisibleAdd=true">添加用户</el-button>
    </div>

    <!-- 三、表格 -->
    <el-table :data="userList" style="width: 100%" height='280px' :highlight-current-row='true'>
        <el-table-column type='index' label="#" width="60">
        </el-table-column>
        <el-table-column prop="username" label="姓名" width="120">
        </el-table-column>
        <el-table-column prop="email" label="邮箱" width="160">
        </el-table-column>
        <el-table-column prop="mobile" label="电话" width="160">
        </el-table-column>

        <el-table-column label="创建时间" width="240">
            <template slot-scope="scope">
                {{scope.row.create_time | fmdata}}
            </template>
        </el-table-column>
        <!-- 该组件中改变用户状态的事件是change -->
        <el-table-column label="用户状态" width="240">
            <template slot-scope="scope">
                <el-switch @change='editType(scope.row)' v-model="scope.row.mg_state" active-color="#13ce66" inactive-color="#ff4949">
                </el-switch>
            </template>
        </el-table-column>

        <el-table-column label="操作" width="240">
            <template slot-scope="scope">
                <el-row>
                    <!-- 1.点击编辑按钮，渲染编辑对话框【传入当前对象】 -->
                    <el-button size='mini' plain type="primary" icon="el-icon-edit" circle @click='editUser(scope.row)'></el-button>
                    <el-button size='mini' plain type="danger" icon="el-icon-delete" circle @click='delUser(scope.row)'></el-button>
                    <el-button size='mini' plain type="success" icon="el-icon-check" circle @click='rolUser(scope.row)'></el-button>
                </el-row>
            </template>
        </el-table-column>
    </el-table>
    <!-- 4分页 -->
    <!-- 显示当前第几页: :current-page="pagenum" -->
    <el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page="pagenum" :page-sizes="[2, 4, 6, 8]" :page-size="2" layout="total, sizes, prev, pager, next, jumper" :total="total">
    </el-pagination>
    <!-- 添加用户 -->
    <el-dialog title="添加用户" :visible.sync="dialogFormVisibleAdd">
        <el-form :model="add_form">
            <el-form-item label="用户名" :label-width="formLabelWidth">
                <el-input v-model="add_form.username" autocomplete="off"></el-input>
            </el-form-item>
            <el-form-item label="密码" :label-width="formLabelWidth">
                <el-input v-model="add_form.password" autocomplete="off"></el-input>
            </el-form-item>
            <el-form-item label="邮箱" :label-width="formLabelWidth">
                <el-input v-model="add_form.email" autocomplete="off"></el-input>
            </el-form-item>
            <el-form-item label="电话" :label-width="formLabelWidth">
                <el-input v-model="add_form.mobile" autocomplete="off"></el-input>
            </el-form-item>
        </el-form>
        <div slot="footer" class="dialog-footer">
            <el-button @click="dialogFormVisibleAdd = false">取 消</el-button>
            <el-button type="primary" @click="addUser()">确 定</el-button>
        </div>
    </el-dialog>
    <!-- 编辑用户 -->
    <el-dialog title="编辑用户" :visible.sync="dialogFormVisibleEdit">
        <el-form :model="edit_form">
            <el-form-item label="用户名" :label-width="formLabelWidth">
                <el-input v-model="edit_form.username" autocomplete="off" disabled></el-input>
            </el-form-item>
            <el-form-item label="邮箱" :label-width="formLabelWidth">
                <el-input v-model="edit_form.email" autocomplete="off"></el-input>
            </el-form-item>
            <el-form-item label="电话" :label-width="formLabelWidth">
                <el-input v-model="edit_form.mobile" autocomplete="off"></el-input>
            </el-form-item>
        </el-form>
        <div slot="footer" class="dialog-footer">
            <el-button @click="dialogFormVisibleEdit = false">取 消</el-button>
            <el-button type="primary" @click='editData()'>确 定</el-button>
        </div>
    </el-dialog>
    <!-- 分配权限 -->
    <el-dialog title="分配角色" :visible.sync="dialogFormVisibleRol">
        <el-form>
            <el-form-item label="用户名" :label-width="formLabelWidth">
                <el-input v-model="currUserName" autocomplete="off"></el-input>
            </el-form-item>
            <el-form-item label="角色" :label-width="formLabelWidth">
                <el-select v-model="currUserRid" placeholder="">
                    <el-option label="请选择" :value='-1'></el-option>
                    <el-option :label="item.roleName" :value='item.id' v-for="(item,index) in roles" :key='index'></el-option>
                </el-select>
            </el-form-item>
        </el-form>
        <div slot="footer" class="dialog-footer">
            <el-button @click="dialogFormVisibleRol = false">取 消</el-button>
            <el-button type="primary" @click="rolEdit()">确 定</el-button>
        </div>
    </el-dialog>
</el-card>
</template>

<script>
export default {
    data() {
        return {
            query: '',
            userList: [],
            pagenum: 1,
            pagesize: 2,
            total: -1,
            // 添加用户数据
            dialogFormVisibleAdd: false,
            add_form: {
                username: '',
                password: '',
                email: '',
                mobile: '',
            },
            formLabelWidth: '120px',
            // 编辑用户数据
            dialogFormVisibleEdit: false,
            edit_form: {
                id: '',
                username: '',
                email: '',
                mobile: '',
            },
            currUserName: '',
            currUserId: '',
            currUserRid: -1,
            roles: [],
            dialogFormVisibleRol: false
        }
    },
    // 加载用户列表
    created() {
        this.getUserList();
    },
    methods: {
        async rolEdit() {
            // console.log(this.currUserRid);
            const resa = await this.$http.put(`users/${this.currUserId}/role`, {
                rid: this.currUserRid
            })
            // console.log(resa)
            const {
                data,
                meta: {
                    msg,
                    status
                }
            } = resa.data
            if (status === 200) {
                this.dialogFormVisibleRol = false
                this.$message.success(msg)
            } else {
                this.$message.error(msg)
            }
        },
        async rolUser(row) {
            this.currUserName = row.username
            this.currUserId = row.id
            // 点击的时候发起请求，获取【角色列表】
            const res = await this.$http.get('roles')
            this.roles = res.data.data
            // console.log(res);
            // 点击的时候发起请求，获取【当前角色id】；发请求，参数是当前用户id
            const resd = await this.$http.get(`users/${row.id}`)
            this.currUserRid = resd.data.data.rid
            // console.log(resd)
            // 点击的时候弹出对话框
            this.dialogFormVisibleRol = true
        },
        // 请求用户列表
        async getUserList() {
            // 注册令牌
            // const AUTH_TOKEN = localStorage.getItem('token')
            // this.$http.defaults.headers.common['Authorization'] = AUTH_TOKEN
            const res = await this.$http.get(`users?query=${this.query}&pagenum=${this.pagenum}&pagesize=${this.pagesize}`)
            const {
                data: {
                    total,
                    users
                },
                meta: {
                    msg,
                    status
                }
            } = res.data
            if (status === 200) {
                this.userList = users
                this.total = total
            }
        },
        // 模糊查询
        searchUserList() {
            this.getUserList();
        },
        // 清空搜索框
        clearSearch() {
            this.query = ''
        },
        // 设置每页显示几条数据
        handleSizeChange(val) {
            this.pagenum = 1;
            this.pagesize = val;
            this.getUserList();
        },
        // 设置显示第几页
        handleCurrentChange(val) {
            this.pagenum = val;
            this.getUserList();
        },
        // id,mg_state
        // mg_state响应式数据
        // 修改用户状态
        async editType(row) {
            const res = await this.$http.put(`users/${row.id}/state/${row.mg_state}`)
        },
        // 添加用户
        async addUser() {
            this.dialogFormVisibleAdd = false
            const res = await this.$http.post('users', this.add_form)
            const {
                meta: {
                    msg,
                    status
                },
                data
            } = res.data
            this.add_form = {}
            if (status === 201) {
                this.$message.success(msg)
                this.getUserList()
            } else {
                this.$message.error(msg)
            }
        },
        // 删除用户
        delUser(row) {
            this.$confirm('此操作将永久删除该文件, 是否继续?', '提示', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'warning'
            }).then(async () => {
                const res = await this.$http.delete(`users/${row.id}`)
                const {
                    meta: {
                        msg,
                        status
                    }
                } = res.data
                if (status === 200) {
                    this.$message.success(msg)
                    this.pagenum = 1
                    this.getUserList()
                } else {
                    this.$message.error(msg)
                }
            })
        },
        // 2.渲染编辑用户【接受传过来的对象，打开对话框，并把整个对象赋值给edit_form】
        async editUser(row) {
            this.dialogFormVisibleEdit = true
            // 3.把整个对象赋值给数据数组
            this.edit_form = row
        },
        // 提交用户数据
        async editData() {
            const res = await this.$http.put(`users/${this.edit_form.id}`, this.edit_form)
            const {
                data,
                meta: {
                    msg,
                    status
                }
            } = res.data
            if (status === 200) {
                this.dialogFormVisibleEdit = false
                this.$message.success(msg)
            } else {
                this.$message.success(msg)
                this.edit_form = {}
            }
        },

    }
}
</script>

<style>
.searchUser {
    width: 400px;
}
</style>
