<template>
  <div class="Echarts">
    <div id="chart1" style="width: 600px;height:600px; float: left" />
    <div id="chart2" style="width: 600px;height:600px; float: left" />
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
      var option = {
        title: {
          text: '签到数量',
          x: 'left',
          textStyle: {
            color: 'black',
            fontSize: 25
          }
        },
        tooltip: {},
        legend: {
          data: ['日期']
        },
        xAxis: {
          data: []
        },
        yAxis: {
        },
        dataZoom: [
          { // 这个dataZoom组件，默认控制x轴。
            type: 'slider', // 这个 dataZoom 组件是 slider 型 dataZoom 组件
            start: 10, // 左边在 10% 的位置。
            end: 60 // 右边在 60% 的位置。
          }
        ],
        series: [{
          name: '访问量',
          type: 'line',
          data: [],
          smooth: true // true 为平滑曲线，false为直线
        }]
      }
      // 初始化echarts实例
      for (var i = 1; i <= 31; i++) {
        option.xAxis.data[i - 1] = 'Aug ' + i
        option.series[0].data[i - 1] = Math.random() * 50
      }
      var myChart = echarts.init(document.getElementById('chart2'))

      // 使用制定的配置项和数据显示图表
      myChart.setOption(option)
    }
  }
}
</script>

<style>

</style>
