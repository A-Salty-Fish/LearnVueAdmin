<template>
  <div>
    <el-table
      :data="tableData"
      style="width: 100%">
      <el-table-column
        align='center'
        prop="date"
        label="日期"
        min-width="360px">
      </el-table-column>
      <el-table-column
        align='center'
        prop="title"
        label="标题"
        min-width="360px">
      </el-table-column>
      <el-table-column
        align='center'
        label="操作"
        min-width="360px">
        <template slot-scope="scope">
          <el-button @click="handleClick(scope.row)" type="text" size="small">查看</el-button>
          <el-button type="text" size="small">编辑</el-button>
        </template>
      </el-table-column>
    </el-table>
    <div class="pagination">
      <el-pagination
        :current-page="currentPage"
        :page-sizes="[10, 20, 30, 40]"
        :page-size="10"
        layout="total, sizes, prev, pager, next, jumper"
        :total="tableData.length"
        @size-change="handleSizeChange"
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
      tableData: []
    }
  },
  created() {
    var that = this
    for (var i = 0; i < 41; i++) {
      that.tableData[i] = {
        date: '日期' + i,
        title: '标题' + i
      }
    }
  },
  methods: {
    handleSizeChange() {
    },
    handleCurrentChange() {
      console.log(this.currentPage)
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
