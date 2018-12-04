<template>
<el-card>
    <my-bread level1='商品管理' level2='商品参数'></my-bread>
    <el-alert title="警告提示的文案" type="warning" show-icon :closable='false' class='goodsAlert'>
    </el-alert>
    <span>请选择商品分类</span>
    <el-cascader :show-all-levels="false" :props='defaultProps' expand-trigger="hover" :options="options" v-model="selectedOptions" @change="handleChange">
    </el-cascader>
    <el-tabs v-model="active" @tab-click="handleClick">
        <el-tab-pane label="动态参数" name="1">
            <el-button type="primary">设置动态参数</el-button>

            <el-table :data="arrDyparams" style="width: 100%">
                <el-table-column type="expand" label='#'>
                    <!-- 循环对象中的数组 scope.row.attr_vals-->
                    <template slot-scope="scope">
                        <el-tag :key="tag" v-for="tag in scope.row.attr_vals" closable :disable-transitions="false" 
                        @close="handleClose(scope.row,tag)">
                            {{tag}}
                        </el-tag>
                        <el-input 
                        class="input-new-tag" 
                        v-if="inputVisible" 
                        v-model="inputValue" 
                        ref="saveTagInput" 
                        size="small" 
                        @keyup.enter.native="handleInputConfirm(scope.row)" 
                        @blur="handleInputConfirm(scope.row)">
                        </el-input>
                        <el-button v-else class="button-new-tag" size="small" @click="showInput">+ New Tag</el-button>
                    </template>

                </el-table-column>
                <el-table-column label="属性名称" prop="attr_name">
                </el-table-column>
                <el-table-column label="操作">
                    <template slot-scope="scope">
                        <el-button size="mini" plain type="primary" icon="el-icon-edit" circle></el-button>
                        <el-button size="mini" plain type="danger" icon="el-icon-delete" circle></el-button>
                    </template>
                </el-table-column>
            </el-table>
        </el-tab-pane>
        <el-tab-pane label="静态参数" name="2">
            <el-button type="primary">设置静态参数</el-button>
        </el-tab-pane>
    </el-tabs>

</el-card>
</template>

<script>
export default {
    data() {
        return {
            options: [],
            selectedOptions: [],
            defaultProps: {
                label: 'cat_name',
                value: 'cat_id',
                children: 'children'
            },
            active: '1',
            arrDyparams: [],
            inputVisible: false,
            inputValue: ''
        }
    },
    created() {
        this.getCates()
    },
    methods: {
        async handleClose(row,tag) {
            row.attr_vals.splice(row.attr_vals.indexOf(tag), 1);
            let putdata={
                attr_name:row.attr_name,
                attr_sel:"many",
                attr_vals:row.attr_vals.join(',')
            }
            const res=await this.$http.put(`categories/${this.selectedOptions[2]}/attributes/${row.attr_id}`,putdata)
            if(res.data.meta.status===200){
                this.$message.success(res.data.meta.msg)
            }
        },
        showInput() {
            this.inputVisible = true;
        },
        // 添加动态参数
        async handleInputConfirm(row) {
            let inputValue = this.inputValue;
            // 判断参数是否存在
            let i = row.attr_vals.indexOf(inputValue)
            if (i !== -1) {
                this.$message.error('参数已存在')
                return
            }
            // 判断是否有输入,有输入更新视图 并 发送请求
            if (inputValue) {
                row.attr_vals.push(inputValue);
                let from = {
                    attr_name: row.attr_name,
                    attr_sel: 'many',
                    // 把动态参数由数组改成字符串
                    attr_vals: row.attr_vals.join(',')
                }
                const res = await this.$http.put(`categories/${this.selectedOptions[2]}/attributes/${row.attr_id}`, from)
                if (res.data.meta.status == 200) {
                    this.$message.success(res.data.meta.msg)
                }
            }
            this.inputVisible = false
            this.inputValue = ''
        },
        handleClick() {

        },
        // 点击第三类的时候获取动态参数
        async handleChange() {
            const res = await this.$http.get(`categories/${this.selectedOptions[2]}/attributes?sel=many`)
            this.arrDyparams = res.data.data;
            console.log(this.arrDyparams)
            this.arrDyparams.forEach(item => {
                // 把动态参数由字符串改变数组
                item.attr_vals = item.attr_vals.length == 0 ? [] : item.attr_vals.trim().split(',')
            });
        },
        // 页面加载时获取三级分类
        async getCates() {
            const res = await this.$http.get('categories?type=3')
            // console.log(res)
            // 获取三级分类
            this.options = res.data.data
        }
    }

}
</script>

<style>
.goodsAlert {
    margin-top: 10px;
}

.el-tag+.el-tag {
    margin-left: 10px;
}

.button-new-tag {
    margin-left: 10px;
    height: 32px;
    line-height: 30px;
    padding-top: 0;
    padding-bottom: 0;
}

.input-new-tag {
    width: 90px;
    margin-left: 10px;
    vertical-align: bottom;
}
</style>
