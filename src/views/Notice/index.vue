<template>
  <div>
    <notice></notice>
    <el-pagination
          layout="prev, pager, next"
          :total="50">
        </el-pagination>
  </div>
</template>

<script>
import Notice from './notice'
export default {
  name: 'Index',
  components: { Notice }
}
</script>

<style scoped>
  .el-pagination {
    text-align: center;
  }
</style>
