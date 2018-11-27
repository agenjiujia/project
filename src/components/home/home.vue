<template>
<el-container class='aside-container'>
    <el-header class='header'>
        <el-row>
            <el-col :span="4">
                <div class="grid-content bg-purple">
                    <img src="../../assets/logo.png" alt="">
                    </div>
            </el-col>
            <el-col :span="18">
                <div class="grid-content bg-purple-light middle">
                    <h1>电商后台管理系统</h1>
                </div>
            </el-col>
            <el-col :span="2">
                <div class="grid-content bg-purple">
                    <a href="#" class='middle-a'>退出</a>
                </div>
            </el-col>
        </el-row>
    </el-header>
    <el-container>
        <el-aside width="200px" class='aside'>
            <el-menu :unique-opened='true' :router='true'>
                <el-submenu index="1">
                    <template slot="title">
                        <i class="el-icon-menu"></i>
                        <span>用户管理</span>
                    </template>
                    <el-menu-item index="users"><i class="el-icon-setting"></i>用户列表</el-menu-item>
                </el-submenu>
                <el-submenu index="2">
                    <template slot="title">
                        <i class="el-icon-menu"></i>
                        <span>权限管理</span>
                    </template>
                    <el-menu-item index="2-1"><i class="el-icon-setting"></i>角色列表</el-menu-item>
                    <el-menu-item index="2-2"><i class="el-icon-setting"></i>权限列表</el-menu-item>
                </el-submenu>
                <el-submenu index="3">
                    <template slot="title">
                        <i class="el-icon-menu"></i>
                        <span>商品管理</span>
                    </template>
                    <el-menu-item index="3-1"><i class="el-icon-setting"></i>商品列表</el-menu-item>
                    <el-menu-item index="3-2"><i class="el-icon-setting"></i>分类参数</el-menu-item>
                    <el-menu-item index="3-3"><i class="el-icon-setting"></i>商品分类</el-menu-item>
                </el-submenu>
                <el-submenu index="4">
                    <template slot="title">
                        <i class="el-icon-menu"></i>
                        <span>订单管理</span>
                    </template>
                    <el-menu-item index="4-1"><i class="el-icon-setting"></i>订单列表</el-menu-item>
                </el-submenu>
                <el-submenu index="5">
                    <template slot="title">
                        <i class="el-icon-menu"></i>
                        <span>数据统计</span>
                    </template>
                    <el-menu-item index="5-1"><i class="el-icon-setting"></i>数据列表</el-menu-item>
                </el-submenu>
            </el-menu>
        </el-aside>
        <el-main class='main'>Main</el-main>
    </el-container>
</el-container>
</template>

<script>
export default {

}
</script>

<style>
.aside-container {
    height: 100%;
}

.header {
    background-color: #b3c0d1;
}

.aside {
    background-color: #d3dce6;
}

.main {
    background-color: #e9eef3;
}

.aside-container .middle {
    height: 60px;
    text-align: center;
    line-height: 60px;

}

.aside-container .middle h1 {
    margin: 0;
    padding: 0;
    color: #fff;
}

.aside-container .middle-a {
    height: 60px;
    line-height: 60px;
    text-decoration: none;
    font-size: 18px;
}
</style>
