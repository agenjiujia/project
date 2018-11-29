<template>
<el-card>
    <my-bread level1='权限管理' level2='角色列表'></my-bread>
    <el-row class='addRolesBtn'>
        <el-col>
            <el-button type="success">成功按钮</el-button>
        </el-col>
    </el-row>

    <el-table :data="tableData5" style="width: 100%">
        <el-table-column type="expand">

            <template slot-scope="props">
                <el-form label-position="left" inline class="demo-table-expand">

                    <el-form-item label="商品名称">
                        <!-- <span>{{ props.row.name }}</span> -->
                    </el-form-item>

                </el-form>
            </template>

        </el-table-column>
        <el-table-column label="#" type='index' width='100'>
        </el-table-column>
        <el-table-column label="角色名称" prop="name" width='250'>
        </el-table-column>
        <el-table-column label="角色描述" prop="name" width='250'>
        </el-table-column>
        <el-table-column label="操作">
            <template slot-scope="scope">
                <el-button type="primary" icon="el-icon-edit" circle size='mini' plain></el-button>
                <el-button type="danger" icon="el-icon-delete" circle size='mini' plain></el-button>
                <el-button type="success" icon="el-icon-check" circle size='mini' plain></el-button>
            </template>
        </el-table-column>
    </el-table>

</el-card>
</template>

<script>
export default {
    data() {
        return {
            tableData5: []
        }
    }
}
</script>

<style>
.addRolesBtn {
    margin-top: 10px;
}

.demo-table-expand {
    font-size: 0;
}

.demo-table-expand label {
    width: 90px;
    color: #99a9bf;
}

.demo-table-expand .el-form-item {
    margin-right: 0;
    margin-bottom: 0;
    width: 50%;
}
</style>
