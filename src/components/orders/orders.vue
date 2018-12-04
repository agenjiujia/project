<template>
  <el-card>
    <my-bread level1="订单管理" level2="订单列表"></my-bread>
    <el-table :data="tableData" style="width: 100%">
      <el-table-column type='index' label="#" width="80"></el-table-column>
      <el-table-column prop="order_number" label="订单编号" width="160"></el-table-column>
      <el-table-column prop="order_price" label="订单价格"></el-table-column>
      <el-table-column label="是否付款">
          <template slot-scope="scope">
              <el-button v-if='scope.row.pay_status==0' type="primary" size='mini' plain>未付款</el-button>
              <el-button v-else type="success" size='mini' plain>已付款</el-button>
          </template>
      </el-table-column>
      <el-table-column prop="is_send" label="是否发货"></el-table-column>
      <el-table-column label="下单时间">
          <template slot-scope="scope">
              <span>{{scope.row.create_time|fmdata}}</span>
          </template>
      </el-table-column>
      <el-table-column prop="address" label="操作">
          <template slot-scope='scope'>
              <el-button type="primary" icon="el-icon-edit" circle size='mini' plain></el-button>
          </template>
      </el-table-column>
    </el-table>
  </el-card>
</template>

<script>
export default {
  data() {
    return {
      tableData: [],
    }
  },
  created() {
      this.getOrders()
  },
  methods:{
      async getOrders(){
          const res=await this.$http.get('orders?pagenum=1&pagesize=100')
        //   console.log(res)
          this.tableData=res.data.data.goods
        //   console.log(this.tableData)
      }
  }
};
</script>

<style>
</style>
