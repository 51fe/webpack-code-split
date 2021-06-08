<template>
  <chart
    :options="merged"
    autoresize
    class="china-map"
    v-on="$listeners"
  />
</template>

<script>
import Chart from 'vue-echarts'
import 'echarts/lib/chart/map'
import 'echarts/lib/component/tooltip'
import 'echarts/lib/component/geo'
import 'echarts/map/js/china'
import merge from 'lodash/merge'

export default {
  name: 'ChinaMap',
  components: { Chart },
  props: {
    // 数据源
    source: {
      type: Array,
      default: () => [],
      required: true
    },
    // 所有维度信息
    type: {
      type: String,
      default: () => 'province'
    },
    // 所有维度信息
    dimensions: {
      type: Array,
      default: () => ['name', 'value']
    },
    // 系列名称
    seriesName: {
      type: String,
      default: ''
    },
    // 样式扩展
    extended: {
      type: Object,
      default: () => {}
    }
  },
  computed: {
    // 返回深度合并的选项
    merged() {
      return merge(this.options, this.extended)
    },
    options() {
      return {
        tooltip: {
          trigger: 'item',
          formatter(params) {
            const value = params.value
            if (!isNaN(value)) {
              return params.seriesName + '<br />' + params.name + ': ' + value
            }
          }
        },
        visualMap: {
          left: 24,
          top: 'bottom',
          text: ['高', '低'],
          calculable: true,
          inRange: {
            color: ['#BDE0FF', '#52ACFF', '#2962FF']
          },
          orient: 'horizontal',
          inverse: true
        },
        geo: {
          map: 'china',
          roam: false,
          scaleLimit: {
            min: 1,
            max: 2
          },
          zoom: 1.23,
          top: 36,
          nameProperty: this.dimensions[0],
          label: {
            normal: {
              show: false,
              fontSize: '14',
              color: 'rgba(0, 0, 0, 0.7)'
            }
          },
          itemStyle: {
            normal: {
              borderColor: 'rgba(0, 0, 0, 0.2)'
            },
            emphasis: {
              areaColor: '#f2d5ad',
              shadowOffsetX: 0,
              shadowOffsetY: 0,
              borderWidth: 0
            }
          }
        },
        dataset: {
          dimensions: this.dimensions,
          source: this.source
        },
        series: [{
          name: this.seriesName,
          type: 'map',
          data: this.type === 'province' ? undefined : this.source,
          geoIndex: 0,
        }]
      }
    }
  }
}
</script>

<style>
  .china-map {
    width: 640px;
    height: 360px;
  }
</style>
