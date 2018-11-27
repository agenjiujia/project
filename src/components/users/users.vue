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
        <el-button type="success" @click="addUser()">添加用户</el-button>
    </div>

    <!-- 三、表格 -->
    <el-table :data="userList" style="width: 100%">
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

        <el-table-column label="用户状态" width="240">
            <template slot-scope="scope">
                <el-switch v-model="scope.row.mg_state" active-color="#13ce66" inactive-color="#ff4949">
                </el-switch>
            </template>
        </el-table-column>
        <el-table-column label="操作" width="240">
            <template slot-scope="scope">
                <el-row>
                    <el-button size='mini' plain type="primary" icon="el-icon-edit" circle></el-button>
                    <el-button size='mini' plain type="success" icon="el-icon-check" circle></el-button>
                    <el-button size='mini' plain type="danger" icon="el-icon-delete" circle></el-button>
                </el-row>
            </template>
        </el-table-column>
    </el-table>
    <!-- 4分页 -->
    <el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange" :page-sizes="[2, 4, 6, 8]" :page-size="2" layout="total, sizes, prev, pager, next, jumper" :total="total">
    </el-pagination>
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
            total: -1
        }
    },
    // 加载用户列表
    created() {
        this.getUserList();
    },
    methods: {
        // 请求用户列表
        async getUserList() {
            // 注册令牌
            const AUTH_TOKEN = localStorage.getItem('token')
            this.$http.defaults.headers.common['Authorization'] = AUTH_TOKEN
            const res = await this.$http.get(`users?query=${this.query}&pagenum=${this.pagenum}&pagesize=${this.pagesize}`)
            const {
                data: {
                    pagenum,
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
            this.pagesize = val;
            this.pagenum = 1;
            this.getUserList();
        },
        // 设置显示第几页
        handleCurrentChange(val) {
            this.pagenum = val;
            this.getUserList();
        },
    }
}
</script>

<style>
.searchUser {
    width: 400px;
}
</style>
