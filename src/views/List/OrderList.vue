<template>
  <div>
    <BreadCrumbs two="订单管理" three="订单列表"></BreadCrumbs>
    <el-card class="box">
      <el-row class="box_row">
        <el-col :span="9">
          <el-input placeholder="请输入内容" v-model="input" clearable>
            <template #append
              ><el-button @click="searchBtn"
                ><i class="el-icon-search"></i></el-button
            ></template>
          </el-input>
        </el-col>
      </el-row>
      <el-table style="width: 100%" stripe border :data="orderList.goods">
        <el-table-column label="#" type="index"> </el-table-column>
        <el-table-column label="订单编号" prop="order_number">
        </el-table-column>
        <el-table-column label="订单价格" prop="order_price"> </el-table-column>
        <el-table-column label="是否付款" prop="order_pay">
          <template v-slot="scope">
            <el-tag
              v-if="scope.row.order_pay === '3'"
              type="success"
              effect="dark"
              >已支付
            </el-tag>
            <el-tag
              v-if="scope.row.order_pay === '0'"
              type="danger"
              effect="dark"
              >未支付
            </el-tag>
          </template>
        </el-table-column>
        <el-table-column label="是否发货" prop="is_send"> </el-table-column>
        <el-table-column label="下单时间" prop="create_time">
          <template v-slot="scope">
            {{ scope.row.create_time | items }}
          </template>
        </el-table-column>
        <el-table-column label="操作">
          <template>
            <el-button
              type="primary"
              size="mini"
              icon="el-icon-edit"
              @click="ProvincialDataList"
            ></el-button>
          </template>
        </el-table-column>
      </el-table>
      <!-- 分页 -->
      <el-row type="flex" class="row-bg" justify="end">
        <el-pagination
          class="bottom"
          @size-change="handleSizeChange"
          @current-change="handleCurrentChange"
          :page-sizes="[1, 2, 5, 10]"
          :page-size="5"
          layout="total, sizes, prev, pager, next, jumper"
          :total="orderList.total"
        >
        </el-pagination>
      </el-row>
    </el-card>
    <!-- 操作 -->
    <el-dialog title="修改收货地址" :visible.sync="dialogVisible" width="50%">
      <el-cascader v-model="address" :options="ProvincialData"></el-cascader>
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="btn">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
import ProvincialData from '@/utils/provincialData'
import { TheOrderApi } from '@/api/orderList'
import dayjs from 'dayjs'
export default {
  created () {
    this.TheOrderList()
  },
  data () {
    return {
      input: '',
      order: {
        query: null, // 查询参数
        pagenum: 1, // 当前页码
        pagesize: 5 // 每页显示条数
      },
      orderList: [], // 订单列表
      dialogVisible: false,
      address: '',
      ProvincialData: ProvincialData
    }
  },
  methods: {
    // 获取订单列表
    async TheOrderList () {
      const res = await TheOrderApi(this.order)
      console.log(res)
      this.orderList = res.data.data
      console.log(this.orderList)
    },
    // 显示条数
    handleSizeChange (val) {
      this.order.pagesize = val
      this.TheOrderList()
    },
    // 当前页
    handleCurrentChange (val) {
      this.order.pagenum = val
      this.TheOrderList()
    },
    // 搜索
    searchBtn () {
      console.log(123)
      this.order.query = this.input
      this.TheOrderList()
      this.input = ''
      this.$message.error('系统繁忙')
    },
    // 地址选择
    ProvincialDataList () {
      this.dialogVisible = true
      this.ProvincialData = ProvincialData
      console.log(this.ProvincialData)
    },
    btn () {
      this.dialogVisible = false
      this.$message.success('修改成功')
    }
  },
  computed: {},
  watch: {},
  filters: { // 处理数据-时间戳转换为时间
    items (item) {
      return dayjs(item).format('YYYY-MM-DD')
    }
  },
  components: {}
}
</script>

<style scoped lang='less'>
.box {
  margin-top: 20px;
}
.box_row {
  margin-bottom: 20px;
}
.bottom {
  margin-top: 20px;
}
</style>
