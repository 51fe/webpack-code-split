<template>
  <div class="contact">
    <div class="clearfix">
      <el-autocomplete
        v-model="query.title"
        :fetch-suggestions="querySearch"
        :trigger-on-focus="false"
        class="fl"
        @select="handleSelect"
      />
      <div class="fr">
        {{ address }}
      </div>
    </div>
    <baidu-map
      :center="mapCenter"
      :zoom="15"
      :scroll-wheel-zoom="true"
      ak="9sA2kCnKstiG1j0ErxP8DGkBAptrPU1v"
      class="bm-view"
      @ready="handlerBMap"
      @click="onClick"
    >
      <bm-geolocation
        anchor="BMAP_ANCHOR_BOTTOM_RIGHT"
        :show-address-bar="true"
        :auto-location="true"
      />
      <bm-local-search
        :keyword="query.title"
        :auto-viewport="true"
        :panel="false"
      />
      <bm-marker
        :position="mapCenter"
        :dragging="true"
        animation="BMAP_ANIMATION_BOUNCE"
      />
    </baidu-map>
  </div>
</template>
<script>
import BaiduMap from 'vue-baidu-map/components/map/Map'
import BmGeolocation from 'vue-baidu-map/components/controls/Geolocation'
import BmLocalSearch from 'vue-baidu-map/components/search/LocalSearch'
import BmMarker from 'vue-baidu-map/components/overlays/Marker'

export default {
  components: { BaiduMap, BmGeolocation, BmLocalSearch, BmMarker },
  data () {
    const { lng, lat } = { lng: 113.94271, lat: 22.522662 }
    return {
      BMap: undefined,
      map: undefined,
      lng,
      lat,
      address: '深圳市南山区粤海街道海珠社区文心五路33号',
      query: {
        title: '海岸城购物中心',
      },
      mapCenter: { lng, lat },
    }
  },
  methods: {
    handlerBMap ({ BMap, map }) {
      this.BMap = BMap
      this.map = map
    },
    querySearch (queryString, cb) {
      const options = {
        onSearchComplete (results) {
          if (local.getStatus() === 0) {
            // 判断状态是否正确
            const s = []
            for (let i = 0; i < results.getCurrentNumPois(); i++) {
              const x = results.getPoi(i)
              const item = { value: x.title, point: x.point }
              s.push(item)
              cb(s)
            }
          } else {
            cb()
          }
        },
      }
      const local = new this.BMap.LocalSearch(this.map, options)
      local.search(queryString)
    },
    handleSelect (item) {
      const { point } = item
      const position = {
        address: item.value,
        title: this.query.title,
      }
      this.updateEvent(point, position)
      this.makerCenter(point)
    },
    makerCenter (point) {
      if (this.map) {
        this.map.clearOverlays()
        this.map.addOverlay(new this.BMap.Marker(point))
      }
    },

    onClick (e) {
      this.mapCenter = e.point
      if (this.BMap) {
        const geo = new this.BMap.Geocoder()
        geo.getLocation(this.mapCenter, ({ surroundingPois }) => {
          if (surroundingPois.length > 0) {
            const position = surroundingPois[0]
            this.updateEvent(this.mapCenter, position)
          }
        })
      }
    },
    updateEvent (point, position) {
      this.lng = point.lng
      this.lat = point.lat
      this.address = position.address
      this.query.title = position.title
    },
  }
}
</script>
<style lang="scss">
  .contact {
    display: flex;
    flex-direction: column;
    padding-right: 16px;

    .clearfix {
      .fl {
        width: 400px;
      }
      .fr {
        line-height: 24px;
      }
    }

    .bm-view {
      flex: 1;
      margin-top: 8px;
    }
  }
</style>
