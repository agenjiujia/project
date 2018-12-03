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
                    <a href="#" class='middle-a' @click.prevent='clearitem'>退出</a>
                </div>
            </el-col>
        </el-row>
    </el-header>
    <el-container>
        <el-aside width="200px" class='aside'>
            <el-menu :unique-opened='true' :router='true'>
                <el-submenu :index="''+item.order" v-for='(item,index) in menus' :key="index">
                    <template slot="title">
                        <i class="el-icon-menu"></i>
                        <span>{{item.authName}}</span>
                    </template>
                    <el-menu-item :index="item2.path" v-for='(item2,index) in item.children' :key='index'><i class="el-icon-setting"></i>{{item2.authName}}</el-menu-item>
                </el-submenu>
            </el-menu>
        </el-aside>
        <el-main class='main'>
            <router-view></router-view>
        </el-main>
    </el-container>
</el-container>
</template>

<script>
export default {
    data(){
        return{
            menus:[]
        }
    },
    // beforeCreate() {
    //     var token = localStorage.getItem('token')
    //     if (!token) {
    //         this.$router.push('/login')
    //     }
    // },
    created() {
        this.getMenus()
    },
    methods: {
        clearitem() {
            sessionStorage.clear();
            this.$router.push('/login')
        },
        // 动态导航
        async getMenus(){
            const res=await this.$http.get('menus')
            // console.log(res)
            this.menus=res.data.data
        }
    }
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
