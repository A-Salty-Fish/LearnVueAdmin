<template>
  <div className="index">
    <div id="MapContainer" />
  </div>
</template>

<script>
var center = new TMap.LatLng(30.538435, 114.357496)
var map, markerLayer, markerCluster, infoWindow, circle
import { signInAPI } from '@/api/signin.js'
export default {
  name: 'Index',
  data() {
    return {
      position: [
        {
          longitude: 0, // 经度
          latitude: 0, // 纬度
          city: ''
        }
      ]
    }
  },
  mounted() {
    this.setMapData()
  },
  created() {
  },
  methods: {
    setMapData() {
      map = new TMap.Map(document.getElementById('MapContainer'), {
        center: center, // 设置地图中心点坐标
        zoom: 20, // 设置地图缩放级别
        pitch: 0, // 设置俯仰角
        rotation: 0 // 设置地图旋转角度
      })
      // 创建并初始化MultiMarker
      markerLayer = new TMap.MultiMarker({
        map: map, // 指定地图容器
        // 样式定义
        styles: {
          // 创建一个styleId为"myStyle"的样式（styles的子属性名即为styleId）
          'myStyle': new TMap.MarkerStyle({
            'width': 25, // 点标记样式宽度（像素）
            'height': 35, // 点标记样式高度（像素）
            // 焦点在图片中的像素位置，一般大头针类似形式的图片以针尖位置做为焦点，圆形点以圆心位置为焦点
            'anchor': { x: 16, y: 32 }
          }),
          'centerStyle': new TMap.MarkerStyle({
            'width': 35, // 点标记样式宽度（像素）
            'height': 35, // 点标记样式高度（像素）
            'src': 'https://cn.bing.com/images/search?view=detailV2&ccid=rbQKAYHP&id=3410925EFEFBAD969C5F154E102898FEFEA67EA0&thid=OIP.rbQKAYHP1OXcQO5t-gR0ZwAAAA&mediaurl=https%3a%2f%2fbkimg.cdn.bcebos.com%2fpic%2f7af40ad162d9f2d3a8b40d3da2ec8a136227ccbf%3fx-bce-process%3dimage%2fresize%2cm_lfit%2cw_268%2climit_1%2fformat%2cf_jpg&exph=261&expw=268&q=%e6%ad%a6%e6%b1%89%e5%a4%a7%e5%ad%a6%e8%ae%a1%e7%ae%97%e6%9c%ba%e5%ad%a6%e9%99%a2%e5%be%bd&simid=607999866080920056&ck=8ACA68726B11BCADC32D97D7CEB99026&selectedIndex=0&FORM=IRPRST'
          })
        },
        // 点标记数据数组
        geometries: [{
          'id': '1', // 点标记唯一标识，后续如果有删除、修改位置等操作，都需要此id
          'styleId': 'myStyle', // 指定样式id
          'position': center, // 点标记坐标位置
          'properties': { // 自定义属性
            'title': '计算机学院'
          }
        }
        ]
      })

      // markerLayer.add([{
      //   'id': '3', // 点标记唯一标识，后续如果有删除、修改位置等操作，都需要此id
      //   'styleId': 'myStyle', // 指定样式id
      //   'position': new TMap.LatLng(30.538406, 114.357467), // 点标记坐标位置
      //   'properties': { // 自定义属性
      //     'title': 'marker3'
      //   }
      // }
      // ])

      // 监听回调函数（非匿名函数）
      var clickHandler = function(evt) {
        evt.cluster.geometries.forEach(x => console.log(x.properties))
      }
      infoWindow = new TMap.InfoWindow({
        map: map,
        position: new TMap.LatLng(30.538435, 114.357496),
        offset: { x: 0, y: -32 } // 设置信息窗相对position偏移像素，为了使其显示在Marker的上方
      })
      infoWindow.close()// 初始关闭信息窗关闭
      // 监听marker点击事件
      // markerLayer.on('click', clickHandler)
      signInAPI().getToday().then(res => {
        // 创建点聚合对象
        markerCluster = new TMap.MarkerCluster({
          id: 'cluster', // 图层id
          map: map, // 设置点聚合显示在哪个map对象中（创建map的段落省略）
          enableDefaultStyle: true, // 使用默认样式
          minimumClusterSize: 2, // 最小聚合点数：2个
          geometries: [
            // ....将您所有要打到图中的坐标点传入进来
          ],
          zoomOnClick: false, // 点击聚合数字放大展开
          gridSize: 30, // 聚合算法的可聚合距离，即距离小于该值的点会聚合至一起，默认为60，以像素为单位
          averageCenter: true, // 每个聚和簇的中心是否应该是聚类中所有标记的平均值
          maxZoom: 18 // 采用聚合策略的最大缩放级别，若地图缩放级别大于该值，则不进行聚合，标点将全部被展开
        })
        res.data.forEach(x => {
          markerCluster.add({
            position: new TMap.LatLng(x.latitude, x.longitude),
            properties: x
          })
        })
        markerCluster.on('click', function(evt) {
          // 设置infoWindow
          infoWindow.open() // 打开信息窗
          console.log(evt)
          infoWindow.setPosition(evt.cluster.center)// 设置信息窗位置
          var conStr = '<table>\n' +
            '<tr>\n' +
            '<td>姓名</td>\n' +
            '<td>学号</td>\n' +
            '<td>经纬度</td>\n' +
            '<td>时间</td>\n' +
            '</tr>\n'
          evt.cluster.geometries.forEach(x => {
            var xp = x.properties
            conStr += `<tr>\n` +
              `<td>${xp.name}</td>\n` +
              `<td>${xp.number}</td>\n` +
              `<td>(${xp.latitude},${xp.longitude})</td>\n` +
              `<td>${xp.date}</td>\n` +
              `</tr>\n`
          })
          conStr += '</table>'
          infoWindow.setContent(conStr)// 设置信息窗内容
        })
      })
      // 创建圆形覆盖物
      circle = new TMap.MultiCircle({
        map,
        styles: { // 设置圆形样式
          'circle': new TMap.CircleStyle({
            'color': 'rgba(41,91,255,0.16)',
            'showBorder': true,
            'borderColor': 'rgba(41,91,255,1)',
            'borderWidth': 2
          })
        },
        geometries: [{
          styleId: 'circle',
          center: center, // 圆形中心点坐标
          radius: 70	// 半径（单位：米）
        }]
      })
    }
  }
}
</script>
<style>
#MapContainer {
  width: 100%;
  height: 100%;
  position: absolute;
}
</style>
