<template>
<el-card>
    <my-bread level1='商品管理' level2='商品列表'></my-bread>
    <el-input placeholder="请输入内容" v-model="query" class="input-with-select goodsSearch" clearable @clear='goodsClearSearch()'>
        <el-button slot="append" icon="el-icon-search" @click.prevent='goodsSearchBtn()'></el-button>
    </el-input>
    <el-button type="success" plain @click='addGoods()'>添加商品</el-button>

    <el-table :data="goodsData" style="width: 100%" height='400px'>
        <el-table-column type=index label="#" width="100">
        </el-table-column>
        <el-table-column prop="goods_name" label="商品名称" width="180">
        </el-table-column>
        <el-table-column prop="goods_price" label="商品价格(元)">
        </el-table-column>
        <el-table-column prop="goods_weight" label="商品重量">
        </el-table-column>
        <el-table-column label="创建日期">
            <template slot-scope="scope">
                {{scope.row.add_time | fmdata}}
            </template>
        </el-table-column>
        <el-table-column label="地址">
            <template slot-scope="scope">
                <el-button type="primary" size='mini' plain icon="el-icon-edit" circle></el-button>
                <el-button type="danger" size='mini' plain icon="el-icon-delete" circle @click='goodsDel(scope.row)'></el-button>
            </template>
        </el-table-column>
    </el-table>
    <el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page="pagenum" :page-sizes="[2, 4, 6, 8]" :page-size="4" layout="total, sizes, prev, pager, next, jumper" :total="total">
    </el-pagination>
</el-card>
</template>

<script>
export default {
    data() {
        return {
            query: '',
            pagenum: 1,
            pagesize: 4,
            goodsData: [],
            total: -1,
        }
    },
    created() {
        this.goodsGet()
    },
    methods: {
        async goodsGet() {
            const res = await this.$http.get(`goods?query=${this.query}&pagenum=${this.pagenum}&pagesize=${this.pagesize}`)
            // console.log(res)
            this.goodsData = res.data.data.goods
            this.total = res.data.data.total
        },
        goodsSearchBtn() {
            this.goodsGet()
        },
        goodsClearSearch() {
            this.goodsGet()
        },
        handleSizeChange(val) {
            //   console.log(`每页 ${val} 条`);
            this.pagesize = val
            this.pagenum = 1
            this.goodsGet()
        },
        handleCurrentChange(val) {
            //   console.log(`当前页: ${val}`);
            this.pagenum = val
            this.goodsGet()
        },
        async goodsDel(row){
            const res=await this.$http.delete(`goods/${row.goods_id}`)
            // console.log(res)
            console.log('总:'+this.total)
            console.log('当前页:'+this.pagesize)
            console.log('取余:'+this.total%this.pagesize)
            
            if((this.total%this.pagesize)==1){
                this.pagenum=this.pagenum-1
            }
            this.goodsGet()
        },
        async addGoods(){
            this.$router.push('/goodsAdd')
        }
    }
}
</script>

<style>
.goodsSearch {
    width: 400px;
    margin-top: 10px;
}
</style>
