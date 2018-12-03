<template>
<el-card>
    <my-bread level1='商品管理' level2='商品参数'></my-bread>
    <el-alert title="警告提示的文案" type="warning" show-icon :closable='false' class='goodsAlert'>
    </el-alert>
        
</el-card>
</template>

<script>
export default {

}
</script>

<style>
.goodsAlert{
    margin-top: 10px;
}
</style>
