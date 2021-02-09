<template>
  <div className="index">
    <div id="container" />
  </div>
</template>

<script>
let map, marker, polygon, drawingManager, lngLat, ap
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
  methods: {
    // /**
    //  * /定位获得当前位置信息
    //  */
    // getMyLocation() {
    //   var geolocation = new qq.maps.Geolocation('N7NBZ-QKBW3-6ST3D-3BVDN-VA7K3-KDBNT', '名字')
    //   geolocation.getLocation(this.showPosition, this.showErr)
    // },
    // showPosition(position) {
    //   console.log(position)
    //   this.position.latitude = position.lat
    //   this.position.longitude = position.lng
    //   this.position.city = position.city
    //   this.setMapData()
    // },
    // // 定位失败再请求定位，测试使用
    // showErr() {
    //   console.log('定位失败，请重试！')
    //   this.getMyLocation()
    // },
    // /**
    //      * 位置信息在地图上展示
    //      */
    setMapData() {
      var myLatlng = new qq.maps.LatLng(30.538435,114.357496)
      var myOptions = {
        zoom: 32,
        center: myLatlng,
        mapTypeId: qq.maps.MapTypeId.ROADMAP
      }
      // 获取dom元素添加地图信息
      map = new qq.maps.Map(document.getElementById('container'), myOptions)
      // 给定位的位置添加图片标注
      // marker = new qq.maps.Marker({
      //   position: myLatlng,
      //   map: map,
      //   draggable: true // 允许鼠标拖动
      // })
    }

  }
}
</script>
<style>
#container {
  width: 100%;
  height: 100%;
  position: absolute;
}
</style>
