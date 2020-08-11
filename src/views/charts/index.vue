<template>
  <div class="Echarts">
    <div id="chart1" style="width: 600px;height:600px; display: flex" />
    <div id="chart2" style="width: 600px;height:600px; display: flex" />
  </div>
</template>

<script>
import echarts from 'echarts'
export default {
  mounted() {
    this.myEcharts1()
    this.myEcharts2()
  },
  methods: {
    myEcharts1() {
      var pieEchart = echarts.init(document.getElementById('chart1'))

      // 指定图表的配置项和数据
      var pieoption = {
        title: {
          text: '签到情况',
          x: 'left',
          textStyle: {
            color: 'black',
            fontSize: 25
          }
        },
        tooltip: {
          trigger: 'item',
          formatter: '{a} <br/>{b} : {c} KM'
        },
        legend: {
          orient: 'vertical',
          x: 'left',
          top: 40,
          itemWidth: 70,
          itemHeight: 30,
          formatter: '{name}',
          textStyle: {
            color: 'black'
          },
          data: [{ name: '区域外', icon: 'rect' }, { name: '区域内', icon: 'rect' }] },
        calculable: true,
        series: [
          {
            name: '签到情况',
            type: 'pie',
            radius: '50%', // 饼图的半径大小
            center: ['50%', '50%'], // 饼图的位置
            label: { // 饼图图形上的文本标签
              normal: {
                show: true,
                position: 'inner', // 标签的位置
                textStyle: {
                  fontWeight: 300,
                  fontSize: 16 // 文字的字体大小
                },
                formatter: '{d}%'

              }
            },
            data: [
              { value: 50, name: '区域外', itemStyle: { normal: { color: 'red' }}},
              { value: 236, name: '区域内', itemStyle: { normal: { color: 'green' }}}
            ]
          }
        ]
      }
      // 使用刚指定的配置项和数据显示图表。
      pieEchart.setOption(pieoption)
    },
    myEcharts2() {
    }
  }
}
</script>

<style>

</style>
