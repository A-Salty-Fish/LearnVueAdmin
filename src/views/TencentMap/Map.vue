<template>
  <div className="index">
    <div id="MapContainer" />
  </div>
</template>

<script>
var center = new TMap.LatLng(30.538435, 114.357496)
var map, markerLayer
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
    signInAPI().getToday().then(res => {
      console.log(res.data)
    })
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
          })
        }
        // 点标记数据数组
        // geometries: [{
        //   'id': '1', // 点标记唯一标识，后续如果有删除、修改位置等操作，都需要此id
        //   'styleId': 'myStyle', // 指定样式id
        //   'position': new TMap.LatLng(30.538435, 114.357496), // 点标记坐标位置
        //   'properties': { // 自定义属性
        //     'title': 'marker1'
        //   }
        // }, { // 第二个点标记
        //   'id': '2',
        //   'styleId': 'myStyle',
        //   'position': new TMap.LatLng(30.538386, 114.357487),
        //   'properties': {
        //     'title': 'marker2'
        //   }
        // }
        // ]
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
        // console.log(evt.geometries[0].properties.name)
        evt.cluster.geometries.forEach(x => console.log(x.properties.name))
        // console.log(evt.cluster.geometries[0].properties.name)
        // alert(evt.geometry)
      }
      // 监听marker点击事件
      // markerLayer.on('click', clickHandler)

      // 创建点聚合对象
      var markerCluster = new TMap.MarkerCluster({
        id: 'cluster', // 图层id
        map: map, // 设置点聚合显示在哪个map对象中（创建map的段落省略）
        enableDefaultStyle: true, // 使用默认样式
        minimumClusterSize: 2, // 最小聚合点数：2个
        geometries: [
          {
            position: new TMap.LatLng(30.538325, 114.357496),
            properties: { name: 'dzy' }
          },
          { position: new TMap.LatLng(30.538355, 114.357486),
            properties: { name: 'dzy2' }
          },
          { position: new TMap.LatLng(30.538335, 114.357476),
            properties: { name: 'dzy3' }
          },
          { position: new TMap.LatLng(30.538305, 114.357466),
            properties: { name: 'dzy4' }
          }
          // ....将您所有要打到图中的坐标点传入进来
        ],
        zoomOnClick: true, // 点击聚合数字放大展开
        gridSize: 30, // 聚合算法的可聚合距离，即距离小于该值的点会聚合至一起，默认为60，以像素为单位
        averageCenter: true, // 每个聚和簇的中心是否应该是聚类中所有标记的平均值
        maxZoom: 18 // 采用聚合策略的最大缩放级别，若地图缩放级别大于该值，则不进行聚合，标点将全部被展开
      })
      markerCluster.on('click', clickHandler)
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
