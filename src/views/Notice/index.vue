<template>
  <div>
    <el-divider></el-divider>
    <notice v-for="(title, index) in titles" :key="index" v-bind:notice-content="contents[index]" v-bind:notice-title="title"></notice>
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
  data() {
    return {
      titles: ['标题1', '标题2', '标题3', '标题4'],
      contents: ['内容1', '内容2', '内容3', '内容4']
    }
  },
  components: { Notice }
}
</script>

<style scoped>
  .el-pagination {
    text-align: center;
  }
</style>
