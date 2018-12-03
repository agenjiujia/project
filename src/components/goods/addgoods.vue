<template>
<el-card>
    <my-bread level1='商品管理' level2='商品列表'></my-bread>
    <el-alert title="消息提示的文案" type="info" center show-icon :closable="false" class='tishi'>
    </el-alert>
    <!-- active参数number类型 -->
    <el-steps :active="1*active" align-center finish-status="success" class='step'>
        <el-step title="基本信息"></el-step>
        <el-step title="商品参数"></el-step>
        <el-step title="商品属性"></el-step>
        <el-step title="商品图片"></el-step>
        <el-step title="商品内容"></el-step>
    </el-steps>
    <!-- active参数string类型 -->
    <el-form label-position="top" label-width="80px" :model="goodList">

        <el-tabs tab-position="left" v-model='active' @tab-click='tabChange()'>
            <el-tab-pane label="基本信息" name='1'>
                <el-form-item label="商品名称">
                    <el-input v-model="goodList.goods_name"></el-input>
                </el-form-item>
                <el-form-item label="商品价格">
                    <el-input v-model="goodList.goods_price"></el-input>
                </el-form-item>
                <el-form-item label="商品重量">
                    <el-input v-model="goodList.goods_weight"></el-input>
                </el-form-item>
                <el-form-item label="商品数量">
                    <el-input v-model="goodList.goods_number"></el-input>
                </el-form-item>
                <el-form-item label="商品分类">
                        {{publicCart}}
                        <el-cascader 
                        :props="defaultProp" 
                        expand-trigger="hover" 
                        :options="options" 
                        v-model="publicCart">
                        </el-cascader>
                </el-form-item>
            </el-tab-pane>
            <el-tab-pane label="商品参数" name='2'>
                 <el-form-item v-for='(item1,index) in arrManyParams' :key='index' :label='item1.attr_name'>
                     <el-checkbox-group v-model='item1.attr_vals'>
                         <el-checkbox v-for='(item2,index) in item1.attr_vals' 
                         :key='index' 
                         :label='item2' 
                         border 
                         @change='clearParams(index)'
                         >
                         {{index}}{{item2}}
                         </el-checkbox>
                     </el-checkbox-group>
                 </el-form-item>
            </el-tab-pane>
            <el-tab-pane label="商品属性" name='3'>
                <el-form-item v-for='(item,index) in this.arrOnlyParams' :key='index' :label='item.attr_name'>
                    <el-input v-model='item.attr_vals'></el-input>
                </el-form-item>
            </el-tab-pane>
            <el-tab-pane label="商品图片" name='4'>
                <el-upload
                action="http://localhost:8888/api/private/v1/upload"
                :headers='headers'
                :on-preview="handlePreview"
                :on-remove="handleRemove"
                :on-success="handleSuccess"
                list-type="picture">
                <el-button size="small" type="primary">点击上传</el-button>
                <div slot="tip" class="el-upload__tip">只能上传jpg/png文件，且不超过500kb</div>
                </el-upload>
            </el-tab-pane>
            <el-tab-pane label="商品内容" name='5'>
                <el-button type='success' @click='btngoods()'>添加商品</el-button>
                <quill-editor class='editor' v-model='goodList.goods_introduce'></quill-editor>
            </el-tab-pane>
        </el-tabs>
    </el-form>

</el-card>
</template>

<script>
import 'quill/dist/quill.core.css'
import 'quill/dist/quill.snow.css'
import 'quill/dist/quill.bubble.css'
import { quillEditor } from 'vue-quill-editor'
export default {
    data() {
        return {
            // step和tabs的active
            active: "1",
            // 表单数据对象
            goodList: {
                // 商品名称
                goods_name: '',
                // 以为','分割的分类列表
                goods_cat: '',
                // 价格
                goods_price: '',
                // 数量
                goods_number: '',
                // 重量
                goods_weight: '',
                // 介绍
                goods_introduce: '',
                // 上传的图片临时路径（对象）
                pics:[],
                // 商品的参数（数组）
                attrs: [],
            },
            publicCart:[1,3,6],
            // 数据对象
            options: [],
            // 商品分类
            defaultProp: {
                label: 'cat_name',
                value: 'cat_id',
                children: 'children'
            },
            // 动态参数
            arrManyParams:[],
            arrOnlyParams:[],
            headers:{
                Authorization:sessionStorage.getItem('token')
            }
        };
    },
    created() {
        this.goodCate()
    },
    components: {
        quillEditor
    },
    methods: {
        // 一、获取分类参数
        async goodCate(){
            const res=await this.$http.get('categories?type=3')
            // console.log(res)
            this.options=res.data.data
        },
        // 二、获取many参数列表
        async tabChange(){
            // console.log(this.active)
            if (this.active=='2'){
                if (this.publicCart.length!=3){
                    this.$message.error('请选择三级分类')
                    return
                }
                 const res=await this.$http.get(`categories/${this.publicCart[2]}/attributes?sel=many`)
                // console.log(res)
                this.arrManyParams=res.data.data
    
                // console.log(this.arrManyParams)
                this.arrManyParams.forEach(item => {
                    item.attr_vals=item.length===0? []:item.attr_vals.trim().split(',')
                });
            }else{
                if(this.active=='3'){
                    if (this.publicCart.length!=3){
                    this.$message.error('请选择三级分类')
                    return
                    }
                }
                const res=await this.$http.get(`categories/${this.publicCart[2]}/attributes?sel=only`)
                // console.log(res)
                this.arrOnlyParams=res.data.data
            }
           
        },
        // 删除参数
        // async clearParams(i){
        //     // console.log(1)
        //     const res=await this.$http.delete(`categories/${this.goodList.goods_cat[2]}/attributes/${i}`)
        //     console.log(res)
        // }
        // 四、图片上传
        handleRemove(file) {
            let index=this.goodList.pics.findIndex((item)=>{
                return item.pic===file.response.data.tmp_path
            })
            this.goodList.pics.splice(index,1)
            // console.log(this.goodList.pics)
        },
        handlePreview(file) {
            // console.log(file);
        },
        handleSuccess(file) {
            this.goodList.pics.push({"pic":file.data.tmp_path})
            // console.log(this.goodList.pics)
        },
        async btngoods(){
          
            this.goodList.goods_cat=this.publicCart.join(',')
            // console.log(this.goodList.goods_cat)
            // console.log(this.goodList)
            const res=await this.$http.post('goods',this.goodList)
            console.log(res)
            if (res.data.meta.status===201){
                this.$router.push('/goods')
                this.$message.success('商品成功')
            }

        }

    }

}
</script>

<style>
.tishi {
    margin-top: 10px;
}

.el-step__title {
    font-size: 12px;
}

.el-tab-pane {
    height: 500px;
    overflow: auto;
}
.editor{
    height: 380px;
}
</style>
