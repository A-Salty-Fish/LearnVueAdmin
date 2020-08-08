<template>
  <div>
    <el-table
      id="TableTop"
      :data="tableData.slice((currentPage-1)*pageSize,currentPage*pageSize)"
      style="width: 100%">
      <el-table-column
        align='center'
        prop="date"
        label="日期"
        >
      </el-table-column>
      <el-table-column
        align='center'
        prop="title"
        label="标题"
        >
      </el-table-column>
      <el-table-column
        align='center'
        label="操作"
        >
        <template slot-scope="scope">
          <el-button @click="handleClick(scope.row)" type="text" size="small">查看</el-button>
          <el-button type="text" size="small">编辑</el-button>
        </template>
      </el-table-column>
    </el-table>
    <div class="pagination">
      <el-pagination
        :current-page="currentPage"
        :page-size="pageSize"
        layout="total, jumper, prev, pager, next"
        :total="tableData.length"
        @current-change="handleCurrentChange"
      />
    </div>
  </div>
</template>

<script>
export default {
  name: 'Index',
  data() {
    return {
      currentPage: 1,
      pageSize: 10,
      tableData: [],
    }
  },
  created() {
    var that = this
    for (var i = 0; i < 47; i++) {
      that.tableData[i] = {
        date: '日期' + i,
        title: '标题' + i
      }
    }
  },
  methods: {
    handleCurrentChange(currentPage) {
      this.currentPage = currentPage
      location.href = '#TableTop'
    }
  }
}
</script>

<style scoped>
  .el-pagination{
    text-align: center;
    margin-top: 5%;
  }
</style>
