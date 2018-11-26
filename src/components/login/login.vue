<template>
  <div class="login-wrap">
    <el-form class="login-form" label-position="top" label-width="80px" :model="formdata">
      <h1>用户登陆</h1>
      <el-form-item label="用户名">
        <el-input v-model="formdata.username"></el-input>
      </el-form-item>
      <el-form-item label="密码">
        <el-input v-model="formdata.password"></el-input>
      </el-form-item>
      <el-row>
        <el-button type="primary" class="login-btn" @click.prevent="subdata">按钮</el-button>
      </el-row>
    </el-form>
  </div>
</template>

<script>
export default {
    data() {
        return {
            formdata: {
                username: '',
                password: ''
            }
        };
    },
    methods: {
        // 方法一
        // 异步代码
        // subdata() {
            // this.$http.post('/login', this.formdata).then((res) => {
            //     const {
            //         data,
            //         meta: {
            //             msg,
            //             status
            //         }
            //     } = res.data;
            //     if (status === 200) {
            //         localStorage.setItem('token', data.token)
            //         this.$router.push({
            //             name: 'home'
            //         })
            //         this.$message.success(msg)
            //     } else {
            //         this.$message.error(msg)
            //     }
            // })
        // }
        // 方法二
        // 让异步代码看起来更像是同步代码
        async subdata(){
          const res=await this.$http.post('login',this.formdata)
          // console.log(res)
          const {data,meta:{msg,status}}=res.data
          if (status===200){
            localStorage.setItem('token',data.token)
            this.$router.push({name:'home'})
            this.$message.success(msg);
          }else{
            this.$message.error(msg);
          }
        }
    }
}
</script>

<style>
.login-wrap {
    height: 100%;
    background-color: #324152;
    display: flex;
    justify-content: center;
    align-items: center;
}

.login-wrap .login-form {
    width: 400px;
    background-color: #ffffff;
    padding: 25px;
    border-radius: 5px;
}

.login-wrap h1 {
    margin-top: 15px;
    margin-bottom: 15px;
}

.login-wrap .login-btn {
    width: 100%;
}
</style>
